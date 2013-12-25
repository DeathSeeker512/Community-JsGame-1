# file : Keyhandler
# description : check input

class Keyhandler
    constructor : (@currentKey = false) ->
        if @currentKey isnt false
            @keyArray = [@currentKey]
        else 
            @keyArray = 0

    listen :  (context, key, callback) ->
        @context = window or context
        @currentKey = key or 40
        @callback  = new Action(callback).action 
        if @callback isnt true
            @callback = window[callback]()
        return @callback

    add : (keyCode) ->
        @keyArray.push(keyCode)
        @currentKey = keyCode

    remove : (keyCode = false) ->
        if @keyArrayength isnt 0
            if keyCode isnt true 
                @keyArray.pop() # remove last key entered
            else 
                for key, value in @keyArray
                    if value is keyCode
                        @keyArray.splice(key, 1)


