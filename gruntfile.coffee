module.exports  = (grunt) ->
    grunt.loadNpmTasks "grunt-contrib-coffee"

    grunt.initConfig
        coffee : 
            dev : 
                files: [
                    expand : true
                    dest : "Source/js"
                    cwd : "Source/cs"
                    src : "**/*.coffee"
                    ext : ".js"
                ]
            build : 
                files: [
                    expand : true
                    dest : "Build/js"
                    cwd : "Source/cs"
                    src : "**/*.coffee"
                    ext : ".js"
                ]


    grunt.registerTask "default", [
        "coffee:dev"
    ]
    grunt.registerTask "build", [
        "coffe:build" 
    ]

