import { Injectable } from "@nestjs/common";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from "@casl/ability";
import { Action } from "./action.enum";
import { TaskDay } from "src/tasks/entities/task.day.entity";

type Subjects =
  | InferSubjects<typeof Task | typeof User | typeof TaskDay>
  | "all";

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  PermissionForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) can(Action.Manage, "all");

    can(Action.Update, User, { id: user.id });
    can(Action.Delete, User, { id: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  PermissionForTask(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, "all");
    } else {
      can(Action.Read, "all");
    }

    can(Action.Update, Task, { userId: user.id });
    can(Action.Delete, Task, { userId: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  PermissionForTaskDay(user: User, taskId: number) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, "all");
    } else {
      can(Action.Read, "all");
    }

    can(Action.Update, TaskDay, { taskId });
    can(Action.Delete, TaskDay, { taskId });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
