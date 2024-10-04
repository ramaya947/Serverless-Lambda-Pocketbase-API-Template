const { User } = require("../controllers/User");

const run = async (event, context) => {
    const controller = User.getInstance();

    return await controller.execute(event);
}

module.exports.run = run;