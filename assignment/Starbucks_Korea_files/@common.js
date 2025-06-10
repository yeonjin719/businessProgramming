/** 한글 **/
if (window['console'] === undefined || console.log === undefined )
{
  console = {log: function() {}, info: function() {}, warn: function () {}, error: function() {}};
}

var $config = {};
    $config.domain			   = 'http://www.starbucks.co.kr/15th/';
    $config.ssl 			   = 'https://www.starbucks.co.kr/15th/';
    $config.facebook_id		   = '225561007625394';
    $config.imgUploadPath	   = '//image.istarbucks.co.kr';

if(/dev-|stg-|dr-/.test(location.origin)){
    $config.imgUploadPath = location.origin;
}

$(document).ready(function(){

    //Kakao.init('c0c67e02f2b019fb22611e8e8714de74');

    var newHost = location.host;
        newHost = newHost.toLowerCase();


    if ( newHost.indexOf("m.istarbucks.co.kr") > -1 )
    {
        location.href='https://www.starbucks.co.kr';
    }




    /*var loginHtml = '';
    loginHtml  += '  <div class="login_layer_dimm" id="logIn"></div>   ';
    loginHtml  += '  <div class="login_layer" id="logIn">   ';
    loginHtml  += '  	<header>   ';
    loginHtml  += '  		<strong>Sign In</strong>   ';
    loginHtml  += '  		<a class="login_layer_close" href="javascript:void(0);">닫기</a>   ';
    loginHtml  += '  	</header>   ';
    loginHtml  += '  	<section class="login_layer_cont">   ';
    loginHtml  += '  		<form id="frmLogin" action="/login/login_proc.do" method="POST" target="frmLoginProc">   ';
    loginHtml  += '  			<input type="hidden" id="hdn_target_url" value="" />   ';
    loginHtml  += '  		   ';
    loginHtml  += '  			<p class="login_greet_txt"><strong>Welcome! 스타벅스커피 코리아에 오신 것을 환영합니다.</strong><br>설정하신 아이디와 비밀번호를 입력해 주세요.</p>   ';
    loginHtml  += '  			<fieldset class="login_field">   ';
    loginHtml  += '  				<legend class="hid">로그인 아이디, 비밀번호 입력폼</legend>   ';
    loginHtml  += '  				<div class="login_info_input_wrap">   ';
    loginHtml  += '  					<dl class="login_info_id_input">   ';
    loginHtml  += '  						<dt>아이디</dt>   ';
    loginHtml  += '  						<dd><input id="txt_user_id" name="user_id" type="text" maxlenght="13" /></dd>   ';
    loginHtml  += '  					</dl>   ';
    loginHtml  += '  					<dl class="login_info_pw_input">   ';
    loginHtml  += '  						<dt>비밀번호</dt>   ';
    loginHtml  += '  						<dd><input id="txt_user_pwd" name="user_pwd" type="password"  maxlenght="12" /></dd>   ';
    loginHtml  += '  					</dl>   ';
    loginHtml  += '  					<aside class="id_remember">   ';
    loginHtml  += '  						<input id="idRemb" name="idRemb" type="checkbox">   ';
    loginHtml  += '  						<label for="idRemb">아이디 저장</label>   ';
    loginHtml  += '  					</aside>   ';
    loginHtml  += '  					<a class="btn_login" href="javascript:void(0);">로그인</a>   ';
    loginHtml  += '  				</div>   ';
    loginHtml  += '  			</fieldset>   ';
    loginHtml  += '  			   ';
    loginHtml  += '  			<p class="reg_chg_pw_warn" style="display:none;">* 타 사이트와 비밀번호를 동일하게 사용할 경우 도용의 위험이 있으므로, 정기적인 비밀번호 변경을 해주시길 바랍니다.</p>   ';
    loginHtml  += '  			<p class="captcha_guide" style="display:none;">비밀번호를 5회 이상 잘못 입력하면, 보안문자를 함께 입력하셔야 합니다. 아래 이미지의 보안문자를 보이는 대로 입력해주세요.</p>   ';
    loginHtml  += '  			<fieldset class="captcha_field" style="display:none;">   ';
    loginHtml  += '  				<legend class="hid">보안문자 입력폼</legend>   ';
    loginHtml  += '  				<div class="captcha_input_wrap">   ';
    loginHtml  += '  					<dl>   ';
    loginHtml  += '  						<dt>보안문자</dt>   ';
    loginHtml  += '  						<dd>   ';
    loginHtml  += '  							<p class="captcha_img"><img alt="" /></p>   ';
    loginHtml  += '  							<a class="btn_login btn_new_captcha" href="javascript:void(0);">새로<br>고침</a>   ';
    loginHtml  += '  							<input type="text" id="captcha" name="captcha" maxlength="10" />   ';
    loginHtml  += '  						</dd>   ';
    loginHtml  += '  					</dl>   ';
    loginHtml  += '  				</div>   ';
    loginHtml  += '  			</fieldset>   ';
    loginHtml  += '  			   ';
    loginHtml  += '  			<div class="member_yet">   ';
    loginHtml  += '  				<p class="login_help_txt"><strong>스타벅스커피 코리아 회원이 아니세요?</strong><br>스타벅스커피 코리아 회원만의 특별한 혜택을 누릴 수 있습니다.</p>   ';
    loginHtml  += '  				<a href="/mem/join.do">회원가입</a>   ';
    loginHtml  += '  			</div>   ';
    loginHtml  += '  			<div class="forget_idpw">   ';
    loginHtml  += '  				<p class="login_help_txt"><strong>고객님! 아이디, 비밀번호를 잊으셨나요?</strong><br>고객님의 본인 명의 휴대폰 인증 또는 아이핀 인증으로 찾을 수 있습니다.</p>   ';
    loginHtml  += '  				<a href="/mem/find_mem1.do">아이디 · 비밀번호 찾기</a>   ';
    loginHtml  += '  			</div>   ';
    loginHtml  += '  		</form>   ';
    loginHtml  += '  		<iframe name="frmLoginProc" id="frmLoginProc" frameborder="0" style="display:none; width:0; height:0;"></iframe>   ';
    loginHtml  += '  	</section>   ';
    loginHtml  += '  </div>   ';
    $("body").prepend(loginHtml);*/



    $("A").each(function(){
        if ( $(this).attr("href") == "#")
        {
            $(this).attr("href", "javascript:void(0)")
        }
    });

    $("input").each(function(){
        var ref = $(this).attr("ref");
        if (ref=="num")
        {
            $(this).bind("keyup",function(){
                if(number_check( $(this) )==false){return;}
            });
        }
    });

    $("form").each(function(){
        var actionValue = $(this).attr("action");

        if ( actionValue == undefined )
        {
            $(this).removeAttr("action");
        }

        if ( actionValue == "" )
        {
            $(this).removeAttr("action");
        }

        if ( actionValue == "#" )
        {
            $(this).removeAttr("action");
        }
    });
});

