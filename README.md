# Backend api 

A React app with Expressjs backend. It provides a Simple interface to do Quick actions like Boot & Cooldown using tado APIs

## Requirements

- Node >= 6.0 and npm

## Installation
- Clone this repo: `git clone [repo]`
- Install dependencies and build Client : `npm run buildClientProd`
- Install server dependencies: `npm run buildServer`
- Start the server: `npm start`

## React APP
- Open browser ==> navigate to http://localhost:3001/

## Express server APIs
Note: express server uses port 3001

### Actions APIs
API | Description  | HTTPS | Link |
|---|---|---|---|
| PUT  to override the automatic behavior with a manual setting (Overlay)| Brands | No |http://localhost:3001/actions/:action_Id - 1 for Boot 2 for Cooldown


## Testing the API
Test your API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)
