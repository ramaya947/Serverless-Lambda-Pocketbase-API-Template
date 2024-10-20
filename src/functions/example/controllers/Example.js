const { Controller } = require("../../../base/Controller");
const { ExampleModel } = require("../../../models/ExampleModel");

class Example extends Controller {
    static inst;

    constructor() {
        super(Example.name, ExampleModel);
    }

    static getInstance = () => {
        if (!Example.inst) {
            Example.inst = new Example();
        }

        return Example.inst;
    }

    execute = async (event) => {
        // Authenticate with Pocketbase
        this.pbInstance.authStore.save(event.headers.authorization, null);

        const httpMethod = event.httpMethod || event.method || event?.requestContext?.http?.method || '';
        const queryParams = (!event.queryStringParameters) ? {} : ((typeof event.queryStringParameters === 'object') ? event.queryStringParameters : JSON.parse(event.queryStringParameters));
        const body = typeof event.body === 'object' ? event.body : JSON.parse(event.body);

        console.log(queryParams, httpMethod);

        switch (httpMethod) {
            case 'GET':
                if (!queryParams.id && queryParams.key && queryParams.value)
                    return await this.getByParam(queryParams.key, queryParams.value);
                if (!queryParams.id)
                    return await this.getAll();
                return await this.getById(queryParams.id);
            case 'POST':
                var example = new ExampleModel(body);
                return await this.add(example.getObject());
            case 'PUT':
                var key = body.key || {};
                var updates = body.updates || {};
                
                return await this.update(key, updates);
            case 'DELETE':
                return await this.delete(queryParams.id);
            default:
                console.log('Default')
                break;
        }
    }
}

module.exports.Example = Example;