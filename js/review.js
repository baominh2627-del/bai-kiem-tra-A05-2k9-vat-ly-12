/**
 * review.js
 * Sau khi chấm điểm (grading.js), module này chịu trách nhiệm hiển thị
 * trực quan đúng/sai lên từng câu và khoá bài làm lại để tránh sửa đáp án
 * sau khi đã xem kết quả. Không tính điểm, không lưu trữ — chỉ vẽ giao diện.
 */

const OPTION_LETTERS = ["A", "B", "C", "D"];

function reviewPart1(detail) {
  detail.forEach((item) => {
    const card = document.getElementById(`p1_q${item.index}`);
    if (!card) return;

    const labels = card.querySelectorAll(".option-label");
    labels.forEach((label, i) => {
      label.classList.remove("is-correct", "is-wrong-selected");
      if (i === item.correctIndex) {
        label.classList.add("is-correct");
      } else if (i === item.selectedIndex) {
        label.classList.add("is-wrong-selected");
      }
    });

    const feedback = document.getElementById(`p1_q${item.index}_feedback`);
    if (!feedback) return;
    if (item.correct) {
      feedback.textContent = "✔ Chính xác";
      feedback.className = "answer-note correct";
    } else {
      const correctLetter = OPTION_LETTERS[item.correctIndex];
      feedback.textContent =
        item.selectedIndex === null
          ? `✘ Bạn chưa chọn đáp án. Đáp án đúng: ${correctLetter}`
          : `✘ Sai. Đáp án đúng: ${correctLetter}`;
      feedback.className = "answer-note wrong";
    }
  });
}

function reviewPart2(detail) {
  detail.forEach((item) => {
    const qNum = item.index + 1;
    item.statements.forEach((stmt) => {
      const feedback = document.getElementById(
        `p2_q${qNum}_${stmt.letter}_feedback`,
      );
      if (!feedback) return;
      if (stmt.correct) {
        feedback.textContent = "✔ Đúng";
        feedback.className = "answer-note correct";
      } else {
        const correctLabel = stmt.correctValue === "true" ? "Đ" : "S";
        feedback.textContent = `✘ Đáp án đúng: ${correctLabel}`;
        feedback.className = "answer-note wrong";
      }
    });
  });
}

function reviewPart3(detail) {
  detail.forEach((item) => {
    const qNum = item.index + 1;
    const input = document.querySelector(`input[name="p3_q${qNum}"]`);
    const feedback = document.getElementById(`p3_q${qNum}_feedback`);

    if (input) {
      input.classList.remove("is-correct-input", "is-wrong-input");
      input.classList.add(item.correct ? "is-correct-input" : "is-wrong-input");
    }
    if (!feedback) return;
    if (item.correct) {
      feedback.textContent = "✔ Chính xác";
      feedback.className = "answer-note correct";
    } else {
      feedback.textContent = `✘ Đáp án đúng: ${item.correctValue}`;
      feedback.className = "answer-note wrong";
    }
  });
}

/**
 * Khoá toàn bộ input trong bài thi để thí sinh không thể sửa đáp án
 * sau khi đã nộp bài và xem kết quả.
 */
function lockExamInputs() {
  document.querySelectorAll("#exam-form input").forEach((input) => {
    input.disabled = true;
  });
}

/**
 * Vẽ toàn bộ phần review (đúng/sai + đáp án đúng) lên giao diện dựa trên
 * kết quả chấm điểm từ gradeExam().
 */
function reviewExam(result) {
  reviewPart1(result.p1.detail);
  reviewPart2(result.p2.detail);
  reviewPart3(result.p3.detail);
  lockExamInputs();
}
