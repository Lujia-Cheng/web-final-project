# Introduction

In this project, we focused on building an e-commerce website that is lightweight and deployable on Glitch. We would target two types of users: Customer, and Admin (Manager).

# Objective

## Key features as promised in the Final Project Description

- Product Listing 
    - Search Product
    - Selected Product Listing
    - All Products Listing
- Shopping Cart Management
    - Consistent shopping cart management page
    - Able to add to shopping cart from product listing page; repeated products are automatically combined together into on entry in cart.
- Order Management
- User Profile Management
- Admin Management
    - manage user profile
    - manage product info in stock
    - Search by Name

## Data C.R.U.D.

- Admin can read and update product/customer information
- Customers can read product information, edit their profile, edit cart, and place orders
- ACID properties are secured and tested

# Team members' Contributions

| Name           | PittID@pitt.edu | Contributions                                                                                                      |
|----------------|-----------------|--------------------------------------------------------------------------------------------------------------------|
| Jinghong Zhang | jiz329@pitt.edu | Backend ExpressJS API, implemented frontend User Details, admin view                                               |
| Pinhao Wang    | piw17@pitt.edu  | Implemented Frontend ReactJS login, register view, user profile management view                                    |
| Luke Cheng     | luc68@pitt.edu  | Frontend architecture, implemented Home page, products, cart, documentation                                        |
| Yang Ma        | yam38@pitt.edu  | Database populate, Backend ExpressJS API, frontend admin view, customer/product listing and editing, documentation |

# Technical Architecture

## Database

- MongoDB Atlas

There's not really much to talk about in this section, besides that MongoDB Atlas is a cloud database service. Its MVC model is handled by the Mongoose in the backend.

## Backend

- Express JS
    - cors
    - mongoose
    - bcrypt
    - validator
    - jsonwebtoken
    - faker package for fake data generation scripts
- Glitch
- Postman

We've attached a Postman Endpoint collection below. And feel free to import to your Postman client and play around

(https://api.postman.com/collections/8126869-deffaefa-ea3e-440e-81a3-2920ac420ebc?access_key=PMAT-01HH0Y46JQ2WBVR0D2EFBB0GAD)
### main API endpoints:
- 
## Frontend

- ReactJS
- Material UI
- Glitch

I won't go too deep into the front-end architecture. But I would mention it's componentized as ["React" intended](https://react.dev/learn/thinking-in-react). We used React `react-router-dom` and `useNavigator` instead of Link/herf for easier routing. And custom React Hooks for cross-page cart management.

For consistent styling, Material UI is fully utilized.

## Deployment

> Glitch Playlist: https://glitch.com/@a-plus-team/infsci-2560-final-project

Although you can find both front and backend under the same GitHub repo, we've deployed them separately into two Glitch projects under the "Playlist" link above. One uses minimalistic Express.js serving the static `build` files from React. And the other one is the actual API backend, which is a more competent Express.js. This is further explained in the later section and [challenges](#configuring-glitch--by-luke) section.

# Challenges
## Close collaboration among various platforms
Given that the final project has to be published on Glitch, the project management needs to be more cautious. We need to make sure not only the front-end and back-end are connected as planned, but also frequently test the code on Glitch to avoid headaches at the last minute when we deploy as a completed project at once.  Front-end and back-end separation are a good approach not only following Restful API guidelines but also easing the effort of maintaining the code. Especially, It eases the package management process and saves tons of time configuring the packages of two systems and combining them. It also makes collaboration easier where team members could have more options to choose from: 1. collaborate over branches on Git, 2. Collaborate on Glitch work on separate files(features) with more frequent communication among team members, 3. Collaborate on Glitch working on the same file (pair programming), close collaboration, and close communication. Due to the development cycle of our project being very short and the code being lightweight, approaches 2 and 3 fit our demand and we used git to keep track of various versions of the finished product. 

Moreover, we ensured the front-end and back-end would match together by writing down vanilla documentation of the API endpoints and how the front-end used it before we started developing.

## Unfamiliarity knowledge base

One of our backend developers is fluent in Django and Flask. And given native support for Node.js by Glitch, we decided to be safe and to go with Express.js.

## Configuring Glitch — by Luke

Undoubtedly, Glitch is beginner-friendly. But from another perspective, it's hidden complexities with undocumented entry points. And I've spent way too many fruitless hours in Glitch trying to build directly from the source. Yet, I finally gave up and decided to build local, manually copy, and push the `build` folder to Glitch. Thus, a separation (arguably more professional-looking) backend and frontend deployment. 

# Future Work
Future work includes algorithms to recommend selected products in the customer view home page, payment verification systems, and better aesthetics. 

# Conclusion
In conclusion, this project successfully achieved the goal of creating a lightweight e-commerce website, deployable on Glitch, catering to both customers and admin users. Through collaborative efforts and overcoming various technical challenges, our team effectively utilized technologies like MongoDB Atlas, Express JS, and ReactJS to build a functional and user-friendly platform. The project not only met the key objectives outlined in our final description but also provided valuable learning experiences in managing front-end and back-end development, particularly in a cloud-based environment. The team's adaptability in navigating unfamiliar tools and commitment to maintaining seamless integration between different components of the project was commendable. Future works include payment and finetuned web interface design with a user-specific product recommendation page.
# Recourses

Material UI, [Card Listing Simple examples](https://codesandbox.io/p/sandbox/infinite-scroll-react-material-ui-zpuj3?file=%2Fsrc%2Findex.js%3A9%2C12)

MDN [API](https://developer.mozilla.org/en-US/docs/Web/API/)

[React](https://react.dev)
