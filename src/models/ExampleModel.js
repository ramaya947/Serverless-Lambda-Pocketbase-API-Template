const uuidv4 = require('uuid').v4;

class ExampleModel {
    id;
    name;
    description;

    constructor(obj) {
        this.id = (!obj.id || typeof obj.id != 'string') ? "" : obj.id;
        this.name = (!obj.name || typeof obj.name != 'string') ? "" : obj.name;
        this.description = (!obj.description || typeof obj.description != 'string') ? "" : obj.description;
    }

    getObject = () => {
        return {
            id: this.id,
            name: this.name,
            description: this.description
        }
    }
}

module.exports.ExampleModel = ExampleModel;