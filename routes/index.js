const
    express = require("express"),
    router  = express.Router();

router.get('/', (req, res, next)=>{
  res.render('pages/home', {title: 'Home'});
});

module.exports = router;
