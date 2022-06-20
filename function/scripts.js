module.exports = function () {
    this.ScriptBlock = function ($context, $session, $client, $request, $response, $parseTree, $temp) {

        this.script__src_main_sc_5_9 = async function () {
            console.log("Это лог " + JSON.stringify(this, null, 4))
	     val2();
            console.log("333: " + JSON.stringify($context));
        }

    }
}
