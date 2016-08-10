import BigMessage from 'objects/BigMessage'

class WriteAProposal extends Phaser.State {
    create() {
        this.background = this.add.sprite(0, 0, 'macbook')
        this.introText()

        // the text of the proposal
        this.proposalText = [
            "Multiple stellar populations at the centimetre-per-second level",
            "",
            "Obtaining a stable transiting planet plays a crucial role in the scatter and evolution of mass distribution. In this paper, we extend the description for the distribution of the dark matter (DM) time scale and measure the separation between interferometric, full-polarisation observations. We first provide an overview of sub-Saturns (0.18MJ < Mp < 0.3MJ) and super-Neptunes (0.05MJ < Mp < 0.18MJ). This approach is unable to describe haloes with larger spin or with fewer filaments."
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
