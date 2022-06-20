module.exports = (function () {

    this.val2 = function () {
	$context.tmp2 = "tttwefwvds";
        $session["test-key-2"] = "test-value-2";
        console.log("222: " + JSON.stringify($context.session));

        $reactions.answer("test");

        console.log("222: " + JSON.stringify($session));
        console.log("222: " + JSON.stringify($jsapi.context()));
    }

})()
