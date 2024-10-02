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
        this.pbInstance.authStore.save(event.headers.Authorization, null);

        const httpMethod = event.httpMethod || event.method || '';
        const queryParams = (!event.query) ? {} : ((typeof event.query === 'object') ? event.query : JSON.parse(event.query));
        const body = typeof event.body === 'object' ? event.body : JSON.parse(event.body);

        
    }
}