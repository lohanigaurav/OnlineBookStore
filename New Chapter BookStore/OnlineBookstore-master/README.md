# OnlineBookstore
Description
front-end: Reactjs, bootstrap
back-end: Node.js, Express, Restful API, braintree, mongodb, mongoose, jwt(jsonwebtoken)
## Team Information

| Name | Email Address                    |
| --------  | ---------------------- |
| Yezhi Miao |  miao.ye@husky.neu.edu. |
| Gaurav Lohani | lohani.g@husky.neu.edu  |
| Rachit Agrawal | agrawal.rac@husky.neu.edu |
| Sihan Zhao | zhao.sihan@husky.neu.edu |
## Getting Started

### To get the Node server running locally:

* Install MongoDB Community Edition (instructions) and run it by executing mongod
* Sign up for a Braintree account and fill information in .env file
* Clone this repo
* Navigate to server directory
* npm install to install all required dependencies
* Create .env file under server directory, for example:
```
DATABASE=mongodb://localhost/yourDatabaseName
PORT=8000
JWT_SECRET=secret
BRAINTREE_MERCHANT_ID=
BRAINTREE_PUBLIC_KEY=
BRAINTREE_PRIVATE_KEY=
```
* npm start to start the local server

### To get the React server running locally:

* Navigate to client directory
* npm install to install all required dependencies
* npm start to start the local server

## Application Structure


```bash
├── client
│   ├── node_modules 
│   ├── public    
│   ├── src
│   │   ├── app.js
│   │   ├── config/
│   │   ├── routes/
│   │   ├── models/
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
├── server
│   ├── node_modules 
│   ├── .env    
│   ├── .gitignore
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
├── README.md
```
## Functionality Overview


### General functionality:
* Home (New Arrivals, Best Sellers)
* Search for books with filters
* List books with filters
* Books details and related books
* Cart
* Checkout with Braintree
* Order history
* Login / Register with jwt
* Admin add book categories, add books
* Profile (Buyer)


