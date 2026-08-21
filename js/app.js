/**
 * app.js
 * Điểm vào chính của ứng dụng: khởi tạo giao diện, xử lý nộp bài,
 * kiểm tra thông tin học sinh, và điều phối việc lưu điểm lên Firebase.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderExam();

  const submitBtn = document.getElementById("submit-btn");
  submitBtn.addEventListener("click", handleSubmit);
});

/**
 * Kiểm tra & lấy thông tin học sinh. Hiển thị lỗi nếu thiếu.
 * @returns {{name: string, className: string} | null}
 */
function readStudentInfo() {
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
