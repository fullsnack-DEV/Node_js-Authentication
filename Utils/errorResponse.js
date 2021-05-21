//Error Handler

class ErrorResponse extends Error {
  constructor(message, statuscode) {
    //Call a parent Class Error and add the Error message
    super(message);
    this.statuscode = statuscode;
  }
}

module.exports = ErrorResponse;
