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
        this._el.setAttribute("style", "width : " + this.width + "px");
      }
      this.height = height || this.getDocumentHeight();
      if (this.height !== false) {
        return this._el.setAttribute("style", "height : " + this.height + "px");
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

}).call(this);
