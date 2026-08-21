/**
 * questions-data.js
 * Chứa toàn bộ dữ liệu đề thi: câu hỏi Phần I, II, III và đáp án chấm điểm.
 * Tách riêng để dễ chỉnh sửa đề thi mà không đụng đến logic hiển thị/chấm điểm.
 */

// ================= PHẦN I: Trắc nghiệm nhiều phương án =================
const PART1_QUESTIONS = [
  {
    q: "Chất nào sau đây không có cấu trúc tinh thể?",
    a: ["Miếng nhựa thông", "Hạt đường", "Viên kim cương", "Khối thạch anh"],
    ans: 0,
  },
  {
    q: "$J/kg$ là đơn vị của đại lượng nào dưới đây:",
    a: ["Nội năng", "Nhiệt dung riêng", "Nhiệt lượng", "Nhiệt nóng chảy riêng"],
    ans: 3,
  },
  {
    q: "Trong các hiện tượng sau, hiện tượng liên quan đến sự nóng chảy là",
    a: [
      "thả cục nước đá vào cốc nước ấm.",
      "đốt ngọn đèn dầu.",
      "đun nóng một nồi nước.",
      "cho cốc nước vào tủ lạnh.",
    ],
    ans: 0,
  },
  {
    q: "Tình huống nào dưới đây làm biến đổi nội năng của vật do truyền nhiệt?",
    a: [
      "Cọ xát vật vào mặt bàn.",
      "Đặt vật lạnh vào bồn nước ấm.",
      "Nén một lò xo.",
      "Nén khí trong xilanh.",
    ],
    ans: 1,
  },
  {
    q: "Khi làm nóng một vật, nhiệt độ của vật tăng thêm $25^{\\circ}C$. Độ tăng nhiệt độ của vật trong thang Kelvin là",
    a: ["298 K", "25 K", "248 K", "-248 K"],
    ans: 1,
  },
  {
    q: "Mặt trời mọc lên, dưới ánh nắng mặt trời làm cho các hạt sương tan dần. Hiện tượng này thể hiện quá trình chuyển từ thể",
    a: ["rắn sang lỏng.", "hơi sang lỏng.", "lỏng sang rắn.", "lỏng sang hơi."],
    ans: 3,
  },
  {
    q: "Một động cơ nhiệt nhận từ nguồn nóng nhiệt lượng $Q_1$ và thải ra nguồn lạnh nhiệt lượng $Q_2$. Hiệu suất của động cơ được tính bởi công thức",
    a: [
      "$H=\\frac{Q_1}{Q_1+Q_2}.100\\%$",
      "$H=\\frac{Q_2}{Q_1}.100\\%$",
      "$H=\\frac{Q_1-Q_2}{Q_1}.100\\%$",
      "$H=\\frac{Q_1}{Q_2}.100\\%$",
    ],
    ans: 2,
  },
  {
    q: "Một lượng không khí nóng được chứa trong một xilanh cách nhiệt đặt nằm ngang có pit-tông có thể dịch chuyển được. Không khí nóng dãn nở đẩy pit-tông dịch chuyển. Nếu không khí nóng thực hiện một công có độ lớn là 4000 J, thì nội năng của nó biến thiên một lượng bằng",
    a: ["-4000 J.", "4000 J.", "0 J.", "2000 J."],
    ans: 0,
  },
  {
    q: "Nhiệt độ không tuyệt đối (0 K) là nhiệt độ",
    a: [
      "mà tại đó các phân tử có động năng chuyển động nhiệt bằng không.",
      "tương ứng với $273,15^{\\circ}C$ trong thang Celsius.",
      "mà thế năng tương tác giữa các phân tử là cực đại.",
      "mà tại đó các phân tử có động năng chuyển động nhiệt cực đại.",
    ],
    ans: 0,
  },
  {
    q: "Vật rắn tinh thể có đặc tính nào sau đây?",
    a: [
      "Không có cấu trúc tinh thể, có nhiệt độ nóng chảy xác định.",
      "Có cấu trúc tinh thể, có nhiệt độ nóng chảy xác định.",
      "Có cấu trúc tinh thể, không có nhiệt độ nóng chảy xác định.",
      "Không có cấu trúc tinh thể, không có nhiệt độ nóng chảy xác định.",
    ],
    ans: 1,
  },
  {
    q: "Khi hai vật có nhiệt độ bằng nhau tiếp xúc nhau thì:",
    a: [
      "không có sự truyền nhiệt năng giữa chúng.",
      "nhiệt năng được truyền từ vật có nhiệt độ thấp sang vật có nhiệt độ cao.",
      "nhiệt năng được truyền từ vật có nhiệt độ cao sang vật có nhiệt độ thấp.",
      "trạng thái cân bằng nhiệt không xảy ra ở hai vật.",
    ],
    ans: 0,
  },
  {
    q: "Trong quá trình một chất rắn kết tinh nóng chảy thì chất rắn này",
    a: [
      "có nhiệt độ không đổi và nội năng cũng không đổi.",
      "có nhiệt độ thay đổi và nội năng không đổi.",
      "có nhiệt độ không đổi và nội năng tăng lên do nhận nhiệt.",
      "có nhiệt độ thay đổi và nội năng tăng lên do nhận nhiệt.",
    ],
    ans: 2,
  },
  {
    q: "Phát biểu nào sau đây là đúng khi nói về cấu trúc vi mô của chất lỏng?",
    a: [
      "Trong chất lỏng các phân tử rời xa nhau và lực tương tác phân tử rất yếu.",
      "Trong chất lỏng các phân tử chuyển động hỗn loạn về mọi phía chiếm không gian bình chứa.",
      "Trong chất lỏng các phân tử dao động quanh vị trí cân bằng có thể dịch chuyển.",
      "Trong chất lỏng các phân tử sắp xếp có trật tự và dao động quanh vị trí cân bằng xác định.",
    ],
    ans: 2,
  },
  {
    q: "Trường hợp nội năng của vật bị biến đổi không phải do truyền nhiệt là:",
    a: [
      "Gió mùa đông bắc tràn về làm cho không khí lạnh đi.",
      "Cho cơm nóng vào bát thì bát cũng thấy nóng.",
      "Chậu nước để ngoài nắng một lúc nóng lên.",
      "Khi trời lạnh, ta xoa hai bàn tay vào nhau cho ấm lên.",
    ],
    ans: 3,
  },
  {
    q: "Phát biểu nào sau đây là sai?",
    a: [
      "Khi khoảng cách giữa các phân tử tăng lên thì lực đẩy phân tử yếu đi và lực hút phân tử mạnh lên.",
      "Chuyển động của hạt phấn hoa trong chất lỏng được gọi là chuyển động Brown.",
      "Nội năng của một vật là tổng động năng và thế năng của các phân tử trong vật.",
      "Giữa các phân tử có lực hút và lực đẩy.",
    ],
    ans: 0,
  },
  {
    q: "Trong quá trình nén một khối khí, nội năng của khối khí biến thiên một lượng $\\Delta U$. Nội năng này là",
    a: [
      "lượng nhiệt khí nhận vào từ môi trường.",
      "tổng động năng và thế năng tương tác của các phân tử khí.",
      "lượng công mà khí đã thực hiện lên pít-tông.",
      "đại lượng chỉ phụ thuộc duy nhất vào áp suất của khối khí.",
    ],
    ans: 1,
  },
  {
    q: "Quan sát thao tác kẹp nhiệt kế nách cho bệnh nhân sốt, bác sĩ yêu cầu phải giữ nhiệt kế ở nách ít nhất 3-5 phút trước khi đọc kết quả. Mục đích của việc làm này dưới góc độ vật lí là",
    a: [
      "chờ cho thuỷ ngân đông đặc lại.",
      "chờ cho nhiệt lượng tự phát ra từ nhiệt kế truyền hết sang bệnh nhân.",
      "đảm bảo đủ thời gian cho quá trình trao đổi nhiệt đạt trạng thái cân bằng nhiệt.",
      "để cơ thể người bệnh hạ nhiệt xuống đúng $37^{\\circ}C$.",
    ],
    ans: 2,
  },
  {
    q: "Người ta nhúng một khối sắt có khối lượng 1 kg vào trong 1 kg nước cùng ở nhiệt độ phòng rồi cung cấp cho hệ nhiệt lượng 100 J, để cho đến khi sắt và nước cân bằng nhiệt. Cho nhiệt dung riêng của sắt $440 J/(kg.K)$, nước $4180 J/(kg.K)$.",
    a: [
      "Chúng hấp thu cùng một nhiệt lượng.",
      "Sắt hấp thu nhiệt lượng nhiều hơn.",
      "Nước hấp thu nhiệt lượng nhiều hơn.",
      "Chưa đủ thông tin về hai vật nên chưa xác định được.",
    ],
    ans: 2,
  },
];

