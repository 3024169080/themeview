import Cookies from 'js-cookie'
import cookieparser from 'cookieparser'

const groupId = '_groupId'
const shopMixid = 'shopMixid'
const NeedCertifiedKey = 'Need-Certified'
const spokesmanGroupIdVal = "spokesmanGroupId";
const spokesmanShopIdVal = "spokesmanShopId";
const spokesmanRelIdVal = "spokesmanRelId";
const userIdVal = "userId";
const myUserIdVal = "myUserId";
const spokesmanBindIdVal = "spokesmanBindId";
const offlineShopCode = "offline_shop_code";
const offlineShopName = "offline_shop_name";
const wxnickname = 'wx_nickname';

// 集团id
export function setTokenGroupId(token, time) {
    return Cookies.set(groupId, token, { expires: time })
}
export function getTokenGroupId(token, time) {
    return Cookies.get(groupId)
}
export function removeTokenGroupId(token, time) {
    return Cookies.remove(groupId)
}

// 代言人的集团id
export function setTokensg(token, time) {
    return Cookies.set(spokesmanGroupIdVal, token, { expires: time })
}

export function getTokensg(req) {
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        return parsed[spokesmanGroupIdVal]
    } else {
        return Cookies.get(spokesmanGroupIdVal);
    }
}
// 代言人的门店id
export function setTokenss(token, time) {
    return Cookies.set(spokesmanShopIdVal, token, { expires: time });
}

export function getTokenss(req) {
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        return parsed[spokesmanShopIdVal]
    } else {
        return Cookies.get(spokesmanShopIdVal);
    }
}
// 代言人的id
export function setTokensr(token, time) {
    return Cookies.set(spokesmanRelIdVal, token, { expires: time })
}

export function getTokensr(req) {
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        return parsed[spokesmanRelIdVal]
    } else {
        return Cookies.get(spokesmanRelIdVal);
    }
}
// 代言人的userid
export function setTokenu(token, time) {
    return Cookies.set(userIdVal, token, { expires: time })
}

export function getTokenu(req) {
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        return parsed[userIdVal]
    } else {
        return Cookies.get(userIdVal);
    }
}
// userid
export function setTokenmu(token, time) {
    return Cookies.set(myUserIdVal, token, { expires: time })
}
export function getTokenmu(req) {
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        return parsed[myUserIdVal]
    } else {
        return Cookies.get(myUserIdVal);
    }
}
export function removeTokenmu(TokenKey) {
    return Cookies.remove(myUserIdVal)
}


// token
export function getToken(req, mixid) {
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        if (mixid) {
            return parsed[mixid]
        } else if (parsed.shopMixid) {
            return parsed[parsed.shopMixid]
        } else {
            return ''
        }
    } else {
        return Cookies.get(mixid || getTokenTwo())
    }
}

export function setToken(token, time) {
    return Cookies.set(getTokenTwo(), token, { expires: time })
}

export function setTokenTwo(tokenKey, token, time) {
    return Cookies.set(tokenKey, token, { expires: time })
}

export function getTokenTwo(req) {
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        return parsed[shopMixid]
    } else {
        return Cookies.get(shopMixid);
    }
}
// 存线下门店code
export function setOfflineShopCode(token, time) {
    let oLcode = getTokenTwo() + "_" + offlineShopCode;
    return Cookies.set(oLcode, token, { expires: time })
}

export function getOfflineShopCode(req) {
    let oLcode = getTokenTwo() + "_" + offlineShopCode;
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        return parsed[oLcode]
    } else {
        return Cookies.get(oLcode);
    }
}
// 存店铺名name
export function setOfflineShopName(token, time) {
    let oLname = getTokenTwo() + "_" + offlineShopName;
    return Cookies.set(oLname, token, { expires: time })
}

export function getOfflineShopName(req) {
    let oLname = getTokenTwo() + "_" + offlineShopName;
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        return parsed[oLname]
    } else {
        return Cookies.get(oLname);
    }
}

export function removeToken(TokenKey) {
    return Cookies.remove(TokenKey)
}
//设置过期时间
export function setExpireTime(time) {
    console.log('时间' + time)
    return Cookies.set('foo', 'bar', {
        expires: time
    });
}

export function getNeedCertified(req) {
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        return parsed[NeedCertifiedKey]
    } else {
        return Cookies.get(NeedCertifiedKey)
    }
}

export function setNeedCertified(token, time) {
    return Cookies.set(NeedCertifiedKey, token, { expires: time })
}

export function removeNeedCertified() {
    return Cookies.remove(NeedCertifiedKey)
}

export function getWxnickname(req) {
    if (req && req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        return parsed[wxnickname]
    } else {
        return Cookies.get(wxnickname);
    }
}

export function setWxnickname(token, time) {
    return Cookies.set(wxnickname, token, { expires: time })
}

export function removeNickname() {
    return Cookies.remove(wxnickname)
}