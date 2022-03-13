import { HttpException, HttpStatus } from "@nestjs/common";

export class DoesNotExistError extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        message: "Does Not exist",
      },
      HttpStatus.NOT_FOUND
    );
  }
}
