
victory =
    userLevel:
        root: 0
        normal: 1
    loginUrl: ''
    user:
        userId: 0
        level: 1
        name: null
        email: null
        isLogin: false
        isRoot: ->
            victory.user.level == victory.userLevel.root

window.victory = victory
