const myAction = require("./myAction.js");

async function kek(param) {
  return  myAction(param);
}
global.main = kek

//const param = {"scriptName":"script__src_main_sc_5_9","context":{"tmp":{"ttt":"www"},"response":{"replies":[]},"session":{}}}
//myAction(param)
