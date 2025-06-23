// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAuKziL_TlKU0jKOVSdDvw6NDn3Z9Y2AQ4",
    authDomain: "smart-irrigation-iot-26e42.firebaseapp.com",
    databaseURL: "https://smart-irrigation-iot-26e42-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-irrigation-iot-26e42",
    storageBucket: "smart-irrigation-iot-26e42.firebasestorage.app",
    messagingSenderId: "17284732106",
    appId: "1:17284732106:web:b905e73e475be30c8d5033"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app)
