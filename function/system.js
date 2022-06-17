const moment = require("moment-timezone");
const StatePath = require("./StatePath");
const TimeoutIntervalUtility = require("./TimeoutIntervalUtility");

const version = {"buildBranch":"${branch.name}","buildNumber":"${build.number}","buildDate":"${build.date}","buildChangeSet":"${git.commit.id}","projectArtifactId":"botserver","projectVersion":"ZB-15898-SNAPSHOT","shortVersion":"0.0.0.${build.number}-${branch.name}"};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function currentTime() {
    return Date.now();
}

function timeForZone(zone) {
    return moment(currentTime()).tz(zone).valueOf()
}

function timeForZone(zone, format) {
    return moment(currentTime()).tz(zone).format(format)
}

function resolvePath(basePath, relativePath) {
    return StatePath.parse(basePath).resolve(relativePath).toString();
}

const timeoutUtil = new TimeoutIntervalUtility();

const $jsapi = {
    createCache: () => {},
    context: () => {
        return $context
    },
    global: () => {
        return $context
    },
    answerMaxSize: 10000,
    version: version,
    random: getRandomInt,
    currentTime: currentTime,
    timeForZone: timeForZone,
    resolvePath: resolvePath,
    utils: {
        timeout: timeoutUtil.parseToSeconds
    },
    bind: (arg) => {},
    bind: (arg1, arg2, arg3, arg4) => {}
}

String.prototype.contains = function(arg) {
    return this.includes(arg);
}

function bind(arg1, arg2, arg3, arg4) {}

