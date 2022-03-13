import { HttpException, HttpStatus } from "@nestjs/common";

export class UnAuthorizedError extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: "Unauthorized user",
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}
