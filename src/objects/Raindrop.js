class Raindrop extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'raindrop')
        this.anchor.set(0.5)
        game.physics.arcade.enable(this)
        this.body.gravity.y = 2000
        game.stage.addChild(this)
        this._game = game
        this.state = game.state.states.CloseTheDome
        this.state.raindrops.add(this)
    }

    handler() {
        console.log("hit - handler")
    }

    process() {
        console.log("hit - process")
    }

    update() {
        if (this.y > 600 || this.state.done) {
            this.destroy()
        }
    }
}

export default Raindrop
