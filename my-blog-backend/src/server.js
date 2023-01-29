//add "type":"module" to package.json file at the top to allow for imports etc
import express from 'express';
import { db, connectToDb } from './db.js';

const app = express();
//allows express to parse json
app.use(express.json());

//Get article info
app.get('/api/articles/:name/', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, { 
        //increment upvotes by 1 for MongoDB
        $inc: { upvotes: 1 },
    });

    const article = await db.collection('articles').findOne({ name });
    if( article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist.');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { postedBy, text } = req.body;
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
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