import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';
import exp from 'constants';

describe('All route testing', () => {

    beforeAll( async() => {
        await testServer.start();
    });
    
    afterAll(() => {
        testServer.close();
    });

    beforeEach( async() => {
        await prisma.all.deleteMany();
    });

    const all1 = {name: 'Hua Cheng'};
    const all2 = {name: 'Xie Lian'};

    test('should return ALLs api/all', async() => {

        await prisma.all.createMany({
            data: [all1, all2]
        });

        const {body} = await request(testServer.app)
            .get('/api/all')
            .expect(200); 

        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(2);
        expect(body[0].name).toBe(all1.name);
        expect(body[1].name).toBe(all2.name);
        expect(body[0].completedAt).toBeUndefined();
        expect(body[1].completedAt).toBeUndefined();

    })

    test('should return ALL api/all:id', async() => {
        
        const all = await prisma.all.create({data: all1});

        const {body} = await request(testServer.app)
            .get(`/api/all/${all.id}`)
            .expect(200);

        expect(body).toEqual({
            id: all.id,
            name: all.name
        });
    })

    test('should return a 404 NotFound api/all:id', async() => {

        const id = 9999;
        const {body} = await request(testServer.app)
            .get(`/api/all/${id}`)
            .expect(404);

            expect( body ).toEqual( { error: `All with id ${ id } not found` } );
    })

    test('should return a new All api/all', async() => {
        
        const {body} = await request(testServer.app)
            .post('/api/all')
            .send(all1)
            .expect(201);

        expect(body).toEqual({
            id: expect.any(Number),
            name: all1.name
        })
    })

    test('should return an error if name is not present in api/all', async() => {
        
        const {body} = await request(testServer.app)
            .post('/api/all')
            .send({ name : ''})
            .expect(400);

        expect(body).toEqual({error: expect.any(String)})
    })

    test('should return an error if name is empty in api/all', async() => {
        
        const {body} = await request(testServer.app)
            .post('/api/all')
            .send({ })
            .expect(400);

        expect(body).toEqual({error: expect.any(String)})
    })

    test('should return a updated All api/all:id', async() => {

        const all = await prisma.all.create({data: all2});
        
        const {body} = await request(testServer.app)
            .put(`/api/all/${all.id}`)
            .send({name: 'Hua Cheng', completedAt: '2022-10-29'})
            .expect(200);

        expect(body).toEqual({
            id: expect.any(Number),
            name: 'Hua Cheng',
            completedAt: '2022-10-29T00:00:00.000Z'
        })
    })

    test('should return 404 if ALL not found', async() => {
    
        const all = await prisma.all.create({data: all2});
        
        const {body} = await request(testServer.app)
            .put(`/api/all/9999`)
            .send({name: 'Hua Cheng', completedAt: '2022-10-29'})
            .expect(404);
        
        expect(body).toEqual({error: `All with id 9999 not found`})
    })

    test('should return and updated ALL only the date', async() => {

        const all = await prisma.all.create({data: all2});
        
        const {body} = await request(testServer.app)
            .put(`/api/all/${all.id}`)
            .send({completedAt: '2022-10-29'})
            .expect(200);
    
        expect(body).toEqual({
            id: expect.any(Number),
            name: all.name,
            completedAt: '2022-10-29T00:00:00.000Z'
        })

    })

    test('should delete a ALL api/all:id', async() => {
        
        const allCreated = await prisma.all.create({data: all1});

        console.log(allCreated.id);

        const {body} = await request(testServer.app)
            .delete(`/api/all/${allCreated.id}`)
            .expect(200);
        
        console.log(body);
        
        expect(body).toEqual({
            id: expect.any(Number),
            name: allCreated.name, 
            completedAt: null
        })

    })

    test('should return 404 if all not exist api/all:id', async() => {
    
        const {body} = await request(testServer.app)
            .delete(`/api/all/999`)
            .expect(404);
        
        expect(body).toEqual({error: `All with id 999 not found`})

    })
})