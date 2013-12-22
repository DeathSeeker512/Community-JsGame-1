# file : Keyhandler
# description : check input

class Keyhandler
    constructor : (@key, @entity) ->

    move : (deltatime) ->
        if @key in KeysDown
            return @entity.velocity * deltatime


