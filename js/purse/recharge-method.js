$(function () {
	var url = window.location.href;
	var arr1 = url.split("=");
	var a = arr1[1];
	$(".num").text(a)
	$(".moys").text(a)
	// 支付宝
	$(".alipay").click(function () {
		aliPay(a);
	})
	// 微信
	$(".wechat").click(function () {
		var uid = localStorage.getItem("uid");
		$(window).attr("location", "https://manage.xuexuele.vip/admin/WxPayJs?uid=" + uid + "&order_money=" + a);
	})

	// 返回
	$("#rechargeMethodBack").click(function () {
		window.location.replace("./recharge.html");
	});

});

// 支付宝支付
function aliPay(a) {
	var uid = localStorage.getItem("uid");
	var token = localStorage.getItem("token");
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
	    var paymeth = 'POST';
	}else{
		var paymeth = 'GET';
	}
	$.ajax({
		type: "GET",
		url: APP_URL + "/api/Pay/AliPayWeb",
		data: {
			uid: uid,
			token: token,
			order_money: a,
			paymeth:paymeth,
		},
		dataType: "json",
		success: function (res) {
			console.log(res)
			if (res.code == 1) {
				 
				// $(".apay").html(res.data);

				
				if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
				    $(".apay").html(res.data);
				}else{
					location.href=res.data;
				}
			}

		},
		error: function (err) {
			console.log(err);
		}
	});
}
