const
    express   = require("express"),
    router    = express.Router(),
    Books     = require("../models").Books,
    Loans     = require("../models").loans,
    Patrons   = require("../models").patrons,
    Sequelize = require('sequelize'),
    Op        = Sequelize.Op;

router.get('/', (req, res, next)=>{
  res.render('pages/home', {title: 'Home'});
});

////////////////////////////////////////////////////////////////////////////////
///////////////////////////GET 'ALL' PAGES//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.get('/allbooks', (req, res, next)=>{
  Books.findAll().then((books)=>{
    res.render('pages/allbooks', {title: 'All Books', books: books});
  });
});

router.get('/allloans', (req, res, next)=>{
  Loans.findAll().then((loans)=>{
    Books.findAll().then((books)=>{
      Patrons.findAll().then((patrons)=>{
        res.render('pages/allloans', {title: 'All Loans', loans: loans, books: books, patrons: patrons});
      });
    });
  });
});

router.get('/allpatrons', (req, res, next)=>{
  Patrons.findAll().then((patrons)=>{
    res.render('pages/allpatrons', {title: 'All Patrons', patrons: patrons});
  });
});

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////GET FORMS////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.get('/newbook', (req, res, next)=>{
  res.render('pages/newbook', {title: 'New Book', book: Books.build()});
});

router.get('/newloan', (req, res, next)=>{
  Books.findAll().then((books)=>{
    Patrons.findAll().then((patrons)=> {
      res.render('pages/newloan', {title: 'New Loan', loan: Loans.build(), books: books, patrons: patrons});
    });
  });
});

router.get('/newpatron', (req, res, next)=>{
  res.render('pages/newpatron', {title: 'New Patron', patron: Patrons.build()});
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////POST FORMS/////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.post('/newbook', (req, res, next) => {
  Books.create(req.body).then((book)=>{
    res.redirect('/allbooks');
  });
});

router.post('/newloan', (req, res, next) => {
  Loans.create(req.body).then((loan)=>{
    res.redirect('/allloans');
  });
});

router.post('/newpatron', (req, res, next) => {
  Patrons.create(req.body).then((patron)=>{
    res.redirect('/allpatrons');
  });
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////GET CHECKED OUT/////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

router.get('/checkedBooks', (req, res, next)=>{
  Books.findAll().then((books)=>{
    Loans.findAll({
      where: {
        returned_on: null
      }
    }).then((loans)=>{
      res.render('pages/checkedBooks', {title: 'Checked Out Books', books: books, loans: loans});
    });
  });
});

router.get('/checkedLoans', (req, res, next)=>{
  Books.findAll().then((books)=>{
    Patrons.findAll().then((patrons)=>{
      Loans.findAll({
        where: {
          returned_on: null
        }
      }).then((loans)=>{
        res.render('pages/checkedLoans', {title: 'Checked Out Loans', books: books, loans: loans, patrons: patrons});
      });
    });
  });
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////GET OVERDUE///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.get('/overdueLoans', (req, res, next)=>{
  Books.findAll().then((books)=>{
    Patrons.findAll().then((patrons)=>{
      Loans.findAll({
        where: {
          returned_on: null,
          return_by: {
            [Op.lt]: new Date()
          }
        }
      }).then((loans)=>{
        res.render('pages/overdueLoans', {title: 'Overdue Loans', books: books, loans: loans, patrons: patrons});
      });
    });
  });
});

router.get('/overdueBooks', (req, res, next)=>{
  Books.findAll().then((books)=>{
    Loans.findAll({
      where: {
        returned_on: null,
        return_by: {
          [Op.lt]: new Date()
        }
      }
    }).then((loans)=>{
      res.render('pages/overdueBooks', {title: 'Overdue Books', books: books, loans: loans});
    });
  });
});






module.exports = router;
