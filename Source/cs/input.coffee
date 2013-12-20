#file : input
##description : check input

class Input
    constructor : (@key, @entity) ->

    move : (deltatime) ->
        if @key in KeysDown
            return @entity.velocity * deltatime


