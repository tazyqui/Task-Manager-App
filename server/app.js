const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');

const app = express();

app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json());  // Parse JSON request bodies
app.use('/api', tasksRouter);  // Mount the 'tasksRouter' under the '/api' route

const port = process.env.PORT || 3000;  // Set the port for the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*
* Node.js server application built with Express.js framework.
* It interact with PostgreSQL database by forming a connection using the ‘pg’ library to 
* perform CRUD (Create, Read, Update, Delete) operations on tasks.
*/