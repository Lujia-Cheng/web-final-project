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
|----------------|------------------|-------------------------------------------------------------------------------------------------|
| Jinghong Zhang | jiz329@pitt.edu  | Backend ExpressJS API, implemented frontend User Details, admin view                            |
| Pinhao Wang    | PIW17@pitt.edu   | implemented Frontend ReactJS login, register view, user profile management view                 |
| Luke Cheng     | luc68@pitt.edu   | Frontend architecture, implemented Home page, products, cart                                    |
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

We've attached a Postman Endpoint collection below. And feel free to import to your Postman client and play around

(https://api.postman.com/collections/8126869-deffaefa-ea3e-440e-81a3-2920ac420ebc?access_key=PMAT-01HH0Y46JQ2WBVR0D2EFBB0GAD)

## Frontend

- ReactJS
- Material UI
- Glitch

I won't go too deep into the frontend architecture. But I would mention it's componentized as ["React" intended](https://react.dev/learn/thinking-in-react). We obviously have used React `react-router-dom` and `useNavigator` instead of Link/herf for routing. And custom React Hooks for cross-page cart management.

To avoid CSS conflicts and for a consist styling, Material UI is fully utilized.

## Deployment

> Stable link https://glitch.com/@a-plus-team/infsci-2560-final-project

Although you'll see all the source code here, but we deployed the website on two separate Glitch projects.
One for frontend, and the other for backend. You'll find them in the above link.

# Challenges

## Different knowledge base

We're more familiar with flask. Yet...

# Future Work

# Conclusion

# Recourses

Material UI, (Card Listing Simple examples)[!https://codesandbox.io/p/sandbox/infinite-scroll-react-material-ui-zpuj3?file=%2Fsrc%2Findex.js%3A9%2C12]

MDN