//모바일 체크
function _trackPage(code)
{
    var isMobile = "web";
    //모바일 브라우저 문자열 체크
    var mobileInfo = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
    for (var info in mobileInfo){
        if (navigator.userAgent.match(mobileInfo[info]) != null){
            isMobile = "mob";
            break;
        }
    }

    var tracking_image  = isMobile + "-" + code;
    var track_image = new Image();
    //track_image.src = "http://sys.mdplus.kr/@interface/@Traffic.asp?param="+tracking_image+"&random="+Math.random();
    ga('send', 'pageview', tracking_image);
}

/**페이스북**/
function facebookFeed( param, callback, failed )
{
    FB.ui(
               {
                    method: 'share_open_graph',
                    action_type : 'og.shares',
                    action_properties : JSON.stringify({
                        object : {
                            'og:url':param.link,
                            'og:title': param.title,
                            'og:description':param.description,
                            'og:image': param.image
                        }
                    })
               }
       ,
       function(response) {

         if (response && !response.error_message) {
           callback();
         } else {
           failed();
         }
       }
     );
}

/**트위터**/
function twitterShare( param )
{
    var popTitle= "twiiter_share_pop";
    winPopUPCenter("", popTitle, 800, 500, "yes", "yes");


     var formTag = '<form id="twitterForm"><input name="use_type" type="hidden" value="starbucks_renewal" /><input name="imageUrl" type="hidden" value="'+param.image+'" /><input name="message" type="hidden" value="'+param.description+'" /></form>';
     $("body").append(formTag);

     setTimeout(function(){
         $("#twitterForm").attr("action", "http://sns.istarbucks.co.kr/twitterConnect.php");
         $("#twitterForm").attr("method", "post");
         $("#twitterForm").attr("target", popTitle);
         $("#twitterForm").submit();
         $("#twitterForm").remove();
     },100);
}

