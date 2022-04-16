phina.define("SpriteButtonClear", {
  superClass: "SpriteBase",

  // コンストラクタ
  init: function(animation, x, y, width= CLEAR_BUTTON_WIDTH, height= CLEAR_BUTTON_HEIGHT) {
    //console.log("SpriteButtonClearクラスinit");
    this.superInit("clear_button", animation, x, y, width, height);
    // 初期位置
    this.sprite.x = x;
    this.sprite.y = y;
  }
});