import moment from "moment";
import _ from "underscore";

module.exports = function () {
    return (function (){
        this.val2 = function () {
            $context.tmp2 = "tttwefwvds";
            $context.date = moment.now();
            $context.qweqwe = _.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age')
            $session["test-key-2"] = "test-value-2";
            console.log("222: " + JSON.stringify($context.session));

            $reactions.answer("test");

            console.log("222: " + JSON.stringify($session));
            console.log("222: " + JSON.stringify($jsapi.context()));
        }
    })()
}