/**카카오스토리**/
function kakaoShare( param )
{
    var popTitle= "kakao_share_pop";
    winPopUPCenter("", popTitle, 800, 500, "yes", "yes");


     var formTag = '<form id="twitterForm"><input name="use_type" type="hidden" value="starbucks_renewal" /><input name="imageUrl" type="hidden" value="'+param.image+'" /><input name="message" type="hidden" value="'+param.description+'" /></form>';
     $("body").append(formTag);

     setTimeout(function(){
         $("#twitterForm").attr("action", "http://sns.istarbucks.co.kr/kakaoConnect.php");
         $("#twitterForm").attr("method", "post");
         $("#twitterForm").attr("target", popTitle);
         $("#twitterForm").submit();
         $("#twitterForm").remove();
     },100);
}

/**카카오톡**/
function kakaoTalkShare( param ){


    /**
    Kakao.Link.sendTalkLink({
        label: param.description,
        image: {
            src: param.image,
            width: '300',
            height: '200'
        },
        webButton: {
            text: "스타벅스 매장" ,
            url:  param.link
        }
    });
    **/
    Kakao.Link.sendTalkLink({
        label: param.description,
        webButton: {
            text: "스타벅스 매장" ,
            url:  param.link
        }
    });
}

function __ajaxCall(url, param, async, responseType, method, success, failed){

    //var token = $("meta[name='_csrf']").attr("content");
    //var header = $("meta[name='_csrf_header']").attr("content");

    var isRandom = Math.random();
    param.rndCod = randomString();

    if (async==false)
    {
        var response;
        if (!responseType) { responseType = "text";	}
        if (!method) { method = "GET";	}

        try{
            var option = {
                 type			: method												,
                 url			: url													,
                 data			: param													,
                 scriptCharset	: "utf-8"												,
                 //beforeSend		: function(xhr){xhr.setRequestHeader(header, token);}	,
                 contentType	: "application/x-www-form-urlencoded; charset=UTF-8"	,
                 async			: async													,
                 dataType		: responseType											,
                 success        : function(data){
                        response = data;
                 }
                 ,
                 error			: function(data){
                     response = "ERR_2";
                 }
            };

            if (responseType == "jsonp") {
                option.jsonp = "callback";
            }

            $.ajax(option);
        }catch (err){
            //console.log(err);
            response = "ERR";

            return true;
        }

        return response;
    }
    else
    {
        var response;
        if (!responseType) { responseType = "text";	}
        if (!method) { method = "GET";	}

        var option = {
                 type			: method												,
                 url			: url													,
                 data			: param													,
                 scriptCharset	: "utf-8"												,
                 //beforeSend		: function(xhr){xhr.setRequestHeader(header, token);}	,
                 contentType	: "application/x-www-form-urlencoded; charset=UTF-8"	,
                 async			: async													,
                 dataType		: responseType											,
                 success        : function(data){ success(data); }					    ,
                 error			: function(data){ failed(data); }
            };

        if (responseType == "jsonp") {
            option.jsonp = "callback";
        }

        //option.crossDomain = true;

        $.ajax(option);
    }
}

