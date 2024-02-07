# Getting Started with CWC To Do Project

## Create the environment variables

Make a copy of the example.env file.  Update the enviornment variables listed with your database login credentials.
Generate a JWT secret using the script below.  Rename the file to .env.

### node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

## Available Scripts

Navigate into the server directory and run:

### `npm run start:dev`

This launches the API service for the project in development mode.\

Navigate into the client directory and run 

### `npm run start`

This runs the client in development mode, and will launch an instance of the project at http://localhost:3000](http://localhost:3000), in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Test Login / Registration Functionality



You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
