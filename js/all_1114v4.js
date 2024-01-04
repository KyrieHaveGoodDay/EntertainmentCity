gsap.registerPlugin(ScrollTrigger);

let mainView = $(window).width();

$(window).on('load', function () {
  $('.loading_mask').fadeOut(500)

  // loadData(IndexBlock);
  AOS.init();
  // 啟動輪播

  if (mainView >= 768) {
    slotPc2560(132)
    stripAni()
    eyeSl()
    peopleAni()
    swiperPC()

    setInterval(()=>{
      peopleAni()
    },10000)
  } else {
    slotPc2560(136)
    swiperMB()

  }
 


})
function loadData(datas) {
  console.log(datas);

  // 選單144

  // mainPD(datas, 0, '.hit_main .swiper-wrapper')
  // mainPdPic(datas, 1, '.hit_dot .swiper-wrapper')
  if (mainView >= 768) {
    // plusfun(datas, 2, '.avtivity', 1, 3)
  } else {
    // plusfun(datas, 2, '.activityMbTop', 2, 2)
    // plusfun(datas, 2, '.activityMbBtn', 1, 1)
    // plusfun(datas, 2, '.activityMbBtn', 3, 3)
  }
  // plusfun(datas, 3, '.featured', 1, 8)
  // bookmark(datas, 4, '#myTab', 1, 5)
  // bookmarkPD(datas, 5, '#home', 1, 8)
  // bookmarkPD(datas, 6, '#profile', 1, 8)
  // bookmarkPD(datas, 7, '#contact', 1, 8)
  // bookmarkPD(datas, 8, '#bookmark1', 1, 8)
  // bookmarkPD(datas, 9, '#bookmark2', 1, 8)
  // plusfun(datas, 10, '.main_bank', 1, 4)

  // 頁籤一開始顯示的對象
  $('#home-tab1').addClass('active')
  // 亂數連結
  // randomSlot(datas, 11)
  // 版身商品
  // ProductTemplate(datas, 12, '#pd1 .pd-list', 'pdbgBlue.png')
  // ProductTemplate(datas, 13, '#pd2 .pd-list', 'pdbgGreen.png')
  // ProductTemplate(datas, 14, '#pd3 .pd-list', 'pdbgBlue.png')
  // ProductTemplate(datas, 15, '#pd4 .pd-list', 'pdbgGreen.png')
  // ProductTemplate(datas, 16, '#pd5 .pd-list', 'pdbgBlue.png')



  // 選單
  // menuData(datas, 17)











}





