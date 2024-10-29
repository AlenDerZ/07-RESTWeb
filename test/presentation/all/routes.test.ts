import request from 'supertest';
import { testServer } from '../../test-server';

describe('All route testing', () => {

    beforeAll( async() => {
        await testServer.start();
    });
    
    afterAll(() => {
        testServer.close();
    });

    test('should return ALLs api/all', async() => {

        const response = await request(testServer.app)
            .get('/api/all')
            .expect(200); 

        console.log(response.body);

    })
})