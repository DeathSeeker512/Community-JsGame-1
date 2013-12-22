(function() {
  var Action, Keyhandler,
    _this = this;

  Keyhandler = (function() {
    function Keyhandler(key) {
      this.key = key;
    }

    Keyhandler.prototype.listen = function(context, key, callback) {
      this.context = window || context;
      this.key = key || 40;
      this.callback = new Action(callback).action;
      if (this.callback !== true) {
        this.callback = window[callback]();
      }
      return this.callback;
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
      it("should define a key", function(done) {
        this.keyHandler = self.keyHandler;
        this.keyHandler.key.should.be.equal(40);
        return done();
      });
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

}).call(this);