// 選單
function menuData(data, id) {
  let menu = data[id];
  let str = ''
  let str2 = ''
  let str3 = ''
  let str4 = ''
  // 大圖
  str = `
  <a href="${menu.Nodes[1].Link.Url}" target="_blank">
    <img src="${menu.Nodes[1].Img.Src}" alt="">
  </a>
  
  `
  $('.left-nav__img').append(str)

  // 選單中間的聯結
  for (let i = 5; i <= 19; i++) {
    if (!menu.Nodes[i].Link.Text == "") {
      str2 = `
      <li>
        <a href="${menu.Nodes[i].Link.Url}" target="_blank">${menu.Nodes[i].Link.Text}</a>
      </li>
    `
      $('.left-nav__list').append(str2)
    }

  }


  // 小米 apple app獨享
  for (let i = 20; i <= 22; i++) {
    // console.log(i);
    if (!menu.Nodes[i].Link.Text == "") {
      str3 = `
     <li class="flagship">
     <a href="${menu.Nodes[i].Link.Url}" class="flagship${i}" target="_blank">
       ${menu.Nodes[i].Link.Text}
     </a>
   </li>
    `
      $('.left-nav__list').append(str3)
    }

  }

  // 回主會場連結
  $('.left-nav__back').attr('href', menu.Nodes[1].Link.Url)
  $('#mainHr').attr('href', menu.Nodes[1].Link.Url)



  // 手機版選單
  for (let i = 5; i <= 22; i++) {
    if (!menu.Nodes[i].Link.Text == "") {
      str4 = `
      <li>
        <a href="${menu.Nodes[i].Link.Url}" target="_blank">${menu.Nodes[i].Link.Text}</a>
      </li>
      `
      $('.board1 ul').append(str4)
    }

  }

}
// 輪播模板
function mainPD(data, id, divID) {
  let str = ''
  let pdData = data[id]

  for (let i = 1; i <= 8; i++) {
    if (!pdData.Nodes[i].Img.Src == '') {
      str = `
      <div class="swiper-slide">
        <a href="${pdData.Nodes[i].Link.Url}" target="_blank">
          <img class="imgHover" src="${pdData.Nodes[i].Img.Src}" alt="">
        </a>
      </div>
      `
      $(divID).append(str)
    }


  }
}
// 輪播模板-小圖
function mainPdPic(data, id, divID) {
  let str = ''
  let pdData = data[id]

  for (let i = 1; i <= 8; i++) {
    if (!pdData.Nodes[i].Img.Src == '') {
      str = `
      <div class="swiper-slide">
      <img src="${pdData.Nodes[i].Img.Src}" />
    </div>
          
     
      `
      $(divID).append(str)
    }


  }
}
// 活動
function plusfun(data, id, divID, star, end) {
  let pdData = data[id]
  let str = ''

  for (let i = star; i <= end; i++) {
    if (!pdData.Nodes[i].Img.Src == '') {
      str = `
      <div class="plus-item imgPicBtnHover">
        <a href="${pdData.Nodes[i].Link.Url}" target="_blank">
          <img src="${pdData.Nodes[i].Img.Src}" alt="">
        </a>
      </div> 
    `
      $(divID).append(str)
    }


  }
}
// 頁籤
function bookmark(data, id, divID, star, end) {
  let pdData = data[id]
  let str = ''

  for (let i = star; i <= end; i++) {
    if (!pdData.Nodes[i].Img.Src == '') {
      str = `
      <li class="nav-item" role="presentation">
      <img class="nav-link " id="home-tab${i}" data-toggle="tab" data-target="#${pdData.Nodes[i].Link.Text}" type="button" role="tab" aria-controls="${pdData.Nodes[i].Link.Text}" aria-selected="false" src="${pdData.Nodes[i].Img.Src}" alt="">
    </li>
    `
      $(divID).append(str)
    }


  }
}
// 頁籤商品
function bookmarkPD(data, id, divID, star, end) {
  let pdData = data[id]
  let str = ''

  for (let i = star; i <= end; i++) {
    if (!pdData.Nodes[i].Img.Src == '') {
      str = `
      
      <div class="pds imgPicHover">
        <a href="${pdData.Nodes[i].Link.Url}"  target="_blank">
          <div class="hotline">
            <p>"${pdData.Nodes[i].Link.Text2}"</p>
          </div>
          <div class="pd-img">
            <img src="${pdData.Nodes[i].Img.Src}" alt="">
          </div>
          <div class="pd-title">"${pdData.Nodes[i].Link.Text}"</div>
          <div class="pd-pric"><span>NT.</span>${pdData.Nodes[i].Link.Text1}</div>

        </a>
      </div>

    `
      $('' + divID + ' .pdBox .pdList').append(str)
    }


  }
}

// 商品模板4欄
function ProductTemplate(data, id, divID, bgimg) {
  let pdData = data[id]
  let str = ''





  for (let i = 1; i <= 8; i++) {
    if (!pdData.Nodes[i].Img.Src == '') {

      str = `
        <div class="product imgHoverBig" style="background-image:url(img/${bgimg});">
            <a href="${pdData.Nodes[i].Link.Url}" target="_blank">
              <div class="productHotline">${pdData.Nodes[i].Link.Text2}</div>
              <img src="${pdData.Nodes[i].Img.Src}" alt="">
              <div class="productTitle">${pdData.Nodes[i].Link.Text}</div>
              
              <div class="productPric">
                <span>NT.</span>
                <i>${pdData.Nodes[i].Link.Text1}</i>
              </div>
            </a>
          </div>


             `


      $(divID).append(str)
    }

  }




}


// 商品模板4欄
function PDtemplate(data, id, divID, star, end) {
  let pdData = data[id]
  let str = ''




  if (pdData.Nodes[1].Img.Title == '') {
    for (let i = star; i <= end; i++) {
      if (!pdData.Nodes[i].Img.Src == '') {
        if (pdData.Nodes[i].Link.Text3 == '') {
          str = `
            <div class="pd-list pdHoverRed">
              <a href="${pdData.Nodes[i].Link.Url}" target="_blank">
                <div class="pdimg">
                  <img src="${pdData.Nodes[i].Img.Src}" alt="">
                </div>
                <div class="pdHotline">${pdData.Nodes[i].Link.Text2}</div>
                <div class="pdTitle">${pdData.Nodes[i].Link.Text}</div>
                
                <div class="special">
                  <span>SALE</span>
                  <span><i>$</i>${pdData.Nodes[i].Link.Text1}</span>
                </div>
              </a>
            </div> 
            `
        } else {
          str = `
          <div class="pd-list pdHoverRed">
          <a href="${pdData.Nodes[i].Link.Url}" target="_blank">
            <div class="pdimg">
              <img src="${pdData.Nodes[i].Img.Src}" alt="">
            </div>
            <div class="pdHotline">${pdData.Nodes[i].Link.Text2}</div>
            <div class="pdTitle">${pdData.Nodes[i].Link.Text}</div>
            <div class="pdoriginal">$${pdData.Nodes[i].Link.Text3}</div>
            <div class="special">
              <span>SALE</span>
              <span><i>$</i>${pdData.Nodes[i].Link.Text1}</span>
            </div>
          </a>
        </div> 
             `
        }

        $(divID).append(str)
      }

    }

  }


}





