class BigMessage extends Phaser.Text {
    constructor(game, text) {
        let textstyle = { font: "bold 88pt Arial", fill: "#fff", align: "center" }
        super(game, game.width/2, game.height/2, text, textstyle)
        this.anchor.set(0.5)

        this.addTween()
        game.stage.addChild(this)
    }

    addTween() {
        let linear = Phaser.Easing.Linear.None
        this.game.add.tween(this).to({alpha: 0}, 2000, linear, true)
        this.game.add.tween(this.scale).to({x: 1.2, y:1.2}, 2000, linear, true)
        this.game.time.events.add(2000, this.destroy, this)
    }
}

export default BigMessage
