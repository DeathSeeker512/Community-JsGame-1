(function() {
  describe("Keyhandler", function() {
    beforeEach(function() {});
    return describe("Keyboard", function() {
      var self;
      self = this;
      before(function() {
        var KeyHandler;
        KeyHandler = (function() {
          function KeyHandler(key) {
            this.key = key;
          }

          return KeyHandler;

        })();
        return self.keyHandler = new KeyHandler(40);
      });
      return it("should define a key", function(done) {
        this.keyHandler = self.keyHandler;
        this.keyHandler.key.should.be.equal(40);
        return done();
      });
    });
  });

}).call(this);
