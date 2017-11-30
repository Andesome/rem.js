(function flexible (window, document) {

    var config = {
        isLog:true,         //是否打印日志
    }
    function log() {
        if(config.isLog){
            console.log.apply(console,arguments)
        }
    }

    var docEl = document.documentElement
    var isAndroid = window.navigator.appVersion.match(/android/gi);
    var isIPhone = window.navigator.appVersion.match(/iphone/gi);
    var dpr;
    if(isIPhone){
        dpr = window.devicePixelRatio;
    }else{
        dpr = 1;
    }

    // adjust body font size
    function setBodyFontSize () {
        log("dpr:",dpr);
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        }
        else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    //set body height
    function setBodyHeight(minWidth) {
        if (document.body) {
            var winHeight = window.innerHeight || document.body.clientHeight;
            minWidth = minWidth?minWidth:1200;
            if(docEl.clientWidth < minWidth){
                document.body.style.height = "auto";
                docEl.style.overflow = "auto";
            }else{
                document.body.style.height = winHeight + "px";
                docEl.style.overflow = "hidden";
            }
            log("change height",winHeight)
        }
    }
    setBodyHeight()

    // set 1rem = viewWidth / 10
    function setRemUnit (minWidth) {
        minWidth = minWidth?minWidth:1200;
        var bodyWidth = (docEl.clientWidth < minWidth)?minWidth:docEl.clientWidth;

        var rem = bodyWidth / 10;
        docEl.style.fontSize = rem + 'px';

    }

    setRemUnit()

    // reset rem unit on page resize
    window.addEventListener('resize', function () {
        setRemUnit();
        setBodyHeight();
    })

    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))
