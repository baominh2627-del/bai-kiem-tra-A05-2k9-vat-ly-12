/**
 * app.js
 * Điểm vào chính của ứng dụng: khởi tạo giao diện, xử lý nộp bài,
 * kiểm tra thông tin học sinh, và điều phối việc lưu điểm lên Firebase.
 */

// Helper đọc session MTSedu
function getMTSeduSession() {
  try {
    const raw = localStorage.getItem('userSession');
    if (!raw) return null;
    const user = JSON.parse(raw);
    return (user && user.username) ? user : null;
  } catch { return null; }
}

document.addEventListener("DOMContentLoaded", () => {
  renderExam();

  // Kiểm tra đăng nhập MTSedu
  const session = getMTSeduSession();
  if (!session) {
    // Hiện yêu cầu đăng nhập thay vì form nhập tay
    const studentSection = document.getElementById("student-info-section");
    if (studentSection) {
      studentSection.innerHTML = `
        <div style="text-align:center;padding:28px;background:#f9f9f9;border-radius:12px;">
          <div style="font-size:44px;margin-bottom:12px;">🔒</div>
          <h2 style="font-size:20px;font-weight:700;margin:0 0 8px;">Vui lòng đăng nhập</h2>
          <p style="color:#666;font-size:14px;margin:0 0 20px;line-height:1.6;">
            Bạn cần đăng nhập vào <strong>MTS Education</strong> để làm bài thi này.
          </p>
          <a href="https://mtsedu.vercel.app/#physics" style="display:inline-block;background:#1a3a6b;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
            Đăng nhập tại MTS Education →
          </a>
          <p style="margin-top:14px;font-size:12px;color:#999;">Tài khoản được cung cấp bởi giáo viên</p>
        </div>
      `;
    }
  } else {
    // Tự điền tên từ session vào input
    const nameInput = document.getElementById("student-name");
    const classInput = document.getElementById("student-class");
    if (nameInput) {
      nameInput.value = session.displayName || session.username;
      nameInput.readOnly = true;
      nameInput.style.background = '#f0f0f0';
    }
    if (classInput) {
      classInput.value = session.username;
      classInput.readOnly = true;
      classInput.style.background = '#f0f0f0';
    }
  }

  const submitBtn = document.getElementById("submit-btn");
  submitBtn.addEventListener("click", handleSubmit);
});

/**
 * Kiểm tra & lấy thông tin học sinh từ session MTSedu hoặc form.
 * @returns {{name: string, className: string} | null}
 */
function readStudentInfo() {
  // Ưu tiên đọc từ session MTSedu
  const session = getMTSeduSession();
  if (session) {
    return {
      name: session.displayName || session.username,
      className: session.username
    };
  }

  // Fallback: đọc từ input nếu không có session
  const nameInput = document.getElementById("student-name");
  const classInput = document.getElementById("student-class");
  const nameError = document.getElementById("student-name-error");
  const classError = document.getElementById("student-class-error");

  const name = nameInput.value.trim();
  const className = classInput.value.trim();

  let valid = true;
  nameError.textContent = "";
  classError.textContent = "";

  if (!name) {
    nameError.textContent = "Vui lòng nhập họ tên.";
    valid = false;
  }
  if (!className) {
    classError.textContent = "Vui lòng nhập lớp.";
    valid = false;
  }

  return valid ? { name, className } : null;
}

async function handleSubmit() {
  const studentInfo = readStudentInfo();
  if (!studentInfo) {
    // Cuộn lên phần thông tin học sinh để thí sinh sửa lỗi
    document
      .getElementById("student-info-section")
      .scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "ĐANG CHẤM BÀI...";

  const result = gradeExam();

  reviewExam(result);
  displayResult(result);
  await saveResultToFirebase(studentInfo, result);

  submitBtn.textContent = "ĐÃ NỘP BÀI";
  // Giữ nút ở trạng thái khoá: bài đã được chấm và khoá lại, không cần nộp thêm lần nữa.
}

function displayResult(result) {
  document.getElementById("final-score").innerText =
    result.total.toFixed(2) + " / 10";
  const breakdown = document.getElementById("score-breakdown");
  if (breakdown) {
    breakdown.innerHTML = `
      <span>Phần I: ${result.p1.score.toFixed(2)} đ</span>
      <span>Phần II: ${result.p2.score.toFixed(2)} đ</span>
      <span>Phần III: ${result.p3.score.toFixed(2)} đ</span>
    `;
  }
  document.getElementById("result-box").style.display = "block";
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

async function saveResultToFirebase(studentInfo, result) {
  const statusEl = document.getElementById("save-status");
  statusEl.textContent = "Đang lưu điểm...";
  statusEl.className = "save-status saving";

  try {
    const record = {
      hoTen: studentInfo.name,
      lop: studentInfo.className,
      diemPhan1: round2(result.p1.score),
      diemPhan2: round2(result.p2.score),
      diemPhan3: round2(result.p3.score),
      tongDiem: round2(result.total),
      maDe: EXAM_META.code,
      thoiGianNop: new Date().toISOString(),
      // Timestamp phía server để sắp xếp chính xác dù đồng hồ máy khách sai lệch
      serverTimestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    // Lưu vào node "ketQua/<maDe>" để dễ lọc theo mã đề
    const newRef = database.ref(`ketQua/${EXAM_META.code}`).push();
    await newRef.set(record);

    statusEl.textContent = "✔ Đã lưu điểm thành công.";
    statusEl.className = "save-status success";
  } catch (err) {
    console.error("[app.js] Lỗi khi lưu điểm lên Firebase:", err);
    statusEl.textContent =
      "✘ Không thể lưu điểm (lỗi kết nối). Vui lòng chụp lại điểm số.";
    statusEl.className = "save-status error";
  }
}

function round2(value) {
  return Math.round(value * 100) / 100;
}
