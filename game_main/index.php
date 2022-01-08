<!doctype html>

<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title></title>
  </head>
  <body>
  </body>
</html>

<div id="ball" style="display:none"><?php echo $_POST['ball'] ?></div>
<div id="difficulty" style="display:none"><?php echo $_POST['difficulty'] ?></div>
<div id="score" style="display:none">0</div>

<script src="./js/Box2d.js<?php echo date('YmdHis') ?>"></script>
<script src="./js/phina_0.2.1改.js<?php echo date('YmdHis') ?>"></script>
<script src="./js/main.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SceneMain.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SceneExit.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SpriteBase.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SpriteButtonStart.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SpriteBall.js?<?php echo date('YmdHis') ?>"></script>
