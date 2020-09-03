import config from "~/config";

export function getShopConfig(host) {
  for (let i = 0; i < config.SHOP_LIST.length; i++) {
    const element = config.SHOP_LIST[i];
    if (element.domain.indexOf(host) > -1) {
      return element;
    }
  }
  return null;
}
// 定义一个图片过滤器
// 过滤MP4文件 获取视频封面
export function DFSImg(path, w, h, type = 0) {
  //
  if (path == null || path == "") {
    return require("~/static/images/load.gif");
  }

  let baseImg = config.IMG_DOMAIN;

  if (
    !Array.isArray(baseImg) &&
    (baseImg.indexOf("aliyun") >= 0 || baseImg.indexOf("cdn") >= 0)
  ) {
    var style = "";
    if (w) style += ",w_" + w;
    if (h) style += ",h_" + h;
    if (style.length > 0 && path.indexOf("?x-oss-process") == -1) {
      if (path.toLocaleLowerCase().indexOf(".mp4") == -1) {
        if (type == 0) {
          //固定宽高，缩略填充
          path += "?x-oss-process=image/resize,m_pad,limit_0" + style;
        } else {
          //固定宽高，缩略不填充
          path += "?x-oss-process=image/resize,limit_1" + style;
        }
      } else {
        if (type == 0) {
          //固定宽高，缩略填充
          path +=
            "?x-oss-process=video/snapshot,t_1,m_fast,limit_0,m_pad" + style;
        } else {
          //固定宽高，缩略不填充
          path += "?x-oss-process=video/snapshot,t_1,m_fast,limit_0" + style;
        }
      }
    }
    if (path.indexOf("http") == 0) {
      return path;
    }
    return baseImg + path;
  } else {
    if (path.indexOf("http") == 0) {
      return path;
    }
    if (path.indexOf("/") != 0) {
      path = "/" + path;
    }
    if (w && h) {
      path += "." + w + "x" + h + ".jpg";
    }
    return baseImg[Math.floor(Math.random() * 100) % baseImg.length] + path;
  }
}
export function keepIntNum(num) {
  num = Number(num);
  return Math.floor(num || 0);
}
export function keepTwoNum(num) {
  num = Number(num);
  return num.toFixed(2);
}

export function isIphoneX() {
  if (window && /iphone/gi.test(window.navigator.userAgent)) {
    /* iPhone X、iPhone XS */
    var x = window.screen.width === 375 && window.screen.height === 812;
    /* iPhone XS Max */
    var xsMax = window.screen.width === 414 && window.screen.height === 896;
    /* iPhone XR */
    var xR = window.screen.width === 414 && window.screen.height === 896;
    if (x || xsMax || xR) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
