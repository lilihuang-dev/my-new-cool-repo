const studentData = require('./studentData.json');
const cors = require('cors');

const express = require('express');

const app = express();

// Set up Middleware
// Functions that will work with req, res objects and then pass them on to the next function
// before final route handler funciton is called and response is sent back to client
app.use(cors());

app.get('/', (request, response) => {
    response.status(200).json({ data: "Server is up and running!" })
})

app.get('/students', (request, response) => {
    try {
        const { students } = studentData;
        response.status(200).json({ data: students })
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
})

app.get('/students/:id', (request, response) => {
    try {
      const { id } = request.params;
      const { students } = studentData;
      const student = students.find((student) => student.id === id);
      if (student) {
        response.status(200).json({ data: student });
      } else {
        response.status(404).json({ error: `No student with id of ${id}` });
      }
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  });

module.exports = app;
