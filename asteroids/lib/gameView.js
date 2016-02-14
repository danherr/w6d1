(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

    var GameView = Asteroids.GameView =  function (game, ctx, menu) {
        this.game = game;
        this.ctx = ctx;
        this.unPaused = true;
        this.menu = menu;
    };

    GameView.prototype.start = function () {
        this.game.addInitialAsteroids();
        this.bindKeyHandlers();
        setInterval(function() {
            if (this.unPaused) {
                this.game.draw(this.ctx);
                this.game.step();
            }
        }.bind(this), 40);
    };

  GameView.IMPULSE_SENSITIVITY = 2;

    GameView.prototype.togglePause = function () {
        this.unPaused = !this.unPaused;
        $(".instruction").empty();
        if (this.unPaused) {
            $(".instr-lr").append(" Left and Right to Turn ");
            $(".instr-ud").append(" Up to move ");
            $(".instr-shoot").append(" Space or W to Shoot ");
            $(".instr-pause").append(" P to Pause ");
            $(".instr-general").append(" Upgrade to Survive ");
            $(".instr-Jonathan").append(" You Can Do It! ");
        } else {
            $(".instr-lr").append(" Arrows navigate the Menus ");
            $(".instr-ud").append(" Space to Buy Something ");
            $(".instr-shoot").append(" E to Equip ");
            $(".instr-pause").append(" U to Unequip ");
            $(".instr-general").append(" P to Unpause ");
            $(".instr-Jonathan").append(" You Can Do It! ");
        }
    }
    
    GameView.prototype.bindKeyHandlers = function () {
        var ship = this.game.ship;
        
        key('left', function () {
            if (this.unPaused) {
               ship.left();
            } else {
                this.menu.left();
            }
        }.bind(this));
        
        key('right', function () {
            if (this.unPaused) {
               ship.right();
            } else {
                this.menu.right();
            }
        }.bind(this));
        
        key('up', function () {
            if (this.unPaused) {
               ship.up();
            } else {
                this.menu.up();
            }
        }.bind(this));
        
        key('down', function () {
            if (this.unPaused) {
               ship.down();
            } else {
                menu.down();
            }
        }.bind(this));
        
        key('w', function (){
            if (this.unPaused) {
                ship.fireBullet('w');
            } else {
                this.menu.select();
            }
        }.bind(this));
        
        key('space', function (){
            if (this.unPaused) {
                ship.fireBullet('w');
            } else {
                this.menu.buy();
            }
        }.bind(this));
        
        key('a', function (){
            if (this.unPaused) {
                ship.fireBullet('a');
            } else {
                this.menu.select();
            }
        }.bind(this));
        
        key('s', function (){
            if (this.unPaused) {
                ship.fireBullet('s');
            } else {
                this.menu.select();
            }
        }.bind(this));
        
        key('d', function (){
            if (this.unPaused) {
                ship.fireBullet('d');
            } else {
                this.menu.buy();
            }
        }.bind(this));
        
        key('p', function () {
            this.togglePause();
        }.bind(this));

        key('e', function () {
            if (!this.unPaused) {
                this.menu.equip();
            };
        }.bind(this));
    
        key('u', function () {
            if (!this.unPaused) {
                this.menu.unEquip();
            };
        }.bind(this));
    };
    
    
})();
