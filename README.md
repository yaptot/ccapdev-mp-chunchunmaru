# Gamerist
Gamerist is a web application that aims to allow a user to organize the list of games that the user has encountered.

## Prerequisites
1. To set up the local web application, make sure the following are installed: 
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/download-center/community)

2. In `cmd.exe` run `mongod.exe` in the background.

## Dependencies
- [express](https://www.npmjs.com/package/express)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [express-session](https://www.npmjs.com/package/express-session)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## Setting up and running locally
1. To run the server, open up the command prompt and navigate through the folder where the files are contained. To install the needed node_modules, use the command `npm i`
2. Set up the Node.js server with `node index.js`
3. Access the application using a web browser through `localhost` at port 3000 and populate the data by appending `/populate` to the URL. (`localhost:3000/populate`)
4. You may now access the index at `localhost:3000`

## User Accounts
The following user accounts are provided for the user:
| username | password |
| --- | --- |
| lolz | cisco |
| yaptot | class |
| voidgenon | cisco |
| perez | abcd12345 |
| taguro | tapusin |

The user account "taguro" is an administrator account.

Additional accounts may be created through registering.

## Authors
- CAI, Terrence Jake S.
- PEREZ, Eugene Guiller B.
- YAP, Rupert Myles B.
