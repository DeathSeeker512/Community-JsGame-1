# file : Keyhandler
# description : check input

class Keyhandler
    constructor : (@key) ->

    listen :  (context, key, callback) ->
        @context = window or context
        @key = key or 40
        @callback  = new Action(callback).action 
        if @callback isnt true
            @callback = window[callback]()
        return @callback




