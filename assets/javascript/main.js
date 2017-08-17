$(document).ready(function() {
    var $layer, $logo;
    $logo = $('.logo');
    $layer = $('div[class*="layer-"]');
    $(window).on('mousemove', function(e) {
        var angle, dx, dy, h, offsetPoster, offsetX, offsetY, theta, transformPoster, w;
        w = $(window).width();
        h = $(window).height();
        offsetX = 0.5 - e.pageX / w;
        offsetY = 0.5 - e.pageY / h;
        offsetPoster = $logo.data('offset');
        transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)';
        dy = e.pageY - h / 2;
        dx = e.pageX - w / 2;
        theta = Math.atan2(dy, dx);
        angle = theta * 180 / Math.PI;
        if (angle < 0) {
            angle = angle + 360;
        }
        $logo.css('transform', transformPoster);
        return $layer.each(function() {
            var $this, offsetLayer, transformLayer;
            $this = $(this);
            offsetLayer = $this.data('offset') || 0;
            transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
            return $this.css('transform', transformLayer);
        });
    });
    var designDrawing = anime({
        targets: '#subtitle__designDrawing .lines path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: function(el, i) {
            return i * 250
        },
        direction: 'alternate',
        loop: false,
    });
    $(".subtitle__design").hover(function() {
        window.mytimeout = setTimeout(function() {
            var designDrawing = anime({
                targets: '#subtitle__designDrawing .lines path',
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 1500,
                delay: function(el, i) {
                    return i * 250
                },
                direction: 'alternate',
                loop: false,
            });
        }, 400);
    }, function() {
        clearTimeout(window.mytimeout);
    });
    consoleText(['Code'], 'codeText', ['#15988B']);

    function consoleText(words, id, colors) {
        if (colors === undefined) colors = ['#fff'];
        var visible = true;
        var con = document.getElementById('codeConsole');
        var letterCount = 1;
        var heartCount = 0;
        var x = 1;
        var waiting = false;
        var target = document.getElementById(id)
        target.setAttribute('style', 'color:' + colors[0])
        $(".subtitle__code").mouseenter(function() {
            window.mytimeout = setTimeout(function() {
                var heartCount = 0;
                var letterCount = 1;
                window.setInterval(function() {
                    if (heartCount < 4) {
                        if (letterCount === 0 && waiting === false) {
                            heartCount = heartCount + 1;
                            waiting = true;
                            target.innerHTML = words[0].substring(0, letterCount)
                            window.setTimeout(function() {
                                var usedColor = colors.shift();
                                colors.push(usedColor);
                                var usedWord = words.shift();
                                words.push(usedWord);
                                x = 1;
                                target.setAttribute('style', 'color:' + colors[0])
                                letterCount += x;
                                waiting = false;
                            }, 330)
                        } else if (letterCount === words[0].length + 1 && waiting === false) {
                            heartCount = heartCount + 1;
                            waiting = true;
                            window.setTimeout(function() {
                                x = -1;
                                letterCount += x;
                                waiting = false;
                            }, 330)
                        } else if (waiting === false) {
                            heartCount = heartCount + 1;
                            target.innerHTML = words[0].substring(0, letterCount)
                            letterCount += x;
                        }
                    }
                }, 330);
            }, 400);
        });
        window.setInterval(function() {
            if (heartCount < 4) {
                if (letterCount === 0 && waiting === false) {
                    heartCount = heartCount + 1;
                    waiting = true;
                    target.innerHTML = words[0].substring(0, letterCount)
                    window.setTimeout(function() {
                        var usedColor = colors.shift();
                        colors.push(usedColor);
                        var usedWord = words.shift();
                        words.push(usedWord);
                        x = 1;
                        target.setAttribute('style', 'color:' + colors[0])
                        letterCount += x;
                        waiting = false;
                    }, 330)
                } else if (letterCount === words[0].length + 1 && waiting === false) {
                    heartCount = heartCount + 1;
                    waiting = true;
                    window.setTimeout(function() {
                        x = -1;
                        letterCount += x;
                        waiting = false;
                    }, 330)
                } else if (waiting === false) {
                    heartCount = heartCount + 1;
                    target.innerHTML = words[0].substring(0, letterCount)
                    letterCount += x;
                }
            }
        }, 330)
        window.setInterval(function() {
            if (visible === true) {
                con.className = 'console-underscore hidden'
                visible = false;
            } else {
                con.className = 'console-underscore'
                visible = true;
            }
        }, 400)
    }
});