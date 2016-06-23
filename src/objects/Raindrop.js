class Raindrop extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'raindrop')
        this.anchor.set(0.5)

        game.physics.enable(this, Phaser.Physics.ARCADE)
        this.body.gravity.y = 2000

        game.stage.addChild(this)
    }

    update() {
        if (this.y > 600) {
            this.destroy()
        }
    }
}

export default Raindrop
