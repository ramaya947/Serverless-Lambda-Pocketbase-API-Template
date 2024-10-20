const { run } = require("../../../../src/functions/example/routes/ExampleHandler");
const { User } = require("../../../../src/functions/user/controllers/User");
const Config = require("../../../config.json");

describe('Example Handler Suite - CRUD', () => {
    let unique_id;
    let name;
    let description;
    let id;
    let token;
    let payload = {
        body: {},
        headers: {
          authorization: ''
        },
        requestContext: {
            http: {
                method: '',
                path: ''
            }
        },
        pathParameters: null,
        queryStringParameters: null,
      };

    beforeAll(async () => {
        var authResult = await User.getInstance().logIn({ email: Config.unitTest.Email, password: Config.unitTest.Password });
        token = authResult.token;

        unique_id = Date.now();
        name = `Unit Test Name - ${unique_id}`;
        description = `Unit Test Description - ${unique_id}`;
    })

    it('Test Add Example', async () => {
        var pl = structuredClone(payload);
        pl.body = { name, description };
        pl.requestContext.http.method = 'POST';
        pl.headers.authorization = token;

        var result = await run(pl, {});
        
        expect(result?.data?.name).toBe(name);
        expect(result?.data?.description).toBe(description);

        id = result.data.id;
    })

    it('Test Retrieve Example', async () => {
        var pl = structuredClone(payload);
        pl.requestContext.http.method = 'GET';
        pl.headers.authorization = token;
        pl.queryStringParameters = {
            id
        }

        var result = await run(pl, {});
        
        expect(result?.data?.name).toBe(name);
    })

    it('Test Update Example', async () => {
        var pl = structuredClone(payload);
        pl.requestContext.http.method = 'PUT';
        pl.headers.authorization = token;
        pl.body = {
            key: id,
            updates: {
                'name': name + ' - Updated'
            }
        }

        var result = await run(pl, {});
        
        expect(result?.data?.name).toBe(name + ' - Updated');
    })

    it('Test Delete Example', async () => {
        var pl = structuredClone(payload);
        pl.requestContext.http.method = 'DELETE';
        pl.headers.authorization = token;
        pl.queryStringParameters = {
            id
        };

        var result = await run(pl, {});

        expect(result.data).toBe(true);
    });

    it('Confirm Example Deletion', async () => {
        var pl = structuredClone(payload);
        pl.requestContext.http.method = 'GET';
        pl.headers.authorization = token;
        pl.queryStringParameters = {
            id
        }

        var result = await run(pl, {});
        
        expect(result?.status).toBe(404);
    })
});