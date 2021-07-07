# Pocket Notes

Pocket Notes is an app that lets users store private notes and thoughts - anywhere, anytime. Notes are categorized into custom categories by users, and can be accessed in an easy to use and clean interface.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To get started, clone this repository to your local system.

```
git clone https://github.com/wparks08/pocket-notes.git
```

You must also have the following installed on your system to run the application:
```text
Node
MongoDB
```

### Installing

First, install node packages.

```shell script
npm i
--or--
npm install
```

Then, create a file named `.env` in the root of the project. Supply the following variables:

```
CLIENT_SECRET

MONGODB_URI
MONGODB_USER
MONGODB_PASS
```
- `CLIENT_SECRET` can be any string.
- Variables prefixed with `MONGODB` are your database connection strings. Refer to your Mongo instance/cluster (local, Atlas, etc.) for these variables.

To make sure everything is set up correctly, `npm start` from the root directory. This will launch the Express server and React app concurrently.

If running this from a terminal, press `^c` to stop.

## Deployment

This app is set up to be deployed on Heroku. Using the Heroku CLI, follow these steps to deploy:

```shell script
heroku create
git push heroku master
```

You will then need to set the Heroku config vars to match your `.env` file.

## Built With

* [Node.js](https://nodejs.org/) - JavaScript runtime
* [NPM](https://npmjs.com) - Dependency Management
* [React](https://reactjs.org) - Front end library
* [Material UI](https://material-ui.com) - Material Design UI Framework for React
* [MongoDB](https://mongodb.com) - NoSQL Database
* [Express](https://expressjs.com) - Web framework for Node.js
* [Redux](https://redux.js.org) - State management
* [Passport](https://passportjs.org) - Authentication middleware for Node.js 

## Authors

* **Will Parks** - *Front End Design & Back End* - [wparks08](https://github.com/wparks08)
* **Dean McCluskey** - *Database & Controllers, concept* - [deanmccluskey](https://github.com/deanmccluskey)
* **Everardo Gomez Santiago** - *Back End & Authentication* - [Gomez1Ever1](https://github.com/Gomez1Ever1)
* **Geetha Nagarajan** - *Design & Front End* - [GEETHA-21](https://github.com/GEETHA-21)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
