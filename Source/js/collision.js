(function() {
  var Collision;

  Collision = (function() {
    function Collision(entity, box) {
      this.entity = entity;
      this.box = box;
    }

    Collision.prototype.leftWall = function() {
      if (this.entity.x < this.box.x) {
        this.entity.x = 0;
        return true;
      }
      return false;
    };

    Collision.prototype.rightWall = function() {
      if (this.entity.x < this.box.x + this.box.w) {
        this.entity.x = this.box.x;
        return true;
      }
      return false;
    };

    Collision.prototype.topWall = function() {
      if (this.entity.y < this.box.y) {
        this.entity.y = 0;
        return true;
      }
      return false;
    };

    Collision.prototype.bottomWall = function() {
      if (this.entity.y > this.box.y + this.box.h) {
        this.entity.y = this.box.y + this.box.h;
        return true;
      }
      return false;
    };

    Collision.prototype.checkWall = function() {
      var wall;
      wall = {
        left: this.leftWall(),
        right: this.rightWall(),
        top: this.topWall(),
        bottom: this.bottomWall()
      };
      return wall;
    };

    return Collision;

  })();

}).call(this);
