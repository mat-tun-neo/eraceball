/*
 * メインシーン
 */
phina.define("SceneMain", {
  // 継承
  superClass: "DisplayScene",
  // コンストラクタ
  init: function() {
    console.log("SceneMainクラスinit");
    // 親クラス初期化
    this.superInit();
    // 背景スプライト
    //this.mainwindow = Sprite("mainwindow").addChildTo(this);
    //this.mainwindow.setPosition(this.gridX.center(), this.gridY.center());
    // 共通変数
    this.targetNo;                                           // ターゲットのスプライト番号
    this.leftcnt;                                            // ボール残り数
    this.start_time = Math.floor(Date.now()/1000);           // 開始時刻(sec)
    this.clearflg = false;                                   // クリアフラグ
    // ラベル描画
    this.titleLabel;     // ボール残り数
    this.scoreLabel;     // スコア
    this.timeOut;        // 時間切れ
    this.putTitle();
    this.putScore();
    // ボタン描画
    this.putXButton();
    // Box2d用レイヤー作成
    this.layer = Box2dLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    }).addChildTo(this);
    // スプライト
    this.character = document.getElementById("ball").innerText;
    //console.log("this.character", this.character);
    this.floor;
    this.wall_right;
    this.wall_left;
    this.timer;
    this.targetball;
    // スプライトシート削除（難易度調整）
    this.keys = Object.keys(ASSETS.spritesheet[this.character].animations);
    let delcnt = this.keys.length - document.getElementById("difficulty").innerText;
    //console.log("delcnt", delcnt);
    for (i = 0; i < delcnt; i++) {
      let arrayno = Math.floor(Math.random()*this.keys.length);
      this.keys.splice(arrayno, 1);
    }
    // スプライトグループ
    this.ballSprites = DisplayElement().addChildTo(this);
    this.buttonSprites = DisplayElement().addChildTo(this);
    // 開始時のスプライト描画
    this.drawFloor();
    this.drawWall();
    //console.log("this.targetNo", this.targetNo);
    //console.log("this.keys", this.keys);
    for (i=0; i<START_BALLS_NUM; i++) {
      this.drawBalls();
    }
    this.timercount = 0;
    this.drawTimer(0);
    this.drawTarget();
  },
  // 画面更新
  update: function(app) {
    // プレイヤー更新
    if (app.frame % UPDATE_FRAME == 0 && this.clearflg == false) {
      let now = Math.floor(Date.now()/1000);
      let animation = "000";
      //console.log("now - this.start_time：", now - this.start_time);
      // ゲーム継続
      if (now - this.start_time < 61) {
        // タイマーの描画
        if (this.timercount != now - this.start_time) {
          this.timercount = now - this.start_time;
          this.drawTimer();
        }
        if (this.leftcnt == 0) {
          let score = Number(document.getElementById("score").innerText) + (60 - (now - this.start_time));
          document.getElementById("score").innerText = score;
          this.scoreLabel.text = zeroPadding(score, 3);
          this.clearflg = true;
        }
      } else if (now - this.start_time > 60) {
        this.clearflg = true;
        this.timeOut.text = "じかんぎれ～";
        animation = "001";
      }
      // クリア／ゲームオーバーボタン
      if (this.clearflg) {
        let clearbutton = SpriteButtonClear(
          animation, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2
        ).addChildTo(this.buttonSprites);
        // クリアボタン押下時の処理
        clearbutton.sprite.setInteractive(true);
        clearbutton.sprite.onpointstart = function() {
          console.log("clearbutton.onpointstart");
          clearbutton.removeSprite();
          // 再スタート
          clearbutton.removeSprite();
          this.exit("Main");
        }.bind(this);
      }
    };
  },
  // Xボタン描画
  putXButton: function() {
    console.log("SceneMainクラスputXButton");
    let xbutton = SpriteButtonX(
      "000", SCREEN_WIDTH - BUTTON_SIZE * 3/5, BUTTON_SIZE / 2
    ).addChildTo(this);
    //console.log(this.xbutton.x + "/" + this.xbutton.y);
    // Xボタン押下時の処理
    xbutton.sprite.setInteractive(true);
    xbutton.sprite.onpointstart = function() {
      this.exit("Exit");
    }.bind(this);
  },
  // タイトル描画
  putTitle: function() {
    console.log("SceneMainクラスputTitle");
    // ボール残り数ラベル
    if (this.titleLabel != null) {
      this.titleLabel.remove();
    }
    this.titleLabel = Label({text: ""}).addChildTo(this);
    this.titleLabel.setPosition(SCREEN_WIDTH / 2, LABEL_FONT_SIZE * 3.5);
    this.titleLabel.fontSize = LABEL_FONT_SIZE;
    this.titleLabel.fill = "white";
    this.titleLabel.stroke = "black";
    this.titleLabel.strokeWidth = 2;
    // じかんぎれラベル
    if (this.timeOut != null) {
      this.timeOut.remove();
    }
    this.timeOut = Label({text: ""}).addChildTo(this);
    this.timeOut.setPosition(SCREEN_WIDTH / 2, LABEL_FONT_SIZE * 7.5);
    this.timeOut.fontSize = LABEL_FONT_SIZE * 1.5;
    this.timeOut.fill = "white";
    this.timeOut.stroke = "black";
    this.timeOut.strokeWidth = 5;
  },
  // スコア描画
  putScore: function() {
    console.log("SceneMainクラスputScore");
    // とくてんラベル
    let tokutenLabel = Label({text: "とくてん"}).addChildTo(this);
    tokutenLabel.setPosition(LABEL_FONT_SIZE * 3, LABEL_FONT_SIZE * 2);
    tokutenLabel.fontSize = LABEL_FONT_SIZE * 1;
    tokutenLabel.fill = "white";
    tokutenLabel.stroke = "black";
    tokutenLabel.strokeWidth = 15;
    // スコア数字ラベル
    if (this.scoreLabel != null) {
      this.scoreLabel.remove();
    }
    this.scoreLabel = Label({text: ""}).addChildTo(this);
    this.scoreLabel.setPosition(LABEL_FONT_SIZE * 3, LABEL_FONT_SIZE * 4);
    this.scoreLabel.fontSize = LABEL_FONT_SIZE * 2;
    this.scoreLabel.fill = "white";
    this.scoreLabel.stroke = "black";
    this.scoreLabel.strokeWidth = 15;
    let score = Number(document.getElementById("score").innerText);
    this.scoreLabel.text = zeroPadding(score, 3);
  },
  // 床描画
  drawFloor: function() {
    // 床スプライト
    let floor = RectangleShape({
      width: SCREEN_WIDTH,
      height: 10,
      fill:"white",
    }).addChildTo(this);
    floor.setPosition(this.gridX.center(), this.gridY.span(16));
    // 床スプライトをBox2dレイヤーにアタッチ
    let floor_body = this.layer.createBody({
      type: 'static',
      shape: 'box',
    }).attachTo(floor);
    floor_body.body.SetAngle(Math.degToRad(0));
  },
  // 壁描画
  drawWall: function() {
    // 左右壁スプライト
    let wall_left = RectangleShape({
      width: 10,
      height: SCREEN_HEIGHT,
      fill:"white",
    }).addChildTo(this);
    wall_left.setPosition(0, SCREEN_HEIGHT/2);
    let wall_right = RectangleShape({
      width: 10,
      height: SCREEN_HEIGHT,
      fill:"white",
    }).addChildTo(this);
    wall_right.setPosition(SCREEN_WIDTH, SCREEN_HEIGHT/2);
    // 左壁スプライトをBox2dレイヤーにアタッチ
    let wallleft_body = this.layer.createBody({
      type: 'static', 
      shape: 'box',
    }).attachTo(wall_left);
    wallleft_body.body.SetAngle(Math.degToRad(0));
    // 右壁スプライトをBox2dレイヤーにアタッチ
    let wallright_body = this.layer.createBody({
      type: 'static', 
      shape: 'box',
    }).attachTo(wall_right);
    wallright_body.body.SetAngle(Math.degToRad(0));
  },
  // ボール描画
  drawBalls: function(x=Math.floor(Math.random()*SCREEN_WIDTH), y=Math.floor(Math.random()*SCREEN_HEIGHT)) {
    console.log("SceneMainクラスdrawBalls");
    // ボールスプライト
    let ball = Sprite(this.character).addChildTo(this.ballSprites);
    let size = Math.floor(Math.random()*BALL_WIDTH/2)+50;
    let arrayno = Math.floor(Math.random()*this.keys.length);
    let animations_no = this.keys[arrayno];
    //console.log("arrayno/animations_no", arrayno, animations_no);
    ball.setImage(this.character, size, size);
    ball.anim = FrameAnimation(this.character).attachTo(ball);
    ball.anim.fit = false;
    ball.anim.gotoAndPlay(animations_no);
    ball.setPosition(x, y);
    // ターゲット初期設定
    if (this.targetNo == null) {
      this.targetNo = animations_no;
      //console.log("this.target", this.targetNo);
    }
    // ボールスプライトをBox2dレイヤーにアタッチ
    let ballbody = this.layer.createBody({
      type: 'dynamic', 
      shape: 'circle',
      rotationflg: ROTATION_FLG,
    }).attachTo(ball);
    // ボール押下時の処理
    ball.setInteractive(true);
    ball.onpointstart = function() {
      // ターゲット中のボールのみ対象
      if (this.targetNo == ball.anim.name) {
        ball.remove();
        ballbody.remove();
        this.drawTarget();
      }
    }.bind(this);
  },

  // タイマー描画
  drawTimer: function() {
    //console.log("SceneMainクラスdrawTimer");
    // タイマーサークル
    if (this.circle == null) {
      this.circle = CircleShape().addChildTo(this);
      this.circle.stroke = 'gray';
      this.circle.fill = 'white';
      this.circle.strokeWidth = 10;
      this.circle.x = PADDING*2 + TIMER_CIRCLE/2;
      this.circle.y = PADDING*18 + TIMER_CIRCLE/2;
      this.circle.radius = TIMER_CIRCLE/2;
    }
    if (this.timercircle == null) {
      this.timercircle = PathShape().addChildTo(this);
      this.timercircle.strokeWidth = 15;
    }
    this.timercircle.clear();
    if (this.timercount > 45) { 
      this.timercircle.stroke = 'red';
    } else if (this.timercount > 30) {
      this.timercircle.stroke = 'orange';
    } else if (this.timercount > 15) {
      this.timercircle.stroke = 'yellowgreen';
    } else {
      this.timercircle.stroke = 'green';
    }
    (61-this.timercount).times((i) => {
      let radian = (i*(-1) + 45) * 6 * Math.PI / 180;
      let x = this.circle.x + Math.cos(radian) * TIMER_CIRCLE/2;
      let y = this.circle.y + Math.sin(radian) * TIMER_CIRCLE/2;
      this.timercircle.addPath(x, y);
    });
    // タイマースプライト
    if (this.timer == null) {
      this.timer = Sprite("timer").addChildTo(this);
      this.timer.setImage("timer", TIMER_WIDTH, TIMER_HEIGHT);
      this.timer.anim = FrameAnimation("timer").attachTo(this.timer);
      this.timer.anim.fit = false;
      this.timer.setPosition(this.circle.x, this.circle.y);
    }
    this.timer.anim.gotoAndPlay(zeroPadding(this.timercount, 2));
  },
  // ターゲット描画
  drawTarget: function() {
    console.log("SceneMainクラスdrawTarget");
    // ターゲット選定
    this.leftcnt = 0;
    for (i=0; i<this.ballSprites.children.length; i++) {
      if (this.targetNo == this.ballSprites.children[i].anim.name) {
        //console.log("this.ballSprites.children[i].anim.name", i, this.ballSprites.children[i].anim.name);
        this.leftcnt++;
      }
    }
    if (this.ballSprites.children.length > 0) {
      // のこり数ラベル描画
      if (this.leftcnt == 0) {
        let arrayno = Math.floor(Math.random()*this.ballSprites.children.length);
        this.targetNo = this.ballSprites.children[arrayno].anim.name;
        this.drawTarget();
        return;
      } else {
        //console.log("ASSETS.spritesheet[this.character].animations", ASSETS.spritesheet[this.character].animations);
        let asset = ASSETS.spritesheet[this.character].animations[this.targetNo];
        let name = asset.name;
        let color = asset.color;
        this.titleLabel.text = name + "\n\n\n\nのこり" + this.leftcnt + "こ";
        this.titleLabel.fill = color;
        this.titleLabel.stroke = color;
      }
      // スプライト描画
      if (this.targetball != null) {
        this.targetball.remove();
      }
      this.targetball = Sprite(this.character).addChildTo(this);
      let size = BALL_WIDTH;
      this.targetball.setImage(this.character, size, size);
      this.targetball.anim = FrameAnimation(this.character).attachTo(this.targetball);
      this.targetball.anim.fit = false;
      this.targetball.anim.gotoAndPlay(this.targetNo);
      this.targetball.setPosition(SCREEN_WIDTH/2, BALL_WIDTH);
    }
  }
});
