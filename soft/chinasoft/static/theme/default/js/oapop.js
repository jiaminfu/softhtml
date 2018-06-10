$(document).ready(function(){
	var cipherkey = '' ;//参见协议文档
	var ciphertext = '' ;//参见协议文档
	if($("#lobNumber").val()=="${user.personCode}"){
		//登陆失效
		//window.location.href="http://ics.chinasoftosg.com";
	}else{
		//获取ehr code并进行加密
		$.ajax( {
			type : "GET",
			dataType : 'jsonp',
			jsonp: "callbackparam",//服务端用于接收callback调用的function名的参数
			jsonpCallback:"success_jsonpCallback",//callback的function名称 
			async : false,
			cache : false,
			data:{"lobNumber":$("#lobNumber").val(),"userName":$("#userName").val()},
			url : 'http://kq.chinasoftosg.com/workAttendance/encryptionAction_getCodeEncry', //考勤action请求地址
			success:function(json){
				//对加密后的ehr code以及密钥进行赋值
				//alert("xxxx");
				if(json.lob==1){
					cipherkey=json.keyStr;
					//alert("cipherkey="+cipherkey);
					ciphertext=json.encryptStr;
					//alert("ciphertext="+ciphertext);
					codeEncry(cipherkey,ciphertext);
				}else{
					$("#pop_wrapper").hide();
				}
			},  
			error: function(xhr){ 
				//alert("获取ehr code加密有错误"+xhr); 
			} 
		});
	}
}) ;
function codeEncry(cipherkey,ciphertext){
	var ip = "124.127.138.150" ;// 目前测试机ip：124.127.138.155 端口：8080 如有变动将通知OA平台
	var port = "8088" ;
	//alert("port"+"  "+port);
	var gip = "cc.chinasofti.com" ;// 目前跳转测试机ip：124.127.138.155 端口：8081 如有变动将通知OA平台
	var gport = "80" ;
	var source = 'TSG' ; //参见协议文档
	$.ajax({ 
		async:false, 
		url:"http://"+ip+":"+port+"/CultureWing/oacontent.do?method=getContent", 
		cache:false,
		type:"GET", 
		dataType:'jsonp', 
		jsonp:'jsoncallback', 
		data:{}, 
		timeout:5000, 
		success:function (json) {
		//alert(json);
			var pop_wrapper = $("#pop_wrapper") ;
			var pop1 = json.pop1 ;var title1 = json.title1 ;
			var pop2 = json.pop2 ;var title2 = json.title2 ;
			var pop3 = json.pop3 ;var title3 = json.title3 ;
			var intro1 = json.intro1 ;
			var mainStr = "<div class='main_wrapper'>" ;
			if(pop1!=null && pop1!=""){
				pop1 = "http://"+gip+pop1 ;
				mainStr += "<a href='http://"+gip+"/CultureFront/Home?source="+source+"&cipherkey="+cipherkey+"&ciphertext="+ciphertext+"' target='_blank'><img src='"+pop1+"'></a>" ;
				mainStr += "<p class='title_t'>"+title1+"</p>" ;
				mainStr += "<p class='detail_p'>"+intro1+"</p>" ;
			}
			if(pop2!=null && pop2!=""){
				pop2 = "http://"+gip+pop2 ;
				mainStr += "<dl class='session_dl cf'><dt>" ; 
				mainStr += "<a href='http://"+gip+"/CultureFront/Home?source="+source+"&cipherkey="+cipherkey+"&ciphertext="+ciphertext+"' target='_blank'>" ;
				mainStr += "<img src='"+pop2+"'></a></dt style='width:120px'>" ;
				mainStr += "<a style='font-size:12px'  href='http://"+gip+"/CultureFront/Home?source="+source+"&cipherkey="+cipherkey+"&ciphertext="+ciphertext+"' target='_blank'>"+title2+"</a></dl>" ;
			}
			if(pop3!=null && pop3!=""){
				pop3 = "http://"+gip+pop3 ;
				mainStr += "<dl class='session_dl no_top_border cf'>" ; 
				mainStr += "<dt><a href='http://"+gip+"/CultureFront/Home?source="+source+"&cipherkey="+cipherkey+"&ciphertext="+ciphertext+"' target='_blank'>" ;
				mainStr += "<img src='"+pop3+"'></a></dt><dt style='width:120px'>";
				mainStr += "<a style='font-size:12px' href='http://"+gip+"/CultureFront/Home?source="+source+"&cipherkey="+cipherkey+"&ciphertext="+ciphertext+"' target='_blank'>"+title3+"</a></dt></dl>"


				//mainStr += "<nobr><dt><a href='http://"+gip+"/CultureFront/Home?source="+source+"&cipherkey="+cipherkey+"&ciphertext="+ciphertext+"' target='_blank'>" ;
				//mainStr += "<img src='"+pop3+"'></a></dt><dd>" ;
				//mainStr += "<a href='http://"+gip+"/CultureFront/Home?source="+source+"&cipherkey="+cipherkey+"&ciphertext="+ciphertext+"' target='_blank'>"+title3+"</a></nobr></dd></dl>" ;
			}

			var main = $(mainStr) ;
			pop_wrapper.append(main) ;
			var mainUrl = "http://"+gip+"/CultureFront/Home?source="+source+"&cipherkey="+cipherkey+"&ciphertext="+ciphertext;
			var bottomInfo = $("<div class='bottomInfo'><span style='color:red'>*</span>不能访问外网?在条件允许时直接访问<a target='_blank' href='"+mainUrl+"'>cc.chinasofti.com</a>也可以。</div>");
			pop_wrapper.append(bottomInfo);
		},  
		error: function(xhr){ 
			//alert("请求出错（请检查相关度网络状况）"); 
		} 
	});
}
function closeWin(){
	$("#pop_wrapper").hide() ;
}

