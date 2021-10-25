const mongoose = require("mongoose");

const pwaTableSchema = mongoose.Schema(
  {
    vlaga: { type: Number },
    tempds: { type: Number },
    tempsht: { type: Number },
    baterija: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PwaTable", pwaTableSchema);
