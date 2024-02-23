# The Authentication App

This application demonstrates the use of jwt token for user authentication and authorization. Currently, the expiration time for jwt token is 30 seconds after which if the user refreshes the page, he/she should be logged out of the app and redirected to the login page. Similarly, if the expiration time hasn't passed, when the user refreshes the page or changes url to go to the login page, it won't be possible unless the user clicks the logout button on the home page.
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
