class ErrorHelper extends Error {  
    constructor(message, code, payload) {
      super(message);
      this.error = {
        status: false,
        message,
        code,
        payload,
      };
  
      Error.captureStackTrace(this, this.constructor);
    }
  
    get() {
      return this.error;
    }
  
    static create(message, code = 500, payload = {}) {
      return new ErrorHelper(message, code, payload);
    }
}
  
export default ErrorHelper;
  