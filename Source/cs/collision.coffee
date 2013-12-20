#file : collision
#description : check collision

class Collision 
    constructor : (@entity, @skybox) ->

    check : ->
        if @entity.x < 0
            @entity.x = 0
            return false
        if @entity.y < 0 
            @entity.y = 0
            return false
        if @entity.x + @entity.width > @skybox.width
            @entity.x  = @skybox.width - @entity -width 
            return false
        if @entity.y + @entity.height > @skybox.height
            @entity.y = @skybox.height - @entity.height



