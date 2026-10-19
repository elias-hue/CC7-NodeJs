const router = require('express').Router();
const controller = require('../controllers/ArtisteController');

router.get('/', controller.getArtistes);
router.get('/:id/realisateur', controller.getFilmsRealises);
router.get('/:id/details', controller.getArtisteDetails);


module.exports = router;