function __ajaxCallH(url, jsessionId, param, async, responseType, method, fnSuccess, fnError){

    //var token = $("meta[name='_csrf']").attr("content");
    //var header = $("meta[name='_csrf_header']").attr("content");

    var isRandom = Math.random();
    param.rndCod = randomString();

    if (async==false)
    {
        var response;
        if (!responseType) { responseType = "text";	}
        if (!method) { method = "GET";	}

        try{
            var option = {
                 type			: method												,
                 url			: url													,
                 data			: JSON.stringify(param)									,
                 scriptCharset	: "utf-8"												,
                 beforeSend		: function(xhr){
                	 xhr.setRequestHeader("Content-Type", "application/json");
                	 xhr.setRequestHeader("Accept", "application/json");
                	 xhr.setRequestHeader("JSESSIONID", jsessionId);                	
                 },
                 contentType	: "application/json; charset=utf-8"	,
                 async			: async													,
                 dataType		: responseType											,
                 success        : function(data,status,xhr){
                     // 서버에서 Reverse Proxy에 Exposed-Header 설정 추가해서 Header에 resultCode 및 resultMessage 노출 허용
                     var resultCode = xhr.getResponseHeader("resultCode");
                     var resultMessage = xhr.getResponseHeader("resultMessage");

                     // 메시지 디코딩 및 띄어쓰기 치환
                     resultMessage = decodeURIComponent(resultMessage).replaceAll('+', ' ');

                     if(data != null && data != "" && jQuery.parseJSON(data).status == 404){
                         resultCode = "ERROR";
                     }

                     response = {
                         result_code: resultCode,
                         result_message: resultMessage,
                         data: data
                     };
                     fnSuccess(response);
                 },
                 error			: fnError
            };

            if (responseType == "jsonp") {
                option.jsonp = "callback";
            }

            $.ajax(option);
        }catch (err){
            console.log(err);
            //response = "ERR";

            return true;
        }

        //return response;
    }
    else
    {
        var response;
        if (!responseType) { responseType = "text";	}
        if (!method) { method = "GET";	}

        var option = {
                 type			: method												,
                 url			: url													,
                 data			: param													,
                 scriptCharset	: "utf-8"												,
                 beforeSend		: function(xhr){
                	 xhr.setRequestHeader("Content-Type", "application/json");
                	 xhr.setRequestHeader("Accept", "application/json");
                	 xhr.setRequestHeader("JSESSIONID", jsessionId);                	
                 },
                 contentType	: "application/x-www-form-urlencoded; charset=UTF-8"	,
                 async			: async													,
                 dataType		: responseType											,
                 success        : function(data){ fnSuccess(data); }					    ,
                 error			: function(data){ fnError(data); }
            };

        if (responseType == "jsonp") {
            option.jsonp = "callback";
        }

        //option.crossDomain = true;

        $.ajax(option);
    }
}



function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}

function randomString() {
    var chars = "0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ";
    var string_length = 10;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
}

function formatnumber(n) {
    n = $.trim(n).split(",").join("");
    var reg = /(^[+-]?\d+)(\d{3})/;
    n += '';
    while (reg.test(n))
        n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}

function empty_check(str,msg,t,f, msg2){
    var nidV = $(str).val();
    var nidB = nidV.indexOf(" ");

    if (nidV==""){
        alert(msg);
        $(str).focus();
        return false;
    }

    if (t==false)
    {
        if (nidB > 0 )
        {
            alert(msg2);

            if (f)
            {
                $(str).focus();
            }

            return false;
        }
    }
}

function randomIt(from, to)
{
    return Math.floor((Math.random()*(to - from + 1)) + from);
}

function pattern_check(str,msg1,msg2, ptrn){
    var nidV = $(str).val();
    var ptrnCheckBool = false;
    ptrnCheckBool = nidV.match( ptrn );

    if (nidV==""){
        alert(msg1);
        $(str).focus();
        return false;
    }
    else
    {
        if (ptrnCheckBool==null)
        {
            alert(msg2);
            $(str).val("");
            $(str).focus();
            return false;
        }
    }

}

function pattern_check_noid(str ,msg1,msg2, ptrn){
    var ptrnCheckBool = false;

    nidV          = str + '';
    ptrnCheckBool = str.match( ptrn );

    if (str==""){
        alert(msg1);
        return false;
    }
    else
    {
        if (ptrnCheckBool==null)
        {
            alert(msg2);
            return false;
        }
    }
}

