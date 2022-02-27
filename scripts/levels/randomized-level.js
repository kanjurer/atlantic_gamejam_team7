window.RandomizedLevel = function (levelNo) {
  GAME.objects.clear();
  GAME.LEVEL_NUMBER = levelNo;
  this.levelNo = levelNo;
  this.earth = new EarthObject();
  GAME.objects.add(this.earth);

  GAME.objects.add(new BGRender());
  GAME.cityHealth = 0;

  let x = -80;

  while (x < 80) {
    let width = Math.round(Math.random() * 4 + 4);

    if (x + width < -1 || x > 1) {
      GenerateBuilding(x, width, Math.ceil(Math.random() * 10 + 5));
    }

    x += width + 3 + Math.round(Math.random());
  }

  GAME.maxCityHealth = GAME.cityHealth;

  GenerateMainCharacter();
  GenerateUFO();
  //GenerateHostage();

  this.nextEnemyIn = (10 + (Math.random() * 20) / Math.sqrt(levelNo)) / 3;
};

RandomizedLevel.prototype.updateRender = function (dt, time, ctx) {
  // player dies
  if (PLAYER_HEALTH == 0) {
    ctx.fillText('You died', 50, 50);
  }

  this.nextEnemyIn -= dt;
  if (GAME.MAX_ENEMY_COUNT > GAME.CURRENT_ENEMY_COUNT && this.nextEnemyIn < 0) {
    GAME.objects.add(new Enemy(PLAYER_X + Math.random() * 50));
    GAME.CURRENT_ENEMY_COUNT++;
    console.log('current', GAME.CURRENT_ENEMY_COUNT);
    console.log('max', GAME.MAX_ENEMY_COUNT);
    this.nextEnemyIn =
      (10 + (Math.random() * 20) / Math.sqrt(this.levelNo)) / 2;
  }

  const healthBarY = 16;

  const healthBarWidth = 192;

  const healthBarHeight = 24;

  const healthBarX = 32;

  const backgroundColor = 'black';

  const fillColor = 'blue';

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

  const fillWidth = (GAME.cityHealth / GAME.maxCityHealth) * healthBarWidth;

  ctx.fillStyle = fillColor;
  ctx.fillRect(
    healthBarX + 2,
    healthBarY + 2,
    fillWidth - 4,
    healthBarHeight - 4
  );

  ctx.fillStyle = 'white';
  ctx.font = '16px minecraftiaregular';
  ctx.textAlign = 'center';
  ctx.fillText(
    GAME.cityHealth + '/' + GAME.maxCityHealth,
    healthBarX + healthBarWidth / 2,
    healthBarY + healthBarHeight / 2 + 6
  );

  ctx.textAlign = 'left';
  ctx.drawImage(GAME.images['skyline-small'], healthBarX - 16, healthBarY - 4);
};

RandomizedLevel.prototype.onRemove = function () {
  GAME.objects.clear();
};
