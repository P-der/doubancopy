var $lunBo = function(style,list){
    function getStyle(dom,attr){
        if(dom.currentStyle){
            return dom.currentStyle[attr];
        }else{
            return window.getComputedStyle(dom,null)[attr];
        }
    }
    function startMove(dom, moveTarget, callBack){
        clearInterval(dom.timer);
        var iSpeed,iCur;        
        dom.timer = setInterval(function(){
            var bStop = true;
            for(var attr in moveTarget){
                if(attr==='opacity'){
                    iCur = parseFloat(getStyle(dom, 'opacity'))*100;
                }else{
                    iCur = parseInt(getStyle(dom,attr));
                }
                iSpeed = (moveTarget[attr] - iCur)/7;
                iSpeed = iSpeed > 0? Math.ceil(iSpeed):Math.floor(iSpeed);
                
                if(attr === 'opacity'){
                    dom.style.opacity = (iCur + iSpeed)/100;		
                }else{
                    dom.style[attr] = iCur + iSpeed +'px';
                }
                if(moveTarget[attr] !=iCur){
                    bStop = false;
                }
            }
            if(bStop){
                clearInterval(dom.timer);
                callBack.call(dom); 
            }
        },30);
    }
    function autoMove (direction) {
        if(locked){
            locked = false;
            clearTimeout(delayTimer);
                if(direction == undefined || direction == 1){
                    index++;
                    startMove(oSliderPage, {left: oSliderPage.offsetLeft - moveWidth}, function() {
                        if(oSliderPage.offsetLeft === -num * moveWidth){
                        oSliderPage.style.left = '0px';
                        index = 0;
                    }
                    delayTimer = setTimeout(autoMove, 1500);
                    locked = true;
                    changeIndex(index);
                    })
                }else if(direction === -1){
                    if(oSliderPage.offsetLeft === 0){
                        oSliderPage.style.left = -num * moveWidth + 'px';
                        index = num;				
                    }	
                    index--;
                    startMove( oSliderPage, {left: oSliderPage.offsetLeft + moveWidth},function(){
                    delayTimer = setTimeout(autoMove,1500);
                    locked = true;
                        changeIndex(index);
                })
            }
        }
        
    }
    function changeIndex (index){
        for(var i = 0 ; i< num; i++){
            oSpanArray[i].style.backgroundColor = '#fff'
        }
            oSpanArray[index].style.backgroundColor = 'red'
    }
    function clone(style,origin){
        for( attr in origin){
            style[attr]  = origin[attr];
        }
    }
    const {num,moveWidth,height} = style;
    
    // var moveWidth = style['width'];
    var locked = true;
    var index = 0;
    var delayTimer = null;
    var domF = document.createDocumentFragment();
    var wapper = document.createElement('div');
    var oSliderPage = document.createElement('ul');
    var oSliderIndex = document.createElement('div');
    var oBtnLeft = document.createElement('div');
    var oBtnRight = document.createElement('div');
    clone(wapper.style,{
        width: moveWidth + 'px',
        height: height + 'px',
		overflow: 'hidden',
		position: 'relative'
    })
    clone(oSliderPage.style,{
        position: 'absolute',
		left: '0px',
		top: '0px',
		width: (num+1)*moveWidth + 'px',
		height: height + 'px'
    })
    clone(oBtnLeft.style,{
        width: '26px',
		height: '26px',
		background: '#000',
		color: '#f40',
		position: 'absolute',
		top: '50%',
		marginTop: '-13px',
		textAlign: 'center',
		lineHeight:'6px',
		opacity: '0.2',
        cursor: 'pointer',
        left: '20px'
    })
    clone(oBtnRight.style,{
        width: '26px',
		height: '26px',
		background: '#000',
		color: '#f40',
		position: 'absolute',
		top: '50%',
		marginTop: '-13px',
		textAlign: 'center',
		lineHeight:'6px',
		opacity: '0.2',
        cursor: 'pointer',
        right: '20px'
    })
    clone(oSliderIndex.style,{
        position: 'absolute',
		width: '100%',
		height: '20px',
		bottom: '0px',
		textAlign: 'center'
    })
    for(let i=0;i<num;i++){
        var img = document.createElement('img');
        clone(img.style,{
            width: '100%',
		    height: '100%'
        })
        img.src = list[i];
        var oli = document.createElement('li');
        clone(oli.style,{
            width: moveWidth+'px',
            height: height +'px',
            float: 'left'
        })
        oli.appendChild(img);
        var span = document.createElement('span');
        clone(span.style,{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            background: '#ddd',
            borderRadius: '50%',
            marginRight: '3px',
            cursor: 'pointer'
        })
        // span.onclick = function (){
        //     locked = false;
        //     clearTimeout(delayTimer);
        //     index = i;
        //     startMove(oSliderPage, {left: -index*moveWidth},function (){
        //         locked = true;
        //         delayTimer = setTimeout(autoMove,1500);                    
        //         changeIndex(index);
        //     })
        // }
        if(i==0){
            span.style.backgroundColor = 'red';
        }
        oSliderPage.appendChild(oli);
        oSliderIndex.appendChild(span);
    }
    var img = document.createElement('img');
    clone(img.style,{
        width: '100%',
        height: '100%'
    })
    img.src = list[0];
    var oli = document.createElement('li');
        clone(oli.style,{
            width: moveWidth+'px',
            height: height +'px',
            float: 'left'
        })
        oli.appendChild(img);
    oSliderPage.appendChild(oli);
    wapper.appendChild(oSliderPage);
    wapper.appendChild(oBtnLeft);
    wapper.appendChild(oBtnRight);
    wapper.appendChild(oSliderIndex);

    domF.appendChild(wapper);
    var oSpanArray = oSliderIndex.children;
        for( var i = 0; i< num; i ++){
            oSpanArray[i].onclick = (function (clickIndex){
                return function (){
                    locked = false;
                    clearTimeout(delayTimer);
                    index = clickIndex;
                   
                    startMove(oSliderPage, {left: -index*moveWidth},function (){
                        
                        locked = true;
                        delayTimer = setTimeout(autoMove,1500);
                        changeIndex(index);
                    })
                }
            }(i))
        }
        oBtnLeft.onmousemove = function(){
            oBtnLeft.style.opacity = 0.8;
        }
        oBtnLeft.onmouseout = function(){
            oBtnLeft.style.opacity = 0.2;
        }
        oBtnRight.onmousemove = function(){
            oBtnRight.style.opacity = 0.8;
        }
        oBtnRight.onmouseout = function(){
            oBtnRight.style.opacity = 0.2;
        }
        oBtnLeft.onclick = function(){
            autoMove(-1);
        }
        oBtnRight.onclick = function(){
            autoMove(1);
        }  

    var start = function(){
  
        delayTimer = setTimeout(autoMove, 1500);
    }
    return {
        domF,
        start
    }
}