var $reactions = new function () {
    // private
    var tmlpCache = $jsapi.createCache();
    var TRANSITIONS_HISTORY_SIZE = 10;

    var template = function (tmpl) {
        if (typeof tmpl === "undefined" || tmpl === "") {
            return "";
        }
        if (!tmpl.contains("{{")) {
            return tmpl;
        }

        var $context = $jsapi.context();
        var compiled = tmlpCache[tmpl];
        if (!compiled) {
            try {
                compiled = _.template(tmpl, {variable: '$global, $context, $parseTree, $client, $session, $request, $response, $temp, $injector, $entities'});
            } catch (e) {
                log("FAILED TEMPLATE: " + tmpl + "\nTEMPLATE FUNCTION BODY:\n" + e.source);
                throw e;
            }
            tmlpCache[tmpl] = compiled;
        }

        return compiled($jsapi.global(), $context, $context.parseTree, $context.client, $context.session, $context.request, $context.response, $context.temp, $context.injector, $context.entities);
    };

    this.template = template;

    // public
    this.answer = function (arg) {
        var $context = $jsapi.context();
        var ttsText;
        var htmlText;
        var htmlEnabled = true
        if (typeof (arg) !== "string" && typeof (arg) !== "object") {
            arg = arg + "";
        }
        if (typeof (arg) !== "object") {
            arg = {value: arg};
        }
        if ((typeof (arg.value) !== "undefined" && (arg.value) !== "")
            && (arg.value.length > $jsapi.answerMaxSize)) {
            throw new Error("Too long answer. Maximum expected size = " + $jsapi.answerMaxSize + ", actual size = " + arg.value.length);
        }
        var text = template(arg.value, $context);
        if(text.length > $jsapi.answerMaxSize) {
            throw new Error("Too long response. Maximum expected size = " + $jsapi.answerMaxSize + ", actual size = " + text.length);
        }
        if (typeof (arg) === "object" && arg.hasOwnProperty("tts")) {
            ttsText = template(arg.tts, $context);
        }
        if (typeof (arg) === "object" && arg.hasOwnProperty("html")) {
            htmlText = template(arg.html, $context);
        }
        if (typeof (arg) === "object" && arg.hasOwnProperty("htmlEnabled")) {
            if (typeof (arg.htmlEnabled) === "boolean") {
                htmlEnabled = arg.htmlEnabled
            } else if ((typeof (arg.htmlEnabled) === "string") && arg.htmlEnabled === "false") {
                htmlEnabled = false;
            }
        }
        var $response = $context.response;

        // 1. fill replies
        $response.replies = $response.replies || [];
        var r = {
            type: "text",
            text: text,
            state: $context.currentState
        };
        if (ttsText) {
            r.tts = ttsText;
        }
        if (htmlText && htmlEnabled) {
            r.html = htmlText;
        }
        if (typeof (arg.lang) === "string") {
            r.lang = arg.lang;
        } else {
            var $request = $context.request;
            if ($request && $request.language) {
                r.lang = $request.language;
            }
        }
        applyReplyTransition(arg, r, $context, $context.session);
        pushReply(r, $response);

        // 2. fill answer
        if ($response.answer) {
            $response.answer = $response.answer + "\n\n" + text;
        } else {
            $response.answer = text;
        }
    };

    this.audio = function (arg) {
        var $context = $jsapi.context();
        if (typeof (arg) !== "string" && typeof (arg) !== "object") {
            arg = arg + "";
        }
        if (typeof (arg) !== "object" || Array.isArray(arg)) {
            arg = {value: arg};
        }

        var audioUrl = template(arg.value, $context);


        // fill replies
        var r = {
            type: "audio",
            audioUrl: audioUrl,
            state: $context.currentState
        };
        if (typeof (arg.name) === "string") {
            r.audioName = arg.name;
        }
        applyReplyTransition(arg, r, $context, $context.session);
        pushReply(r);
    };

    this.video = function (arg) {
        var $context = $jsapi.context();
        if (typeof (arg) !== "string" && typeof (arg) !== "object") {
            arg = arg + "";
        }
        if (typeof (arg) !== "object" || Array.isArray(arg)) {
            arg = {value: arg};
        }

        var videoUrl = template(arg.value, $context);

        // fill replies
        var r = {
            type: "video",
            videoUrl: videoUrl,
            state: $context.currentState
        };
        if (typeof (arg.name) === "string") {
            r.videoName = arg.name;
        }
        applyReplyTransition(arg, r, $context, $context.session);
        pushReply(r);
    };

    this.ttsWithVariables = function(arg) {
        var $context = $jsapi.context();

        if (!arg || (typeof (arg) !== "object")) {
            throw new Error("Illegal ttsTemplate argument: " + JSON.stringify(arg));
        }

        if (!arg.value) {
            arg = { value: arg };
        }

        if (!arg.value.textTemplate) {
            throw new Error("Illegal ttsTemplate argument: " + JSON.stringify(arg));
        }

        arg.value.text = $jsapi.resteriskJSApiHelper.textFromTtsTemplateReply(arg.value.textTemplate);

        var ttsTemplateReply = $jsapi.resteriskJSApiHelper.createTtsTemplateReply(arg.value);

        var reply = {
            type: "ttsTemplate",
            ttsTemplate: ttsTemplateReply,
            state: $context.currentState
        };

        applyReplyTransition(arg,reply,$context,$context.session);
        pushReply(reply);
    }

    function applyReplyTransition(arg, responce, $context, $session) {
        if (($context.request && $context.request.channelType === 'resterisk') === false) {
            return;
        }
        var trans = null;
        var label = null;
        var bargeInIf = null;
        var emptyBargeinIf = "";
        var ignoreBargeIn = false;
        if (typeof (arg.bargin_transition) === "string") {
            trans = arg.bargin_transition;
        } else if (typeof (arg.bargeInTransition) === "string") {
            trans = arg.bargeInTransition;
        }

        if (typeof (arg.bargin_label) === "string") {
            label = arg.bargin_label;
        } else if (typeof (arg.bargeInLabel) === "string") {
            label = arg.bargeInLabel;
        }


        if (typeof (arg.ignoreBargeIn) === "boolean") {
            ignoreBargeIn = arg.ignoreBargeIn
        } else if ((typeof (arg.ignoreBargeIn) === "string") && arg.ignoreBargeIn === "true") {
            ignoreBargeIn = true;
        }
        if (!ignoreBargeIn) {
            if (typeof (arg.bargeInIf) === "boolean") {
                if (arg.bargeInIf === true) {
                    bargeInIf = label || emptyBargeinIf;
                }
            } else if (typeof (arg.bargeInIf) === "string") {
                if (arg.bargeInIf === "true") {
                    bargeInIf = label || emptyBargeinIf;
                } else {
                    bargeInIf = arg.bargeInIf;
                }
            }
        }
        var bargeInIntent = null;
        if (ignoreBargeIn) {
            bargeInIntent = {
                type: "ignoreBargeIn"
            };
        } else if (bargeInIf != null) {
            bargeInIntent = {
                type: "intent"
            }
        }

        var needSaveTransitionCondition = trans || label || bargeInIf;
        var id = null;
        if (needSaveTransitionCondition || ignoreBargeIn) {
            var lastParam;
            if (needSaveTransitionCondition) {
                lastParam = bargeInIf;
            } else {
                lastParam = "ignore";
            }
            id = $jsapi.createBarginReplyId(label, trans, lastParam);
            responce.bargeInReply = {
                bargin_transition: id,
                bargeInIntent: bargeInIntent
            }
        }

        if (needSaveTransitionCondition) {
            var transArray = $session.bargin_transitions = $session.bargin_transitions || [];
            var resolvedTransitionState = trans == null ? null : resolveStateRelativeToCurrent(trans, $context, $context.currentState);
            transArray.push({
                label: label,
                trans: trans,
                bargeInIf: bargeInIf,
                mapping: resolvedTransitionState,
                id: id
            });
        }
    }

    this.transition = function (arg) {
        var $context = $jsapi.context();
        if (typeof (arg) === "string") {
            arg = {
                value: arg,
                deferred: false
            };
        }

        var path = template(arg.value, $context);
        if (!path || path.length === 0) {
            throw new Error("Empty state is not allowed");
        }

        $context.temp.transition = {
            state: path,
            deferred: arg.deferred || false
        };

        $context.session.transitionsHistory = $context.session.transitionsHistory || [];
        var history = $context.session.transitionsHistory;

        if (history.length >= TRANSITIONS_HISTORY_SIZE) {
            history.shift();
        }
        history.push($context.temp.transition);
    };

    this.transitionFromHistory = function (num) {
        var $context = $jsapi.context();

        var history = $context.session.transitionsHistory;
        if (!history) {
            log("Warning! History is empty");
            this.transition("/");
            return false;
        }
        if (num >= history.length) {
            log.warn("Warning! Transitions history has no such element :" + num);
        }
        return this.transition(history[history.length - num - 1]);
    };

    this.location = function (ll, lg) {
        var $context = $jsapi.context();
        pushReply({
            type: "location",
            lat: ll,
            lon: lg
        });
    };

    this.newSession = function (arg) {
        $jsapi.newSession(arg);
    };

    var smartRandom = function (max, $context) {
        var id = $context.currentState + "_" + max;
        var store = $context.session.smartRandom || {};
        $context.session.smartRandom = store;

        // simple keeping max/2 previous elements
        var prev = store[id] || [];
        store[id] = prev;

        // retry random until we get new index
        var i;
        var ic = 0;
        while (ic < max * 5) { // dont make more than max*5 iterations to avoid infinite loop
            ic++;
            // generate random number
            i = $jsapi.random(max);
            // getting return index
            if (prev.indexOf(i) == -1) {
                break;
            }
        }

        prev.push(i);

        if (prev.length > max / 2) {
            prev.shift();
        }

        return i;
    };

    this.random = function (arg) {
        var $context = $jsapi.context();
        if (typeof (arg) === "number") {
            arg = {value: arg};
        }
        var max = arg.value;

        //return $jsapi.random(max);

        var rd = $context.request.data;

        var i = 0;
        try {
            if (rd && Array.isArray(rd.smartRandom) && rd.smartRandom.length > 0) {
                i = rd.smartRandom.shift();
            } else {
                i = smartRandom(max, $context);
            }
        } catch (err) {
            // TODO: redirect output of print function into log
            print(err);
        }

        $context.response.smartRandom = $context.response.smartRandom || [];
        $context.response.smartRandom.push(i);
        return i;
    };

    this.image = function (arg) {
        var $context = $jsapi.context();
        if (typeof arg === 'string') {
            arg = {url: arg};
        }
        arg.url = template(arg.url, $context);

        var replies = pushReply({
            type: "image",
            imageUrl: arg.url,
            state: $context.currentState
        });
        log(replies);
    };

    function nullOrUndefinedToString(arg) {
        if (arg === null) {
            arg = "null"
        }
        if (arg === undefined) {
            arg = "undefined"
        }
        return arg
    }

    var createOneButtonNode = function (arg, $context) {
        var hasText = false
        arg = nullOrUndefinedToString(arg)
        if (typeof arg === 'number') {
            arg = arg.toString()
        }
        if (typeof arg === 'string') {
            arg = {text: arg};
        }
        for (var k in arg) {
            if (k === "text") {
                hasText = true
                arg[k] = nullOrUndefinedToString(arg[k])
                if (typeof arg[k] === 'object') {
                    arg[k] = JSON.stringify(arg[k])
                }
                if (typeof arg[k] !== 'string') {
                    arg[k] = arg[k].toString()
                }
            }
            if (typeof arg[k] === 'string') {
                arg[k] = template(arg[k], $context);
            }
        }
        if (!hasText) {
            throw new Error("The `text` field is missing in the buttons response.");
        }
        return arg;
    };

    var createButtonNode = function (arg, $context) {
        var ret = [];
        for (var i = 0; i < arg.length; i++) {
            var e = arg[i];
            e = nullOrUndefinedToString(e)
            if (!e.button) {
                e = {
                    button: arg[i]
                };
                arg[i] = e;
            }
            ret.push(createOneButtonNode(e.button, $context));
        }
        return ret;
    };

    var createTransitionsNode = function (arg, reply, $context) {
        var buttons = reply.buttons;
        var ret = [];
        for (var i = 0; i < arg.length; i++) {
            var text;
            if (typeof arg[i].button === "object") {
                text = arg[i].button.text;
            } else {
                text = arg[i].button;
            }
            if (text) {
                var mapping = arg[i].mapping || arg[i].button.transition;
                if (mapping) {
                    text = template(text, $context);
                    mapping = resolveStateRelativeToCurrent(mapping, $context, $context.currentState);
                    ret.push({text: text, mapping: mapping});
                    buttons[i].transition = mapping;
                }
            }
        }
        return ret;
    };

    function resolveStateRelativeToCurrent(state, $context, currentState) {
        var mapping = state;
        mapping = template(mapping, $context);
        mapping = $jsapi.resolvePath(currentState, mapping);
        return mapping;
    }

    var buttons0 = function (arg, $context, type) {
        arg = nullOrUndefinedToString(arg)
        if (typeof arg !== 'string' && typeof arg !== 'object') {
            arg = arg.toString()
        }
        if (!_.isArray(arg)) {
            arg = [arg];
        }
        var $session = $context.session;

        var r = {
            type: type,
            buttons: createButtonNode(arg, $context),
            state: $context.currentState
        };
        pushReply(r);

        $session.transitions = $session.transitions || [];
        $session.transitions = $session.transitions.concat(createTransitionsNode(arg, r, $context));
    };

    this.buttons = function (arg) {
        var $context = $jsapi.context();
        buttons0(arg, $context, "buttons");
    };

    this.inlineButtons = function (arg) {
        var $context = $jsapi.context();
        buttons0(arg, $context, "inlineButtons");
    };

    this.checkButtonTransition = function () {
        function normalize(text) {
            return text.toLowerCase().replace("ё", "е")
        }

        var $context = $jsapi.context();
        var trans = $context.session.transitions;
        if (!trans || !$context.request.query || $context.request.event) {
            $context.session.transitions = [];
            return;
        }
        var text = $context.request.query;

        for (var i = 0; i < trans.length; i++) {
            var t = trans[i];
            if ((t.text) && text && normalize(t.text) === normalize(text)) {
                $context.temp.targetState = t.mapping;
                break;
            }
        }
        $context.session.transitions = [];
    };

    this.checkBackState = function () {
        var $context = $jsapi.context();
        if ($context.temp.targetState == null) {
            var text = $context.parseTree.text;
            if (text) {
                if (text.toLowerCase() == "назад" || text.toLowerCase() == "back") {
                    // TODO :
                    $context.temp.targetState = popBackState();
                }
            }
        }
    };

    this.timeout = function (arg) {
        function parseInterval(arg) {
            switch (typeof arg.interval) {
                case "string":
                    return $jsapi.utils.timeout.parseToSeconds(arg.interval);
                case "number":
                    return arg.interval;
                default:
                    throw new Error("Illegal timeout argument " + JSON.stringify(arg, null, "  "));
            }
        }

        function getTargetState(arg) {
            var targetStateArg = arg.targetState || arg.value;

            return targetStateArg.startsWith("/")
                ? targetStateArg
                : $jsapi.resolvePath($jsapi.context().currentState, targetStateArg);
        }

        function checkForTimeoutReplyDuplication() {
            var repliesWithoutTimeouts = $response.replies.filter(function (r) {
                return r.type !== "timeout"
            });
            if (repliesWithoutTimeouts.length !== $response.replies.length) {
                throw new Error("Only one 'timeout' reaction per state is allowed!");
            }
        }

        function getResponseWithInitializedReplies() {
            var $response = $jsapi.context().response;
            $response.replies = $response.replies || [];
            return $response;
        }

        var $response = getResponseWithInitializedReplies();

        checkForTimeoutReplyDuplication();

        pushReply({
            type: "timeout",
            interval: parseInterval(arg),
            targetState: getTargetState(arg)
        }, $response);
    };

    function pushReply(reply, response) {
        var $response = $jsapi.context().response || [];
        $response = typeof response !== 'undefined' ? response : $response;
        $response.replies = $response.replies || [];
        var repliesSizeLimit = ($jsapi.context().restrictions || {}).repliesSizeLimit;
        if ($response.replies.length > repliesSizeLimit) {
            throw new Error("Response replies cannot exceed " + repliesSizeLimit + ", your replies was " + $response.replies.length);
        } else {
            $response.replies.push(reply);
        }
        return $response.replies;
    }

    this.pushReply = pushReply;

    $jsapi.bind({
        type: "preMatch",
        handler: this.checkButtonTransition,
        path: "/",
        name: "zenbot.buttonsHandler"
    });

    $jsapi.bind({
        type: "postProcess",
        handler: function ($context) {
            if ($context.request.channelType === "facebook") {
                $context.response.facebookMenuTitle = $context.response.facebookMenuTitle || "Menu";
                if (!($context.response.facebookPlainButtons === false)) {
                    $context.response.facebookPlainButtons = true;
                }
            }
        },
        path: "/",
        name: "zenbot.facebookMenuTitle"
    });

    $jsapi.bind({
        type: "slotFillingProcess",
        handler: function ($context) {
            $context.session.slot = $context.session.slot || {};

            if ($context.session.slot.customSlotFillingProcess) {
                $context.session.slot.currentStateForSlotFilling = $context.temp.classifierTargetState;
                $context.session.slot.customSlotFillingProcess = false;
            } else if ($context.emptySlots && $context.emptySlots.length > 0) {
                if (!$context.session.slot) {
                    $context.session.slot = {};
                    $context.session.slot.index = 0;
                }
                if ($context.slots.nextSlotToFill) {
                    for (var i = 0; i < $context.emptySlots.length; i++) {
                        if ($context.emptySlots[i].name === $context.slots.nextSlotToFill) {
                            $context.slots.nextSlotToFill = null;
                            $context.session.slot.index = i;
                            break;
                        }
                    }
                }

                var notFoundSlot = $context.emptySlots[$context.session.slot.index]; // get first slot from
                for (var i = $context.session.slot.index; i < $context.emptySlots.length; i++) {
                    if ($context.emptySlots[i].name !== $context.session.slot.currentSlotName) {
                        $context.session.slot.index = i;
                        notFoundSlot = $context.emptySlots[$context.session.slot.index];
                        break;
                    }
                }
                if (!notFoundSlot) {
                    $context.session.slot.index = 0;
                    notFoundSlot = $context.emptySlots[$context.session.slot.index];
                }

                $context.session.slot.currentSlotName = notFoundSlot.name;
                // ответ из подсказок слота
                $reactions.answer($reactions.nextPromtForSlot(notFoundSlot.prompts).value);

                // запоминаем текущий стейт где происходит заполнение слотов в client
                $context.session.slot.currentStateForSlotFilling = $context.temp.classifierTargetState;

                $context.client.slots = $context.client.slots || {};
                $context.client.slots[notFoundSlot.name] = $context.client.slots[notFoundSlot.name] || {};
                $context.client.slots[notFoundSlot.name].asked = true;

                $context.temp.targetState = $context.temp.classifierTargetState + '/slot-filling';
            } else if ($context.session.slot.currentStateForSlotFilling && $context.session.slot.currentStateForSlotFilling.length > 0) {
                $context.temp.targetState = $context.session.slot.currentStateForSlotFilling;
                $context.session.slot.currentStateForSlotFilling = null;
                $context.client.entities = {};
                $context.client.slots = {};
                $context.session.slot = {};
            }
        },
        path: "/",
        name: "zenbot.slotFilling"
    });

    this.nextPromtForSlot = function (prompts) {
        if (!prompts || prompts.length === 0) {
            return {"value": "empty"};
        }
        return prompts[Math.floor(Math.random() * prompts.length)];
    };

    this.ignoreSlotProcess = function () {
        var $context = $jsapi.context();
        $context.session.slot = $context.session.slot || {};
        $context.session.slot.customSlotFillingProcess = true;
    };

    this.fillSlot = function (slotName, slotValue, slotsForIngore) {
        var $context = $jsapi.context();
        $context.slots = $context.slots || {};
        $context.slots[slotName] = {};
        if (slotValue) {
            $context.slots[slotName].value = typeof slotValue === "string" ? slotValue : JSON.stringify(slotValue)
        }
        if (slotsForIngore && slotsForIngore.ignore) {
            this.ignoreSlot.apply(this, slotsForIngore.ignore);
        }
    };

    this.ignoreSlot = function () {
        for (var slotName in arguments) {
            if (typeof arguments[slotName] === 'string') {
                this.fillSlot(arguments[slotName])
            }
        }
    };

    this.getPromptForSlot = function (slotName, index) {
        var $context = $jsapi.context();
        if (!slotName) {
            return null;
        }
        if (!index) {
            return 0;
        }
        return $context.allSlots[slotName].prompts[index].value
    };

    this.getCurrentSlot = function () {
        var $context = $jsapi.context();
        $context.session.slot = $context.session.slot || {};
        return $context.session.slot.currentSlotName;
    };

    this.getSlotValue = function (slotName) {
        var $context = $jsapi.context();

        var slot = $context.slots[slotName];
        return slot ? slot.value : null;
    };

    this.resetCurrentSlotFillingProcess = function (value) {
        var $context = $jsapi.context();
        $context.session.slot = $context.session.slot || {};
        $context.session.slot.currentSlotName = value;
        $context.session.slot.index = 0;
    };

    this.isSlotAsked = function (slotName) {
        var $context = $jsapi.context();
        if ($context.client && $context.client.slots && slotName) {
            var slot = $context.client.slots[slotName];
            return slot && slot.asked === true;
        }
        return false;
    };

    this.customTag = function (arg) {
        function substituteContextVariables(arg) {
            for (var key in arg) {
                arg[key] = template(arg[key], $jsapi.context());
            }
        }

        substituteContextVariables(arg)
        log(arg);
        var td = $customTags[arg.customTagName];
        if (td.botId) {
            this.customTagWithContextSwitch(arg);
        } else {
            this.customTagWithTransition(arg);
        }
    };

    this.customTagWithTransition = function (arg) {
        arg.withTransition = true;

        var td = $customTags[arg.customTagName];
        var params = params || []
        $jsapi.context().request.data =
            {
                args: arg,
                params: params,
                tag: td,
                original: $jsapi.context().request.data
            };
        this.transition(td.startState);
    };

    this.customTagWithContextSwitch = function (arg) {
        arg.withContextSwitch = true;

        var td = $customTags[arg.customTagName];
        var params = params || []
        pushReply({
            type: "context-switch",
            targetBotId: td.botId,
            targetState: td.startState,
            parameters: {
                args: arg,
                params: params,
                tag: td,
                original: $jsapi.context().request.data
            }
        });
    };

    this.setClientTimezone = function (timezone) {
        if (timezone == null || typeof timezone === 'undefined') {
            log("Null timezone was set")
        }
        $jsapi.context().client.timezone = timezone;
    }

    this.getClientTimezone = function () {
        return $jsapi.context().client.timezone;
    }

}();