function number_check(wjd){
    var	wjdV = wjd.val();
    var   wjdL = wjdV.length;

    for(i=0;i<wjdL;i++) {
        var val = "0123456789";
        if(parseInt(val.indexOf(wjdV.substring(i,i+1))) < 0) {
            wjd.val('');
            return false;
        }
    }
}

function winPopUPCenter(url, winName, pwidth, pheight, scrollYN, resizeYN) {
     var win = null;
     var winL = (screen.width-pwidth)/2;
     var winT = (screen.height-pheight)/2;
     var spec = 'toolbar=no,'; // 도구메뉴
     spec += 'status=no,'; // 상태바
     spec += 'location=yes,'; // 주소관련메뉴
     spec += 'height='+pheight+','; // 높이
     spec += 'width='+pwidth+','; // 너비
     spec += 'top='+winT+','; // 세로위치
     spec += 'left='+winL+','; // 가로위치
     spec += 'scrollbars='+(scrollYN == undefined ? "no" : scrollYN)+','; // 스크롤바 여부(기본)
     spec += 'resizable='+(resizeYN == undefined ? "no" : resizeYN); // 창크기조정 여부
     win = window.open(url, winName, spec);
     if(parseInt(navigator.appVersion) >= 4) {
      win.window.focus();
     }
}

function _trackPage(code)
{
    var isMobile = "web";
    //모바일 브라우저 문자열 체크
    var mobileInfo = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
    for (var info in mobileInfo){
        if (navigator.userAgent.match(mobileInfo[info]) != null){
            isMobile = "mob";
            break;
        }
    }

    var tracking_image  = isMobile + "-" + code;
    var track_image = new Image();
    //track_image.src = "http://sys.mdplus.kr/@interface/@Traffic.asp?param="+tracking_image+"&random="+Math.random();
    //ga('send', 'pageview', tracking_image);
}


String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}

function fnLPAD(val,set,cnt)
{
      if( !set || !cnt || val.length >= cnt)
      {
           return val;
      }

      var max = (cnt - val.length)/set.length;

      for(var i = 0; i < max; i++)
      {
           val = set + val;
      }

      return val;
}


function createMail(z){
    var applymail = "";
    var mailers = new Array(
        "hotmail.com",
        "yahoo.co.kr",
        "hanmir.com",
        "naver.com",
        "empal.com",
        "hitel.net",
        "netian.com",
        "nate.com",
        "korea.com",
        "hanmail.net",
        "freechal.com",
        "lycos.co.kr",
        "gmail.com"
    );


    var mailersDisplay = new Array(
            "hotmail.com",
            "yahoo.co.kr",
            "hanmir.com",
            "naver.com",
            "empal.com",
            "hitel.net",
            "netian.com",
            "nate.com",
            "korea.com",
            "hanmail.net",
            "freechal.com",
            "lycos.co.kr",
            "gmail.com"
        );

    z = (z != undefined ? z : "");
    for(i = 0;i < mailers.length;i++){
        applymail += "<option value='" + mailers[i] + "' "+ (z == mailers[i] ? "selected" : "") +">" + mailersDisplay[i] + "</option>";
    }

    return applymail;
}

function createPhone(z){
    var applyPhone = "";
    var Phone = new Array(
        "02",
        "031",
        "032",
        "033",
        "041",
        "042",
        "043",
        "051",
        "052",
        "053",
        "054",
        "055",
        "061",
        "062",
        "063",
        "064",
        "070"
    );

    z = (z != undefined ? z : "");
    for(i = 0;i < Phone.length;i++){
        applyPhone += "<option value='" + Phone[i] + "' "+ (z == Phone[i] ? "selected" : "") +">" + Phone[i] + "</option>";
    }

    return applyPhone;
}

