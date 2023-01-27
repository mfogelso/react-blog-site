//add "type":"module" to package.json file at the top to allow for imports etc
import express from 'express';

//install express with npm install -save express
//can test with Postman app
//can also look on browser at localhost:8000/somepath
//run npm install nodemon --save-dev to only save as a development dependency
// add "dev": "nodemon src/server.js" to scripts in package.json file for shortcut
//can now run and auto update server with `npm run dev` to start server

let articlesInfo = [{
    name: 'learn-react',
    upvotes: 0,
    comments: [],
}, 
{
    name: 'learn-node',
    upvotes: 0,
    comments: [],
}, {
    name: 'mongodb',
    upvotes: 0,
    comments: [],
}]

const app = express();
//allows express to parse json
app.use(express.json());

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const article = articlesInfo.find(a => a.name === name);
    if( article) {
        article.upvotes += 1;
        res.send(`The ${name} article has ${article.upvotes} upvotes!`);
    } else {
        res.send('That article doesn\'t exist.');
    }
});

app.post('/api/articles/:name/comments', (req, res) => {
    const { postedBy, text } = req.body;
    const { name } = req.params;

    const article = articlesInfo.find(a => a.name === name);
    if( article) {
        article.comments.push({ postedBy, text });
        res.send(article.comments);
    } else {
        res.send('That article doesn\'t exist.');
    }

});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});