// TODO need refactor! Если в сценарии указаны scriptsPreLoad, то не проходит загрузка необходимых скриптов, смотри com.justai.zb.scenarios.engine.BaseScriptingEngine::init0
bind('preMatch', function ($context) {
    var $request = $context.request;
    if ($request.channelType === 'resterisk' && ($request.query === '/start' || $request.event === 'onCallNotConnected')) {
        $jsapi.startSession();
    }
}, '/', 'Resterisk /start new session preMatch');

var $dialer = new function () {
    var colorRegexp = /^#([0-9a-f]{6})$/i;

    function getCallId() {
        var callId = null;
        try {
            callId = $jsapi.context().request.rawRequest.originateData.callId;
        } catch (e) {
            log("ERROR");
            log(e);
            log(JSON.stringify(e));
        }
        return callId;
    }

    function initDialerContext(ctx) {
        ctx.response = ctx.response || {};
        ctx.response.dialer = ctx.response.dialer || {};
        return ctx.response.dialer;
    }

    this.addCallTag = function (tag, payload, color) {

        if (color && !colorRegexp.test(color)) {
            log("Wrong tag color: " + color);
            color = null;
        }

        var $context = $jsapi.context();

        var callId = getCallId();

        if (!callId) {
            log("callId is not defined! Can't set call tag");
            return;
        }

        if (payload instanceof Object) {
            payload = JSON.stringify(payload)
        }
        var maxLenPayload = cutExcelMaxSizeAndReturn(payload, CUT_EXCEL_NULL);
        var key = tag;
        var tagData = {
            "tagPayload": maxLenPayload || null,
            "tagColor": color || null
        };
        log("setting call tag for call " + callId + ": " + " key:" + key + " " + JSON.stringify(tagData));

        var $dialerResponse = initDialerContext($context);
        $dialerResponse.callTags = $dialerResponse.callTags || {};
        $dialerResponse.callTags[key] = tagData;
    };

    this.setCallResult = function (result, payload) {
        var $context = $jsapi.context();

        var callId = getCallId();
        if (!callId) {
            return;
        }

        if (payload instanceof Object) {
            payload = JSON.stringify(payload)
        }

        log("setting call result for call " + callId + ": " + result + " " + (payload || ""));
        var $dialerResponse = initDialerContext($context);
        $dialerResponse.callResult = result;
        $dialerResponse.callResultPayload = payload || null;
    };

    this.reportData = function (header, value, order) {
        var $context = $jsapi.context();

        var callId = getCallId();
        if (!callId) {
            return;
        }

        if (typeof header !== "string") {
            log("header must be string! Ignoring reportData() call!");
            return;
        }

        if (value instanceof Object) {
            value = JSON.stringify(value)
        }

        if (isNaN(Number(order))) {
            order = 0
        }
        if (value == null) {
            throw new Error("$dialer.reportData require value not null");
        }
        var maxLenPayload = cutExcelMaxSizeAndReturn(value, CUT_EXCEL_SUBSTRING);
        var key = header.substring(0, 255);
        var reportVal = {
            "value": maxLenPayload,
            "order": order
        };

        log("setting report data for call " + callId + " " + key + " : " + JSON.stringify(reportVal));
        var $dialerResponse = initDialerContext($context);
        $dialerResponse.reportData = $dialerResponse.reportData || {};
        $dialerResponse.reportData[key] = reportVal;
    };

    var CUT_EXCEL_SUBSTRING = true;
    var CUT_EXCEL_NULL = false;

    function cutExcelMaxSizeAndReturn(payload, type) {
        if (payload == null) {
            return null;
        }
        var str;
        if (typeof payload === "string") {
            str = payload;
        } else {
            str = JSON.stringify(payload);
        }
        var size = str.length
        var MAX_SIZE = 30000
        if (size > MAX_SIZE) {
            log("payload size " + size + " > maxSize " + MAX_SIZE);
            if (type === CUT_EXCEL_SUBSTRING) {
                return str.substring(0, MAX_SIZE);
            } else if (type === CUT_EXCEL_NULL) {
                return null;
            } else {
                throw new Error("invalid arg" + type);
            }
        } else {
            return payload;
        }
    }

    this.setCallResultAccepted = function (payload) {
        this.setCallResult("ACCEPTED", payload);
    };

    this.setCallResultRejected = function (payload) {
        this.setCallResult("REJECTED", payload);
    };

    this.hangUp = function (textMessage) {
        var $context = $jsapi.context();
        if ($context.request.channelType === 'resterisk') {
            $reactions.pushReply({type: "hangup"});
        } else if (textMessage) {
            $reactions.answer(textMessage);
        }
    };

    this.getCaller = function () {
        try {
            return $jsapi.context().request.rawRequest.caller;
        } catch (e) {
        }
    };

    this.getPayload = function () {
        try {
            return $jsapi.context().request.rawRequest.originateData.payload;
        } catch (e) {
            return {};
        }
    };

    this.getSipHeaders = function () {
        try {
            return $jsapi.context().request.rawRequest.headers;
        } catch (e) {
            return {};
        }
    };

    this.isBarginInterrupted = function () {
        var $context = getResteriskContext();
        if ($context == null) {
            return false;
        }
        return $jsapi.isBarginInterrupted();
    };

    this.isBargeInInterrupted = function () {
        return this.isBarginInterrupted();
    }

    this.getBarginLabel = function () {
        var barginTransitionData = getBarginTransitionData();
        if (barginTransitionData != null) {
            return barginTransitionData.label;
        }
        return null
    };

    this.getBargeInLabel = function () {
        return this.getBarginLabel();
    }

    this.getBarginTransition = function () {
        var barginTransitionData = getBarginTransitionData();
        if (barginTransitionData != null) {
            return barginTransitionData.trans;
        }
        return null
    };

    this.getBargeInTransition = function () {
        return this.getBarginTransition();
    }

    function getBarginTransitionData() {
        var $context = getResteriskContext();
        if ($context != null && $context.session != null) {
            return $context.session.bargin_transition_user;
        }
        return null;
    }

    function getResteriskContext() {
        if ($jsapi.context().request != null
            && $jsapi.context().request.rawRequest != null) {
            return $jsapi.context();
        }
        return null;
    }

    this.getCallRecordingPath = function () {
        try {
            return $jsapi.context().request.rawRequest.data.callRecordingFile;
        } catch (e) {
        }
    };

    this.bargeInResponse = function (params) {
        var $context = $jsapi.context();
        $context.response = $context.response || {};
        $context.response.bargeIn = {
            bargin: params.bargeIn,
            bargin_trigger: params.bargeInTrigger,
            no_interupt_time: params.noInterruptTime
        };
    }

    this.bargeInInterrupt = function (interrupt) {
        var $context = $jsapi.context();
        $context.response = $context.response || {};
        $context.response.bargeInInterrupt = {
            interrupt: interrupt
        };
    }

    function getBotSpeechCustom() {
        var $context = $jsapi.context();
        $context.response = $context.response || {};
        return $context.response.botSpeechCustom || null;
    }

    function setBotSpeechCustom(botSpeechCustom) {
        var $context = $jsapi.context();
        $context.response = $context.response || {};
        $context.response.botSpeechCustom = botSpeechCustom;
    }

    this.mrcpSpeechCustom = function (params) {
        var botCustomSpeech = getBotSpeechCustom();
        var updated = $jsapi.resteriskJSApiHelper.updateMrcpSpeechCustom(botCustomSpeech, params);
        setBotSpeechCustom(updated);
    }

    this.mrcpSetVoice = function (voice) {
        var botCustomSpeech = getBotSpeechCustom();
        var updated = $jsapi.resteriskJSApiHelper.setMrcpCustomVoice(botCustomSpeech, voice);
        setBotSpeechCustom(updated);
    }

    this.getTransferStatus = function () {
        return $jsapi.getTransferStatus();
    };

    this.getBargeInIntentStatus = function () {
        var barginTransitionData = getBarginTransitionData();
        if (barginTransitionData == null) {
            throw new Error("barginTransitionData is null");
        } else if (barginTransitionData.bargeInIntentStatus == null) {
            throw new Error("bargeInIntentStatus is null");
        } else {
            return barginTransitionData.bargeInIntentStatus;
        }
    }

    this.redial = function (params) {
        var $context = $jsapi.context();

        var callId = getCallId();
        if (!callId) {
            log("callId is not defined! Can't make redial");
            return;
        }
        if (!params || _.isEmpty(params)) {
            error("Invocation without parameters is forbidden. Please specify startDateTime or localTimeFrom at least")
        }
        var startDateTime = params.startDateTime;
        var finishDateTime = params.finishDateTime;
        var allowedDays = params.allowedDays;
        var localTimeFrom = params.localTimeFrom;
        var localTimeTo = params.localTimeTo;
        var retryIntervalInMinutes = params.retryIntervalInMinutes;
        var maxAttempts = params.maxAttempts;
        var allowedTime = params.allowedTime;
        var dialerPriority = params.dialerPriority;

        var allowedDaysFormat = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

        if (!checkDate(startDateTime)) {
            error("startDateTime must be instanceof Date, got " + JSON.stringify(startDateTime))
        }
        if (!checkDate(finishDateTime)) {
            error("finishDateTime must be instanceof Date, got " + JSON.stringify(finishDateTime))
        }
        if (startDateTime >= finishDateTime) {
            error("startDateTime must be less than finishDateTime")
        }
        if (!checkAllowedDays(allowedDays)) {
            error("allowedDays must be an array of " + allowedDaysFormat + ", got " + JSON.stringify(allowedDays))
        }
        if (!checkLocalTime(localTimeFrom)) {
            error("localTimeFrom should match pattern HH:MM, got " + JSON.stringify(localTimeFrom))
        }
        if (!checkLocalTime(localTimeTo)) {
            error("localTimeTo should match pattern HH:MM, got " + JSON.stringify(localTimeTo))
        }
        if (!checkNumber(retryIntervalInMinutes, 1, +Infinity)) {
            error("retryIntervalInMinutes must be a positive integer, got " + JSON.stringify(retryIntervalInMinutes))
        }
        if (!checkNumber(maxAttempts, 1, 50)) {
            error("maxAttempts must be an integer in interval [1, 50], got " + JSON.stringify(maxAttempts))
        }
        if (!checkAllowedTime(allowedTime)) {
            error("allowedTime format is invalid");
        }
        if (!checkDialerPriority(dialerPriority)) {
            error("dialerPriority must be an integer in interval [1, 5], got " + JSON.stringify(dialerPriority))
        }
        var $dialerResponse = initDialerContext($context);
        $dialerResponse.redial = {
            startDateTime: startDateTime ? startDateTime.getTime() : undefined,
            finishDateTime: finishDateTime ? finishDateTime.getTime() : undefined,
            allowedDays: (allowedDays && allowedDays.length === 0) ? undefined : allowedDays,
            localTimeFrom: localTimeFrom,
            localTimeTo: localTimeTo,
            retryIntervalInMinutes: retryIntervalInMinutes,
            maxAttempts: maxAttempts,
            allowedTime: allowedTime,
            dialerPriority: dialerPriority
        };
        log("setting redial for call " + callId + " " + JSON.stringify($dialerResponse.redial));

        //--------------------------------

        function error(msg) {
            throw new Error("$dialer.redial params error. " + msg);
        }

        function checkDate(value) {
            return isNotDefined(value) || (value instanceof Date);
        }

        function checkNumber(value, min, max) {
            return isNotDefined(value) || (typeof value === "number" && value >= min && value <= max)
        }

        function checkLocalTime(value) {
            var localTimeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return isNotDefined(value) || localTimeRegex.test(value)
        }

        function checkAllowedDays(days) {
            return isNotDefined(days) || (_.isArray(days) && (days.length === 0 || _.all(days, validDayFormat)));
        }

        function validDayFormat(day) {
            return _.contains(allowedDaysFormat, day)
        }

        function checkDialerPriority(priority) {
            return isNotDefined(priority) || checkNumber(priority, 1, 5)
        }

        function isNotDefined(value) {
            return _.isNull(value) || _.isUndefined(value)
        }

        function checkAllowedTime(value) {
            if (isNotDefined(value)) {
                return true;
            }

            if (!_.isObject(value)) {
                return false;
            }
            var days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", "default"];
            var keys = _.keys(value);

            for (var k = 0; k < keys.length; k++) {
                var key = keys[k]
                if (!_.contains(days, key)) {
                    return false
                }
            }

            for (var i = 0; i <= 7; i++) {
                var day = value[days[i]]

                if (isNotDefined(day)) {
                    continue;
                }

                if (!_.isArray(day)) {
                    return false
                }

                for (var j = 0; j < day.length; j++) {
                    if (!checkTimeInterval(day[j])) {
                        return false;
                    }
                }
            }

            return true;
        }

        function checkTimeInterval(value) {
            if (isNotDefined(value) || _.isEmpty(value)) {
                return false;
            }

            var from = value.localTimeFrom
            var to = value.localTimeTo

            if (!from || !to) {
                return false;
            }

            return checkLocalTime(from) && checkLocalTime(to)
        }
    };
    this.getCampaignSchedule = function () {
        return $jsapi.resteriskJSApiHelper.getCampaignSchedule();
    };
    this.getDialSchedule = function () {
        return $jsapi.resteriskJSApiHelper.dialSchedule();
    };
    this.getCampaignToken = function () {
        return $jsapi.resteriskJSApiHelper.getCampaignToken()
    };
    this.getAbonentTimezone = function () {
        return $jsapi.resteriskJSApiHelper.getAbonentTimezone()
    };
    this.getCallNotConnectedReason = function () {
        return $jsapi.resteriskJSApiHelper.getCallNotConnectedReason();
    };
    this.getAudioToken = function () {
        return $jsapi.resteriskJSApiHelper.getAudioToken();
    }
    this.getCallRecordingFullUrl = function () {
        return $jsapi.resteriskJSApiHelper.getCallRecordingFullUrl();
    }
    this.getDialHistory = function () {
        return $jsapi.resteriskJSApiHelper.getDialHistory();
    }
}();

