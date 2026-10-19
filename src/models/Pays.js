const mongoose = require("mongoose");
const { Schema } = mongoose;

const paysSchema = new Schema({
  code: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  langue: { type: String, required: true },
});

module.exports = mongoose.model("Pays", paysSchema);