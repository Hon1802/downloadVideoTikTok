// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
const config = require('./config');

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Functions
const functions = getFunctions(app);

export { functions };
