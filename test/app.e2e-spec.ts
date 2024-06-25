import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

  it('/todos (GET)', () => {
    return request(app.getHttpServer()).get('/todos').expect(401);
  });

  it('/todos/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/todos/1')
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            text: expect.any(String),
          }),
        );
      })
  });

  it('/todos (POST)', () => {
    return request(app.getHttpServer())
    .post('/todos')
    .send({ name: 'Новый туду' })
    .expect(201)
    .expect(res => {
      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          text: expect.any(String),
        }),
      );
    })
  });

  it('/todos/1 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/todos/1')
      .expect(401);
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
