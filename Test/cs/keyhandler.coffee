class Keyhandler
    constructor : (@key) ->

    listen :  (context, key, callback) ->
        @context = window or context
        @key = key or 40
        @callback  = new Action(callback).action 
        if @callback isnt true
            @callback = window[callback]()
        return @callback

# utility functions, class, etc
window.moveRight = =>
    return false

class Action
    constructor : (@action) ->
        if @action is "moveLeft"
            return @moveLeft()
        return false
    moveLeft : -> @action = true

# Class Keyhandler Spec
describe "Keyhandler", ->

    describe "keyboard", ->
        self = @

        before ->
            self.keyHandler = new Keyhandler(40)
            
        it "should define a key", (done) ->
            @keyHandler = self.keyHandler
            @keyHandler.key.should.be.equal 40
            done()

        it "should attach a key to a function", (done) ->
            @keyHandler = self.keyHandler
            keyListen = @keyHandler.listen(window, 40, "moveRight") 
            keyListen.should.be.equal false
            done()

        it "should attach a key to a class method", (done) ->
            @keyHandler = self.keyHandler
            keyListen = @keyHandler.listen(window, 40, "moveLeft")
            keyListen.should.be.equal true
            done()
        