function createMobile(z){
    var applyMobile = "";
    var Mobile = new Array(
        "010",
        "011",
        "016",
        "017",
        "018",
        "019"
    );

    z = (z != undefined ? z : "");
    for(i = 0;i < Mobile.length;i++){
        applyMobile += "<option value='" + Mobile[i] + "' "+ (z == Mobile[i] ? "selected" : "") +">" + Mobile[i] + "</option>";
    }
    return applyMobile;
}


function getPattern(type)
{
      switch(type)
      {
        case "BASIC":  //숫자 영어만
            pattern = /^[A-Za-z0-9+]*$/;
            break;

        case "BASIC2":  //한글 숫자 영어만
            pattern =  /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*-_.]+$/;
            break;

        case "BASIC3":  //한글 숫자 영문 특수문자 !@#?$%&*ㅖ{.,<>
            pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s!@#?:$%&*().\r\n,<>\*]+$/;
            break;

        case "BASIC4":  //숫자 영문 특수문자_ - .
            pattern = /^[a-z|A-Z|0-9|._-]+$/;
            break;

        case "NUM": //숫자만
            pattern = /^[0-9]+$/;
            break;

        case "NUM2": //숫자만 .
            pattern = /^[0-9.]+$/;
            break;

        case "PHONE" :		// 전화번호 (####-####-####)
            pattern = /^[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}$/;
            break;

        case "MOBILE" :		// 휴대전화 (0##-####-####)
            pattern = /^0[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
            break;

        case "ZIPCODE" :	// 우편번호 (###-###)
            pattern = /^[0-9]{3}-[0-9]{3}$/;
            break;

        case "EMAIL": //메일
            //pattern = /^[._a-zA-Z0-9-]+@[._a-zA-Z0-9-]+\.[a-zA-Z]+$/;
            pattern = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,4}$/;
            break;

        case "DOMAIN": //영자 숫자와	.	다음도 영자
            pattern = /^[.a-zA-Z0-9-]+.[a-zA-Z]+$/;
            break;

        case "ENG": //영자만
            pattern = /^[a-zA-Z]+$/;
              break;

        case "ENGNUM": //영자와	숫자
            pattern = /^[a-zA-Z0-9]+$/;
              break;

        case "KOR" :		// 한글
            pattern = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;
            break;

        case "ACCOUNT": //숫자	와 '-'
            pattern = /^[0-9-]+$/;
            break;

        case "HOST": //영자	와 '-'
            pattern = /^[a-zA-Z-]+$/;
            break;
        case "ID": //첫글자는 영자 그 뒤엔 영어숫자 6이상 15자리	이하
            //pattern = /^[a-zA-Z]{1}[a-zA-Z0-9_-]{5,15}$/;
            pattern = /^[a-zA-Z]{1}[a-zA-Z0-9]{5,15}$/;
            break;

        case "ID2": //첫글자는	영자 그뒤엔	영어숫자 4이상 15자리	이하
            pattern = /^[a-zA-Z0-9._-]+$/;
            break;

        case "DATE": //	형식 : 2002-08-15
            pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
            break;

        case "JUMIN" :		// 주민등록번호
            //pattern = /^[0-9]{6}-[0-9]{7}$/;
            pattern = /^[0-9]{13}$/;
            break;
        default :
          return false;
      }
    return pattern;
}

