const mongoose = require("mongoose");

const tempSchema = mongoose.Schema({
  temperatura: { type: String },
  subs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
});

module.exports = mongoose.model("Temp", tempSchema);
