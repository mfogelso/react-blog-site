# react-blog-site

Personal project putting React and other tools to work

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

--Connecting Front and Backend--
Go to front end directory in terminal and run `npm install axios`
This will handle requests from urls
Run both `npm run dev` and `npm run start`
Package.json file frontend -> at the top, "proxy": "http://localhost:8000/"
This will make the front and backend think they are running on the same origin and restart front end
