# API Server

**Author**: Brooke Heck

**Version**: 1.0.0

## Overview
This is a server that allows a user to sign up with a username and password, and then uses basic authentication when they sign in. Once signed in, the user is given a json web token so that they can request information from the server without continually logging in. 

## Deployed Server
[https://bh-bearer-auth.herokuapp.com](https://bh-bearer-auth.herokuapp.com/)

### Routes

POST : /signup (body {"username": "user", "password": "pass"})

POST : /signin (basic user:pass)

GET: /users (bearer <jsonwebtoken>)

GET: /secret (bearer <jsonwebtoken>)



## Architecture
This is a backend server for practice implementing basic and bearer authorization. The users are stored in a SQL database with sqlite, but passwords are hashed using bcrypt before being stored. Basic authentication with a username and password is used for sign in, and then the user is given a json web token that are used for future requests. The json web tokens expire after thirty seconds.

## Change Log
09-27-2022 07:25pm - Server creates a user, uses basic authentication for signin, and bearer authorization for get requests