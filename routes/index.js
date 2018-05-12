const
    express   = require("express"),
    router    = express.Router(),
    Books     = require("../models").Books,
    Loans     = require("../models").loans,
    Patrons   = require("../models").patrons,
    Sequelize = require('sequelize'),
    Op        = Sequelize.Op;

////////////////////////////////////////////////////////////////////////////////
///////////////////////////FUNCTIONS////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function dateConversionForInput () {
  let today = new Date();
  let year = today.getUTCFullYear();
  let spacer = '-';
  let month = today.getUTCMonth() + 1;
  let day = today.getUTCDate();
  let date = '';
  date += year;
  date += spacer;
  if (month < 10) {
    date += '0';
    date += month;
    date += spacer;
  } else {
    date += month;
    date += spacer;
  }
  if (day < 10) {
    date += '0';
    date += day;
  } else {
    date += day;
  }
  return date;
}

function oneWeekConversionForInput () {
  let today = new Date();
  let weekForward = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() +7);
  let year = weekForward.getUTCFullYear();
  let month = weekForward.getUTCMonth() + 1;
  let day = weekForward.getUTCDate();
  let spacer = '-';
  let date = '';
  date += year;
  date += spacer;
  if (month < 10) {
    date += '0';
    date += month;
    date += spacer;
  } else {
    date += month;
    date += spacer;
  }
  if (day < 10) {
    date += '0';
    date += day;
  } else {
    date += day;
  }
  return date;
}


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
      res.render('pages/newloan', {title: 'New Loan', loan: Loans.build(), books: books, patrons: patrons, loan_date: dateConversionForInput(), return_date: oneWeekConversionForInput()});
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

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////DETAIL PAGES//////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.get('/:id/book', (req, res, next)=>{
  Books.findById(req.params.id).then((book)=>{
    Loans.findAll({
      where: {
        book_id: book.id
      }
    }).then((loans)=>{
      Patrons.findAll().then((patrons)=>{
        res.render('pages/bookDetail', {title: 'Book Detail Page', book: book, loans: loans, patrons: patrons});
      });
    });
  });
});

router.post('/:id/updateBook', (req, res, next) => {
  Books.findById(req.params.id).then((book)=>{
    return book.update(req.body).then((book)=>{
      res.redirect('/allbooks');
    });
  });
});

router.get('/:id/patron', (req, res, next)=>{
  Patrons.findById(req.params.id).then((patron)=>{
    Loans.findAll({
      where: {
        patron_id: patron.id
      }
    }).then((loans)=>{
      Books.findAll().then((books)=>{
        res.render('pages/patronDetail', {title: 'Patron Detail Page', patron: patron, loans: loans, books: books});
      });
    });
  });
});

router.post('/:id/updatePatron', (req, res, next) => {
  Patrons.findById(req.params.id).then((patron)=>{
    return patron.update(req.body).then((patron)=>{
      res.redirect('/allpatrons');
    });
  });
});
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Return Book///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.get('/:id/return', (req, res, next)=>{
  Books.findById(req.params.id).then((book)=>{
    Loans.findAll({
      where: {
        book_id: book.id,
        returned_on: null
      }
    }).then((loans)=>{
      Patrons.findAll({
        where: {
          id: loans[0].patron_id
        }
      }).then((patrons)=>{
        res.render('pages/returnbook', {title: 'Return Book', book: book, loans: loans, patrons: patrons, date: dateConversionForInput()});
      });
    });
  });
});

router.post('/:id/return', (req, res, next) => {
  Loans.findById(req.params.id).then((loan)=>{
    return loan.update(req.body).then((loan)=>{
      res.redirect('/allloans');
    });
  });
});

module.exports = router;
