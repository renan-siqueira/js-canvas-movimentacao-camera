(function() {
    var cnv = document.querySelector('canvas')
    var ctx = cnv.getContext('2d')

    // recursos do jogo
    var background = new Image()
    background.src = "./resources/img/cenario.png"

    var personagem = new Image()
    personagem.src = "./resources/img/personagem.png"

    // objetos
    var sprites = []

    var gameWorld = {
        img: background,
        x: 0,
        y: 0,
        width: 800,
        height: 600
    }

    sprites.push(gameWorld)

    var char = {
        img: personagem,
        x: 0,
        y: 0,
        width: 64,
        height: 64
    }

    sprites.push(char)

    // Centralizar o personagem em relação ao cenário
    char.x = (gameWorld.width - char.width) /2
    char.y = (gameWorld.height - char.width) /2

    var cam = {
        x: 0,
        y: 0,
        width: cnv.width,
        height: cnv.height,
        leftEdge: function(){
            return this.x + (this.width * 0.25)
        },
        rightEdge: function(){
            return this.x + (this.width * 0.75)
        },
        topEdge: function(){
            return this.y + (this.height * 0.25)
        },
        bottomEdge: function(){
            return this.y + (this.height * 0.75)
        },
    }

    // Centralizar a camera em relação ao cenário
    cam.x = (gameWorld.width - cam.width) /2
    cam.y = (gameWorld.height - cam.width) /2

    // mover o char
    var moveLeft = moveRight = moveUp = moveDown = false

    window.addEventListener('keydown', function(e){
        var key = e.keyCode

        switch(key) {
            case 37 :
                moveLeft = true
                break
            case 38 :
                moveUp = true
                break
            case 39 :
                moveRight = true
                break
            case 40 :
                moveDown = true
                break
        }
    }, false)

    window.addEventListener('keyup', function(e){
        var key = e.keyCode

        switch(key) {
            case 37 :
                moveLeft = false
                break
            case 38 :
                moveUp = false
                break
            case 39 :
                moveRight = false
                break
            case 40 :
                moveDown = false
                break
        }
    }, false)


    function loop() {
        window.requestAnimationFrame(loop, cnv)
        update()
        render()
    }

    function update() {

        // Mover personagem
        if(moveLeft && !moveRight) {
            char.x -= 2
        }
        if(moveRight && !moveLeft) {
            char.x += 2
        }
        if(moveUp && !moveDown) {
            char.y -= 2
        }
        if(moveDown && !moveUp) {
            char.y += 2
        }

         // Limites do personagem
         if(char.x < 0) {
            char.x = 0
        }
        if(char.x + char.width > gameWorld.width) {
            char.x = gameWorld.width - char.width
        }
        if(char.y < 0) {
            char.y = 0
        }
        if(char.y + char.height > gameWorld.height) {
            char.y = gameWorld.height - char.height
        }

        // Atualizar a posição da câmera em relação ao personagem
        if(char.x < cam.leftEdge()) {
            cam.x = char.x - (cam.width * 0.25)
        }
        if(char.x + char.width > cam.rightEdge()) {
            cam.x = char.x + char.width - (cam.width * 0.75)
        }
        if(char.y < cam.topEdge()) {
            cam.y = char.y - (cam.height * 0.25)
        }
        if(char.y + char.height > cam.bottomEdge()) {
            cam.y = char.y + char.height - (cam.height * 0.75)
        }

        // Limites da camera
        if(cam.x < 0) {
            cam.x = 0
        }
        if(cam.x + cam.width > gameWorld.width) {
            cam.x = gameWorld.width - cam.width
        }
        if(cam.y < 0) {
            cam.y = 0
        }
        if(cam.y + cam.height > gameWorld.height) {
            cam.y = gameWorld.height - cam.height
        }
    }

    function render() {

        ctx.save()
        ctx.translate(-cam.x, -cam.y)
        
        for(var i in sprites) {
            var spr = sprites[i]
            ctx.drawImage(spr.img, 0,0, spr.width, spr.height, spr.x, spr.y, spr.width, spr.height)
        }

        ctx.restore()
        ctx.font = 'bold 25px Arial'
        ctx.fillText('By RenanS', 10, 30)
    }

    loop()
}())