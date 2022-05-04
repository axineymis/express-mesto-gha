class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AthorizationError';
    this.statusCode = 401;
  }
}

module.exports = AuthorizationError;
