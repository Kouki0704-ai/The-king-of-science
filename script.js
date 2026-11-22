// =====================================
// SCIENCE MASTER 2.0
// MAIN SYSTEM
// =====================================

const $ = id => document.getElementById(id);

// ---------- 分野データベース ----------

const topics = [
{
  name: "天球・日周運動",
  keywords: ["天球", "日周運動", "自転", "星の日周運動"],
  answer: "地球が西から東へ自転するため、太陽や星は東から西へ動いて見えます。",
  explanation: "地球は約24時間で1回自転します。そのため、天体が1日に1回東から西へ動くように見えます。"
},
{
  name: "季節・年周運動",
  keywords: ["季節", "年周運動", "公転", "黄道"],
  answer: "地球が地軸を傾けたまま太陽の周りを公転することが関係しています。",
  explanation: "地球の公転によって、季節ごとに見える星座や太陽の通り道が変化します。季節の変化には地軸の傾きも関係します。"
},
{
  name: "月の満ち欠け・日食と月食",
  keywords: ["月の満ち欠け", "日食", "月食", "新月", "満月"],
  answer: "月・地球・太陽の位置関係によって、月の明るく見える部分が変化します。",
  explanation: "月は太陽の光を反射しています。日食は月が太陽を隠す現象、月食は地球の影に月が入る現象です。"
},
{
  name: "金星の動きと見え方",
  keywords: ["金星", "明けの明星", "よいの明星", "金星の満ち欠け"],
  answer: "金星は地球より内側を公転する惑星で、見える位置や形が変化します。",
  explanation: "金星は真夜中には見えません。明け方の東の空や、夕方の西の空に見えます。"
},
{
  name: "仕事・仕事率",
  keywords: ["仕事率", "仕事", "ワット", "ジュール"],
  answer: "仕事は力×力の向きに動いた距離、仕事率は仕事÷時間です。",
  explanation: "仕事の単位はJ、仕事率の単位はWです。物体が動かない場合、物理学でいう仕事は0です。"
},
{
  name: "滑車・仕事の原理",
  keywords: ["滑車", "仕事の原理", "定滑車", "動滑車"],
  answer: "道具を使っても、摩擦などを無視すれば仕事の大きさは変わりません。",
  explanation: "動滑車では必要な力が小さくなる代わりに、引く距離が長くなります。"
},
{
  name: "力学的エネルギー",
  keywords: ["力学的エネルギー", "位置エネルギー", "運動エネルギー", "エネルギー保存"],
  answer: "力学的エネルギーは位置エネルギーと運動エネルギーの和です。",
  explanation: "摩擦や空気抵抗がなければ、力学的エネルギーは保存されます。"
},
{
  name: "変換・熱・電力量",
  keywords: ["電力量", "熱量", "電力", "エネルギー変換", "ジュール熱"],
  answer: "電気エネルギーは光・音・熱・運動などに変換できます。",
  explanation: "電力量は電力×時間で求めます。電力の単位はW、電力量の単位はJやkWhです。"
},
{
  name: "発電",
  keywords: ["発電", "火力発電", "水力発電", "風力発電", "原子力発電"],
  answer: "発電は、さまざまなエネルギーを電気エネルギーに変換することです。",
  explanation: "発電方法によって利用するエネルギー源や環境への影響が異なります。"
},
{
  name: "資源・社会",
  keywords: ["資源", "再生可能エネルギー", "省エネルギー", "化石燃料"],
  answer: "資源を有効に利用し、環境への負担を減らすことが大切です。",
  explanation: "太陽光や風力などの再生可能エネルギーと、化石燃料などの特徴を比較しましょう。"
},
{
  name: "放射線",
  keywords: ["放射線", "放射能", "放射性物質", "アルファ線", "ベータ線", "ガンマ線"],
  answer: "放射線には、物質を透過したり、原子や分子を電離させたりする性質があります。",
  explanation: "代表的な放射線にはアルファ線、ベータ線、ガンマ線、X線などがあります。"
},
{
  name: "太陽",
  keywords: ["太陽", "黒点", "太陽の自転", "光球"],
  answer: "太陽は自ら光と熱を出している恒星です。",
  explanation: "太陽の表面に見られる黒点は周囲より温度が低い部分です。黒点の位置の変化から太陽の自転を調べられます。"
},
{
  name: "太陽系・宇宙",
  keywords: ["太陽系", "宇宙", "惑星", "恒星", "銀河"],
  answer: "太陽系は太陽と、その周りを公転する惑星などからできています。",
  explanation: "太陽は恒星です。惑星は恒星の周りを公転し、自ら光を出さず恒星の光を反射して見えます。"
}
];

// ---------- 学習記録 ----------

let studyCount = 0;
let correctCount = 0;

