quiz-app/
├── index.html # khung trang, load Firebase SDK + các module JS
├── css/
│ └── style.css # toàn bộ style (giữ nguyên giao diện gốc + phần thông tin học sinh)
└── js/
├── questions-data.js # dữ liệu câu hỏi 3 phần + đáp án (chỉ sửa đề ở đây)
├── firebase-config.js # khởi tạo Firebase Realtime Database
├── render.js # dựng DOM câu hỏi từ dữ liệu
├── grading.js # logic chấm điểm thuần (không đụng DOM lưu trữ)
└── app.js # điều phối: validate Tên/Lớp, nộp bài, gọi grading + lưu Firebase
