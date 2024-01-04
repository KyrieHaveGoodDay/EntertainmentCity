function printHtml(navData, productsData) {
  // 側選單
  printNavHtml(navData, productsData);

  // 版身
  printBodyHtml(productsData);
}

// [ 1 ]. 渲染桌機左選單 & 手機底部面版資料
function printNavHtml(navData, pdData) {
  // 雙11 取得額外選單區塊
  const bonusListData = getDataByIndex(pdData, 20);

  // 過濾物件轉 nav 資料屬性
  const bonusList = bonusListData.map(({ id, productName, url }) => {
    const obj = {
      id: 30 + id,
      url,
      text: productName,
    };
    return obj;
  });

  // 組合新 other nav data
  const navOtherLink = [...navData.otherLink.slice(0, -3), ...bonusList, ...navData.otherLink.slice(-3)];

  // 左側貼紙
  $('.left-nav__img a').attr('href', navData.stickerImg.url);
  $('.left-nav__img a img').attr('src', navData.stickerImg.imgSrc);

  // 左側回主會場 & 手機主會場
  $('.left-nav__back, .footer-board__btns .footer-board__btn:nth-child(1)').attr('href', navData.mainActiveUrl);

  // 左側選單列表(分會場+3品牌) & 手機精選會場
  let leftNavListStr = navOtherLink
    .map((item) => {
      return `<li><a href="${item.url}">${item.text}</a></li>`;
    })
    .join('');
  $('.left-nav__list, .board1 ul').html(leftNavListStr);
}

// (つ´ω`)つ  =>  your custom code here
// [ 2 ]. 渲染版身
// 取得索引值的 data : getDataByIndex(pdData, index)
// 組合多筆陣列 getDataByIndex(pdData, index1, index2)
function printBodyHtml(pdData) {
  const bank1 = getDataByIndex(pdData, 0); // 銀行
  const bank2 = getDataByIndex(pdData, 1); // 3塊活動
  const mainPd = getDataByIndex(pdData, 2); ///8品
  const theme1Main = getDataByIndex(pdData, 3); // theme1-1
  const theme1Pd = getDataByIndex(pdData, 4); // theme1-2
  const theme2Main = getDataByIndex(pdData, 5); // theme2-1
  const theme2Pd = getDataByIndex(pdData, 6); // theme2-2
  const theme3Main = getDataByIndex(pdData, 7); // theme3-1
  const theme3Pd = getDataByIndex(pdData, 8); // theme3-2
  const theme4Main = getDataByIndex(pdData, 9); // theme4-1
  const theme4Pd = getDataByIndex(pdData, 10); // theme4-2
  const theme5Main = getDataByIndex(pdData, 11); // theme5-1
  const theme5Pd = getDataByIndex(pdData, 12); // theme5-2
  const theme6Main = getDataByIndex(pdData, 13); // theme6-1
  const theme6Pd = getDataByIndex(pdData, 14); // theme6-2

  // 銀行1
  let bank1Str = bank1
    .map((item) => {
      return `<a href="${item.url}" class="col-6 col-lg-3 d-block"><img src="${item.imgSrc}" /></a>`;
    })
    .join('');
  $('.bank1').html(bank1Str);

  // 銀行2
  let bank2Str = bank2
    .map((item, index) => {
      if (index % 2 !== 0) return;
      return `
        <a href="${item.url}" class="col-4 d-block">
          <picture class="d-block">
            <source srcset="${item.imgSrc}" media="(min-width: 992px)" />
            <img src="${bank2[index + 1].imgSrc}" />
          </picture>
        </a>`;
    })
    .join('');
  $('.bank2').html(bank2Str);

  // 8品
  let mainPdStr = mainPd.map((item) => {
    const isNumber = !isNaN(item.discountPrice) ? '$' : '';
    return `
    <a href="${item.url}" class="col-6 col-lg-3 d-block" d>
      <img src="${item.imgSrc}" />
      <div class="mainPd-text">
        <div class="mainPd-info">
          <p class="mainPd-name">${item.productTitle}</p>
          <p class="mainPd-title">${item.productName}</p>
        </div>
        <p class="mainPd-price"><span>${isNumber}</span>${item.discountPrice}</p>
      </div>
    </a>`;
  });
  $('.container-mainPd').html(mainPdStr);

  // theme main
  function themeMain(theme, mainDom) {
    let isRight = $(mainDom).hasClass('theme-style-right') ? 'order-1' : '';
    let str = `
      <a href="${theme[0].url}" class="topPd">
        <div class="col-6 col-lg-5 topPd-img ${isRight}"><img src="${theme[0].imgSrc}" /></div>
        <div class="col-6 col-lg-7 topPd-text">
          <p class="topPd-title">${theme[0].productTitle}</p>
          <p class="topPd-name">${theme[0].productName}</p>
          <p class="pd-discountPrice">
            <span class="sale">SALE</span>
            <span class="dollar">$</span>
            ${theme[0].discountPrice}
          </p>
          <p class="topPd-more">
            <img src="img/arrow-r.svg" />
            more
          </p>
        </div>
      </a>
    `;
    $(mainDom).find('.theme-main').html(str);
  }
  themeMain(theme1Main, '#theme1');
  themeMain(theme2Main, '#theme2');
  themeMain(theme3Main, '#theme3');
  themeMain(theme4Main, '#theme4');
  themeMain(theme5Main, '#theme5');
  themeMain(theme6Main, '#theme6');

  // theme pd
  function themePd(themePd, pdDom) {
    let str1 = '';
    let str2 = '';
    themePd.forEach((item, index) => {
      let str = `<div class="col-6 col-lg-3 pd">
        <a href="${item.url}" class="d-block">
          <img class="pd-img" src="${item.imgSrc}" />
          <p class="pd-title">${item.productTitle}</p>
          <h4>${item.productName}</h4>
          <p class="pd-marketPrice">$${item.marketPrice}</p>
          <p class="pd-discountPrice">
            <span class="sale">SALE</span>
            <span class="dollar">$</span>
            ${item.discountPrice}
          </p>
        </a>
      </div>`;
      if (index <= 3) {
        str1 += str;
      } else {
        str2 += str;
      }
    });
    $(`${pdDom} .other-pd-one`).html(str1);
    $(`${pdDom} .other-pd-second`).html(str2);
  }
  themePd(theme1Pd, '#theme1');
  themePd(theme2Pd, '#theme2');
  themePd(theme3Pd, '#theme3');
  themePd(theme4Pd, '#theme4');
  themePd(theme5Pd, '#theme5');
  themePd(theme6Pd, '#theme6');
}
