const adminPolicy = require("./adminPolicy");
const userPolicy = require("./userPolicy");
const role = require("../../enum/role");
const opts = {
  [role.ADMIN]: {
    can: adminPolicy,
  },
  [role.USER]: {
    can: userPolicy,
  },
};
module.exports = opts;
