class Preload extends Phaser.State {
	preload() {
        this.stage.backgroundColor = "#383D3D"

        // Show an image while we preload everything
        this.preloadBar = this.add.sprite(400, 300, 'preloadIcon')
		this.preloadBar.anchor.set(0.5)
		this.load.setPreloadSprite(this.preloadBar)

        //	Load the rest of the assets our game needs.
		this.load.image('titleLogo', 'assets/title-logo.png')
		this.load.image('pressSpace', 'assets/press-space.png')
		this.load.audio('buzzer', 'assets/audio/buzzer.mp3')
		this.load.audio('titleMusic', 'assets/audio/chibi-ninja.mp3')

		this.load.image('deepfield', 'assets/find-galaxies/deepfield.jpg')
        this.load.image('gal1', 'assets/find-galaxies/gal1.png')
        this.load.image('gal2', 'assets/find-galaxies/gal2.png')
        this.load.image('gal3', 'assets/find-galaxies/gal3.png')
        this.load.image('gal4', 'assets/find-galaxies/gal4.png')
        this.load.image('gal5', 'assets/find-galaxies/gal5.png')
        this.load.image('gal6', 'assets/find-galaxies/gal6.png')
		this.load.image('nope', 'assets/find-galaxies/nope.png')

		this.load.image('macbook', 'assets/write-a-proposal/macbook-pro.jpg')

		this.load.image('dome', 'assets/close-the-dome/background.jpg')
		this.load.image('dome-closed', 'assets/close-the-dome/closed.jpg')
		this.load.image('umbrella', 'assets/close-the-dome/umbrella.png')
		this.load.image('cloud', 'assets/close-the-dome/cloud.png')
		this.load.image('raindrop', 'assets/close-the-dome/raindrop.png')
		this.load.image('people-cutout', 'assets/close-the-dome/people.jpg')
		this.load.image('dome-cutout', 'assets/close-the-dome/dome.jpg')
		this.load.image('dismay', 'assets/close-the-dome/dismay.png')
		this.load.image('shock', 'assets/close-the-dome/shock.png')
		this.load.image('surprise', 'assets/close-the-dome/surprise.png')

		// prepare for physics!
		this.game.physics.startSystem(Phaser.Physics.ARCADE)
	}

	create() {
        //	Once the load has finished we disable the crop
		this.preloadBar.cropEnabled = false
        this.toMenu()
	}

	toMenu() {
		this.state.start('MainMenu')
	}

}

export default Preload
