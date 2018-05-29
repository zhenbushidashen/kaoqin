const queryString = require('querystring')

const getParams = function(sUrl) {
    const param = {}
    if (!sUrl.includes('?')) {
       return param
    } else {
       return queryString.parse(sUrl.split('?')[1])
    }
}

export const getToken = function (sUrl) {
    const tokenInfo = {}
    tokenInfo.success = true
    if (getParams(sUrl).token) {
      tokenInfo.token = getParams(sUrl).token
      sessionStorage.setItem('token', getParams(sUrl).token)
    } else if (sessionStorage.getItem('token')) {
        tokenInfo.token = sessionStorage.getItem('token').token
    } else {
        tokenInfo.token = ''
        tokenInfo.success = false
    }
    return tokenInfo
}