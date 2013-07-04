(function () {
    'use strict';

    var walkClasses = 'wleft3 wleft2 wleft1 wleft0'.split(' '), // classes that position sprite background
        idleClasses = 'idle0 idle1 idle2 idle3 idle4 idle5'.split(' '),

        goButton    = document.getElementById('go'),
        running     = !!0,
        walkSprite,
        idleSprite,
        animate,


    // request animation frame polyfill .......................................
    requestFrame = (function (w,  suffix) {
        return  w['webkitR' + suffix] ||
                w['r'       + suffix] ||
                w['mozR'    + suffix] ||
                w['msR'     + suffix] ||
                w['oR'      + suffix] ||

                // if request animation frame not available polyfill with setTimeout
                function (cb) {
                    setTimeout(cb, 1000 / 30);
                };
    })(window, 'equestAnimationFrame'),


    // className based animation class ........................................
    SpriteSheet = (function () {
        var f = function (elementId, animationClassnames, updateInterval) {
            this.host = document.getElementById(elementId);
            this.classes = animationClassnames || [];
            this.updateInterval = updateInterval || 100;
            this.frame = 0;
            this.lastUpdate = 0;
        };

        f.prototype = {

            advance: function () {
                var now = + new Date(),
                    elapsed = -this.lastUpdate + now;

                // if time elapsed since last update greater than frame updateInterval
                if (elapsed > this.updateInterval) {
                    this.host.className = this.classes[this.frame];
                    this.frame = (this.frame + 1) % this.classes.length;
                    this.lastUpdate = now;
                }
            }
        };
        return f;
    })();

    // update idle animation every 150ms
    idleSprite = new SpriteSheet('idle', idleClasses, 150);

    // update walk animation every 90ms
    walkSprite = new SpriteSheet('walk', walkClasses, 90);

    animate = function () {
        idleSprite.advance();
        walkSprite.advance();

        if (running) {
            requestFrame(animate);
        }
    };

    goButton.onclick = function () {
        running = !running;

        if (running) {
            animate();
            this.innerText = 'Stop';
        } else {
            this.innerText = 'Go';
        }
    };
}());
