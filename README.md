# 2021T2-G45

## 🍏 EATS GOOD
### A **simple** yet _tasty_ recipe website

Eats Good is a recipe website made for users to share their own recipes. Modern cooking websites have clunky and messy interfaces and our goal was to give users an easier time in navigating and looking for the recipes they need. 

### List of Dev-Dependencies
* [**nodemon** 2.0.7](https://www.npmjs.com/package/nodemon) - restarts the web app automatically when changes are detected <br />

### List of Dependencies
* [**bcrypt** 5.0.1](https://www.npmjs.com/package/bcrypt) - used for password hashing/encryption <br />
* [**body-parser** 1.19.0](https://www.npmjs.com/package/body-parser) -  parses contents found in the request object <br />
* [**cookie-parser** 1.4.5](https://www.npmjs.com/package/cookie-parser) - parses cookies found in the request object <br />
* [**dotenv** 8.2.0](https://www.npmjs.com/package/dotenv) - used to import data from the `.env` file<br />
* [**express** 4.17.1](https://www.npmjs.com/package/express) - web application framework used for the project <br />
* [**express-handlebars** 5.3.0](https://www.npmjs.com/package/express-handlebars) - view engine used for the project <br />
* [**express-validator** 2.29.1](https://www.npmjs.com/package/express-validator) - used for validation of fields <br />
* [**jsonwebtoken** 8.5.1](https://www.npmjs.com/package/jsonwebtoken) - creates session tokens for logged-in users <br />
* [**method-override** 3.0.0](https://www.npmjs.com/package/method-override) - allows the use of `PUT` and `DELETE` for data manipulation <br />
* [**mongodb** 3.6.6](https://www.npmjs.com/package/mongodb) - allows connection to a MongoDB database <br />
* [**mongoose** 5.12.5](https://www.npmjs.com/package/mongoose) - object modeling tool used for schemas and asynchronous tasks <br />
* [**morgan** 1.10.1](https://www.npmjs.com/package/morgan) - logs HTTPs requests on console <br />
* [**multer** 1.4.2](https://www.npmjs.com/package/multer) - middleware used for processing file uploads <br />
* [**momentjs** 2.29.1](https://www.npmjs.com/package/moment) - used for the formatting of time and dates <br />


## How to set up the server (through localhost)
1. Clone the repository through the GitHub Desktop App or through downloading the code from the main branch.
2. Install dependencies by running `npm install` on your terminal.
3. Run the program through nodemon using this command on your terminal: `nodemon server`.
4. Access the website through [localhost](https://localhost:3000/).<br/>
        4.1 If you experience an unesecure connection error, try allowing unsecure connection on your browser through this setting:<br/>
        ```
            chrome://flags/#allow-insecure-localhost
        ``` <br />
        4.2 Or, type the localhost route manually and not through the link on this repository.<br/>

## Accessing the website through Heroku<br />
**DISCLAIMER**: _The website runs slower through Heroku, please do not click_
_a button repeatedly as it will spam requests onto the database._
1. Visit the website through [this link](https://ccapdev-2021t2-g45-eats-good.herokuapp.com/).
2. Log-in an account through either of these methods:<br/>
        2.1 Create a account by registering your own and using those credentials to log-in the website.<br/>
        2.2 Or, use the sample credentials listed below to log-in.

## How to Load Sample Data into Database<br/>
1. Open your terminal and change the directory to the data folder.
2. Run the script by running this command on your terminal: `node dataScript.js`
3. Change the directory back to its original location and run the server, the website should display the sample data.

## Sample Account Data
These are the 5 default user accounts for testing, new accounts can be made through the sign-up feature.

email | password | firstName | lastName 
------------ | ------------- | ------------- | -------------
tyrone@gmail.com | gotou | Tyrone | Sta. Maria
gavin@gmail.com | peanuts | Gavin | Dizon
lance@gmail.com | nokma | Lance | Uy
janine@gmail.com | tetris | Janine | Siy
mozart@gmail.com | prodigy | Mozart | Uy
## 