// $('.hitSwiper , .bankSwiper , .logoSwiper').hover(function () {
//   (this).swiper.autoplay.stop();
// }, function () {
//   (this).swiper.autoplay.start();
// })

let arrName = ['game','low','king']


function swiperPC() {
  var swiperL = new Swiper(".hit_dot", {
    loop: true,
    direction: "vertical",
    centeredSlides: true,

    spaceBetween: 10,
    loopedSlides: 10,
    slidesPerView: 3,
    freeMode: true,

    // init: false,

  });

  var swiperR = new Swiper(".hit_main", {
    loop: true,
    spaceBetween: 10,
    loopedSlides: 10,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".arr-btn",
      prevEl: ".arr-top",
    },
    thumbs: {
      swiper: swiperL,
    },
    on:{
      slideNextTransitionEnd: function(){
        let numss = Math.floor(Math.random()*3);
          
          gsap.to('.'+arrName[numss]+'',{duration:0.1 , filter:'brightness(1.5)', repeat:3 , onComplete:()=>{
            gsap.to('.'+arrName[numss]+'',{clearProps: 'all'})
          
          } })
      },
      slidePrevTransitionEnd: function(swiper){
        let numss = Math.floor(Math.random()*3);
          
        gsap.to('.'+arrName[numss]+'',{duration:0.1 , filter:'brightness(1.5)' , repeat:3 , onComplete:()=>{
          gsap.to('.'+arrName[numss]+'',{clearProps: 'all'})
        
        } })
      },
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    // init: false
  });

}
function swiperMB() {

  var swiperL = new Swiper(".hit_dot", {
    loop: true,
    spaceBetween: 5,
    loopedSlides: 10,
    slidesPerView: 2,
    freeMode: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,

    slideToClickedSlide: true,

    // centeredSlides: true,





  });

  var swiperR = new Swiper(".hit_main", {
    loop: true,
    spaceBetween: 10,
    loopedSlides: 10,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".arr-btn",
      prevEl: ".arr-top",
    },
    // thumbs: {
    //   swiper: swiperL,
    // },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

  });
  swiperR.controller.control = swiperL;
  swiperL.controller.control = swiperR;

}


$('.coupon').fadeOut(0)
function slotPc2560(nums) {

  const t1 = gsap.timeline({
    scrollTrigger: {
      trigger: '.slot',
      start: 'top 30%',
    }
  })

  t1.to('.slot1', { duration: 3, backgroundPosition: '0 ' + nums + '%', ease: "elastic.out(1, 0.3)" })
    .to('.slot2', { duration: 3, backgroundPosition: '0 ' + nums + '%', ease: "elastic.out(1, 0.3)" }, 0.2)
    .to('.slot3', {
      duration: 3, backgroundPosition: '0 ' + nums + '%', ease: "elastic.out(1, 0.3)", onComplete: () => {
        $('.coupon').fadeIn(500)

      }
    }, 0.3)

}


// 拉霸機連結
function randomSlot(data, id) {
  let pdData = data[id]
  let randomNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1
  $('#couponMain').attr('href', pdData.Nodes[randomNum].Link.Url)
}

// 版身進度條
function stripAni() {
  $('.strip2').each(function (index, item) {
    $('.pd-line').each(function (index, item2) {
      gsap.to(item, { scrollTrigger: item2, duration: 5, width: '100%' })
    })
  })
}

// 視差
function eyeSl(){
  $(window).scroll(function(){
    let scrollPos = $(window).scrollTop();
    let rotateNum = scrollPos / 5 ;
    
    // let rotateDeg = Math.floor(Math.random()*)
    $('.circle1Ani').css('transform','rotate('+rotateNum+'deg)')
    $('.circle2Ani').css('transform','rotate(-'+rotateNum+'deg)')
    $('.circle3Ani').css('transform','rotate('+rotateNum+'deg)')
    $('.circle4Ani').css('transform','rotate(-'+rotateNum+'deg)')
    
    $('.decorate_R').css('transform','translateY('+rotateNum+'px)')
    $('.decorate_L').css('transform','translateY(-'+rotateNum+'px)')


  })
}
// clearProps: 'all'
function peopleAni(){
  const t1 = gsap.timeline({repeat:3 , yoyo:true , onComplete:function(){
    gsap.to('.people_left',{clearProps: 'all'})
    gsap.to('.people_right',{clearProps: 'all'})

  }})
  t1.to('.people_left',{duration:0.5 , x:20 , })
  .to('.people_right',{duration:0.5 , x:-20 },0.5)
}

// filter: brightness(1.2); 

