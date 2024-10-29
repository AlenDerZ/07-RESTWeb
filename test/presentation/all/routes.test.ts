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

    const all1 = {name: 'Hua Cheng'};
    const all2 = {name: 'Xie Lian'};

    test('should return ALLs api/all', async() => {

        await prisma.all.deleteMany();
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
})