var $caila = new function () {
    this.markup = function (query) {
        try {
            return $jsapi.cailaService.markup(query);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.markupWithToken = function (query, classifierToken) {
        try {
            return $jsapi.cailaService.markupWithToken(query, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.entitiesLookup = function (query, showAll, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.entitiesLookup(query, showAll, clientId);
            } else {
                return $jsapi.cailaService.entitiesLookup(query, showAll);
            }
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.entitiesLookupWithToken = function (query, showAll, classifierToken) {
        try {
            return $jsapi.cailaService.entitiesLookupWithToken(query, showAll, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.entitiesLookupWithToken = function (query, showAll, classifierToken, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.entitiesLookupWithToken(query, showAll, classifierToken, clientId);
            } else {
                return $jsapi.cailaService.entitiesLookupWithToken(query, showAll, classifierToken);
            }

        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.simpleInference = function (query, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.simpleInference(query, clientId);
            } else {
                return $jsapi.cailaService.simpleInference(query);
            }

        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.simpleInferenceWithToken = function (query, classifierToken, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.simpleInferenceWithToken(query, classifierToken, clientId);
            } else {
                return $jsapi.cailaService.simpleInferenceWithToken(query, classifierToken);
            }

        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.inference = function (requestData, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.inference(requestData, clientId);
            } else {
                return $jsapi.cailaService.inference(requestData);
            }

        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.inferenceWithToken = function (requestData, classifierToken, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.inferenceWithToken(requestData, classifierToken, clientId);
            } else {
                return $jsapi.cailaService.inferenceWithToken(requestData, classifierToken);
            }

        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.inflectWithDictVersion = function (text, tags, dictVersion) {
        try {
            return $jsapi.cailaService.inflect(text, tags, dictVersion);
        } catch (e) {
            log(e);
        }
    };

    this.inflectWithDictVersionWithToken = function (text, tags, dictVersion, classifierToken) {
        try {
            return $jsapi.cailaService.inflectWithToken(text, tags, dictVersion, classifierToken);
        } catch (e) {
            log(e);
        }
    };

    this.inflect = function (text, tags) {
        try {
            return $jsapi.cailaService.inflect(text, tags, "v1");
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.inflectWithToken = function (text, tags, classifierToken) {
        try {
            return $jsapi.cailaService.inflectWithToken(text, tags, "v1", classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.conform = function (text, number) {
        try {
            return $jsapi.cailaService.conform(text, number);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.detectLanguage = function (words) {
        try {
            return $jsapi.cailaService.detectLanguage(words);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.detectLanguageWithToken = function (words, classifierToken) {
        try {
            return $jsapi.cailaService.detectLanguageWithToken(words, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.conformWithToken = function (text, number, classifierToken) {
        try {
            return $jsapi.cailaService.conformWithToken(text, number, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.checkVocabulary = function (checkVocabularyRequestData) {
        try {
            return $jsapi.cailaService.checkVocabulary(checkVocabularyRequestData);
        } catch (e) {
            log(e);
            throw e;
        }
    }

    this.checkVocabularyWithToken = function (checkVocabularyRequestData, cailaToken) {
        try {
            return $jsapi.cailaService.checkVocabularyWithToken(checkVocabularyRequestData, cailaToken);
        } catch (e) {
            log(e);
            throw e;
        }
    }

    this.getEntity = function (entityName) {
        try {
            return $jsapi.cailaService.getEntity(entityName);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.getEntityWithToken = function (entityName, cailaToken) {
        try {
            return $jsapi.cailaService.getEntityWithToken(entityName, cailaToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.setClientEntityRecords = function (entityName, records, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.setClientEntityRecords(entityName, records, clientId);
            } else {
                return $jsapi.cailaService.setClientEntityRecords(entityName, records);
            }

        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.setClientEntityRecordsWithToken = function (entityName, records, classifierToken, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.setClientEntityRecordsWithToken(entityName, records, classifierToken, clientId);
            } else {
                return $jsapi.cailaService.setClientEntityRecordsWithToken(entityName, records, classifierToken);
            }

        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.getClientEntityRecords = function (entityName, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.getClientEntityRecords(entityName, clientId);
            } else {
                return $jsapi.cailaService.getClientEntityRecords(entityName);
            }
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.getClientEntityRecordsWithToken = function (entityName, classifierToken, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.getClientEntityRecordsWithToken(entityName, classifierToken, clientId);
            } else {
                return $jsapi.cailaService.getClientEntityRecordsWithToken(entityName, classifierToken);
            }

        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.addClientEntityRecords = function (entityName, records, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.addClientEntityRecords(entityName, records, clientId);
            } else {
                return $jsapi.cailaService.addClientEntityRecords(entityName, records);
            }
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.addClientEntityRecordsWithToken = function (entityName, records, classifierToken, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.addClientEntityRecordsWithToken(entityName, records, classifierToken, clientId);
            } else {
                return $jsapi.cailaService.addClientEntityRecordsWithToken(entityName, records, classifierToken);
            }
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.setClientEntityRecord = function (entityName, record, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.setClientEntityRecord(entityName, record, clientId);
            } else {
                return $jsapi.cailaService.setClientEntityRecord(entityName, record);
            }
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.setClientEntityRecordWithToken = function (entityName, record, classifierToken, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.setClientEntityRecordWithToken(entityName, record, classifierToken, clientId);
            } else {
                return $jsapi.cailaService.setClientEntityRecordWithToken(entityName, record, classifierToken);
            }
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.deleteClientEntityRecords = function (entityName, recordIds, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.deleteClientEntityRecords(entityName, recordIds, clientId);
            } else {
                return $jsapi.cailaService.deleteClientEntityRecords(entityName, recordIds);
            }
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.deleteClientEntityRecordsWithToken = function (entityName, recordIds, classifierToken, clientId) {
        try {
            if (clientId) {
                return $jsapi.cailaService.deleteClientEntityRecordsWithToken(entityName, recordIds, classifierToken, clientId);
            } else {
                return $jsapi.cailaService.deleteClientEntityRecordsWithToken(entityName, recordIds, classifierToken);
            }
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.setClientNerId = function (clientNerId) {
        try {
            return $jsapi.cailaService.setClientNerId(clientNerId);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.clearClientNerId = function () {
        try {
            return $jsapi.cailaService.clearClientNerId();
        } catch (e) {
            log(e);
            throw e;
        }
    };
}();

var $pushgate = new function () {
    this.createPushback = function (channelType, botId, chatId, event, eventData) {
        try {
            return $jsapi.pushgateService.createPushback(channelType, botId, chatId, event, eventData);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.createEvent = function (timeDate, event, eventData, channelType, botId, chatId) {
        try {
            var $request = $jsapi.context().request;

            event = typeof event !== 'undefined' ? event : "timerEvent";
            eventData = typeof eventData !== 'undefined' ? eventData : {};
            channelType = typeof channelType !== 'undefined' ? channelType : $request.channelType;
            botId = typeof botId !== 'undefined' ? botId : $request.botId;
            chatId = typeof chatId !== 'undefined' ? chatId : $request.channelUserId;

            return $jsapi.pushgateService.createScheduledPushback(timeDate, channelType, botId, chatId, event, eventData);
        } catch (e) {
            log(e);
            throw e;
        }
    };

    this.cancelEvent = function (id) {
        try {
            $jsapi.pushgateService.deleteScheduledPushback(id);
        } catch (e) {
            log(e);
            throw e;
        }
    };
}();

var $analytics = new function () {

    function initAnalyticsContext(ctx) {
        ctx.response = ctx.response || {};
        ctx.response.analytics = ctx.response.analytics || {};
        return ctx.response.analytics;
    }

    this.setSessionResult = function (result) {
        var $context = $jsapi.context();
        initAnalyticsContext($context).sessionResult = result;

        if ($context.request && $context.request.channelType === 'resterisk') {
            $dialer.setCallResult(result)
        }
    };

    this.setSessionResultWithoutCallResult = function (result) {
        var $context = $jsapi.context();
        initAnalyticsContext($context).sessionResult = result;
    };

    this.setSessionData = function (header, value) {
        var $context = $jsapi.context();

        if (typeof header !== "string") {
            log("header must be string! Ignoring setSessionData() call!");
            return;
        }

        if (value instanceof Object) {
            value = JSON.stringify(value)
        }

        if (value == null) {
            throw new Error("$analytics.setSessionData require value not null");
        }

        var key = header.substring(0, 255);

        var MAX_SIZE = 30000;
        if (value.length > MAX_SIZE) {
            log("Value size " + value.length + " > maxSize " + MAX_SIZE);
            value = value.substring(0, MAX_SIZE);
        }

        var $analyticsContext = initAnalyticsContext($context);
        $analyticsContext.sessionData = $analyticsContext.sessionData || {};
        $analyticsContext.sessionData[key] = value;

        if ($context.request && $context.request.channelType === 'resterisk') {
            $dialer.reportData(header, value)
        }
    };

    this.setComment = function (comment) {
        if (typeof comment !== "string") {
            log("comment must be string! Ignoring setComment() call!");
            return;
        }

        initAnalyticsContext($jsapi.context()).comment = comment;
    };

    this.setSessionLabel = function (labelName) {
        if (typeof labelName !== "string") {
            log("labelName must be string! Ignoring setSessionLabel() call!");
            return;
        }

        var $analyticsContext = initAnalyticsContext($jsapi.context());
        $analyticsContext.sessionLabels = $analyticsContext.sessionLabels || [];

        if ($analyticsContext.sessionLabels.indexOf(labelName) < 0) {
            $analyticsContext.sessionLabels.push(labelName);
        }
    };

    this.setMessageLabel = function (labelName, groupName) {
        if (typeof labelName !== "string") {
            log("labelName must be string! Ignoring setMessageLabel() call!");
            return;
        }

        if (groupName != null && typeof groupName !== "string") {
            log("groupName must be string or null! Ignoring setMessageLabel() call!");
            return;
        }

        var $analyticsContext = initAnalyticsContext($jsapi.context());
        $analyticsContext.messageLabels = $analyticsContext.messageLabels || [];
        $analyticsContext.messageLabels.push({labelName: labelName, groupName: groupName});
    }

    this.joinExperiment = function (experimentCode) {
        var branch = $jsapi.joinScenarioExperiment(experimentCode);
        if (branch !== "finished") {
            $analytics.setSessionData(experimentCode, branch);
        }

        return branch
    }

    this.setTextCampaignResult = function (result, textCampaignId) {
        var $context = $jsapi.context();

        if (textCampaignId == null && $context.session.textCampaignId == null) {
            throw new Error("textCampaignId is not defined.");
        }

        initAnalyticsContext($context).textCampaign = {
            textCampaignId: textCampaignId ? textCampaignId : $context.session.textCampaignId,
            textCampaignResult: result
        }
    }
}();


var $integration = new function () {

    this.googleSheets = new function () {

        this.readDataFromCells = function (integrationId, spreadsheetId, sheetName, cells) {
            var ctx = $jsapi.context();
            ctx.response.googleSheets = ctx.response.googleSheets || {}
            ctx.response.googleSheets["integrationId"] = integrationId
            try {
                var data = $jsapi.integrationService.readDataFromCells(integrationId, spreadsheetId, sheetName, cells);
                ctx.response.googleSheets["result"] = "success"
                return data;
            } catch (e) {
                $jsapi.log(e);
                ctx.response.googleSheets["result"] = "error"
                return null;
            }
        };

        this.writeDataToLine = function (integrationId, spreadsheetId, sheetName, values) {
            var ctx = $jsapi.context();
            ctx.response.googleSheets = ctx.response.googleSheets || {}
            ctx.response.googleSheets["integrationId"] = integrationId
            try {
                var data = $jsapi.integrationService.writeDataToLine(integrationId, spreadsheetId, sheetName, values);
                ctx.response.googleSheets["result"] = "success"
                return data;
            } catch (e) {
                $jsapi.log(e);
                ctx.response.googleSheets["result"] = "error"
                return null;
            }
        };

        this.writeDataToCells = function (integrationId, spreadsheetId, sheetName, values) {
            var ctx = $jsapi.context();
            ctx.response.googleSheets = ctx.response.googleSheets || {}
            ctx.response.googleSheets["integrationId"] = integrationId
            try {
                var data = $jsapi.integrationService.writeDataToCells(integrationId, spreadsheetId, sheetName, values);
                ctx.response.googleSheets["result"] = "success";
                return data;
            } catch (e) {
                $jsapi.log(e);
                ctx.response.googleSheets["result"] = "error";
                return null;
            }
        };

        this.clearCellData = function (integrationId, spreadsheetId, sheetName, values) {
            var ctx = $jsapi.context();
            ctx.response.googleSheets = ctx.response.googleSheets || {}
            ctx.response.googleSheets["integrationId"] = integrationId
            try {
                $jsapi.integrationService.clearCellData(integrationId, spreadsheetId, sheetName, values);
                ctx.response.googleSheets["result"] = "success"
                return "ok";
            } catch (e) {
                $jsapi.log(e);
                ctx.response.googleSheets["result"] = "error"
                return null;
            }
        };

        this.deleteRowOrColumn = function (integrationId, spreadsheetId, sheetName, values) {
            var ctx = $jsapi.context();
            ctx.response.googleSheets = ctx.response.googleSheets || {}
            ctx.response.googleSheets["integrationId"] = integrationId
            try {
                $jsapi.integrationService.deleteRowOrColumn(integrationId, spreadsheetId, sheetName, values);
                ctx.response.googleSheets["result"] = "success"
                return "ok";
            } catch (e) {
                $jsapi.log(e);
                ctx.response.googleSheets["result"] = "error"
                return null;
            }
        };

    }

    this.customRequest = function (integrationId, url, method, headers, body) {
        try {
            return $jsapi.integrationService.customRequest(integrationId, url, method, headers, body);
        } catch (e) {
            $jsapi.log(e);
            return null;
        }
    }
}();

var $imputer = new function () {

    function initImputerContext(ctx) {
        ctx.response = ctx.response || {};
        ctx.response.imputer = ctx.response.imputer || {};
        return ctx.response.imputer;
    }

    this.cacheAudio = function (replicaTemplateId, variables, voiceSpeed, unlimitedLifetime) {
        if (typeof replicaTemplateId !== "string") {
            log("replicaTemplateId must be string! Ignoring cacheAudio() call!");
            return;
        }
        if (typeof variables !== "object") {
            log("variables must be object! Ignoring cacheAudio() call!");
            return;
        }
        if (typeof voiceSpeed !== "undefined" && typeof voiceSpeed !== "number") {
            log("voiceSpeed must be number! Ignoring cacheAudio() call!");
            return;
        }
        if (typeof unlimitedLifetime !== "undefined" && typeof unlimitedLifetime !== "boolean") {
            log("unlimitedLifetime must be boolean! Ignoring cacheAudio call!")
        }
        var imputerContext = initImputerContext($jsapi.context());
        try {
            imputerContext.accessToken = imputerContext.accessToken || $jsapi.imputerTemplateManagerService.getAccessToken()
            $jsapi.imputerTemplateManagerService.cacheAudio(imputerContext.accessToken, replicaTemplateId, variables, voiceSpeed, unlimitedLifetime);
            imputerContext.cacheAudioResult = "success"
        } catch (e) {
            $jsapi.log(e);
            imputerContext.cacheAudioResult = "error"
        }
    }

    this.generateAudioUrl = function (replicaTemplateId, variables, voiceSpeed) {
        if (typeof replicaTemplateId !== "string") {
            log("replicaTemplateId must be string! Ignoring generateAudioUrl() call!");
            return null;
        }
        if (typeof variables !== "object") {
            log("variables must be object! Ignoring generateAudioUrl() call!");
            return null;
        }
        if (typeof voiceSpeed !== "undefined" && typeof voiceSpeed !== "number") {
            log("voiceSpeed must be number! Ignoring generateAudioUrl() call!");
            return null;
        }
        var imputerContext = initImputerContext($jsapi.context());
        try {
            imputerContext.accessToken = imputerContext.accessToken || $jsapi.imputerTemplateManagerService.getAccessToken()
            return $jsapi.imputerTemplateManagerService.generateAudioUrl(imputerContext.accessToken, replicaTemplateId, variables, voiceSpeed);
        } catch (e) {
            $jsapi.log(e);
            return null;
        }
    }

}();

var $secrets = new function () {

    this.get = function (name, defaultValue) {
        if (typeof name === "undefined" || name == null) {
            throw new Error("Secret name should be set");
        }
        var secretValue = $jsapi.getSecretValue(name);
        if (secretValue === null) {
            if (typeof defaultValue !== "undefined") {
                return defaultValue;
            } else {
                throw new Error("Secret " + name + " is not defined.");
            }
        }
        return secretValue;
    }

}();

var $env = new function () {

    this.get = function (name, defaultValue) {
        if (typeof name === "undefined" || name == null) {
            throw new Error("Environment variable name should be set");
        }
        var envVarValue = $jsapi.getEnvVarValue(name);
        if (envVarValue === null) {
            if (typeof defaultValue !== "undefined") {
                return defaultValue;
            } else {
                throw new Error("Environment variable " + name + " is not defined.");
            }
        }
        return envVarValue;
    }

}();

const $injector = {}


module.exports = function () {
    this.$reactions = $reactions
    this.$jsapi = $jsapi
    this.$injector = $injector
}