function updateDashboard() {
  $("topicCount").textContent = topics.length;
  $("studyCount").textContent = studyCount;
  $("correctCount").textContent = correctCount;
}

// ---------- 画面切り替え ----------

function openPage(pageName) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.querySelectorAll(".nav-button").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageName
    );
  });

  $(pageName).classList.add("active");
}

document.querySelectorAll(".nav-button").forEach(button => {
  button.addEventListener("click", () => {
    openPage(button.dataset.page);
  });
});

document.querySelectorAll("[data-open]").forEach(button => {
  button.addEventListener("click", () => {
    openPage(button.dataset.open);
  });
});

// ---------- 知識検索 ----------

function searchScience(query) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    $("searchResults").textContent = "検索語を入力してください。";
    return;
  }

  const results = topics.filter(topic => {
    const content = [
      topic.name,
      ...topic.keywords,
      topic.answer,
      topic.explanation
    ].join(" ").toLowerCase();

    return content.includes(normalized) ||
      topic.keywords.some(word => word.includes(normalized));
  });

  studyCount++;
  updateDashboard();

  if (results.length === 0) {
    $("searchResults").textContent =
      "該当する知識が見つかりませんでした。別の言葉でも検索してみてください。";
    return;
  }

  $("searchResults").replaceChildren();

  results.forEach(topic => {
    const card = document.createElement("article");
    card.className = "result-card";

    const heading = document.createElement("h3");
    heading.textContent = topic.name;

    const answer = document.createElement("p");
    answer.textContent = "【要点】" + topic.answer;

    const explanation = document.createElement("p");
    explanation.textContent = "【解説】" + topic.explanation;

    card.append(heading, answer, explanation);
    $("searchResults").append(card);
  });
}

$("searchButton").addEventListener("click", () => {
  searchScience($("searchInput").value);
});

$("searchInput").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    searchScience($("searchInput").value);
  }
});

// ---------- 分野一覧 ----------

function renderTopics() {
  $("topicList").replaceChildren();

  topics.forEach(topic => {
    const button = document.createElement("button");
    button.className = "topic-button";
    button.textContent = topic.name;

    button.addEventListener("click", () => {
      $("searchInput").value = topic.name;
      searchScience(topic.name);
      $("searchResults").scrollIntoView({ behavior: "smooth" });
    });

    $("topicList").append(button);
  });
}

// ---------- 計算エンジン ----------

const calcDefinitions = {
  power: {
    labels: ["仕事（J）", "時間（秒）"],
    formula: "仕事率＝仕事÷時間",
    unit: "W",
    calculate: v => v[0] / v[1]
  },
  work: {
    labels: ["力（N）", "距離（m）"],
    formula: "仕事＝力×距離",
    unit: "J",
    calculate: v => v[0] * v[1]
  },
  energy: {
    labels: ["質量（kg）", "高さ（m）"],
    formula: "位置エネルギー＝質量×9.8×高さ",
    unit: "J",
    calculate: v => v[0] * 9.8 * v[1]
  },
  kinetic: {
    labels: ["質量（kg）", "速さ（m/s）"],
    formula: "運動エネルギー＝1/2×質量×速さ²",
    unit: "J",
    calculate: v => 0.5 * v[0] * v[1] * v[1]
  },
  electricity: {
    labels: ["電力（W）", "時間（秒）"],
    formula: "電力量＝電力×時間",
    unit: "J",
    calculate: v => v[0] * v[1]
  },
  heat: {
    labels: ["電力（W）", "時間（秒）"],
    formula: "発生する熱量＝電力×時間",
    unit: "J",
    calculate: v => v[0] * v[1]
  }
};

function renderCalculator() {
  const type = calcDefinitions[$("calcType").value];
  const area = $("calcInputs");
  area.replaceChildren();

  type.labels.forEach((label, index) => {
    const input = document.createElement("input");
    input.type = "number";
    input.step = "any";
    input.min = "0";
    input.id = "calcValue" + index;
    input.placeholder = label;
    input.setAttribute("aria-label", label);
    area.append(input);
  });

  $("calcResult").textContent = type.formula;
}

$("calcType").addEventListener("change", renderCalculator);

$("calculateButton").addEventListener("click", () => {
  const type = calcDefinitions[$("calcType").value];

  const values = type.labels.map((label, index) => {
    return Number($("calcValue" + index).value);
  });

  const inputs = type.labels.map((label, index) => {
    return $("calcValue" + index).value.trim();
  });

  if (inputs.some(value => value === "") ||
      values.some(value => !Number.isFinite(value) || value < 0)) {
    $("calcResult").textContent =
      "0以上の数値をすべて入力してください。";
    return;
  }

  if ($("calcType").value === "power" && values[1] === 0) {
    $("calcResult").textContent =
      "時間は0より大きい値を入力してください。";
    return;
  }

  const answer = type.calculate(values);

  $("calcResult").textContent =
    type.formula + "\n計算結果：" +
    Number(answer.toFixed(4)) + " " + type.unit;
});

