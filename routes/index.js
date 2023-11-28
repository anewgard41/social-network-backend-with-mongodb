const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// If route is not defined, return 404 error
router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;