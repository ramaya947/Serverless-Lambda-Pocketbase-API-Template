const { Controller } = require("../../../base/Controller");
const { UserModel } = require("../../../models/UserModel");

class User extends Controller {
    static inst;

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
        this.pbInstance.authStore.save(event.headers.Authorization, null);

        const httpMethod = event.httpMethod || event.method || event?.requestContext?.http?.method || '';
        const queryParams = (!event.queryStringParameters) ? {} : ((typeof event.queryStringParameters === 'object') ? event.queryStringParameters : JSON.parse(event.queryStringParameters));
        const body = typeof event.body === 'object' ? event.body : JSON.parse(event.body);
        const path = event.requestPath || '';

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
}

module.exports.User = User;