function stringToHtml( target )
{
    var result = 	target.replace(/&amp;/gi, "&").replace(/&#35;/gi, "#").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, "'").replace(/&#39;/gi, '\\').replace(/&#37;/gi, '%').replace(/&#40;/gi, '(').replace(/&#41;/gi, ')').replace(/&#43;/gi, '+').replace(/&#47;/gi, '/').replace(/&#46;/gi, '.').replace(/&#59;/g, ";");
    return result;
}


function chkPattern(str,type)	//형식 체크
{
  switch(type)
  {
    case "NUM": //숫자만
        pattern = /^[0-9]+$/;
        break;

    case "NUM2": //숫자만 .
        pattern = /^[0-9.]+$/;
        break;

    case "PHONE" :		// 전화번호 (####-####-####)
        pattern = /^[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}$/;
        break;

    case "MOBILE" :		// 휴대전화 (0##-####-####)
        pattern = /^0[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
        break;

    case "ZIPCODE" :	// 우편번호 (###-###)
        pattern = /^[0-9]{3}-[0-9]{3}$/;
        break;

    case "EMAIL": //메일
        //pattern = /^[._a-zA-Z0-9-]+@[._a-zA-Z0-9-]+\.[a-zA-Z]+$/;
        pattern = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,4}$/;
        break;

    case "DOMAIN": //영자 숫자와	.	다음도 영자
        pattern = /^[.a-zA-Z0-9-]+.[a-zA-Z]+$/;
        break;

    case "ENG": //영자만
        pattern = /^[a-zA-Z]+$/;
          break;

    case "ENGNUM": //영자와	숫자
        pattern = /^[a-zA-Z0-9]+$/;
          break;

    case "KOR" :		// 한글
        pattern = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;
        break;

    case "ACCOUNT": //숫자	와 '-'
        pattern = /^[0-9-]+$/;
        break;

    case "HOST": //영자	와 '-'
        pattern = /^[a-zA-Z-]+$/;
        break;
    case "ID": //첫글자는 영자 그 뒤엔 영어숫자 6이상 15자리	이하
        //pattern = /^[a-zA-Z]{1}[a-zA-Z0-9_-]{5,15}$/;
        pattern = /^[a-zA-Z]{1}[a-zA-Z0-9]{5,15}$/;
        break;

    case "ID2": //첫글자는	영자 그뒤엔	영어숫자 4이상 15자리	이하
        pattern = /^[a-zA-Z0-9._-]+$/;
        break;

    case "DATE": //	형식 : 2002-08-15
        pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        break;

    case "JUMIN" :		// 주민등록번호
        //pattern = /^[0-9]{6}-[0-9]{7}$/;
        pattern = /^[0-9]{13}$/;
        break;

      case "STORE" : //한글,영어,공백,특수문자 .&-() 허용
        pattern = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s\&\.\-\(\)]+$/;
        break;
    default :
      return false;
  }
    return pattern.test(str);
}


$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


(function($){
    //default properties.
    var a=/a/i,defs={
        item		: 'li',
        next		: '<a href="javascript:void(0)"><img alt="앞으로" src="//image.istarbucks.co.kr/common/img/util/ec/next.jpg"></a>'		,
        prev		: '<a href="javascript:void(0)"><img alt="앞으로" src="//image.istarbucks.co.kr/common/img/util/ec/prev.jpg"></a>'		,
        format		: '<a href="javascript:void(0)">{0}</a>'																										,
        itemClass	: ''																																	,
        sideClass	: 'control'																							,
        itemCurrent	: 'active'																							,
        length		: 5																								,
        max			: 1								,
        current		: 1								,
        append		: false							,
        href			: '#'							,
        event		: true							,
        first			: '<a href="javascript:void(0)"><img alt="처음으로" src="//image.istarbucks.co.kr/common/img/util/ec/first.jpg"></a>'							,
        last			: '<a href="javascript:void(0)"><img alt="끝으로" src="//image.istarbucks.co.kr/common/img/util/ec/last.jpg"></a>'
    },format=function(str){
        var arg=arguments;
        return str.replace(/\{(\d+)\}/g,function(m,d){
            if(+d<0) return m;
            else return arg[+d+1]||"";
        });
    },item,make=function(op,page,cls,str){

        item=document.createElement(op.item);



        item.className=cls;
        item.innerHTML=format(str,page,op.length,op.start,op.end,op.start-1,op.end+1,op.max);



        if(a.test(op.item)) item.href=format(op.href,page);



        if(op.event){
            $(item).bind('click',function(e){
                var fired=true;
                if($.isFunction(op.onclick)) fired=op.onclick.call(item,e,page,op);
                if(fired==undefined||fired)
                    op.origin.paging($.extend({},op,{current:page}));
                return fired;
            }).appendTo(op.origin);
            //bind event for each elements.
            var ev='on';
            switch(str){
                case op.prev:ev+='prev';break;
                case op.next:ev+='next';break;
                case op.first:ev+='first';break;
                case op.last:ev+='last';break;
                default:ev+='item';break;
            }
            if($.isFunction(op[ev])) op[ev].call(item,page,op);

        }
        if(op.item == "button"){
            $(item).attr("data-role", "button").attr("data-theme", "p").attr("data-inline", "true");

            if(str == "이전으로"){
                $(item).attr("data-icon", "prev").attr("data-iconpos", "notext");
            }else if(str == "다음으로"){
                $(item).attr("data-icon", "next").attr("data-iconpos", "notext");
            }

            $(".pagenation").trigger('create');
        }

        return item;
    };

    $.fn.paging=function(op){

        var viewCurrent = 0;
        op=$.extend({origin:this},defs,op||{});this.html('');

        if(op.max<1) op.max=1;
        if(op.current<1) op.current=1;

        op.start	= Math.floor((op.current-1)/op.length)*op.length+1;
        op.end		= op.start-1+op.length;



        if(op.end>op.max) op.end=op.max;
        if(!op.append) this.empty();


        //prev button
        if(op.current > op.length){
            //if(op.first!==false) make(op,1,op.sideClass,op.first);
            make(op, (op.start-1) - op.length + 1,op.sideClass,op.prev);
        }

        //pages button
        for(var i=op.start;i<=op.end;i++)
        {
            make(op,i,op.itemClass+(i==op.current?' '+op.itemCurrent:''),op.format);
            viewCurrent = i;

        }

        //next button
        if(viewCurrent <  op.max )
        {

            //console.log( op.max + '====' + viewCurrent + '---' + Math.floor(op.max/op.length) * op.length );
            make(op,op.end+1,op.sideClass,op.next);
            //if(op.last!==false) make(op,op.max,op.sideClass,op.last);
        }

        //last button
    };
})(jQuery);

