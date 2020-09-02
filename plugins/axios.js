import {
  getToken,
  setToken,
  getTokensg,
  getTokenss,
  getTokensr,
  getOfflineShopCode
} from "~/plugins/auth";
const sysConfig = require("~/config");

function getQueryVariable(variable) {
  variable = variable.toLowerCase();
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

let axios;

export default ({ app, query, store, redirect }, nuxtContext) => {
  axios = app.$axios;
  // axios 配置
  axios.defaults.timeout = 15000;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
  axios.defaults.baseURL =
    process.env.env_config == "dev"
      ? process.env.baseUrl
      : sysConfig.SHOP_LIST[0].domain;
  if (process.client) {
    // 替换客户端的协议
    axios.defaults.baseURL = axios.defaults.baseURL.replace(
      /^(http|https):/i,
      window.location.protocol
    );
  }
  axios.interceptors.request.use(
    config => {
      if (process.browser) {
        process.env.env_config == "dev" &&
          (config.baseURL = window.location.origin);
        let sessionid = getToken(null, query.mixid);
        if (sessionid) {
          if (!config.url.endsWith("shopApiService/login")) {
            config.headers["Authorization"] = sessionid;
          }
        }
        let offLineShopCode = getOfflineShopCode();
        if (offLineShopCode) {
          config.headers["Offline-Shop-Code"] = offLineShopCode;
        }
        let spokesmanGroupId = getTokensg();
        let spokesmanShopId = getTokenss();
        let spokesmanRelId = getTokensr();
        if (spokesmanGroupId) {
          config.headers["spokesmanGroupId"] = spokesmanGroupId;
          config.headers["spokesmanShopId"] = spokesmanShopId;
          config.headers["spokesmanRelId"] = spokesmanRelId;
        }
        config.headers["Shop-Mixid"] = getQueryVariable("mixId") || query.mixid;
        config.headers["run-env"] = "client";
      } else {
        //解决本地 node服务端调用接口 默认域名问题
        process.env.env_config == "dev" &&
          (config.baseURL = "http://test-m-shop.mayi888.cn/");
        console.log(store.state.sessionId, "axiosjs_72", query.mixid);
        let reqToken = store.state.sessionId;
        if (reqToken) {
          config.headers["Authorization"] = reqToken;
        }
        query.mixid && (config.headers["Shop-Mixid"] = query.mixid);
        config.headers["run-env"] = "server";
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // 返回状态判断
  axios.interceptors.response.use(
    response => {
      //更新token 仅在客户端设置token
      let authorization =
        response.headers["new-authorization"] ||
        response.headers["New-Authorization"];
      if (
        process.client &&
        authorization &&
        authorization != getToken(null, query.mixid)
      ) {
        setToken(authorization, 30);
        store.commit("SET_SESSINID", authorization);
      }
      if (response.status === 200) {
        return response;
      } else {
        // return Promise.reject(response)
      }
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

export function fetch(url, conf, isGet) {
  return new Promise((resolve, reject) => {
    // 数组放到第二个参数没问题，放到conf参数就不行
    let data = conf ? conf.data : null;
    let _c = Object.assign({}, conf);
    delete _c.data;
    if (isGet) {
      axios
        .get(url, data, _c)
        .then(res => {
          if (process.server) {
          }
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      axios
        .post(url, data, _c)
        .then(res => {
          if (process.server) {
          }
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
}
