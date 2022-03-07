export class AuthErrorEventBus {
    listen(callback) {
      this.callback = callback;
    }
    notify(error) {
      this.callback(error);
    }
  }