const { run } = require("../../../../src/functions/user/routes/UserHandler");
const { User } = require("../../../../src/functions/user/controllers/User");

describe('User Handler Suite - CRUD', () => {
    let unique_id;
    let testUser;
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
        unique_id = Date.now();
        testUser = {
            username: `TEST_USERNAME-${unique_id}`,
            email: `TEST-${unique_id}@example.com`,
            emailVisibility: true,
            password: "12345678",
            passwordConfirm: "12345678",
            name: `TEST - ${unique_id}`
        };
    })

    it('Test Register New User', async () => {
        var pl = structuredClone(payload);
        pl.body = testUser;
        pl.requestContext.http.method = 'POST';
        pl.requestContext.http.path = '/user/register'

        var result = await run(pl, {});
        var user = result.data;
        
        testUser.id = user.id;
        expect(user.id).not.toBe('');
        expect(user.id).not.toBe(null);
    })

    it('Test New User Login', async () => {
        var pl = structuredClone(payload);
        pl.body = { email: testUser.email, password: testUser.password };
        pl.requestContext.http.method = 'POST';
        pl.requestContext.http.path = '/user'

        var result = await run(pl, {});
        token = result.data?.token;
        
        expect(token).not.toBe('');
        expect(token).not.toBe(null);
    })

    it('Test New User Refresh', async () => {
        var pl = structuredClone(payload);
        pl.headers.authorization = token;
        pl.requestContext.http.method = 'GET';
        pl.requestContext.http.path = '/user'

        var result = await run(pl, {});
        token = result.data?.token;
        
        expect(token).not.toBe('');
        expect(token).not.toBe(null);
    })

    it('Test New User Logout', async () => {
        var pl = structuredClone(payload);
        pl.headers.authorization = token;
        pl.requestContext.http.method = 'GET';
        pl.requestContext.http.path = '/user/logout'

        var result = await run(pl, {});
        
        expect(result.data?.loggedOut).toBe(true);
    })

    afterAll(async () => {
        var classController = User.getInstance()

        classController.pbInstance.authStore.save(token, null);
        await classController.pbInstance.collection('users').delete(testUser.id);
    })
})