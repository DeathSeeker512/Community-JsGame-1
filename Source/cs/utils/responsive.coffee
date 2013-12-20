#file : utils/reponsive
#description : add responsiveness to the canvas
#deps : jquery
class Responsive
    constructor : (@el) ->

    get : -> @
    
    # set canvas to fit the screen
    setFullscreen : (screen) ->
        @screen = document or screen
        #define new width and height for the canvas
        @$el.width($(@screen).width())
        @$el.height($(@screen).height())
    
    # set a grid for the positions
    # 100 as default so it emulate %
    setGrid : (grid) ->  
        @grid = grid or 100
    
    # set a position of an element
    # according to the grid
    setPosition : (spanX, spanY) ->
        position = 
           x : parseInt(spanX * @grid) / $(@screen.width()) 
           y : parseInt(spanY * @grid) / $(@screen.height())
        return position
    
     

