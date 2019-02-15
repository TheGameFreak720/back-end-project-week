// describe('Auth routes', () => {
//     describe('Post /note/register', () => {

//         afterEach(async () => {
//             await db('users').truncate();
//             await db.seed.run();
//         });


//         it('responds with 201 if body is correct', async () => {
//             const body = {
//                 name: 'Luis',
//                 email: 'luis@gmail.com',
//                 password: 'password123'
//             };

//             const response  = await request(server).post('/note/register').send(body);

//             expect(response.status).toBe(201);
//             db('users').truncate();
//         });

//         it('responds with the new user id', async () => {
//             const body = {
//                 name: 'Luis',
//                 email: 'luis@gmail.com',
//                 password: 'password123'
//             };

//             const response  = await request(server).post('/note/register').send(body);

//             expect(response.body[0]).toBeGreaterThan(0);
//             db('users').truncate();
//         });

//         it('responds with 401 when body is missing data', async () => {
//             const body = {};

//             const response  = await request(server).post('/note/register').send(body);

//             expect(response.status).toBe(401);
//             db('users').truncate();
//         });
//     });
// });