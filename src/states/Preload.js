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
		this.load.image('deepfield', 'assets/telescope-finder/deepfield.jpg')
        this.load.image('gal1', 'assets/telescope-finder/gal1.png')
        this.load.image('gal2', 'assets/telescope-finder/gal2.png')
        this.load.image('gal3', 'assets/telescope-finder/gal3.png')
        this.load.image('gal4', 'assets/telescope-finder/gal4.png')
        this.load.image('gal5', 'assets/telescope-finder/gal5.png')
        this.load.image('gal6', 'assets/telescope-finder/gal6.png')
		this.load.image('dome', 'assets/close-the-dome/background.jpg')
		this.load.image('dome-closed', 'assets/close-the-dome/closed.jpg')
		this.load.image('umbrella', 'assets/close-the-dome/umbrella.png')
		this.load.image('macbook', 'assets/write-a-proposal/macbook-pro.jpg')
        this.load.audio('titleMusic', ['assets/audio/chibi-ninja.mp3'])
		this.load.audio('buzzer', ['assets/audio/buzzer.mp3'])
	}

	create() {
        //	Once the load has finished we disable the crop
		this.preloadBar.cropEnabled = false
        this.state.start('MainMenu')
	}

}

export default Preload
