const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteFilmSchema = new Schema({
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  film: {
    type: Schema.Types.ObjectId,
    ref: "Film",
    required: true,
  },
  note: {
    type: Number,
    required: true,
  },
});

noteFilmSchema.index(
  { utilisateur: 1, film: 1 },
  { unique: true }
);

module.exports = mongoose.model("NoteFilm", noteFilmSchema);