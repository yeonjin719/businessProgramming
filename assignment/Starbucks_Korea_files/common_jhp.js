// console 없는 browser 대비
if (window['console'] === undefined || console.log === undefined ) {
	console = {log: function() {}, info: function() {}, warn: function () {}, error: function() {}};
}

// jQuery trim 되지 않는 경우 대비
if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

// IE8 이하는 isArray 지원 안 함
if (Array.isArray == undefined) {
	Array.isArray = function (obj) {
	    return Object.prototype.toString.call(obj) === "[object Array]";
	};
}


$(document).ready(function () {
	$("a[href=#]").attr("href", "javascript:void(0);");
	
	if (location.href.indexOf("/find_") > -1) {
		$(document).on("blur, keydown", ".input_warn", function () {
			$(this).removeClass("input_warn");
			$("#" + $(this).data("warn_id")).text("");
		});
	}
});


function showPopupCenter(url, winName, pwidth, pheight, scrollYN, resizeYN) {
	 var winL = (screen.width-pwidth)/2;
	 var winT = (screen.height-pheight)/2;
	 var spec  = 'toolbar=no';			// 도구메뉴
		 spec += ',status=no';			// 상태바
		 spec += ',location=yes';		// 주소관련메뉴
		 spec += ',height='+pheight;	// 높이
		 spec += ',width='+pwidth;		// 너비
		 spec += ',top='+winT;			// 세로위치
		 spec += ',left='+winL;			// 가로위치
		 spec += ',scrollbars='+(scrollYN == undefined ? "no" : scrollYN);	// 스크롤바 여부(기본)
		 spec += ',resizable='+(resizeYN == undefined ? "no" : resizeYN);	// 창크기조정 여부
	 var win = window.open(url, winName.replace(" ", "_"), spec);

	 if(parseInt(navigator.appVersion) >= 4) {
		 win.window.focus();
	 }
	 
	 return win;
}

var m_regex_id = /^[-A-Za-z0-9_]{4,13}$/;
var m_regex_birth = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
var m_regex_email = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*@\w+([-.]\w+)*\.[a-zA-Z]{2,5}$/;
var m_regex_hp    = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
var m_regex_tel   = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))-(\d{3,4})-(\d{4})$/;
var m_regex_pwd1  = /^((?=.*[a-zA-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()\-_\=+\\\|]).{8,})$/;
var m_regex_pwd2  = /^((?=.*[a-zA-Z])(?=.*[0-9]).{10,})$/;
var m_regex_pwd_text = "영문/숫자/특수기호를 혼합하여 8자 이상 입력하거나,\n영문/숫자를 혼합하여 10자 이상 입력하세요.";
var m_regex_name  = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]+$/;

function checkValid(_strSelector, _strMsg, _strType, _strMsg2) {
	if ($(_strSelector) == undefined) {
		return true;
	}
	
	var strValue = "";
	$(_strSelector).each(function (_nIdx) {
		strValue += $.trim($(this).val());
		
		if (_nIdx < $(_strSelector).length - 1) {
			switch (_strType) {
				case "BIRTH":
				case "HP":
				case "TEL":
					strValue += "-";
					break;
		
				case "EMAIL":
					strValue += "@";
					break;
			}	
		}
	});
	
	if (strValue == undefined || strValue.trim() == "") {
		if (_strMsg) {
			alert(_strMsg);
			$(_strSelector).focus();
		}
		return true;
	}

	if (_strType != undefined) {
		var objRegex = null;
		
		switch (_strType) {
			case "BIRTH":
				objRegex = m_regex_birth;
				break;
		
			case "EMAIL":
				objRegex = m_regex_email;
				break;
				
			case "HP":
				objRegex = m_regex_hp;
				if (strValue.indexOf("-") == -1) {
					strValue = getPhoneNumberStringFormat(strValue);
				}
				break;

			case "TEL":
				objRegex = m_regex_tel;
				break;
				
			case "PASSWORD":
			case "PASSWORD_CHECK":
				objRegex = m_regex_pwd1;
				if (strValue.length > 9) {
					objRegex = m_regex_pwd2;	
				}
				break;

			case "NAME":
				objRegex = m_regex_name;
				break;
		}

		if (objRegex != null) {
			if (objRegex.test(strValue.trim()) == false) {
				if (_strMsg || _strMsg2) {
					alert( (_strMsg2) ? _strMsg2 : _strMsg );
					$(_strSelector).focus();
				}				
				return true;
			}
		}
	}

	return false;
}

