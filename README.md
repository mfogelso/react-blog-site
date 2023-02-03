# react-blog-site

Personal project putting React, MongoDB, Axios and Firebase Authentication to work

---Notes for future projects---

--Front End--
Run `npx create-react-app app-name`
Run `npm start` to start up react server on local host

--Backend--
-Initialize as npm package-
Run `npm init -y`

-Express-
Install express with `npm install -save express`
Can test with Postman app
Can also look on browser at localhost:8000/somepath
Run `npm install nodemon --save-dev` to only save as a development dependency
Package.json backend file -> "dev": "nodemon src/server.js" to scripts for shortcut
Can now run and auto update server with `npm run dev` to start server to listen for requests

-Folder Setup-
src folder and server.js file
import express from 'express';
const app = express();

-Allow for imports-
Package.json backend file -> add "type":"module"

-MongoDB-
Add folder in backend file for database
Run `mongod --dbpath ./database-folder/`
Run `mongosh` to run in terminal
Create databse with `use some-name-db`. It will switch to the database
Call database with db (i.e. `db.collectionName.insertMany()`)
Will be running the client on local host at first at mongodb://127.0.0.1:27017

--Connecting Front and Backend--
Go to front end directory in terminal and run `npm install axios`
This will handle requests from urls
Run both `npm run dev` and `npm run start`
Package.json file frontend -> at the top, "proxy": "http://localhost:8000/"
This will make the front and backend think they are running on the same origin and restart front end

--Firebase Authentication--
Register Firebase online, set sign-in options
Go to overview, click add to project
Run `npm install firebase` on front end
Copy and paste code from Firebase at the top of index.html
Get private key from firebase overview -> project settings -> service accounts -> generate private key
Add key to backend on same level as package.json
Add credentials.json to .gitignore
Go to back end on terminal and install `npm install firebase-admin`

--Release and Host--
Navigate to front end directory
Build with `npm run build`
Copy/paste into backend folder
Add build to .gitignore
Add build code to backend server.js
Create project on MongoDB Atlas
Set up .env file at backend root with Mongo username and password
Run `npm install dotenv`
Go to Databse on MongoDB Atlas and click connect -> connect your application, allow access from anywhere and copy/paste the url into db.js for where the client runs setting username and password to ${process.env.MONGO_USERNAME} etc
Click connect again on MongoDB Atlas->Connect->Connect with MongoDB Shell and copy/paste the code into the command line and give password when prompted
run `use react-blog-db` on mongosh which should have opened after logging in on terminal
run `db.articles.insertMany()` and copy/paste array with starting database info like so
[
{
name: 'learn-react',
upvotes: 0,
comments: [],
upvoteIds: []
},
{
name: 'learn-node',
upvotes: 0,
comments: []
},
{
name: 'mongodb',
upvotes: 0,
comments: []
}
]

-Google Cloud-
add app.yaml and prod-env.yaml
Backend package.json -> add "start":"node src/server.js" to scripts
console.cloud.google.com and search for firebase project
Backend terminal -> Sign into gcloud with `gcloud auth login`
Run `gcloud set config <project-id-from-google-cloud-site>`
Run `glcoud app deploy` might need to set up billing by following a url
Run `glcoud app browse` to open in browser
