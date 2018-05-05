export  function lazyLoad(){
    var clock;
    function init() {
        $(window).on("scroll", function () {
            if (clock) {
                clearTimeout(clock);
            }
            clock = setTimeout(function () {
                checkShow();
            }, 100);
        })
        checkShow();
    }
    function checkShow() {
        $(".lazyload img").each(function () {
            var $cur = $(this);
            if ($cur.attr('isLoaded')) {
                return;
            }
            if (shouldShow($cur)) {
                showImg($cur);
            }
        })
    }
    function shouldShow($node) {
        var scrollH = $(window).scrollTop(),
            winH = $(window).height(),
            top = $node.offset().top;
        if (top < winH + scrollH) {
            return true;
        } else {
            return false;
        }
    }
    function showImg($node) {
        $node.attr('src', $node.attr('data-img'));
        $node.attr('isLoaded', true);
    }
    return {
        init
    }
}