function checkValid2(_strTargetSelector, _strType) {
	var strValue = "";
	var msg      = "";
	var objRegex = "";

	$(_strTargetSelector).each(function (_nIdx) {
		strValue += $.trim($(this).val());
		
		if (_nIdx < $(_strTargetSelector).length - 1) {
			switch (_strType) {
				case "BIRTH":
				case "HP":
					strValue += "-";
					break;
			}
		}
	});
	
	if (strValue == "") {	// 값이 없으면..
		switch (_strType) {
			case "ID":
				msg = "아이디를 입력 하세요.";
				break;
			case "NAME":
				msg = "이름을 입력 하세요.";
				break;
			case "EMAIL":
				msg = "이메일을 입력 하세요.";
				break;
			case "PASSWORD":
				msg = "비밀번호를 입력 하세요.";
				break;
			case "PASSWORD_CHECK":
				msg = "비밀번호를 다시 입력 하세요.";
				break;
			case "HP":
				msg = "휴대폰 번호를 입력 하세요.";
				break;
			case "BIRTH":
				msg = "생년월일을 입력 하세요.";
				break;
			case "NICKNAME":
				msg = "닉네임을 입력 하세요.";
				break;
		}
		return msg;
	}
	
	if (_strType) {
		switch (_strType) {
			case "ID":
			msg = "영문(대소문자 구분 없음), 숫자로 4~13자리만 입력 가능합니다.";
			objRegex = m_regex_id;
			break;
			
			case "EMAIL":
				msg = "잘못된 이메일 주소 입니다. 이메일 주소를 확인한 다음 다시 입력해 주세요.";
				objRegex = m_regex_email;
				break;
				
			case "HP":
				msg = "잘못된 휴대폰 번호 입니다. 휴대폰 번호를 확인한 다음 다시 입력해 주세요.";
				objRegex = m_regex_hp;
				if (strValue.indexOf("-") == -1 &&  strValue.length < 12) { 
					strValue = getPhoneNumberStringFormat(strValue);
				}
				break;

			case "PASSWORD":
			case "PASSWORD_CHECK":
				msg = m_regex_pwd_text; 
				objRegex = m_regex_pwd1;
				if (strValue.length > 9) {
					objRegex = m_regex_pwd2;	
				}
				break;
			case "BIRTH":
				msg = "생년월일을 정확히 선택 하세요.";
				objRegex = m_regex_birth;
				break;
		}
		
		if (objRegex) {
			if (objRegex.test(strValue.trim()) == false) {	// 유효성 체크
				return msg;
			}
		}
	}
	
	return "";
}

function addZero(number, length) {
	if (length === undefined) {
		length = 2;
	}

	var str = '' + number;
	while (str.length < length) {str = '0' + str;}
	return str;
}

function ___ajaxCall(_strUrl, _objParams, _bAsync, _strDataType, _strMethod, _fnSuccess, _fnError) {
	if (!_strDataType) _strDataType = "json";
	if (!_strMethod)   _strMethod   = "get";
	if (!_fnError) {
		_fnError = function(_error) {
			alert("처리 중 오류가 발생 했습니다.\n이용에 불편을 드려 죄송합니다.");
			try {
				$.commonLib.hideLoadingImg();	
			} catch (_e) {
			}			
			console.log(_error);
		};
	}

	var option = { 
		 type     : _strMethod
		,url      : _strUrl
		,data     : _objParams
		,async    : _bAsync
		,dataType : _strDataType
		,success  : _fnSuccess
		,error    : _fnError
	}; 
	
	if (_strDataType == "jsonp") {
		option.jsonp         = "callback";
	} else {
		option.scriptCharset = "utf-8";
		option.contentType   = "application/x-www-form-urlencoded; charset=UTF-8";
	}
	
	$.ajax(option);
}

function initBirth() {
	// 선택 된 년,월에 따라 일 수 변경
	$("[name='birth_year'], [name='birth_month']").on("change", function () {
		var nYear  = $("[name='birth_year']").val();
		var nMonth = $("[name='birth_month']").val();
		
		setDays(nYear, nMonth);
		
		$("[name='birth_day']").val("").trigger("change");
	});
	
	var dNow = new Date();
		dNow.setFullYear(dNow.getFullYear() - 14);
	var nNowYear  = dNow.getFullYear();
	var nNowMonth = dNow.getMonth() + 1;
	
	setYears(nNowYear);
	setMonths();
	setDays(nNowYear, nNowMonth);
	
	$("[name='birth_year']").val("").trigger("change");
	$("[name='birth_month']").val("").trigger("change");
	$("[name='birth_day']").val("").trigger("change");
}

