import * as functions from 'firebase-functions';

//@ts-ignore unused parameter
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});