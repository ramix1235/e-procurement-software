export default class BaseController {
  static newError(status, message) {
    console.log(message);
    return {
      status,
      message,
    };
  }
}
