# Introduction

In this project, we focused on building the ecommerce website that is lightweight and deployable on Glitch. We would target two types of users: Customer, and Admin (Manager).

# Objective

## Key features as promised in the Final Project Description

- Product listing
- Shopping Cart Management
- Order Management
- User Profile Management
- Admin Management - manage user profile - manage product info in stock

## Data C.R.U.D.

- Admin can create, read, update, and delete product information
- Customers can read product information, edit their profile, edit cart, and place orders

# Team members Contributions

| Name           | PittID@pitt.edu | Contributions                                                                                                      |
|----------------|-----------------|--------------------------------------------------------------------------------------------------------------------|
| Jinghong Zhang | jiz329@pitt.edu | Backend ExpressJS API, implemented frontend User Details, admin view                                               |
| Pinhao Wang    | piw17@pitt.edu  | implemented Frontend ReactJS login, register view, user profile management view                                    |
| Luke Cheng     | luc68@pitt.edu  | Frontend architecture, implemented Home page, products, cart, documentation                                        |
| Yang Ma        | yam38@pitt.edu  | Database populate, Backend ExpressJS api, frontend admin view, customer/product listing and editing, documentation |

# Technical Architecture

## Database

- MongoDB Atlas

There's not really much to talk about in this section, besides that MongoDB Atlas is a cloud database service. And its MVC model is handled by the through Mongoose in backend.

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

I won't go too deep into the frontend architecture. But I would mention it's componentized as ["React" intended](https://react.dev/learn/thinking-in-react). We obviously used React `react-router-dom` and `useNavigator` instead of Link/herf for easier routing. And custom React Hooks for cross-page cart management.

For a consist styling, Material UI is fully utilized.

## Deployment

> Glitch Playlist: https://glitch.com/@a-plus-team/infsci-2560-final-project

Although you can find both front and backend under the same GitHub repo, we've deployed them separately into two Glitch projects under the "Playlist" link above. One using a minimalistic Express.js serving the static `build` files from React. And the other one is the actual API backend, which is a more competent Express.js. And later in the [challenges](#configuring-glitch--by-luke) section, you'll see why we've done this.

# Challenges

## Unfamiliarity knowledge base

One of our backend developers is fluent in Django and flask. And given native support for Node.js by Glitch, we decided to be safe and to go with Express.js.

## Configuring Glitch — by Luke

Undoubtedly, Glitch is beginner-friendly. But from another perceptive, it's hidden complexities with undocumented entry points. And I've spent way too many fruitless hours in Glitch trying to build directly from source. Yet, I finally gave up and decided to build local, manually copy, and push the `build` folder to Glitch. Thus, a separation (arguably more professional-looking) backend and frontend deployment.

# Future Work

# Conclusion

# Recourses

Material UI, [Card Listing Simple examples](https://codesandbox.io/p/sandbox/infinite-scroll-react-material-ui-zpuj3?file=%2Fsrc%2Findex.js%3A9%2C12)

MDN [API](https://developer.mozilla.org/en-US/docs/Web/API/)

[React](https://react.dev)
