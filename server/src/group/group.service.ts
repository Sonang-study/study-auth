import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlreadyExistError } from "src/common/errors/already-exist.error";
import { UnAuthorizedError } from "src/common/errors/unAuthorized.error";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { Group } from "./entities/group.entity";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly groups: Repository<Group>,
    @InjectRepository(User) private readonly users: Repository<User>
  ) {}

  async getAllGroup(): Promise<Group[]> {
    const groupList = await this.groups.find();

    return groupList;
  }

  async createGroup({ name }, user): Promise<string> {
    const exist = await this.groups.findOne({ where: { name } });
    const userObj = await this.users.findOne({ where: { id: user.id } });

    if (exist) throw new AlreadyExistError();

    const newgroup = this.groups.create({ name });
    newgroup.masterUserId = user.id;
    newgroup.users = [userObj];

    await this.groups.save(newgroup);

    return "success create group";
  }

  async inviteUser(groupId, userId): Promise<string> {
    const user = await this.users.findOne({ where: { id: userId } });
    const group = await this.groups.findOne({
      where: { id: groupId },
      relations: ["users"],
    });

    group.users = [user, ...group.users];
    await this.groups.save(group);

    return "Sucess invite";
  }

  async updateGroup({ name }, groupId, user): Promise<string> {
    const group = await this.groups.findOne({ where: { id: groupId } });

    if (!group.masterUserId === user.id) throw new UnAuthorizedError();

    group.name = name;
    await this.groups.save(group);

    return "Sucess update";
  }

  async getMyGroup(user): Promise<Group[]> {
    const userObj = await this.users.findOne({
      where: { id: user.id },
      relations: ["groups"],
    });
    return userObj.groups;
  }

  async getGroupMembers(groupId): Promise<User[]> {
    const group = await this.groups.findOne({
      where: { id: groupId },
      relations: ["users"],
    });

    return group.users;
  }

  async deleteGroup(groupId, user): Promise<string> {
    const group = await this.groups.findOne({ where: { id: groupId } });

    if (!group.masterUserId === user.id) throw new UnAuthorizedError();

    await this.groups.delete(group);

    return "Sucess delete";
  }
}
