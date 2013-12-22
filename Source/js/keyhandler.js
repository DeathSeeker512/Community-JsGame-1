(function() {
  var Keyhandler;

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

}).call(this);
