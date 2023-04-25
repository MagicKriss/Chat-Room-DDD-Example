import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/storage/prisma-service/prisma.service';
import { UserEmailInUseException } from 'src/user/user.exceptions';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let user: User;
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);
    user = await prisma.user.create({
      data: {
        username: 'TestUser',
        email: 'testuser@example.com',
      },
    });

    await app.init();
  });
  afterAll(async () => {
    await prisma.truncate();
    await prisma.$disconnect();
    await app.close();
  });

  describe('POST /api/v1/user/new', () => {
    it('Creates a new user', async () => {
      const beforeCount = await prisma.user.count();
      const { status, body } = await request(app.getHttpServer())
        .post('/user/new')
        .set({
          'content-type': 'application/json',
        })
        .send({
          username: 'JaneDoe007',
          email: 'JohnDoe007@example.com',
        });
      const afterCount = await prisma.user.count();
      expect(status).toBe(201);
      expect(body).toMatchObject({
        id: expect.any(Number),
        username: 'JaneDoe007',
        email: 'JohnDoe007@example.com',
      });
      expect(afterCount).toBe(beforeCount + 1);
    });

    it('Returns an error if user already exists', async () => {
      const beforeCount = await prisma.user.count();

      const { status, body } = await request(app.getHttpServer())
        .post('/user/new')
        .set({
          'content-type': 'application/json',
        })
        .send({
          username: 'AnotherJohnDoe007',
          email: 'JohnDoe007@example.com',
        });
      const afterCount = await prisma.user.count();

      expect(body).toMatchObject({
        statusCode: HttpStatus.BAD_REQUEST,
        message: new UserEmailInUseException().message,
      });
      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(afterCount).toEqual(beforeCount);
    });
  });

  describe('GET /api/v1/user/get-by-id', () => {
    it('Returns user by id', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/user/get-by-id?id=${user.id}`,
      );

      expect(status).toBe(HttpStatus.OK);
      expect(body).toMatchObject({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    });
    it('Returns an error if user does not exist', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/user/get-by-id?id=999999999`,
      );

      expect(status).toBe(HttpStatus.NOT_FOUND);
      expect(body).toMatchObject({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    });
    it('Returns validation error if id is invalid string', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/user/get-by-id?id=string-id`,
      );
      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(body).toMatchObject({
        statusCode: HttpStatus.BAD_REQUEST,
        message: expect.stringContaining('Expected number'),
      });
    });
    it('Returns validation error if id is negative', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/user/get-by-id?id=-1`,
      );
      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(body).toMatchObject({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Number must be greater than 0',
      });
    });
  });

  describe('GET /api/v1/user/get-by-email', () => {
    it('Returns user by email', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/user/get-by-email?email=${user.email}`,
      );

      expect(status).toBe(HttpStatus.OK);
      expect(body).toMatchObject({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    });
    it('Returns an error if user does not exist', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/user/get-by-email?email=non-existin@example.eu`,
      );
      expect(status).toBe(HttpStatus.NOT_FOUND);
      expect(body).toMatchObject({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    });
    it('Returns validation error if email is not valid', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/user/get-by-email?email=not-an-email`,
      );
      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(body).toMatchObject({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid email',
      });
    });
  });
});
