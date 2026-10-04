/**
 * app.js
 * Điểm vào chính của ứng dụng: khởi tạo giao diện, xử lý nộp bài,
 * kiểm tra thông tin học sinh, và điều phối việc lưu điểm lên Firebase.
 */

// Helper tạo nút quay lại trang chủ
function insertBackButton(returnUrl) {
  const url = returnUrl || 'https://mtsedu.vercel.app';
  const btn = document.createElement('div');
  btn.innerHTML = `
    <a href="${url}" style="
      display: inline-flex;
      align-items: center;
      gap: 8px;
      position: fixed;
      top: 14px;
      left: 14px;
      z-index: 9999;
      background: rgba(0,0,0,0.85);
      color: white;
      text-decoration: none;
      padding: 9px 18px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      backdrop-filter: blur(8px);
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
    " onmouseover="this.style.background='rgba(0,0,0,1)'" onmouseout="this.style.background='rgba(0,0,0,0.85)'">
      ← Trang chủ
    </a>
  `;
  document.body.appendChild(btn);
}

// Helper đọc session MTSedu từ URL params hoặc localStorage
function getMTSeduSession() {
  // 1. Đọc từ URL params (khi mới click từ MTSedu)
  const params = new URLSearchParams(window.location.search);
  const urlUsername = params.get('mtsedu_user');
  const urlName = params.get('mtsedu_name');
  const urlId = params.get('mtsedu_id');
  const returnUrl = params.get('mtsedu_return');

  if (urlUsername) {
    const session = {
      username: urlUsername,
      displayName: urlName || urlUsername,
      id: urlId || ('user_' + urlUsername),
      returnUrl: returnUrl || 'https://mtsedu.vercel.app'
    };
    try { localStorage.setItem('mtsedu_session', JSON.stringify(session)); } catch {}
    return session;
  }

  // 2. Đọc từ localStorage
  try {
    const raw = localStorage.getItem('mtsedu_session');
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
    // Chèn nút quay lại
    insertBackButton(session.returnUrl);
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

  // Fallback: không có session → dùng giá trị mặc định
  const name = "Thí sinh";
  const className = "—";
  const valid = true;

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
  statusEl.textContent = "Đang đồng bộ điểm lên MTSedu...";
  statusEl.className = "save-status saving";

  try {
    const session = getMTSeduSession();
    const userId = session ? session.id : null;

    const record = {
      hoTen: studentInfo.name,
      lop: studentInfo.className,
      diemPhan1: round2(result.p1.score),
      diemPhan2: round2(result.p2.score),
      diemPhan3: round2(result.p3.score),
      tongDiem: round2(result.total),
      maDe: EXAM_META.code,
      userId: userId || "unknown",
      thoiGianNop: new Date().toISOString(),
      serverTimestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    const updates = {};
    const newRef = database.ref(`testResults/${EXAM_META.code}`).push();
    const newResultId = newRef.key;

    updates[`testResults/${EXAM_META.code}/${newResultId}`] = record;
    if (userId) {
      updates[`users/${userId}/results/${newResultId}`] = record;
    }

    await database.ref().update(updates);

    statusEl.textContent = "✔ Đã đồng bộ điểm thành công.";
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

// Hàm gọi khi người dùng bấm nút Bắt đầu thi
function startExam() {
  document.getElementById('screen-start').style.display = 'none';
  document.getElementById('exam-form').style.display = 'block';
}

