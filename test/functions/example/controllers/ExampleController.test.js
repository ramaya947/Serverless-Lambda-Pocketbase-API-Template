const { Example } = require("../../../../src/functions/example/controllers/Example");
const { User } = require("../../../../src/functions/user/controllers/User");
const { ExampleModel } = require("../../../../src/models/ExampleModel");

describe('Example Controller Suite - CRUD', () => {
    let classController;
    let unique_id;
    let name;
    let description;
    let id;
    let token;

    beforeAll(async () => {
        var authResult = await User.getInstance().logIn({ email: "test-user@email.com", password: "Test!2024"});
        token = authResult.token;

        classController = Example.getInstance();
        classController.setAuthToken(token);

        unique_id = Date.now();
        name = `Unit Test Name - ${unique_id}`;
        description = `Unit Test Description - ${unique_id}`;
    })

    it('Test Add Example', async () => {
        var payload = {
            name,
            description
        };

        payload = new ExampleModel(payload);
        var result = await classController.add(payload);
        
        expect(name).toBe(result.name);
        expect(description).toBe(result.description);

        id = result.id;
    })

    it('Test Get Newly Added Example', async () => {
        var result = await classController.getByParam('name', name);

        expect(result.length).toBe(1);
        expect(result[0].name).toBe(name);
    })

    it ('Test Update Newly Added Example', async () => {
        var key = id;
        var updates = {
            'name': name + ' - Updated'
        }

        var result = await classController.update(key, updates);

        expect(result.name).toBe(name + ' - Updated');
    })

    it ('Test Get Newly Updated Example', async () => {
        var result = await classController.getByParam('name', name + ' - Updated');

        expect(result.length).toBe(1);
        expect(result[0].name).toBe(name + ' - Updated');
    })

    it ('Test Delete Example', async () => {
        var result = await classController.delete(id);

        expect(result).toBe(true);
    })

    it ('Confirm Deletion', async () => {
        await expect(classController.getById(id)).rejects.toThrow();
    })
})