#file : collision
#description : check collision

class Collision 
    constructor : (@firstEntity, @secundEntity) ->

    check : ->
        if @firstEntity.x < 0
            @firstEntity.x = 0
            return false
        if @firstEntity.y < 0 
            @firstEntity.y = 0
            return false
        if @firstEntity.x + @firstEntity.width > @secundEntity.width
            @firstEntity.x  = @secundEntity.width - @firstEntity -width 
            return false
        if @firstEntity.y + @firstEntity.height > @secundEntity.height
            @firstEntity.y = @secundEntity.height - @firstEntity.height



