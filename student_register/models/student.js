const mogoose = require("mongoose");

const Student = mogoose.model("Student", {
  firstName: String,
  lastName: String,
  age: Number,
});

module.exports = { Student };
