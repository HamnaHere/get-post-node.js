const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/bootcamp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Couldn't connected to MongoDB, ${error}`));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
    minlength: 6,
    maxlength: 15
  }, 
  
  
  CNIC: {
    type: String,
    required: true,
    unique: true,
    minlength: 13,
    maxlength: 13,
  },
  gender: {
    type: String,
    required: true,
  },
  cell: {
   type: Number,
   required: true,
   minlength: 11,
   maxlength: 11
  },
  DOB:{
    type: Date,
    required: true,
    min: "2015-09-28",
    min: "1950-05-23"

  }
});
const teacherSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
    minlength: 6,
    maxlength: 15
  }, 
  
  
  CNIC: {
    type: String,
    required: true,
    unique: true,
    minlength: 13,
    maxlength: 13,
  },
  gender: {
    type: String,
    required: true,
  },
  cell: {
   type: String,
   required: true,
   minlength: 11,
    maxlength: 1,
  },
  DOB:{
    type: Date,
    required: true,
    min: "2015-09-28",
    min: "1950-05-23"

  }
});
const Teacher = mongoose.model("Teachers", userSchema);
const User = mongoose.model("Users", userSchema);
app.get('/users', (req, res) => {

  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(users);
    }
  });
});
app.get('/teachers', (req, res) => {

  Teacher.find({}, (err, teachers) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(teachers);
    }
  });
});


app.post("/", (req, res) => {
  const payload = req.body;
  console.log(payload);
  const user = new User(payload);

  user
    .save()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));

});

app.post("/teachers", (req, res) => {
  const payload = req.body;
  console.log(payload);
  const teacher = new Teacher(payload);

  teacher
    .save()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));

});


app.listen(5000, () => console.log("App is listening at port 5000"));