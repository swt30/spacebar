class Boot extends Phaser.State {
	preload() {
		this.load.image('preloadIcon', 'assets/telescope-loading.png')
	}

	create() {
		this.input.maxPointers = 1
		this.stage.disableVisibilityChange = true
		this.state.start('Preload')
	}
}

export default Boot