function setYears(_nLastYear) {
	$("[name='birth_year']").html('<option value="">선택</option>');
	
	for (var i = _nLastYear; i >= _nLastYear - 100; i--) {
		var $option = $('<option value="' + i + '">' + i + '년</option>');

		$("[name='birth_year']").append( $option );
	}
}

function setMonths() {
	$("[name='birth_month']").html('<option value="">선택</option>');
	
	for (var i = 1; i <= 12; i++) {
		var nSaveVal = addZero(i, 2);
		var $option  = $('<option value="' + nSaveVal + '">' + i + '월</option>');
		
		$("[name='birth_month']").append( $option );
	}
}

function setDays(_nYear, _nMonth) {
	$("[name='birth_day']").html('<option value="">선택</option>');
	
	var d = new Date(_nYear, _nMonth, 1);
		d.setDate(d.getDate() - 1);

	for (var i = 1; i <= d.getDate(); i++) {
		var nSaveVal = addZero(i, 2);
		var $option  = $('<option value="' + nSaveVal + '">' + i + '일</option>');
		
		$("[name='birth_day']").append( $option );
	}
}

function initEmail() {
	var arrEmail = ["daum.net", "gmail.com", "hanmail.net", "me.com", "nate.com", "naver.com"];
	
	for (var i in arrEmail) {
		var $option = $('<option value="' + arrEmail[i] + '">' + arrEmail[i] + '</option>');

		$("[name='email_select']").append( $option );
	}
	
	$("[name='email_select']").on("change", function () {
		if ($(this).val() == "") {
			$("#email_2").val("");
		} else {
			$("#email_2").val($(this).val());
		}
	});
}

function goWithPostData(_arrKeyAndValues, _strAction, _strTarget) {
	var id = "form" + $("form").length;
	
	var $form = $('<form id="' + id + '" method="post" />');
		$form.attr("action", _strAction);
	
	if (_strTarget) {
		$form.attr("target", _strTarget);
	}
	
	if (Array.isArray(_arrKeyAndValues) == false) {
		_arrKeyAndValues = [ _arrKeyAndValues ];
	}
		
	for (var i = 0; i < _arrKeyAndValues.length; i++) {
		var $input = $('<input type="hidden" />');
			$input.attr("name", _arrKeyAndValues[i]["KEY"]);
			$input.attr("id", _arrKeyAndValues[i]["KEY"]);
			$input.attr("value", _arrKeyAndValues[i]["VALUE"]);
		
		$form.append( $input );
	}
	
	$("body").append($form);
	
	$("#" + id).submit();
}

function getDateDiff(date1,date2) {
    var arrDate1 = date1.split("-");
    var getDate1 = new Date(parseInt(arrDate1[0]),parseInt(arrDate1[1])-1,parseInt(arrDate1[2]));
    var arrDate2 = date2.split("-");
    var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));
    
    var getDiffTime = getDate1.getTime() - getDate2.getTime();
    
    return Math.floor(getDiffTime / (1000 * 60 * 60 * 24));
}

