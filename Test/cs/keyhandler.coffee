class Keyhandler
    constructor : (@currentKey = false) ->
        if @currentKey isnt false
            @keyArray = [@currentKey]
        else 
            @keyArray = 0

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

    remove : (keyCode = false) ->
        if @keyArrayength isnt 0
            if keyCode isnt true 
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

        beforeEach ->
            self.keyHandler = new Keyhandler(40)
            
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
            beforeEach ->
                self.keyHandler = new Keyhandler(40)

            it "should pop a key", (done) ->
                @keyHandler = self.keyHandler
                @keyHandler.remove()
                _keyArray = @keyHandler.keyArray.length
                # since constructor ask for a key,
                # we want it to be less than 1 
                _keyArray.should.be.below 1 
                done()

            it "should trigger an event on keyup", (done) ->
                _event = off
                $("body").keyup( (event) => 
                    _event = on 
                )
                _keyup = $.Event("keyup", keyCode : 72)
                $("body").trigger(_keyup)
                _event.should.be.equal true
                done()

            it "should remove last key on keydown", (done) ->
                @keyHandler = self.keyHandler
                $("body").keyup( (event) =>
                    @keyHandler.remove()
                )
                _keyup = $.Event("keyup", keyCode : 72)
                $("body").trigger(_keyup)
                _keyArray = @keyHandler.keyArray.length
                _keyArray.should.be.below 1
                done()

            it "should remove a key sent by its keyCode on keydown", (done) ->
                @keyHandler = self.keyHandler
                $("body").keyup( (event) =>
                    @keyHandler.remove(event.which)
                )
                @keyHandler.add(72)
                @keyHandler.add(45)
                _keyup = $.Event("keyup", keyCode : 72)
                $("body").trigger(_keyup)
                _keyArray = @keyHandler.keyArray
                _keyArray.should.not.include 72
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
            


