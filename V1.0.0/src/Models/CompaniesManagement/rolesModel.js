const mongoose = require("mongoose");
const rolesSchema = mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company_Auth" },
  role_name: { type: String, required: true },
  role_type: { type: String, required: true },
  listing_permissions: {
    search_bar: { type: String },
    status: { type: String },
    listing: { type: String },
    contact: { type: String },
    document: { type: String },
  },
});
module.exports = mongoose.model("Roles", rolesSchema);