// ================= PHẦN II: Trắc nghiệm đúng/sai =================
const PART2_QUESTIONS = [
  {
    stem: "Câu 1: Cho hai vật A và B tiếp xúc với nhau, một lúc sau ta thấy nhiệt độ của vật A tăng lên, nhiệt độ vật B giảm xuống (bỏ qua sự trao đổi nhiệt với môi trường bên ngoài).",
    // image: "CÂU 1 PHẦN II",
    statements: [
      "Nhiệt độ ban đầu của vật A cao hơn nhiệt độ ban đầu của vật B",
      "Nhiệt đã được truyền từ vật B sang vật A",
      "Khi xảy ra cân bằng nhiệt, độ tăng nhiệt độ của vật A đúng bằng độ giảm nhiệt độ của vật B",
      "Nhiệt độ cuối cùng vật B đạt được có thể bằng nhiệt độ ban đầu của vật A",
    ],
    ans: ["false", "true", "false", "false"],
  },
  {
    stem: "Câu 2: Nhúng một vật rắn A có nhiệt độ $t_A$ vào một chậu nước ta thấy nhiệt độ của nước trong chậu tăng lên đến một giá trị $t$ dừng lại. Nhấc vật A ra và tiếp tục nhúng vật rắn B có nhiệt độ $t_B$ vào nước thì thấy nhiệt độ của nước trong chậu giảm xuống đến nhiệt độ ban đầu của chậu nước rồi dừng lại (bỏ qua trao đổi nhiệt).",
    statements: [
      "Đã có sự truyền nhiệt từ nước sang vật A",
      "Nhiệt độ của vật A lớn hơn nhiệt độ của vật B",
      "Nhiệt lượng của vật A truyền cho nước bằng nhiệt lượng của nước truyền cho vật B",
      "Trong thí nghiệm trên nội năng vật A giảm, nội năng vật B tăng.",
    ],
    ans: ["false", "true", "true", "true"],
  },
  {
    stem: "Câu 3: ",
    image: "img/anh-cau3-phanII.png",
    statements: [
      "Khoảng thời gian cấp điện $\\Delta t$ càng lớn thì nhiệt lượng do dây sợi đốt tỏa ra càng lớn.",
      "Nhiệt lượng tổng cộng mà nước đá nhận vào trong thời gian cấp điện $\\Delta t$ là $P\\Delta t$.",
      "Nhiệt nóng chảy riêng tính được khác nhau do chưa tính đến phần nhiệt lượng mà nước đá nhận từ môi trường.",
      "Kết quả thí nghiệm đã chứng minh được giả thuyết của nhóm học sinh.",
    ],
    ans: ["true", "false", "true", "false"],
  },
  {
    stem: "Câu 4: ",
    image: "img/anh-cau4-phanII.png",
    statements: [
      "Ở giai đoạn 1, nước đá nóng chảy do nhận nhiệt từ dây sợi đốt.",
      "Ở giai đoạn 2, nhiệt lượng mà nước đá nhận vào lớn hơn $Pt_2$.",
      "Nhiệt nóng chảy riêng của nước đá đo được (gián tiếp) là $\\frac{Pt_1t_2}{m_2t_1 - m_1t_2}$.",
      "Nếu $t_1 = t_2 = t$ thì nhiệt lượng mà nước đá nhận từ môi trường trong mỗi giai đoạn là $\\frac{Pm_1t}{m_2 - m_1}$.",
    ],
    ans: ["false", "true", "true", "false"],
  },
];

