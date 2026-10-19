const router = require('express').Router();
const controller = require('../controllers/FilmController');

router.get('/', controller.getFilms);
router.get("/:id/details", controller.getFilmDetails);
router.get("/:id/notes", controller.getNotesByFilm);

module.exports = router;