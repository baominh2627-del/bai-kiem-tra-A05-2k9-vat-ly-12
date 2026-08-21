/**
 * grading.js
 * Logic chấm điểm thuần tuý: đọc lựa chọn của thí sinh từ DOM, so với ANSWERS
 * (questions-data.js) và trả về điểm chi tiết từng phần + tổng điểm.
 * Chi tiết trả về đủ thông tin (đáp án đã chọn + đáp án đúng) để review.js
 * có thể hiển thị đúng/sai trực quan mà không cần đọc lại DOM lần nữa.
 * Không đụng tới Firebase hay hiệu ứng giao diện.
 */

function gradePart1() {
  let score = 0;
  const detail = [];
  for (let i = 0; i < PART1_QUESTIONS.length; i++) {
    const selected = document.querySelector(`input[name="p1_q${i}"]:checked`);
    const selectedIndex = selected ? parseInt(selected.value, 10) : null;
    const correctIndex = ANSWERS.p1[i];
    const correct = selectedIndex === correctIndex;
    if (correct) score += 0.25;
    detail.push({ index: i, selectedIndex, correctIndex, correct });
  }
  return { score, detail };
}

function gradePart2() {
  let score = 0;
  const detail = [];
  const letters = ["a", "b", "c", "d"];
  for (let q = 1; q <= PART2_QUESTIONS.length; q++) {
    let correctCount = 0;
    const statements = [];
    for (let i = 0; i < 4; i++) {
      const selected = document.querySelector(
        `input[name="p2_q${q}_${letters[i]}"]:checked`,
      );
      const selectedValue = selected ? selected.value : null;
      const correctValue = ANSWERS.p2[q - 1][i];
      const correct = selectedValue === correctValue;
      if (correct) correctCount++;
      statements.push({
        letter: letters[i],
        selectedValue,
        correctValue,
        correct,
      });
    }

    let qScore = 0;
    if (correctCount === 1) qScore = 0.1;
    else if (correctCount === 2) qScore = 0.25;
    else if (correctCount === 3) qScore = 0.5;
    else if (correctCount === 4) qScore = 1.0;

    score += qScore;
    detail.push({ index: q - 1, correctCount, score: qScore, statements });
  }
  return { score, detail };
}

function gradePart3() {
  let score = 0;
  const detail = [];
  for (let i = 1; i <= PART3_QUESTIONS.length; i++) {
    const input = document.querySelector(`input[name="p3_q${i}"]`);
    const value = input ? input.value.trim() : "";
    const correctValue = ANSWERS.p3[i - 1];
    const correct = value !== "" && value === correctValue;
    if (correct) score += 0.25;
    detail.push({ index: i - 1, value, correctValue, correct });
  }
  return { score, detail };
}

/**
 * Chấm toàn bộ bài thi.
 * @returns {{ total: number, p1: object, p2: object, p3: object }}
 */
function gradeExam() {
  const p1 = gradePart1();
  const p2 = gradePart2();
  const p3 = gradePart3();
  const total = p1.score + p2.score + p3.score;
  return { total, p1, p2, p3 };
}
