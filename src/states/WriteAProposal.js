import BigMessage from 'objects/BigMessage'

class WriteAProposal extends Phaser.State {
    create() {
        this.background = this.add.sprite(0, 0, 'macbook')
        this.introText()

        // the text of the proposal
        this.proposalText = [
            "Multiple stellar populations at the centimetre-per-second level",
            "",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ]

        // load in first line of text
        this.line = []
        this.wordIndex = 0
        this.lineIndex = 0
        this.text = this.add.text(160, 140, '',
            { font: "14px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 470 })
        this.nextLine()

        // register spacebar presses
        let spacekey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        spacekey.onDown.add(this.nextWord, this)
    }

    nextLine() {
        if (this.lineIndex === this.proposalText.length) {
            return
        }
        this.line = this.proposalText[this.lineIndex].split(' ')
        this.wordIndex = 0
        this.lineIndex++
    }

    nextWord() {
        if (this.done == true) {
            return
        }
        if (this.wordIndex === this.line.length && this.lineIndex === this.proposalText.length) {
            this.wellDoneText()
            this.done = true
            return
        }
        this.text.text = this.text.text.concat(this.line[this.wordIndex] + ' ')
        this.wordIndex++
        if (this.wordIndex === this.line.length) {
            this.text.text = this.text.text.concat('\n')
            this.nextLine()
        }
    }

    introText() {
        new BigMessage(this.game, "WRITE A\nPROPOSAL!")
    }

    wellDoneText() {
        new BigMessage(this.game, "WE REGRET\nTO INFORM...")
        this.time.events.add(2000, this.nextStage, this)
    }

    nextStage() {
        this.state.start('CloseTheDome')
    }

}

export default WriteAProposal
