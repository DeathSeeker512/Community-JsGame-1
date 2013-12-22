(function() {
  var Keyhandler,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Keyhandler = (function() {
    function Keyhandler(key, entity) {
      this.key = key;
      this.entity = entity;
    }

    Keyhandler.prototype.move = function(deltatime) {
      var _ref;
      if (_ref = this.key, __indexOf.call(KeysDown, _ref) >= 0) {
        return this.entity.velocity * deltatime;
      }
    };

    return Keyhandler;

  })();

}).call(this);
