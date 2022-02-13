import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { AlreadyExistError } from 'src/common/errors/already-exist.error';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private readonly users: Repository<User>,
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
    return await this.users.findOne(query);
  }

  async updateOne(id: number, { firstName, lastName, password }: UpdateUserDto): Promise<User> {
    const user = await this.users.findOne({id});
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    return await this.users.save(user);
  }

  async deleteOne(id): Promise<void> {
    await this.users.delete({id})
  }
}
