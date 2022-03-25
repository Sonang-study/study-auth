import { forwardRef, HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { Action } from "src/casl/action.enum";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory";
import { AlreadyExistError } from "src/common/errors/already-exist.error";
import { DoesNotExistError } from "src/common/errors/doesNot-exist.error";
import { UnAuthorizedError } from "src/common/errors/unAuthorized.error";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async getAll(): Promise<User[]> {
    return await this.users.find();
  }

  async create({
    firstName,
    lastName,
    email,
    password,
  }: CreateUserDto): Promise<object> {
    const exists = await this.users.findOne({where: { email }});

    if (exists) {
      throw new AlreadyExistError();
    }
    const user = await this.users.save(
      this.users.create({ firstName, lastName, email, password })
    );

    const access_token = await this.authService.responseJWT(user);
    return access_token;
  }

  async getMe(user): Promise<User> {
    return await this.users.findOne({ where: { id: user.id } });
  }

  async getOne(id): Promise<User> {
    const result = await this.users.findOne(id, { relations: ["tasks"] });
    if(!result) throw new DoesNotExistError();
    return result;
  }

  async updateOne(
    id: number,
    { firstName, lastName, password }: UpdateUserDto,
    user
  ): Promise<User> {
    const userForUpdate = await this.users.findOne({ id });
    const ability = this.caslAbilityFactory.PermissionForUser(user);

    if (!ability.can(Action.Update, userForUpdate))
      throw new UnAuthorizedError();

    userForUpdate.firstName = firstName;
    userForUpdate.lastName = lastName;
    userForUpdate.password = password;
    return await this.users.save(userForUpdate);
  }

  async deleteOne(id, user): Promise<string> {
    const userForDelete = await this.users.findOne({ id });
    const ability = this.caslAbilityFactory.PermissionForUser(user);

    if (!ability.can(Action.Update, userForDelete))
      throw new UnAuthorizedError();

    await this.users.delete({ id });
    return "success delete";
  }
}
