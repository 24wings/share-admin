/**
 * @param payargs  订单参数{ }
 * @param  callbakc 回调函数
 */
function wechatPay(payargs, successCallback, errorCallback) {

    WeixinJSBridge.invoke('getBrandWCPayRequest', payargs, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
            successCallback()
                // 这里可以跳转到订单完成页面向用户展示
        } else {
            errorCallback ? errorCallback() : alert('支付失败,请重试')
        }
    });

}