var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequiref773"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequiref773"] = parcelRequire;
}
parcelRequire.register("62zqJ", function(module, exports) {
(function(global, factory) {
    module.exports = factory();
})(this, function() {
    "use strict";
    var hookCallback;
    function hooks() {
        return hookCallback.apply(null, arguments);
    }
    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }
    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
    }
    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === "[object Object]";
    }
    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }
    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) return Object.getOwnPropertyNames(obj).length === 0;
        else {
            var k;
            for(k in obj){
                if (hasOwnProp(obj, k)) return false;
            }
            return true;
        }
    }
    function isUndefined(input) {
        return input === void 0;
    }
    function isNumber(input) {
        return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
    }
    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
    }
    function map(arr, fn) {
        var res = [], i, arrLen = arr.length;
        for(i = 0; i < arrLen; ++i)res.push(fn(arr[i], i));
        return res;
    }
    function extend(a, b) {
        for(var i in b)if (hasOwnProp(b, i)) a[i] = b[i];
        if (hasOwnProp(b, "toString")) a.toString = b.toString;
        if (hasOwnProp(b, "valueOf")) a.valueOf = b.valueOf;
        return a;
    }
    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }
    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false
        };
    }
    function getParsingFlags(m) {
        if (m._pf == null) m._pf = defaultParsingFlags();
        return m._pf;
    }
    var some;
    if (Array.prototype.some) some = Array.prototype.some;
    else some = function(fun) {
        var t = Object(this), len = t.length >>> 0, i;
        for(i = 0; i < len; i++){
            if (i in t && fun.call(this, t[i], i, t)) return true;
        }
        return false;
    };
    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i) {
                return i != null;
            }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
            if (m._strict) isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
            if (Object.isFrozen == null || !Object.isFrozen(m)) m._isValid = isNowValid;
            else return isNowValid;
        }
        return m._isValid;
    }
    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) extend(getParsingFlags(m), flags);
        else getParsingFlags(m).userInvalidated = true;
        return m;
    }
    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [], updateInProgress = false;
    function copyConfig(to, from) {
        var i, prop, val, momentPropertiesLen = momentProperties.length;
        if (!isUndefined(from._isAMomentObject)) to._isAMomentObject = from._isAMomentObject;
        if (!isUndefined(from._i)) to._i = from._i;
        if (!isUndefined(from._f)) to._f = from._f;
        if (!isUndefined(from._l)) to._l = from._l;
        if (!isUndefined(from._strict)) to._strict = from._strict;
        if (!isUndefined(from._tzm)) to._tzm = from._tzm;
        if (!isUndefined(from._isUTC)) to._isUTC = from._isUTC;
        if (!isUndefined(from._offset)) to._offset = from._offset;
        if (!isUndefined(from._pf)) to._pf = getParsingFlags(from);
        if (!isUndefined(from._locale)) to._locale = from._locale;
        if (momentPropertiesLen > 0) for(i = 0; i < momentPropertiesLen; i++){
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) to[prop] = val;
        }
        return to;
    }
    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) this._d = new Date(NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }
    function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
    }
    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) console.warn("Deprecation warning: " + msg);
    }
    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
            if (hooks.deprecationHandler != null) hooks.deprecationHandler(null, msg);
            if (firstTime) {
                var args = [], arg, i, key, argLen = arguments.length;
                for(i = 0; i < argLen; i++){
                    arg = "";
                    if (typeof arguments[i] === "object") {
                        arg += "\n[" + i + "] ";
                        for(key in arguments[0])if (hasOwnProp(arguments[0], key)) arg += key + ": " + arguments[0][key] + ", ";
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else arg = arguments[i];
                    args.push(arg);
                }
                warn(msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }
    var deprecations = {};
    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) hooks.deprecationHandler(name, msg);
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }
    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;
    function isFunction(input) {
        return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
    }
    function set(config) {
        var prop, i;
        for(i in config)if (hasOwnProp(config, i)) {
            prop = config[i];
            if (isFunction(prop)) this[i] = prop;
            else this["_" + i] = prop;
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
    }
    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for(prop in childConfig)if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) res[prop] = childConfig[prop];
            else delete res[prop];
        }
        for(prop in parentConfig)if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) // make sure changes to properties don't modify parent config
        res[prop] = extend({}, res[prop]);
        return res;
    }
    function Locale(config) {
        if (config != null) this.set(config);
    }
    var keys;
    if (Object.keys) keys = Object.keys;
    else keys = function(obj) {
        var i, res = [];
        for(i in obj)if (hasOwnProp(obj, i)) res.push(i);
        return res;
    };
    var defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    };
    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar["sameElse"];
        return isFunction(output) ? output.call(mom, now) : output;
    }
    function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign = number >= 0;
        return (sign ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }
    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === "string") func = function() {
            return this[callback]();
        };
        if (token) formatTokenFunctions[token] = func;
        if (padded) formatTokenFunctions[padded[0]] = function() {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
        if (ordinal) formatTokenFunctions[ordinal] = function() {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) return input.replace(/^\[|\]$/g, "");
        return input.replace(/\\/g, "");
    }
    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i1, length;
        for(i1 = 0, length = array.length; i1 < length; i1++)if (formatTokenFunctions[array[i1]]) array[i1] = formatTokenFunctions[array[i1]];
        else array[i1] = removeFormattingTokens(array[i1]);
        return function(mom) {
            var output = "", i;
            for(i = 0; i < length; i++)output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            return output;
        };
    }
    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) return m.localeData().invalidDate();
        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
        return formatFunctions[format](m);
    }
    function expandFormat(format, locale) {
        var i = 5;
        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while(i >= 0 && localFormattingTokens.test(format)){
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }
        return format;
    }
    var defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    };
    function longDateFormat(key) {
        var format = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format || !formatUpper) return format;
        this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
            if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") return tok.slice(1);
            return tok;
        }).join("");
        return this._longDateFormat[key];
    }
    var defaultInvalidDate = "Invalid date";
    function invalidDate() {
        return this._invalidDate;
    }
    var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
    function ordinal1(number) {
        return this._ordinal.replace("%d", number);
    }
    var defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    };
    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
    }
    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? "future" : "past"];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }
    var aliases = {};
    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
    }
    function normalizeUnits(units) {
        return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }
    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {}, normalizedProp, prop;
        for(prop in inputObject)if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) normalizedInput[normalizedProp] = inputObject[prop];
        }
        return normalizedInput;
    }
    var priorities = {};
    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }
    function getPrioritizedUnits(unitsObj) {
        var units = [], u;
        for(u in unitsObj)if (hasOwnProp(unitsObj, u)) units.push({
            unit: u,
            priority: priorities[u]
        });
        units.sort(function(a, b) {
            return a.priority - b.priority;
        });
        return units;
    }
    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    function absFloor(number) {
        if (number < 0) // -0 -> 0
        return Math.ceil(number) || 0;
        else return Math.floor(number);
    }
    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) value = absFloor(coercedNumber);
        return value;
    }
    function makeGetSet(unit, keepTime) {
        return function(value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else return get(this, unit);
        };
    }
    function get(mom, unit) {
        return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
    }
    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                value = toInt(value);
                mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value, mom.month(), daysInMonth(value, mom.month()));
            } else mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
        }
    }
    // MOMENTS
    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) return this[units]();
        return this;
    }
    function stringSet(units, value) {
        if (typeof units === "object") {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
            for(i = 0; i < prioritizedLen; i++)this[prioritized[i].unit](units[prioritized[i].unit]);
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) return this[units](value);
        }
        return this;
    }
    var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
    regexes = {};
    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function(isStrict, localeData) {
            return isStrict && strictRegex ? strictRegex : regex;
        };
    }
    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) return new RegExp(unescapeFormat(token));
        return regexes[token](config._strict, config._locale);
    }
    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }
    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    var tokens1 = {};
    function addParseToken(token, callback) {
        var i, func = callback, tokenLen;
        if (typeof token === "string") token = [
            token
        ];
        if (isNumber(callback)) func = function(input, array) {
            array[callback] = toInt(input);
        };
        tokenLen = token.length;
        for(i = 0; i < tokenLen; i++)tokens1[token[i]] = func;
    }
    function addWeekParseToken(token2, callback) {
        addParseToken(token2, function(input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }
    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens1, token)) tokens1[token](input, config._a, config, token);
    }
    var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
    function mod(n, x) {
        return (n % x + x) % x;
    }
    var indexOf;
    if (Array.prototype.indexOf) indexOf = Array.prototype.indexOf;
    else indexOf = function(o) {
        // I know
        var i;
        for(i = 0; i < this.length; ++i){
            if (this[i] === o) return i;
        }
        return -1;
    };
    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) return NaN;
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
    }
    // FORMATTING
    addFormatToken("M", [
        "MM",
        2
    ], "Mo", function() {
        return this.month() + 1;
    });
    addFormatToken("MMM", 0, 0, function(format) {
        return this.localeData().monthsShort(this, format);
    });
    addFormatToken("MMMM", 0, 0, function(format) {
        return this.localeData().months(this, format);
    });
    // ALIASES
    addUnitAlias("month", "M");
    // PRIORITY
    addUnitPriority("month", 8);
    // PARSING
    addRegexToken("M", match1to2);
    addRegexToken("MM", match1to2, match2);
    addRegexToken("MMM", function(isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken("MMMM", function(isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });
    addParseToken([
        "M",
        "MM"
    ], function(input, array) {
        array[MONTH] = toInt(input) - 1;
    });
    addParseToken([
        "MMM",
        "MMMM"
    ], function(input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) array[MONTH] = month;
        else getParsingFlags(config).invalidMonth = input;
    });
    // LOCALES
    var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
    function localeMonths(m, format) {
        if (!m) return isArray(this._months) ? this._months : this._months["standalone"];
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? "format" : "standalone"][m.month()];
    }
    function localeMonthsShort(m, format) {
        if (!m) return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"][m.month()];
    }
    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for(i = 0; i < 12; ++i){
                mom = createUTC([
                    2000,
                    i
                ]);
                this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
            }
        }
        if (strict) {
            if (format === "MMM") {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else if (format === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) return ii;
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) return ii;
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;
        if (this._monthsParseExact) return handleStrictParse.call(this, monthName, format, strict);
        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }
        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for(i = 0; i < 12; i++){
            // make the regex if we don't have it already
            mom = createUTC([
                2000,
                i
            ]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
                this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
            }
            if (!strict && !this._monthsParse[i]) {
                regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
                this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            // test the regex
            if (strict && format === "MMMM" && this._longMonthsParse[i].test(monthName)) return i;
            else if (strict && format === "MMM" && this._shortMonthsParse[i].test(monthName)) return i;
            else if (!strict && this._monthsParse[i].test(monthName)) return i;
        }
    }
    // MOMENTS
    function setMonth(mom, value) {
        var dayOfMonth;
        if (!mom.isValid()) // No op
        return mom;
        if (typeof value === "string") {
            if (/^\d+$/.test(value)) value = toInt(value);
            else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) return mom;
            }
        }
        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
        return mom;
    }
    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else return get(this, "Month");
    }
    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }
    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) computeMonthsParse.call(this);
            if (isStrict) return this._monthsShortStrictRegex;
            else return this._monthsShortRegex;
        } else {
            if (!hasOwnProp(this, "_monthsShortRegex")) this._monthsShortRegex = defaultMonthsShortRegex;
            return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }
    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) computeMonthsParse.call(this);
            if (isStrict) return this._monthsStrictRegex;
            else return this._monthsRegex;
        } else {
            if (!hasOwnProp(this, "_monthsRegex")) this._monthsRegex = defaultMonthsRegex;
            return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
    }
    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }
        var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
        for(i = 0; i < 12; i++){
            // make the regex if we don't have it already
            mom = createUTC([
                2000,
                i
            ]);
            shortPieces.push(this.monthsShort(mom, ""));
            longPieces.push(this.months(mom, ""));
            mixedPieces.push(this.months(mom, ""));
            mixedPieces.push(this.monthsShort(mom, ""));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for(i = 0; i < 12; i++){
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for(i = 0; i < 24; i++)mixedPieces[i] = regexEscape(mixedPieces[i]);
        this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
        this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
    }
    // FORMATTING
    addFormatToken("Y", 0, 0, function() {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : "+" + y;
    });
    addFormatToken(0, [
        "YY",
        2
    ], 0, function() {
        return this.year() % 100;
    });
    addFormatToken(0, [
        "YYYY",
        4
    ], 0, "year");
    addFormatToken(0, [
        "YYYYY",
        5
    ], 0, "year");
    addFormatToken(0, [
        "YYYYYY",
        6,
        true
    ], 0, "year");
    // ALIASES
    addUnitAlias("year", "y");
    // PRIORITIES
    addUnitPriority("year", 1);
    // PARSING
    addRegexToken("Y", matchSigned);
    addRegexToken("YY", match1to2, match2);
    addRegexToken("YYYY", match1to4, match4);
    addRegexToken("YYYYY", match1to6, match6);
    addRegexToken("YYYYYY", match1to6, match6);
    addParseToken([
        "YYYYY",
        "YYYYYY"
    ], YEAR);
    addParseToken("YYYY", function(input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken("YY", function(input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken("Y", function(input, array) {
        array[YEAR] = parseInt(input, 10);
    });
    // HELPERS
    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }
    // HOOKS
    hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };
    // MOMENTS
    var getSetYear = makeGetSet("FullYear", true);
    function getIsLeapYear() {
        return isLeapYear(this.year());
    }
    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) date.setFullYear(y);
        } else date = new Date(y, m, d, h, M, s, ms);
        return date;
    }
    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) date.setUTCFullYear(y);
        } else date = new Date(Date.UTC.apply(null, arguments));
        return date;
    }
    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var fwd = 7 + dow - doy, // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
        return -fwdlw + fwd - 1;
    }
    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }
        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }
    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }
        return {
            week: resWeek,
            year: resYear
        };
    }
    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }
    // FORMATTING
    addFormatToken("w", [
        "ww",
        2
    ], "wo", "week");
    addFormatToken("W", [
        "WW",
        2
    ], "Wo", "isoWeek");
    // ALIASES
    addUnitAlias("week", "w");
    addUnitAlias("isoWeek", "W");
    // PRIORITIES
    addUnitPriority("week", 5);
    addUnitPriority("isoWeek", 5);
    // PARSING
    addRegexToken("w", match1to2);
    addRegexToken("ww", match1to2, match2);
    addRegexToken("W", match1to2);
    addRegexToken("WW", match1to2, match2);
    addWeekParseToken([
        "w",
        "ww",
        "W",
        "WW"
    ], function(input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });
    // HELPERS
    // LOCALES
    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }
    var defaultLocaleWeek = {
        dow: 0,
        doy: 6
    };
    function localeFirstDayOfWeek() {
        return this._week.dow;
    }
    function localeFirstDayOfYear() {
        return this._week.doy;
    }
    // MOMENTS
    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, "d");
    }
    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, "d");
    }
    // FORMATTING
    addFormatToken("d", 0, "do", "day");
    addFormatToken("dd", 0, 0, function(format) {
        return this.localeData().weekdaysMin(this, format);
    });
    addFormatToken("ddd", 0, 0, function(format) {
        return this.localeData().weekdaysShort(this, format);
    });
    addFormatToken("dddd", 0, 0, function(format) {
        return this.localeData().weekdays(this, format);
    });
    addFormatToken("e", 0, 0, "weekday");
    addFormatToken("E", 0, 0, "isoWeekday");
    // ALIASES
    addUnitAlias("day", "d");
    addUnitAlias("weekday", "e");
    addUnitAlias("isoWeekday", "E");
    // PRIORITY
    addUnitPriority("day", 11);
    addUnitPriority("weekday", 11);
    addUnitPriority("isoWeekday", 11);
    // PARSING
    addRegexToken("d", match1to2);
    addRegexToken("e", match1to2);
    addRegexToken("E", match1to2);
    addRegexToken("dd", function(isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken("ddd", function(isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken("dddd", function(isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });
    addWeekParseToken([
        "dd",
        "ddd",
        "dddd"
    ], function(input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) week.d = weekday;
        else getParsingFlags(config).invalidWeekday = input;
    });
    addWeekParseToken([
        "d",
        "e",
        "E"
    ], function(input, week, config, token) {
        week[token] = toInt(input);
    });
    // HELPERS
    function parseWeekday(input, locale) {
        if (typeof input !== "string") return input;
        if (!isNaN(input)) return parseInt(input, 10);
        input = locale.weekdaysParse(input);
        if (typeof input === "number") return input;
        return null;
    }
    function parseIsoWeekday(input, locale) {
        if (typeof input === "string") return locale.weekdaysParse(input) % 7 || 7;
        return isNaN(input) ? null : input;
    }
    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }
    var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? "format" : "standalone"];
        return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
    }
    function localeWeekdaysShort(m) {
        return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }
    function localeWeekdaysMin(m) {
        return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }
    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            for(i = 0; i < 7; ++i){
                mom = createUTC([
                    2000,
                    1
                ]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, "").toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "").toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
            }
        }
        if (strict) {
            if (format === "dddd") {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === "ddd") {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === "dddd") {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === "ddd") {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }
    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;
        if (this._weekdaysParseExact) return handleStrictParse$1.call(this, weekdayName, format, strict);
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }
        for(i = 0; i < 7; i++){
            // make the regex if we don't have it already
            mom = createUTC([
                2000,
                1
            ]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", "\\.?") + "$", "i");
                this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$", "i");
                this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$", "i");
            }
            if (!this._weekdaysParse[i]) {
                regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
                this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            // test the regex
            if (strict && format === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) return i;
            else if (strict && format === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) return i;
            else if (strict && format === "dd" && this._minWeekdaysParse[i].test(weekdayName)) return i;
            else if (!strict && this._weekdaysParse[i].test(weekdayName)) return i;
        }
    }
    // MOMENTS
    function getSetDayOfWeek(input) {
        if (!this.isValid()) return input != null ? this : NaN;
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, "d");
        } else return day;
    }
    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) return input != null ? this : NaN;
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, "d");
    }
    function getSetISODayOfWeek(input) {
        if (!this.isValid()) return input != null ? this : NaN;
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else return this.day() || 7;
    }
    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) computeWeekdaysParse.call(this);
            if (isStrict) return this._weekdaysStrictRegex;
            else return this._weekdaysRegex;
        } else {
            if (!hasOwnProp(this, "_weekdaysRegex")) this._weekdaysRegex = defaultWeekdaysRegex;
            return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }
    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) computeWeekdaysParse.call(this);
            if (isStrict) return this._weekdaysShortStrictRegex;
            else return this._weekdaysShortRegex;
        } else {
            if (!hasOwnProp(this, "_weekdaysShortRegex")) this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }
    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) computeWeekdaysParse.call(this);
            if (isStrict) return this._weekdaysMinStrictRegex;
            else return this._weekdaysMinRegex;
        } else {
            if (!hasOwnProp(this, "_weekdaysMinRegex")) this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }
    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }
        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
        for(i = 0; i < 7; i++){
            // make the regex if we don't have it already
            mom = createUTC([
                2000,
                1
            ]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ""));
            shortp = regexEscape(this.weekdaysShort(mom, ""));
            longp = regexEscape(this.weekdays(mom, ""));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
        this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
        this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i");
    }
    // FORMATTING
    function hFormat() {
        return this.hours() % 12 || 12;
    }
    function kFormat() {
        return this.hours() || 24;
    }
    addFormatToken("H", [
        "HH",
        2
    ], 0, "hour");
    addFormatToken("h", [
        "hh",
        2
    ], 0, hFormat);
    addFormatToken("k", [
        "kk",
        2
    ], 0, kFormat);
    addFormatToken("hmm", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });
    addFormatToken("hmmss", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });
    addFormatToken("Hmm", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2);
    });
    addFormatToken("Hmmss", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });
    function meridiem1(token, lowercase) {
        addFormatToken(token, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }
    meridiem1("a", true);
    meridiem1("A", false);
    // ALIASES
    addUnitAlias("hour", "h");
    // PRIORITY
    addUnitPriority("hour", 13);
    // PARSING
    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }
    addRegexToken("a", matchMeridiem);
    addRegexToken("A", matchMeridiem);
    addRegexToken("H", match1to2);
    addRegexToken("h", match1to2);
    addRegexToken("k", match1to2);
    addRegexToken("HH", match1to2, match2);
    addRegexToken("hh", match1to2, match2);
    addRegexToken("kk", match1to2, match2);
    addRegexToken("hmm", match3to4);
    addRegexToken("hmmss", match5to6);
    addRegexToken("Hmm", match3to4);
    addRegexToken("Hmmss", match5to6);
    addParseToken([
        "H",
        "HH"
    ], HOUR);
    addParseToken([
        "k",
        "kk"
    ], function(input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken([
        "a",
        "A"
    ], function(input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken([
        "h",
        "hh"
    ], function(input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken("hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken("hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken("Hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken("Hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });
    // LOCALES
    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + "").toLowerCase().charAt(0) === "p";
    }
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    getSetHour = makeGetSet("Hours", true);
    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) return isLower ? "pm" : "PM";
        else return isLower ? "am" : "AM";
    }
    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,
        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,
        week: defaultLocaleWeek,
        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,
        meridiemParse: defaultLocaleMeridiemParse
    };
    // internal storage for locale config files
    var locales = {}, localeFamilies = {}, globalLocale;
    function commonPrefix(arr1, arr2) {
        var i, minl = Math.min(arr1.length, arr2.length);
        for(i = 0; i < minl; i += 1){
            if (arr1[i] !== arr2[i]) return i;
        }
        return minl;
    }
    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key;
    }
    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;
        while(i < names.length){
            split = normalizeLocale(names[i]).split("-");
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split("-") : null;
            while(j > 0){
                locale = loadLocale(split.slice(0, j).join("-"));
                if (locale) return locale;
                if (next && next.length >= j && commonPrefix(split, next) >= j - 1) break;
                j--;
            }
            i++;
        }
        return globalLocale;
    }
    function isLocaleNameSane(name) {
        // Prevent names that look like filesystem paths, i.e contain '/' or '\'
        return name.match("^[^/\\\\]*$") != null;
    }
    function loadLocale(name) {
        var oldLocale = null, aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (locales[name] === undefined && true && module && module.exports && isLocaleNameSane(name)) try {
            oldLocale = globalLocale._abbr;
            aliasedRequire = undefined;
            aliasedRequire("./locale/" + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {
            // mark as not found to avoid repeating expensive file require call causing high CPU
            // when trying to find en-US, en_US, en-us for every format call
            locales[name] = null; // null means not found
        }
        return locales[name];
    }
    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) data = getLocale(key);
            else data = defineLocale(key, values);
            if (data) // moment.duration._locale = moment._locale = data;
            globalLocale = data;
            else if (typeof console !== "undefined" && console.warn) //warn user if arguments are passed but the locale could not be set
            console.warn("Locale " + key + " not found. Did you forget to load it?");
        }
        return globalLocale._abbr;
    }
    function defineLocale(name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) parentConfig = locales[config.parentLocale]._config;
                else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) parentConfig = locale._config;
                    else {
                        if (!localeFamilies[config.parentLocale]) localeFamilies[config.parentLocale] = [];
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));
            if (localeFamilies[name]) localeFamilies[name].forEach(function(x) {
                defineLocale(x.name, x.config);
            });
            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);
            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }
    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            if (locales[name] != null && locales[name].parentLocale != null) // Update existing child locale in-place to avoid memory-leaks
            locales[name].set(mergeConfigs(locales[name]._config, config));
            else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) parentConfig = tmpLocale._config;
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) // updateLocale is called for creating a new locale
                // Set abbr so it will have a name (getters return
                // undefined otherwise).
                config.abbr = name;
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }
            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
                if (name === getSetGlobalLocale()) getSetGlobalLocale(name);
            } else if (locales[name] != null) delete locales[name];
        }
        return locales[name];
    }
    // returns locale data
    function getLocale(key) {
        var locale;
        if (key && key._locale && key._locale._abbr) key = key._locale._abbr;
        if (!key) return globalLocale;
        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) return locale;
            key = [
                key
            ];
        }
        return chooseLocale(key);
    }
    function listLocales() {
        return keys(locales);
    }
    function checkOverflow(m) {
        var overflow, a = m._a;
        if (a && getParsingFlags(m).overflow === -2) {
            overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) overflow = DATE;
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) overflow = WEEK;
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) overflow = WEEKDAY;
            getParsingFlags(m).overflow = overflow;
        }
        return m;
    }
    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
        [
            "YYYYYY-MM-DD",
            /[+-]\d{6}-\d\d-\d\d/
        ],
        [
            "YYYY-MM-DD",
            /\d{4}-\d\d-\d\d/
        ],
        [
            "GGGG-[W]WW-E",
            /\d{4}-W\d\d-\d/
        ],
        [
            "GGGG-[W]WW",
            /\d{4}-W\d\d/,
            false
        ],
        [
            "YYYY-DDD",
            /\d{4}-\d{3}/
        ],
        [
            "YYYY-MM",
            /\d{4}-\d\d/,
            false
        ],
        [
            "YYYYYYMMDD",
            /[+-]\d{10}/
        ],
        [
            "YYYYMMDD",
            /\d{8}/
        ],
        [
            "GGGG[W]WWE",
            /\d{4}W\d{3}/
        ],
        [
            "GGGG[W]WW",
            /\d{4}W\d{2}/,
            false
        ],
        [
            "YYYYDDD",
            /\d{7}/
        ],
        [
            "YYYYMM",
            /\d{6}/,
            false
        ],
        [
            "YYYY",
            /\d{4}/,
            false
        ], 
    ], // iso time formats and regexes
    isoTimes = [
        [
            "HH:mm:ss.SSSS",
            /\d\d:\d\d:\d\d\.\d+/
        ],
        [
            "HH:mm:ss,SSSS",
            /\d\d:\d\d:\d\d,\d+/
        ],
        [
            "HH:mm:ss",
            /\d\d:\d\d:\d\d/
        ],
        [
            "HH:mm",
            /\d\d:\d\d/
        ],
        [
            "HHmmss.SSSS",
            /\d\d\d\d\d\d\.\d+/
        ],
        [
            "HHmmss,SSSS",
            /\d\d\d\d\d\d,\d+/
        ],
        [
            "HHmmss",
            /\d\d\d\d\d\d/
        ],
        [
            "HHmm",
            /\d\d\d\d/
        ],
        [
            "HH",
            /\d\d/
        ], 
    ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480
    };
    // date from iso format
    function configFromISO(config) {
        var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
        if (match) {
            getParsingFlags(config).iso = true;
            for(i = 0, l = isoDatesLen; i < l; i++)if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for(i = 0, l = isoTimesLen; i < l; i++)if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || " ") + isoTimes[i][0];
                    break;
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) tzFormat = "Z";
                else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
            configFromStringAndFormat(config);
        } else config._isValid = false;
    }
    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10), 
        ];
        if (secondStr) result.push(parseInt(secondStr, 10));
        return result;
    }
    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) return 2000 + year;
        else if (year <= 999) return 1900 + year;
        return year;
    }
    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    }
    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }
    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) return obsOffsets[obsOffset];
        else if (militaryOffset) // the only allowed military tz is Z
        return 0;
        else {
            var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }
    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) return;
            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);
            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
            getParsingFlags(config).rfc2822 = true;
        } else config._isValid = false;
    }
    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }
        configFromISO(config);
        if (config._isValid === false) delete config._isValid;
        else return;
        configFromRFC2822(config);
        if (config._isValid === false) delete config._isValid;
        else return;
        if (config._strict) config._isValid = false;
        else // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }
    hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
        config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
    });
    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) return a;
        if (b != null) return b;
        return c;
    }
    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) return [
            nowValue.getUTCFullYear(),
            nowValue.getUTCMonth(),
            nowValue.getUTCDate(), 
        ];
        return [
            nowValue.getFullYear(),
            nowValue.getMonth(),
            nowValue.getDate()
        ];
    }
    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;
        if (config._d) return;
        currentDate = currentDateArray(config);
        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) dayOfYearFromWeekInfo(config);
        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) getParsingFlags(config)._overflowDayOfYear = true;
            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }
        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for(i = 0; i < 3 && config._a[i] == null; ++i)config._a[i] = input[i] = currentDate[i];
        // Zero out whatever was not defaulted, including time
        for(; i < 7; i++)config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        if (config._nextDay) config._a[HOUR] = 24;
        // check for mismatching day of week
        if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) getParsingFlags(config).weekdayMismatch = true;
    }
    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) weekdayOverflow = true;
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            curWeek = weekOfYear(createLocal(), dow, doy);
            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
            // Default to current week.
            week = defaults(w.w, curWeek.week);
            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) weekdayOverflow = true;
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) weekdayOverflow = true;
            } else // default to beginning of week
            weekday = dow;
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) getParsingFlags(config)._overflowWeeks = true;
        else if (weekdayOverflow != null) getParsingFlags(config)._overflowWeekday = true;
        else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }
    // constant that refers to the ISO standard
    hooks.ISO_8601 = function() {};
    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function() {};
    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;
        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = "" + config._i, i, parsedInput, tokens, token, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        tokenLen = tokens.length;
        for(i = 0; i < tokenLen; i++){
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) getParsingFlags(config).unusedInput.push(skipped);
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) getParsingFlags(config).empty = false;
                else getParsingFlags(config).unusedTokens.push(token);
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) getParsingFlags(config).unusedTokens.push(token);
        }
        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) getParsingFlags(config).unusedInput.push(string);
        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) getParsingFlags(config).bigHour = undefined;
        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        configFromArray(config);
        checkOverflow(config);
    }
    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        if (meridiem == null) // nothing to do
        return hour;
        if (locale.meridiemHour != null) return locale.meridiemHour(hour, meridiem);
        else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) hour += 12;
            if (!isPm && hour === 12) hour = 0;
            return hour;
        } else // this is not supposed to happen
        return hour;
    }
    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
        if (configfLen === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }
        for(i = 0; i < configfLen; i++){
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) tempConfig._useUTC = config._useUTC;
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);
            if (isValid(tempConfig)) validFormatFound = true;
            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;
            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
            getParsingFlags(tempConfig).score = currentScore;
            if (!bestFormatIsValid) {
                if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) bestFormatIsValid = true;
                }
            } else if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }
        extend(config, bestMoment || tempConfig);
    }
    function configFromObject(config) {
        if (config._d) return;
        var i = normalizeObjectUnits(config._i), dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map([
            i.year,
            i.month,
            dayOrDate,
            i.hour,
            i.minute,
            i.second,
            i.millisecond
        ], function(obj) {
            return obj && parseInt(obj, 10);
        });
        configFromArray(config);
    }
    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, "d");
            res._nextDay = undefined;
        }
        return res;
    }
    function prepareConfig(config) {
        var input = config._i, format = config._f;
        config._locale = config._locale || getLocale(config._l);
        if (input === null || format === undefined && input === "") return createInvalid({
            nullInput: true
        });
        if (typeof input === "string") config._i = input = config._locale.preparse(input);
        if (isMoment(input)) return new Moment(checkOverflow(input));
        else if (isDate(input)) config._d = input;
        else if (isArray(format)) configFromStringAndArray(config);
        else if (format) configFromStringAndFormat(config);
        else configFromInput(config);
        if (!isValid(config)) config._d = null;
        return config;
    }
    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) config._d = new Date(hooks.now());
        else if (isDate(input)) config._d = new Date(input.valueOf());
        else if (typeof input === "string") configFromString(config);
        else if (isArray(input)) {
            config._a = map(input.slice(0), function(obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) configFromObject(config);
        else if (isNumber(input)) // from milliseconds
        config._d = new Date(input);
        else hooks.createFromInputFallback(config);
    }
    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};
        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }
        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }
        if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) input = undefined;
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        return createFromConfig(c);
    }
    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }
    var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) return other < this ? this : other;
        else return createInvalid();
    }), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) return other > this ? this : other;
        else return createInvalid();
    });
    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) moments = moments[0];
        if (!moments.length) return createLocal();
        res = moments[0];
        for(i = 1; i < moments.length; ++i)if (!moments[i].isValid() || moments[i][fn](res)) res = moments[i];
        return res;
    }
    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args);
    }
    function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args);
    }
    var now1 = function() {
        return Date.now ? Date.now() : +new Date();
    };
    var ordering = [
        "year",
        "quarter",
        "month",
        "week",
        "day",
        "hour",
        "minute",
        "second",
        "millisecond", 
    ];
    function isDurationValid(m) {
        var key, unitHasDecimal = false, i, orderLen = ordering.length;
        for(key in m){
            if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) return false;
        }
        for(i = 0; i < orderLen; ++i)if (m[ordering[i]]) {
            if (unitHasDecimal) return false; // only allow non-integers for smallest unit
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) unitHasDecimal = true;
        }
        return true;
    }
    function isValid$1() {
        return this._isValid;
    }
    function createInvalid$1() {
        return createDuration(NaN);
    }
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || normalizedInput.isoWeek || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
        this._isValid = isDurationValid(normalizedInput);
        // representation for dateAddRemove
        this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 3600000; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;
        this._data = {};
        this._locale = getLocale();
        this._bubble();
    }
    function isDuration(obj) {
        return obj instanceof Duration;
    }
    function absRound(number) {
        if (number < 0) return Math.round(-1 * number) * -1;
        else return Math.round(number);
    }
    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
        for(i = 0; i < len; i++)if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) diffs++;
        return diffs + lengthDiff;
    }
    // FORMATTING
    function offset1(token, separator) {
        addFormatToken(token, 0, 0, function() {
            var offset = this.utcOffset(), sign = "+";
            if (offset < 0) {
                offset = -offset;
                sign = "-";
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
        });
    }
    offset1("Z", ":");
    offset1("ZZ", "");
    // PARSING
    addRegexToken("Z", matchShortOffset);
    addRegexToken("ZZ", matchShortOffset);
    addParseToken([
        "Z",
        "ZZ"
    ], function(input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });
    // HELPERS
    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;
    function offsetFromString(matcher, string) {
        var matches = (string || "").match(matcher), chunk, parts, minutes;
        if (matches === null) return null;
        chunk = matches[matches.length - 1] || [];
        parts = (chunk + "").match(chunkOffset) || [
            "-",
            0,
            0
        ];
        minutes = +(parts[1] * 60) + toInt(parts[2]);
        return minutes === 0 ? 0 : parts[0] === "+" ? minutes : -minutes;
    }
    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else return createLocal(input).local();
    }
    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }
    // HOOKS
    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function() {};
    // MOMENTS
    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0, localAdjust;
        if (!this.isValid()) return input != null ? this : NaN;
        if (input != null) {
            if (typeof input === "string") {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) return this;
            } else if (Math.abs(input) < 16 && !keepMinutes) input = input * 60;
            if (!this._isUTC && keepLocalTime) localAdjust = getDateOffset(this);
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) this.add(localAdjust, "m");
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) addSubtract(this, createDuration(input - offset, "m"), 1, false);
                else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else return this._isUTC ? offset : getDateOffset(this);
    }
    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== "string") input = -input;
            this.utcOffset(input, keepLocalTime);
            return this;
        } else return -this.utcOffset();
    }
    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }
    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) this.subtract(getDateOffset(this), "m");
        }
        return this;
    }
    function setOffsetToParsedOffset() {
        if (this._tzm != null) this.utcOffset(this._tzm, false, true);
        else if (typeof this._i === "string") {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) this.utcOffset(tZone);
            else this.utcOffset(0, true);
        }
        return this;
    }
    function hasAlignedHourOffset(input) {
        if (!this.isValid()) return false;
        input = input ? createLocal(input).utcOffset() : 0;
        return (this.utcOffset() - input) % 60 === 0;
    }
    function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }
    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) return this._isDSTShifted;
        var c = {}, other;
        copyConfig(c, this);
        c = prepareConfig(c);
        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else this._isDSTShifted = false;
        return this._isDSTShifted;
    }
    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }
    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }
    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }
    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function createDuration(input, key) {
        var duration = input, // matching against regexp is expensive, do it on demand
        match = null, sign, ret, diffRes;
        if (isDuration(input)) duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
        };
        else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) duration[key] = +input;
            else duration.milliseconds = +input;
        } else if (match = aspNetRegex.exec(input)) {
            sign = match[1] === "-" ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign
            };
        } else if (match = isoRegex.exec(input)) {
            sign = match[1] === "-" ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign)
            };
        } else if (duration == null) // checks for null or undefined
        duration = {};
        else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        if (isDuration(input) && hasOwnProp(input, "_locale")) ret._locale = input._locale;
        if (isDuration(input) && hasOwnProp(input, "_isValid")) ret._isValid = input._isValid;
        return ret;
    }
    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;
    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(",", "."));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }
    function positiveMomentsDifference(base, other) {
        var res = {};
        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, "M").isAfter(other)) --res.months;
        res.milliseconds = +other - +base.clone().add(res.months, "M");
        return res;
    }
    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) return {
            milliseconds: 0,
            months: 0
        };
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) res = positiveMomentsDifference(base, other);
        else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }
        return res;
    }
    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function(val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). " + "See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
                tmp = val;
                val = period;
                period = tmp;
            }
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }
    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds, days = absRound(duration._days), months = absRound(duration._months);
        if (!mom.isValid()) // No op
        return;
        updateOffset = updateOffset == null ? true : updateOffset;
        if (months) setMonth(mom, get(mom, "Month") + months * isAdding);
        if (days) set$1(mom, "Date", get(mom, "Date") + days * isAdding);
        if (milliseconds) mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        if (updateOffset) hooks.updateOffset(mom, days || months);
    }
    var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
    function isString(input) {
        return typeof input === "string" || input instanceof String;
    }
    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === undefined;
    }
    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            "years",
            "year",
            "y",
            "months",
            "month",
            "M",
            "days",
            "day",
            "d",
            "dates",
            "date",
            "D",
            "hours",
            "hour",
            "h",
            "minutes",
            "minute",
            "m",
            "seconds",
            "second",
            "s",
            "milliseconds",
            "millisecond",
            "ms", 
        ], i, property, propertyLen = properties.length;
        for(i = 0; i < propertyLen; i += 1){
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
    }
    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input), dataTypeTest = false;
        if (arrayTest) dataTypeTest = input.filter(function(item) {
            return !isNumber(item) && isString(input);
        }).length === 0;
        return arrayTest && dataTypeTest;
    }
    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            "sameDay",
            "nextDay",
            "lastDay",
            "nextWeek",
            "lastWeek",
            "sameElse", 
        ], i, property;
        for(i = 0; i < properties.length; i += 1){
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
    }
    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, "days", true);
        return diff < -6 ? "sameElse" : diff < -1 ? "lastWeek" : diff < 0 ? "lastDay" : diff < 1 ? "sameDay" : diff < 2 ? "nextDay" : diff < 7 ? "nextWeek" : "sameElse";
    }
    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (!arguments[0]) {
                time = undefined;
                formats = undefined;
            } else if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(), sod = cloneWithOffset(now, this).startOf("day"), format = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }
    function clone() {
        return new Moment(this);
    }
    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) return false;
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") return this.valueOf() > localInput.valueOf();
        else return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) return false;
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") return this.valueOf() < localInput.valueOf();
        else return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from), localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) return false;
        inclusivity = inclusivity || "()";
        return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }
    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input), inputMs;
        if (!(this.isValid() && localInput.isValid())) return false;
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") return this.valueOf() === localInput.valueOf();
        else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }
    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }
    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }
    function diff1(input, units, asFloat) {
        var that, zoneDelta, output;
        if (!this.isValid()) return NaN;
        that = cloneWithOffset(input, this);
        if (!that.isValid()) return NaN;
        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
        units = normalizeUnits(units);
        switch(units){
            case "year":
                output = monthDiff(this, that) / 12;
                break;
            case "month":
                output = monthDiff(this, that);
                break;
            case "quarter":
                output = monthDiff(this, that) / 3;
                break;
            case "second":
                output = (this - that) / 1e3;
                break; // 1000
            case "minute":
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case "hour":
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case "day":
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case "week":
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }
        return asFloat ? output : absFloor(output);
    }
    function monthDiff(a, b) {
        if (a.date() < b.date()) // end-of-month calculations work correct when the start month has more
        // days than the end month.
        return -monthDiff(b, a);
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }
        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }
    hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }
    function toISOString(keepOffset) {
        if (!this.isValid()) return null;
        var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) return formatMoment(m, utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ");
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) return this.toDate().toISOString();
            else return new Date(this.valueOf() + this.utcOffset() * 60000).toISOString().replace("Z", formatMoment(m, "Z"));
        }
        return formatMoment(m, utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
    }
    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */ function inspect() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var func = "moment", zone = "", prefix, year, datetime, suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
            zone = "Z";
        }
        prefix = "[" + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
        datetime = "-MM-DD[T]HH:mm:ss.SSS";
        suffix = zone + '[")]';
        return this.format(prefix + year + datetime + suffix);
    }
    function format1(inputString) {
        if (!inputString) inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }
    function from1(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) return createDuration({
            to: this,
            from: time
        }).locale(this.locale()).humanize(!withoutSuffix);
        else return this.localeData().invalidDate();
    }
    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }
    function to1(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) return createDuration({
            from: this,
            to: time
        }).locale(this.locale()).humanize(!withoutSuffix);
        else return this.localeData().invalidDate();
    }
    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }
    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale1(key) {
        var newLocaleData;
        if (key === undefined) return this._locale._abbr;
        else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) this._locale = newLocaleData;
            return this;
        }
    }
    var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
        if (key === undefined) return this.localeData();
        else return this.locale(key);
    });
    function localeData() {
        return this._locale;
    }
    var MS_PER_SECOND = 1000, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = 3506328 * MS_PER_HOUR;
    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }
    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) // preserve leap years using a full 400 year cycle, then reset
        return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        else return new Date(y, m, d).valueOf();
    }
    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) // preserve leap years using a full 400 year cycle, then reset
        return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        else return Date.UTC(y, m, d);
    }
    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === "millisecond" || !this.isValid()) return this;
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch(units){
            case "year":
                time = startOfDate(this.year(), 0, 1);
                break;
            case "quarter":
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case "month":
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case "week":
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case "isoWeek":
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case "day":
            case "date":
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case "hour":
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case "minute":
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case "second":
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }
    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === "millisecond" || !this.isValid()) return this;
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch(units){
            case "year":
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case "quarter":
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case "month":
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case "week":
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case "isoWeek":
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case "day":
            case "date":
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case "hour":
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case "minute":
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case "second":
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }
    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }
    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }
    function toDate() {
        return new Date(this.valueOf());
    }
    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(), 
        ];
    }
    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }
    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }
    function isValid$2() {
        return isValid(this);
    }
    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }
    function invalidAt() {
        return getParsingFlags(this).overflow;
    }
    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }
    addFormatToken("N", 0, 0, "eraAbbr");
    addFormatToken("NN", 0, 0, "eraAbbr");
    addFormatToken("NNN", 0, 0, "eraAbbr");
    addFormatToken("NNNN", 0, 0, "eraName");
    addFormatToken("NNNNN", 0, 0, "eraNarrow");
    addFormatToken("y", [
        "y",
        1
    ], "yo", "eraYear");
    addFormatToken("y", [
        "yy",
        2
    ], 0, "eraYear");
    addFormatToken("y", [
        "yyy",
        3
    ], 0, "eraYear");
    addFormatToken("y", [
        "yyyy",
        4
    ], 0, "eraYear");
    addRegexToken("N", matchEraAbbr);
    addRegexToken("NN", matchEraAbbr);
    addRegexToken("NNN", matchEraAbbr);
    addRegexToken("NNNN", matchEraName);
    addRegexToken("NNNNN", matchEraNarrow);
    addParseToken([
        "N",
        "NN",
        "NNN",
        "NNNN",
        "NNNNN"
    ], function(input, array, config, token) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) getParsingFlags(config).era = era;
        else getParsingFlags(config).invalidEra = input;
    });
    addRegexToken("y", matchUnsigned);
    addRegexToken("yy", matchUnsigned);
    addRegexToken("yyy", matchUnsigned);
    addRegexToken("yyyy", matchUnsigned);
    addRegexToken("yo", matchEraYearOrdinal);
    addParseToken([
        "y",
        "yy",
        "yyy",
        "yyyy"
    ], YEAR);
    addParseToken([
        "yo"
    ], function(input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) match = input.match(config._locale._eraYearOrdinalRegex);
        if (config._locale.eraYearOrdinalParse) array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        else array[YEAR] = parseInt(input, 10);
    });
    function localeEras(m, format) {
        var i, l, date, eras = this._eras || getLocale("en")._eras;
        for(i = 0, l = eras.length; i < l; ++i){
            switch(typeof eras[i].since){
                case "string":
                    // truncate time
                    date = hooks(eras[i].since).startOf("day");
                    eras[i].since = date.valueOf();
                    break;
            }
            switch(typeof eras[i].until){
                case "undefined":
                    eras[i].until = Infinity;
                    break;
                case "string":
                    // truncate time
                    date = hooks(eras[i].until).startOf("day").valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }
    function localeErasParse(eraName, format, strict) {
        var i, l, eras = this.eras(), name, abbr, narrow;
        eraName = eraName.toUpperCase();
        for(i = 0, l = eras.length; i < l; ++i){
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();
            if (strict) switch(format){
                case "N":
                case "NN":
                case "NNN":
                    if (abbr === eraName) return eras[i];
                    break;
                case "NNNN":
                    if (name === eraName) return eras[i];
                    break;
                case "NNNNN":
                    if (narrow === eraName) return eras[i];
                    break;
            }
            else if ([
                name,
                abbr,
                narrow
            ].indexOf(eraName) >= 0) return eras[i];
        }
    }
    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? 1 : -1;
        if (year === undefined) return hooks(era.since).year();
        else return hooks(era.since).year() + (year - era.offset) * dir;
    }
    function getEraName() {
        var i, l, val, eras = this.localeData().eras();
        for(i = 0, l = eras.length; i < l; ++i){
            // truncate time
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) return eras[i].name;
            if (eras[i].until <= val && val <= eras[i].since) return eras[i].name;
        }
        return "";
    }
    function getEraNarrow() {
        var i, l, val, eras = this.localeData().eras();
        for(i = 0, l = eras.length; i < l; ++i){
            // truncate time
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) return eras[i].narrow;
            if (eras[i].until <= val && val <= eras[i].since) return eras[i].narrow;
        }
        return "";
    }
    function getEraAbbr() {
        var i, l, val, eras = this.localeData().eras();
        for(i = 0, l = eras.length; i < l; ++i){
            // truncate time
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) return eras[i].abbr;
            if (eras[i].until <= val && val <= eras[i].since) return eras[i].abbr;
        }
        return "";
    }
    function getEraYear() {
        var i, l, dir, val, eras = this.localeData().eras();
        for(i = 0, l = eras.length; i < l; ++i){
            dir = eras[i].since <= eras[i].until ? 1 : -1;
            // truncate time
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
        }
        return this.year();
    }
    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNameRegex")) computeErasParse.call(this);
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }
    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, "_erasAbbrRegex")) computeErasParse.call(this);
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }
    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNarrowRegex")) computeErasParse.call(this);
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }
    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }
    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }
    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }
    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }
    function computeErasParse() {
        var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
        for(i = 0, l = eras.length; i < l; ++i){
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));
            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }
        this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
        this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
        this._erasNarrowRegex = new RegExp("^(" + narrowPieces.join("|") + ")", "i");
    }
    // FORMATTING
    addFormatToken(0, [
        "gg",
        2
    ], 0, function() {
        return this.weekYear() % 100;
    });
    addFormatToken(0, [
        "GG",
        2
    ], 0, function() {
        return this.isoWeekYear() % 100;
    });
    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [
            token,
            token.length
        ], 0, getter);
    }
    addWeekYearFormatToken("gggg", "weekYear");
    addWeekYearFormatToken("ggggg", "weekYear");
    addWeekYearFormatToken("GGGG", "isoWeekYear");
    addWeekYearFormatToken("GGGGG", "isoWeekYear");
    // ALIASES
    addUnitAlias("weekYear", "gg");
    addUnitAlias("isoWeekYear", "GG");
    // PRIORITY
    addUnitPriority("weekYear", 1);
    addUnitPriority("isoWeekYear", 1);
    // PARSING
    addRegexToken("G", matchSigned);
    addRegexToken("g", matchSigned);
    addRegexToken("GG", match1to2, match2);
    addRegexToken("gg", match1to2, match2);
    addRegexToken("GGGG", match1to4, match4);
    addRegexToken("gggg", match1to4, match4);
    addRegexToken("GGGGG", match1to6, match6);
    addRegexToken("ggggg", match1to6, match6);
    addWeekParseToken([
        "gggg",
        "ggggg",
        "GGGG",
        "GGGGG"
    ], function(input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });
    addWeekParseToken([
        "gg",
        "GG"
    ], function(input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });
    // MOMENTS
    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
    }
    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }
    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }
    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }
    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }
    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }
    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) return weekOfYear(this, dow, doy).year;
        else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) week = weeksTarget;
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }
    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }
    // FORMATTING
    addFormatToken("Q", 0, "Qo", "quarter");
    // ALIASES
    addUnitAlias("quarter", "Q");
    // PRIORITY
    addUnitPriority("quarter", 7);
    // PARSING
    addRegexToken("Q", match1);
    addParseToken("Q", function(input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });
    // MOMENTS
    function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }
    // FORMATTING
    addFormatToken("D", [
        "DD",
        2
    ], "Do", "date");
    // ALIASES
    addUnitAlias("date", "D");
    // PRIORITY
    addUnitPriority("date", 9);
    // PARSING
    addRegexToken("D", match1to2);
    addRegexToken("DD", match1to2, match2);
    addRegexToken("Do", function(isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
    });
    addParseToken([
        "D",
        "DD"
    ], DATE);
    addParseToken("Do", function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });
    // MOMENTS
    var getSetDayOfMonth = makeGetSet("Date", true);
    // FORMATTING
    addFormatToken("DDD", [
        "DDDD",
        3
    ], "DDDo", "dayOfYear");
    // ALIASES
    addUnitAlias("dayOfYear", "DDD");
    // PRIORITY
    addUnitPriority("dayOfYear", 4);
    // PARSING
    addRegexToken("DDD", match1to3);
    addRegexToken("DDDD", match3);
    addParseToken([
        "DDD",
        "DDDD"
    ], function(input, array, config) {
        config._dayOfYear = toInt(input);
    });
    // HELPERS
    // MOMENTS
    function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
    }
    // FORMATTING
    addFormatToken("m", [
        "mm",
        2
    ], 0, "minute");
    // ALIASES
    addUnitAlias("minute", "m");
    // PRIORITY
    addUnitPriority("minute", 14);
    // PARSING
    addRegexToken("m", match1to2);
    addRegexToken("mm", match1to2, match2);
    addParseToken([
        "m",
        "mm"
    ], MINUTE);
    // MOMENTS
    var getSetMinute = makeGetSet("Minutes", false);
    // FORMATTING
    addFormatToken("s", [
        "ss",
        2
    ], 0, "second");
    // ALIASES
    addUnitAlias("second", "s");
    // PRIORITY
    addUnitPriority("second", 15);
    // PARSING
    addRegexToken("s", match1to2);
    addRegexToken("ss", match1to2, match2);
    addParseToken([
        "s",
        "ss"
    ], SECOND);
    // MOMENTS
    var getSetSecond = makeGetSet("Seconds", false);
    // FORMATTING
    addFormatToken("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
    });
    addFormatToken(0, [
        "SS",
        2
    ], 0, function() {
        return ~~(this.millisecond() / 10);
    });
    addFormatToken(0, [
        "SSS",
        3
    ], 0, "millisecond");
    addFormatToken(0, [
        "SSSS",
        4
    ], 0, function() {
        return this.millisecond() * 10;
    });
    addFormatToken(0, [
        "SSSSS",
        5
    ], 0, function() {
        return this.millisecond() * 100;
    });
    addFormatToken(0, [
        "SSSSSS",
        6
    ], 0, function() {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, [
        "SSSSSSS",
        7
    ], 0, function() {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, [
        "SSSSSSSS",
        8
    ], 0, function() {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, [
        "SSSSSSSSS",
        9
    ], 0, function() {
        return this.millisecond() * 1000000;
    });
    // ALIASES
    addUnitAlias("millisecond", "ms");
    // PRIORITY
    addUnitPriority("millisecond", 16);
    // PARSING
    addRegexToken("S", match1to3, match1);
    addRegexToken("SS", match1to3, match2);
    addRegexToken("SSS", match1to3, match3);
    var token1, getSetMillisecond;
    for(token1 = "SSSS"; token1.length <= 9; token1 += "S")addRegexToken(token1, matchUnsigned);
    function parseMs(input, array) {
        array[MILLISECOND] = toInt(("0." + input) * 1000);
    }
    for(token1 = "S"; token1.length <= 9; token1 += "S")addParseToken(token1, parseMs);
    getSetMillisecond = makeGetSet("Milliseconds", false);
    // FORMATTING
    addFormatToken("z", 0, 0, "zoneAbbr");
    addFormatToken("zz", 0, 0, "zoneName");
    // MOMENTS
    function getZoneAbbr() {
        return this._isUTC ? "UTC" : "";
    }
    function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : "";
    }
    var proto = Moment.prototype;
    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff1;
    proto.endOf = endOf;
    proto.format = format1;
    proto.from = from1;
    proto.fromNow = fromNow;
    proto.to = to1;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale1;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== "undefined" && Symbol.for != null) proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return "Moment<" + this.format() + ">";
    };
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth);
    proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth);
    proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear);
    proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone);
    proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
    function createUnix(input) {
        return createLocal(input * 1000);
    }
    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }
    function preParsePostFormat(string) {
        return string;
    }
    var proto$1 = Locale.prototype;
    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal1;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;
    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;
    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;
    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;
    function get$1(format, index, field, setter) {
        var locale = getLocale(), utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }
    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }
        format = format || "";
        if (index != null) return get$1(format, index, field, "month");
        var i, out = [];
        for(i = 0; i < 12; i++)out[i] = get$1(format, i, field, "month");
        return out;
    }
    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === "boolean") {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }
            format = format || "";
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }
            format = format || "";
        }
        var locale = getLocale(), shift = localeSorted ? locale._week.dow : 0, i, out = [];
        if (index != null) return get$1(format, (index + shift) % 7, field, "day");
        for(i = 0; i < 7; i++)out[i] = get$1(format, (i + shift) % 7, field, "day");
        return out;
    }
    function listMonths(format, index) {
        return listMonthsImpl(format, index, "months");
    }
    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, "monthsShort");
    }
    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, "weekdays");
    }
    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, "weekdaysShort");
    }
    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, "weekdaysMin");
    }
    getSetGlobalLocale("en", {
        eras: [
            {
                since: "0001-01-01",
                until: Infinity,
                offset: 1,
                name: "Anno Domini",
                narrow: "AD",
                abbr: "AD"
            },
            {
                since: "0000-12-31",
                until: -Infinity,
                offset: 1,
                name: "Before Christ",
                narrow: "BC",
                abbr: "BC"
            }, 
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
            var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
            return number + output;
        }
    });
    // Side effect imports
    hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale);
    hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
    var mathAbs = Math.abs;
    function abs() {
        var data = this._data;
        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);
        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);
        return this;
    }
    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);
        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;
        return duration._bubble();
    }
    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }
    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }
    function absCeil(number) {
        if (number < 0) return Math.floor(number);
        else return Math.ceil(number);
    }
    function bubble() {
        var milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data, seconds, minutes, hours, years, monthsFromDays;
        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }
        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;
        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;
        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;
        hours = absFloor(minutes / 60);
        data.hours = hours % 24;
        days += absFloor(hours / 24);
        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));
        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;
        data.days = days;
        data.months = months;
        data.years = years;
        return this;
    }
    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }
    function monthsToDays(months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }
    function as(units) {
        if (!this.isValid()) return NaN;
        var days, months, milliseconds = this._milliseconds;
        units = normalizeUnits(units);
        if (units === "month" || units === "quarter" || units === "year") {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch(units){
                case "month":
                    return months;
                case "quarter":
                    return months / 3;
                case "year":
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch(units){
                case "week":
                    return days / 7 + milliseconds / 6048e5;
                case "day":
                    return days + milliseconds / 864e5;
                case "hour":
                    return days * 24 + milliseconds / 36e5;
                case "minute":
                    return days * 1440 + milliseconds / 6e4;
                case "second":
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case "millisecond":
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error("Unknown unit " + units);
            }
        }
    }
    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) return NaN;
        return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
    }
    function makeAs(alias) {
        return function() {
            return this.as(alias);
        };
    }
    var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
    function clone$1() {
        return createDuration(this);
    }
    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + "s"]() : NaN;
    }
    function makeGetter(name) {
        return function() {
            return this.isValid() ? this._data[name] : NaN;
        };
    }
    var milliseconds1 = makeGetter("milliseconds"), seconds1 = makeGetter("seconds"), minutes1 = makeGetter("minutes"), hours1 = makeGetter("hours"), days1 = makeGetter("days"), months1 = makeGetter("months"), years1 = makeGetter("years");
    function weeks1() {
        return absFloor(this.days() / 7);
    }
    var round = Math.round, thresholds1 = {
        ss: 44,
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        w: null,
        M: 11
    };
    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }
    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(), seconds = round(duration.as("s")), minutes = round(duration.as("m")), hours = round(duration.as("h")), days = round(duration.as("d")), months = round(duration.as("M")), weeks = round(duration.as("w")), years = round(duration.as("y")), a = seconds <= thresholds.ss && [
            "s",
            seconds
        ] || seconds < thresholds.s && [
            "ss",
            seconds
        ] || minutes <= 1 && [
            "m"
        ] || minutes < thresholds.m && [
            "mm",
            minutes
        ] || hours <= 1 && [
            "h"
        ] || hours < thresholds.h && [
            "hh",
            hours
        ] || days <= 1 && [
            "d"
        ] || days < thresholds.d && [
            "dd",
            days
        ];
        if (thresholds.w != null) a = a || weeks <= 1 && [
            "w"
        ] || weeks < thresholds.w && [
            "ww",
            weeks
        ];
        a = a || months <= 1 && [
            "M"
        ] || months < thresholds.M && [
            "MM",
            months
        ] || years <= 1 && [
            "y"
        ] || [
            "yy",
            years
        ];
        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }
    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) return round;
        if (typeof roundingFunction === "function") {
            round = roundingFunction;
            return true;
        }
        return false;
    }
    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds1[threshold] === undefined) return false;
        if (limit === undefined) return thresholds1[threshold];
        thresholds1[threshold] = limit;
        if (threshold === "s") thresholds1.ss = limit - 1;
        return true;
    }
    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var withSuffix = false, th = thresholds1, locale, output;
        if (typeof argWithSuffix === "object") {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === "boolean") withSuffix = argWithSuffix;
        if (typeof argThresholds === "object") {
            th = Object.assign({}, thresholds1, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) th.ss = argThresholds.s - 1;
        }
        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);
        if (withSuffix) output = locale.pastFuture(+this, output);
        return locale.postformat(output);
    }
    var abs$1 = Math.abs;
    function sign1(x) {
        return (x > 0) - (x < 0) || +x;
    }
    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) return this.localeData().invalidDate();
        var seconds = abs$1(this._milliseconds) / 1000, days = abs$1(this._days), months = abs$1(this._months), minutes, hours, years, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
        if (!total) // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return "P0D";
        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;
        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;
        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, "") : "";
        totalSign = total < 0 ? "-" : "";
        ymSign = sign1(this._months) !== sign1(total) ? "-" : "";
        daysSign = sign1(this._days) !== sign1(total) ? "-" : "";
        hmsSign = sign1(this._milliseconds) !== sign1(total) ? "-" : "";
        return totalSign + "P" + (years ? ymSign + years + "Y" : "") + (months ? ymSign + months + "M" : "") + (days ? daysSign + days + "D" : "") + (hours || minutes || seconds ? "T" : "") + (hours ? hmsSign + hours + "H" : "") + (minutes ? hmsSign + minutes + "M" : "") + (seconds ? hmsSign + s + "S" : "");
    }
    var proto$2 = Duration.prototype;
    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds1;
    proto$2.seconds = seconds1;
    proto$2.minutes = minutes1;
    proto$2.hours = hours1;
    proto$2.days = days1;
    proto$2.weeks = weeks1;
    proto$2.months = months1;
    proto$2.years = years1;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale1;
    proto$2.localeData = localeData;
    proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1);
    proto$2.lang = lang;
    // FORMATTING
    addFormatToken("X", 0, 0, "unix");
    addFormatToken("x", 0, 0, "valueOf");
    // PARSING
    addRegexToken("x", matchSigned);
    addRegexToken("X", matchTimestamp);
    addParseToken("X", function(input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken("x", function(input, array, config) {
        config._d = new Date(toInt(input));
    });
    //! moment.js
    hooks.version = "2.29.3";
    setHookCallback(createLocal);
    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now1;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;
    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm",
        TIME_SECONDS: "HH:mm:ss",
        TIME_MS: "HH:mm:ss.SSS",
        WEEK: "GGGG-[W]WW",
        MONTH: "YYYY-MM"
    };
    return hooks;
});

});

