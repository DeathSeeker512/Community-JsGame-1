class Responsive
    constructor : (@el) ->
        @_el = document.getElementById(@el)

    #resize
    resize : (width, height, measure = false) ->
        if measure is false or measure is "px"
            @resizePx(width, height)
        else if measure is "%" or measure is "percent"
            @resizePercent(width, height)
        return false

    resizePx : (width, height) ->
        @width = width or @getDocumentWidth()
        @height = height or @getDocumentHeight()
        @_el.setAttribute("style", "width : #{@width} px") unless @width is false
        @_el.setAttribute("style", "height : #{@height} px") unless @height is false

    resizePercent : (width, height) ->
        @width =  width or 100
        @height = height or 100
        @_el.setAttribute("style", "width : #{@width} %") unless @width is false
        @_el.setAttribute("style", "height : #{@height} %") unless @height is false

    getDocumentWidth : ->
        if self.innerWidth then return self.innerWidth
        if document.documentElement and document.documentElement.clientWidth
            return document.documentElement.clientWidth
        if document.body
            return document.body.clientWidth
        return false

    getDocumentHeight : ->
        if self.outerHeight then return self.outerHeight
        if document.body
            return document.body.clientHeight
        if document.documentElement and document.documentElement.clientHeight
            return Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            )
        return false

    # get element w and h in px
    getPx : ->
        px = 
            width : @_el.offsetWidth
            height : @_el.offsetHeight
            name : "px"
        return px

    # get element w and h in percentage
    getPercentage :  ->
        percentage = 
            width : Math.floor((@_el.offsetWidth *  100) / document.body.offsetWidth)
            height : Math.floor((@_el.offsetHeight * 100) / document.body.offsetHeight)
            name : "%"
        return percentage
    


# class Responsive Spec
describe "Responsiveness", ->

    self = @

    before ->
        #create canvas element
        $("body").append("<div id=canvas></div>")
        self.responsive = new Responsive("canvas")
        $("body").css("height", "100%")
        $("body").css("margin", "0")
        $("body").css("padding", "0")

    after ->
        $("#canvas").remove()

    it "should take an element width and height", (done) ->
        @responsive = self.responsive
        @responsive.el.should.be.equal "canvas"
        done()

    describe "canvas", ->
        it "should get the element from a string", (done) ->
            @responsive = self.responsive
            _el = @responsive._el
            _el.should.be.equal document.getElementById("canvas")
            done()

        it "should resize to body width", (done) ->
            @responsive = self.responsive
            @responsive.resize()
            _elWidth = @responsive._el.clientWidth
            _elWidth.should.be.equal $("body").outerWidth()
            done()

        it "should resize to body height", (done) ->
            @responsive = self.responsive
            @responsive.resize()
            _elHeight = @responsive._el.clientHeight
            # body.height - extra body elements for the result of the test
            _elHeight.should.be.equal($("body").height() - ($("body").height() - $("#canvas").height()))
            done()

    describe "ratio", ->
        it "should get the element percentage - of the document", (done) ->
            @responsive = self.responsive
            _elPercentage = @responsive.getPercentage().width
            _canvasPercentage = Math.floor(($("#canvas").width() * 100) / $("body").width())
            _elPercentage.should.be.equal _canvasPercentage
            done()

        it "should get the px of the element", (done) ->
            @responsive = self.responsive
            _elPx = @responsive.getPx().width
            _canvasPx = $("#canvas").width()
            _elPx.should.be.equal _canvasPx
            done()

