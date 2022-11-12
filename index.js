const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "courses1" },
  { id: 2, name: "courses2" },
  { id: 3, name: "courses3" }
];

// Handling GET request
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/courses', function (req, res) {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(function (course) {
    return course.id === parseInt(req.params.id);
  });

  if (!course) {
    res.status(404).send("The course with the given id was not found");
    return;
  }
  res.send(course);
});
// Handling GET request end

// Handling POST request
app.post('/api/courses', (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
});
// Handling POST request end

// Handling PUT request
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(function (course) {
    return course.id === parseInt(req.params.id);
  });
  if (!course) {
    res.status(404).send("The course with the given id was not found");
    return;
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});
// Handling PUT request end

// Handling DELETE request
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(function (course) {
    return course.id === parseInt(req.params.id);
  });
  if (!course) {
    res.status(404).send("The course with the given id was not found");
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
// Handling DELETE request end

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})