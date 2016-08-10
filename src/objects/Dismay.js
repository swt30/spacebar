class Dismay extends Phaser.Sprite {
    constructor(game, x, y, type) {
        super(game, x, y, type)
        this.anchor.set(0.5)
        this.addTween()
        game.stage.addChild(this)
    }

    addTween() {
        let linear = Phaser.Easing.Linear.None
        this.game.add.tween(this).to({alpha: 0}, 400, linear, true)
        this.game.add.tween(this.scale).to({x: 1.5, y:1.5}, 400, linear, true)
        this.game.time.events.add(2000, this.destroy, this)
        let dy = this.game.rnd.between(0, 20)
        this.game.add.tween(this).to({y: this.y - dy}, 400, linear, true)
    }
}

export default Dismay
