#file : utils/responsive
#description : add responsiveness to the canvas

class Responsive
    constructor : (@el) ->
        @_el = document.getElementById(@el)

    resize : (width, height) ->
        @width = width or @getDocumentWidth()
        @_el.setAttribute("style", "width : #{@width}px") unless @width is false
        @height = height or @getDocumentHeight()
        @_el.setAttribute("style", "height : #{@height}px") unless @height is false

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

    getPx : ->
        px = 
            width : @_el.offsetWidth
            height : @_el.offsetHeight
            name : "px"
        return px

    getPercentage :  ->
        percentage = 
            width : Math.floor((@_el.offsetWidth *  100) / document.body.offsetWidth)
            height : Math.floor((@_el.offsetHeight * 100) / document.body.offsetHeight)
            name : "%"
        return percentage

