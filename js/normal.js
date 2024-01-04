(function () {
  const normal = {
    data: {
      windowWidth: 0,
      windowScrollTop: 0,
      rightNavOffsetTop: 0,
      isClickEvt: false,
    },
    // [桌機] 右選單底部輪播 / 單一貼紙判斷
    rightNavSlider() {
      let rightSwiper = new Swiper('.right-nav__swiper', {
        autoplay: {
          disableOnInteraction: false,
        },
        loop: true,
        init: false,
      });
      $('.right-nav__swiper .swiper-slide').length > 1 && rightSwiper.init();
    },

    // [桌機] 左右側選單 收合
    sideNavToggle() {
      const $sideNav = $('.side-nav');
      $sideNav.on('click', '.side-nav__btn > a', function (e) {
        e.preventDefault();
        $(this).parents('.side-nav').toggleClass('side-nav--hide');
      });
    },

    // [桌機] 左右側選單 上滑
    sideNavScroll() {
      const $sideNav = $('.side-nav');
      this.data.windowScrollTop >= 60 ? $sideNav.addClass('scrollTop') : $sideNav.removeClass('scrollTop');
    },

    // [平版] 左右側選單 預設關閉
    sideNavHide() {
      const $sideNav = $('.side-nav');
      $sideNav.addClass('side-nav--hide');
    },

    // [手機] 底部選單面版
    footerBoard() {
      let tl;
      // open board
      $('.footer-board__btn[data-btn]').on('click', function (e) {
        tl = gsap.timeline();
        const board = $(this).data('btn');
        const targetCloseBtn = $(`[data-close="${board}"]`);
        const targetBoard = $(`[data-board="${board}"]`);
        const targetBoardUl = targetBoard.find('ul');
        const targetBoardHeight = targetBoard.height();
        const targetBtn = $(this).find('p');
        const boardBtns = $('.footer-board__btn p');

        $('body').addClass('board--show');
        tl.to(targetBtn, { duration: 0.3, rotate: 90, opacity: 0 });
        tl.to(boardBtns, { duration: 0.1, scale: 0, opacity: 0, ease: 'back.in(2)' }, 0.08);
        tl.to(targetBoard, { duration: 0.2, y: 0 }, 0.12);
        tl.to(targetCloseBtn, { duration: 0.2, y: -(targetBoardHeight + 10), ease: 'back.out(1)' }, 0.18);
        tl.to(targetBoardUl, { duration: 0.3, y: 0, opacity: 1 }, 0.2);
      });

      // close event
      $('.wrap').on('click', (e) => {
        if (e.target.classList.contains('wrap') || e.target.classList.value === 'board__close') {
          closeBoard();
        }
      });

      // close board
      function closeBoard() {
        $('body').removeClass('board--show');
        tl.reverse();
      }
    },

    // [桌機] 右選單滾動監聽
    rightNavScrollSpy() {
      if (this.data.isClickEvt) return;
      const rightNavHash = $('.right-nav__list .hash');

      // 滾動監聽作用選單
      rightNavHash.each(function (item) {
        const section = $($(this).attr('href'));
        if (section.offset().top <= normal.data.windowScrollTop && section.offset().top + section.height() > normal.data.windowScrollTop) {
          $(this).addClass('right-nav--active');
        } else {
          $(this).removeClass('right-nav--active');
        }
      });
    },

    // [手機] 上選單
    topSliders() {
      // 上選單錨點
      const topTabsHash = $('.top-tabs__swiper .hash');

      let topTabsSlider = new Swiper('.top-tabs__swiper', {
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
          momentumRatio: 0.5,
        },
      });

      // 上選單點擊
      topTabsHash.on('click', function (e) {
        e.preventDefault();
        normal.data.isClickEvt = true;

        // 底線樣式 toggle
        topTabsHash.removeClass('tab-active');
        $(this).addClass('tab-active');

        setTimeout(() => {
          normal.data.isClickEvt = false;
        }, 300);
      });

      // 滾動偵側作用選單
      $(window).on('scroll', () => {
        if (this.data.isClickEvt) return;
        topTabsHash.each(function (item) {
          const section = $($(this).attr('href'));
          if (section.offset().top - $('.top-tabs').height() <= normal.data.windowScrollTop && section.offset().top + section.height() - $('.top-tabs').height() > normal.data.windowScrollTop) {
            $(this).addClass('tab-active');
            let activeIndex = $(this).data('index');
            topTabsSlider.slideTo(activeIndex);
          } else {
            $(this).removeClass('tab-active');
          }
        });
      });
    },

    // 右邊 Go top 按鈕
    goTopShow() {
      this.data.windowScrollTop >= 100 ? $('.goTop').addClass('show') : $('.goTop').removeClass('show');
    },

    // 右邊 Go top click
    goTopEvt() {
      $('.goTop,.go-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: '0px' }, 300);
      });
    },

    // 錨點點擊滑動位置
    hashLink() {
      $('a.hash[href^="#"]').on('click', function (e) {
        e.preventDefault();
        normal.data.isClickEvt = true;
        $(this).addClass('right-nav--active');
        const headerH = $('.top-tabs').height();
        const targetTop = $($(this).attr('href')).offset().top;
        const scrollPos = normal.data.windowWidth < 768 ? targetTop - headerH : targetTop;
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop: scrollPos,
            },
            {
              duration: 300,
              complete: function () {
                normal.data.isClickEvt = false;
                normal.data.windowWidth > 767 && $(window).scroll();
              },
            }
          );
      });
    },

    // window scroll event
    windowScroll() {
      $(window)
        .on('scroll', () => {
          this.data.windowScrollTop = $(window).scrollTop();
          this.goTopShow();
          if (this.data.windowWidth > 767) {
            this.sideNavScroll();
            // this.rightNavScrollSpy();
          }
        })
        .scroll();
    },

    // window resize event
    windowResize() {
      $(window)
        .on('resize', () => {
          this.data.windowWidth = $(window).width();
          this.data.windowWidth < 1060 && this.sideNavHide();
        })
        .resize();
    },

    // init
    init() {
      this.data.windowWidth = $(window).width();
      this.windowScroll();
      this.windowResize();
      this.sideNavToggle();
      this.goTopEvt();
      this.hashLink();

      if (this.data.windowWidth < 768) {
        this.footerBoard();
        this.topSliders();
      }
    },
  };
  normal.init();
})();
