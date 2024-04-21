import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCu6q4snIvMCu02w7QlWUjf0_SAYupkMSE",
  authDomain: "mail-rdx-kit.firebaseapp.com",
  databaseURL: "https://mail-rdx-kit-default-rtdb.firebaseio.com/",
  projectId: "mail-rdx-kit",
  storageBucket: "mail-rdx-kit.appspot.com",
  messagingSenderId: "762772140726",
  appId: "1:762772140726:web:ddac48993bb64073366c17"
};
export const app = initializeApp(firebaseConfig);