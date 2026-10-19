const mongoose = require("mongoose");
const { Schema } = mongoose;

const castingSchema = new Schema(
  {
    artiste: {
      type: Schema.Types.ObjectId,
      ref: "Artiste",
      required: true,
    },
    role: { type: String, required: true },
  }
);

const filmSchema = new Schema({
  titre: { type: String, required: true },
  annee: { type: Number, required: true , 
            validate: { validator: Number.isInteger }},
  genre: { type: String, required: true },
  resume: { type: String, required: true },

  pays: {
    type: Schema.Types.ObjectId,
    ref: "Pays",
    required: true,
  },

  realisateur: {
    type: Schema.Types.ObjectId,
    ref: "Artiste",
    default: null,
  },

  casting: { type: [castingSchema], default: [] },
});

module.exports = mongoose.model("Film", filmSchema);