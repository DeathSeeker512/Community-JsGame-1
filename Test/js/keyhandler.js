(function() {
  var Action, Keyhandler,
    _this = this;

  Keyhandler = (function() {
    function Keyhandler(currentKey) {
      this.currentKey = currentKey;
      this.keyArray = [this.currentKey];
    }

    Keyhandler.prototype.listen = function(context, key, callback) {
      this.context = window || context;
      this.currentKey = key || 40;
      this.callback = new Action(callback).action;
      if (this.callback !== true) {
        this.callback = window[callback]();
      }
      return this.callback;
    };

    Keyhandler.prototype.add = function(keyCode) {
      this.keyArray.push(keyCode);
      return this.currentKey = keyCode;
    };

    Keyhandler.prototype.remove = function(keyCode) {
      var key, value, _i, _len, _ref, _results;
      if ((keyCode != null) !== true) {
        return this.keyArray.pop();
      } else {
        _ref = this.keyArray;
        _results = [];
        for (value = _i = 0, _len = _ref.length; _i < _len; value = ++_i) {
          key = _ref[value];
          if (value === keyCode) {
            _results.push(this.keyArray.splice(key, 1));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    return Keyhandler;

  })();

  window.moveRight = function() {
    return false;
  };

  Action = (function() {
    function Action(action) {
      this.action = action;
      if (this.action === "moveLeft") {
        return this.moveLeft();
      }
      return false;
    }

    Action.prototype.moveLeft = function() {
      return this.action = true;
    };

    return Action;

  })();

  describe("Keyhandler", function() {
    return describe("keyboard", function() {
      var self;
      self = this;
      before(function() {
        return self.keyHandler = new Keyhandler(40);
      });
      after(function() {
        return delete self.keyHandler;
      });
      it("should define a key", function(done) {
        this.keyHandler = self.keyHandler;
        this.keyHandler.currentKey.should.be.equal(40);
        return done();
      });
      describe("add a key on keydown event", function() {
        it("should push a key ", function(done) {
          var event, _keys;
          this.keyHandler = self.keyHandler;
          event = {};
          event.which = 72;
          this.keyHandler.add(event.which);
          _keys = this.keyHandler.keyArray;
          _keys.should.have.length.above(1);
          this.keyHandler.keyArray.pop();
          return done();
        });
        it("should trigger an event on keydown", function(done) {
          var _event, _keydown,
            _this = this;
          _event = false;
          $("body").keydown(function(event) {
            return _event = true;
          });
          _keydown = $.Event("keydown", {
            keyCode: 72
          });
          $("body").trigger(_keydown);
          _event.should.be.equal(true);
          return done();
        });
        return it("should push a key on keydown", function(done) {
          var _keyArray, _keydown,
            _this = this;
          this.keyHandler = self.keyHandler;
          $("body").keydown(function(event) {
            return _this.keyHandler.add(event.which);
          });
          _keydown = $.Event("keydown", {
            keyCode: 72
          });
          $("body").trigger(_keydown);
          _keyArray = this.keyHandler.keyArray.length;
          _keyArray.should.be.above(1);
          this.keyHandler.keyArray.pop();
          return done();
        });
      });
      describe("remove a key on keyup event", function() {
        before(function() {
          return self.keyHandler = new Keyhandler();
        });
        return it("should pop a key", function(done) {
          var _keyArray;
          _keyArray = this.keyHandler.keyArray.length;
          _keyArray.should.be.below(1);
          return done();
        });
      });
      return describe("attach callback to keyboard", function() {
        it("should attach a key to a function", function(done) {
          var keyListen;
          this.keyHandler = self.keyHandler;
          keyListen = this.keyHandler.listen(window, 40, "moveRight");
          keyListen.should.be.equal(false);
          return done();
        });
        return it("should attach a key to a class method", function(done) {
          var keyListen;
          this.keyHandler = self.keyHandler;
          keyListen = this.keyHandler.listen(window, 40, "moveLeft");
          keyListen.should.be.equal(true);
          return done();
        });
      });
    });
  });

}).call(this);
