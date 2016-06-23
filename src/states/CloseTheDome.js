import BigMessage from 'objects/BigMessage'
import Cloud from 'objects/Cloud'

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

        // start adding clouds
        this.addCloud()

        // prepare for raindrops
        this.physics.startSystem(Phaser.Physics.ARCADE)
    }

    addCloud() {
        let cloudHeight = this.rnd.between(0, 150)
        let cloudSize = this.rnd.realInRange(0.5, 1.5)
        let cloudSpeed = this.rnd.between(1, 5)
        new Cloud(this.game, -200, cloudHeight, cloudSize, cloudSpeed)

        let nextCloud = this.rnd.between(1000, 4000)
        this.time.events.add(nextCloud, this.addCloud, this)
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
