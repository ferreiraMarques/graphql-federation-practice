const { GraphQLError } = require("graphql");

class StudentException extends GraphQLError {
  message = "";
  code = 0;
  httpStatus = 0;

  constructor(message = "", code = "", httpStatus = 200) {
    super(message);
    this.code = code;
    this.message = message;
    this.httpStatus = httpStatus;
  }

  throwError() {
    throw new GraphQLError(this.message, {
      extensions: {
        code: this.code,
        http: {
          status: this.httpStatus,
        },
      },
    });
  }
}

module.exports = { StudentException };
