var oScope = $('.inputF>input'),
    oSearch = $('.searchlist').eq(0);
    oSubmit = $('.inputL>input');
var event;
$("form").on("submit",function(event){//阻止form默认事件防止刷新页面
        event.preventDefault();
})
oScope.on('keyup',function(e){
    console.log(e.key)
    if(e.key == 'Enter'){
        console.log(1)
    }else{
        if(oScope.val()!==''){
            console.log(oScope.val())
            $.ajax({
                type:'GET',
                url:'https://api.douban.com/v2/music/search?q='+oScope.val(),
                dataType:'jsonp',    
                success:function(data){
                    callBack(data);
                }
            })
        }
        
    }
    return false;
})
$('body').on('click',function(e){
    if(e.target.tagName!=='INPUT'){
        oSearch.css({display:'none'});
    }
})
function tool(arr1,arr2){
    var str1 = arr1['attrs']['pubdate'][0]||'';
    arr1 = str1.split('-');
    var str2 = arr2['attrs']['pubdate'][0]||'';
    arr2 = str2.split('-');
    return (arr2[0]-arr1[0])||(arr2[1]-arr1[1])||(arr2[3]-arr1[3]);
}
function callBack(data){
    var musics = data['musics'];
    // musics.sort(function(a,b){
    //     return tool(a,b)
    // })
    console.log(musics)
    var need = musics.slice(0,7);
    var oA = $('.searchlist a');
    var oImg = $('.searchlist img');
    var oEm = $('.searchlist em');
    var oSpan = $('.searchlist span');
    for(let i = 0;i<7;i++){
        oA.eq(i).attr({'href':(need[i]['alt']||'')});
        oImg.eq(i).attr({'src':need[i]['image']||''});
        oEm.eq(i).html(need[i]['attrs']['title'][0]||'');
        oSpan.eq(i).html(need[i]['attrs']['media']||'');
    }
    var st = oScope.offset();
    st.top+=30;
    oSearch.css({'display':'block'}).css(st)
    console.log(musics)
}
var s;