phina.define("SpriteButtonStart", {
  superClass: "SpriteBase",

  // コンストラクタ
  init: function(pattern, x, y, width= START_BUTTON_WIDTH, height= START_BUTTON_HEIGHT) {
    console.log("SpriteButtonStartクラスinit");
    this.superInit("start_button", pattern, x, y, width, height);
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