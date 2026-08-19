/**
 * firebase-config.js
 * Khởi tạo kết nối Firebase (Realtime Database) dùng để lưu điểm học sinh.
 * File này CHỈ chịu trách nhiệm cấu hình/khởi tạo — không chứa logic nghiệp vụ.
 */

const firebaseConfig = {
  apiKey: "AIzaSyBKIwyzW6Yu9HRfslh1qIztql7CqSkFvKo",
  authDomain: "luu-submitexam-a05-vl-12.firebaseapp.com",
  databaseURL:
    "https://luu-submitexam-a05-vl-12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "luu-submitexam-a05-vl-12",
  storageBucket: "luu-submitexam-a05-vl-12.firebasestorage.app",
  messagingSenderId: "499179183740",
  appId: "1:499179183740:web:c85a952b1713277c14b3f9",
  measurementId: "G-32S8C8SYDY",
};

// Khởi tạo Firebase (dùng SDK compat v8, đã include ở index.html)
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

console.log("[firebase-config] Đã kết nối Firebase thành công!");
