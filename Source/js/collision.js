(function() {
  var Collision;

  Collision = (function() {
    function Collision(firstEntity, secundEntity) {
      this.firstEntity = firstEntity;
      this.secundEntity = secundEntity;
    }

    Collision.prototype.check = function() {
      if (this.firstEntity.x < 0) {
        this.firstEntity.x = 0;
        return false;
      }
      if (this.firstEntity.y < 0) {
        this.firstEntity.y = 0;
        return false;
      }
      if (this.firstEntity.x + this.firstEntity.width > this.secundEntity.width) {
        this.firstEntity.x = this.secundEntity.width - this.firstEntity(-width);
        return false;
      }
      if (this.firstEntity.y + this.firstEntity.height > this.secundEntity.height) {
        return this.firstEntity.y = this.secundEntity.height - this.firstEntity.height;
      }
    };

    return Collision;

  })();

}).call(this);
