module.exports = class StatePath {
    static ROOT = "";
    static CUR = ".";
    static UP = "..";
    #path = null;
    constructor(path) {

        console.log(path);
        this.#path = path;

        console.log(this.#path);
    }
    toString() {
        console.log(this.#path);
        console.log(this.#path.join("/"));
        if (this.#path.length == 1 && this.#path[0] == "") {
            return "/";
        }
        return this.#path.join("/");
    }
    stepUp() {
        return new StatePath(this.#path.slice(0, this.#path.length - 1));
    }
    static root() {
        return new StatePath(StatePath.ROOT);
    }
    static parse(path) {
        if (path == null || path == "/") {
            return StatePath.root();
        }
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
        for (i; i > 0; i--) {
            ret[i] = this.#path.slice(0, i + 1).join("/");
        }
        if (this.#path.length > 1) {
            ret[0] = "/";
        }
        return ret;
    }
    getParent() {
        var ret = this.#path.slice(0, this.#path.length - 1).join("/");
        if (ret == null || ret == "") {
            return "/";
        }
        return ret;
    }
    resolve(subpath) {
        var path = StatePath.parse(subpath);
        if (subpath.startsWith("/")) {
            return path;
        } else {
            var s = new Array();
            s.push(path.#path);
            this.normalize(s);
            return new StatePath(s);
        }
    }
    isOutOfRoot() {
        return (this.#path.length == 0);
    }
    normalize(items) {
        for (let i=0; i < items.length; i++) {
            var item = items[i];
            if (item == StatePath.CUR) {
                items.splice(i--, 1);
            }
            else if (i < 0) {
                break;
            }
            else if (item == StatePath.UP) {
                items.splice(i--, 1);
                if (i < 0) {
                    break;
                }
                items.splice(i--, 1);
            }
        }
    }
}

