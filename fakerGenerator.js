const mongoose = require('mongoose');
const faker = require('faker');
const Product = require('./barf/product.js');

const mongoDB = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"
                 +process.env.HOST+
                 "/"
                 +process.env.DATABASE);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const generateProducts = (num) => {
  const products = [];

  for (let i = 0; i < num; i++) {
    products.push({
      name: faker.commerce.productName(),
      inventory_amount: faker.datatype.number({ min: 0, max: 1000 }),
      single_cost_price: faker.commerce.price(),
      single_selling_price: faker.commerce.price(),
      profit: faker.datatype.number({ min: 0, max: 500 }),
      selling_amount: faker.datatype.number({ min: 0, max: 1000 }),
      kind: faker.commerce.productMaterial(),
      create_at: faker.date.past(),
      salespersons_id: faker.datatype.uuid(),
      image: 'https://picsum.photos/200/300', // Using Lorem Picsum for image URL
      additionalImageUrl: 'https://picsum.photos/200/300' // Using Lorem Picsum for additional image URL
    });
  }

  return products;
};

const insertProductsIntoDB = async (products) => {
  try {
    await Product.insertMany(products);
    console.log('Fake products inserted into database successfully!');
  } catch (error) {
    console.error('Error inserting fake products into database:', error);
  } finally {
    mongoose.connection.close();
  }
};

const run = async () => {
  const products = generateProducts(100);
  await insertProductsIntoDB(products);
};

run();
