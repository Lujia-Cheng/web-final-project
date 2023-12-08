# web-final-project

## Backend Endpoint
1. Login /login
    - success: user info, json
    - fail: error msg
2. Product /
    - ```GET``` Listing
        - json format
            - Product id
            - #sales
            - #inStock
            - Product Name
            - img
            - ...?
    - ```POST``` Product Creation (Account)
    - ```DELETE``` Product Deletion (Account)
3. Shopping Cart
    - ```POST``` Add to cart
    - ```POST``` Place Order 
        - (Remove from cart, add to Oder History // set order_placed = 1)
        - each product in cart #sales += 1
        - each product in cart #stocks -= 1
4. Order History
    - View List of Receipts

## Frontend Features
1. Login Page(one admin account login) + OAuth Custumer Login
2. Customer View:
    - (Home Page)Product Listing | Shopping Cart
    - Order History List
3. Account View:
    - Account List: User Name, list of transaction
    - Product Update - CRUD