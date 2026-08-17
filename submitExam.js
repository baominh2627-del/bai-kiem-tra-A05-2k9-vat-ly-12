const SHEET_ID = "THAY_BẰNG_ID_CỦA_BẠN"; // Lấy từ URL sheet
const SHEET_NAME = "Sheet1";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    sheet.appendRow([
      data.name,
      data.class,
      data.score,
      data.percent,
      data.correct,
      data.wrong,
      data.date,
      data.time,
    ]);

    return ContentService.createTextOutput("Success");
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err);
  }
}
