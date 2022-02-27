window.EarthObject = function () {
  this.objects = [];
  this.objects.push(new GroundObject(-200, 70));
  this.objects.push(new WatersObject(70, 80));
  this.objects.push(new GroundObject(80, 200));
};

EarthObject.prototype.updateRender = function (dt, time, ctx) {
  this.objects.forEach((element) => {
    element.updateRender(dt, time, ctx);
  });
  return true;
};

EarthObject.prototype.onRemove = function () {
  this.objects.forEach((element) => {
    element.onRemove();
  });
};
