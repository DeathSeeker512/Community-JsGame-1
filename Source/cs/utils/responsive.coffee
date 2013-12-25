#file : utils/responsive
#description : add responsiveness to the canvas

class Responsive
    constructor : (@el, id = true) ->
        if id is true
            @_el = document.getElementById(@el)
        else 
            @_el = @el

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

    # helper
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
    


