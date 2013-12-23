(function() {
  var Responsive;

  Responsive = (function() {
    function Responsive(el) {
      this.el = el;
      this._el = document.getElementById(this.el);
    }

    Responsive.prototype.resize = function(width, height) {
      this.width = width || this.getDocumentWidth();
      if (this.width !== false) {
        this._el.setAttribute("style", "width : " + this.width + " px");
      }
      this.height = height || this.getDocumentHeight();
      if (this.height !== false) {
        return this._el.setAttribute("style", "height : " + this.height + " px");
      }
    };

    Responsive.prototype.getDocumentWidth = function() {
      if (self.innerWidth) {
        return self.innerWidth;
      }
      if (document.documentElement && document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
      }
      if (document.body) {
        return document.body.clientWidth;
      }
      return false;
    };

    Responsive.prototype.getDocumentHeight = function() {
      if (self.outerHeight) {
        return self.outerHeight;
      }
      if (document.body) {
        return document.body.clientHeight;
      }
      if (document.documentElement && document.documentElement.clientHeight) {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
      }
      return false;
    };

    Responsive.prototype.getPx = function() {
      var px;
      px = {
        width: this._el.offsetWidth,
        height: this._el.offsetHeight,
        name: "px"
      };
      return px;
    };

    Responsive.prototype.getPercentage = function() {
      var percentage;
      percentage = {
        width: Math.floor((this._el.offsetWidth * 100) / document.body.offsetWidth),
        height: Math.floor((this._el.offsetHeight * 100) / document.body.offsetHeight),
        name: "%"
      };
      return percentage;
    };

    return Responsive;

  })();

  describe("Responsiveness", function() {
    var self;
    self = this;
    before(function() {
      $("body").append("<div id=canvas></div>");
      self.responsive = new Responsive("canvas");
      $("body").css("height", "100%");
      $("body").css("margin", "0");
      return $("body").css("padding", "0");
    });
    after(function() {
      return $("#canvas").remove();
    });
    it("should take an element width and height", function(done) {
      this.responsive = self.responsive;
      this.responsive.el.should.be.equal("canvas");
      return done();
    });
    describe("canvas", function() {
      it("should get the element from a string", function(done) {
        var _el;
        this.responsive = self.responsive;
        _el = this.responsive._el;
        _el.should.be.equal(document.getElementById("canvas"));
        return done();
      });
      it("should resize to body width", function(done) {
        var _elWidth;
        this.responsive = self.responsive;
        this.responsive.resize();
        _elWidth = this.responsive._el.clientWidth;
        _elWidth.should.be.equal($("body").outerWidth());
        return done();
      });
      return it("should resize to body height", function(done) {
        var _elHeight;
        this.responsive = self.responsive;
        this.responsive.resize();
        _elHeight = this.responsive._el.clientHeight;
        _elHeight.should.be.equal($("body").height() - ($("body").height() - $("#canvas").height()));
        return done();
      });
    });
    return describe("ratio", function() {
      it("should get an element% of the document", function(done) {
        var _canvasPercentage, _elPercentage;
        this.responsive = self.responsive;
        _elPercentage = this.responsive.getPercentage().width;
        _canvasPercentage = Math.floor(($("#canvas").width() * 100) / $("body").width());
        _elPercentage.should.be.equal(_canvasPercentage);
        return done();
      });
      return it("should get the px of the element", function(done) {
        var _canvasPx, _elPx;
        this.responsive = self.responsive;
        _elPx = this.responsive.getPx().width;
        _canvasPx = $("#canvas").width();
        _elPx.should.be.equal(_canvasPx);
        return done();
      });
    });
  });

}).call(this);
