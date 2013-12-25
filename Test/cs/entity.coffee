class Entity
    constructor : (x, y) ->
        @x = x
        @y = y

    getPercentage : (canvas) ->
        @canvas = canvas or document.getElementById("canvas")
        @x = parseInt(( @x * 100) / @canvas.offsetWidth)
        @y = parseInt(( @y * 100) / @canvas.offsetHeight)

    setRectangle : (width, height) ->
        #by default make a square
        @width = width or @x
        @height = height or @y
    
    setCircle : (radiusX, radiusY = false) ->
        @radius = radiusX or @x
        if radiusY isnt false
            @radiusY = radiusY
            @radiusX = radiusX

    setTriangle : (@pointB, @pointC) ->
        @triangle = 
            pointA :
                x : @x
                y : @y
            pointB : 
                x : @pointB.x
                y : @pointB.y
            pointC : 
                x : @pointC.x
                y : @pointC.y
        return @triangle

    setPolygon : (@arrayPoints) ->
        @polygon = [ x : @x, y : @y ]
        for point in @arrayPoints
            if parseInt(x) is yes and parseInt(y) is yes
                @polygon.push x : x, y : y
        @polygon


# Class Entity Spec
describe "Entity", ->

    describe "pixel" , ->

            self = @

            before ->
                self.entity = new Entity(200, 100)

        describe "positioning ", ->

            before ->
                self.entity = new Entity(200, 100)

            it "should have a x position, in px ", (done) ->
                @entity = self.entity
                _x = @entity.x
                _x.should.be.equal 200
                done()

            it "should have an y position, in px ", (done) ->
                @entity = self.entity
                _y = @entity.y
                _y.should.be.equal 100
                done()

        describe "figures", ->
            before ->
                self.entity = new Entity(200, 100)

            describe "rectangle", ->

                it "should set a rectangle, in px", (done) ->
                    @entity = self.entity
                    @entity.setRectangle(50, 100)
                    @entity.width.should.be.equal 50
                    done()

                it "should set a rectangle, in px", (done) ->
                    @entity = self.entity
                    @entity.setRectangle(100, 50)
                    @entity.height.should.be.equal 50
                    done()

            describe "circle", ->

                it "should set a circle, in px", (done) ->
                    @entity = self.entity
                    @entity.setCircle(20)
                    @entity.radius.should.be.equal 20
                    done()

                it "should set an ellipsis in px ", (done) ->
                    @entity = self.entity
                    @entity.setCircle(20,10)
                    @entity.radiusY.should.be.equal 10
                    done()

            describe "triangle", ->

                it "should set two points to draw a triangle", (done) ->
                    @entity = self.entity
                    _triangle = @entity.setTriangle({x : 150, y : 150}, {x : 300, y : 220})
                    _pointB = _triangle.pointB
                    _pointB.should.be.eql {x : 150, y : 150}
                    done()

            describe "polygon", ->

                it "should set at least 5 points to draw a polygon", (done) ->
                    @entity = self.entity
                    points = [
                        {x : 50, y : 150}, {x : 100, y : 200}, {x : 150, y : 320}, 
                        {x : 200, y : 250}, {x : 300, y : 300}
                    ]
                    _points = @entity.setPolygon(points)
                    _points[3].should.be.eql {x : 150, y : 320}
                    done()

    describe "percent", ->

            self = @

        describe "positioning", ->
            beforeEach ->
                self.entity = new Entity(20, 10, "%")

            before ->
                # adding a canvas
                $("body").append("<div id=canvas></div>")
                $("#canvas").width(500)
                $("#canvas").height(500)
                $("#canvas").css("border", "1 px solid darkgreen")
            after ->
                $("#canvas").remove()


            it "should have a x position in % of the canvas", (done) ->
                @entity = self.entity
                posX = @entity.getPercentage()
                posX = @entity.x
                _posX = (20 * 100) / 500
                posX.should.be.equal _posX
                done()

            it "should a y position in % of the canvas", (done) ->
                @entity = self.entity
                posY = @entity.getPercentage()
                posY = @entity.y
                _posY = (10 * 100) / 500
                posY.should.be.equal _posY
                done()

