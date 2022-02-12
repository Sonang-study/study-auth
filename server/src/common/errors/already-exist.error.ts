import {HttpException, HttpStatus} from "@nestjs/common";

export class AlreadyExistError extends HttpException {

  constructor() {
    super({
      status: HttpStatus.CONFLICT,
      message: "Already exist member"
    }, HttpStatus.CONFLICT);
  }
}