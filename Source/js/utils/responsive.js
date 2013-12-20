(function() {
  var Responsive;

  Responsive = (function() {
    function Responsive(el) {
      this.el = el;
    }

    Responsive.prototype.get = function() {
      return this;
    };

    Responsive.prototype.setFullscreen = function(screen) {
      this.screen = document || screen;
      this.$el.width($(this.screen).width());
      return this.$el.height($(this.screen).height());
    };

    Responsive.prototype.setGrid = function(grid) {
      return this.grid = grid || 100;
    };

    Responsive.prototype.setPosition = function(spanX, spanY) {
      var position;
      position = {
        x: parseInt(spanX * this.grid) / $(this.screen.width()),
        y: parseInt(spanY * this.grid) / $(this.screen.height())
      };
      return position;
    };

    return Responsive;

  })();

}).call(this);
