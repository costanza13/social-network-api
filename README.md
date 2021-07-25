# Social Network Backend/API

A basic backend and API for a social networking application that supports creating accounts, adding friends, and posting thoughts and reactions.  The server uses Express to power the API routes, and MongoDB for the datastore -- to support potentially large sets of unstructured data and flexibility as features are added or modified.

## Features/Funcitonality

The API provides the following endpoints:
### Users
- `[GET] /api/users` - returns a collection of all users, sorted by date added (includes array of thought IDs and array of friend IDs)
- `[GET] /api/users/<userId>` - returns data for the specified user (includes array of thought IDs and array of friend IDs)
- `[POST] /api/users` - creates a new user, given `username` and `email` in the POST request body
- `[PUT] /api/users/<userId>` - updates the specified user, given  `username` and `email` in the PUT request body
- `[DELETE] /api/users/<userId>` - delete the specified user; also delete all of the user's thoughts

### Users/Friends
- `[POST] /api/users/<userId>/friends/<friendId>` - adds the user specified by `friendId` to the friend list of the user specified by `userId`
- `[DELETE] /api/users/<userId>/friends/<friendId>` - removes the user specified by `friendId` from the friend list of the user specified by `userId`

### Thoughts
- `[GET] /api/thoughts` - returns a collection of all thoughts, sorted by date added (includes array of reactions to each thought)
- `[GET] /api/thoughts/<thoughtId>` - returns data for the specified thought (includes array of reactions)
- `[POST] /api/thoughts` - creates a new thought, given `thoughtText`, `username` and `userId` in the POST request body
- `[PUT] /api/thoughts/<thoughtId>` - updates the specified thought, given `thoughtText` in the PUT request body
- `[DELETE] /api/thoughts/<thoughtId>` - deletes the specified thought

### Reactions
- `[POST] /:thoughtId/reactions` - adds a reaction to the specified thought, given `reactionBody` and `username` in the POST request body
- `[DELETE] /:thoughtId/reactions/:reactionId` - deletes the specified reaction from the specified thought

## Installing and Running the Server
- clone the repository at https://github.com/costanza13/social-network-api
- install/setup [MongoDB](https://docs.mongodb.com/manual/installation/)
- run `npm install` from the project root directory
- run `npm start`

## Demo



## Credits
- [Express](https://www.npmjs.com/package/express) - server, routing
- [MongoDb](https://www.mongodb.com/) - datastore
- [Mongoose](https://mongoosejs.com/) - MongoDb object modeling

### GitHub Repo: https://github.com/costanza13/social-network-api
