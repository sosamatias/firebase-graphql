import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {app} from "./graphql/server";

admin.initializeApp();

// HTTP trigger: {URL}/graphql
exports.graphql = functions.https.onRequest(app);