// ================= PHẦN III: Trả lời ngắn =================
const PART3_QUESTIONS = [
  {
    stem: "Câu 1: Một mẫu nước đá đang tan có nhiệt độ $0^{\\circ}C$. Nếu nhiệt độ mẫu nước đá này tăng thêm $20^{\\circ}C$ thì độ tăng nhiệt độ tương ứng trong thang Fahrenheit là bao nhiêu $^\\circ F$?",
    ans: "36",
  },
  {
    stem: "Câu 2: Một bình cách nhiệt chứa 1,5 kg nước ở $20^{\\circ}C$. Thả vào bình một cục đồng 0,5 kg đang ở $300^{\\circ}C$. $C_{nuoc} = 4200 J/kgK$, $C_{dong} = 380 J/kgK$. Nhiệt độ cuối cùng của hệ thống là bao nhiêu $^\\circ C$ (làm tròn đến chữ số hàng phần mười)?",
    ans: "28.2",
  },
  {
    stem: "Câu 3: Một ấm điện đun sôi được 1,5 lít nước từ $20^{\\circ}C$ trong 19 phút. Hiệu suất ấm 90%. Khối lượng riêng nước $1000 kg/m^3$, $C = 4200 J/kgK$. Công suất của ấm điện xấp xỉ bao nhiêu W (làm tròn đến hàng đơn vị)?",
    ans: "491",
  },
  {
    stem: "Câu 4: Cho $m$ (g) nước đá ở $-20^{\\circ}C$ vào 50 g nước ở $40^{\\circ}C$. Khi cân bằng nhiệt thì 20 g nước đá vẫn chưa tan. Biết $C_{da} = 2,1 J/(g.K)$, $\\lambda = 336 J/g$, $C_{nuoc} = 4,2 J/(g.K)$. Giá trị của m bằng bao nhiêu gam?",
    ans: "40",
  },
  {
    stem: "Câu 5: ",
    image: "img/anh-cau5-phan3.png",
    ans: "40",
  },
  {
    stem: "Câu 6: ",
    image: "img/anh-cau6-phan3.png",
    ans: "22.5",
  },
];

// Đáp án dùng để chấm điểm (giữ định dạng gốc để grading.js dùng trực tiếp)
const ANSWERS = {
  p1: PART1_QUESTIONS.map((item) => item.ans),
  p2: PART2_QUESTIONS.map((item) => item.ans),
  p3: PART3_QUESTIONS.map((item) => item.ans),
};

const EXAM_META = {
  title: "KỲ THI TỐT NGHIỆP TRUNG HỌC PHỔ THÔNG NĂM 2027",
  subject: "VẬT LÍ",
  duration: "50 phút",
  code: "A05",
};
