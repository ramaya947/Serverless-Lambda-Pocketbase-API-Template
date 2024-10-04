const { Example } = require("../controllers/Example");

const run = async (event, context) => {
    const controller = Example.getInstance();

    return await controller.execute(event);
}

module.exports.run = run;