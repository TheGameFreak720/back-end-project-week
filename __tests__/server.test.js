const request = require('supertest');
const { server } = require('../api/server');
const db = require('../database/dbConfig');


describe('The route handlers', () => {

    

    describe('Managing note routes', () => {
        describe('Post /note/create', () => {

            afterEach(async () => {
                await db('notes').truncate();
                await db.seed.run();
            });

            it('responds with 201 if body is correct', async () => {
                const body = {title: 'Coding is fun', description: 'Diandra made me do TDD. SOS', user_id: 3}
                const response = await request(server).post('/note/create').send(body);

                expect(response.status).toBe(201);
                db('notes').truncate();
            });

            it('responds with the new note id', async () => {
                const body = {title: 'Coding is fun', description: 'Diandra made me do TDD. SOS', user_id: 3}
                const response = await request(server).post('/note/create').send(body);

                expect(response.body[0]).toBeGreaterThan(0);
                db('notes').truncate();
            });

            it('responds with 401 when body is missing data', async () => {
                const body = { }
                const response = await request(server).post('/note/create').send(body);

                expect(response.status).toBe(401);
                db('notes').truncate();
            });
        });

        describe('Get /note/get/all', () => {
            it('responds with 200', async () => {
                const response = await request(server).get('/note/get/all');

                expect(response.status).toBe(200);
            });

            it('responds with an object', async () => {
                const response = await request(server).get('/note/get/all');

                expect(typeof response.body).toBe('object');
            });
        });

        describe('Put /note/edit/:id', () => {
            afterEach(async () => {
                await db('notes').truncate();
                await db.seed.run();
            });

            it('responds with 200', async () => {
                const body = {title: 'Coding is fun', description: 'Diandra made me do TDD. SOS', user_id: 3};
                body.id = 3;

                const response = await request(server).put('/note/edit/3').send(body);

                expect(response.status).toBe(200);
                db('notes').truncate();
            });

            it('responds with an object', async () => {
                const body = {title: 'Coding is fun', description: 'Diandra made me do TDD. SOS', user_id: 3};
                body.id = 3;

                const response = await request(server).put('/note/edit/3').send(body);

                expect(typeof response.body).toBe('object');
                db('notes').truncate();
            });

            it('responds with 401 if body is missing data', async () => {
                const body = { }

                const response = await request(server).put('/note/edit/3').send(body);

                expect(response.status).toBe(401);
                db('notes').truncate();
            });
        });

        describe('Delete /note/delete/:id', () => {
            afterEach(async () => {
                await db('notes').truncate();
                await db.seed.run();
            });

            it('responds with 200', async () => {
                const response = await request(server).delete('/note/delete/1');

                expect(response.status).toBe(200);
                db('notes').truncate();
            });

            it('responds with the number of records removed', async () => {
                const response = await request(server).delete('/note/delete/1');

                expect(response.body).toBe(1);
                db('notes').truncate();
            });

            it('responds with 401 when params have missing data', async () => {
                const params = undefined;
                const response = await request(server).delete(`/note/delete/${params}`);

                expect(response.status).toBe(401);
            });
        });
    });
});