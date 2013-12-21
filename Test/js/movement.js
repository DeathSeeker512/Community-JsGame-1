(function() {
  describe("movement", function() {
    return describe("random", function() {
      beforeEach(function() {
        self.skybox = {
          x: 0,
          y: 0,
          w: 500,
          h: 500
        };
        self.entity = {
          x: 5,
          y: 5,
          w: 10,
          h: 10
        };
        return self.clock = sinon.useFakeTimers();
      });
      return it("should move in a random direction during the tick interval", function(done) {
        var Movement, direction, entityStartPosX, tick,
          _this = this;
        direction = {};
        this.entity = self.entity;
        this.skybox = self.skybox;
        entityStartPosX = this.entity.x;
        Movement = (function() {
          function Movement(entity, random) {
            this.entity = entity;
            this.random = random || Math.floor(Math.random() * 4 + 1);
          }

          Movement.prototype.move = function(velocity) {
            this.velocity = velocity || 1;
            if (this.random === 1) {
              return this.entity.x -= this.velocity;
            }
            if (this.random === 2) {
              return this.entity.x += this.velocity;
            }
            if (this.random === 3) {
              return this.entity.y += this.velocity;
            }
            if (this.random === 4) {
              return this.entity.y -= this.velocity;
            }
          };

          return Movement;

        })();
        direction = new Movement(this.entity, 2);
        tick = setInterval(function() {
          return direction.move(5);
        }, 100);
        self.clock.tick(7000);
        direction.entity.x.should.be.greaterThan(entityStartPosX);
        clearInterval(tick);
        return done();
      });
    });
  });

}).call(this);
