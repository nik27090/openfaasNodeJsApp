const {Worker} = require("worker_threads");
const path = require("path");

function runWorkerAsync(method, context) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve("./function/run.js"), {
                workerData: {method, context}
            }
        );
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

const version = "1";

module.exports = async (req, context) => {

    if (req.body.healthCheck) {
        if (req.body.version === version) {
            return context
                .status(200)
        } else {
            return context
                .status(409)
        }
    }

    const reqContext = req.body.context;
    const result = await runWorkerAsync(req.body.methodName, reqContext);

    return context
        .status(200)
        .succeed(result)
}