var $e784b3ca63d982e9$exports = {};
var $3f52c6ca9c37a8d8$exports = {};
var $624437da7d04e76a$exports = {};
$624437da7d04e76a$exports = class StatePath {
    static ROOT = "";
    static CUR = ".";
    static UP = "..";
    #path = null;
    constructor(path){
        console.log(path);
        this.#path = path;
        console.log(this.#path);
    }
    toString() {
        console.log(this.#path);
        console.log(this.#path.join("/"));
        if (this.#path.length == 1 && this.#path[0] == "") return "/";
        return this.#path.join("/");
    }
    stepUp() {
        return new StatePath(this.#path.slice(0, this.#path.length - 1));
    }
    static root() {
        return new StatePath(StatePath.ROOT);
    }
    static parse(path) {
        if (path == null || path == "/") return StatePath.root();
        var s = path.split("/");
        return new StatePath(s);
    }
    getName() {
        return this.#path[this.#path.length - 1];
    }
    getComponents() {
        return this.#path.slice(0);
    }
    getParents() {
        var ret = Array(this.#path.length - 1).fill(null);
        for(i; i > 0; i--)ret[i] = this.#path.slice(0, i + 1).join("/");
        if (this.#path.length > 1) ret[0] = "/";
        return ret;
    }
    getParent() {
        var ret = this.#path.slice(0, this.#path.length - 1).join("/");
        if (ret == null || ret == "") return "/";
        return ret;
    }
    resolve(subpath) {
        var path = StatePath.parse(subpath);
        if (subpath.startsWith("/")) return path;
        else {
            var s = new Array();
            s.push(path.#path);
            this.normalize(s);
            return new StatePath(s);
        }
    }
    isOutOfRoot() {
        return this.#path.length == 0;
    }
    normalize(items) {
        for(let i = 0; i < items.length; i++){
            var item = items[i];
            if (item == StatePath.CUR) items.splice(i--, 1);
            else if (i < 0) break;
            else if (item == StatePath.UP) {
                items.splice(i--, 1);
                if (i < 0) break;
                items.splice(i--, 1);
            }
        }
    }
};


var $93894f693aa9850f$exports = {};
$93894f693aa9850f$exports = class TimeoutIntervalUtility {
    pattern = "(\\s*(?<h>\\d{0,2})\\s*(hours|hour|h))?(\\s*(?<m>\\d{0,2})\\s*(minutes|minute|min|m))?(\\s*(?<s>\\d{0,2})\\s*(seconds|second|sec|s))?\\s*";
    parseToSeconds(intervalString) {
        if (intervalString === undefined || intervalString === "") throw Error("Interval string must not be empty or blank!");
        const match = intervalString.match(this.pattern);
        const getGroup = (groupName)=>parseInt(match.groups[groupName]) || 0;
        const h = getGroup("h");
        const m = getGroup("m");
        const s = getGroup("s");
        const resultInSeconds = 3600 * h + 60 * m + s;
        if (resultInSeconds === 0) throw Error(`Illegal interval string ${intervalString}! Interval must be grater than zero!`);
        return resultInSeconds;
    }
};


const $3f52c6ca9c37a8d8$var$version = {
    "buildBranch": "${branch.name}",
    "buildNumber": "${build.number}",
    "buildDate": "${build.date}",
    "buildChangeSet": "${git.commit.id}",
    "projectArtifactId": "botserver",
    "projectVersion": "ZB-15898-SNAPSHOT",
    "shortVersion": "0.0.0.${build.number}-${branch.name}"
};
function $3f52c6ca9c37a8d8$var$getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function $3f52c6ca9c37a8d8$var$currentTime() {
    return Date.now();
}
function $3f52c6ca9c37a8d8$var$timeForZone(zone) {
    return moment($3f52c6ca9c37a8d8$var$currentTime()).tz(zone).valueOf();
}
function $3f52c6ca9c37a8d8$var$timeForZone(zone, format) {
    return moment($3f52c6ca9c37a8d8$var$currentTime()).tz(zone).format(format);
}
function $3f52c6ca9c37a8d8$var$resolvePath(basePath, relativePath) {
    return $624437da7d04e76a$exports.parse(basePath).resolve(relativePath).toString();
}
const $3f52c6ca9c37a8d8$var$timeoutUtil = new $93894f693aa9850f$exports();
const $3f52c6ca9c37a8d8$var$$jsapi = {
    createCache: ()=>{},
    context: ()=>{
        return $context;
    },
    global: ()=>{
        return $context;
    },
    answerMaxSize: 10000,
    version: $3f52c6ca9c37a8d8$var$version,
    random: $3f52c6ca9c37a8d8$var$getRandomInt,
    currentTime: $3f52c6ca9c37a8d8$var$currentTime,
    timeForZone: $3f52c6ca9c37a8d8$var$timeForZone,
    resolvePath: $3f52c6ca9c37a8d8$var$resolvePath,
    utils: {
        timeout: $3f52c6ca9c37a8d8$var$timeoutUtil.parseToSeconds
    },
    bind: (arg)=>{},
    bind: (arg1, arg2, arg3, arg4)=>{}
};
String.prototype.contains = function(arg) {
    return this.includes(arg);
};
function $3f52c6ca9c37a8d8$var$bind(arg1, arg2, arg3, arg4) {}
var $3f52c6ca9c37a8d8$var$$reactions = new function() {
    // private
    var tmlpCache = $3f52c6ca9c37a8d8$var$$jsapi.createCache();
    var TRANSITIONS_HISTORY_SIZE = 10;
    var template = function(tmpl) {
        if (typeof tmpl === "undefined" || tmpl === "") return "";
        if (!tmpl.contains("{{")) return tmpl;
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        var compiled = tmlpCache[tmpl];
        if (!compiled) {
            try {
                compiled = _.template(tmpl, {
                    variable: "$global, $context, $parseTree, $client, $session, $request, $response, $temp, $injector, $entities"
                });
            } catch (e) {
                log("FAILED TEMPLATE: " + tmpl + "\nTEMPLATE FUNCTION BODY:\n" + e.source);
                throw e;
            }
            tmlpCache[tmpl] = compiled;
        }
        return compiled($3f52c6ca9c37a8d8$var$$jsapi.global(), $context, $context.parseTree, $context.client, $context.session, $context.request, $context.response, $context.temp, $context.injector, $context.entities);
    };
    this.template = template;
    // public
    this.answer = function(arg) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        var ttsText;
        var htmlText;
        var htmlEnabled = true;
        if (typeof arg !== "string" && typeof arg !== "object") arg = arg + "";
        if (typeof arg !== "object") arg = {
            value: arg
        };
        if (typeof arg.value !== "undefined" && arg.value !== "" && arg.value.length > $3f52c6ca9c37a8d8$var$$jsapi.answerMaxSize) throw new Error("Too long answer. Maximum expected size = " + $3f52c6ca9c37a8d8$var$$jsapi.answerMaxSize + ", actual size = " + arg.value.length);
        var text = template(arg.value, $context);
        if (text.length > $3f52c6ca9c37a8d8$var$$jsapi.answerMaxSize) throw new Error("Too long response. Maximum expected size = " + $3f52c6ca9c37a8d8$var$$jsapi.answerMaxSize + ", actual size = " + text.length);
        if (typeof arg === "object" && arg.hasOwnProperty("tts")) ttsText = template(arg.tts, $context);
        if (typeof arg === "object" && arg.hasOwnProperty("html")) htmlText = template(arg.html, $context);
        if (typeof arg === "object" && arg.hasOwnProperty("htmlEnabled")) {
            if (typeof arg.htmlEnabled === "boolean") htmlEnabled = arg.htmlEnabled;
            else if (typeof arg.htmlEnabled === "string" && arg.htmlEnabled === "false") htmlEnabled = false;
        }
        var $response = $context.response;
        // 1. fill replies
        $response.replies = $response.replies || [];
        var r = {
            type: "text",
            text: text,
            state: $context.currentState
        };
        if (ttsText) r.tts = ttsText;
        if (htmlText && htmlEnabled) r.html = htmlText;
        if (typeof arg.lang === "string") r.lang = arg.lang;
        else {
            var $request = $context.request;
            if ($request && $request.language) r.lang = $request.language;
        }
        applyReplyTransition(arg, r, $context, $context.session);
        pushReply(r, $response);
        // 2. fill answer
        if ($response.answer) $response.answer = $response.answer + "\n\n" + text;
        else $response.answer = text;
    };
    this.audio = function(arg) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if (typeof arg !== "string" && typeof arg !== "object") arg = arg + "";
        if (typeof arg !== "object" || Array.isArray(arg)) arg = {
            value: arg
        };
        var audioUrl = template(arg.value, $context);
        // fill replies
        var r = {
            type: "audio",
            audioUrl: audioUrl,
            state: $context.currentState
        };
        if (typeof arg.name === "string") r.audioName = arg.name;
        applyReplyTransition(arg, r, $context, $context.session);
        pushReply(r);
    };
    this.video = function(arg) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if (typeof arg !== "string" && typeof arg !== "object") arg = arg + "";
        if (typeof arg !== "object" || Array.isArray(arg)) arg = {
            value: arg
        };
        var videoUrl = template(arg.value, $context);
        // fill replies
        var r = {
            type: "video",
            videoUrl: videoUrl,
            state: $context.currentState
        };
        if (typeof arg.name === "string") r.videoName = arg.name;
        applyReplyTransition(arg, r, $context, $context.session);
        pushReply(r);
    };
    this.ttsWithVariables = function(arg) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if (!arg || typeof arg !== "object") throw new Error("Illegal ttsTemplate argument: " + JSON.stringify(arg));
        if (!arg.value) arg = {
            value: arg
        };
        if (!arg.value.textTemplate) throw new Error("Illegal ttsTemplate argument: " + JSON.stringify(arg));
        arg.value.text = $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.textFromTtsTemplateReply(arg.value.textTemplate);
        var ttsTemplateReply = $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.createTtsTemplateReply(arg.value);
        var reply = {
            type: "ttsTemplate",
            ttsTemplate: ttsTemplateReply,
            state: $context.currentState
        };
        applyReplyTransition(arg, reply, $context, $context.session);
        pushReply(reply);
    };
    function applyReplyTransition(arg, responce, $context, $session) {
        if (($context.request && $context.request.channelType === "resterisk") === false) return;
        var trans = null;
        var label = null;
        var bargeInIf = null;
        var emptyBargeinIf = "";
        var ignoreBargeIn = false;
        if (typeof arg.bargin_transition === "string") trans = arg.bargin_transition;
        else if (typeof arg.bargeInTransition === "string") trans = arg.bargeInTransition;
        if (typeof arg.bargin_label === "string") label = arg.bargin_label;
        else if (typeof arg.bargeInLabel === "string") label = arg.bargeInLabel;
        if (typeof arg.ignoreBargeIn === "boolean") ignoreBargeIn = arg.ignoreBargeIn;
        else if (typeof arg.ignoreBargeIn === "string" && arg.ignoreBargeIn === "true") ignoreBargeIn = true;
        if (!ignoreBargeIn) {
            if (typeof arg.bargeInIf === "boolean") {
                if (arg.bargeInIf === true) bargeInIf = label || emptyBargeinIf;
            } else if (typeof arg.bargeInIf === "string") {
                if (arg.bargeInIf === "true") bargeInIf = label || emptyBargeinIf;
                else bargeInIf = arg.bargeInIf;
            }
        }
        var bargeInIntent = null;
        if (ignoreBargeIn) bargeInIntent = {
            type: "ignoreBargeIn"
        };
        else if (bargeInIf != null) bargeInIntent = {
            type: "intent"
        };
        var needSaveTransitionCondition = trans || label || bargeInIf;
        var id = null;
        if (needSaveTransitionCondition || ignoreBargeIn) {
            var lastParam;
            if (needSaveTransitionCondition) lastParam = bargeInIf;
            else lastParam = "ignore";
            id = $3f52c6ca9c37a8d8$var$$jsapi.createBarginReplyId(label, trans, lastParam);
            responce.bargeInReply = {
                bargin_transition: id,
                bargeInIntent: bargeInIntent
            };
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
    this.transition = function(arg) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if (typeof arg === "string") arg = {
            value: arg,
            deferred: false
        };
        var path = template(arg.value, $context);
        if (!path || path.length === 0) throw new Error("Empty state is not allowed");
        $context.temp.transition = {
            state: path,
            deferred: arg.deferred || false
        };
        $context.session.transitionsHistory = $context.session.transitionsHistory || [];
        var history = $context.session.transitionsHistory;
        if (history.length >= TRANSITIONS_HISTORY_SIZE) history.shift();
        history.push($context.temp.transition);
    };
    this.transitionFromHistory = function(num) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        var history = $context.session.transitionsHistory;
        if (!history) {
            log("Warning! History is empty");
            this.transition("/");
            return false;
        }
        if (num >= history.length) log.warn("Warning! Transitions history has no such element :" + num);
        return this.transition(history[history.length - num - 1]);
    };
    this.location = function(ll, lg) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        pushReply({
            type: "location",
            lat: ll,
            lon: lg
        });
    };
    this.newSession = function(arg) {
        $3f52c6ca9c37a8d8$var$$jsapi.newSession(arg);
    };
    var smartRandom = function(max, $context) {
        var id = $context.currentState + "_" + max;
        var store = $context.session.smartRandom || {};
        $context.session.smartRandom = store;
        // simple keeping max/2 previous elements
        var prev = store[id] || [];
        store[id] = prev;
        // retry random until we get new index
        var i;
        var ic = 0;
        while(ic < max * 5){
            ic++;
            // generate random number
            i = $3f52c6ca9c37a8d8$var$$jsapi.random(max);
            // getting return index
            if (prev.indexOf(i) == -1) break;
        }
        prev.push(i);
        if (prev.length > max / 2) prev.shift();
        return i;
    };
    this.random = function(arg) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if (typeof arg === "number") arg = {
            value: arg
        };
        var max = arg.value;
        //return $jsapi.random(max);
        var rd = $context.request.data;
        var i = 0;
        try {
            if (rd && Array.isArray(rd.smartRandom) && rd.smartRandom.length > 0) i = rd.smartRandom.shift();
            else i = smartRandom(max, $context);
        } catch (err) {
            // TODO: redirect output of print function into log
            print(err);
        }
        $context.response.smartRandom = $context.response.smartRandom || [];
        $context.response.smartRandom.push(i);
        return i;
    };
    this.image = function(arg) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if (typeof arg === "string") arg = {
            url: arg
        };
        arg.url = template(arg.url, $context);
        var replies = pushReply({
            type: "image",
            imageUrl: arg.url,
            state: $context.currentState
        });
        log(replies);
    };
    function nullOrUndefinedToString(arg) {
        if (arg === null) arg = "null";
        if (arg === undefined) arg = "undefined";
        return arg;
    }
    var createOneButtonNode = function(arg, $context) {
        var hasText = false;
        arg = nullOrUndefinedToString(arg);
        if (typeof arg === "number") arg = arg.toString();
        if (typeof arg === "string") arg = {
            text: arg
        };
        for(var k in arg){
            if (k === "text") {
                hasText = true;
                arg[k] = nullOrUndefinedToString(arg[k]);
                if (typeof arg[k] === "object") arg[k] = JSON.stringify(arg[k]);
                if (typeof arg[k] !== "string") arg[k] = arg[k].toString();
            }
            if (typeof arg[k] === "string") arg[k] = template(arg[k], $context);
        }
        if (!hasText) throw new Error("The `text` field is missing in the buttons response.");
        return arg;
    };
    var createButtonNode = function(arg, $context) {
        var ret = [];
        for(var i = 0; i < arg.length; i++){
            var e = arg[i];
            e = nullOrUndefinedToString(e);
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
    var createTransitionsNode = function(arg, reply, $context) {
        var buttons = reply.buttons;
        var ret = [];
        for(var i = 0; i < arg.length; i++){
            var text;
            if (typeof arg[i].button === "object") text = arg[i].button.text;
            else text = arg[i].button;
            if (text) {
                var mapping = arg[i].mapping || arg[i].button.transition;
                if (mapping) {
                    text = template(text, $context);
                    mapping = resolveStateRelativeToCurrent(mapping, $context, $context.currentState);
                    ret.push({
                        text: text,
                        mapping: mapping
                    });
                    buttons[i].transition = mapping;
                }
            }
        }
        return ret;
    };
    function resolveStateRelativeToCurrent(state, $context, currentState) {
        var mapping = state;
        mapping = template(mapping, $context);
        mapping = $3f52c6ca9c37a8d8$var$$jsapi.resolvePath(currentState, mapping);
        return mapping;
    }
    var buttons0 = function(arg, $context, type) {
        arg = nullOrUndefinedToString(arg);
        if (typeof arg !== "string" && typeof arg !== "object") arg = arg.toString();
        if (!_.isArray(arg)) arg = [
            arg
        ];
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
    this.buttons = function(arg) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        buttons0(arg, $context, "buttons");
    };
    this.inlineButtons = function(arg) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        buttons0(arg, $context, "inlineButtons");
    };
    this.checkButtonTransition = function() {
        function normalize(text) {
            return text.toLowerCase().replace("\u0451", "\u0435");
        }
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        var trans = $context.session.transitions;
        if (!trans || !$context.request.query || $context.request.event) {
            $context.session.transitions = [];
            return;
        }
        var text1 = $context.request.query;
        for(var i = 0; i < trans.length; i++){
            var t = trans[i];
            if (t.text && text1 && normalize(t.text) === normalize(text1)) {
                $context.temp.targetState = t.mapping;
                break;
            }
        }
        $context.session.transitions = [];
    };
    this.checkBackState = function() {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if ($context.temp.targetState == null) {
            var text = $context.parseTree.text;
            if (text) {
                if (text.toLowerCase() == "\u043D\u0430\u0437\u0430\u0434" || text.toLowerCase() == "back") // TODO :
                $context.temp.targetState = popBackState();
            }
        }
    };
    this.timeout = function(arg5) {
        function parseInterval(arg) {
            switch(typeof arg.interval){
                case "string":
                    return $3f52c6ca9c37a8d8$var$$jsapi.utils.timeout.parseToSeconds(arg.interval);
                case "number":
                    return arg.interval;
                default:
                    throw new Error("Illegal timeout argument " + JSON.stringify(arg, null, "  "));
            }
        }
        function getTargetState(arg) {
            var targetStateArg = arg.targetState || arg.value;
            return targetStateArg.startsWith("/") ? targetStateArg : $3f52c6ca9c37a8d8$var$$jsapi.resolvePath($3f52c6ca9c37a8d8$var$$jsapi.context().currentState, targetStateArg);
        }
        function checkForTimeoutReplyDuplication() {
            var repliesWithoutTimeouts = $response1.replies.filter(function(r) {
                return r.type !== "timeout";
            });
            if (repliesWithoutTimeouts.length !== $response1.replies.length) throw new Error("Only one 'timeout' reaction per state is allowed!");
        }
        function getResponseWithInitializedReplies() {
            var $response = $3f52c6ca9c37a8d8$var$$jsapi.context().response;
            $response.replies = $response.replies || [];
            return $response;
        }
        var $response1 = getResponseWithInitializedReplies();
        checkForTimeoutReplyDuplication();
        pushReply({
            type: "timeout",
            interval: parseInterval(arg5),
            targetState: getTargetState(arg5)
        }, $response1);
    };
    function pushReply(reply, response) {
        var $response = $3f52c6ca9c37a8d8$var$$jsapi.context().response || [];
        $response = typeof response !== "undefined" ? response : $response;
        $response.replies = $response.replies || [];
        var repliesSizeLimit = ($3f52c6ca9c37a8d8$var$$jsapi.context().restrictions || {}).repliesSizeLimit;
        if ($response.replies.length > repliesSizeLimit) throw new Error("Response replies cannot exceed " + repliesSizeLimit + ", your replies was " + $response.replies.length);
        else $response.replies.push(reply);
        return $response.replies;
    }
    this.pushReply = pushReply;
    $3f52c6ca9c37a8d8$var$$jsapi.bind({
        type: "preMatch",
        handler: this.checkButtonTransition,
        path: "/",
        name: "zenbot.buttonsHandler"
    });
    $3f52c6ca9c37a8d8$var$$jsapi.bind({
        type: "postProcess",
        handler: function($context) {
            if ($context.request.channelType === "facebook") {
                $context.response.facebookMenuTitle = $context.response.facebookMenuTitle || "Menu";
                if (!($context.response.facebookPlainButtons === false)) $context.response.facebookPlainButtons = true;
            }
        },
        path: "/",
        name: "zenbot.facebookMenuTitle"
    });
    $3f52c6ca9c37a8d8$var$$jsapi.bind({
        type: "slotFillingProcess",
        handler: function($context) {
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
                    for(var i = 0; i < $context.emptySlots.length; i++)if ($context.emptySlots[i].name === $context.slots.nextSlotToFill) {
                        $context.slots.nextSlotToFill = null;
                        $context.session.slot.index = i;
                        break;
                    }
                }
                var notFoundSlot = $context.emptySlots[$context.session.slot.index]; // get first slot from
                for(var i = $context.session.slot.index; i < $context.emptySlots.length; i++)if ($context.emptySlots[i].name !== $context.session.slot.currentSlotName) {
                    $context.session.slot.index = i;
                    notFoundSlot = $context.emptySlots[$context.session.slot.index];
                    break;
                }
                if (!notFoundSlot) {
                    $context.session.slot.index = 0;
                    notFoundSlot = $context.emptySlots[$context.session.slot.index];
                }
                $context.session.slot.currentSlotName = notFoundSlot.name;
                // ответ из подсказок слота
                $3f52c6ca9c37a8d8$var$$reactions.answer($3f52c6ca9c37a8d8$var$$reactions.nextPromtForSlot(notFoundSlot.prompts).value);
                // запоминаем текущий стейт где происходит заполнение слотов в client
                $context.session.slot.currentStateForSlotFilling = $context.temp.classifierTargetState;
                $context.client.slots = $context.client.slots || {};
                $context.client.slots[notFoundSlot.name] = $context.client.slots[notFoundSlot.name] || {};
                $context.client.slots[notFoundSlot.name].asked = true;
                $context.temp.targetState = $context.temp.classifierTargetState + "/slot-filling";
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
    this.nextPromtForSlot = function(prompts) {
        if (!prompts || prompts.length === 0) return {
            "value": "empty"
        };
        return prompts[Math.floor(Math.random() * prompts.length)];
    };
    this.ignoreSlotProcess = function() {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        $context.session.slot = $context.session.slot || {};
        $context.session.slot.customSlotFillingProcess = true;
    };
    this.fillSlot = function(slotName, slotValue, slotsForIngore) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        $context.slots = $context.slots || {};
        $context.slots[slotName] = {};
        if (slotValue) $context.slots[slotName].value = typeof slotValue === "string" ? slotValue : JSON.stringify(slotValue);
        if (slotsForIngore && slotsForIngore.ignore) this.ignoreSlot.apply(this, slotsForIngore.ignore);
    };
    this.ignoreSlot = function() {
        for(var slotName in arguments)if (typeof arguments[slotName] === "string") this.fillSlot(arguments[slotName]);
    };
    this.getPromptForSlot = function(slotName, index) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if (!slotName) return null;
        if (!index) return 0;
        return $context.allSlots[slotName].prompts[index].value;
    };
    this.getCurrentSlot = function() {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        $context.session.slot = $context.session.slot || {};
        return $context.session.slot.currentSlotName;
    };
    this.getSlotValue = function(slotName) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        var slot = $context.slots[slotName];
        return slot ? slot.value : null;
    };
    this.resetCurrentSlotFillingProcess = function(value) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        $context.session.slot = $context.session.slot || {};
        $context.session.slot.currentSlotName = value;
        $context.session.slot.index = 0;
    };
    this.isSlotAsked = function(slotName) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if ($context.client && $context.client.slots && slotName) {
            var slot = $context.client.slots[slotName];
            return slot && slot.asked === true;
        }
        return false;
    };
    this.customTag = function(arg6) {
        function substituteContextVariables(arg) {
            for(var key in arg)arg[key] = template(arg[key], $3f52c6ca9c37a8d8$var$$jsapi.context());
        }
        substituteContextVariables(arg6);
        log(arg6);
        var td = $customTags[arg6.customTagName];
        if (td.botId) this.customTagWithContextSwitch(arg6);
        else this.customTagWithTransition(arg6);
    };
    this.customTagWithTransition = function(arg) {
        arg.withTransition = true;
        var td = $customTags[arg.customTagName];
        var params = params || [];
        $3f52c6ca9c37a8d8$var$$jsapi.context().request.data = {
            args: arg,
            params: params,
            tag: td,
            original: $3f52c6ca9c37a8d8$var$$jsapi.context().request.data
        };
        this.transition(td.startState);
    };
    this.customTagWithContextSwitch = function(arg) {
        arg.withContextSwitch = true;
        var td = $customTags[arg.customTagName];
        var params = params || [];
        pushReply({
            type: "context-switch",
            targetBotId: td.botId,
            targetState: td.startState,
            parameters: {
                args: arg,
                params: params,
                tag: td,
                original: $3f52c6ca9c37a8d8$var$$jsapi.context().request.data
            }
        });
    };
    this.setClientTimezone = function(timezone) {
        if (timezone == null || typeof timezone === "undefined") log("Null timezone was set");
        $3f52c6ca9c37a8d8$var$$jsapi.context().client.timezone = timezone;
    };
    this.getClientTimezone = function() {
        return $3f52c6ca9c37a8d8$var$$jsapi.context().client.timezone;
    };
}();
// TODO need refactor! Если в сценарии указаны scriptsPreLoad, то не проходит загрузка необходимых скриптов, смотри com.justai.zb.scenarios.engine.BaseScriptingEngine::init0
$3f52c6ca9c37a8d8$var$bind("preMatch", function($context) {
    var $request = $context.request;
    if ($request.channelType === "resterisk" && ($request.query === "/start" || $request.event === "onCallNotConnected")) $3f52c6ca9c37a8d8$var$$jsapi.startSession();
}, "/", "Resterisk /start new session preMatch");
var $3f52c6ca9c37a8d8$var$$dialer = new function() {
    var colorRegexp = /^#([0-9a-f]{6})$/i;
    function getCallId() {
        var callId = null;
        try {
            callId = $3f52c6ca9c37a8d8$var$$jsapi.context().request.rawRequest.originateData.callId;
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
    this.addCallTag = function(tag, payload, color) {
        if (color && !colorRegexp.test(color)) {
            log("Wrong tag color: " + color);
            color = null;
        }
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        var callId = getCallId();
        if (!callId) {
            log("callId is not defined! Can't set call tag");
            return;
        }
        if (payload instanceof Object) payload = JSON.stringify(payload);
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
    this.setCallResult = function(result, payload) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        var callId = getCallId();
        if (!callId) return;
        if (payload instanceof Object) payload = JSON.stringify(payload);
        log("setting call result for call " + callId + ": " + result + " " + (payload || ""));
        var $dialerResponse = initDialerContext($context);
        $dialerResponse.callResult = result;
        $dialerResponse.callResultPayload = payload || null;
    };
    this.reportData = function(header, value, order) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        var callId = getCallId();
        if (!callId) return;
        if (typeof header !== "string") {
            log("header must be string! Ignoring reportData() call!");
            return;
        }
        if (value instanceof Object) value = JSON.stringify(value);
        if (isNaN(Number(order))) order = 0;
        if (value == null) throw new Error("$dialer.reportData require value not null");
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
        if (payload == null) return null;
        var str;
        if (typeof payload === "string") str = payload;
        else str = JSON.stringify(payload);
        var size = str.length;
        var MAX_SIZE = 30000;
        if (size > MAX_SIZE) {
            log("payload size " + size + " > maxSize " + MAX_SIZE);
            if (type === CUT_EXCEL_SUBSTRING) return str.substring(0, MAX_SIZE);
            else if (type === CUT_EXCEL_NULL) return null;
            else throw new Error("invalid arg" + type);
        } else return payload;
    }
    this.setCallResultAccepted = function(payload) {
        this.setCallResult("ACCEPTED", payload);
    };
    this.setCallResultRejected = function(payload) {
        this.setCallResult("REJECTED", payload);
    };
    this.hangUp = function(textMessage) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if ($context.request.channelType === "resterisk") $3f52c6ca9c37a8d8$var$$reactions.pushReply({
            type: "hangup"
        });
        else if (textMessage) $3f52c6ca9c37a8d8$var$$reactions.answer(textMessage);
    };
    this.getCaller = function() {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.context().request.rawRequest.caller;
        } catch (e) {}
    };
    this.getPayload = function() {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.context().request.rawRequest.originateData.payload;
        } catch (e) {
            return {};
        }
    };
    this.getSipHeaders = function() {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.context().request.rawRequest.headers;
        } catch (e) {
            return {};
        }
    };
    this.isBarginInterrupted = function() {
        var $context = getResteriskContext();
        if ($context == null) return false;
        return $3f52c6ca9c37a8d8$var$$jsapi.isBarginInterrupted();
    };
    this.isBargeInInterrupted = function() {
        return this.isBarginInterrupted();
    };
    this.getBarginLabel = function() {
        var barginTransitionData = getBarginTransitionData();
        if (barginTransitionData != null) return barginTransitionData.label;
        return null;
    };
    this.getBargeInLabel = function() {
        return this.getBarginLabel();
    };
    this.getBarginTransition = function() {
        var barginTransitionData = getBarginTransitionData();
        if (barginTransitionData != null) return barginTransitionData.trans;
        return null;
    };
    this.getBargeInTransition = function() {
        return this.getBarginTransition();
    };
    function getBarginTransitionData() {
        var $context = getResteriskContext();
        if ($context != null && $context.session != null) return $context.session.bargin_transition_user;
        return null;
    }
    function getResteriskContext() {
        if ($3f52c6ca9c37a8d8$var$$jsapi.context().request != null && $3f52c6ca9c37a8d8$var$$jsapi.context().request.rawRequest != null) return $3f52c6ca9c37a8d8$var$$jsapi.context();
        return null;
    }
    this.getCallRecordingPath = function() {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.context().request.rawRequest.data.callRecordingFile;
        } catch (e) {}
    };
    this.bargeInResponse = function(params) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        $context.response = $context.response || {};
        $context.response.bargeIn = {
            bargin: params.bargeIn,
            bargin_trigger: params.bargeInTrigger,
            no_interupt_time: params.noInterruptTime
        };
    };
    this.bargeInInterrupt = function(interrupt) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        $context.response = $context.response || {};
        $context.response.bargeInInterrupt = {
            interrupt: interrupt
        };
    };
    function getBotSpeechCustom() {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        $context.response = $context.response || {};
        return $context.response.botSpeechCustom || null;
    }
    function setBotSpeechCustom(botSpeechCustom) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        $context.response = $context.response || {};
        $context.response.botSpeechCustom = botSpeechCustom;
    }
    this.mrcpSpeechCustom = function(params) {
        var botCustomSpeech = getBotSpeechCustom();
        var updated = $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.updateMrcpSpeechCustom(botCustomSpeech, params);
        setBotSpeechCustom(updated);
    };
    this.mrcpSetVoice = function(voice) {
        var botCustomSpeech = getBotSpeechCustom();
        var updated = $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.setMrcpCustomVoice(botCustomSpeech, voice);
        setBotSpeechCustom(updated);
    };
    this.getTransferStatus = function() {
        return $3f52c6ca9c37a8d8$var$$jsapi.getTransferStatus();
    };
    this.getBargeInIntentStatus = function() {
        var barginTransitionData = getBarginTransitionData();
        if (barginTransitionData == null) throw new Error("barginTransitionData is null");
        else if (barginTransitionData.bargeInIntentStatus == null) throw new Error("bargeInIntentStatus is null");
        else return barginTransitionData.bargeInIntentStatus;
    };
    this.redial = function(params) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        var callId = getCallId();
        if (!callId) {
            log("callId is not defined! Can't make redial");
            return;
        }
        if (!params || _.isEmpty(params)) error("Invocation without parameters is forbidden. Please specify startDateTime or localTimeFrom at least");
        var startDateTime = params.startDateTime;
        var finishDateTime = params.finishDateTime;
        var allowedDays = params.allowedDays;
        var localTimeFrom = params.localTimeFrom;
        var localTimeTo = params.localTimeTo;
        var retryIntervalInMinutes = params.retryIntervalInMinutes;
        var maxAttempts = params.maxAttempts;
        var allowedTime = params.allowedTime;
        var dialerPriority = params.dialerPriority;
        var allowedDaysFormat = [
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat",
            "sun"
        ];
        if (!checkDate(startDateTime)) error("startDateTime must be instanceof Date, got " + JSON.stringify(startDateTime));
        if (!checkDate(finishDateTime)) error("finishDateTime must be instanceof Date, got " + JSON.stringify(finishDateTime));
        if (startDateTime >= finishDateTime) error("startDateTime must be less than finishDateTime");
        if (!checkAllowedDays(allowedDays)) error("allowedDays must be an array of " + allowedDaysFormat + ", got " + JSON.stringify(allowedDays));
        if (!checkLocalTime(localTimeFrom)) error("localTimeFrom should match pattern HH:MM, got " + JSON.stringify(localTimeFrom));
        if (!checkLocalTime(localTimeTo)) error("localTimeTo should match pattern HH:MM, got " + JSON.stringify(localTimeTo));
        if (!checkNumber(retryIntervalInMinutes, 1, Infinity)) error("retryIntervalInMinutes must be a positive integer, got " + JSON.stringify(retryIntervalInMinutes));
        if (!checkNumber(maxAttempts, 1, 50)) error("maxAttempts must be an integer in interval [1, 50], got " + JSON.stringify(maxAttempts));
        if (!checkAllowedTime(allowedTime)) error("allowedTime format is invalid");
        if (!checkDialerPriority(dialerPriority)) error("dialerPriority must be an integer in interval [1, 5], got " + JSON.stringify(dialerPriority));
        var $dialerResponse = initDialerContext($context);
        $dialerResponse.redial = {
            startDateTime: startDateTime ? startDateTime.getTime() : undefined,
            finishDateTime: finishDateTime ? finishDateTime.getTime() : undefined,
            allowedDays: allowedDays && allowedDays.length === 0 ? undefined : allowedDays,
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
            return isNotDefined(value) || value instanceof Date;
        }
        function checkNumber(value, min, max) {
            return isNotDefined(value) || typeof value === "number" && value >= min && value <= max;
        }
        function checkLocalTime(value) {
            var localTimeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return isNotDefined(value) || localTimeRegex.test(value);
        }
        function checkAllowedDays(days) {
            return isNotDefined(days) || _.isArray(days) && (days.length === 0 || _.all(days, validDayFormat));
        }
        function validDayFormat(day) {
            return _.contains(allowedDaysFormat, day);
        }
        function checkDialerPriority(priority) {
            return isNotDefined(priority) || checkNumber(priority, 1, 5);
        }
        function isNotDefined(value) {
            return _.isNull(value) || _.isUndefined(value);
        }
        function checkAllowedTime(value) {
            if (isNotDefined(value)) return true;
            if (!_.isObject(value)) return false;
            var days = [
                "mon",
                "tue",
                "wed",
                "thu",
                "fri",
                "sat",
                "sun",
                "default"
            ];
            var keys = _.keys(value);
            for(var k = 0; k < keys.length; k++){
                var key = keys[k];
                if (!_.contains(days, key)) return false;
            }
            for(var i = 0; i <= 7; i++){
                var day = value[days[i]];
                if (isNotDefined(day)) continue;
                if (!_.isArray(day)) return false;
                for(var j = 0; j < day.length; j++){
                    if (!checkTimeInterval(day[j])) return false;
                }
            }
            return true;
        }
        function checkTimeInterval(value) {
            if (isNotDefined(value) || _.isEmpty(value)) return false;
            var from = value.localTimeFrom;
            var to = value.localTimeTo;
            if (!from || !to) return false;
            return checkLocalTime(from) && checkLocalTime(to);
        }
    };
    this.getCampaignSchedule = function() {
        return $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.getCampaignSchedule();
    };
    this.getDialSchedule = function() {
        return $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.dialSchedule();
    };
    this.getCampaignToken = function() {
        return $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.getCampaignToken();
    };
    this.getAbonentTimezone = function() {
        return $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.getAbonentTimezone();
    };
    this.getCallNotConnectedReason = function() {
        return $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.getCallNotConnectedReason();
    };
    this.getAudioToken = function() {
        return $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.getAudioToken();
    };
    this.getCallRecordingFullUrl = function() {
        return $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.getCallRecordingFullUrl();
    };
    this.getDialHistory = function() {
        return $3f52c6ca9c37a8d8$var$$jsapi.resteriskJSApiHelper.getDialHistory();
    };
}();
var $3f52c6ca9c37a8d8$var$$caila = new function() {
    this.markup = function(query) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.markup(query);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.markupWithToken = function(query, classifierToken) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.markupWithToken(query, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.entitiesLookup = function(query, showAll, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.entitiesLookup(query, showAll, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.entitiesLookup(query, showAll);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.entitiesLookupWithToken = function(query, showAll, classifierToken) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.entitiesLookupWithToken(query, showAll, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.entitiesLookupWithToken = function(query, showAll, classifierToken, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.entitiesLookupWithToken(query, showAll, classifierToken, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.entitiesLookupWithToken(query, showAll, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.simpleInference = function(query, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.simpleInference(query, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.simpleInference(query);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.simpleInferenceWithToken = function(query, classifierToken, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.simpleInferenceWithToken(query, classifierToken, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.simpleInferenceWithToken(query, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.inference = function(requestData, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.inference(requestData, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.inference(requestData);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.inferenceWithToken = function(requestData, classifierToken, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.inferenceWithToken(requestData, classifierToken, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.inferenceWithToken(requestData, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.inflectWithDictVersion = function(text, tags, dictVersion) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.inflect(text, tags, dictVersion);
        } catch (e) {
            log(e);
        }
    };
    this.inflectWithDictVersionWithToken = function(text, tags, dictVersion, classifierToken) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.inflectWithToken(text, tags, dictVersion, classifierToken);
        } catch (e) {
            log(e);
        }
    };
    this.inflect = function(text, tags) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.inflect(text, tags, "v1");
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.inflectWithToken = function(text, tags, classifierToken) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.inflectWithToken(text, tags, "v1", classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.conform = function(text, number) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.conform(text, number);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.detectLanguage = function(words) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.detectLanguage(words);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.detectLanguageWithToken = function(words, classifierToken) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.detectLanguageWithToken(words, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.conformWithToken = function(text, number, classifierToken) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.conformWithToken(text, number, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.checkVocabulary = function(checkVocabularyRequestData) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.checkVocabulary(checkVocabularyRequestData);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.checkVocabularyWithToken = function(checkVocabularyRequestData, cailaToken) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.checkVocabularyWithToken(checkVocabularyRequestData, cailaToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.getEntity = function(entityName) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.getEntity(entityName);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.getEntityWithToken = function(entityName, cailaToken) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.getEntityWithToken(entityName, cailaToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.setClientEntityRecords = function(entityName, records, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.setClientEntityRecords(entityName, records, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.setClientEntityRecords(entityName, records);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.setClientEntityRecordsWithToken = function(entityName, records, classifierToken, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.setClientEntityRecordsWithToken(entityName, records, classifierToken, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.setClientEntityRecordsWithToken(entityName, records, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.getClientEntityRecords = function(entityName, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.getClientEntityRecords(entityName, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.getClientEntityRecords(entityName);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.getClientEntityRecordsWithToken = function(entityName, classifierToken, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.getClientEntityRecordsWithToken(entityName, classifierToken, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.getClientEntityRecordsWithToken(entityName, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.addClientEntityRecords = function(entityName, records, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.addClientEntityRecords(entityName, records, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.addClientEntityRecords(entityName, records);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.addClientEntityRecordsWithToken = function(entityName, records, classifierToken, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.addClientEntityRecordsWithToken(entityName, records, classifierToken, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.addClientEntityRecordsWithToken(entityName, records, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.setClientEntityRecord = function(entityName, record, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.setClientEntityRecord(entityName, record, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.setClientEntityRecord(entityName, record);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.setClientEntityRecordWithToken = function(entityName, record, classifierToken, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.setClientEntityRecordWithToken(entityName, record, classifierToken, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.setClientEntityRecordWithToken(entityName, record, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.deleteClientEntityRecords = function(entityName, recordIds, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.deleteClientEntityRecords(entityName, recordIds, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.deleteClientEntityRecords(entityName, recordIds);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.deleteClientEntityRecordsWithToken = function(entityName, recordIds, classifierToken, clientId) {
        try {
            if (clientId) return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.deleteClientEntityRecordsWithToken(entityName, recordIds, classifierToken, clientId);
            else return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.deleteClientEntityRecordsWithToken(entityName, recordIds, classifierToken);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.setClientNerId = function(clientNerId) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.setClientNerId(clientNerId);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.clearClientNerId = function() {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.cailaService.clearClientNerId();
        } catch (e) {
            log(e);
            throw e;
        }
    };
}();
var $3f52c6ca9c37a8d8$var$$pushgate = new function() {
    this.createPushback = function(channelType, botId, chatId, event, eventData) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.pushgateService.createPushback(channelType, botId, chatId, event, eventData);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.createEvent = function(timeDate, event, eventData, channelType, botId, chatId) {
        try {
            var $request = $3f52c6ca9c37a8d8$var$$jsapi.context().request;
            event = typeof event !== "undefined" ? event : "timerEvent";
            eventData = typeof eventData !== "undefined" ? eventData : {};
            channelType = typeof channelType !== "undefined" ? channelType : $request.channelType;
            botId = typeof botId !== "undefined" ? botId : $request.botId;
            chatId = typeof chatId !== "undefined" ? chatId : $request.channelUserId;
            return $3f52c6ca9c37a8d8$var$$jsapi.pushgateService.createScheduledPushback(timeDate, channelType, botId, chatId, event, eventData);
        } catch (e) {
            log(e);
            throw e;
        }
    };
    this.cancelEvent = function(id) {
        try {
            $3f52c6ca9c37a8d8$var$$jsapi.pushgateService.deleteScheduledPushback(id);
        } catch (e) {
            log(e);
            throw e;
        }
    };
}();
var $3f52c6ca9c37a8d8$var$$analytics = new function() {
    function initAnalyticsContext(ctx) {
        ctx.response = ctx.response || {};
        ctx.response.analytics = ctx.response.analytics || {};
        return ctx.response.analytics;
    }
    this.setSessionResult = function(result) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        initAnalyticsContext($context).sessionResult = result;
        if ($context.request && $context.request.channelType === "resterisk") $3f52c6ca9c37a8d8$var$$dialer.setCallResult(result);
    };
    this.setSessionResultWithoutCallResult = function(result) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        initAnalyticsContext($context).sessionResult = result;
    };
    this.setSessionData = function(header, value) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if (typeof header !== "string") {
            log("header must be string! Ignoring setSessionData() call!");
            return;
        }
        if (value instanceof Object) value = JSON.stringify(value);
        if (value == null) throw new Error("$analytics.setSessionData require value not null");
        var key = header.substring(0, 255);
        var MAX_SIZE = 30000;
        if (value.length > MAX_SIZE) {
            log("Value size " + value.length + " > maxSize " + MAX_SIZE);
            value = value.substring(0, MAX_SIZE);
        }
        var $analyticsContext = initAnalyticsContext($context);
        $analyticsContext.sessionData = $analyticsContext.sessionData || {};
        $analyticsContext.sessionData[key] = value;
        if ($context.request && $context.request.channelType === "resterisk") $3f52c6ca9c37a8d8$var$$dialer.reportData(header, value);
    };
    this.setComment = function(comment) {
        if (typeof comment !== "string") {
            log("comment must be string! Ignoring setComment() call!");
            return;
        }
        initAnalyticsContext($3f52c6ca9c37a8d8$var$$jsapi.context()).comment = comment;
    };
    this.setSessionLabel = function(labelName) {
        if (typeof labelName !== "string") {
            log("labelName must be string! Ignoring setSessionLabel() call!");
            return;
        }
        var $analyticsContext = initAnalyticsContext($3f52c6ca9c37a8d8$var$$jsapi.context());
        $analyticsContext.sessionLabels = $analyticsContext.sessionLabels || [];
        if ($analyticsContext.sessionLabels.indexOf(labelName) < 0) $analyticsContext.sessionLabels.push(labelName);
    };
    this.setMessageLabel = function(labelName, groupName) {
        if (typeof labelName !== "string") {
            log("labelName must be string! Ignoring setMessageLabel() call!");
            return;
        }
        if (groupName != null && typeof groupName !== "string") {
            log("groupName must be string or null! Ignoring setMessageLabel() call!");
            return;
        }
        var $analyticsContext = initAnalyticsContext($3f52c6ca9c37a8d8$var$$jsapi.context());
        $analyticsContext.messageLabels = $analyticsContext.messageLabels || [];
        $analyticsContext.messageLabels.push({
            labelName: labelName,
            groupName: groupName
        });
    };
    this.joinExperiment = function(experimentCode) {
        var branch = $3f52c6ca9c37a8d8$var$$jsapi.joinScenarioExperiment(experimentCode);
        if (branch !== "finished") $3f52c6ca9c37a8d8$var$$analytics.setSessionData(experimentCode, branch);
        return branch;
    };
    this.setTextCampaignResult = function(result, textCampaignId) {
        var $context = $3f52c6ca9c37a8d8$var$$jsapi.context();
        if (textCampaignId == null && $context.session.textCampaignId == null) throw new Error("textCampaignId is not defined.");
        initAnalyticsContext($context).textCampaign = {
            textCampaignId: textCampaignId ? textCampaignId : $context.session.textCampaignId,
            textCampaignResult: result
        };
    };
}();
var $3f52c6ca9c37a8d8$var$$integration = new function() {
    this.googleSheets = new function() {
        this.readDataFromCells = function(integrationId, spreadsheetId, sheetName, cells) {
            var ctx = $3f52c6ca9c37a8d8$var$$jsapi.context();
            ctx.response.googleSheets = ctx.response.googleSheets || {};
            ctx.response.googleSheets["integrationId"] = integrationId;
            try {
                var data = $3f52c6ca9c37a8d8$var$$jsapi.integrationService.readDataFromCells(integrationId, spreadsheetId, sheetName, cells);
                ctx.response.googleSheets["result"] = "success";
                return data;
            } catch (e) {
                $3f52c6ca9c37a8d8$var$$jsapi.log(e);
                ctx.response.googleSheets["result"] = "error";
                return null;
            }
        };
        this.writeDataToLine = function(integrationId, spreadsheetId, sheetName, values) {
            var ctx = $3f52c6ca9c37a8d8$var$$jsapi.context();
            ctx.response.googleSheets = ctx.response.googleSheets || {};
            ctx.response.googleSheets["integrationId"] = integrationId;
            try {
                var data = $3f52c6ca9c37a8d8$var$$jsapi.integrationService.writeDataToLine(integrationId, spreadsheetId, sheetName, values);
                ctx.response.googleSheets["result"] = "success";
                return data;
            } catch (e) {
                $3f52c6ca9c37a8d8$var$$jsapi.log(e);
                ctx.response.googleSheets["result"] = "error";
                return null;
            }
        };
        this.writeDataToCells = function(integrationId, spreadsheetId, sheetName, values) {
            var ctx = $3f52c6ca9c37a8d8$var$$jsapi.context();
            ctx.response.googleSheets = ctx.response.googleSheets || {};
            ctx.response.googleSheets["integrationId"] = integrationId;
            try {
                var data = $3f52c6ca9c37a8d8$var$$jsapi.integrationService.writeDataToCells(integrationId, spreadsheetId, sheetName, values);
                ctx.response.googleSheets["result"] = "success";
                return data;
            } catch (e) {
                $3f52c6ca9c37a8d8$var$$jsapi.log(e);
                ctx.response.googleSheets["result"] = "error";
                return null;
            }
        };
        this.clearCellData = function(integrationId, spreadsheetId, sheetName, values) {
            var ctx = $3f52c6ca9c37a8d8$var$$jsapi.context();
            ctx.response.googleSheets = ctx.response.googleSheets || {};
            ctx.response.googleSheets["integrationId"] = integrationId;
            try {
                $3f52c6ca9c37a8d8$var$$jsapi.integrationService.clearCellData(integrationId, spreadsheetId, sheetName, values);
                ctx.response.googleSheets["result"] = "success";
                return "ok";
            } catch (e) {
                $3f52c6ca9c37a8d8$var$$jsapi.log(e);
                ctx.response.googleSheets["result"] = "error";
                return null;
            }
        };
        this.deleteRowOrColumn = function(integrationId, spreadsheetId, sheetName, values) {
            var ctx = $3f52c6ca9c37a8d8$var$$jsapi.context();
            ctx.response.googleSheets = ctx.response.googleSheets || {};
            ctx.response.googleSheets["integrationId"] = integrationId;
            try {
                $3f52c6ca9c37a8d8$var$$jsapi.integrationService.deleteRowOrColumn(integrationId, spreadsheetId, sheetName, values);
                ctx.response.googleSheets["result"] = "success";
                return "ok";
            } catch (e) {
                $3f52c6ca9c37a8d8$var$$jsapi.log(e);
                ctx.response.googleSheets["result"] = "error";
                return null;
            }
        };
    };
    this.customRequest = function(integrationId, url, method, headers, body) {
        try {
            return $3f52c6ca9c37a8d8$var$$jsapi.integrationService.customRequest(integrationId, url, method, headers, body);
        } catch (e) {
            $3f52c6ca9c37a8d8$var$$jsapi.log(e);
            return null;
        }
    };
}();
var $3f52c6ca9c37a8d8$var$$imputer = new function() {
    function initImputerContext(ctx) {
        ctx.response = ctx.response || {};
        ctx.response.imputer = ctx.response.imputer || {};
        return ctx.response.imputer;
    }
    this.cacheAudio = function(replicaTemplateId, variables, voiceSpeed, unlimitedLifetime) {
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
        if (typeof unlimitedLifetime !== "undefined" && typeof unlimitedLifetime !== "boolean") log("unlimitedLifetime must be boolean! Ignoring cacheAudio call!");
        var imputerContext = initImputerContext($3f52c6ca9c37a8d8$var$$jsapi.context());
        try {
            imputerContext.accessToken = imputerContext.accessToken || $3f52c6ca9c37a8d8$var$$jsapi.imputerTemplateManagerService.getAccessToken();
            $3f52c6ca9c37a8d8$var$$jsapi.imputerTemplateManagerService.cacheAudio(imputerContext.accessToken, replicaTemplateId, variables, voiceSpeed, unlimitedLifetime);
            imputerContext.cacheAudioResult = "success";
        } catch (e) {
            $3f52c6ca9c37a8d8$var$$jsapi.log(e);
            imputerContext.cacheAudioResult = "error";
        }
    };
    this.generateAudioUrl = function(replicaTemplateId, variables, voiceSpeed) {
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
        var imputerContext = initImputerContext($3f52c6ca9c37a8d8$var$$jsapi.context());
        try {
            imputerContext.accessToken = imputerContext.accessToken || $3f52c6ca9c37a8d8$var$$jsapi.imputerTemplateManagerService.getAccessToken();
            return $3f52c6ca9c37a8d8$var$$jsapi.imputerTemplateManagerService.generateAudioUrl(imputerContext.accessToken, replicaTemplateId, variables, voiceSpeed);
        } catch (e) {
            $3f52c6ca9c37a8d8$var$$jsapi.log(e);
            return null;
        }
    };
}();
var $3f52c6ca9c37a8d8$var$$secrets = new function() {
    this.get = function(name, defaultValue) {
        if (typeof name === "undefined" || name == null) throw new Error("Secret name should be set");
        var secretValue = $3f52c6ca9c37a8d8$var$$jsapi.getSecretValue(name);
        if (secretValue === null) {
            if (typeof defaultValue !== "undefined") return defaultValue;
            else throw new Error("Secret " + name + " is not defined.");
        }
        return secretValue;
    };
}();
var $3f52c6ca9c37a8d8$var$$env = new function() {
    this.get = function(name, defaultValue) {
        if (typeof name === "undefined" || name == null) throw new Error("Environment variable name should be set");
        var envVarValue = $3f52c6ca9c37a8d8$var$$jsapi.getEnvVarValue(name);
        if (envVarValue === null) {
            if (typeof defaultValue !== "undefined") return defaultValue;
            else throw new Error("Environment variable " + name + " is not defined.");
        }
        return envVarValue;
    };
}();
const $3f52c6ca9c37a8d8$var$$injector = {};
$3f52c6ca9c37a8d8$exports = function() {
    this.$reactions = $3f52c6ca9c37a8d8$var$$reactions;
    this.$jsapi = $3f52c6ca9c37a8d8$var$$jsapi;
    this.$injector = $3f52c6ca9c37a8d8$var$$injector;
};


var $729a66669f0fddd9$exports = {};

var $62zqJ = parcelRequire("62zqJ");
var $4f339d9ec3d20247$exports = {};

$parcel$defineInteropFlag($4f339d9ec3d20247$exports);

$parcel$export($4f339d9ec3d20247$exports, "VERSION", () => $176574efdb99ceab$export$a4ad2735b021c132);
$parcel$export($4f339d9ec3d20247$exports, "restArguments", () => $a761377cb36f4c56$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isObject", () => $700edb547dceaa51$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isNull", () => $e8bbd1dc26c6f05d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isUndefined", () => $1fbaea01384b8f3d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isBoolean", () => $39a2bcc6b8c47d82$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isElement", () => $c4f995b2a2998d5f$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isString", () => $4e4e40fba5525ee6$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isNumber", () => $71d98744106e398e$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isDate", () => $e1d2e8b7bca512a2$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isRegExp", () => $90d745d3b1da471b$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isError", () => $945e4fd51c29cfa5$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isSymbol", () => $ce925100ad7ee777$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isArrayBuffer", () => $420f97eeeee42554$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isDataView", () => $51c16328a77d9cdb$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isArray", () => $7e99210a3696eaaf$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isFunction", () => $60155a6a35e9dcf9$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isArguments", () => $b055a50504c61f05$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isFinite", () => $b341b364781da7f2$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isNaN", () => $d37f7b39268f1d85$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isTypedArray", () => $6392dae81062c9ff$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isEmpty", () => $c653fa1daf3a0f5d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isMatch", () => $6c7b600fe8258447$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isEqual", () => $83c3e8aa080864aa$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isMap", () => $3686fff8cb0c288a$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isWeakMap", () => $bfa62269ccd4ee4a$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isSet", () => $4156889e184d1b35$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "isWeakSet", () => $f598a6bb630e3f25$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "keys", () => $d361877b1e65ff30$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "allKeys", () => $0a6acc3ddc3dfb1c$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "values", () => $feaba76ced978a27$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "pairs", () => $f4e55101494ffee6$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "invert", () => $788035fb888baa7d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "functions", () => $e78bbd11b2d1fc01$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "methods", () => $e78bbd11b2d1fc01$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "extend", () => $d59069dae952bf60$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "extendOwn", () => $fc472092c470035e$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "assign", () => $fc472092c470035e$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "defaults", () => $e31b0be2af054785$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "create", () => $0c796c1f65a2f403$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "clone", () => $75f74f2d2dfffdb8$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "tap", () => $757ed43efb61f1da$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "get", () => $5305b26f88a4310b$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "has", () => $b68863642a11a641$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "mapObject", () => $44383b38efc56d24$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "identity", () => $6d93bbb9d1a7d2e0$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "constant", () => $ddca5ff9373936a2$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "noop", () => $d6518b57056e0af2$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "toPath", () => $bc7ab8bcaadb18ec$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "property", () => $af306a07ffa1d813$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "propertyOf", () => $878b3c53ca4f3f57$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "matcher", () => $ce5c1dc9f55a5ffb$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "matches", () => $ce5c1dc9f55a5ffb$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "times", () => $846d052e3a7e4c93$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "random", () => $18a53a81b123285d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "now", () => $a8e65f230771a17b$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "escape", () => $e7c81655f30fb6f4$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "unescape", () => $99123ea36f59bc41$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "templateSettings", () => $975f212e68134aa6$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "template", () => $40cade613c5c7600$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "result", () => $b56d8d1e077cdc41$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "uniqueId", () => $69e2fe5c6ce61373$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "chain", () => $71dbb4fba6478a3d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "iteratee", () => $d030be9875dd79de$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "partial", () => $c0c93b2cca61926f$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "bind", () => $fa50e323624dc7eb$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "bindAll", () => $13c351fb9e4ab0ef$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "memoize", () => $234b85f139181bb1$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "delay", () => $c96d2717cfab0b2f$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "defer", () => $c9af34864efb7633$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "throttle", () => $e2db7fb25d29ea94$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "debounce", () => $394a380e575e6a0f$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "wrap", () => $7d301bfe36c4072d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "negate", () => $b90261499d8178f0$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "compose", () => $f5718faf49cadba8$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "after", () => $adbf0ef79c4ec854$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "before", () => $d576bc968b661f82$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "once", () => $dc32fe3ea09adc90$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "findKey", () => $116e98995134e88b$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "findIndex", () => $e83fa030884cb136$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "findLastIndex", () => $23be4cbc3ea59179$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "sortedIndex", () => $a0e017bb18091621$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "indexOf", () => $054a43762b29fee1$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "lastIndexOf", () => $bd5310a9c53bad51$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "find", () => $136f5f00dc3acc1f$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "detect", () => $136f5f00dc3acc1f$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "findWhere", () => $f11927d8e3c90112$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "each", () => $741e882a16974ae6$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "forEach", () => $741e882a16974ae6$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "map", () => $366a0c14a7eae515$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "collect", () => $366a0c14a7eae515$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "reduce", () => $35022ea036070f69$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "foldl", () => $35022ea036070f69$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "inject", () => $35022ea036070f69$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "reduceRight", () => $ef0f14acaefd0e5d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "foldr", () => $ef0f14acaefd0e5d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "filter", () => $bb8f1682d6c2b24b$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "select", () => $bb8f1682d6c2b24b$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "reject", () => $70f30f659079b11d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "every", () => $5c919cc39d9e9609$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "all", () => $5c919cc39d9e9609$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "some", () => $1ed73232df28b69c$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "any", () => $1ed73232df28b69c$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "contains", () => $5fd90187c68c82a0$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "includes", () => $5fd90187c68c82a0$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "include", () => $5fd90187c68c82a0$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "invoke", () => $6861a5d2abd4653f$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "pluck", () => $c85fa29cfa44f8f8$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "where", () => $9f95d8e3fc317775$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "max", () => $f62997178d943b97$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "min", () => $8073d712552b51c3$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "shuffle", () => $a0d239fccc876aa0$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "sample", () => $bb3a8c4a9f23cac8$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "sortBy", () => $65018d21e9edb780$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "groupBy", () => $86f29a9e74ef3bbf$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "indexBy", () => $d7f30a637f84136b$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "countBy", () => $4f0454c1970b8132$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "partition", () => $2269dde69fa551a9$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "toArray", () => $ee0191fd75d0130b$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "size", () => $535de268c165ac0f$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "pick", () => $d44b267a4ba6d794$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "omit", () => $53ae2745e4241e8c$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "first", () => $22eb36e7c3040e67$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "head", () => $22eb36e7c3040e67$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "take", () => $22eb36e7c3040e67$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "initial", () => $79a2a688b16b6721$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "last", () => $9189f83baa0c72f5$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "rest", () => $48ef791943985640$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "tail", () => $48ef791943985640$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "drop", () => $48ef791943985640$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "compact", () => $06c4dcd9263bb003$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "flatten", () => $200b4f4ad7c0f90d$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "without", () => $eb922730d4b6b4d6$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "uniq", () => $d7436468a82837df$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "unique", () => $d7436468a82837df$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "union", () => $6dad4f856cdcdd90$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "intersection", () => $cb6a5d1a8af226df$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "difference", () => $138b0aed4c2ce94b$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "unzip", () => $e71ea61f95c52201$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "transpose", () => $e71ea61f95c52201$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "zip", () => $dfa548f76363ccb2$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "object", () => $4bbe000ad09b2c59$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "range", () => $b3922e29d5332a5f$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "chunk", () => $5c8803a8aedcfd26$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "mixin", () => $ce4d05431cfee095$export$2e2bcd8739ae039);
$parcel$export($4f339d9ec3d20247$exports, "default", () => $3e174e13977dbf51$export$2e2bcd8739ae039);
var $176574efdb99ceab$export$a4ad2735b021c132 = "1.13.4";
var $176574efdb99ceab$export$e8e78c978b129247 = typeof self == "object" && self.self === self && self || typeof $parcel$global == "object" && $parcel$global.global === $parcel$global && $parcel$global || Function("return this")() || {};
var $176574efdb99ceab$export$aabeece9448a227a = Array.prototype, $176574efdb99ceab$export$e77bb59b5e655b3d = Object.prototype;
var $176574efdb99ceab$export$e229dcb397ceea81 = typeof Symbol !== "undefined" ? Symbol.prototype : null;
var $176574efdb99ceab$export$4cbf152802aa238 = $176574efdb99ceab$export$aabeece9448a227a.push, $176574efdb99ceab$export$58adb3bec8346d0f = $176574efdb99ceab$export$aabeece9448a227a.slice, $176574efdb99ceab$export$f84e8e69fd4488a5 = $176574efdb99ceab$export$e77bb59b5e655b3d.toString, $176574efdb99ceab$export$5a15a386532a5ea4 = $176574efdb99ceab$export$e77bb59b5e655b3d.hasOwnProperty;
var $176574efdb99ceab$export$20eaf89d899ede58 = typeof ArrayBuffer !== "undefined", $176574efdb99ceab$export$a2e478ad34dac33e = typeof DataView !== "undefined";
var $176574efdb99ceab$export$552cf9b635cef256 = Array.isArray, $176574efdb99ceab$export$e676cf06d7fd2114 = Object.keys, $176574efdb99ceab$export$5b53dc95b548c58c = Object.create, $176574efdb99ceab$export$35fc70fc5e80d5a7 = $176574efdb99ceab$export$20eaf89d899ede58 && ArrayBuffer.isView;
var $176574efdb99ceab$export$a739ba33a90be0a1 = isNaN, $176574efdb99ceab$export$8b48b92f6c9d5ad = isFinite;
var $176574efdb99ceab$export$7dcea4d27900b116 = !({
    toString: null
}).propertyIsEnumerable("toString");
var $176574efdb99ceab$export$f8fa596d5e31cb19 = [
    "valueOf",
    "isPrototypeOf",
    "toString",
    "propertyIsEnumerable",
    "hasOwnProperty",
    "toLocaleString"
];
var $176574efdb99ceab$export$63b3abc5cd28bc48 = Math.pow(2, 53) - 1;


function $a761377cb36f4c56$export$2e2bcd8739ae039(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
        var length = Math.max(arguments.length - startIndex, 0), rest = Array(length), index = 0;
        for(; index < length; index++)rest[index] = arguments[index + startIndex];
        switch(startIndex){
            case 0:
                return func.call(this, rest);
            case 1:
                return func.call(this, arguments[0], rest);
            case 2:
                return func.call(this, arguments[0], arguments[1], rest);
        }
        var args = Array(startIndex + 1);
        for(index = 0; index < startIndex; index++)args[index] = arguments[index];
        args[startIndex] = rest;
        return func.apply(this, args);
    };
}


function $700edb547dceaa51$export$2e2bcd8739ae039(obj) {
    var type = typeof obj;
    return type === "function" || type === "object" && !!obj;
}


function $e8bbd1dc26c6f05d$export$2e2bcd8739ae039(obj) {
    return obj === null;
}


function $1fbaea01384b8f3d$export$2e2bcd8739ae039(obj) {
    return obj === void 0;
}



function $39a2bcc6b8c47d82$export$2e2bcd8739ae039(obj) {
    return obj === true || obj === false || (0, $176574efdb99ceab$export$f84e8e69fd4488a5).call(obj) === "[object Boolean]";
}


function $c4f995b2a2998d5f$export$2e2bcd8739ae039(obj) {
    return !!(obj && obj.nodeType === 1);
}



function $c44ecfe62eb6bb01$export$2e2bcd8739ae039(name) {
    var tag = "[object " + name + "]";
    return function(obj) {
        return (0, $176574efdb99ceab$export$f84e8e69fd4488a5).call(obj) === tag;
    };
}


var $4e4e40fba5525ee6$export$2e2bcd8739ae039 = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("String");



var $71d98744106e398e$export$2e2bcd8739ae039 = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("Number");



var $e1d2e8b7bca512a2$export$2e2bcd8739ae039 = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("Date");



var $90d745d3b1da471b$export$2e2bcd8739ae039 = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("RegExp");



var $945e4fd51c29cfa5$export$2e2bcd8739ae039 = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("Error");



var $ce925100ad7ee777$export$2e2bcd8739ae039 = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("Symbol");



var $420f97eeeee42554$export$2e2bcd8739ae039 = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("ArrayBuffer");





var $60155a6a35e9dcf9$var$isFunction = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("Function");
// Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
// v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
var $60155a6a35e9dcf9$var$nodelist = (0, $176574efdb99ceab$export$e8e78c978b129247).document && (0, $176574efdb99ceab$export$e8e78c978b129247).document.childNodes;
if (typeof /./ != "function" && typeof Int8Array != "object" && typeof $60155a6a35e9dcf9$var$nodelist != "function") $60155a6a35e9dcf9$var$isFunction = function(obj) {
    return typeof obj == "function" || false;
};
var $60155a6a35e9dcf9$export$2e2bcd8739ae039 = $60155a6a35e9dcf9$var$isFunction;





var $fa6145b1b98186fa$export$2e2bcd8739ae039 = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("Object");


var $2b92d940c7e3ab3a$export$834f1807c25991c1 = (0, $176574efdb99ceab$export$a2e478ad34dac33e) && (0, $fa6145b1b98186fa$export$2e2bcd8739ae039)(new DataView(new ArrayBuffer(8))), $2b92d940c7e3ab3a$export$f7bad96d83325a34 = typeof Map !== "undefined" && (0, $fa6145b1b98186fa$export$2e2bcd8739ae039)(new Map);


var $51c16328a77d9cdb$var$isDataView = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("DataView");
// In IE 10 - Edge 13, we need a different heuristic
// to determine whether an object is a `DataView`.
function $51c16328a77d9cdb$var$ie10IsDataView(obj) {
    return obj != null && (0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(obj.getInt8) && (0, $420f97eeeee42554$export$2e2bcd8739ae039)(obj.buffer);
}
var $51c16328a77d9cdb$export$2e2bcd8739ae039 = (0, $2b92d940c7e3ab3a$export$834f1807c25991c1) ? $51c16328a77d9cdb$var$ie10IsDataView : $51c16328a77d9cdb$var$isDataView;




var // Is a given value an array?
// Delegates to ECMA5's native `Array.isArray`.
$7e99210a3696eaaf$export$2e2bcd8739ae039 = (0, $176574efdb99ceab$export$552cf9b635cef256) || (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("Array");





function $1d120d7858011d56$export$2e2bcd8739ae039(obj, key) {
    return obj != null && (0, $176574efdb99ceab$export$5a15a386532a5ea4).call(obj, key);
}


var $b055a50504c61f05$var$isArguments = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("Arguments");
// Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.
(function() {
    if (!$b055a50504c61f05$var$isArguments(arguments)) $b055a50504c61f05$var$isArguments = function(obj) {
        return (0, $1d120d7858011d56$export$2e2bcd8739ae039)(obj, "callee");
    };
})();
var $b055a50504c61f05$export$2e2bcd8739ae039 = $b055a50504c61f05$var$isArguments;




function $b341b364781da7f2$export$2e2bcd8739ae039(obj) {
    return !(0, $ce925100ad7ee777$export$2e2bcd8739ae039)(obj) && (0, $176574efdb99ceab$export$8b48b92f6c9d5ad)(obj) && !isNaN(parseFloat(obj));
}




function $d37f7b39268f1d85$export$2e2bcd8739ae039(obj) {
    return (0, $71d98744106e398e$export$2e2bcd8739ae039)(obj) && (0, $176574efdb99ceab$export$a739ba33a90be0a1)(obj);
}




function $ddca5ff9373936a2$export$2e2bcd8739ae039(value) {
    return function() {
        return value;
    };
}



function $af8eda2e8084b74e$export$2e2bcd8739ae039(getSizeProperty) {
    return function(collection) {
        var sizeProperty = getSizeProperty(collection);
        return typeof sizeProperty == "number" && sizeProperty >= 0 && sizeProperty <= (0, $176574efdb99ceab$export$63b3abc5cd28bc48);
    };
}


function $35ebed75a4e837e1$export$2e2bcd8739ae039(key) {
    return function(obj) {
        return obj == null ? void 0 : obj[key];
    };
}


var // Internal helper to obtain the `byteLength` property of an object.
$362d3807c78cdab5$export$2e2bcd8739ae039 = (0, $35ebed75a4e837e1$export$2e2bcd8739ae039)("byteLength");


var // Internal helper to determine whether we should spend extensive checks against
// `ArrayBuffer` et al.
$0026a185e7ab5e79$export$2e2bcd8739ae039 = (0, $af8eda2e8084b74e$export$2e2bcd8739ae039)((0, $362d3807c78cdab5$export$2e2bcd8739ae039));


// Is a given value a typed array?
var $6392dae81062c9ff$var$typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function $6392dae81062c9ff$var$isTypedArray(obj) {
    // `ArrayBuffer.isView` is the most future-proof, so use it when available.
    // Otherwise, fall back on the above regular expression.
    return (0, $176574efdb99ceab$export$35fc70fc5e80d5a7) ? (0, $176574efdb99ceab$export$35fc70fc5e80d5a7)(obj) && !(0, $51c16328a77d9cdb$export$2e2bcd8739ae039)(obj) : (0, $0026a185e7ab5e79$export$2e2bcd8739ae039)(obj) && $6392dae81062c9ff$var$typedArrayPattern.test((0, $176574efdb99ceab$export$f84e8e69fd4488a5).call(obj));
}
var $6392dae81062c9ff$export$2e2bcd8739ae039 = (0, $176574efdb99ceab$export$20eaf89d899ede58) ? $6392dae81062c9ff$var$isTypedArray : (0, $ddca5ff9373936a2$export$2e2bcd8739ae039)(false);



var // Internal helper to obtain the `length` property of an object.
$21410f8baa7a66c1$export$2e2bcd8739ae039 = (0, $35ebed75a4e837e1$export$2e2bcd8739ae039)("length");











// Internal helper to create a simple lookup structure.
// `collectNonEnumProps` used to depend on `_.contains`, but this led to
// circular imports. `emulatedSet` is a one-off solution that only works for
// arrays of strings.
function $f26a5e5fd30d87a4$var$emulatedSet(keys) {
    var hash = {};
    for(var l = keys.length, i = 0; i < l; ++i)hash[keys[i]] = true;
    return {
        contains: function(key) {
            return hash[key] === true;
        },
        push: function(key) {
            hash[key] = true;
            return keys.push(key);
        }
    };
}
function $f26a5e5fd30d87a4$export$2e2bcd8739ae039(obj, keys) {
    keys = $f26a5e5fd30d87a4$var$emulatedSet(keys);
    var nonEnumIdx = (0, $176574efdb99ceab$export$f8fa596d5e31cb19).length;
    var constructor = obj.constructor;
    var proto = (0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(constructor) && constructor.prototype || (0, $176574efdb99ceab$export$e77bb59b5e655b3d);
    // Constructor is a special case.
    var prop = "constructor";
    if ((0, $1d120d7858011d56$export$2e2bcd8739ae039)(obj, prop) && !keys.contains(prop)) keys.push(prop);
    while(nonEnumIdx--){
        prop = (0, $176574efdb99ceab$export$f8fa596d5e31cb19)[nonEnumIdx];
        if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) keys.push(prop);
    }
}


function $d361877b1e65ff30$export$2e2bcd8739ae039(obj) {
    if (!(0, $700edb547dceaa51$export$2e2bcd8739ae039)(obj)) return [];
    if (0, $176574efdb99ceab$export$e676cf06d7fd2114) return (0, $176574efdb99ceab$export$e676cf06d7fd2114)(obj);
    var keys1 = [];
    for(var key in obj)if ((0, $1d120d7858011d56$export$2e2bcd8739ae039)(obj, key)) keys1.push(key);
    // Ahem, IE < 9.
    if (0, $176574efdb99ceab$export$7dcea4d27900b116) (0, $f26a5e5fd30d87a4$export$2e2bcd8739ae039)(obj, keys1);
    return keys1;
}


function $c653fa1daf3a0f5d$export$2e2bcd8739ae039(obj) {
    if (obj == null) return true;
    // Skip the more expensive `toString`-based type checks if `obj` has no
    // `.length`.
    var length = (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(obj);
    if (typeof length == "number" && ((0, $7e99210a3696eaaf$export$2e2bcd8739ae039)(obj) || (0, $4e4e40fba5525ee6$export$2e2bcd8739ae039)(obj) || (0, $b055a50504c61f05$export$2e2bcd8739ae039)(obj))) return length === 0;
    return (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)((0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj)) === 0;
}



function $6c7b600fe8258447$export$2e2bcd8739ae039(object, attrs) {
    var _keys = (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(attrs), length = _keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for(var i = 0; i < length; i++){
        var key = _keys[i];
        if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
}



function $25414d4304399c8c$export$2e2bcd8739ae039(obj) {
    if (obj instanceof $25414d4304399c8c$export$2e2bcd8739ae039) return obj;
    if (!(this instanceof $25414d4304399c8c$export$2e2bcd8739ae039)) return new $25414d4304399c8c$export$2e2bcd8739ae039(obj);
    this._wrapped = obj;
}
$25414d4304399c8c$export$2e2bcd8739ae039.VERSION = (0, $176574efdb99ceab$export$a4ad2735b021c132);
// Extracts the result from a wrapped and chained object.
$25414d4304399c8c$export$2e2bcd8739ae039.prototype.value = function() {
    return this._wrapped;
};
// Provide unwrapping proxies for some methods used in engine operations
// such as arithmetic and JSON stringification.
$25414d4304399c8c$export$2e2bcd8739ae039.prototype.valueOf = $25414d4304399c8c$export$2e2bcd8739ae039.prototype.toJSON = $25414d4304399c8c$export$2e2bcd8739ae039.prototype.value;
$25414d4304399c8c$export$2e2bcd8739ae039.prototype.toString = function() {
    return String(this._wrapped);
};











function $5d79ac58b129ff0f$export$2e2bcd8739ae039(bufferSource) {
    return new Uint8Array(bufferSource.buffer || bufferSource, bufferSource.byteOffset || 0, (0, $362d3807c78cdab5$export$2e2bcd8739ae039)(bufferSource));
}


// We use this string twice, so give it a name for minification.
var $83c3e8aa080864aa$var$tagDataView = "[object DataView]";
// Internal recursive comparison function for `_.isEqual`.
function $83c3e8aa080864aa$var$eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== "function" && type !== "object" && typeof b != "object") return false;
    return $83c3e8aa080864aa$var$deepEq(a, b, aStack, bStack);
}
// Internal recursive comparison function for `_.isEqual`.
function $83c3e8aa080864aa$var$deepEq(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof (0, $25414d4304399c8c$export$2e2bcd8739ae039)) a = a._wrapped;
    if (b instanceof (0, $25414d4304399c8c$export$2e2bcd8739ae039)) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = (0, $176574efdb99ceab$export$f84e8e69fd4488a5).call(a);
    if (className !== (0, $176574efdb99ceab$export$f84e8e69fd4488a5).call(b)) return false;
    // Work around a bug in IE 10 - Edge 13.
    if ((0, $2b92d940c7e3ab3a$export$834f1807c25991c1) && className == "[object Object]" && (0, $51c16328a77d9cdb$export$2e2bcd8739ae039)(a)) {
        if (!(0, $51c16328a77d9cdb$export$2e2bcd8739ae039)(b)) return false;
        className = $83c3e8aa080864aa$var$tagDataView;
    }
    switch(className){
        // These types are compared by value.
        case "[object RegExp]":
        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
        case "[object String]":
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return "" + a === "" + b;
        case "[object Number]":
            // `NaN`s are equivalent, but non-reflexive.
            // Object(NaN) is equivalent to NaN.
            if (+a !== +a) return +b !== +b;
            // An `egal` comparison is performed for other numeric values.
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case "[object Date]":
        case "[object Boolean]":
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a === +b;
        case "[object Symbol]":
            return (0, $176574efdb99ceab$export$e229dcb397ceea81).valueOf.call(a) === (0, $176574efdb99ceab$export$e229dcb397ceea81).valueOf.call(b);
        case "[object ArrayBuffer]":
        case $83c3e8aa080864aa$var$tagDataView:
            // Coerce to typed array so we can fall through.
            return $83c3e8aa080864aa$var$deepEq((0, $5d79ac58b129ff0f$export$2e2bcd8739ae039)(a), (0, $5d79ac58b129ff0f$export$2e2bcd8739ae039)(b), aStack, bStack);
    }
    var areArrays = className === "[object Array]";
    if (!areArrays && (0, $6392dae81062c9ff$export$2e2bcd8739ae039)(a)) {
        var byteLength = (0, $362d3807c78cdab5$export$2e2bcd8739ae039)(a);
        if (byteLength !== (0, $362d3807c78cdab5$export$2e2bcd8739ae039)(b)) return false;
        if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
        areArrays = true;
    }
    if (!areArrays) {
        if (typeof a != "object" || typeof b != "object") return false;
        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !((0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(aCtor) && aCtor instanceof aCtor && (0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) return false;
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while(length--){
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a) return bStack[length] === b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    // Recursively compare objects and arrays.
    if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;
        if (length !== b.length) return false;
        // Deep compare the contents, ignoring non-numeric properties.
        while(length--){
            if (!$83c3e8aa080864aa$var$eq(a[length], b[length], aStack, bStack)) return false;
        }
    } else {
        // Deep compare objects.
        var _keys = (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(a), key;
        length = _keys.length;
        // Ensure that both objects contain the same number of properties before comparing deep equality.
        if ((0, $d361877b1e65ff30$export$2e2bcd8739ae039)(b).length !== length) return false;
        while(length--){
            // Deep compare each member
            key = _keys[length];
            if (!((0, $1d120d7858011d56$export$2e2bcd8739ae039)(b, key) && $83c3e8aa080864aa$var$eq(a[key], b[key], aStack, bStack))) return false;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
}
function $83c3e8aa080864aa$export$2e2bcd8739ae039(a, b) {
    return $83c3e8aa080864aa$var$eq(a, b);
}









function $0a6acc3ddc3dfb1c$export$2e2bcd8739ae039(obj) {
    if (!(0, $700edb547dceaa51$export$2e2bcd8739ae039)(obj)) return [];
    var keys = [];
    for(var key in obj)keys.push(key);
    // Ahem, IE < 9.
    if (0, $176574efdb99ceab$export$7dcea4d27900b116) (0, $f26a5e5fd30d87a4$export$2e2bcd8739ae039)(obj, keys);
    return keys;
}


function $59a23774e17ef227$export$15230eca1f400e40(methods) {
    var length = (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(methods);
    return function(obj) {
        if (obj == null) return false;
        // `Map`, `WeakMap` and `Set` have no enumerable keys.
        var keys = (0, $0a6acc3ddc3dfb1c$export$2e2bcd8739ae039)(obj);
        if ((0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(keys)) return false;
        for(var i = 0; i < length; i++){
            if (!(0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(obj[methods[i]])) return false;
        }
        // If we are testing against `WeakMap`, we need to ensure that
        // `obj` doesn't have a `forEach` method in order to distinguish
        // it from a regular `Map`.
        return methods !== $59a23774e17ef227$export$2f74b890a72cf48 || !(0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(obj[$59a23774e17ef227$var$forEachName]);
    };
}
// In the interest of compact minification, we write
// each string in the fingerprints only once.
var $59a23774e17ef227$var$forEachName = "forEach", $59a23774e17ef227$var$hasName = "has", $59a23774e17ef227$var$commonInit = [
    "clear",
    "delete"
], $59a23774e17ef227$var$mapTail = [
    "get",
    $59a23774e17ef227$var$hasName,
    "set"
];
var $59a23774e17ef227$export$de9acb94190bb764 = $59a23774e17ef227$var$commonInit.concat($59a23774e17ef227$var$forEachName, $59a23774e17ef227$var$mapTail), $59a23774e17ef227$export$2f74b890a72cf48 = $59a23774e17ef227$var$commonInit.concat($59a23774e17ef227$var$mapTail), $59a23774e17ef227$export$60e14a5e2a057f78 = [
    "add"
].concat($59a23774e17ef227$var$commonInit, $59a23774e17ef227$var$forEachName, $59a23774e17ef227$var$hasName);


var $3686fff8cb0c288a$export$2e2bcd8739ae039 = (0, $2b92d940c7e3ab3a$export$f7bad96d83325a34) ? (0, $59a23774e17ef227$export$15230eca1f400e40)((0, $59a23774e17ef227$export$de9acb94190bb764)) : (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("Map");





var $bfa62269ccd4ee4a$export$2e2bcd8739ae039 = (0, $2b92d940c7e3ab3a$export$f7bad96d83325a34) ? (0, $59a23774e17ef227$export$15230eca1f400e40)((0, $59a23774e17ef227$export$2f74b890a72cf48)) : (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("WeakMap");





var $4156889e184d1b35$export$2e2bcd8739ae039 = (0, $2b92d940c7e3ab3a$export$f7bad96d83325a34) ? (0, $59a23774e17ef227$export$15230eca1f400e40)((0, $59a23774e17ef227$export$60e14a5e2a057f78)) : (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("Set");



var $f598a6bb630e3f25$export$2e2bcd8739ae039 = (0, $c44ecfe62eb6bb01$export$2e2bcd8739ae039)("WeakSet");





function $feaba76ced978a27$export$2e2bcd8739ae039(obj) {
    var _keys = (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj);
    var length = _keys.length;
    var values1 = Array(length);
    for(var i = 0; i < length; i++)values1[i] = obj[_keys[i]];
    return values1;
}



function $f4e55101494ffee6$export$2e2bcd8739ae039(obj) {
    var _keys = (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj);
    var length = _keys.length;
    var pairs1 = Array(length);
    for(var i = 0; i < length; i++)pairs1[i] = [
        _keys[i],
        obj[_keys[i]]
    ];
    return pairs1;
}



function $788035fb888baa7d$export$2e2bcd8739ae039(obj) {
    var result = {};
    var _keys = (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj);
    for(var i = 0, length = _keys.length; i < length; i++)result[obj[_keys[i]]] = _keys[i];
    return result;
}



function $e78bbd11b2d1fc01$export$2e2bcd8739ae039(obj) {
    var names = [];
    for(var key in obj)if ((0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(obj[key])) names.push(key);
    return names.sort();
}


function $95d2942c783dbd2f$export$2e2bcd8739ae039(keysFunc, defaults) {
    return function(obj) {
        var length = arguments.length;
        if (defaults) obj = Object(obj);
        if (length < 2 || obj == null) return obj;
        for(var index = 1; index < length; index++){
            var source = arguments[index], keys = keysFunc(source), l = keys.length;
            for(var i = 0; i < l; i++){
                var key = keys[i];
                if (!defaults || obj[key] === void 0) obj[key] = source[key];
            }
        }
        return obj;
    };
}



var // Extend a given object with all the properties in passed-in object(s).
$d59069dae952bf60$export$2e2bcd8739ae039 = (0, $95d2942c783dbd2f$export$2e2bcd8739ae039)((0, $0a6acc3ddc3dfb1c$export$2e2bcd8739ae039));




var // Assigns a given object with all the own properties in the passed-in
// object(s).
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
$fc472092c470035e$export$2e2bcd8739ae039 = (0, $95d2942c783dbd2f$export$2e2bcd8739ae039)((0, $d361877b1e65ff30$export$2e2bcd8739ae039));




var // Fill in a given object with default properties.
$e31b0be2af054785$export$2e2bcd8739ae039 = (0, $95d2942c783dbd2f$export$2e2bcd8739ae039)((0, $0a6acc3ddc3dfb1c$export$2e2bcd8739ae039), true);




// Create a naked function reference for surrogate-prototype-swapping.
function $7a28a0b667f0a4ae$var$ctor() {
    return function() {};
}
function $7a28a0b667f0a4ae$export$2e2bcd8739ae039(prototype) {
    if (!(0, $700edb547dceaa51$export$2e2bcd8739ae039)(prototype)) return {};
    if (0, $176574efdb99ceab$export$5b53dc95b548c58c) return (0, $176574efdb99ceab$export$5b53dc95b548c58c)(prototype);
    var Ctor = $7a28a0b667f0a4ae$var$ctor();
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
}



function $0c796c1f65a2f403$export$2e2bcd8739ae039(prototype, props) {
    var result = (0, $7a28a0b667f0a4ae$export$2e2bcd8739ae039)(prototype);
    if (props) (0, $fc472092c470035e$export$2e2bcd8739ae039)(result, props);
    return result;
}





function $75f74f2d2dfffdb8$export$2e2bcd8739ae039(obj) {
    if (!(0, $700edb547dceaa51$export$2e2bcd8739ae039)(obj)) return obj;
    return (0, $7e99210a3696eaaf$export$2e2bcd8739ae039)(obj) ? obj.slice() : (0, $d59069dae952bf60$export$2e2bcd8739ae039)({}, obj);
}


function $757ed43efb61f1da$export$2e2bcd8739ae039(obj, interceptor) {
    interceptor(obj);
    return obj;
}





function $bc7ab8bcaadb18ec$export$2e2bcd8739ae039(path) {
    return (0, $7e99210a3696eaaf$export$2e2bcd8739ae039)(path) ? path : [
        path
    ];
}
(0, $25414d4304399c8c$export$2e2bcd8739ae039).toPath = $bc7ab8bcaadb18ec$export$2e2bcd8739ae039;


function $131131b0911a22bf$export$2e2bcd8739ae039(path) {
    return (0, $25414d4304399c8c$export$2e2bcd8739ae039).toPath(path);
}


function $a16c744e8d624204$export$2e2bcd8739ae039(obj, path) {
    var length = path.length;
    for(var i = 0; i < length; i++){
        if (obj == null) return void 0;
        obj = obj[path[i]];
    }
    return length ? obj : void 0;
}



function $5305b26f88a4310b$export$2e2bcd8739ae039(object, path, defaultValue) {
    var value = (0, $a16c744e8d624204$export$2e2bcd8739ae039)(object, (0, $131131b0911a22bf$export$2e2bcd8739ae039)(path));
    return (0, $1fbaea01384b8f3d$export$2e2bcd8739ae039)(value) ? defaultValue : value;
}




function $b68863642a11a641$export$2e2bcd8739ae039(obj, path) {
    path = (0, $131131b0911a22bf$export$2e2bcd8739ae039)(path);
    var length = path.length;
    for(var i = 0; i < length; i++){
        var key = path[i];
        if (!(0, $1d120d7858011d56$export$2e2bcd8739ae039)(obj, key)) return false;
        obj = obj[key];
    }
    return !!length;
}



function $6d93bbb9d1a7d2e0$export$2e2bcd8739ae039(value) {
    return value;
}







function $ce5c1dc9f55a5ffb$export$2e2bcd8739ae039(attrs) {
    attrs = (0, $fc472092c470035e$export$2e2bcd8739ae039)({}, attrs);
    return function(obj) {
        return (0, $6c7b600fe8258447$export$2e2bcd8739ae039)(obj, attrs);
    };
}




function $af306a07ffa1d813$export$2e2bcd8739ae039(path) {
    path = (0, $131131b0911a22bf$export$2e2bcd8739ae039)(path);
    return function(obj) {
        return (0, $a16c744e8d624204$export$2e2bcd8739ae039)(obj, path);
    };
}


function $85298d849865a869$export$2e2bcd8739ae039(func, context, argCount) {
    if (context === void 0) return func;
    switch(argCount == null ? 3 : argCount){
        case 1:
            return function(value) {
                return func.call(context, value);
            };
        // The 2-argument case is omitted because we’re not using it.
        case 3:
            return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
        case 4:
            return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
    }
    return function() {
        return func.apply(context, arguments);
    };
}


function $3b2e9cf27ca0b9f7$export$2e2bcd8739ae039(value, context, argCount) {
    if (value == null) return 0, $6d93bbb9d1a7d2e0$export$2e2bcd8739ae039;
    if ((0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(value)) return (0, $85298d849865a869$export$2e2bcd8739ae039)(value, context, argCount);
    if ((0, $700edb547dceaa51$export$2e2bcd8739ae039)(value) && !(0, $7e99210a3696eaaf$export$2e2bcd8739ae039)(value)) return (0, $ce5c1dc9f55a5ffb$export$2e2bcd8739ae039)(value);
    return (0, $af306a07ffa1d813$export$2e2bcd8739ae039)(value);
}




function $d030be9875dd79de$export$2e2bcd8739ae039(value, context) {
    return (0, $3b2e9cf27ca0b9f7$export$2e2bcd8739ae039)(value, context, Infinity);
}
(0, $25414d4304399c8c$export$2e2bcd8739ae039).iteratee = $d030be9875dd79de$export$2e2bcd8739ae039;


function $952f039e62fb8329$export$2e2bcd8739ae039(value, context, argCount) {
    if ((0, $25414d4304399c8c$export$2e2bcd8739ae039).iteratee !== (0, $d030be9875dd79de$export$2e2bcd8739ae039)) return (0, $25414d4304399c8c$export$2e2bcd8739ae039).iteratee(value, context);
    return (0, $3b2e9cf27ca0b9f7$export$2e2bcd8739ae039)(value, context, argCount);
}



function $44383b38efc56d24$export$2e2bcd8739ae039(obj, iteratee, context) {
    iteratee = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(iteratee, context);
    var _keys = (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj), length = _keys.length, results = {};
    for(var index = 0; index < length; index++){
        var currentKey = _keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
}




function $d6518b57056e0af2$export$2e2bcd8739ae039() {}






function $878b3c53ca4f3f57$export$2e2bcd8739ae039(obj) {
    if (obj == null) return 0, $d6518b57056e0af2$export$2e2bcd8739ae039;
    return function(path) {
        return (0, $5305b26f88a4310b$export$2e2bcd8739ae039)(obj, path);
    };
}




function $846d052e3a7e4c93$export$2e2bcd8739ae039(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = (0, $85298d849865a869$export$2e2bcd8739ae039)(iteratee, context, 1);
    for(var i = 0; i < n; i++)accum[i] = iteratee(i);
    return accum;
}


function $18a53a81b123285d$export$2e2bcd8739ae039(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
}


var // A (possibly faster) way to get the current timestamp as an integer.
$a8e65f230771a17b$export$2e2bcd8739ae039 = Date.now || function() {
    return new Date().getTime();
};



function $804086042716cfdc$export$2e2bcd8739ae039(map) {
    var escaper = function(match) {
        return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = "(?:" + (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(map).join("|") + ")";
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, "g");
    return function(string) {
        string = string == null ? "" : "" + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
}


var // Internal list of HTML entities for escaping.
$78925cf4b7c941af$export$2e2bcd8739ae039 = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
};


var // Function for escaping strings to HTML interpolation.
$e7c81655f30fb6f4$export$2e2bcd8739ae039 = (0, $804086042716cfdc$export$2e2bcd8739ae039)((0, $78925cf4b7c941af$export$2e2bcd8739ae039));





var // Internal list of HTML entities for unescaping.
$57e1063a739c68d5$export$2e2bcd8739ae039 = (0, $788035fb888baa7d$export$2e2bcd8739ae039)((0, $78925cf4b7c941af$export$2e2bcd8739ae039));


var // Function for unescaping strings from HTML interpolation.
$99123ea36f59bc41$export$2e2bcd8739ae039 = (0, $804086042716cfdc$export$2e2bcd8739ae039)((0, $57e1063a739c68d5$export$2e2bcd8739ae039));



var // By default, Underscore uses ERB-style template delimiters. Change the
// following template settings to use alternative delimiters.
$975f212e68134aa6$export$2e2bcd8739ae039 = (0, $25414d4304399c8c$export$2e2bcd8739ae039).templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
};





// When customizing `_.templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var $40cade613c5c7600$var$noMatch = /(.)^/;
// Certain characters need to be escaped so that they can be put into a
// string literal.
var $40cade613c5c7600$var$escapes = {
    "'": "'",
    "\\": "\\",
    "\r": "r",
    "\n": "n",
    "\u2028": "u2028",
    "\u2029": "u2029"
};
var $40cade613c5c7600$var$escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
function $40cade613c5c7600$var$escapeChar(match) {
    return "\\" + $40cade613c5c7600$var$escapes[match];
}
// In order to prevent third-party code injection through
// `_.templateSettings.variable`, we test it against the following regular
// expression. It is intentionally a bit more liberal than just matching valid
// identifiers, but still prevents possible loopholes through defaults or
// destructuring assignment.
var $40cade613c5c7600$var$bareIdentifier = /^\s*(\w|\$)+\s*$/;
function $40cade613c5c7600$export$2e2bcd8739ae039(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = (0, $e31b0be2af054785$export$2e2bcd8739ae039)({}, settings, (0, $25414d4304399c8c$export$2e2bcd8739ae039).templateSettings);
    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
        (settings.escape || $40cade613c5c7600$var$noMatch).source,
        (settings.interpolate || $40cade613c5c7600$var$noMatch).source,
        (settings.evaluate || $40cade613c5c7600$var$noMatch).source
    ].join("|") + "|$", "g");
    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace($40cade613c5c7600$var$escapeRegExp, $40cade613c5c7600$var$escapeChar);
        index = offset + match.length;
        if (escape) source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        else if (interpolate) source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        else if (evaluate) source += "';\n" + evaluate + "\n__p+='";
        // Adobe VMs need the match returned to produce the correct offset.
        return match;
    });
    source += "';\n";
    var argument = settings.variable;
    if (argument) {
        // Insure against third-party code injection. (CVE-2021-23358)
        if (!$40cade613c5c7600$var$bareIdentifier.test(argument)) throw new Error("variable is not a bare identifier: " + argument);
    } else {
        // If a variable is not specified, place data values in local scope.
        source = "with(obj||{}){\n" + source + "}\n";
        argument = "obj";
    }
    source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
    var render;
    try {
        render = new Function(argument, "_", source);
    } catch (e) {
        e.source = source;
        throw e;
    }
    var template1 = function(data) {
        return render.call(this, data, (0, $25414d4304399c8c$export$2e2bcd8739ae039));
    };
    // Provide the compiled source as a convenience for precompilation.
    template1.source = "function(" + argument + "){\n" + source + "}";
    return template1;
}




function $b56d8d1e077cdc41$export$2e2bcd8739ae039(obj, path, fallback) {
    path = (0, $131131b0911a22bf$export$2e2bcd8739ae039)(path);
    var length = path.length;
    if (!length) return (0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(fallback) ? fallback.call(obj) : fallback;
    for(var i = 0; i < length; i++){
        var prop = obj == null ? void 0 : obj[path[i]];
        if (prop === void 0) {
            prop = fallback;
            i = length; // Ensure we don't continue iterating.
        }
        obj = (0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(prop) ? prop.call(obj) : prop;
    }
    return obj;
}


// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var $69e2fe5c6ce61373$var$idCounter = 0;
function $69e2fe5c6ce61373$export$2e2bcd8739ae039(prefix) {
    var id = ++$69e2fe5c6ce61373$var$idCounter + "";
    return prefix ? prefix + id : id;
}



function $71dbb4fba6478a3d$export$2e2bcd8739ae039(obj) {
    var instance = (0, $25414d4304399c8c$export$2e2bcd8739ae039)(obj);
    instance._chain = true;
    return instance;
}






function $6b708424c374bf3f$export$2e2bcd8739ae039(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = (0, $7a28a0b667f0a4ae$export$2e2bcd8739ae039)(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if ((0, $700edb547dceaa51$export$2e2bcd8739ae039)(result)) return result;
    return self;
}



// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. `_` acts
// as a placeholder by default, allowing any combination of arguments to be
// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
var $c0c93b2cca61926f$var$partial = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(func, boundArgs) {
    var placeholder = $c0c93b2cca61926f$var$partial.placeholder;
    var bound = function() {
        var position = 0, length = boundArgs.length;
        var args = Array(length);
        for(var i = 0; i < length; i++)args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
        while(position < arguments.length)args.push(arguments[position++]);
        return (0, $6b708424c374bf3f$export$2e2bcd8739ae039)(func, bound, this, this, args);
    };
    return bound;
});
$c0c93b2cca61926f$var$partial.placeholder = (0, $25414d4304399c8c$export$2e2bcd8739ae039);
var $c0c93b2cca61926f$export$2e2bcd8739ae039 = $c0c93b2cca61926f$var$partial;





var // Create a function bound to a given object (assigning `this`, and arguments,
// optionally).
$fa50e323624dc7eb$export$2e2bcd8739ae039 = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(func, context, args) {
    if (!(0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(func)) throw new TypeError("Bind must be called on a function");
    var bound = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(callArgs) {
        return (0, $6b708424c374bf3f$export$2e2bcd8739ae039)(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
});






var // Internal helper for collection methods to determine whether a collection
// should be iterated as an array or as an object.
// Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
$0d0dac860743d669$export$2e2bcd8739ae039 = (0, $af8eda2e8084b74e$export$2e2bcd8739ae039)((0, $21410f8baa7a66c1$export$2e2bcd8739ae039));




function $ec8350880d87d41e$export$2e2bcd8739ae039(input, depth, strict, output) {
    output = output || [];
    if (!depth && depth !== 0) depth = Infinity;
    else if (depth <= 0) return output.concat(input);
    var idx = output.length;
    for(var i = 0, length = (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(input); i < length; i++){
        var value = input[i];
        if ((0, $0d0dac860743d669$export$2e2bcd8739ae039)(value) && ((0, $7e99210a3696eaaf$export$2e2bcd8739ae039)(value) || (0, $b055a50504c61f05$export$2e2bcd8739ae039)(value))) {
            // Flatten current level of array or arguments object.
            if (depth > 1) {
                $ec8350880d87d41e$export$2e2bcd8739ae039(value, depth - 1, strict, output);
                idx = output.length;
            } else {
                var j = 0, len = value.length;
                while(j < len)output[idx++] = value[j++];
            }
        } else if (!strict) output[idx++] = value;
    }
    return output;
}



var // Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
$13c351fb9e4ab0ef$export$2e2bcd8739ae039 = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(obj, keys) {
    keys = (0, $ec8350880d87d41e$export$2e2bcd8739ae039)(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error("bindAll must be passed function names");
    while(index--){
        var key = keys[index];
        obj[key] = (0, $fa50e323624dc7eb$export$2e2bcd8739ae039)(obj[key], obj);
    }
    return obj;
});



function $234b85f139181bb1$export$2e2bcd8739ae039(func, hasher) {
    var memoize1 = function(key) {
        var cache = memoize1.cache;
        var address = "" + (hasher ? hasher.apply(this, arguments) : key);
        if (!(0, $1d120d7858011d56$export$2e2bcd8739ae039)(cache, address)) cache[address] = func.apply(this, arguments);
        return cache[address];
    };
    memoize1.cache = {};
    return memoize1;
}



var // Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
$c96d2717cfab0b2f$export$2e2bcd8739ae039 = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(func, wait, args) {
    return setTimeout(function() {
        return func.apply(null, args);
    }, wait);
});





var // Defers a function, scheduling it to run after the current call stack has
// cleared.
$c9af34864efb7633$export$2e2bcd8739ae039 = (0, $c0c93b2cca61926f$export$2e2bcd8739ae039)((0, $c96d2717cfab0b2f$export$2e2bcd8739ae039), (0, $25414d4304399c8c$export$2e2bcd8739ae039), 1);



function $e2db7fb25d29ea94$export$2e2bcd8739ae039(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : (0, $a8e65f230771a17b$export$2e2bcd8739ae039)();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    var throttled = function() {
        var _now = (0, $a8e65f230771a17b$export$2e2bcd8739ae039)();
        if (!previous && options.leading === false) previous = _now;
        var remaining = wait - (_now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = _now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) timeout = setTimeout(later, remaining);
        return result;
    };
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };
    return throttled;
}




function $394a380e575e6a0f$export$2e2bcd8739ae039(func, wait, immediate) {
    var timeout, previous, args, result, context;
    var later = function() {
        var passed = (0, $a8e65f230771a17b$export$2e2bcd8739ae039)() - previous;
        if (wait > passed) timeout = setTimeout(later, wait - passed);
        else {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
            // This check is needed because `func` can recursively invoke `debounced`.
            if (!timeout) args = context = null;
        }
    };
    var debounced = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(_args) {
        context = this;
        args = _args;
        previous = (0, $a8e65f230771a17b$export$2e2bcd8739ae039)();
        if (!timeout) {
            timeout = setTimeout(later, wait);
            if (immediate) result = func.apply(context, args);
        }
        return result;
    });
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = args = context = null;
    };
    return debounced;
}



function $7d301bfe36c4072d$export$2e2bcd8739ae039(func, wrapper) {
    return (0, $c0c93b2cca61926f$export$2e2bcd8739ae039)(wrapper, func);
}


function $b90261499d8178f0$export$2e2bcd8739ae039(predicate) {
    return function() {
        return !predicate.apply(this, arguments);
    };
}


function $f5718faf49cadba8$export$2e2bcd8739ae039() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while(i--)result = args[i].call(this, result);
        return result;
    };
}


function $adbf0ef79c4ec854$export$2e2bcd8739ae039(times, func) {
    return function() {
        if (--times < 1) return func.apply(this, arguments);
    };
}


function $d576bc968b661f82$export$2e2bcd8739ae039(times, func) {
    var memo;
    return function() {
        if (--times > 0) memo = func.apply(this, arguments);
        if (times <= 1) func = null;
        return memo;
    };
}




var // Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.
$dc32fe3ea09adc90$export$2e2bcd8739ae039 = (0, $c0c93b2cca61926f$export$2e2bcd8739ae039)((0, $d576bc968b661f82$export$2e2bcd8739ae039), 2);




function $116e98995134e88b$export$2e2bcd8739ae039(obj, predicate, context) {
    predicate = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(predicate, context);
    var _keys = (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj), key;
    for(var i = 0, length = _keys.length; i < length; i++){
        key = _keys[i];
        if (predicate(obj[key], key, obj)) return key;
    }
}




function $288ad0e76b2d7cb4$export$2e2bcd8739ae039(dir) {
    return function(array, predicate, context) {
        predicate = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(predicate, context);
        var length = (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(array);
        var index = dir > 0 ? 0 : length - 1;
        for(; index >= 0 && index < length; index += dir){
            if (predicate(array[index], index, array)) return index;
        }
        return -1;
    };
}


var // Returns the first index on an array-like that passes a truth test.
$e83fa030884cb136$export$2e2bcd8739ae039 = (0, $288ad0e76b2d7cb4$export$2e2bcd8739ae039)(1);



var // Returns the last index on an array-like that passes a truth test.
$23be4cbc3ea59179$export$2e2bcd8739ae039 = (0, $288ad0e76b2d7cb4$export$2e2bcd8739ae039)(-1);




function $a0e017bb18091621$export$2e2bcd8739ae039(array, obj, iteratee, context) {
    iteratee = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(array);
    while(low < high){
        var mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < value) low = mid + 1;
        else high = mid;
    }
    return low;
}







function $8ebb2570b13fa56e$export$2e2bcd8739ae039(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
        var i = 0, length = (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(array);
        if (typeof idx == "number") {
            if (dir > 0) i = idx >= 0 ? idx : Math.max(idx + length, i);
            else length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        } else if (sortedIndex && idx && length) {
            idx = sortedIndex(array, item);
            return array[idx] === item ? idx : -1;
        }
        if (item !== item) {
            idx = predicateFind((0, $176574efdb99ceab$export$58adb3bec8346d0f).call(array, i, length), (0, $d37f7b39268f1d85$export$2e2bcd8739ae039));
            return idx >= 0 ? idx + i : -1;
        }
        for(idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir){
            if (array[idx] === item) return idx;
        }
        return -1;
    };
}


var // Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.
$054a43762b29fee1$export$2e2bcd8739ae039 = (0, $8ebb2570b13fa56e$export$2e2bcd8739ae039)(1, (0, $e83fa030884cb136$export$2e2bcd8739ae039), (0, $a0e017bb18091621$export$2e2bcd8739ae039));




var // Return the position of the last occurrence of an item in an array,
// or -1 if the item is not included in the array.
$bd5310a9c53bad51$export$2e2bcd8739ae039 = (0, $8ebb2570b13fa56e$export$2e2bcd8739ae039)(-1, (0, $23be4cbc3ea59179$export$2e2bcd8739ae039));





function $136f5f00dc3acc1f$export$2e2bcd8739ae039(obj, predicate, context) {
    var keyFinder = (0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj) ? (0, $e83fa030884cb136$export$2e2bcd8739ae039) : (0, $116e98995134e88b$export$2e2bcd8739ae039);
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
}




function $f11927d8e3c90112$export$2e2bcd8739ae039(obj, attrs) {
    return (0, $136f5f00dc3acc1f$export$2e2bcd8739ae039)(obj, (0, $ce5c1dc9f55a5ffb$export$2e2bcd8739ae039)(attrs));
}





function $741e882a16974ae6$export$2e2bcd8739ae039(obj, iteratee, context) {
    iteratee = (0, $85298d849865a869$export$2e2bcd8739ae039)(iteratee, context);
    var i, length;
    if ((0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj)) for(i = 0, length = obj.length; i < length; i++)iteratee(obj[i], i, obj);
    else {
        var _keys = (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj);
        for(i = 0, length = _keys.length; i < length; i++)iteratee(obj[_keys[i]], _keys[i], obj);
    }
    return obj;
}





function $366a0c14a7eae515$export$2e2bcd8739ae039(obj, iteratee, context) {
    iteratee = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(iteratee, context);
    var _keys = !(0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj) && (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj), length = (_keys || obj).length, results = Array(length);
    for(var index = 0; index < length; index++){
        var currentKey = _keys ? _keys[index] : index;
        results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
}





function $f16b09987a82745d$export$2e2bcd8739ae039(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
        var _keys = !(0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj) && (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj), length = (_keys || obj).length, index = dir > 0 ? 0 : length - 1;
        if (!initial) {
            memo = obj[_keys ? _keys[index] : index];
            index += dir;
        }
        for(; index >= 0 && index < length; index += dir){
            var currentKey = _keys ? _keys[index] : index;
            memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
    };
    return function(obj, iteratee, memo, context) {
        var initial = arguments.length >= 3;
        return reducer(obj, (0, $85298d849865a869$export$2e2bcd8739ae039)(iteratee, context, 4), memo, initial);
    };
}


var // **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.
$35022ea036070f69$export$2e2bcd8739ae039 = (0, $f16b09987a82745d$export$2e2bcd8739ae039)(1);



var // The right-associative version of reduce, also known as `foldr`.
$ef0f14acaefd0e5d$export$2e2bcd8739ae039 = (0, $f16b09987a82745d$export$2e2bcd8739ae039)(-1);




function $bb8f1682d6c2b24b$export$2e2bcd8739ae039(obj, predicate, context) {
    var results = [];
    predicate = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(predicate, context);
    (0, $741e882a16974ae6$export$2e2bcd8739ae039)(obj, function(value, index, list) {
        if (predicate(value, index, list)) results.push(value);
    });
    return results;
}





function $70f30f659079b11d$export$2e2bcd8739ae039(obj, predicate, context) {
    return (0, $bb8f1682d6c2b24b$export$2e2bcd8739ae039)(obj, (0, $b90261499d8178f0$export$2e2bcd8739ae039)((0, $952f039e62fb8329$export$2e2bcd8739ae039)(predicate)), context);
}





function $5c919cc39d9e9609$export$2e2bcd8739ae039(obj, predicate, context) {
    predicate = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(predicate, context);
    var _keys = !(0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj) && (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj), length = (_keys || obj).length;
    for(var index = 0; index < length; index++){
        var currentKey = _keys ? _keys[index] : index;
        if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
}





function $1ed73232df28b69c$export$2e2bcd8739ae039(obj, predicate, context) {
    predicate = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(predicate, context);
    var _keys = !(0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj) && (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj), length = (_keys || obj).length;
    for(var index = 0; index < length; index++){
        var currentKey = _keys ? _keys[index] : index;
        if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
}





function $5fd90187c68c82a0$export$2e2bcd8739ae039(obj, item, fromIndex, guard) {
    if (!(0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj)) obj = (0, $feaba76ced978a27$export$2e2bcd8739ae039)(obj);
    if (typeof fromIndex != "number" || guard) fromIndex = 0;
    return (0, $054a43762b29fee1$export$2e2bcd8739ae039)(obj, item, fromIndex) >= 0;
}







var // Invoke a method (with arguments) on every item in a collection.
$6861a5d2abd4653f$export$2e2bcd8739ae039 = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(obj, path, args) {
    var contextPath, func;
    if ((0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(path)) func = path;
    else {
        path = (0, $131131b0911a22bf$export$2e2bcd8739ae039)(path);
        contextPath = path.slice(0, -1);
        path = path[path.length - 1];
    }
    return (0, $366a0c14a7eae515$export$2e2bcd8739ae039)(obj, function(context) {
        var method = func;
        if (!method) {
            if (contextPath && contextPath.length) context = (0, $a16c744e8d624204$export$2e2bcd8739ae039)(context, contextPath);
            if (context == null) return void 0;
            method = context[path];
        }
        return method == null ? method : method.apply(context, args);
    });
});




function $c85fa29cfa44f8f8$export$2e2bcd8739ae039(obj, key) {
    return (0, $366a0c14a7eae515$export$2e2bcd8739ae039)(obj, (0, $af306a07ffa1d813$export$2e2bcd8739ae039)(key));
}




function $9f95d8e3fc317775$export$2e2bcd8739ae039(obj, attrs) {
    return (0, $bb8f1682d6c2b24b$export$2e2bcd8739ae039)(obj, (0, $ce5c1dc9f55a5ffb$export$2e2bcd8739ae039)(attrs));
}






function $f62997178d943b97$export$2e2bcd8739ae039(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity, value, computed;
    if (iteratee == null || typeof iteratee == "number" && typeof obj[0] != "object" && obj != null) {
        obj = (0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj) ? obj : (0, $feaba76ced978a27$export$2e2bcd8739ae039)(obj);
        for(var i = 0, length = obj.length; i < length; i++){
            value = obj[i];
            if (value != null && value > result) result = value;
        }
    } else {
        iteratee = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(iteratee, context);
        (0, $741e882a16974ae6$export$2e2bcd8739ae039)(obj, function(v, index, list) {
            computed = iteratee(v, index, list);
            if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                result = v;
                lastComputed = computed;
            }
        });
    }
    return result;
}






function $8073d712552b51c3$export$2e2bcd8739ae039(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity, value, computed;
    if (iteratee == null || typeof iteratee == "number" && typeof obj[0] != "object" && obj != null) {
        obj = (0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj) ? obj : (0, $feaba76ced978a27$export$2e2bcd8739ae039)(obj);
        for(var i = 0, length = obj.length; i < length; i++){
            value = obj[i];
            if (value != null && value < result) result = value;
        }
    } else {
        iteratee = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(iteratee, context);
        (0, $741e882a16974ae6$export$2e2bcd8739ae039)(obj, function(v, index, list) {
            computed = iteratee(v, index, list);
            if (computed < lastComputed || computed === Infinity && result === Infinity) {
                result = v;
                lastComputed = computed;
            }
        });
    }
    return result;
}













// Safely create a real, live array from anything iterable.
var $ee0191fd75d0130b$var$reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function $ee0191fd75d0130b$export$2e2bcd8739ae039(obj) {
    if (!obj) return [];
    if ((0, $7e99210a3696eaaf$export$2e2bcd8739ae039)(obj)) return (0, $176574efdb99ceab$export$58adb3bec8346d0f).call(obj);
    if ((0, $4e4e40fba5525ee6$export$2e2bcd8739ae039)(obj)) // Keep surrogate pair characters together.
    return obj.match($ee0191fd75d0130b$var$reStrSymbol);
    if ((0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj)) return (0, $366a0c14a7eae515$export$2e2bcd8739ae039)(obj, (0, $6d93bbb9d1a7d2e0$export$2e2bcd8739ae039));
    return (0, $feaba76ced978a27$export$2e2bcd8739ae039)(obj);
}


function $bb3a8c4a9f23cac8$export$2e2bcd8739ae039(obj, n, guard) {
    if (n == null || guard) {
        if (!(0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj)) obj = (0, $feaba76ced978a27$export$2e2bcd8739ae039)(obj);
        return obj[(0, $18a53a81b123285d$export$2e2bcd8739ae039)(obj.length - 1)];
    }
    var sample1 = (0, $ee0191fd75d0130b$export$2e2bcd8739ae039)(obj);
    var length = (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(sample1);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for(var index = 0; index < n; index++){
        var rand = (0, $18a53a81b123285d$export$2e2bcd8739ae039)(index, last);
        var temp = sample1[index];
        sample1[index] = sample1[rand];
        sample1[rand] = temp;
    }
    return sample1.slice(0, n);
}


function $a0d239fccc876aa0$export$2e2bcd8739ae039(obj) {
    return (0, $bb3a8c4a9f23cac8$export$2e2bcd8739ae039)(obj, Infinity);
}






function $65018d21e9edb780$export$2e2bcd8739ae039(obj, iteratee, context) {
    var index = 0;
    iteratee = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(iteratee, context);
    return (0, $c85fa29cfa44f8f8$export$2e2bcd8739ae039)((0, $366a0c14a7eae515$export$2e2bcd8739ae039)(obj, function(value, key, list) {
        return {
            value: value,
            index: index++,
            criteria: iteratee(value, key, list)
        };
    }).sort(function(left, right) {
        var a = left.criteria;
        var b = right.criteria;
        if (a !== b) {
            if (a > b || a === void 0) return 1;
            if (a < b || b === void 0) return -1;
        }
        return left.index - right.index;
    }), "value");
}




function $4775fdc9e80cb832$export$2e2bcd8739ae039(behavior, partition) {
    return function(obj, iteratee, context) {
        var result = partition ? [
            [],
            []
        ] : {};
        iteratee = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(iteratee, context);
        (0, $741e882a16974ae6$export$2e2bcd8739ae039)(obj, function(value, index) {
            var key = iteratee(value, index, obj);
            behavior(result, value, key);
        });
        return result;
    };
}



var // Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.
$86f29a9e74ef3bbf$export$2e2bcd8739ae039 = (0, $4775fdc9e80cb832$export$2e2bcd8739ae039)(function(result, value, key) {
    if ((0, $1d120d7858011d56$export$2e2bcd8739ae039)(result, key)) result[key].push(value);
    else result[key] = [
        value
    ];
});



var // Indexes the object's values by a criterion, similar to `_.groupBy`, but for
// when you know that your index values will be unique.
$d7f30a637f84136b$export$2e2bcd8739ae039 = (0, $4775fdc9e80cb832$export$2e2bcd8739ae039)(function(result, value, key) {
    result[key] = value;
});




var // Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.
$4f0454c1970b8132$export$2e2bcd8739ae039 = (0, $4775fdc9e80cb832$export$2e2bcd8739ae039)(function(result, value, key) {
    if ((0, $1d120d7858011d56$export$2e2bcd8739ae039)(result, key)) result[key]++;
    else result[key] = 1;
});



var // Split a collection into two arrays: one whose elements all pass the given
// truth test, and one whose elements all do not pass the truth test.
$2269dde69fa551a9$export$2e2bcd8739ae039 = (0, $4775fdc9e80cb832$export$2e2bcd8739ae039)(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
}, true);





function $535de268c165ac0f$export$2e2bcd8739ae039(obj) {
    if (obj == null) return 0;
    return (0, $0d0dac860743d669$export$2e2bcd8739ae039)(obj) ? obj.length : (0, $d361877b1e65ff30$export$2e2bcd8739ae039)(obj).length;
}






function $08cda3f6105523a7$export$2e2bcd8739ae039(value, key, obj) {
    return key in obj;
}



var // Return a copy of the object only containing the allowed properties.
$d44b267a4ba6d794$export$2e2bcd8739ae039 = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if ((0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(iteratee)) {
        if (keys.length > 1) iteratee = (0, $85298d849865a869$export$2e2bcd8739ae039)(iteratee, keys[1]);
        keys = (0, $0a6acc3ddc3dfb1c$export$2e2bcd8739ae039)(obj);
    } else {
        iteratee = (0, $08cda3f6105523a7$export$2e2bcd8739ae039);
        keys = (0, $ec8350880d87d41e$export$2e2bcd8739ae039)(keys, false, false);
        obj = Object(obj);
    }
    for(var i = 0, length = keys.length; i < length; i++){
        var key = keys[i];
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
});









var // Return a copy of the object without the disallowed properties.
$53ae2745e4241e8c$export$2e2bcd8739ae039 = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(obj, keys) {
    var iteratee = keys[0], context;
    if ((0, $60155a6a35e9dcf9$export$2e2bcd8739ae039)(iteratee)) {
        iteratee = (0, $b90261499d8178f0$export$2e2bcd8739ae039)(iteratee);
        if (keys.length > 1) context = keys[1];
    } else {
        keys = (0, $366a0c14a7eae515$export$2e2bcd8739ae039)((0, $ec8350880d87d41e$export$2e2bcd8739ae039)(keys, false, false), String);
        iteratee = function(value, key) {
            return !(0, $5fd90187c68c82a0$export$2e2bcd8739ae039)(keys, key);
        };
    }
    return (0, $d44b267a4ba6d794$export$2e2bcd8739ae039)(obj, iteratee, context);
});



function $79a2a688b16b6721$export$2e2bcd8739ae039(array, n, guard) {
    return (0, $176574efdb99ceab$export$58adb3bec8346d0f).call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
}


function $22eb36e7c3040e67$export$2e2bcd8739ae039(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[0];
    return (0, $79a2a688b16b6721$export$2e2bcd8739ae039)(array, array.length - n);
}




function $48ef791943985640$export$2e2bcd8739ae039(array, n, guard) {
    return (0, $176574efdb99ceab$export$58adb3bec8346d0f).call(array, n == null || guard ? 1 : n);
}


function $9189f83baa0c72f5$export$2e2bcd8739ae039(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return (0, $48ef791943985640$export$2e2bcd8739ae039)(array, Math.max(0, array.length - n));
}




function $06c4dcd9263bb003$export$2e2bcd8739ae039(array) {
    return (0, $bb8f1682d6c2b24b$export$2e2bcd8739ae039)(array, Boolean);
}



function $200b4f4ad7c0f90d$export$2e2bcd8739ae039(array, depth) {
    return (0, $ec8350880d87d41e$export$2e2bcd8739ae039)(array, depth, false);
}







var // Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
$138b0aed4c2ce94b$export$2e2bcd8739ae039 = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(array, rest) {
    rest = (0, $ec8350880d87d41e$export$2e2bcd8739ae039)(rest, true, true);
    return (0, $bb8f1682d6c2b24b$export$2e2bcd8739ae039)(array, function(value) {
        return !(0, $5fd90187c68c82a0$export$2e2bcd8739ae039)(rest, value);
    });
});


var // Return a version of the array that does not contain the specified value(s).
$eb922730d4b6b4d6$export$2e2bcd8739ae039 = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(array, otherArrays) {
    return (0, $138b0aed4c2ce94b$export$2e2bcd8739ae039)(array, otherArrays);
});






function $d7436468a82837df$export$2e2bcd8739ae039(array, isSorted, iteratee, context) {
    if (!(0, $39a2bcc6b8c47d82$export$2e2bcd8739ae039)(isSorted)) {
        context = iteratee;
        iteratee = isSorted;
        isSorted = false;
    }
    if (iteratee != null) iteratee = (0, $952f039e62fb8329$export$2e2bcd8739ae039)(iteratee, context);
    var result = [];
    var seen = [];
    for(var i = 0, length = (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(array); i < length; i++){
        var value = array[i], computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted && !iteratee) {
            if (!i || seen !== computed) result.push(value);
            seen = computed;
        } else if (iteratee) {
            if (!(0, $5fd90187c68c82a0$export$2e2bcd8739ae039)(seen, computed)) {
                seen.push(computed);
                result.push(value);
            }
        } else if (!(0, $5fd90187c68c82a0$export$2e2bcd8739ae039)(result, value)) result.push(value);
    }
    return result;
}





var // Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
$6dad4f856cdcdd90$export$2e2bcd8739ae039 = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)(function(arrays) {
    return (0, $d7436468a82837df$export$2e2bcd8739ae039)((0, $ec8350880d87d41e$export$2e2bcd8739ae039)(arrays, true, true));
});




function $cb6a5d1a8af226df$export$2e2bcd8739ae039(array) {
    var result = [];
    var argsLength = arguments.length;
    for(var i = 0, length = (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(array); i < length; i++){
        var item = array[i];
        if ((0, $5fd90187c68c82a0$export$2e2bcd8739ae039)(result, item)) continue;
        var j;
        for(j = 1; j < argsLength; j++){
            if (!(0, $5fd90187c68c82a0$export$2e2bcd8739ae039)(arguments[j], item)) break;
        }
        if (j === argsLength) result.push(item);
    }
    return result;
}






function $e71ea61f95c52201$export$2e2bcd8739ae039(array) {
    var length = array && (0, $f62997178d943b97$export$2e2bcd8739ae039)(array, (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)).length || 0;
    var result = Array(length);
    for(var index = 0; index < length; index++)result[index] = (0, $c85fa29cfa44f8f8$export$2e2bcd8739ae039)(array, index);
    return result;
}




var // Zip together multiple lists into a single array -- elements that share
// an index go together.
$dfa548f76363ccb2$export$2e2bcd8739ae039 = (0, $a761377cb36f4c56$export$2e2bcd8739ae039)((0, $e71ea61f95c52201$export$2e2bcd8739ae039));



function $4bbe000ad09b2c59$export$2e2bcd8739ae039(list, values) {
    var result = {};
    for(var i = 0, length = (0, $21410f8baa7a66c1$export$2e2bcd8739ae039)(list); i < length; i++)if (values) result[list[i]] = values[i];
    else result[list[i][0]] = list[i][1];
    return result;
}


function $b3922e29d5332a5f$export$2e2bcd8739ae039(start, stop, step) {
    if (stop == null) {
        stop = start || 0;
        start = 0;
    }
    if (!step) step = stop < start ? -1 : 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range1 = Array(length);
    for(var idx = 0; idx < length; idx++, start += step)range1[idx] = start;
    return range1;
}



function $5c8803a8aedcfd26$export$2e2bcd8739ae039(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while(i < length)result.push((0, $176574efdb99ceab$export$58adb3bec8346d0f).call(array, i, i += count));
    return result;
}







function $581cd01ee020d27c$export$2e2bcd8739ae039(instance, obj) {
    return instance._chain ? (0, $25414d4304399c8c$export$2e2bcd8739ae039)(obj).chain() : obj;
}


function $ce4d05431cfee095$export$2e2bcd8739ae039(obj) {
    (0, $741e882a16974ae6$export$2e2bcd8739ae039)((0, $e78bbd11b2d1fc01$export$2e2bcd8739ae039)(obj), function(name) {
        var func = (0, $25414d4304399c8c$export$2e2bcd8739ae039)[name] = obj[name];
        (0, $25414d4304399c8c$export$2e2bcd8739ae039).prototype[name] = function() {
            var args = [
                this._wrapped
            ];
            (0, $176574efdb99ceab$export$4cbf152802aa238).apply(args, arguments);
            return (0, $581cd01ee020d27c$export$2e2bcd8739ae039)(this, func.apply((0, $25414d4304399c8c$export$2e2bcd8739ae039), args));
        };
    });
    return 0, $25414d4304399c8c$export$2e2bcd8739ae039;
}






// Add all mutator `Array` functions to the wrapper.
(0, $741e882a16974ae6$export$2e2bcd8739ae039)([
    "pop",
    "push",
    "reverse",
    "shift",
    "sort",
    "splice",
    "unshift"
], function(name) {
    var method = (0, $176574efdb99ceab$export$aabeece9448a227a)[name];
    (0, $25414d4304399c8c$export$2e2bcd8739ae039).prototype[name] = function() {
        var obj = this._wrapped;
        if (obj != null) {
            method.apply(obj, arguments);
            if ((name === "shift" || name === "splice") && obj.length === 0) delete obj[0];
        }
        return (0, $581cd01ee020d27c$export$2e2bcd8739ae039)(this, obj);
    };
});
// Add all accessor `Array` functions to the wrapper.
(0, $741e882a16974ae6$export$2e2bcd8739ae039)([
    "concat",
    "join",
    "slice"
], function(name) {
    var method = (0, $176574efdb99ceab$export$aabeece9448a227a)[name];
    (0, $25414d4304399c8c$export$2e2bcd8739ae039).prototype[name] = function() {
        var obj = this._wrapped;
        if (obj != null) obj = method.apply(obj, arguments);
        return (0, $581cd01ee020d27c$export$2e2bcd8739ae039)(this, obj);
    };
});
var $3e174e13977dbf51$export$2e2bcd8739ae039 = (0, $25414d4304399c8c$export$2e2bcd8739ae039);





// Add all of the Underscore functions to the wrapper object.
var $8d1ccfa682a49800$var$_ = (0, $ce4d05431cfee095$export$2e2bcd8739ae039)($4f339d9ec3d20247$exports);
// Legacy Node.js API.
$8d1ccfa682a49800$var$_._ = $8d1ccfa682a49800$var$_;
var // Export the Underscore API.
$8d1ccfa682a49800$export$2e2bcd8739ae039 = $8d1ccfa682a49800$var$_;





$729a66669f0fddd9$exports = function() {
    return function() {
        this.val2 = function() {
            $context.tmp2 = "tttwefwvds";
            $context.date = (0, (/*@__PURE__*/$parcel$interopDefault($62zqJ))).now();
            $context.qweqwe = (0, $8d1ccfa682a49800$export$2e2bcd8739ae039).pick({
                name: "moe",
                age: 50,
                userid: "moe1"
            }, "name", "age");
            $session["test-key-2"] = "test-value-2";
            console.log("222: " + JSON.stringify($context.session));
            $reactions.answer("test");
            console.log("222: " + JSON.stringify($session));
            console.log("222: " + JSON.stringify($jsapi.context()));
        };
    }();
};


var $ca32401d3d821dea$exports = {};
$ca32401d3d821dea$exports = function() {
    this.ScriptBlock = function($context, $session, $client, $request, $response, $parseTree, $temp) {
        this.script__src_main_sc_5_9 = async function() {
            console.log("\u042D\u0442\u043E \u043B\u043E\u0433 " + JSON.stringify(this, null, 4));
            val2();
            console.log("333: " + JSON.stringify($context));
        };
    };
};


async function $e784b3ca63d982e9$var$myAction(param) {
    $3f52c6ca9c37a8d8$exports();
    $729a66669f0fddd9$exports();
    $ca32401d3d821dea$exports();
    this.$context = param.context;
    this.$session = param.context.session;
    this.$client = param.context.client;
    this.$request = param.context.request;
    this.$response = param.context.response;
    this.$parseTree = param.context.parseTree;
    this.$temp = param.context.temp;
    const script = new ScriptBlock(param.context, param.context.session, param.context.client, param.context.request, param.context.response, param.context.parseTree, param.context.temp);
    await script[param.scriptName]();
    return this.$context;
}
$e784b3ca63d982e9$exports = $e784b3ca63d982e9$var$myAction;


async function $383e46f26d360885$var$kek(param) {
    return $e784b3ca63d982e9$exports(param);
}
$parcel$global.main = $383e46f26d360885$var$kek //const param = {"scriptName":"script__src_main_sc_5_9","context":{"tmp":{"ttt":"www"},"response":{"replies":[]},"session":{}}}
 //myAction(param)
;


//# sourceMappingURL=index.js.map
