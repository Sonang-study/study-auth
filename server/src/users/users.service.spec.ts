import * as bcrypt from 'bcrypt'
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from "src/auth/auth.service";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory";
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from "./entities/user.entity";
import { CreateUserDto } from './dtos/createUser.dto';
import { AlreadyExistError } from "src/common/errors/already-exist.error";
import { number } from 'joi';
import { DoesNotExistError } from 'src/common/errors/doesNot-exist.error';

enum SignupMethod {
  local = 'local',
  google = 'google',
}

enum Role {
  ADMIN = 'admin',
  GROUP_OWNER = 'groupOwner',
  USER = 'user',
}

const mockUserId = '1';
const mockJwt = 'thisisjwt';

const password = '1q2w3e4r!';

const mockUser = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'test@naver.com',
  password: bcrypt.hashSync(password, 10),
  signupMethod: SignupMethod.local,
  role: Role.USER,
}

const mockTask = {
  date: '2022-02-02',
  plan: 'testplan',
  image: 'imageUrl',
  userId: 1,
}
class MockUsersRepository {
  create = jest.fn().mockResolvedValue(mockUser)
  save = jest.fn().mockResolvedValue(mockUser)

  async findOne(condition: { where: { id?:string, email?:string }}) {
    const where = condition.where;
    const {password, ...mockUserWithoutPassword} = mockUser;

    if (where?.id == mockUserId) return mockUserWithoutPassword
    else if (where?.email === mockUser.email) return mockUserWithoutPassword
    else return null
  }
}

const mockAuthService = () => ({
  responseJWT: jest.fn().mockResolvedValue(mockJwt),
})

const mockCaslAbilityFactory = () => ({
  PermissionForUser: {
    can: jest.fn().mockResolvedValue(true),
  }
})

describe('UsersService', () => {
  let usersService: UsersService
  let usersRepository: MockUsersRepository
  let authService: AuthService
  let caslAbilityFactory: CaslAbilityFactory
  let existedUser

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
        {
          provide: AuthService,
          useValue: mockAuthService(),
        },
        {
          provide: CaslAbilityFactory,
          useValue: mockCaslAbilityFactory(),
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get(getRepositoryToken(User));
    caslAbilityFactory = module.get<CaslAbilityFactory>(CaslAbilityFactory);

    existedUser = {
      id: 1,
      email: mockUser.email,
      password: mockUser.password,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      signupMethod: mockUser.signupMethod,
      role: mockUser.role,
    }
  });

  it('userService 정의', () => {
    expect(usersService).toBeDefined();
  });

  describe('회원가입', () => {
    const newUser: CreateUserDto = {
      email: 'new@naver.com',
      password: '1q2w3e4r!',
      firstName: 'newFirst',
      lastName: 'newLast',
      signupMethod: SignupMethod.local,
      role: Role.USER,
    }

    it('create 함수 정의 ', () => {
      expect(usersService.create).toBeDefined()
    })

    it('유저 정보의 이메일은 유일해야 하므로 중복 이메일 검사', async () => {
      await expect(
        usersService.create(existedUser),
      ).rejects.toThrowError(new AlreadyExistError())
    })

    it('유저 정보를 인자로 받고 새로운 유저를 생성하고 아무것도 반환하지 않는다.', async () => {
      await expect(usersService.create(newUser)).resolves.toBe(mockJwt)
    })
  })

  describe('내 정보 가져오기', () => {
    it('getMe 함수 정의', () => {
      expect(usersService.getMe).toBeDefined()
    })
    it('실제 내 정보 가져오기', async () => {
      const {password, ...mockUserWithoutPassword} = mockUser;
      await expect(usersService.getMe(existedUser)).resolves.toEqual(mockUserWithoutPassword)
    })
  })

  describe('유저 id 이용해서 유저 정보 가져오기', () => {
    it('getOne 함수 정의', () => {
      expect(usersService.getOne).toBeDefined()
    })
    it('없는 유저의 id로 검색했을 경우', async () => {
      await expect(usersService.getOne(2)).rejects.toThrowError(new DoesNotExistError())
    })
    it('존재하는 유저의 id로 검색했을 경우', async () => {
      const {password, ...mockUserWithoutPassword} = mockUser;
      await expect(usersService.getOne(mockUserId)).resolves.toEqual(mockUserWithoutPassword)
    })
    
  })
});
