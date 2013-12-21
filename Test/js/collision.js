(function() {
  describe("Collision", function() {
    var self;
    self = this;
    beforeEach(function() {
      var Collision;
      self.skybox = {
        x: 0,
        y: 0,
        w: 40,
        h: 40
      };
      self.entity = {
        x: 5,
        y: 5,
        w: 10,
        h: 10
      };
      self.clock = sinon.useFakeTimers();
      return Collision = (function() {
        function Collision(entity, box) {
          this.entity = entity;
          this.box = box;
          this.entity;
        }

        return Collision;

      })();
    });
    afterEach(function() {
      return self.clock.restore();
    });
    it("should define an entity and a box", function() {
      this.entity = {
        x: 5,
        y: 5,
        w: 10,
        h: 10
      };
      return function() {
        return new Collisiont(self.entity, self.skybox).should.be.eql(this.entity);
      };
    });
    return describe("detection", function() {
      beforeEach(function() {
        var Collision;
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
        self.clock = sinon.useFakeTimers();
        return Collision = (function() {
          function Collision(entity, box) {
            this.entity = entity;
            this.box = box;
            this.entity;
          }

          return Collision;

        })();
      });
      afterEach(function() {
        return self.clock.restore();
      });
      it("should detect a collision on the skybox leftWall after 5 seconds", function(done) {
        var checkLeft, leftWall, tick,
          _this = this;
        leftWall = function(entity, box) {
          if (entity.x < box.x) {
            entity.x = 0;
            return true;
          }
          return false;
        };
        checkLeft = {};
        self.entity = {
          x: 5
        };
        self.skybox = {
          x: 0
        };
        self.clock = sinon.useFakeTimers();
        tick = setInterval(function() {
          checkLeft = leftWall(self.entity, self.skybox);
          return self.entity.x -= 1;
        }, 1000);
        self.clock.tick(7000);
        checkLeft.should.be.equal(true);
        clearInterval(tick);
        return done();
      });
      it("should detect a collision on the skybox RightWall after 5 seconds", function(done) {
        var checkRight, rightWall, tick,
          _this = this;
        rightWall = function(entity, box) {
          if (entity.x < box.x + box.w) {
            entity.x = box.x;
            return true;
          }
          return false;
        };
        checkRight = {};
        self.entity.x = 5;
        self.skybox.x = 5;
        self.skybox.w = 10;
        self.clock = sinon.useFakeTimers();
        tick = setInterval(function() {
          checkRight = rightWall(self.entity, self.skybox);
          return self.entity.x += 1;
        }, 100);
        self.clock.tick(7000);
        checkRight.should.be.equal(true);
        clearInterval(tick);
        return done();
      });
      it("should detect a collisiton on the skybox TopWall after 5 seconds", function(done) {
        var checkTop, tick, topWall,
          _this = this;
        topWall = function(entity, box) {
          if (entity.y < box.y) {
            entity.y = 0;
            return true;
          }
          return false;
        };
        checkTop = {};
        self.entity.y = 5;
        self.skybox.y = 0;
        self.clock = sinon.useFakeTimers();
        tick = setInterval(function() {
          checkTop = topWall(self.entity, self.skybox);
          return self.entity.y -= 1;
        }, 100);
        self.clock.tick(7000);
        checkTop.should.be.equal(true);
        clearInterval(tick);
        return done();
      });
      it("should detect a Collision on the skybox bottomWall after 5 seconds", function(done) {
        var bottomWall, checkBottom, tick,
          _this = this;
        bottomWall = function(entity, box) {
          if (entity.y > box.y + box.h) {
            entity.y = box.y + box.h;
            return true;
          }
          return false;
        };
        checkBottom = {};
        self.entity.y = 5;
        self.skybox.y = 0;
        self.skybox.h = 10;
        self.clock = sinon.useFakeTimers();
        tick = setInterval(function() {
          checkBottom = bottomWall(self.entity, self.skybox);
          return self.entity.y += 1;
        }, 100);
        self.clock.tick(7000);
        checkBottom.should.be.equal(true);
        clearInterval(tick);
        return done();
      });
      return it("should return which wall has been hurt after 5 seconds", function(done) {
        var Movement, bottomWall, checkBottom, checkLeft, checkRight, checkTop, checkWall, direction, leftWall, rightWall, theWall, tick, topWall,
          _this = this;
        checkWall = function() {
          var wall;
          wall = {
            left: leftWall(self.entity, self.skybox),
            right: rightWall(self.entity, self.skybox),
            top: topWall(self.entity, self.skybox),
            bottom: bottomWall(self.entity, self.skybox)
          };
          return wall;
        };
        theWall = {};
        checkLeft = checkRight = checkTop = checkBottom = {};
        this.entity = self.entity;
        this.skybox = self.skybox;
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
        direction = new Movement(this.entity, 1);
        leftWall = function(entity, box) {
          if (entity.x < box.x) {
            entity.x = 0;
            return true;
          }
          return false;
        };
        rightWall = function(entity, box) {
          if (entity.x > box.x + box.w) {
            entity.x = box.x;
            return true;
          }
          return false;
        };
        topWall = function(entity, box) {
          if (entity.y < box.y) {
            entity.y = 0;
            return true;
          }
          return false;
        };
        bottomWall = function(entity, box) {
          if (entity.y > box.y + box.h) {
            entity.y = box.y + box.h;
            return true;
          }
          return false;
        };
        tick = setInterval(function() {
          theWall = checkWall(_this.entity, _this.skybox);
          return direction.move(15);
        }, 100);
        self.clock.tick(7000);
        theWall.left.should.be.equal(true);
        clearInterval(tick);
        return done();
      });
    });
  });

}).call(this);