// ---------- 確認テスト ----------

const quizQuestions = [
  {
    question: "太陽や星が東から西へ動いて見える主な理由は？",
    choices: ["地球の自転", "地球の公転", "太陽の自転", "月の公転"],
    correct: 0,
    explanation: "地球が西から東へ自転しているためです。"
  },
  {
    question: "月の満ち欠けに関係するものは？",
    choices: ["月の大きさ", "月と地球と太陽の位置関係", "地球の自転速度", "太陽の大きさ"],
    correct: 1,
    explanation: "太陽に照らされた月の部分の見え方が変わるためです。"
  },
  {
    question: "仕事率を求める公式は？",
    choices: ["力×距離", "仕事÷時間", "質量×速さ", "電力×時間"],
    correct: 1,
    explanation: "仕事率＝仕事÷時間です。"
  },
  {
    question: "仕事の単位は？",
    choices: ["W", "N", "J", "Pa"],
    correct: 2,
    explanation: "仕事の単位はジュール（J）です。"
  },
  {
    question: "動滑車を使うと一般にどうなる？",
    choices: ["力も距離も小さくなる", "力が小さくなり距離は長くなる", "仕事が必ず増える", "質量が小さくなる"],
    correct: 1,
    explanation: "必要な力が小さくなる代わりに、引く距離が長くなります。"
  },
  {
    question: "力学的エネルギーを構成するものは？",
    choices: ["熱と光", "電気と音", "位置と運動", "化学と熱"],
    correct: 2,
    explanation: "位置エネルギーと運動エネルギーの和です。"
  },
  {
    question: "太陽はどの種類の天体？",
    choices: ["惑星", "衛星", "恒星", "彗星"],
    correct: 2,
    explanation: "太陽は自ら光を出す恒星です。"
  },
  {
    question: "電力量を求める式は？",
    choices: ["電力×時間", "電力÷時間", "力×距離", "質量×高さ"],
    correct: 0,
    explanation: "電力量＝電力×時間です。"
  },
  {
    question: "日食で太陽を隠す天体は？",
    choices: ["地球", "月", "火星", "金星"],
    correct: 1,
    explanation: "月が太陽と地球の間に入ることで起こります。"
  },
  {
    question: "太陽の黒点は周囲と比べてどうなっている？",
    choices: ["温度が高い", "温度が低い", "光を完全に吸収する", "動かない"],
    correct: 1,
    explanation: "黒点は周囲より温度が低いため暗く見えます。"
  },
  {
    question: "放射線の例はどれ？",
    choices: ["音波", "アルファ線", "水蒸気", "可視光だけ"],
    correct: 1,
    explanation: "アルファ線は放射線の一種です。"
  },
  {
    question: "地球が太陽の周りを回る運動は？",
    choices: ["自転", "公転", "日周運動", "振動"],
    correct: 1,
    explanation: "地球が太陽の周りを回る運動を公転といいます。"
  },
  {
    question: "太陽系の中心にある恒星は？",
    choices: ["地球", "月", "太陽", "木星"],
    correct: 2,
    explanation: "太陽系の中心には太陽があります。"
  }
];

let quizIndex = -1;
let quizAnswered = false;

function startQuiz() {
  quizIndex = (quizIndex + 1) % quizQuestions.length;
  quizAnswered = false;

  const item = quizQuestions[quizIndex];

  $("quizQuestion").textContent =
    "第" + (quizIndex + 1) + "問：" + item.question;

  $("quizChoices").replaceChildren();
  $("quizFeedback").textContent = "";

  item.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "quiz-choice";
    button.textContent = (index + 1) + "．" + choice;

    button.addEventListener("click", () => {
      if (quizAnswered) return;

      quizAnswered = true;

      if (index === item.correct) {
        correctCount++;
        updateDashboard();
        $("quizFeedback").textContent =
          "正解！ " + item.explanation;
      } else {
        $("quizFeedback").textContent =
          "不正解。正解は「" +
          item.choices[item.correct] +
          "」です。\n" + item.explanation;
      }

      document.querySelectorAll(".quiz-choice").forEach(b => {
        b.disabled = true;
      });
    });

    $("quizChoices").append(button);
  });

  $("nextQuestion").textContent = "次の問題へ";
}

$("nextQuestion").addEventListener("click", startQuiz);

// =====================================
// 
// =====================================
// SCIENCE MASTER AUTO ANALYZER 2.0
// =====================================

function preprocessImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = 2;

      canvas.width = image.width * scale;
      canvas.height = image.height * scale;

      const ctx = canvas.getContext("2d", {
        willReadFrequently: true
      });

      ctx.drawImage(
        image,
        0, 0,
        canvas.width,
        canvas.height
      );

      const data = ctx.getImageData(
        0, 0,
        canvas.width,
        canvas.height
      );

      // 暗い背景・明るい文字を読みやすく変換
      for (let i = 0; i < data.data.length; i += 4) {
        const brightness =
          data.data[i] * 0.299 +
          data.data[i + 1] * 0.587 +
          data.data[i + 2] * 0.114;

        const value = brightness > 115 ? 0 : 255;

        data.data[i] = value;
        data.data[i + 1] = value;
        data.data[i + 2] = value;
      }

      ctx.putImageData(data, 0, 0);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("画像を読み込めませんでした"));
    };

    image.src = url;
  });
}

function normalizeOCR(text) {
  return text
    .replace(/\s+/g, "")
    .replace(/[。、．，・]/g, "")
    .replace(/[？?]/g, "？");
}

function judgeScienceQuestion(text) {
  const t = normalizeOCR(text);

  const rules = [
    {
      keys: ["天頂", "高度"],
      answer: "90°",
      explanation: "天頂は観測者の真上の方向です。地平線から天頂までの高度は90°です。"
    },
    {
      keys: ["地平線", "天頂"],
      answer: "90°",
      explanation: "地平線から天頂までの角度は90°です。"
    },
    {
      keys: ["太陽や星", "東から西"],
      answer: "地球の自転",
      explanation: "地球が西から東へ自転しているため、太陽や星は東から西へ動いて見えます。"
    },
    {
      keys: ["仕事率"],
      answer: "仕事 ÷ 時間",
      explanation: "仕事率は、単位時間あたりにする仕事の量です。"
    },
    {
      keys: ["電力量"],
      answer: "電力 × 時間",
      explanation: "電力量は電力に時間をかけて求めます。"
    },
    {
      keys: ["黒点", "温度"],
      answer: "周囲より温度が低い",
      explanation: "黒点は周囲より温度が低いため暗く見えます。"
    },
    {
      keys: ["動滑車"],
      answer: "必要な力は小さくなり、引く距離は長くなる",
      explanation: "理想的な動滑車では、力が半分になる代わりに引く距離は2倍になります。"
    },
    {
      keys: ["日食", "太陽を隠す"],
      answer: "月",
      explanation: "月が太陽と地球の間に入ることで日食が起こります。"
    },
    {
      keys: ["地球が太陽の周り"],
      answer: "公転",
      explanation: "地球が太陽の周りを回る運動を公転といいます。"
    }
  ];

  const matched = rules.find(rule =>
    rule.keys.every(key => t.includes(normalizeOCR(key)))
  );

  return matched || null;
}

$("analyzeButton").addEventListener("click", async () => {
  const file = $("questionImage").files[0];

  if (!file) {
    $("ocrStatus").textContent = "画像を選択してください。";
    return;
  }

  if (!window.Tesseract) {
    $("ocrStatus").textContent =
      "OCRエンジンを読み込めません。";
    return;
  }

  $("analyzeButton").disabled = true;
  $("ocrStatus").textContent = "画像を読み込んでいます...";
  $("ocrResult").textContent = "";
  $("answerResult").textContent = "解析中...";

  try {
    const canvas = await preprocessImage(file);

    const result = await Tesseract.recognize(
      canvas,
      "jpn",
      {
        logger: message => {
          if (message.status === "recognizing text") {
            $("ocrStatus").textContent =
              "文字認識中：" +
              Math.round(message.progress * 100) + "%";
          }
        }
      }
    );

    const rawText = result.data.text || "";

    const lines = rawText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length >= 2);

    $("ocrResult").textContent =
      lines.join("\n") || "文字を認識できませんでした。";

    if (!rawText.trim()) {
      $("answerResult").textContent =
        "問題文を読み取れませんでした。";
      return;
    }

    const judged = judgeScienceQuestion(rawText);

    if (judged) {
      $("answerResult").textContent =
        "【正解候補】\n" + judged.answer +
        "\n\n【解説】\n" + judged.explanation +
        "\n\n※読み取った文章に基づく判定です。選択肢と照合してください。";
    } else {
      $("answerResult").textContent =
        "【問題を読み取りました】\n" +
        "まだ登録されていない問題です。\n\n" +
        "読み取った文章をもとに、正解ルールを追加していきます。";
    }

    studyCount++;
    updateDashboard();
    $("ocrStatus").textContent = "解析完了！";

  } catch (error) {
    console.error(error);
    $("ocrStatus").textContent =
      "解析エラー：" + error.message;
    $("answerResult").textContent =
      "画像の読み取りに失敗しました。";
  } finally {
    $("analyzeButton").disabled = false;
  }
});
