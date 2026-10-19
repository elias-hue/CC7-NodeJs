const router = require('express').Router();
const verifyToken = require('../middlewares/AuthMiddleware');
const controller = require('../controllers/NoteController');

router.get('/', controller.getNotes);
router.post('/', verifyToken, controller.createNote);
router.patch('/:id', verifyToken, controller.updateNote);
router.delete('/:id', verifyToken, controller.deleteNote);

module.exports = router;