var Cookies = {

        getCookie : function(name){						//쿠키값 가져오기
            var nameOfCookie = name + "=";
            var x = 0;
            while ( x <= document.cookie.length ) {
                var y = (x+nameOfCookie.length);
                if ( document.cookie.substring( x, y ) == nameOfCookie ) {
                    if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) endOfCookie = document.cookie.length;
                    return unescape( document.cookie.substring( y, endOfCookie ) );
                }
                x = document.cookie.indexOf( " ", x ) + 1;
                if ( x == 0 ) break;
            }
            return "";
        },

        deleteCookie : function(cookieName){		//쿠키값 삭제하기
            var expireDate = new Date();

            //어제 날짜를 쿠키 소멸 날짜로 설정한다.
            expireDate.setDate( expireDate.getDate() - 1 );
            document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
        },

        setCookie : function(name, value, expiredays){		//쿠키값 적용하기
            var todayDate = new Date();
            todayDate.setDate( todayDate.getDate() + expiredays );
            document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
        }

    }

function convert_ohy(text) {
    text = text.replace(/%20/gi, " ");
    text = text.replace(/&amp;/gi, "&");
    text = text.replace(/&#35;/gi, "#");
    text = text.replace(/&lt;/gi, "<");
    text = text.replace(/&gt;/gi, ">");
    text = text.replace(/&quot;/gi, "'");
    text = text.replace(/&#39;/gi, '\\');
    text = text.replace(/&#37;/gi, '%');
    text = text.replace(/&#40;/gi, '(');
    text = text.replace(/&#41;/gi, ')');
    text = text.replace(/&#43;/gi, '+');
    text = text.replace(/&#47;/gi, '/');
    text = text.replace(/&#46;/gi, '.');
    text = text.replace(/&#59;/g, ";");

    return text;
}

jQuery.fn.center = function () {
    //this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}

jQuery.fn.stbScrollTop = function () {
    //모바일 대응
    if($(window).width() <= 640) {
        if ($(window).scrollTop() > $(this).offset().top - 100){
            $(window).scrollTop($(this).offset().top - 100);
        }
    } else {
        if ($(window).scrollTop() > $(this).offset().top - 160){
            $(window).scrollTop($(this).offset().top - 160);
        }
    }
}