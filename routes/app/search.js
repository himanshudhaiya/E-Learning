const search = require('../../controllers/app/search');
const router = require('express').Router();
const { NotLoggedIn } = require('../../middlewares/Appauth');

router.post('/search', NotLoggedIn, search.search);


module.exports = router;
