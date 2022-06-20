const deps = require("./scripts.js");
const system = require("./system.js");
require("./es6/exports.js");

async function myAction (param) {
    deps();
    system();
    this.$context = param.context;
    this.$session = param.context.session;
    this.$client = param.context.client;
    this.$request = param.context.request;
    this.$response = param.context.response;
    this.$parseTree = param.context.parseTree;
    this.$temp = param.context.temp;
    const script = new scriptBlock(param.context, param.context.session, param.context.client, param.context.request, param.context.response, param.context.parseTree, param.context.temp);
    await script[param.scriptName]();
    return this.$context;
}

global.main = myAction

//const param = {"scriptName":"script__src_main_sc_5_9","context":{"tmp":{"ttt":"www"},"response":{"replies":[]},"session":{}}}
//myAction(param)
