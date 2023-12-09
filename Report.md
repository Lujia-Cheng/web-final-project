# Introduction

In this project we focused on building the eccommerce website that is lightweight and deployable on Glitch. We would target two type of users: Customer, and Admin(Manager).

# Objective

Key features as promised in Final Project Description are:

- Product listing,
- Shopping Cart Management,
- Order Management
- User Profile Management
- Admin Management - manage user profile - manage product info in stock

# Team members Contributions

| Name           | PittID@Email.edu | Contributions                                                                                   |
| -------------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| Jinghong Zhang | jiz329@pitt.edu  | Backend ExpressJS API, implemented frontend User Details, admin view                            |
| Pinhao Wang    | PIW17@pitt.edu   | implemented Frontend ReactJS login, register view, user profile management view                 |
| Luke Cheng     | luc68@pitt.edu   | ReactJS componentized design & routing, implemented Home page, products, cart                   |
| Yang Ma        | yam38@pitt.edu   | Backend ExpressJS api, frontend admin view, customer/product listing and editing, documentation |

# Technical Architecture

## Database

- MongoDB Atlas

There's not really much to talk about in this section, besides that we're using MongoDB Atlas, which is a cloud database service. And the MVC model is handled by the ExpressJS with Mongoose.

## Backend

- Express JS
  - cors
  - mongoose
  - bcrypt
  - validator
  - jsonwebtoken
- Glitch
- Postman

We've attached Postman Endpoint collection below. And feel free import to your postman clinet and play around

(https://api.postman.com/collections/8126869-deffaefa-ea3e-440e-81a3-2920ac420ebc?access_key=PMAT-01HH0Y46JQ2WBVR0D2EFBB0GAD)

## Frontend

- ReactJS
- Material UI

I won't go too indepth into the frontend, but I'd like to mention it's componentized. Material UI is used for styling, and we've used React Router for routing. And we've used custom React Hooks for cross-page cart managenment. 

# Challenges

## Knowledge base

We're more familar with flask. 

# Future Work

# Conclusion

# Recourses

Material UI, (Card Listing Simple examples)[!https://codesandbox.io/p/sandbox/infinite-scroll-react-material-ui-zpuj3?file=%2Fsrc%2Findex.js%3A9%2C12]
