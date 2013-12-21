# Class Movement Spec

describe "movement", ->
    describe "random", ->
        beforeEach  ->
            # we define elements that will collide
            self.skybox = 
                x : 0
                y : 0
                w : 500
                h : 500
            self.entity = 
                x : 5
                y : 5
                w : 10
                h : 10
            self.clock = sinon.useFakeTimers()


        it "should move in a random direction during the tick interval", (done) ->
            direction = {}
            @entity = self.entity
            @skybox = self.skybox
            entityStartPosX = @entity.x

            # Generate a random move in the tick interval
            #
            # As we want to check collision with walls
            # it will move in the same direction during the tick
            class Movement
                constructor : (@entity, random) ->
                    @random = random or Math.floor(Math.random() * 4 + 1)

                # generate a random direction
                move : (velocity) ->
                    @velocity = velocity or 1
                    if @random is 1      # move to Left
                        return @entity.x -= @velocity 
                    if @random is 2      # move to Right
                        return @entity.x += @velocity
                    if @random is 3      # move to Bottom
                        return @entity.y += @velocity
                    if @random is 4      # move to Top
                        return @entity.y -= @velocity

            # let's pretend it's the left move for testing
            direction = new Movement(@entity, 2)

            tick = setInterval( =>
                direction.move(5)
            , 100 )

            # 7 seconds, to be sure
            self.clock.tick(7000)

            # did the entity move to the left?
            direction.entity.x.should.be.greaterThan entityStartPosX
            clearInterval tick
            done()

