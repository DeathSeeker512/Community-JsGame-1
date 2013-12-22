# Class Keyhandler Spec

describe "Keyhandler", ->

    beforeEach ->
                
    describe "Keyboard", ->

        self = @

        before ->
            class KeyHandler
                constructor : (@key) ->
                    
            self.keyHandler = new KeyHandler(40)

        it "should define a key", (done) ->
            @keyHandler = self.keyHandler
            @keyHandler.key.should.be.equal 40
            done()

        #it "should listen for a key", (done) ->
            #addEvent = (context, event, callback) =>
                #@context = context or event
                #@event = event or context.event
                #@key = @event.keyCode

            #done()



