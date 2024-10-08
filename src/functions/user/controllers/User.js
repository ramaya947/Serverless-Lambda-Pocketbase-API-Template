const { Controller } = require("../../../base/Controller");
const { UserModel } = require("../../../models/UserModel");

class User extends Controller {
    static inst;
    dbName = 'users';

    constructor() {
        super(User.name, UserModel);
    }

    static getInstance = () => {
        if (!User.inst) {
            User.inst = new User();
        }

        return User.inst;
    }

    execute = async (event) => {
        // Authenticate with Pocketbase
        this.pbInstance.authStore.save(event.headers.authorization, null);

        const httpMethod = event.httpMethod || event.method || event?.requestContext?.http?.method || '';
        const queryParams = (!event.queryStringParameters) ? {} : ((typeof event.queryStringParameters === 'object') ? event.queryStringParameters : JSON.parse(event.queryStringParameters));
        const body = typeof event.body === 'object' ? event.body : JSON.parse(event.body);
        const path = event?.requestContext?.http?.path || '';

        console.log(queryParams, httpMethod);
        if (httpMethod === 'GET') {
            if (path === '/user/logout')
                return await this.logout()
            // Refresh Token
            return await this.refreshToken()
        }

        if (httpMethod === 'POST') {
            // Log in / Register
            if (path === '/user/register')
                return await this.register(body);
            else 
                return await this.logIn(body);
        }
    }

    logIn = async ({ email, password }) => {
        try {
            const authData = await this.pbInstance.collection(this.dbName).authWithPassword(email, password);
        } catch (error) {
            // TODO: Replace with Error Handling Class
            return "Incorrect credentials, login failed";
        }

        if (this.pbInstance.authStore.isValid) {
            return { token:  this.pbInstance.authStore.token };
        }

        // TODO: Replace with Error Handling Class
        return "Error on login";
    }

    refreshToken = async () => {
        try {
            const authData = await this.pbInstance.collection(this.dbName).authRefresh();
        } catch (error) {
            // TODO: Replace with Error Handling Class
            return "Incorrect credentials, login failed";
        }

        if (this.pbInstance.authStore.isValid) {
            return { token:  this.pbInstance.authStore.token };
        }

        // TODO: Replace with Error Handling Class
        return "Error on login";
    }

    logout = async () => {
        this.pbInstance.authStore.clear();

        return { loggedOut: (this.pbInstance.authStore?.model?.id) ? false : true }
    }

    register = async (payload) => {
        const record = await this.pbInstance.collection(this.dbName).create(payload);

        return record
    }
}

module.exports.User = User;