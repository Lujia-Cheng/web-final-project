// server.js
// init project
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Import Mongoose Models
const Product = require("./barf/product.js");
const Customers = require("./barf/customers.js");
const Bucket = require("./barf/bucket.js");
const Transactions = require("./barf/transactions.js");

// Establish a connection with the Mongo Database
// (Ensure that the .env file is set up with USERNAME, PASSWORD, HOST, and DATABASE)
const mongoDB = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"
                 +process.env.HOST+
                 "/"
                 +process.env.DATABASE);
mongoose.connect(mongoDB);


// Login Endpoint
app.post('/login', async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await Customers.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your environment variables
      { expiresIn: '24h' }
    );
    
    // Successful login - return user info and token
    res.status(200).json({
      success: true,
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        kind: user.kind,
        is_admin: user.is_admin
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error: error });
  }
});

// logout
app.post('/logout', (req, res) => {
  // Inform the client to clear the token
  res.json({ success: true, message: "Logged out successfully. Please clear your token." });
});

// register endpoint
app.post('/register', async (req, res) => {
  try {
    // Extract and validate data
    const { name, password, email, address, kind, business_category, annual_income, marriage_status, gender, age, income, is_admin } = req.body;

    // Basic data validation
    if (!email || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password strength (you can adjust the criteria as needed)
    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })) {
      return res.status(400).json({ message: "Password does not meet the strength criteria" });
    }

    // Check if user already exists
    const existingUser = await Customers.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new customer
    const customer = new Customers({
      name,
      password: hashedPassword,
      email,
      address,
      kind,
      business_category,
      annual_income,
      marriage_status,
      gender,
      age,
      income,
      create_at: new Date(),
      is_admin
    });

    await customer.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering account", error: error });
  }
});

// app.post('/is-admin/:id', async (req, res)=>{
//   const userId = req.params.id
//   try {
//    await  Customers.findByid()
//   } catch (error){
//     res.status(500).json({message: "Error finding user"})
//   }
// })

// Product Listing
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Product Creation
app.post('/products', async (req, res) => {
  // Ensure the user is an admin
  // Extract product details from request body
  const productDetails = req.body;
  
  try {
    // Create and save the new product
    const newProduct = new Product(productDetails);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error });
  }
});

// Product Update
app.patch('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;

  try {
    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error });
  }
});

// Product Deletion
app.delete('/products/:id', async (req, res) => {
  // Ensure the user is an admin
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (deletedProduct) {
      res.json({ message: "Product successfully deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error });
  }
});

// Add to Cart
app.post('/cart', async (req, res) => {
  const { product_id, buyer_id, count } = req.body;

  try {
    // Convert count to an integer
    const countToAdd = parseInt(count, 10);

    // Validate countToAdd is a number
    if (isNaN(countToAdd)) {
      return res.status(400).json({ message: "Invalid count value" });
    }

    // Check if the product already exists in the cart for the given buyer
    let cartItem = await Bucket.findOne({ product_id: product_id, buyer_id: buyer_id });

    if (cartItem) {
      // If it exists, increment the count
      cartItem.count += countToAdd;
      await cartItem.save();
    } else {
      // If it doesn't exist, create a new cart item
      cartItem = new Bucket({ product_id, buyer_id, count: countToAdd });
      await cartItem.save();
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error });
  }
});


// clear cart
app.delete('/cart/clear', async (req, res) => {
  const { buyer_id } = req.body;

  try {
    // Delete all items in the cart for the given buyer
    await Bucket.deleteMany({ buyer_id: buyer_id });

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error: error });
  }
});

// delete cart item by ID
app.delete('/cart/item/:id', async (req, res) => {
  const itemId = req.params.id; // Get the item ID from the URL parameter
  const { buyer_id } = req.body; // Assuming buyer_id is sent in the request body

  try {
    // Find the cart item by its ID and buyer_id, then delete it
    const cartItem = await Bucket.findOne({ _id: itemId, buyer_id: buyer_id });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found or does not belong to the buyer" });
    }

    // Delete the found cart item
    await Bucket.findByIdAndDelete(itemId);

    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart item", error: error });
  }
});

// Update Cart Item Count By ID
app.patch('/cart/item/:id', async (req, res) => {
  const itemId = req.params.id; // Get the item ID from the URL parameter
  const { newCount, buyer_id } = req.body; // Assuming the new count and buyer_id are sent in the request body

  try {
    // Find the cart item by ID and buyer_id, then update its count
    const updatedCartItem = await Bucket.findOneAndUpdate(
      { _id: itemId, buyer_id: buyer_id }, 
      { count: newCount }, 
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found or does not belong to the buyer" });
    }

    res.json({ message: "Cart item count updated successfully", item: updatedCartItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error: error });
  }
});

// Place Order
app.post('/cart/order', async (req, res) => {
  const { buyer_id } = req.body;

  try {
    // Retrieve all items in the cart for the buyer
    const cartItems = await Bucket.find({ buyer_id: buyer_id });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "No items in cart" });
    }

    // Start a session for a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Process each item in the cart
      for (const item of cartItems) {
        // Create a transaction record
        const transaction = new Transactions({
          product_id: item.product_id,
          buyer_id: item.buyer_id,
          count: item.count,
          create_at: new Date()
        });
        await transaction.save({ session });

        // Update product inventory and calculate profit
        const product = await Product.findById(item.product_id);
        product.inventory_amount -= item.count;  // Decrease inventory
        product.selling_amount += item.count;   // Increase selling amount
        product.profit += (product.single_selling_price - product.single_cost_price) * item.count;
        await product.save({ session });
      }

      // Clear the cart after processing
      await Bucket.deleteMany({ buyer_id: buyer_id }, { session });

      // Commit the transaction
      await session.commitTransaction();
    } catch (error) {
      // Abort transaction in case of error
      await session.abortTransaction();
      throw error; // Rethrow the error
    } finally {
      session.endSession();
    }

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error });
  }
});

// Get Cart List
app.get('/cart', async (req, res) => {
  const { buyer_id } = req.query;

  try {
    const cartItems = await Bucket.find({ buyer_id: buyer_id }).populate('product_id');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart items", error: error });
  }
});

// Transaction History
app.get('/order-history', async (req, res) => {
  const { buyer_id } = req.query;

  try {
    const transactions = await Transactions.find({ buyer_id: buyer_id }).populate('product_id');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transaction history", error: error });
  }
});

// Handle 404 for undefined routes
app.use(function(request, response) {
  response.status(404).json({ message: "Resource not found" });
});


// Route to get all products
app.get('/admin/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to get all customers
app.get('/admin/customers', async (req, res) => {
    try {
        const customers = await Customers.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//User information
app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const objectId = mongoose.Types.ObjectId(userId);

    const user = await Customers.findOne({ _id: objectId });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).send('Invalid user ID format');
    }
    res.status(500).send('Server error');
  }
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});