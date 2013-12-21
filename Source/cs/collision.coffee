#file : collision
#description : check collision

class Collision 
    constructor : (@entity, @box) ->
    
    # #Check collision 
    
    #   + leftwall
    leftWall : () ->
        if @entity.x < @box.x
            @entity.x = 0
            return true
        return false
    
    #   + rightwall
    rightWall : () ->
        if @entity.x < @box.x + @box.w
            @entity.x = @box.x
            return true
        return false

    #   + topwall
    topWall : () ->
        if @entity.y < @box.y
            @entity.y = 0
            return true
        return false

    #    + bottomwall
    bottomWall : () ->
        if @entity.y > @box.y + @box.h
            @entity.y = @box.y + @box.h
            return true
        return false


    # # return the wall wich have been hurted
    checkWall : () ->
        wall = 
            left : @leftWall()  
            right :  @rightWall()
            top : @topWall()  
            bottom : @bottomWall() 
        return wall


