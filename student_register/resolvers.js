const { Student } = require("./models/student");
const { StudentException } = require("./exceptions/student.exception");

const { decodeToken } = require("./config/jwt");

const resolvers = {
  Query: {
    greetings: () => "hello",
    welcome: (parent, args, context) => {
      console.log(context);
      decodeToken(context.token);

      return `hello ${args.name}`;
    },
    students: async (parent) => await Student.find({}),
    student: async (parent, args) => await Student.findById(args.id),
  },
  Mutation: {
    create: async (parent, args) => {
      const { firstName, lastName, age } = args;
      const newStudent = new Student({
        firstName,
        lastName,
        age,
      });

      await newStudent.save();
      return newStudent;
    },
    update: async (parent, args) => {
      const { id } = args;
      const result = await Student.findByIdAndUpdate(id, args);
      return result;
    },
    delete: async (parent, args) => {
      const { id } = args;
      const deleteStudent = await Student.findByIdAndDelete(id);

      if (!deleteStudent) {
        const error = new StudentException(
          `Studdent  with id: ${id} not found`,
          "NOT_FOUND",
          500
        );
        error.throwError();
      }

      return deleteStudent;
    },
  },
};

module.exports = { resolvers };
