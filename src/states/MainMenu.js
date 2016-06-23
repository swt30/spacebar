import BigMessage from 'objects/BigMessage'

class MainMenu extends Phaser.State {
    create() {
        // title music
        this.music = this.add.audio('titleMusic')
		this.music.play()

		// title logo
        this.stage.backgroundColor = "#383D3D"
		this.logo = this.add.sprite(400, 300, 'titleLogo')
		this.logo.anchor.set(0.5)

        // blinking "press space"
        this.pressSpace = this.add.sprite(400, 300, 'pressSpace')
        this.pressSpace.anchor.set(0.5)
        this.pressSpace.alpha = 0
        this.add.tween(this.pressSpace).to( { alpha: 1}, 3400/4,
            Phaser.Easing.Linear.None, true, 3400, -1, true)

        // register spacebar presses to move on
        let spacekey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        spacekey.onDown.add(this.startGame, this)

        // register keypresses to complain if we don't use Space
        var self = this;
        this.input.keyboard.onDownCallback = function (key) {
            self.thatHadBetterBeSpacebar(key)
        }

        this.buzz = this.add.audio('buzzer')
    }

    thatHadBetterBeSpacebar(key) {
        if (key.code !== "Space") {
            let text = new BigMessage(this.game, "NO, PRESS\nSPACE!")
            this.buzz.play()
        }
    }

    shutdown() {
        this.input.keyboard.onDownCallback = null;
    }

    startGame() {
        this.state.start('FindGalaxies')
    }
}

export default MainMenu
