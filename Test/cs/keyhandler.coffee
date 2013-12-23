class Keyhandler
    constructor : (@currentKey) ->
        @keyArray = [@currentKey]

    listen :  (context, key, callback) ->
        @context = window or context
        @currentKey = key or 40
        @callback  = new Action(callback).action 
        if @callback isnt true
            @callback = window[callback]()
        return @callback

    add : (keyCode) ->
        @keyArray.push(keyCode)
        @currentKey = keyCode

    remove : (keyCode) ->
        if keyCode? isnt true
            @keyArray.pop() # remove last key entered
        else 
            for key, value in @keyArray
                if value is keyCode
                    @keyArray.splice(key, 1)


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
        after ->
            delete self.keyHandler
            
        it "should define a key", (done) ->
                @keyHandler = self.keyHandler
                @keyHandler.currentKey.should.be.equal 40
                done()

        describe "add a key on keydown event", ->

            it "should push a key ", (done) ->
                #length is one since constructor push a key to the keyArray
                @keyHandler = self.keyHandler
                event = {}
                event.which = 72
                @keyHandler.add(event.which)
                _keys = @keyHandler.keyArray
                _keys.should.have.length.above 1 
                # remove last key to clean up keyArray
                @keyHandler.keyArray.pop()
                done()

            it "should trigger an event on keydown", (done) ->
                _event = off
                $("body").keydown( (event) => 
                    _event = on 
                )
                _keydown = $.Event("keydown", keyCode : 72)
                $("body").trigger(_keydown)
                _event.should.be.equal true
                done()
            
            it "should push a key on keydown", (done) ->
                @keyHandler = self.keyHandler
                $("body").keydown( (event) =>
                    @keyHandler.add(event.which)
                )
                _keydown = $.Event("keydown", keyCode : 72)
                $("body").trigger(_keydown)
                _keyArray = @keyHandler.keyArray.length
                _keyArray.should.be.above 1
                @keyHandler.keyArray.pop()
                done()

        describe "remove a key on keyup event", ->
            before ->
                self.keyHandler = new Keyhandler()

            it "should pop a key", (done) ->
                _keyArray = @keyHandler.keyArray.length
                # since constructor ask for a key,
                # we want it to be less than 1 
                _keyArray.should.be.below 1 
                done()


        describe "attach callback to keyboard", ->

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
            


