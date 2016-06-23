import Raindrop from 'objects/Raindrop'

class Cloud extends Phaser.Sprite {
    constructor(game, x, y, scale, speed) {
        super(game, x, y, 'cloud')
        this._speed = speed
        this._scale = scale
        this.scale.set(scale)
        this.anchor.set(0.5)
        game.stage.addChild(this)
    }

    update() {
        this.x = this.x + this._speed
        this.rain()

        if (this.x > 1200) {
            this.destroy()
        }
    }

    rain() {
        let width = 250 * this._scale
        let x = this.x + this.game.rnd.between(-width/2, +width/2)
        new Raindrop(this.game, x, this.y)
    }

    leftScreen() {

    }
}

export default Cloud
