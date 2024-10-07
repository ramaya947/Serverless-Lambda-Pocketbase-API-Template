const { User } = require('../../../../src/functions/user/controllers/User');
const { UserModel } = require('../../../../src/models/UserModel')

describe('User Controller Suite - Login', () => {
    let classController;
    let uniqueId;
    let testUser;
    let token;

    beforeAll(() => {
        classController = User.getInstance();
        uniqueId = Date.now();
        testUser = {
            username: `TEST_USERNAME-${uniqueId}`,
            email: `TEST-${uniqueId}@example.com`,
            emailVisibility: true,
            password: "12345678",
            passwordConfirm: "12345678",
            name: `TEST - ${uniqueId}`
        };
    })

    it('Test Register New User', async () => {
        var user = await classController.register(testUser);

        testUser.id = user.id;
        expect(user.id).not.toBe('');
        expect(user.id).not.toBe(null);
    })

    it('Test New User Login', async () => {
        var result = await classController.logIn(testUser.email, testUser.password);
        token = result.token;

        expect(token).not.toBe('');
        expect(token).not.toBe(null);
    })

    it('Test New User Refresh', async () => {
        classController.pbInstance.authStore.save(token, null);
        var result = await classController.refreshToken(testUser.email, testUser.password);
        token = result.token;

        expect(token).not.toBe('');
        expect(token).not.toBe(null);
    })

    it('Test New User Logout', async () => {
        classController.pbInstance.authStore.save(token, null);
        var result = await classController.logout();

        expect(result.loggedOut).toBe(true);
    })

    afterAll(async () => {
        classController.pbInstance.authStore.save(token, null);
        await classController.pbInstance.collection('users').delete(testUser.id);
    })
})