function getDateStringFormat(_objValue, _strFormat) {
	if (_objValue == "") {
		return "";
	}
	
	if (_objValue == undefined) {
		_objValue = new Date();
	}
	
	if (_strFormat == undefined) {
		_strFormat = "YYYY-MM-DD";
	}
	
	switch (_strFormat) {
		case "YYYYMMDD":
			return _objValue.getFullYear() + addZero((_objValue.getMonth() + 1), 2) + addZero(_objValue.getDate(), 2);	
			break;
		case "YYYYMMDDHHMMSS":
			return _objValue.getFullYear() + addZero((_objValue.getMonth() + 1), 2) + addZero(_objValue.getDate(), 2) + addZero(_objValue.getHours(), 2) + addZero(_objValue.getMinutes(), 2) + addZero(_objValue.getSeconds(), 2);
			break;
		case "YYYY-MM-DD":
			if (typeof(_objValue) == "string") {
				return _objValue.substr(0, 4) + "-" + _objValue.substr(4, 2) + "-" + _objValue.substr(6, 2);
			} else {
				return _objValue.getFullYear() + "-" + addZero((_objValue.getMonth() + 1), 2) + "-" + addZero(_objValue.getDate(), 2);	
			}
			break;
		case "YYYY-MM-DD HH:MM:SS":
			if (typeof(_objValue) == "string") {
				return _objValue.substr(0, 4) + "-" + _objValue.substr(4, 2) + "-" + _objValue.substr(6, 2) + " " + _objValue.substr(8, 2) + ":" + _objValue.substr(10, 2) + ":" + _objValue.substr(12, 2);
			} else {
				return _objValue.getFullYear() + "-" + addZero((_objValue.getMonth() + 1), 2) + "-" + addZero(_objValue.getDate(), 2) + " " + addZero(_objValue.getHours(), 2) + ":" + addZero(_objValue.getMinutes(), 2) + ":" + addZero(_objValue.getSeconds(), 2);	
			}
		case "YYYY-MM-DD (HH:MM:SS)":
			if (typeof(_objValue) == "string") {
				return _objValue.substr(0, 4) + "-" + _objValue.substr(4, 2) + "-" + _objValue.substr(6, 2) + " (" + _objValue.substr(8, 2) + ":" + _objValue.substr(10, 2) + ":" + _objValue.substr(12, 2) + ")";
			} else {
				return _objValue.getFullYear() + "-" + addZero((_objValue.getMonth() + 1), 2) + "-" + addZero(_objValue.getDate(), 2) + " (" + addZero(_objValue.getHours(), 2) + ":" + addZero(_objValue.getMinutes(), 2) + ":" + addZero(_objValue.getSeconds(), 2) + ")";	
			}
			break;
	}
}

function getWeekDayText(date) {
	/* date : 2015-11-18 */
	var d = new Date(date);
	var week = new Array('일','월','화','수','목','금','토');
	return week[d.getDay()];
}

function getPhoneNumberStringFormat(_strValue, _strDelimiter) {
	if (_strValue == undefined) {
		_strValue = "";
	} else {
		_strValue = $.trim(_strValue);
	}
	
	if (_strDelimiter == undefined) {
		_strDelimiter = "-";
	}
	
	switch(_strValue.length) {
		case 8:
			_strValue = _strValue.substr(0, 4) + _strDelimiter + _strValue.substr(4);
			break;
		case 10:
			_strValue = _strValue.substr(0, 3) + _strDelimiter + _strValue.substr(3, 3) + _strDelimiter + _strValue.substr(6);
			break;
		default:
			_strValue = _strValue.substr(0, 3) + _strDelimiter + _strValue.substr(3, 4) + _strDelimiter + _strValue.substr(7, 4);
			break;
	}
	
	return _strValue;
}

function cutStrKor(str, len, dot) {
	if (dot == undefined) {
		dot = "..";
	}
	var s = 0;
	for (var i = 0; i < str.length; i++) {
		s += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (s > len)
			return str.substring(0, i) + dot;
	}
	return str;
}

function getRewardSummary() {
	if (m_jsonRewardSummary == null) {
		___ajaxCall("/interface/getMsrRewardSummary.do", {}, false, "json", "post"
			,function (_response) {
				if (_response.result_code == "SUCCESS") {
					m_jsonRewardSummary = jQuery.parseJSON(_response.data);
				}
			}
		);
	}
}

function getSecureValue(_strValue, _nLength, _strMark) {
	if (_nLength == undefined) {
		_nLength = 2;
	}
	
	if (_strMark == undefined) {
		_strMark = "*";
	}
	
	var result = _strValue.substr(0, _strValue.length - _nLength);
	for (var i = 0; i < _nLength; i++) {
		result += _strMark;
	}
	
	return result;
}

function getGoldCardRegStatusText(_strStatus) {
	var text = "";
	
	switch (_strStatus) {
		case "A":	// 신청접수
			text = "준비중";
			break;
		
		case "C":	// 발행확인
		case "Q":	// 발행요청
			text = "제작중";
			break;
			
		case "D":	// 매장입고
			text = "매장도착";
			break;
		
		case "E":	// 고객인증
			text = "카드등록";
			break;
			
		case "Z":	// 미수령폐기
			text = "미수령폐기";
			break;
	}
	
	return text;
}

