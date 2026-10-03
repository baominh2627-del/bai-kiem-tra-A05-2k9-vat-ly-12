/**
 * firebase-config.js
 * Khởi tạo kết nối Firebase (Realtime Database) dùng để lưu điểm học sinh.
 * Sử dụng MTSedu Firebase Config.
 */

const firebaseConfig = {
  apiKey: "AIzaSyC8AT2g3vS54-Qco3uU36xYsXN04trj0Yw",
  authDomain: "mtsedu-85ea3.firebaseapp.com",
  databaseURL: "https://mtsedu-85ea3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mtsedu-85ea3",
  storageBucket: "mtsedu-85ea3.firebasestorage.app",
  messagingSenderId: "73617729802",
  appId: "1:73617729802:web:e7fa3c3c3b9ded7522f2f3",
  measurementId: "G-JHQC9DSKY5"
};

// Khởi tạo Firebase (dùng SDK compat v8, đã include ở index.html)
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

console.log("[firebase-config] Đã kết nối Firebase MTSedu thành công!");
