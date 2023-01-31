import express from 'express';
import { db, connectToDb } from './db.js';
import fs from 'fs';
import admin from 'firebase-admin';

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
//allows express to parse json, getting the body from requests
app.use(express.json());

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    try {
        if(authtoken) {
            req.user  = await admin.auth().verifyIdToken(authtoken);
        }
        } catch (e) {
            return res.sendStatus(400);
    }

    req.user = req.user || {};
    //move on to request
    next();
});

//Get article info
app.get('/api/articles/:name/', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }
})

//Will prevent user from making requests if not logged in
app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);
        const { uid } = req.user;

        //if (canUpvote) {
            await db.collection('articles').updateOne({ name }, { 
                //increment upvotes by 1 for MongoDB
                $inc: { upvotes: 1 },
                $push: { upvoteIds: uid },
            });
        //} 
        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
    
    } else {
        res.send('That article doesn\'t exist.');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { text } = req.body;
    const { name } = req.params;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { email, text } },
    });

    const article = await db.collection('articles').findOne({ name });
    if( article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist.');
    }
});

//Server won't start until it's connected to the database
connectToDb(() => {
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
});