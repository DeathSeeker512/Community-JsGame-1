(function() {
  var Keyhandler;

  Keyhandler = (function() {
    function Keyhandler(currentKey) {
      this.currentKey = currentKey != null ? currentKey : false;
      if (this.currentKey !== false) {
        this.keyArray = [this.currentKey];
      } else {
        this.keyArray = 0;
      }
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
      if (keyCode == null) {
        keyCode = false;
      }
      if (this.keyArrayength !== 0) {
        if (keyCode !== true) {
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
      }
    };

    return Keyhandler;

  })();

}).call(this);
