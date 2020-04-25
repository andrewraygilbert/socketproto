import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let usersController: UsersController;
  const usersService = { findAll: () => ['test']};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: []
    })
    .overrideProvider(UsersService)
    .useValue(usersService)
    .compile();

    usersController = module.get<UsersController>(UsersController);

  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
