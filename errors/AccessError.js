class AccessError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AccessError';
    this.statusCode = 403;
  }
}

module.exports = AccessError;
