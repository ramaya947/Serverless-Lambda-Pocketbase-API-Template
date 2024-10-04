const { User } = require('../../../functions/user/controllers/User');
const { UserModel } = require('../../../../src/models/UserModel')

describe('User Controller Suite - Login', () => {
    let classController;

    beforeAll(() => {
        classController = User.getInstance();
    })
})