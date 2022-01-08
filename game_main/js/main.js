// グローバルに展開
phina.globalize();

// 画面・スプライトサイズ
const SCREEN_WIDTH           = 640;
const SCREEN_HEIGHT          = 960;
const BUTTON_SIZE            = 80;
const TITLE_HEIGHT           = 100;
const LABEL_FONT_SIZE        = 30;
const BALL_WIDTH             = 100;
const BALL_HEIGHT            = 100;
const TIMER_WIDTH            = 150;
const TIMER_HEIGHT           = 150;
const START_BUTTON_WIDTH     = 150;
const START_BUTTON_HEIGHT    = 135;

// 各セッティング値
const START_BALLS_NUM = 50;      // 開始時のボール数
const UPDATE_FRAME = 10;

// URL
const HREF = document.getElementById("HTTP_REFERER").innerText;

const date = new Date();
const Y = date.getFullYear();
const M = ("00" + (date.getMonth()+1)).slice(-2);
const D = ("00" + date.getDate()).slice(-2);
const h = ("00" + date.getHours()).slice(-2);
const m = ("00" + date.getMinutes()).slice(-2);
const s = ("00" + date.getSeconds()).slice(-2);
const datestr = "?" + Y + M + D + h + m + s;

// アセット
const ASSETS = {
  // 画像
  image: {
    "mainwindow":      "./images/window.png" + datestr,
    "timer":           "./images/timer.png" + datestr,
    "ball_soccer":     "./images/ball_soccer.png" + datestr,
    "ball_animal":     "./images/ball_animal.png" + datestr,
    "ball_alphabet":   "./images/ball_alphabet.png" + datestr,
    "xbutton":         "./images/xbutton.png" + datestr
  },
  // スプライトシート
  spritesheet: {
    "timer":
    {
      "frame": { "width": 90, "height": 90, "cols": 7, "rows": 2 },
      "animations" : {
        "00": {"frames": [12], "next": "00", "frequency": 1 },
        "05": {"frames": [11], "next": "05", "frequency": 1 },
        "10": {"frames": [10], "next": "10", "frequency": 1 },
        "15": {"frames": [9],  "next": "15", "frequency": 1 },
        "20": {"frames": [8],  "next": "20", "frequency": 1 },
        "25": {"frames": [7],  "next": "25", "frequency": 1 },
        "30": {"frames": [6],  "next": "30", "frequency": 1 },
        "35": {"frames": [5],  "next": "35", "frequency": 1 },
        "40": {"frames": [4],  "next": "40", "frequency": 1 },
        "45": {"frames": [3],  "next": "45", "frequency": 1 },
        "50": {"frames": [2],  "next": "50", "frequency": 1 },
        "55": {"frames": [1],  "next": "55", "frequency": 1 },
        "60": {"frames": [0],  "next": "60", "frequency": 1 }
      }
    },
    "ball_soccer":
    {
      "frame": { "width": 400, "height": 400, "cols": 5, "rows": 4 },
      "animations" : {
        "000": {"frames": [0], "next": "000", "frequency": 1, "name": "あか"    , "color": "red" },
        "001": {"frames": [1], "next": "001", "frequency": 1, "name": "あお"    , "color": "blue" },
        "002": {"frames": [2], "next": "002", "frequency": 1, "name": "きいろ"  , "color": "yellow" },
        "003": {"frames": [3], "next": "003", "frequency": 1, "name": "むらさき", "color": "purple" },
        "004": {"frames": [4], "next": "004", "frequency": 1, "name": "みずいろ", "color": "deepskyblue" },
        "005": {"frames": [5], "next": "005", "frequency": 1, "name": "みどり"  , "color": "green" },
        "006": {"frames": [6], "next": "006", "frequency": 1, "name": "きみどり", "color": "lime" },
        "007": {"frames": [7], "next": "007", "frequency": 1, "name": "くろ"    , "color": "black" },
        "008": {"frames": [8], "next": "008", "frequency": 1, "name": "ピンク"  , "color": "hotpink" },
        "009": {"frames": [9], "next": "009", "frequency": 1, "name": "オレンジ", "color": "orangered" },
      }
    },
    "ball_animal":
    {
      "frame": { "width": 400, "height": 400, "cols": 5, "rows": 5 },
      "animations" : {
        "000": {"frames": [0],  "next": "000", "frequency": 1, "name": "うし"      , "color": "black" },
        "001": {"frames": [1],  "next": "001", "frequency": 1, "name": "ひつじ"    , "color": "black" },
        "002": {"frames": [2],  "next": "002", "frequency": 1, "name": "にわとり"  , "color": "black" },
        "003": {"frames": [3],  "next": "003", "frequency": 1, "name": "いぬ"      , "color": "black" },
        "004": {"frames": [4],  "next": "004", "frequency": 1, "name": "ねこ"      , "color": "black" },
        "005": {"frames": [5],  "next": "005", "frequency": 1, "name": "うさぎ"    , "color": "black" },
        "006": {"frames": [6],  "next": "006", "frequency": 1, "name": "ぶた"      , "color": "black" },
        "007": {"frames": [7],  "next": "007", "frequency": 1, "name": "たぬき"    , "color": "black" },
        "008": {"frames": [8],  "next": "008", "frequency": 1, "name": "ペンギン"  , "color": "black" },
        "009": {"frames": [9],  "next": "009", "frequency": 1, "name": "ねずみ"    , "color": "black" },
        "010": {"frames": [10], "next": "010", "frequency": 1, "name": "コアラ"    , "color": "black" },
        "011": {"frames": [11], "next": "011", "frequency": 1, "name": "さる"      , "color": "black" },
        "012": {"frames": [12], "next": "012", "frequency": 1, "name": "いのしし"  , "color": "black" },
        "013": {"frames": [13], "next": "013", "frequency": 1, "name": "しか"      , "color": "black" },
        "014": {"frames": [14], "next": "014", "frequency": 1, "name": "うま"      , "color": "black" },
        "015": {"frames": [15], "next": "015", "frequency": 1, "name": "パンダ"    , "color": "black" },
        "016": {"frames": [16], "next": "016", "frequency": 1, "name": "ぞう"      , "color": "black" },
        "017": {"frames": [17], "next": "017", "frequency": 1, "name": "とら"      , "color": "black" },
        "018": {"frames": [18], "next": "018", "frequency": 1, "name": "くま"      , "color": "black" },
        "019": {"frames": [19], "next": "019", "frequency": 1, "name": "ライオン"  , "color": "black" },
        "020": {"frames": [20], "next": "020", "frequency": 1, "name": "ハムスター", "color": "black" },
        "021": {"frames": [21], "next": "021", "frequency": 1, "name": "あざらし"  , "color": "black" },
        "022": {"frames": [22], "next": "022", "frequency": 1, "name": "キリン"    , "color": "black" },
        "023": {"frames": [23], "next": "023", "frequency": 1, "name": "カバ"      , "color": "black" },
        "024": {"frames": [24], "next": "024", "frequency": 1, "name": "ゴリラ"    , "color": "black" }
      }
    },
    "ball_alphabet":
    {
      "frame": { "width": 160, "height": 160, "cols": 7, "rows": 4 },
      "animations" : {
        "000": {"frames": [0],  "next": "000", "frequency": 1, "name": "エイ"       , "color": "black" },
        "001": {"frames": [1],  "next": "001", "frequency": 1, "name": "ビー"       , "color": "black" },
        "002": {"frames": [2],  "next": "002", "frequency": 1, "name": "シー"       , "color": "black" },
        "003": {"frames": [3],  "next": "003", "frequency": 1, "name": "ディー"     , "color": "black" },
        "004": {"frames": [4],  "next": "004", "frequency": 1, "name": "イー"       , "color": "black" },
        "005": {"frames": [5],  "next": "005", "frequency": 1, "name": "エフ"       , "color": "black" },
        "006": {"frames": [6],  "next": "006", "frequency": 1, "name": "ジー"       , "color": "black" },
        "007": {"frames": [7],  "next": "007", "frequency": 1, "name": "エイチ"     , "color": "black" },
        "008": {"frames": [8],  "next": "008", "frequency": 1, "name": "アイ"       , "color": "black" },
        "009": {"frames": [9],  "next": "009", "frequency": 1, "name": "ジェイ"     , "color": "black" },
        "010": {"frames": [10], "next": "010", "frequency": 1, "name": "ケイ"       , "color": "black" },
        "011": {"frames": [11], "next": "011", "frequency": 1, "name": "エル"       , "color": "black" },
        "012": {"frames": [12], "next": "012", "frequency": 1, "name": "エム"       , "color": "black" },
        "013": {"frames": [13], "next": "013", "frequency": 1, "name": "エヌ"       , "color": "black" },
        "014": {"frames": [14], "next": "014", "frequency": 1, "name": "オー"       , "color": "black" },
        "015": {"frames": [15], "next": "015", "frequency": 1, "name": "ピー"       , "color": "black" },
        "016": {"frames": [16], "next": "016", "frequency": 1, "name": "キュー"     , "color": "black" },
        "017": {"frames": [17], "next": "017", "frequency": 1, "name": "アール"     , "color": "black" },
        "018": {"frames": [18], "next": "018", "frequency": 1, "name": "エス"       , "color": "black" },
        "019": {"frames": [19], "next": "019", "frequency": 1, "name": "ティー"     , "color": "black" },
        "020": {"frames": [20], "next": "020", "frequency": 1, "name": "ユー"       , "color": "black" },
        "021": {"frames": [21], "next": "021", "frequency": 1, "name": "ヴィー"     , "color": "black" },
        "022": {"frames": [22], "next": "022", "frequency": 1, "name": "ダブリュー" , "color": "black" },
        "023": {"frames": [23], "next": "023", "frequency": 1, "name": "エックス"   , "color": "black" },
        "024": {"frames": [24], "next": "024", "frequency": 1, "name": "ワイ"       , "color": "black" },
        "025": {"frames": [25], "next": "025", "frequency": 1, "name": "ズィー"     , "color": "black" }
      }
    }
  }
};

