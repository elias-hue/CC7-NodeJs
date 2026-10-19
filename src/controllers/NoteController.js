const NoteFilm = require('../models/NoteFilm');
const AppError = require("../errors/AppError");

exports.getNotes = async (req, res, next) => {
  // #swagger.tags = ["Notes"]
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

    const filter = {};

    const [notes, total] = await Promise.all([
      NoteFilm.find(filter).skip((page - 1) * limit).limit(limit),
      NoteFilm.countDocuments(filter)
    ]);

    res.json({ page, limit, total, notes });
  } catch (err) {
    next(err);
  }
};

exports.createNote = async (req, res, next) => {
  // #swagger.tags = ["Notes"]
  try {
    const note = await NoteFilm.create({
      utilisateur: req.user.id,
      film: req.body.film,
      note: req.body.note
    });
    res.status(201).json(note);
  } catch (err) {
    if (err.code=11000){
      return next(
        new AppError(
          409,
          "NOTE_ALREADY_EXISTS",
          "Tu as déjà noté ce film"
        )
    );
    } else{
      next(err) ;
    }
  }
};

exports.updateNote = async (req, res, next) => {
  // #swagger.tags = ["Notes"]
  try {
    const note = await NoteFilm.findOneAndUpdate(
      { _id: req.params.id, utilisateur: req.user.id },
      { note: req.body.note },
      { new: true, runValidators: true }
    );
    if (!note) throw new AppError(
        404,
        "NOTE_NOT_FOUND",
        "Note introuvable"
      );
    res.json(note);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  // #swagger.tags = ["Notes"]
  try {
    const note = await NoteFilm.findOneAndDelete({
      _id: req.params.id,
      utilisateur: req.user.id
    });
    if (!note) throw new AppError(
        404,
        "NOTE_NOT_FOUND",
        "Note introuvable"
      );
    res.json({ message: 'Note supprimée' });
  } catch (err) {
    next(err);
  }
};