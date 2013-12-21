module.exports  = (grunt) ->
    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-uglify"

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
            test : 
                files : [
                    expand : on
                    dest : "Test/js"
                    cwd : "Test/cs"
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

    grunt.registerTask "build", [
        "coffee", 
        "uglify"
    ]

    grunt.registerTask "test", [
        "coffee:test" 
    ]
