const deps = require("./scripts.js");
const system = require("./system.js");
require("./es6/exports.js");
const {workerData, parentPort} = require("worker_threads");

const call = async function (scriptName, context) {
    deps();
    system();
    this.$context = context;
    this.$session = context.session;
    this.$client = context.client;
    this.$request = context.request;
    this.$response = context.response;
    this.$parseTree = context.parseTree;
    this.$temp = context.temp;
    const script = new scriptBlock(context, context.session, context.client, context.request, context.response, context.parseTree, context.temp);
    script[scriptName]();
    return this.$context;
}

const method = workerData.method;
const context = workerData.context;


const res = call(method, context);
res.then((r) => parentPort.postMessage(r))
    .catch(e => {
        console.error(e);
        parentPort.postMessage({e: e.toString()});
    });