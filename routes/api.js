// Route handlers
const express = require('express');
const router = express.Router()

//import data models
// const Book = require("../barf/book");

const Customers = require("../barf/customers.js");
const Product = require("../barf/product.js");
const Bucket = require("../barf/bucket.js");
const Region = require("../barf/region.js");
const Salespersons = require("../barf/salespersons.js");
const Store = require("../barf/store.js");
const Transactions = require("../barf/transactions.js");



router.get('/reg', (req, res) => {
  res.render('reg'); // reg.ejs
});


router.get('/login', (req, res) => {
  res.render('login'); // reg.ejs
});


router.post('/reg', async (req, res) => {
  try {
    const { name, password, confirm_password, email, address, kind, business_category, annual_income, gender, marriage_status, age, income } = req.body;
    
    if (password !== confirm_password) {
      return res.render('reg', { error: 'Confirm password is wrong' });
    }

    let customerData = { name, password, email, address, kind };

    if (kind === 'business') {
      customerData = { ...customerData, business_category, annual_income };
    } else {
      customerData = { ...customerData, gender, marriage_status, age, income };
    }

    const customer = new Customers(customerData);
    await customer.save();

    res.redirect('/login'); // Redirect to the login page after successful registration
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});



// // RETREIVE all books
// router.get("/", function(req,res){
//   Book.find({}, function (err, book_list){
//     res.json(book_list);
//   });
// });

// // RETRIEVE a specific book
// router.get("/:bookId", function(req, res){
//   Book.findById(req.params.bookId, function(err, book) {
//     res.json(book)
//   });
// });

// //CREATE
// router.post('/', function(req, res){
//   console.log("new book", req.body);
//   let book = new Book(req.body);
//   book.save();
//   res.status(201).send(book);
// });

// //UPDATE
// router.put("/:bookId", function(req, res) {
//   Book.findById(req.params.bookId, function(err, book) {
//     book.title = req.body.title;
//     book.author = req.body.author;
//     book.save();
//     res.json(book);
//   });
// });

// //DELETE
// router.delete("/:bookId", function(req, res){
//   Book.findById(req.params.bookId, function(err, book) {
//     book.remove(function(err){
//         if(err){
//           res.status(500).send(err);
//         }
//         else{
//           res.status(204).send('removed');
//         }
//     });
//   });
// });
module.exports = router;