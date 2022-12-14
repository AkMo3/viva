(function($) {
    var slide = function(ele,options) {
        var $ele = $(ele);
        var setting = {
    
            speed: 1000,
            interval: 2000,
            
        };
        
        $.extend(true, setting, options);

        class stateRep {
            constructor(zin, width, height, top, left, $opacity) {
                this.zin = zin;   
                this.width = width;   
                this.height = height;   
                this.top = top;   
                this.left = left;   
                this.$opacity = $opacity;   
            }
        }
        
        var states = [
            new stateRep(1, 120 + 200, 150 + 30, 69, 134 + 130, 0.2),
            new stateRep(2, 130 + 200, 170 + 30, 59, 0 + 130, 0.4),
            new stateRep(3, 170 + 200, 218 + 30, 35, 110 + 130, 0.7),
            new stateRep(4, 224 + 200, 288 + 30, 0, 263 + 130, 1),
            new stateRep(3, 170 + 200, 218 + 30, 35, 470 + 130, 0.7),
            new stateRep(2, 130 + 200, 170 + 30, 59, 620 + 130, 0.4),
            new stateRep(1, 120 + 200, 150 + 30, 69, 500 + 130, 0.2)
        ];

        var $lis = $ele.find('li');
        var timer = null;

        
        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        
        function move() {
            $lis.each(function(index, element) {
                var stateR = states[index];
                if (stateR !== undefined) $(element).css('z-index', stateR.zin).finish().animate(stateR, setting.speed).find('img').css('opacity', stateR.$opacity);
            });
        }

        
        function next() {
            
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        
        return this;
    }
})(jQuery);
