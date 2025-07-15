// Import your provided Logging Middleware here
// Example usage: Logger.log('message', {optional: 'data'})

const Logger = {
  log: (...args) => {
    // Replace this with your provided Logging Middleware
    if (window && window.LoggingMiddleware) {
      window.LoggingMiddleware.log(...args);
    }
  }
};

export default Logger;
