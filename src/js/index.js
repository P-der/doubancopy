var oStyle = {
    moveWidth:675,
    height:250,
    num:5
},
oList = ['https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2690.jpg',
        'https://img1.doubanio.com/view/music_index_banner/raw/public/banner-2697.jpg',
        'https://img1.doubanio.com/view/music_index_banner/raw/public/banner-2698.jpg',
        'https://img1.doubanio.com/view/music_index_banner/raw/public/banner-2699.jpg',
        'https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2693.jpg'
        ];
var oLun = $lunBo(oStyle,oList);
var oSlideshow = document.getElementById('slideshow');

oSlideshow.removeChild(oSlideshow.children[0]);
oSlideshow.appendChild(oLun.domF);
oLun.start();