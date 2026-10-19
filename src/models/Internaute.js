const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  motDePasse: { type: String, required: true , select: false},
  anneeNaissance: { type: Number, required: true , 
            validate: { validator: Number.isInteger }},
});

module.exports = mongoose.model("User", userSchema);