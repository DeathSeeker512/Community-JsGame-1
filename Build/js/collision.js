(function() {
  var Collision;

  Collision = (function() {
    function Collision(entity, skybox) {
      this.entity = entity;
      this.skybox = skybox;
    }

    Collision.prototype.check = function() {
      if (this.entity.x < 0) {
        this.entity.x = 0;
        return false;
      }
      if (this.entity.y < 0) {
        this.entity.y = 0;
        return false;
      }
      if (this.entity.x + this.entity.width > this.skybox.width) {
        this.entity.x = this.skybox.width - this.entity(-width);
        return false;
      }
      if (this.entity.y + this.entity.height > this.skybox.height) {
        return this.entity.y = this.skybox.height - this.entity.height;
      }
    };

    return Collision;

  })();

}).call(this);
