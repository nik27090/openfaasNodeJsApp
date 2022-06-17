module.exports = class TimeoutIntervalUtility {
    pattern = "(\\s*(?<h>\\d{0,2})\\s*(hours|hour|h))?" +
    "(\\s*(?<m>\\d{0,2})\\s*(minutes|minute|min|m))?" +
    "(\\s*(?<s>\\d{0,2})\\s*(seconds|second|sec|s))?\\s*";

    parseToSeconds(intervalString) {
        if (intervalString === undefined || intervalString === "") {
            throw Error("Interval string must not be empty or blank!");
        }

        const match = intervalString.match(this.pattern);
        const getGroup = (groupName => parseInt(match.groups[groupName]) || 0);

        const h = getGroup("h");
        const m = getGroup("m");
        const s = getGroup("s");
        const resultInSeconds = 3600 * h + 60 * m + s;
        if (resultInSeconds === 0) {
            throw Error(`Illegal interval string ${intervalString}! Interval must be grater than zero!`)
        }
        return resultInSeconds;
    }
}

