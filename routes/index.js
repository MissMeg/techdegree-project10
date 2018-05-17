////////////////////////////////////////////////////////////////////////////////
///////////////////////////VARIABLES////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
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

//Date conversion for setting the date input value - has to be a specific format
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

//get the correct date format for one week later
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

////////////////////////////////////////////////////////////////////////////////
///////////////////////////ROUTES///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

router.get('/', (req, res, next)=>{
  res.render('pages/home', {title: 'Home'});
});

////////////////////////////////////////////////////////////////////////////////
///////////////////////////GET 'ALL' PAGES//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//Get all books
router.get('/allbooks', (req, res, next)=>{
  Books.findAll().then((books)=>{
    res.render('pages/allbooks', {title: 'All Books', books: books});
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

//Get all required info for loans page
router.get('/allloans', (req, res, next)=>{
  Loans.findAll().then((loans)=>{
    Books.findAll().then((books)=>{
      Patrons.findAll().then((patrons)=>{
        res.render('pages/allloans', {title: 'All Loans', loans: loans, books: books, patrons: patrons});
      }).catch((err)=> {
        if (err) {
          next(err);
        }
      });
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

//Get all patrons
router.get('/allpatrons', (req, res, next)=>{
  Patrons.findAll().then((patrons)=>{
    res.render('pages/allpatrons', {title: 'All Patrons', patrons: patrons});
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////GET FORMS////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//get the forms and set them up for the database
router.get('/newbook', (req, res, next)=>{
  res.render('pages/newbook', {title: 'New Book', book: Books.build()});
});

router.get('/newloan', (req, res, next)=>{
  Books.findAll().then((books)=>{
    Patrons.findAll().then((patrons)=> {
      res.render('pages/newloan', {title: 'New Loan', loan: Loans.build(), books: books, patrons: patrons, loan_date: dateConversionForInput(), return_date: oneWeekConversionForInput()});
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

router.get('/newpatron', (req, res, next)=>{
  res.render('pages/newpatron', {title: 'New Patron', patron: Patrons.build()});
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////POST FORMS/////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//posting form data to database and redirecting to "all pages"
router.post('/newbook', (req, res, next) => {
  Books.create(req.body).then((book)=>{
    res.redirect('/allbooks');
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

router.post('/newloan', (req, res, next) => {
  Loans.create(req.body).then((loan)=>{
    res.redirect('/allloans');
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

router.post('/newpatron', (req, res, next) => {
  Patrons.create(req.body).then((patron)=>{
    res.redirect('/allpatrons');
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////GET CHECKED OUT/////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//get loans & books that have been checked out (no return date)
router.get('/checkedBooks', (req, res, next)=>{
  Books.findAll().then((books)=>{
    Loans.findAll({
      where: {
        returned_on: null
      }
    }).then((loans)=>{
      res.render('pages/checkedBooks', {title: 'Checked Out Books', books: books, loans: loans});
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
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
      }).catch((err)=> {
        if (err) {
          next(err);
        }
      });
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////GET OVERDUE///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//get overdue books & loans - no return date and the return by date is past
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
      }).catch((err)=> {
        if (err) {
          next(err);
        }
      });
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
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
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////DETAIL PAGES//////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//use the specific ids to print out the correct info for the detail page
router.get('/:id/book', (req, res, next)=>{
  Books.findById(req.params.id).then((book)=>{
    Loans.findAll({
      where: {
        book_id: book.id
      }
    }).then((loans)=>{
      Patrons.findAll().then((patrons)=>{
        res.render('pages/bookDetail', {title: 'Book Detail Page', book: book, loans: loans, patrons: patrons});
      }).catch((err)=> {
        if (err) {
          next(err);
        }
      });
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

//post updates to the specific book in the database
router.post('/:id/updateBook', (req, res, next) => {
  Books.findById(req.params.id).then((book)=>{
    return book.update(req.body).then((book)=>{
      res.redirect('/allbooks');
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

//use the specific ids to print out the correct info for the detail page
router.get('/:id/patron', (req, res, next)=>{
  Patrons.findById(req.params.id).then((patron)=>{
    Loans.findAll({
      where: {
        patron_id: patron.id
      }
    }).then((loans)=>{
      Books.findAll().then((books)=>{
        res.render('pages/patronDetail', {title: 'Patron Detail Page', patron: patron, loans: loans, books: books});
      }).catch((err)=> {
        if (err) {
          next(err);
        }
      });
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});
//post updates to the specific book in the database
router.post('/:id/updatePatron', (req, res, next) => {
  Patrons.findById(req.params.id).then((patron)=>{
    return patron.update(req.body).then((patron)=>{
      res.redirect('/allpatrons');
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Return Book///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//get the return page with the info from the sent id param
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
      }).catch((err)=> {
        if (err) {
          next(err);
        }
      });
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

//post the book return loan update to the database
router.post('/:id/return', (req, res, next) => {
  Loans.findById(req.params.id).then((loan)=>{
    return loan.update(req.body).then((loan)=>{
      res.redirect('/allloans');
    }).catch((err)=> {
      if (err) {
        next(err);
      }
    });
  }).catch((err)=> {
    if (err) {
      next(err);
    }
  });
});

module.exports = router;
