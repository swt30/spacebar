import Boot from 'states/Boot'
import Preload from 'states/Preload'
import MainMenu from 'states/MainMenu'
import FindGalaxies from 'states/FindGalaxies'
import CloseTheDome from 'states/CloseTheDome'
import WriteAProposal from 'states/WriteAProposal'

import BigMessage from 'objects/BigMessage.js'

class SpacebarGame extends Phaser.Game {
	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null)
		this.state.add('Boot', Boot, false)
		this.state.add('Preload', Preload, false)
		this.state.add('MainMenu', MainMenu, false)
		this.state.add('FindGalaxies', FindGalaxies, false)
		this.state.add('CloseTheDome', CloseTheDome, false)
		this.state.add('WriteAProposal', WriteAProposal, false)
		this.state.start('Boot')
	}
}

new SpacebarGame()
