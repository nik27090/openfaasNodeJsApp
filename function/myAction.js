const system = require("./system.js");
const exports1 = require("./es6/exports.js");
const scripts = require("./scripts.js");

async function myAction (param) {
    system();
    exports1();
    scripts();

    this.$context = param.context;
    this.$session = param.context.session;
    this.$client = param.context.client;
    this.$request = param.context.request;
    this.$response = param.context.response;
    this.$parseTree = param.context.parseTree;
    this.$temp = param.context.temp;


    const script = new ScriptBlock(
        param.context,
        param.context.session,
        param.context.client,
        param.context.request,
        param.context.response,
        param.context.parseTree,
        param.context.temp
    );
    await script[param.scriptName]();
    return this.$context;
}

module.exports = myAction
