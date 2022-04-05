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
    console.log("SceneLoadingクラスinit:ASSETS", ASSETS);
    
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