function checkEucKr(_strText) {
	// 완성형 글자표 (한글/특문/한자 순)
	var EUCKR_CHARS  = "가각간갇갈갉갊감갑값갓갔강갖갗같갚갛개객갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣굥구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫났낭낮낯낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫달닭닮닯닳담답닷닸당닺닻닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많맏말맑맒맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바박밖밗반받발밝밞밟밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤샥샨샬샴샵샷샹섀섄섈섐섕서석섞섟선섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄업없엇었엉엊엌엎에엑엔엘엠엡엣엥여역엮연열엶엷염엽엾엿였영옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응읒읓읔읕읖읗의읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝";
		EUCKR_CHARS += "　、。·‥…¨〃―∥＼∼‘’“”〔〕〈〉《》「」『』【】±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®㉾！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［￦］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝￣ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣㅤㅥㅦㅧㅨㅩㅪㅫㅬㅭㅮㅯㅰㅱㅲㅳㅴㅵㅶㅷㅸㅹㅺㅻㅼㅽㅾㅿㆀㆁㆂㆃㆄㆅㆆㆇㆈㆉㆊㆋㆌㆍㆎⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃╄╅╆╇╈╉╊㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙㎚㎛㎜㎝㎞㎟㎠㎡㎢㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰㎱㎲㎳㎴㎵㎶㎷㎸㎹㎀㎁㎂㎃㎄㎺㎻㎼㎽㎾㎿㎐㎑㎒㎓㎔Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆ÆÐªĦĲĿŁØŒºÞŦŊ㉠㉡㉢㉣㉤㉥㉦㉧㉨㉩㉪㉫㉬㉭㉮㉯㉰㉱㉲㉳㉴㉵㉶㉷㉸㉹㉺㉻ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮½⅓⅔¼¾⅛⅜⅝⅞æđðħıĳĸŀłøœßþŧŋŉ㈀㈁㈂㈃㈄㈅㈆㈇㈈㈉㈊㈋㈌㈍㈎㈏㈐㈑㈒㈓㈔㈕㈖㈗㈘㈙㈚㈛⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂¹²³⁴ⁿ₁₂₃₄ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";
		//EUCKR_CHARS += "伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩羅蘿螺裸邏那樂洛烙珞落諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉納臘蠟衲囊娘廊朗浪狼郎乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧老蘆虜路露駑魯鷺碌祿綠菉錄鹿論壟弄濃籠聾膿農惱牢磊腦賂雷尿壘屢樓淚漏累縷陋嫩訥杻紐勒肋凜凌稜綾能菱陵尼泥匿溺多茶丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰";
	var KEYBOARD_CHARS = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`1234567890-=~!@#$%^&*()_+|[]{};:',./<>?\"\\";
	
	_strText = _strText.split(" ").join("");
	_strText = _strText.split("<BR>").join("");
	_strText = _strText.split("\n").join("");	
	
	for (var i = 0; i < _strText.length; i++) {
		var c = _strText.charAt(i);
		if (EUCKR_CHARS.indexOf(c) == -1
				&& KEYBOARD_CHARS.indexOf(c) == -1) {
			return c;
		}
	}
	
	return "";
}

function showChromePaymentNotice() {
	// 모바일이거나, 크롬이 아니거나, 이미 봤으면..
	if (m_formulaCode == "M"
		|| navigator.userAgent.toLowerCase().indexOf("chrome") == -1
		|| Cookies.getCookie("NO_POP_CHROME_1_DAY") == "Y") {
		return;
	}
	
	var html = '\
		<!-- pop_chrome_dimm 크롬 결제안내 딤 사용 -->\
		<div class="pop_chrome_dimm" style="display:block"></div>\
		<!-- 크롬 결제안내 팝업 -->\
		<div class="pop_chrome">\
			<header class="pop_chrome_ttl">\
				<h4>크롬 결제 안내</h4>\
				<p class="pop_chrome_close">\
					<a href="javascript:void(0):">닫기</a>\
				</p>\
			</header>\
			<section class="pop_chrome_cont">\
				<div class="scrollbar-inner">\
					<p class="chrome_title">현재 크롬에서 결제가 되지 않는 문제로 인해 사용이 불편하신 분들께서는 <br>아래 안내를 따라 설정을 변경해주시기 바랍니다.</p>\
					<p class="chrome_stit">크롬 브라우저 설정 변경 방법 (42.0.2311.90 버전이상)</p>\
					<dl class="chrome_info">\
						<dt>1.</dt>\
						<dd>브라우저 주소창에 chrome://flags/#enable-npapi 입력 후 ‘사용’ 버튼을 클릭하여 <br > NPAPI를 사용중인 상태로 변경합니다.\
						</dd>\
					</dl>\
					<p class="cp_img"><img src="/common/img/util/pop_chrome_img01.jpg" alt="크롬설명 1" /></p>\
					<dl class="chrome_info">\
						<dt>2.</dt>\
						<dd>사용 버튼을 클릭하고 왼쪽 하단에 나타나는 지금 다시 시작 버튼을 클릭하여 브라우저를 재 시작합니다.<p> (이 ‘다시 시작’ 버튼을 누르지 않고, 임의로 창을 닫았다 다시 실행할 경우 변경된 사항이 즉시 적용되지 않습니다.)</p>\
						</dd>\
					</dl>\
					<p class="cp_img"><img src="/common/img/util/pop_chrome_img02.jpg" alt="크롬설명 1" /></p>\
					<p class="ch_info">위의 방식을 진행해도 결제가 되지 않으실 경우에는 Internet Explorer를 통해 결제 부탁 드립니다. <br>감사합니다.</p>\
				</div>\
				<div class="todayPop_zoon">\
					<p class="btn_popu_ok"><a href="javascript:void(0):">확인</a></p>\
					<p class="todayPop_txt"><input type="checkbox" name="todayPop" id="todayPop" > <label for="todayPop">오늘 하루만 보지 않기</label></p>\
				</div>\
			</section>\
		</div>\
		<!-- 크롬 결제안내 팝업 end -->\
	';
	
	$("#container").prepend( $(html) );
	
	// 팝업 닫기
	$(".pop_chrome_dimm , .pop_chrome_close > a , .btn_popu_ok > a").on("click", function () {
		$(".pop_chrome_dimm , .pop_chrome").fadeOut();
	});
	
	// 오늘 하루만 보지 않기
	$("#todayPop").on("click", function () {
		var name       = "NO_POP_CHROME_1_DAY";
		var value      = "Y";
		var expiredays = 1;
		
		Cookies.setCookie(name, value, expiredays);
		
		$(".pop_chrome_dimm , .pop_chrome").fadeOut();
	});
	
	// 커스텀 스크롤바
	$('.scrollbar-inner').mCustomScrollbar({
		 axis     : "y"
		,advanced : {
			autoExpandHorizontalScroll : true
		}
	});
}

function getRandomNumber(_nLength) {
	if (_nLength == undefined) {
		_nLength = 4;
	}
	return String(Math.random()).substr(2, _nLength);
}

function showTextProcessing(_strSelector) {
	try {
		var strOrgText  = $(_strSelector).text();
		if (strOrgText == "") {
			strOrgText = "처리중";
		}
		var strShowText = strOrgText;
		var strUnit     = ".";
		
		$(_strSelector).html(strShowText);
		
		return setInterval(function () {
			if (strShowText.split(strUnit).length >= 10) {
				strShowText = strOrgText;
			} else {
				strShowText += strUnit;
			}
			$(_strSelector).html(strShowText);
		}, 500);	
	} catch (e) {
	}	
}

function hideTextProcessing(_objInterval) {
	clearInterval(_objInterval);
}
function getSrvTime(){
	var xmlHttp;
	if (window.XMLHttpRequest) {//분기하지 않으면 IE에서만 작동된다.
		xmlHttp = new XMLHttpRequest(); // IE 7.0 이상, 크롬, 파이어폭스 등
		xmlHttp.open('GET',window.location.href.toString(),false);
		xmlHttp.setRequestHeader("Content-Type", "text/html");
		xmlHttp.send('');
		return new Date(xmlHttp.getResponseHeader("Date"));
	} else if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
		xmlHttp.open('GET',window.location.href.toString(),false);
		xmlHttp.setRequestHeader("Content-Type", "text/html");
		xmlHttp.send('');
		return new Date(xmlHttp.getResponseHeader("Date"));
	}
}

/**
 * 2021.10.22 추가
 * Date Between (YYYYMMDD)
 * 날짜 기간 계산 
 * 기간안에 현재 날짜가 포함되어있는지 계산
 * */
function calDateRangeCommon(sDate, eDate, serverTime) {
	
	var startdate = sDate;  
	var enddate = eDate;
	var today = serverTime;
	
	if(serverTime == null || serverTime == ""){ //서버시간 없을 경우 조회
		var now = new Date(); //현재시간
		
		//현재시간 중 4자리 연도
		var year = String(now.getFullYear());		
		
		//현재시간 중 달. 달은 0부터 시작하기 때문에 +1
		var month = now.getMonth()+1;	 
		month = (month < 10) ? "0"+month : String(month); 
		
		//현재 시간 중 날짜
		var date = now.getDate();			
		date = (date < 10) ? "0"+date: String(date); 
		
		today = year + month + date;
	}
	
	// 시간비교
	return (today >= startdate) && (today <= enddate) ? true : false;
}
