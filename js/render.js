/**
 * render.js
 * Chịu trách nhiệm dựng giao diện (DOM) cho 3 phần của đề thi từ dữ liệu
 * trong questions-data.js. Không chứa logic chấm điểm hay lưu trữ.
 */

const LETTERS = ["A", "B", "C", "D"];

/**
 * Trả về true nếu chuỗi trông giống một đường dẫn file ảnh thật
 * (vd: "img/anh-cau3-phanII.png"), khác với nhãn chữ dùng cho placeholder
 * (vd: "CÂU 3 PHẦN II").
 */
function isImagePath(value) {
  return /\.(png|jpe?g|gif|webp|svg)$/i.test(value || "");
}

/**
 * Dựng HTML cho phần ảnh của một câu hỏi: ảnh thật nếu item.image là
 * đường dẫn file, hoặc khung placeholder nếu chỉ là nhãn chữ.
 */
function buildImageHtml(item) {
  if (!item.image) return "";
  if (isImagePath(item.image)) {
    return `<img src="${item.image}" alt="Hình minh họa" style="width:100%; border-radius:8px; margin:15px 0;">`;
  }
  return `
    <div class="image-placeholder">
      🖼️ [CHỖ TRỐNG ĐỂ CHÈN ẢNH - ${item.image}]<br>
      <small>(Hãy thay thẻ div này bằng: &lt;img src="link_anh.jpg" width="100%"&gt;)</small>
    </div>`;
}

function renderPart1(container) {
  PART1_QUESTIONS.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.id = `p1_q${index}`;

    const optionsHtml = item.a
      .map(
        (opt, i) => `
          <label class="option-label">
            <input type="radio" name="p1_q${index}" value="${i}">
            <span><b>${LETTERS[i]}.</b> ${opt}</span>
          </label>`,
      )
      .join("");

    card.innerHTML = `
      <div class="question-text">Câu ${index + 1}: ${item.q}</div>
      <div class="options-grid">${optionsHtml}</div>
    `;
    container.appendChild(card);
  });
}

function renderPart2(container) {
  PART2_QUESTIONS.forEach((item, qIndex) => {
    const qNum = qIndex + 1;
    const card = document.createElement("div");
    card.className = "card";

    const imageHtml = buildImageHtml(item);

    const rows = item.statements
      .map((text, i) => {
        const letter = LETTERS[i].toLowerCase();
        const name = `p2_q${qNum}_${letter}`;
        return `
          <tr>
            <td>${letter}) ${text}</td>
            <td>
              <div class="tf-radio-group">
                <label><input type="radio" name="${name}" value="true"> Đ</label>
                <label><input type="radio" name="${name}" value="false"> S</label>
              </div>
            </td>
          </tr>`;
      })
      .join("");

    card.innerHTML = `
      <div class="question-text">${item.stem}</div>
      ${imageHtml}
      <table class="tf-table">
        <tr><th>Phát biểu</th><th style="width:150px">Chọn Đ/S</th></tr>
        ${rows}
      </table>
    `;
    container.appendChild(card);
  });
}

function renderPart3(container) {
  PART3_QUESTIONS.forEach((item, qIndex) => {
    const qNum = qIndex + 1;
    const card = document.createElement("div");
    card.className = "card";

    const imageHtml = buildImageHtml(item);

    card.innerHTML = `
      <div class="question-text">${item.stem}</div>
      ${imageHtml}
      <input type="number" step="any" class="short-answer-input" name="p3_q${qNum}" placeholder="Nhập số...">
    `;
    container.appendChild(card);
  });
}

function renderExam() {
  renderPart1(document.getElementById("part1-container"));
  renderPart2(document.getElementById("part2-container"));
  renderPart3(document.getElementById("part3-container"));

  // Render lại công thức toán học sau khi DOM đã có nội dung
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise();
  }
}
