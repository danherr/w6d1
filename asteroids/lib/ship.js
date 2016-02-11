(function () {
    var Asteroids = window.Asteroids = window.Asteroids || {};
    var MovingObject = Asteroids.MovingObject;

    var Ship = Asteroids.Ship = function (pos, game) {
        MovingObject.call(this, {
            pos: pos,
            vel: [0,0],
            radius: Ship.RADIUS,
            objectColor: Ship.COLOR,
            game: game
            
        });
        this.firing = 0;
        this.heading = [0 , 1]
    };

    Asteroids.Util.inherits(Ship, MovingObject);

    Ship.prototype.relocate = function () {
        this.pos = this.game.shipStartPosition();
        this.vel = [0,0];
        this.heading = [0,1];
    };

    Ship.prototype.power = function (impulse) {
        this.heading = Asteroids.Util.normalize(impulse);
        this.vel = Asteroids.Util.vecAdd(this.vel, impulse);
        this.firing = 5;
    };

    Ship.prototype.fireBullet = function (letter) {
        var heading = [0,-1];
        
        if (letter == 'a') {
            heading = [-1,0];
        } else if (letter === 's') {
            heading = [0,1];
        } else if (letter === 'd') {
            heading = [1,0];
        }
        

        this.game.bullets.push(new Asteroids.Bullet(this.pos, this.vel, this.game, heading));
        this.game.bullets.push(new Asteroids.Bullet(
            Asteroids.Util.vecAdd(this.pos, Asteroids.Util.normal(heading, 5)),
            this.vel,
            this.game,
            heading));
        this.game.bullets.push(new Asteroids.Bullet(
            Asteroids.Util.vecAdd(this.pos, Asteroids.Util.normal(heading, -5)),
            this.vel,
            this.game,
            heading));        
    };

    Ship.prototype.draw = function(ctx) {
        var heading = Asteroids.Util.direction(this.heading);
        var vertices = [0, 2.3, 3.92].map(function (angle) {
            return Asteroids.Util.vecAdd(
                this.pos,
                Asteroids.Util.transform(this.heading, angle, this.radius)
            );
        }.bind(this))

        ctx.lineWidth = 1;

        Asteroids.Util.drawPolygon(ctx, vertices, this.objectColor, this.strokeColor);

        ctx.lineWidth = 3;
        
        if (this.firing > 0) {

            ctx.strokeStyle = 'yellow';


            ctx.beginPath();
            ctx.arc(
                this.pos[0],
                this.pos[1],
                this.radius + 0.5,
                heading  - Math.PI - 0.5,
                heading  - Math.PI - 0.3,
                false
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(
                this.pos[0],
                this.pos[1],
                this.radius + 0.3,
                heading  - Math.PI + 0.5,
                heading  - Math.PI + 0.3,
                true
            );
            ctx.stroke();

            this.firing -= 1;
        }
    };

    Ship.RADIUS = 15;
    Ship.COLOR = 'blue';
    Ship.IMPULSE_SENSITIVITY = 2;

    Ship.prototype.left = function () {
        this.power([-1 * Ship.IMPULSE_SENSITIVITY,0]);
    };

    Ship.prototype.right = function () {
        this.power([1 * Ship.IMPULSE_SENSITIVITY,0]);
    };

    Ship.prototype.up = function () {
        this.power([0, -1 * Ship.IMPULSE_SENSITIVITY]);
    };

    Ship.prototype.down = function () {
        this.power([0, 1 * Ship.IMPULSE_SENSITIVITY]);
    };

    var AltShip = Asteroids.AltShip = function () {
        Ship.apply(this, arguments);
    };
    Asteroids.Util.inherits(AltShip, Ship);

    AltShip.TURNING_SENSITIVITY = 0.5;

    AltShip.prototype.left = function () {
        var direction = Asteroids.Util.direction(this.heading);
        direction = direction - AltShip.TURNING_SENSITIVITY;
        this.heading = Asteroids.Util.unitVec(direction);
    };

    AltShip.prototype.right = function () {
        var direction = Asteroids.Util.direction(this.heading);
        this.heading = Asteroids.Util.unitVec(direction + AltShip.TURNING_SENSITIVITY);
    };

    AltShip.prototype.up = function () {
        this.power(Asteroids.Util.scalerMult(this.heading, Ship.IMPULSE_SENSITIVITY));
    };

    AltShip.prototype.down = function () {
    };

    AltShip.prototype.fireBullet = function (letter) {
        var heading = this.heading
        
        this.game.bullets.push(new Asteroids.Bullet({
            pos: Asteroids.Util.vecAdd(this.pos, Asteroids.Util.scalerMult(heading, 6)),
            shipVel: this.vel,
            game: this.game,
            heading: heading
        }));
        this.game.bullets.push(new Asteroids.Bullet({
            pos: Asteroids.Util.vecAdd(this.pos, Asteroids.Util.normal(heading, 6)),
            shipVel: this.vel,
            game: this.game,
            heading: Asteroids.Util.rotate(heading, -0.2)
        }));        
        this.game.bullets.push(new Asteroids.Bullet({
            pos: Asteroids.Util.vecAdd(this.pos, Asteroids.Util.normal(heading, -6)),
            shipVel: this.vel,
            game: this.game,
            heading: Asteroids.Util.rotate(heading, 0.2)
        }));        
    };

    
})();
