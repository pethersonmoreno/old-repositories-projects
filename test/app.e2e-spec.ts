import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as typeorm from 'typeorm';
import * as request from 'supertest';
import { AppModule } from './../src/presentation/app.module';

const spyGetRepository = jest.spyOn(typeorm, 'getRepository');
beforeAll(()=>{
  spyGetRepository.mockImplementation(()=>{
    return {} as any;
  })
});
afterAll(()=>{
  spyGetRepository.mockRestore();
});

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
