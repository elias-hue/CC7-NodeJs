const mongoose = require("mongoose");
const { Schema } = mongoose;

const artisteSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  anneeNaissance: { type: Number, required: true, 
                validate: { validator: Number.isInteger }},
});

module.exports = mongoose.model("Artiste", artisteSchema);