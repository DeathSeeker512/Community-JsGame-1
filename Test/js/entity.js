(function() {
  var Entity;

  Entity = (function() {
    function Entity(x, y) {
      this.x = x;
      this.y = y;
    }

    Entity.prototype.getPercentage = function(canvas) {
      this.canvas = canvas || document.getElementById("canvas");
      this.x = parseInt((this.x * 100) / this.canvas.offsetWidth);
      return this.y = parseInt((this.y * 100) / this.canvas.offsetHeight);
    };

    Entity.prototype.setRectangle = function(width, height) {
      this.width = width || this.x;
      return this.height = height || this.y;
    };

    Entity.prototype.setCircle = function(radiusX, radiusY) {
      if (radiusY == null) {
        radiusY = false;
      }
      this.radius = radiusX || this.x;
      if (radiusY !== false) {
        this.radiusY = radiusY;
        return this.radiusX = radiusX;
      }
    };

    Entity.prototype.setTriangle = function(pointB, pointC) {
      this.pointB = pointB;
      this.pointC = pointC;
      this.triangle = {
        pointA: {
          x: this.x,
          y: this.y
        },
        pointB: {
          x: this.pointB.x,
          y: this.pointB.y
        },
        pointC: {
          x: this.pointC.x,
          y: this.pointC.y
        }
      };
      return this.triangle;
    };

    Entity.prototype.setPolygon = function(arrayPoints) {
      var point, _i, _len, _ref;
      this.arrayPoints = arrayPoints;
      this.polygon = [
        {
          x: this.x,
          y: this.y
        }
      ];
      _ref = this.arrayPoints;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        if (parseInt(x) === true && parseInt(y) === true) {
          this.polygon.push({
            x: x,
            y: y
          });
        }
      }
      return this.polygon;
    };

    return Entity;

  })();

  describe("Entity", function() {
    describe("pixel", function() {
      var self;
      self = this;
      return before(function() {
        return self.entity = new Entity(200, 100);
      });
    });
    describe("positioning ", function() {
      before(function() {
        return self.entity = new Entity(200, 100);
      });
      it("should have a x position, in px ", function(done) {
        var _x;
        this.entity = self.entity;
        _x = this.entity.x;
        _x.should.be.equal(200);
        return done();
      });
      return it("should have an y position, in px ", function(done) {
        var _y;
        this.entity = self.entity;
        _y = this.entity.y;
        _y.should.be.equal(100);
        return done();
      });
    });
    describe("figures", function() {
      before(function() {
        return self.entity = new Entity(200, 100);
      });
      describe("rectangle", function() {
        it("should set a rectangle, in px", function(done) {
          this.entity = self.entity;
          this.entity.setRectangle(50, 100);
          this.entity.width.should.be.equal(50);
          return done();
        });
        return it("should set a rectangle, in px", function(done) {
          this.entity = self.entity;
          this.entity.setRectangle(100, 50);
          this.entity.height.should.be.equal(50);
          return done();
        });
      });
      describe("circle", function() {
        it("should set a circle, in px", function(done) {
          this.entity = self.entity;
          this.entity.setCircle(20);
          this.entity.radius.should.be.equal(20);
          return done();
        });
        return it("should set an ellipsis in px ", function(done) {
          this.entity = self.entity;
          this.entity.setCircle(20, 10);
          this.entity.radiusY.should.be.equal(10);
          return done();
        });
      });
      describe("triangle", function() {
        return it("should set two points to draw a triangle", function(done) {
          var _pointB, _triangle;
          this.entity = self.entity;
          _triangle = this.entity.setTriangle({
            x: 150,
            y: 150
          }, {
            x: 300,
            y: 220
          });
          _pointB = _triangle.pointB;
          _pointB.should.be.eql({
            x: 150,
            y: 150
          });
          return done();
        });
      });
      return describe("polygon", function() {
        return it("should set at least 5 points to draw a polygon", function(done) {
          var points, _points;
          this.entity = self.entity;
          points = [
            {
              x: 50,
              y: 150
            }, {
              x: 100,
              y: 200
            }, {
              x: 150,
              y: 320
            }, {
              x: 200,
              y: 250
            }, {
              x: 300,
              y: 300
            }
          ];
          _points = this.entity.setPolygon(points);
          _points[3].should.be.eql({
            x: 150,
            y: 320
          });
          return done();
        });
      });
    });
    describe("percent", function() {
      var self;
      return self = this;
    });
    return describe("positioning", function() {
      beforeEach(function() {
        return self.entity = new Entity(20, 10, "%");
      });
      before(function() {
        $("body").append("<div id=canvas></div>");
        $("#canvas").width(500);
        $("#canvas").height(500);
        return $("#canvas").css("border", "1 px solid darkgreen");
      });
      after(function() {
        return $("#canvas").remove();
      });
      it("should have a x position in % of the canvas", function(done) {
        var posX, _posX;
        this.entity = self.entity;
        posX = this.entity.getPercentage();
        posX = this.entity.x;
        _posX = (20 * 100) / 500;
        posX.should.be.equal(_posX);
        return done();
      });
      return it("should a y position in % of the canvas", function(done) {
        var posY, _posY;
        this.entity = self.entity;
        posY = this.entity.getPercentage();
        posY = this.entity.y;
        _posY = (10 * 100) / 500;
        posY.should.be.equal(_posY);
        return done();
      });
    });
  });

}).call(this);
