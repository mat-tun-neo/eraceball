phina.define("SpriteBall", {
  superClass: "SpriteBase",

  // コンストラクタ
  init: function(pattern, x, y, width= BALL_WIDTH, height= BALL_HEIGHT) {
    console.log("SpriteBallクラスinit");
    this.superInit("ball", pattern, x, y, width, height);
    // 初期位置
    this.changeLocation();
    this.sprite.x = x;
    this.sprite.y = y;
    this.startflg = false;
  },
  // スプライト消去
  removeSprite: function() {
    this.sprite.remove();
    this.startflg = true;
  },
});