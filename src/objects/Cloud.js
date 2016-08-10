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
        if (this.game.rnd.between(0, 10) < 8) { this.rain() }
        if (this.x > 1200) { this.destroy() }
    }

    rain() {
        let width = this.width * 0.8
        let x = this.x + this._speed + this.game.rnd.between(-width/2, width/2)
        new Raindrop(this.game, x, this.y)
    }
}

export default Cloud
