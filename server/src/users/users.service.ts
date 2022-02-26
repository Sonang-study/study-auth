import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { AlreadyExistError } from 'src/common/errors/already-exist.error';
import { UnAuthorizedError } from 'src/common/errors/unAuthorized.error';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private readonly users: Repository<User>,
  private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.users.find();
  };

  async create({ firstName, lastName, email, password }: CreateUserDto): Promise<string> {

    const exists = await this.users.findOne({email});

    if(exists){
      throw new AlreadyExistError();
    }
    await this.users.save(this.users.create({firstName, lastName, email, password}))
    return 'success create';
  };

  async getOne(query): Promise<User> {
    return await this.users.findOne(query, { relations: ['tasks'] });
  }

  async updateOne(id: number, { firstName, lastName, password }: UpdateUserDto, user): Promise<User> {
    const userForUpdate = await this.users.findOne({id});
    const ability = this.caslAbilityFactory.PermissionForUser(user);

    if (!ability.can(Action.Update, userForUpdate)) throw new UnAuthorizedError();

    userForUpdate.firstName = firstName;
    userForUpdate.lastName = lastName;
    userForUpdate.password = password;
    return await this.users.save(userForUpdate);
  }

  async deleteOne(id, user): Promise<string> {
    const userForDelete = await this.users.findOne({id});
    const ability = this.caslAbilityFactory.PermissionForUser(user);

    if (!ability.can(Action.Update, userForDelete)) throw new UnAuthorizedError();

    await this.users.delete({id})
    return 'success delete';
  }
}
