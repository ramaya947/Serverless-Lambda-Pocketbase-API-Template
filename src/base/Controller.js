const Pocketbase = require('pocketbase/cjs');
const Constants = require('../constants/Constants.json');

class Controller {
    dbTable;
    client;
    docClient;
    pbInstance;
    Model;

    POCKETBASE_URL = Constants.POCKETBASE.POCKETBASE_URL;

    constructor (db, model) {
        this.pbInstance = new Pocketbase(this.POCKETBASE_URL);
        this.dbTable = db.toLowerClase();
        this.Model = model;
    }

    /**
     * For use when Controller is called from other Controller and is not directly setup within the Lambda Flow
     *
     * @param {number} a - The first number to add.
     * @param {number} b - The second number to add.
     * @returns {number} The sum of a and b.
     * @throws {TypeError} If the inputs cannot be converted to numbers.
     */
    setAuthToken = (token) => {
        this.pbInstance.authStore.save(token, null);
    }

    getAll = async () => {
        var records = await this.pbInstance.collection(this.dbTable).getFullList({
            sort: '-created',
            '$autoCancel': false
        });

        records = records.map(record => {
            return new this.Model(record).getObject();
        });
    }

    getById = async (id = "") => {
        var record = await this.pbInstance.collection(this.dbTable).getOne(`${id}`, {
            '$autoCancel': false
        });

        return new this.Model(record).getObject();
    }

    getByIds = async (ids = []) => {
        var records = [];

        ids.forEach(async id => {
            const record = await this.pbInstance.collection(this.dbTable).getFirstListItem({
                filter: `id = "${id}`,
                '$autoCancel': false
            });

            if (record)
                    records.push(record);
        });

        return records;
    }

    getByParam = async (key = "", value = "") => {
        var records = await this.pbInstance.collection(this.dbTable).getFullList({
            sort: '-created',
            filter: `${key} = "${value}`,
            '$autoCancel': false
        });

        records = records.map(record => {
            return new this.Model(record).getObject();
        });

        return records;
    }

    add = async (obj = {}) => {
        if (Object.keys(obj).length === 0) {
            // TODO: Replace with Error Handling Class
            return "Empty objects cannot be added";
        }

        var record = await this.pbInstance.collection(this.dbTable).create(obj);

        return new this.Model(record).getObject();
    }

    update = async (key = {}, updates = {}) => {
        if (Object.keys(updates).length === 0 || Object.keys(key).length === 0) {
            // TODO: Replace with Error Handling Class
            return "Empty objects cannot be added";
        }

        var record = await this.pbInstance.collection(this.dbTable).update(key, updates);

        return new this.Model(record).getObject();
    }

    delete = async (key = {}) => {
        if (Object.keys(key).length === 0) {
            // TODO: Replace with Error Handling Class
            return "Key must be provided in order to delete an item";
        }

        var response = await this.pbInstance.collection(this.dbTable).delete(key);

        // TODO: Test and confirm if this is needed, this seems redundant
        return response === true ? true : false
    }
}

module.exports.Controller = Controller;