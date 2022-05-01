class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "uthorizationError";
    this.statusCode = 401;
  }
}

module.exports = AuthorizationError;
