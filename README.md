# Pluss-Interview-task

You will have to create a ReactJS SPA and a nodejs API that allows the user to shorten urls.

## Features:

- When the user inputs a full URL and clicks on "Shorten URL" the webpage will talk to the API to request the short URL. The full and short URL will be stored in the storage of your choosing. The length of the short URL is of your choosing too.
- When the user clicks on "Refresh list" the page will show the list of all the urls that the user has created.
If the user decides to "Delete" an URL the page will talk to the API to delete the API from its records.

## Recommendations:

- Do not spend too much time making the page look "nice". Use opensource libraries such as https://material-ui.com/ to help you.
- With regards to storing the full and short URL you can just use the memory of the server if it helps, if you want to make it permanent you can use mongodb, postgresql, whatever you decide and helps you

# Make sure the nodejs and react versions are the latest before using it

### Build the frontend and run the application:

- Toggle to /server, run `npm run build:ui`
- Then run `npm start`, the application will be run at localhost:3001
- A deployment to Heroku can be accessed here https://pacific-headland-52179.herokuapp.com/
