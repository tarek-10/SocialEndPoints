const RBAC = require("easy-rbac");
const opts = require("./ploicy");
const rbac = new RBAC(opts);
module.exports = rbac;
