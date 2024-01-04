function filterData(data) {
  // filter empty data
  let newData = data.map((item) => {
    const filterLists = item.Nodes.filter((item) => {
      return item.Link.Url !== '';
    });
    const newObj = {
      BlockId: item.BlockId,
      Nodes: filterLists,
    };
    return newObj;
  });

  // new products data
  let productsData = [];

  // new nav data
  let navData = {};

  // filter products data
  productsData = newData.slice(0, -1).map((item) => {
    const newObj = {
      BlockId: item.BlockId,
      Nodes: [],
    };
    newObj.Nodes = item.Nodes.map(({ Id, Link: { Url, Text, Text1, Text2, Text3 }, Img: { Src, Title } }) => {
      const obj = {
        id: Id,
        url: Url,
        productName: Text,
        productTitle: Text2,
        marketPrice: Text3,
        discountPrice: Text1,
        imgSrc: Src,
        imgTitle: Title,
      };
      return obj;
    });
    return newObj;
  });

  // filter nav data
  let navObj = newData.slice(-1)[0].Nodes;

  // nav sticker
  navData.stickerImg = {
    url: navObj[0].Link.Url,
    imgSrc: navObj[0].Img.Src,
  };

  // nav main active link
  navData.mainActiveUrl = navObj[1].Link.Url;

  // nav other link & brands link (12+3)
  navData.otherLink = [...navObj]
    .filter((item) => item.Id > 5)
    .map(({ Id, Link: { Url, Text } }) => {
      const obj = {
        id: Id,
        url: Url,
        text: Text,
      };
      return obj;
    });

  printHtml(navData, productsData);
}

// get products data by index
function getDataByIndex(data, ...args) {
  let pdObj = [];
  args.forEach((el) => {
    const obj = data.filter((item, index) => index === el)[0];
    obj !== undefined && (pdObj = pdObj.concat(obj.Nodes));
  });
  return pdObj;
}
