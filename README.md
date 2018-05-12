```
______          _           _     __  _____
| ___ \        (_)         | |   /  ||  _  |
| |_/ / __ ___  _  ___  ___| |_  `| || |/' |
|  __/ '__/ _ \| |/ _ \/ __| __|  | ||  /| |
| |  | | | (_) | |  __/ (__| |_  _| |\ |_/ /
\_|  |_|  \___/| |\___|\___|\__| \___/\___/
              _/ |                          
             |__/                           
-----------------------------------------------------
```
Because of the recent Node update, there have been some issues with sequelize that have not been resolved yet. If you run into troubles after installing (npm install) then do a rebuild (npm rebuild) and that should help. Also, after closing the program, make sure to check your task manager and close any leftover Node tasks that are still running. Otherwise, your port 3000 will still be in use.

## Project by: Megan Roberts
## Tech Dregree Track: Fullstack JavaScript
## Project Title: Build a Library Manager
## Project Requirements:
```
    1) Models: The library.db file should contain 3 tables. Create a Sequelize model for a books table, a patrons table, and a loans table. There are no timestamps.
        a) The books table should have the following columns: id an integer, title a string, author a string, genre a string and first_published an integer.
        b) The patrons table should have the following columns: id an integer, first_name (string), last_name (string), address (string), email (string), library_id (string) and zip_code ( integer).
        c) The loans table should have the following columns: id (integer), book_id (integer), patron_id (integer), loaned_on (date), return_by (date) and returned_on (date).
    2) Home Screen: As a librarian, I should have a home screen so I can access functionality easily with a single click. See home.html for an example. The home screen should include links to all of the following pages:
        a) Books:
            New Book
            List All
            List Overdue
            List Checked Out
        b) Patrons:
            New Patron
            List All
        c) Loans
            New Loan
            List All
            List Overdue
            List Checked Out
    3) Navigation: As a librarian, I should be able to access a main navigation menu from every page of my application.
       The navigation should include links to the Books Listing page (all_books.html), Patrons Listing page (all_patrons.html) and Loans Listing page (all_loans.html) so I can view this information.
       See navigation on all pages for examples.
    4) Books Listing Page: As a librarian, I should be able to filter books by ‘overdue’ and ‘checked out’ status on the Books Listing Page so I can quickly see the state of the library.
       Examples: all_books.html, overdue_books.html and checked_books.html.
    5) Add a New Book: As a librarian, I should be able to add a book to the database so that they can be tracked on the system. Example: new_book.html.
        a) The required fields for user input are:
            title
            author
            genre
        b) Optional fields:
            first_published
        c) The form should check that the information is valid. If the form information is valid, the page should redirect to the Books Listing Page, and the new book should appear in the list with updated information.
    6) Book Detail Page: As a librarian, I should be able to go to a book’s detail page, make edits and view its loan history. Example book_detail.html.
        a)There should be links to:
            return checked out or overdue books.
            each patron in the loan history.
    7) Loan Listing Page: As a librarian, I should be able to filter loans by “All”, “Overdue”, and “Checked Out”, so I can quickly see the state of the loan. Examples all_loans.html, overdue_loans.html and checked_loans.html.
        a) There should be links to:
            return checked out or overdue books.
            each book in the loan history.
            each patron in the loan history.
    8) New Loan Page: As a librarian, I should be able to check out a book so I can lend books to patrons. Example new_loan.html.
       The patron and book fields should be select boxes where you can select the patron_id or book_id.
       The loaned_on field should be auto populated with today’s date. Example: 2016-10-20. The returned by date should also be pre-populated with a date 7 days in the future, for example: 2016-10-27.
        a) The required fields for the New Loan field are:
            book_id
            patron_id
            loaned_on
            return_by
            Not required: returned_on
    9) Return Book Page: As a librarian, I should be able to return a book so we know the current state of a book in our library. Example:return_book.html.
       The only field should be for the returned_on should be pre-populated with today’s date. Example: 2016-10-20.
       returned_on is a required field.
    10) Patron Listing Page: As a librarian, I should be able to list all patrons so I can find and access library-goers easily. Example: all_patrons.html.
        There should be links to each patron detail page.
    11) Patron Detail Page: As a librarian, I should be able to go to a patron's detail page, make edits and view their loan history. Example patron_detail.html.
        a) There should be links to:
            return checked out or overdue books.
            each book in the loan history.
    12) New Patron Page: As a librarian, I should be able to create new library patrons so they can use the facilities. Example: new_patron.html.
        a) The required fields for user input are:
            first_name
            last_name
            address
            email
            library_id
            zip_code
    13) As a librarian, I should be able to be notified if any of the required fields in any given form have any missing data, so that I can correct the information.
        For example, if the first name field is empty on the new patron form and the librarian submits it, the librarian should see: “First Name is required”.
```
## Exceeds Expectations Requirements:
```
    1) Include pagination for the loans and books listing pages.
    2) Include search fields on at least one of the books or patrons listing pages.
        Examples:
            first_name, last_name,library_id, etc for patrons
            title, author, genre, etc for books
        Searching should be case insensitive and be partial matches for strings.
```
## Project Description:
You've been tasked with creating a library management system for a small library. The librarian has been using a simple sqlite database and has been entering data in manually. The librarian wants a more intuitive way to handle the library's books, patrons and loans.

You'll be given static HTML designs, a set of requirements and the existing SQLite database. You'll be required to implement a dynamic website using Express, Pug, and the SQL ORM Sequelize.
