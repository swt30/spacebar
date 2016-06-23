import BigMessage from 'objects/BigMessage'

class CloseTheDome extends Phaser.State {
    create() {
        this.add.sprite(0, 0, 'dome')
        this.introText()

        // make the umbrellas
        this.umbrellas = this.add.group()
        this.umbrellas.create(200, 470, 'umbrella')
        this.umbrellas.create(220, 480, 'umbrella')
        this.umbrellas.create(250, 465, 'umbrella')
        this.umbrellas.create(295, 475, 'umbrella')
        this.umbrellas.create(340, 495, 'umbrella')
        this.umbrellas.create(390, 475, 'umbrella')
        this.umbrellas.alpha = 0
        this.umbrellas.defaulty = this.umbrellas.y

        // make the closed dome
        this.closedDome = this.add.sprite(this.game.width, this.game.height, 'dome-closed')
        this.closedDome.anchor.set(1)
        this.closedDome.alpha = 0

        // register spacebar presses
        let spacekey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        spacekey.onDown.add(this.closeUp, this)
        spacekey.onUp.add(this.openUp, this)
    }

    introText() {
        new BigMessage(this.game, "KEEP THE\nDOME DRY!")
    }

    wellDoneText() {
        new BigMessage(this.game, "FLAWLESS\nOBSERVING")
    }

    closeUp() {
        let linear = Phaser.Easing.Linear.None
        let y = this.umbrellas.defaulty
        this.add.tween(this.umbrellas).to({alpha: 1, y: y-20}, 200, linear, true)
        this.add.tween(this.closedDome).to({alpha: 1}, 200, linear, true)
    }

    openUp() {
        let linear = Phaser.Easing.Linear.None
        let y = this.umbrellas.defaulty
        this.add.tween(this.umbrellas).to({alpha: 0, y: y}, 200, linear, true)
        this.add.tween(this.closedDome).to({alpha: 0}, 200, linear, true)
    }
}

export default CloseTheDome
