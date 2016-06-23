import BigMessage from 'objects/BigMessage'

class FindGalaxies extends Phaser.State {
    create() {
        // Get widths and heights
        this.edgewidth = 100
        this.fullw = this.game.width
        this.w = this.fullw - this.edgewidth
        this.h = this.game.height

        // The background image is the Ultra Deep Field
        this.stage.backgroundColor = "#000000"
        this.hubble = this.add.sprite(0, 0, 'deepfield')

        // Draw an aperture over the field of view
        this.aperture = this.add.graphics(0, 0)
        this.aperture.beginFill(0xffffff)
        this.aperture.drawCircle(0, 0, 120)
        this.hubble.mask = this.aperture

        // Set the initial pointing
        let p = this.chooseRandomDestination()
        this.pointing = this.add.sprite(p.x, p.y)
        this.pointing.destination = p
        this.moveAperture()

        // Here are the points of interest that we need to find with our scope
        let targets = []
        let targets_x = this.w + (this.edgewidth - 100) / 2
        for (var i = 0; i < 6; i++) {
            name = "gal" + (i+1)
            let t = this.add.sprite(targets_x, i*100, name)
            targets.push(t)
        }
        this.targets = targets

        // Set the list of the actual x and y values we are targeting
        this.interesting_points = [
            new Phaser.Point(240, 52),
            new Phaser.Point(502, 57),
            new Phaser.Point(642, 452),
            new Phaser.Point(76, 325),
            new Phaser.Point(257, 243),
            new Phaser.Point(575, 349)
        ]

        // Move the pointing once every second
        this.physics.enable(this.pointing, Phaser.Physics.ARCADE)
        this.pointing.timer = this.time.create()
        this.pointing.timer.loop(1000, this.changePointing, this)
        this.pointing.timer.start()

        // register spacebar presses with the galaxy finder
        let spacekey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        spacekey.onDown.add(this.checkForHit, this)

        // text
        this.doIntroText()
    }

    doIntroText() {
        new BigMessage(this.game, "FIND THE\nGALAXIES!")
    }

    chooseRandomDestination() {
        let x = this.rnd.between(0, this.w)
        let y = this.rnd.between(0, this.h)
        return {x:x, y:y}
    }

    moveAperture() {
        this.aperture.x = this.pointing.x
        this.aperture.y = this.pointing.y
    }

    changePointing() {
        let numberOfTargetsRemaining = this.interesting_points.length
        let correctTarget = this.rnd.between(numberOfTargetsRemaining, 10)
        var dest
        if (numberOfTargetsRemaining == 0) {
            return
        } else if (correctTarget < 7) {
            dest = this.rnd.pick(this.interesting_points)
        } else {
            dest = this.chooseRandomDestination()
        }
        this.pointing.destination = dest
    }

    jumpPointing(destination) {
        this.pointing.x = destination.x
        this.pointing.y = destination.y
    }

    checkForHit() {
        var hitAttempt = new Phaser.Point(this.pointing.x, this.pointing.y)
        var distToHit = function (p) { Phaser.Point.distance(p, hitAttempt) }
        var distances = []
        for (let p of this.interesting_points) {
            let d = Phaser.Point.distance(p, hitAttempt)
            distances.push(d)
        }
        let min_distance = Math.min.apply(Math, distances)
        let closest_index = distances.indexOf(min_distance)
        let closest_point = this.interesting_points[closest_index]

        if (min_distance < 30) {
            this.showSuccess(hitAttempt)
            this.targets[closest_index].destroy()
            this.targets.splice(closest_index, 1)
            this.interesting_points.splice(closest_index, 1)
        } else {
            this.showFailure(hitAttempt)
        }
    }

    showSuccess(point) {
        var hitIndicator = this.add.graphics(point.x, point.y)
        let linear = Phaser.Easing.Linear.None
        hitIndicator.beginFill(0x93CC7F, 0.8)
        hitIndicator.drawCircle(0, 0, 120)
        this.add.tween(hitIndicator).to({alpha:0}, 800, linear, true)
        this.add.tween(hitIndicator.scale).to({x:1.5, y:1.5}, 800, linear, true)
    }

    showFailure(point) {
        var hitIndicator = this.add.sprite(point.x, point.y, 'nope')
        hitIndicator.anchor.set(0.5)
        let linear = Phaser.Easing.Linear.None
        this.add.tween(hitIndicator).to({alpha:0}, 800, linear, true)
        this.add.tween(hitIndicator.scale).to({x:1.5, y:1.5}, 800, linear, true)
    }

    update() {
        this.moveAperture()
        let dest = this.pointing.destination
        this.physics.arcade.moveToXY(this.pointing, dest.x, dest.y, 60, 300)

        if (this.targets.length == 0 && !this.done) {
            this.done = true
            let linear = Phaser.Easing.Linear.None
            this.aperture.destroy()
            this.wellDoneText()
        }
    }

    wellDoneText() {
        new BigMessage(this.game, "FIRST\nAUTHOR")
        this.time.events.add(2000, this.nextStage, this)
    }

    nextStage() {
        this.state.start('WriteAProposal')
    }
}

export default FindGalaxies
