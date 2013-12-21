(function() {
  var should;

  mocha.setup({
    ui: "bdd",
    globals: ["interval", "setTimeout", "setInterval", "clearTimeout", "clearInterval"]
  });

  should = chai.should();

}).call(this);
