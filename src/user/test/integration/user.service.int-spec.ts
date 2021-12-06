import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

describe('UserService Int', () => {
  let prisma: PrismaService;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService);
    await prisma.cleanDatabase();
  });

  describe('createUser()', () => {
    it('should create user', async () => {
      const user = await userService.createUser(
        'john@skynet.com',
        'John',
        'Connor',
      );
      expect(user.email).toBe('john@skynet.com');
    });

    it('should throw on duplicate email', async () => {
      try {
        await userService.createUser('john@skynet.com', 'John', 'Connor');
      } catch (error) {
        expect(error.status).toBe(403);
      }
    });
  });
});
