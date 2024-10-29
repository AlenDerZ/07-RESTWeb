import { envs } from '../src/config/envs';
import { Server } from '../src/presentation/server';

jest.mock('../src/presentation/server');

describe('Tesing App.ts', () => {

    test('should call server with arguments and start', async () => {

        await import('../src/app');

        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            public_path: envs.PUBLIC_PATH,
            routers: expect.any(Function),
        });
        expect(Server.prototype.start).toHaveBeenCalledTimes(1);

    })
})