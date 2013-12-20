module.exports  = (grunt) ->
    grunt.loadNpmTasks "grunt-contrib-coffee"

    grunt.initConfig
        # pre compile coffeescript
        coffee : 
            dev : 
                files: [
                    expand : true
                    dest : "Source/js"
                    cwd : "Source/cs"
                    src : "**/*.coffee"
                    ext : ".js"
                ]
        #compress files
        uglify : 
            build : 
                files : [
                    expand : true
                    dest : "Source/min/js"
                    cwd : "Source/js"
                    src : "**/*.js"
                    ext : ".js"
                
                ]



    grunt.registerTask "default", [
        "coffee"
    ]

