# Class Collision Spec

describe "Collision", ->
    self = @

    beforeEach  ->
        # we define elements that will collide
        self.skybox = 
            x : 0
            y : 0
            w : 40
            h : 40
        self.entity = 
            x : 5
            y : 5
            w : 10
            h : 10
        self.clock = sinon.useFakeTimers()

        # define the class
        class Collision 
            constructor : (@entity, @box) ->
                @entity #Collision.entity

    afterEach ->
        #reset clock after each test
        self.clock.restore()

    it "should define an entity and a box",  ->
        #define  a local entity to be compared with the global one
        @entity = x : 5, y : 5, w : 10, h : 10

        # does the constructor with the global entity return the same result
        # as local entity?
        -> new Collisiont(self.entity, self.skybox).should.be.eql @entity

    describe "detection", ->
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

            # define the class
            class Collision 
                constructor : (@entity, @box) ->
                    @entity #Collision.entity

        afterEach ->
            #reset clock after each test
            self.clock.restore()

        it "should detect a collision on the skybox leftWall after 5 seconds", (done) ->
            # detect if collision with left wall
            leftWall = (entity, box) =>
                if entity.x < box.x
                    entity.x = 0
                    return true
                return false
            checkLeft = {}

            #Todo : DRY
            #   do not redefine these variables as they are alrdy defined in beforeEach()
            self.entity = x : 5
            self.skybox = x : 0
            self.clock = sinon.useFakeTimers()

            # entity move at one frame/second, for testing purpose
            tick = setInterval( => 
                checkLeft = leftWall(self.entity, self.skybox)

                # emulate a move from entity to left
                self.entity.x -= 1 
            , 1000)

            # 7 seconds, to be sure
            self.clock.tick(7000)

            # x <= 0
            checkLeft.should.be.equal true
            clearInterval tick
            done()

        it "should detect a collision on the skybox RightWall after 5 seconds", (done) ->
            rightWall = (entity, box) ->
                if entity.x < box.x + box.w
                    entity.x = box.x 
                    return true
                return false

            checkRight = {}

            #Todo : DRY
            #   do not redefine these variables as they are alrdy defined in beforeEach()
            self.entity.x = 5
            self.skybox.x = 5
            self.skybox.w = 10
            self.clock = sinon.useFakeTimers()

            tick = setInterval( =>
                checkRight = rightWall(self.entity, self.skybox)

                # emulate a move from entity to right
                self.entity.x += 1
            , 100)

            # 7 seconds, to be sure
            self.clock.tick(7000)

            # x >= skybox.limit.x
            checkRight.should.be.equal true
            clearInterval tick
            done()

        it "should detect a collisiton on the skybox TopWall after 5 seconds", (done) ->
            topWall = (entity, box) ->
                if entity.y < box.y
                    entity.y = 0
                    return true
                return false

            checkTop = {}

            #Todo : DRY
            #   do not redefine these variables as they are alrdy defined in beforeEach()
            self.entity.y = 5
            self.skybox.y = 0
            self.clock = sinon.useFakeTimers()

            tick = setInterval( =>
                checkTop = topWall(self.entity, self.skybox) 

                #emulate a move from entity to top
                self.entity.y -=1
            , 100)

            # 7 seconds, to be sure
            self.clock.tick(7000)

            # y < skybox.y
            checkTop.should.be.equal true
            clearInterval tick
            done()

        it "should detect a Collision on the skybox bottomWall after 5 seconds", (done) ->
            bottomWall = (entity, box) ->
                if entity.y > box.y + box.h
                    entity.y = box.y + box.h
                    return true
                return false

            checkBottom = {}

            #Todo : DRY
            #   do not redefine these variables as they are alrdy defined in beforeEach()
            self.entity.y = 5
            self.skybox.y = 0
            self.skybox.h = 10
            self.clock = sinon.useFakeTimers()

            tick = setInterval( =>
                checkBottom = bottomWall(self.entity, self.skybox) 

                #emulate a move from entity to top
                self.entity.y +=1
            , 100)

            # 7 seconds, to be sure
            self.clock.tick(7000)

            # y > skybox.y + skybox.h
            checkBottom.should.be.equal true
            clearInterval tick
            done()

        it "should return which wall has been hurt after 5 seconds", (done) ->
            checkWall = () =>
                wall = 
                    left : leftWall(self.entity, self.skybox)  
                    right :  rightWall(self.entity, self.skybox) 
                    top : topWall(self.entity, self.skybox)  
                    bottom : bottomWall(self.entity, self.skybox) 
                return wall
                

            theWall = {}
            checkLeft = checkRight = checkTop = checkBottom = {}
            @entity = self.entity
            @skybox = self.skybox

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
            direction = new Movement(@entity, 1)

            # collisions to walls
            leftWall = (entity, box) =>
                if entity.x < box.x
                    entity.x = 0
                    return true
                return false

            rightWall = (entity, box) ->
                if entity.x > box.x + box.w
                    entity.x = box.x 
                    return true
                return false

            topWall = (entity, box) ->
                if entity.y < box.y
                    entity.y = 0
                    return true
                return false

            bottomWall = (entity, box) ->
                if entity.y > box.y + box.h
                    entity.y = box.y + box.h
                    return true
                return false

            # set the tick
            tick = setInterval( =>
                theWall = checkWall(@entity, @skybox)
                direction.move(15)
            , 100 )

            # 7 seconds, to be sure
            self.clock.tick(7000)

            # leftWall hurted?
            theWall.left.should.be.equal true
            clearInterval tick
            done()

    
