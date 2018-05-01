const
    express = require("express"),
    router  = express.Router();
    Books   = require("../models").Books;
    Loans   = require("../models").loans;
    Patrons = require("../models").patrons;
    
    loans   = [{book: "Book", patron: "James Dean", loanedOn: "June 5, 2017", returnBy: "June 25, 2017", returnedOn: ""}];
    patrons = [{first_name: "James", last_name: "Dean", address: "123 Court Ave, City, State", email: "example@example.com", libraryId: 123, zip: 12345}];

router.get('/', (req, res, next)=>{
  res.render('pages/home', {title: 'Home'});
});

////////////////////////////////////////////////////////////////////////////////
router.get('/allbooks', (req, res, next)=>{
  Books.findAll().then((books)=>{
    res.render('pages/allbooks', {title: 'All Books', books: books});
  });
});

router.get('/allloans', (req, res, next)=>{
  res.render('pages/allloans', {title: 'All Loans', loans: loans});
});

router.get('/allpatrons', (req, res, next)=>{
  res.render('pages/allpatrons', {title: 'All Patrons', patrons: patrons});
});

///////////////////////////////////////////////////////////////////////////////
router.get('/newbook', (req, res, next)=>{
  res.render('pages/newbook', {title: 'New Book', book: Books.build()});
});

router.get('/newloan', (req, res, next)=>{
  res.render('pages/newloan', {title: 'New Loan', book: Loans.build()});
});

router.get('/newpatron', (req, res, next)=>{
  res.render('pages/newpatron', {title: 'New Patron', book: Patrons.build()});
});

////////////////////////////////////////////////////////////////////////////////
router.post('/newbook', (req, res, next) => {
  Books.create(req.body).then((book)=>{
    res.redirect("/");
  });
});

router.post('/newloan', (req, res, next) => {
  Loans.create(req.body).then((loan)=>{
    res.redirect("/");
  });
});

router.post('/newpatron', (req, res, next) => {
  Patrons.create(req.body).then((patron)=>{
    res.redirect("/");
  });
});





module.exports = router;
