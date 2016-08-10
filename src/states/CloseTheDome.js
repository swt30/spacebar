import BigMessage from 'objects/BigMessage'
import Cloud from 'objects/Cloud'
import Raindrop from 'objects/Raindrop'
import Dismay from 'objects/Dismay'

class CloseTheDome extends Phaser.State {
    create() {
        this.add.sprite(0, 0, 'dome')
        this.introText()

        // make the people and the dome
        this.people = this.add.sprite(237, 506, 'people-cutout')
        this.dome = this.add.sprite(542, 441, 'dome-cutout')
        this.physics.arcade.enable([this.people, this.dome])
        this.people.body.immovable = true
        this.dome.body.immovable = true

        // make the umbrellas
        this.umbrellas = this.add.group()
        this.umbrellas.create(200, 470, 'umbrella')
        this.umbrellas.create(220, 480, 'umbrella')
        this.umbrellas.create(250, 465, 'umbrella')
        this.umbrellas.create(295, 475, 'umbrella')
        this.umbrellas.create(340, 495, 'umbrella')
        this.umbrellas.create(390, 475, 'umbrella')
        this.umbrellas.alpha = 0
        this.umbrellas.defaulty = this.umbrellas.y

        // make the closed dome
        this.closedDome = this.add.sprite(this.game.width, this.game.height, 'dome-closed')
        this.closedDome.anchor.set(1)
        this.closedDome.alpha = 0

        // make a group to hold the raindrops
        this.raindrops = this.add.group()

        // register spacebar presses
        let spacekey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        spacekey.onDown.add(this.closeUp, this)
        spacekey.onUp.add(this.openUp, this)

        // start adding clouds
        this.clouds = this.add.group()
        this.addCloud()

        // add the target list
        let style1 = { font: "bold 14pt Arial", fill: "#fff", align: "left" }
        this.add.text(10, 10, "TARGET LIST:", style1)
        this.targetNumber = 1
        this.addTarget()
        this.currentTargetProgress = 0
    }

    addTarget() {
        if (this.done) { return }
        if (this.targetNumber == 8) {
            this.wellDoneText()
            this.done = true
        }
        let style2 = { font: "bold 20pt Arial", fill: "#bbb", align: "left" }
        this.currentTarget = this.randomTarget()
        this.add.text(30, 40*this.targetNumber, this.currentTarget, style2)
        this.targetNumber++
    }

    addCloud() {
        let cloudHeight = this.rnd.between(0, 150)
        let cloudSize = this.rnd.realInRange(1.3, 1/1.3)
        let cloudSpeed = this.rnd.between(2, 5)
        let cloud = new Cloud(this.game, -200, cloudHeight, cloudSize, cloudSpeed)
        this.clouds.add(cloud)

        let nextCloud = this.rnd.between(1000, 4000)
        this.time.events.add(nextCloud, this.addCloud, this)
    }

    introText() {
        new BigMessage(this.game, "KEEP THE\nDOME DRY!")
    }

    closeUp() {
        let linear = Phaser.Easing.Linear.None
        let y = this.umbrellas.defaulty
        this.add.tween(this.umbrellas).to({alpha: 1, y: y-20}, 200, linear, true)
        this.add.tween(this.closedDome).to({alpha: 1}, 200, linear, true)
    }

    openUp() {
        let linear = Phaser.Easing.Linear.None
        let y = this.umbrellas.defaulty
        this.add.tween(this.umbrellas).to({alpha: 0, y: y}, 200, linear, true)
        this.add.tween(this.closedDome).to({alpha: 0}, 200, linear, true)
    }

    areUmbrellasUp() {
        return (this.umbrellas.alpha > 0.5)
    }

    update() {
        this.physics.arcade.overlap(this.raindrops, this.people, this.rain_on_people, null, this)
        this.physics.arcade.overlap(this.raindrops, this.dome, this.rain_in_dome, null, this)
        if (!this.areUmbrellasUp()) {
            this.currentTargetProgress++
        }
        if (this.currentTargetProgress > 150 && !this.done) {
            this.addTarget()
            this.currentTargetProgress = 0
        }
    }

    rain_on_people(people, raindrop) {
        let options = ['dismay', 'surprise', 'shock']
        let dismayType = this.game.rnd.pick(options)
        if (!this.areUmbrellasUp()) {
            new Dismay(this.game, raindrop.x, raindrop.y, dismayType)
        }
        raindrop.kill()
    }

    rain_in_dome(dome, raindrop) {
        let options = ['dismay', 'surprise', 'shock']
        let dismayType = this.game.rnd.pick(options)
        if (!this.areUmbrellasUp()) {
            new Dismay(this.game, raindrop.x, raindrop.y, dismayType)
        }
        raindrop.kill()
    }

    randomTarget() {
        let rand = this.game.rnd.between(0, 99)
        if (rand < 30) { return this.randomKeplerName() }
        if (rand < 60) { return this.randomSimpleCatalogue() }
        if (rand < 90) { return this.randomStar() }
        if (rand < 100) { return this.randomSNe() }
    }

    randomKeplerName() {
        let prefix = "Kepler"
        let number = this.game.rnd.between(1, 3000).toString()
        let postfixes = ["A", "B", "b", "c", "d", "e", "f"]
        let postfix = this.game.rnd.pick(postfixes)
        return prefix + " " + number + postfix
    }

    randomSimpleCatalogue() {
        let prefixes = ["NGC", "KOI", "Abell", "Messier"]
        let prefix = this.game.rnd.pick(prefixes)
        let number = this.game.rnd.between(1, 5000).toString()
        return prefix + " " + number
    }

    randomSNe() {
        let prefix = "SN"
        let year = this.game.rnd.between(1960, 2020).toString()
        let letters = ["a", "b", "c"]
        let letter = this.game.rnd.pick(letters)
        return prefix + " " + year + letter
    }

    randomStar() {
        let greekLetters = ["α", "β", "γ", "δ", "ϵ"]
        let constellations = ["Andromedae", "Boötis", "Camelopardalis",
                              "Cancri", "Carinae", "Ceti", "Crucis",
                              "Doradus", "Draconis", "Eridani", "Hydrae",
                              "Leonis", "Lyrae", "Muscae", "Orionis",
                              "Persei", "Scuti", "Tucanae", "Velorum"]
        let letter = this.game.rnd.pick(greekLetters)
        let constellation = this.game.rnd.pick(constellations)
        return letter + " " + constellation
    }

    wellDoneText() {
        new BigMessage(this.game, "CAN'T WAIT\nTO REDUCE\nTHIS")
        this.time.events.add(2000, this.nextStage, this)
    }

    nextStage() {

    }
}

export default CloseTheDome
