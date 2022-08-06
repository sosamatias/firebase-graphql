# firebase-graphql

Template configured with:
- Firebase functions
- Firestore database
- Graphql & Apollo Server
- Context authorization
- Typescript & eslint
- Jest & mock example in auth_service

## CI/CD 
This project is using Github actions:

- Go to github settings -> secrets -> actions 
- Add the secret: FIREBASE_TOKEN


To get the token execute:
```
firebase login:ci
```

## Run in local
```
cd functions && npm start
```

## Execute tests
```
cd functions && npm test
```

## Apollo Studio
https://studio.apollographql.com/sandbox/explorer

## Debug requirements
https://www.java.com/en/download/

## Firebase console
https://console.firebase.google.com/

## Local database
http://localhost:4000/firestore

## Firebase docs
https://firebase.google.com/docs/functions/typescript
