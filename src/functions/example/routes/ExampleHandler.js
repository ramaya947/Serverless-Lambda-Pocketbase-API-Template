const { Example } = require("../controllers/Example");

const run = async (event, context) => {
    const controller = Example.getInstance();

    try {
        const response = await controller.execute(event);

        return {
            status: 200,
            data: response
        }
    } catch (error) {
        console.log(error);
        return {
            status: error.status,
            message: error.message || "Internal Server Error"
        };
    }
}

module.exports.run = run;