// 0パディング（NUM=値 LEN=桁数）
function zeroPadding(NUM, LEN) {
	return ( Array(LEN).join("0") + NUM ).slice( -LEN );
};

// 文字列挿入
function strIns(str, idx, val) {
  return str.slice(0, idx) + val + str.slice(idx);
}

/*
 * メイン処理
 */
phina.main(function() {
  console.log("main");
  // アプリケーションを生成
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.replaceScene(SceneSequence());
  app.run();
});

// SceneSequenceクラス
phina.define("SceneSequence", {
  superClass: "phina.game.ManagerScene",

  // 初期化
  init: function() {
    console.log("SceneSequenceクラスinit");
    this.superInit({
      scenes: [
        { label: "Loading", className: "SceneLoading" },
        { label: "Main",    className: "SceneMain" },
        { label: "Exit",    className: "SceneExit" },
      ]
    });
  }
});
  
phina.define("SceneLoading", {
  superClass: "phina.game.LoadingScene",

  init: function(options) {
    console.log("SceneLoadingクラスinit");

    this.superInit({
      // アセット読み込み
      assets: ASSETS,
    });

    this.backgroundColor = "BLACK";

    // view
    var baseLayer = DisplayElement(options).addChildTo(this);

    // ラベル
    var label = Label({
      text: "NOW LOADING...",
    })
    .addChildTo(baseLayer)
    .setPosition(this.width*0.5, this.height*0.5)
    label.tweener.clear()
    .setLoop(1)
    .to({alpha:0}, 500)
    .to({alpha:1}, 500)
    ;
    label.fill = "white";
    label.fontSize = 40;

    this.exit("Main");
  }
});
