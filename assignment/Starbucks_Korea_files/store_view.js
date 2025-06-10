/** 스토어 상세보기 팝업 호출 **/
var $lsmEvt 		 	= null;
var $instagram		 	= {};
	$instagram.token 	= new Array('62db2c86bc6747e69c32c5a22fde0537', 'e431a1405b8548829625b6d00e1269a9','98345447a25e4a169e71f3b9f3850cd2', '5dbdbcbc26a54777be658c1b31a7e3f0', 'd64b09c414a940148b723e752168362f', 'ffc5aad43b914021a8d15868e83759a8', '0898a70f7e3d4f998abdb81edcdb3051'  );
	$instagram.page	 	= 1;
	$instagram.pagesize = 4;
	$instagram.buffer	= new Array();
var inSlider = null;
var openTimeWeekArr = new Array("", "일요일","월요일","화요일","수요일","목요일","금요일","토요일");
	
(function ($) {
    $.storeView = {
    	init : function(biz_cd, callback, wrap)
    	{
    		$(".st_insta_addtxt").hide();
    		if ( biz_cd == "")
    		{
    			callback("-9", "조회하실 매장을 선택하셔야 합니다.");
    		}
    		else
    		{
    			$.storeView.ajaxCall(biz_cd, callback, wrap)
    		}
    	}
    	,
    	ajaxCall : function(biz_cd,callback, wrap)
    	{
    		var param = {"in_biz_cd" : biz_cd};
			__ajaxCall("/store/getStoreView.do",param, true, "json", "post",
					function (_response) 
					{	
						openYn = 'N';
					if ( _response.view.length > 0 )
						{
							$("#storeViewWrapBox").tmpl(_response.view, {
								
								getMapDesc : function()
								{
									var mapDesc = this.data.map_desc;
									
									if (mapDesc == null || mapDesc == "")
									{
										mapDesc = "";
									}
									return mapDesc;
								}
								,
								getAddress : function()
								{
									var sido  = this.data.sido_name;
									var gugun = this.data.gugun_name;
									var addr  = this.data.addr;
									var doroAddr = this.data.doro_address;
									
									return doroAddr+"<br /> "+ addr;
									
								}
								,
								getParkInfo : function()
								{
									var park_info = this.data.park_info;
									
									if (park_info == null || park_info == "")
									{
										park_info = "";
									}
									return park_info;
								}		
								,
								dtCheck : function()
								{
									var theme = this.data.theme_state;
									
									if ( theme.indexOf("T01") >-1 )
									{
										return "Y";
									}
									else
									{
										return "N";
									}
								}
								,
								reserveCheck : function()
								{
									var theme = this.data.theme_state;
									
									if ( theme.indexOf("T03") >-1 )
									{
										return "Y";
									}
									else
									{
										return "N";
									}
								}
								,
								wtCheck : function()
								{
									var theme = this.data.theme_state;
									
									if ( theme.indexOf("T27") >-1 )
									{
										return "Y";
									}
									else
									{
										return "N";
									}
								}
								,
								deliversCheck : function()
								{
									var theme = this.data.theme_state;
									
									if ( theme.indexOf("T43") >-1 )
									{
										return "Y";
									}
									else
									{
										return "N";
									}
								}
								,
								petZoneCheck : function()
								{
									var theme = this.data.theme_state;
									var biz_code = this.data.s_biz_code;
									if ( theme.indexOf("P02") >-1)
									{
										return "Y";
									}
									else
									{
										return "N";
									}
								}
								,
								getDefaultImage : function(type)
								{
									var defaultImage = this.data.defaultimage;
									var store_nm	 = this.data.s_name;
									var etcimage	 = this.data.etcimage;
									
									
									if ( defaultImage == null || defaultImage == "")
									{
										if ( type == "M")
										{
											if ( etcimage != "" && etcimage != null)
											{
												if ( etcimage.indexOf(",") > -1 )
												{
													var etcArr		 = etcimage.split(",");
													/**
													var uniq = etcArr.reduce(function(a,b){
														if (a.indexOf(b) < 0 ) a.push(b);
														return a;
													  },[]);
													**/
													
													return '<img src="'+$config.imgUploadPath+'/'+etcArr[0]+'" alt="'+store_nm+'" class="bigStoreImgWrap">';
												}
												else
												{
													return '<img src="'+$config.imgUploadPath+'/'+etcimage+'" alt="'+store_nm+'" class="bigStoreImgWrap">';													
												}
											}
											else
											{
												return "";
											}											
										}
										else
										{
											return "";
										}
									}
									else
									{
										if ( type == "M")
										{
											return '<img src="'+$config.imgUploadPath+'/'+defaultImage+'" alt="'+store_nm+'" class="bigStoreImgWrap">';
										}
										else
										{
											return '<li><a href="javascript:void(0);" class="setStoreImgList"><img src="'+$config.imgUploadPath+'/'+defaultImage+'" alt="'+store_nm+'" style="width:50px;height:50px"></a></li>';
										}										
									}
								}	
								
								,
								getLsmShow : function(biz)
								{
									var store_nm	 = this.data.s_name;
									var bizcode		 = this.data.s_biz_code;
									var html  = "";			

									if ( $lsmEvt != null )
									{
										if ( $lsmEvt.list.length > 0 )
										{
											//evt_code
											jQuery.each( $lsmEvt.list , function(x,y){
												html+= ' <li> ';
												html+= ' 	<header>'+store_nm+'점에서는 현재<strong>'+$lsmEvt.list.length+'개의 이벤트</strong>가 진행되고 있습니다.</header> ';
												html+= ' 	<figure><img alt="" src="/common/img/util/reward/shopArea_bar_sam1.png"></figure> ';
												html+= ' 	<div class="pop_slide_text"> ';
												html+= ' 		<p class="text">'+y.lsm_evt_name+'</p> ';
												html+= ' 		<p class="date">'+y.lsm_startdate+' ~ '+y.lsm_enddate+'까지</p> ';
												html+= ' 		<p class="btn_bar"><a href="/whats_new/store_event_list.do?in_evt_code='+y.evt_code+'&target=blank" class="lsmEventGo" data-lsm="'+y.lsm_index+'">이벤트 상세정보 보러 가기</a></p> ';
												html+= ' 	</div> ';
												html+= ' </li> ';							    				
							    			});
										}
									}
									return html;
								}
								
								,
								getLsmEvt : function(biz)
								{
									var store_nm	 = this.data.s_name;
									var bizcode		 = this.data.s_biz_code;
									bizcode			 = bizcode + '';
									var param 		 = {"in_biz_cd" : bizcode};
									
									var isLsmList = __ajaxCall("/store/getLsmEvt.do",param, false, "json", "post","","");
									$lsmEvt 	  = isLsmList;
									
									if ( isLsmList.list.length > 0 )
									{
										return "block";
									}
									else
									{
										return "none";
									}
								}									
								,
								getStoreImg : function()
								{
									var etcimage	 = this.data.etcimage;
									var store_nm	 = this.data.s_name;
									
									var etcHtml		 = "";
									
									if ( etcimage != "" && etcimage != null)
									{
										if ( etcimage.indexOf(",") > -1 )
										{
											var etcArr		 = etcimage.split(",");
											for ( var i = 0 ; i <= etcArr.length - 1 ; i++)
											{
												etcHtml += '<li><a href="javascript:void(0);" class="setStoreImgList"><img src="'+$config.imgUploadPath+'/'+etcArr[i]+'" alt="'+store_nm+'" style="width:50px;height:50px"></a></li>';
											}

											return etcHtml;																					
										}
										else
										{
											etcHtml = '<li><a href="javascript:void(0);" class="setStoreImgList"><img src="'+$config.imgUploadPath+'/'+etcimage+'" alt="'+store_nm+'" style="width:50px;height:50px"></a></li>';
											return etcHtml;																					
											
										}

									}
									else
									{
										return "";
									}

								}		
								,									
								getFav : function()
								{
									return '';
								}		
								,									
								getNewIcon : function()
								{
									var new_icon = this.data.new_icon;
									
									if (new_icon == "Y")
									{
										return '<span class="icon_02">신규</span>';
									}
									else
									{
										return '';
									}
									
								}
								,
								getInstagram : function()
								{
									var store_name = this.data.s_name;
									var search	   = "스타벅스" + store_name + "점";
									
									$instagram.page	 	= 1;
									$instagram.pagesize = 4;
									$instagram.buffer	= new Array();	
									inSlider 			= null;
									
									
									$(".st_instagram_title").hide();
									$(".st_instagram_wrap").hide();
									$(".st_instagram_wrap_inner").hide();
									$("#prevBtn").hide();
									$("#nextBtn").hide();					
									$(".storeInstagramNo").hide();	
									$(".st_insta_addtxt").hide();
									

									//instagram_load(search, "");
									
									return "";
								}
								,
								getStoreNumber : function()
								{
									//모바일인지 아닌지 판별 
						    		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
								}
								,	
								getTheme : function(service)
								{
									var theme = this.data.theme_state;
									var whcroad = this.data.whcroad_yn;
									var isService = "";
									
									if ( service == "T")
									{
										isService = isService + changeThema(theme, "T03");
										isService = isService + changeThema(theme, "T01");
										isService = isService + changeThema(theme, "T12");
										isService = isService + changeThema(theme, "T20");
										isService = isService + changeThema(theme, "T27"); //[픽업존 관리시스템 개선] 워킹스루 아이콘 추가 
									}
									
									if ( service == "S")
									{
										isService = isService + changeThema(theme, "T09");
										isService = isService + changeThema(theme, "T10");
										isService = isService + changeThema(theme, "T22"); //나이트로 콜드브루
										isService = isService + changeThema(theme, "T21"); //현금없는 매장
										isService = isService + changeThema(theme, "T05"); //피지오
										isService = isService + changeThema(theme, "T30"); //블론드
										isService = isService + changeThema(theme, "T43"); //20210401 '딜리버스' 서비스 추가
										isService = isService + changeThema(theme, "T48"); //20210408 '에코매장' 서비스 추가
										isService = isService + changeThema(theme, "Z9999"); //20230327 '21시 이후 영업 종료 매장' 서비스 추가										
										isService = isService + changeThema(theme, "T64"); //241205 나우 브루잉 매장 추가
										isService = isService + changeThema(theme, "T66"); //241205 패스트 서브 매장 추가
									}

									if ( service == "P")
									{
										isService = isService + changeThema(theme, "P02"); //20231220 펫존 추가
										isService = isService + changeThema(theme, "P10");
										isService = isService + changeThema(theme, "P50");
										isService = isService + changeThema(theme, "P20");
										isService = isService + changeThema(theme, "P60");
										isService = isService + changeThema(theme, "P70");
										isService = isService + changeThema(theme, "P40");										
										isService = isService + changeThema(theme, "P80");
										isService = isService + changeThema(theme, "P90");
										isService = isService + changeThema(theme, "P01");
									}
									
									if(service == "WHCROAD"){
										isService = isService + changeThema(whcroad, "WHCROAD");
									}
									
									return isService;
								}
								,
								getStoreNameInsta : function()
								{
									var storeName = this.data.s_name;
										storeName = storeName.replace(/-/gi,'')
										storeName = storeName.replace(/\s/gi, ''); // 모든 공백을 제거
									
									return storeName;
								}
								,
								link : function()
								{
									var bizCd  = this.data.s_biz_code;
									var domain = location.hostname;
									var setLink = "http://"+domain+"/store/store_map.do?in_biz_cd="+bizCd;
									
									return setLink;
									
								}
								,
								getImage : function()
								{
									
									var domain = location.hostname;
									var defaultImage = this.data.defaultimage;
									var store_nm	 = this.data.s_name;
									var etcimage	 = this.data.etcimage;
									
									
									if ( defaultImage == null || defaultImage == "")
									{
										if ( etcimage != "" && etcimage != null)
										{
											if ( etcimage.indexOf(",") > -1 )
											{
												var etcArr		 = etcimage.split(",");
												
												/**
												var uniq = etcArr.reduce(function(a,b){
													if (a.indexOf(b) < 0 ) a.push(b);
													return a;
												  },[]);
												**/
												
												
												return 'http://'+domain+'/'+etcArr[0];
											}
											else
											{
												return 'http://'+domain+'/'+etcimage;
											}
										}
										else
										{
											return "";
										}	
									}
									else
									{
										return 'http://'+domain+'/'+defaultImage;
									}									
									
								},
								getHygieneRank : function()
								{
									var theme = this.data.theme_state;
									var hygieneRank = changeThema(theme, "T36");

									if (hygieneRank == null || hygieneRank == "")
									{
										hygieneRank = "";
									}
									return hygieneRank;
								},
								getEvStore : function()
								{
									var theme = this.data.theme_state;
									var evStore = changeThema(theme, "P01");
									
									if (evStore == null || evStore == "")
									{
										evStore = "";
									}
									return evStore;
								}
								
							}).prependTo(wrap);
							
							/* 20210304 수정(탭 버튼이 최대 5-6개일 경우 추가) */
							var $boxTabmenu = $('.box_tabmenu');
							if ($boxTabmenu.find('dt.tab').length > 4) {
								$boxTabmenu.addClass('three-line');
							} else if ($boxTabmenu.find('dt.tab').length > 2 ) {
								$boxTabmenu.addClass('two-line');
							} else {
								$boxTabmenu.addClass('one-line');
							}
							$boxTabmenu.find('dt').each(function(i){
								$(this).addClass('tab_b0'+(i+1));
							});
							/* 20210304 수정 */
							
							/** 2015-12-17 트리거 추가 **/
							
							setTimeout(function(){
								$(".cafe_time_zone").click();	
							},500);
							
							
							var winScrollTop = $(window).scrollTop();
							$(".isStoreBizViewWrap").css("top", winScrollTop + "px");
							
							
							if ( $vo.appYN == "Y")
							{
								$(".shopArea_pop01").addClass("app");

								var pageUrl = location.href;
									pageUrl = pageUrl.toLowerCase();

								if ( pageUrl.indexOf("store_mapview.do") > -1 )
								{
									$(".isStoreViewClosePop").hide();
									$("body").css("overflow", "auto");
								}
								else
								{
									$(".isStoreViewClosePop").show();
								}

								//1208 정승원_즐겨찾기,공유버튼 보이기
								$(".my_sns_list").hide();
							}
							
							
							$(".shopArea_right").mCustomScrollbar();
							
							$(".storeFbBtn").on("click", function(){
								var $param = $(this).data();
								$param.image = $('.big_img > img').attr('src');
								if($param.image == "" ){
									$param.image = 'https://image.istarbucks.co.kr/common/img/cp_newsList_detail_img2.png';
								}else{
									$param.image = 'https:'+ $param.image ;
								}
								
								facebookFeed( $param, function(){
									alert("페이스북 스타벅스 매장 공유하였습니다.");
									return;
								}, function(){
									alert("페이스북 공유 취소로 공유가 중단 되었습니다.");
									return;									
								});
								
							});
							
							
							$(".storeKkBtn").on("click", function(){
								var $param = $(this).data();
								kakaoShare( $param );
							});
							
							
							$(".storeTwBtn").on("click", function(){
								var $param = $(this).data();
								twitterShare( $param );
							});
							
							$(".storeKakaoTalkBtn").on("click", function(){
								var $param = $(this).data();
								kakaoTalkShare( $param );
							});							
							
							$(".setStoreImgList").on("click",function(){
								var findImg = $(this).find("img").attr("src");
								$(".bigStoreImgWrap").attr("src", findImg);
							});
							

							//지점별 이벤트 슬라이드 - 이벤트 2개이상일때 bxslider 적용
							var totalSlide = $('.my_ms_shopArea_bar ul li').length;

							if (totalSlide > 1) {
								var lsmSlider = $('.my_ms_shopArea_bar ul').bxSlider({
									pager: false,
									slideMargin: 0
								});
							}


							//개발중 선택을 해제하였을 때 쿼리 조회 하지 않게 수정해야 함
							$(".cafe_time_zone, .dt_time_zone, .reserve_time_zone, .wt_time_zone, .delivers_time_zone, .pet_time_zone").on("click", function(){
								var thisBizCd = $(this).data("biz");
								var thisBizTp = $(this).data("type");
								var param = {"in_biz_cd":thisBizCd, "in_store_type":thisBizTp};
								var obj = $(this);
								$(".dl_tel").show();
								$(".dl_dlvry_call").hide();
								//재선택 시 ajaxCall 방지[페이지 개선]
								if ( obj.parent().hasClass('on') ) 
									return;
								
								
								__ajaxCall("/store/getStoreTime.do",param, true, "json", "post",
											function(data)
											{
												$(".cafetimeWrap").html("");
												$(".dttimeWrap").html("");
												$('.reservetimeWrap').html("");
												$('.wttimeWrap').html("");
												$('.deliverstimeWrap').html("");
												$('.pettimeWrap').html("");

												if ( data.list.length > 0)
												{
													var html = "";
													html = html + '<dl class="date_time_left">';
													
													$.each( data.list, function(x,y){
														
														var $forIsWeek   = y.store_time_week;
														var setDayStr    = y.store_time_day;
														var setBizTime   = y.store_opentime;
														var setHlyTag    = y.store_time_hlytag;
														
														//[151223] 오늘은 Bold 처리
														if (x == 0) {
															var style = 'style="font-weight:bold;"';
															
															html = html + '<dt ' + style + '>'+setDayStr+'일 </dt><dd ' + style + '>'+openTimeWeekArr[$forIsWeek]+'  '+getTimeStrNew(setBizTime, setHlyTag)+'</dd>';
														} else {
															html = html + '<dt>'+setDayStr+'일 </dt><dd>'+openTimeWeekArr[$forIsWeek]+'  '+getTimeStrNew(setBizTime, setHlyTag)+'</dd>';	
														}
														
														if ( x == 3 )
														{
															html = html + '</dl>';
															html = html + '<dl class="date_time_right">';
														}														
																												
													});
													html = html + '</dl>';
													
													
													if ( obj.hasClass('cafe_time_zone') ) {
														//구리갈매 DT 일 경우 펫존 이용 시간 추가
														/*if(biz_cd == '4294'){
															html = html + '<p class="txt_petzone">※ 펫 존 이용 시간 : 주중 09:00~21:00, 주말 07:00~21:00 <br> (매장 상황에 따라 상이할 수 있음)</p>';
														}*/
														
														$(".cafetimeWrap").html(html);
													} else if ( obj.hasClass('dt_time_zone') ) {
														$(".dttimeWrap").html(html);
													} else if ( obj.hasClass('reserve_time_zone') ) {
														$(".reservetimeWrap").html(html);
													} else if ( obj.hasClass('wt_time_zone') ) {
														$(".wttimeWrap").html(html);
													} else if ( obj.hasClass('delivers_time_zone') ) {
														$(".deliverstimeWrap").html(html);
														$(".dl_tel").hide();
														$(".dl_dlvry_call").show();
													} else if ( obj.hasClass('pet_time_zone') ) {
														$(".pettimeWrap").html(html);
													}
													
												}
											}
											,
											function()
											{
												
											}
								);
							});
							
							
							$(".storeDirectGo").on("click", function(){
								var thisBizCd = $(this).data("biz");
								
								if ( $vo.appYN == "Y" )
								{
									location.href="/app/store/store_map.do?in_biz_cd="+thisBizCd;
								}
								else
								{
									location.href="/store/store_map.do?in_biz_cd="+thisBizCd;
								}
								
							});
							
							$("#moveEvStore").on("click", function(){
								var storeCode = biz_cd;
								if ( $vo.appYN == "Y" )
								{	
									if($vo.appVer=='true'){
										location.href="starbuckskr://evstoreinfo?storeCode="+storeCode;										
									}else{
										$('#updateShowPopup').show();
										$('#updateShowPopup .negative').on('click', function(){
											$('#updateShowPopup').hide();
										});
										$('#updateShowPopup .positive').on('click', function(){
											/* s: 240624 추가 */
											var url = "https://www.starbucks.co.kr/";

											if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
												url = "https://itunes.apple.com/kr/app/seutabeogseukadeu/id466682252?mt=8";
											} else {
												url = "https://play.google.com/store/apps/details?id=com.starbucks.co";
											}

											location.href = url;
											/* e: 240624 추가 */
										})
									}
								}else{
									alert('스타벅스 앱으로 확인 가능합니다.');
								}
							});
							
							$(".box_tabmenu > .tab").on("click", function(){
								$(this).siblings('dt').removeClass('on');
								$(this).toggleClass('on');
								$(this).next().siblings('dd').hide();
								$(this).next().toggle();
							});							
							
							
							$(".isStoreBizViewWrap").fadeIn("fast");
							$(".loading_dimm").fadeIn("fast");
							
							
							$(".isStoreViewClosePop").on("click", function(){
								if($vo.appYN == "Y") {
									resetBizCd();
								}
								$(".isStoreBizViewWrap").fadeOut("fast", function(){
									$(".isStoreBizViewWrap").remove();
									$(".loading_dimm").hide();
								});
							});
						}
						else
						{
							callback("-9", "해당 매장의 상세정보가 존재하지 않습니다.");
						}
			        }
					, 
					function(_error)
					{
					}
	    	);   	
    	}

    };
})(jQuery);


function getTimeStrNew(timeStr, setHlyTag)
{
	if (timeStr=="" || timeStr=="null" || timeStr==undefined)
	{
		return "준비중";
	}
	else
	{
		if ( setHlyTag == "4")
		{
			return "휴점";
		}
		else
		{
			var timeArr = timeStr.split("-");
			if ( timeArr[0].length < 2 || timeArr[1].length < 2 )
			{
				return "휴점";		
			}
			else
			{
				
				var s_time 		= timeArr[0].substring(0,2);
				var s_minute 	= timeArr[0].substring(2);
				
				var endTimeObj  = timeArr[1];
					endTimeObj  = endTimeObj.replace(" ",""); //공백제거

				var e_time 		= endTimeObj.substring(0,2);
				var e_minute 	= endTimeObj.substring(2);														
				
				return s_time+":"+s_minute+" ~ "+e_time+":"+e_minute;		
			}				
		}
	
		
	}
}


function getTimeStr(week, data)
{
	var timeStr;
	switch ( parseInt(week,10) ) {
	  case 0    :  timeStr = data[0].sun;
	               break;
	               
	  case 1    :  timeStr = data[0].mon;
       			   break;
       			   
	  case 2    :  timeStr = data[0].tue;
		   		   break;
		   		   
	  case 3    :  timeStr = data[0].wed;
			   	   break;
			   	   
	  case 4    :  timeStr = data[0].thur;
 			   	   break;
 			   	   
	  case 5    :  timeStr = data[0].fri;
   			   	   break;
   			   	   
	  case 6    :  timeStr = data[0].sat;
	   			   break;
	}
	
	
	var timeArr = timeStr.split("-");
	
	if ( timeArr[0].length < 2 || timeArr[1].length < 2 )
	{
		return "휴점";		
	}
	else
	{
		var s_time 		= timeArr[0].substring(0,2);
		var s_minute 	= timeArr[0].substring(2);
		
		var endTimeObj  = timeArr[1];
			endTimeObj  = endTimeObj.replace(" ",""); //공백제거

		var e_time 		= endTimeObj.substring(0,2);
		var e_minute 	= endTimeObj.substring(2);														
		
		return s_time+":"+s_minute+" ~ "+e_time+":"+e_minute;		
	}
	

		
}

function instagram_load( search, next )
{
	
	search = search.replace(/-/gi,'')
	search = search.replace(/\s/gi, ''); // 모든 공백을 제거
	
	var random  = randomIt(0,6);
	var token   = $instagram.token[random];
	var url		= "https://api.instagram.com/v1/tags/" + encodeURIComponent(search) + "/media/recent?count=40&client_id=" + token;
	if ( next != "" )
	{
		url = url + "&max_tag_id="+next;
	}
	
	 /**
		$instagram.page	 	= 1;
		$instagram.pagesize = 4;
		$instagram.buffer	= new Array();	 
	 **/
	__ajaxCall( url , {}, true, "jsonp", "get",
			function(data)
			{
				if (data.meta.code != "200")
				{
					$(".st_instagram_title").hide();
					$(".st_instagram_wrap").hide();
					$(".st_instagram_wrap_inner").hide();
					$("#prevBtn").hide();
					$("#nextBtn").hide();					
					$(".storeInstagramNo").hide();			
				}
				else
				{
					
					$(".st_instagram_title").hide();
					$(".st_instagram_wrap").hide();
					$(".st_instagram_wrap_inner").hide();
					$("#prevBtn").hide();
					$("#nextBtn").show();					
					$(".storeInstagramNo").hide();
					
					
					//instagramUI(data, search);

					
					
					
					
				}
				
			}
			,
			function(err)
			{
				alert("인스타그램 오류로 인해 해당 데이터를 확인할 수 없습니다.");
				return;
			}
	);	
}

function instagramUI(data, search)
{
	var searchWord = search;

	
	if ( data.data.length > 0 )
	{
		$(".st_instagram_slider").html("");
		$(".instagram_next_btn").data("next", data.pagination.next_max_tag_id);
	
		
			
		var html = "";
		$.each( data.data, function(x, y) {
			html += '<li><a href="'+y.link+'" target="_blank"><img src="'+y.images.standard_resolution.url+'" alt=""></a></li>';
		});
		
		$(".st_instagram_slider").html(html);
		
		
		var ww = $(window).width();
		setTimeout(function(){
			if ( inSlider == null )
			{
				if (ww > 960) 
				{
					inSlider = $('.st_instagram_slider').bxSlider({
						minSlides:4					,
						maxSlides:4					,
						slideWidth:140				,
						slideMargin:10				,
						infiniteLoop:false			,
						controls:false				,
						auto:false					,
						autoControls:false			,
						autoControlsCombine:false	,
						pause:2000					,
						pager:false					,
						onSlideBefore : function($slideElement, oldIndex, newIndex){
							
							$("#prevBtn").show();
						}
					});
				} 
				else if ((ww > 640) && (ww <= 960)) 
				{
					inSlider = $('.st_instagram_slider').bxSlider({
						minSlides:3					,
						maxSlides:3					,
						slideWidth:140				,
						slideMargin:10				,
						infiniteLoop:false			,
						controls:false				,
						auto:false					,
						autoControls:false			,
						autoControlsCombine:false	,
						pause:2000					,
						pager:false,
						onSlideBefore : function($slideElement, oldIndex, newIndex){
							$("#prevBtn").show();
						}
					});
				} 
				else if (ww <= 640) 
				{
					inSlider = $('.st_instagram_slider').bxSlider({
						minSlides:1					,
						maxSlides:1					,
						infiniteLoop:false			,
						controls:false				,
						auto:false					,
						autoControls:false			,
						autoControlsCombine:false	,
						pause:2000					,
						pager:false,
						onSlideBefore : function($slideElement, oldIndex, newIndex){
							$("#prevBtn").show();
						}
					});
				}
			}																		
		},100);
		$instagram.buffer[ $instagram.page ] = data;
	}
	else
	{
		$(".st_instagram_title").show();
		$(".st_instagram_wrap").show();
		$(".st_instagram_wrap_inner").hide();
		$("#prevBtn").hide();
		$("#nextBtn").hide();					
		$(".storeInstagramNo").show();				
	}
	
	$(".instagram_prev_btn").unbind("click").on("click", function(){
		inSlider.goToPrevSlide();
	});
	
	$(".instagram_next_btn").unbind("click").on("click", function(){
		inSlider.goToNextSlide();
	});			
}

function changeThema(theme, type)
{
	if ( theme.indexOf(type) >-1 )
	{/* 240124 아이콘 이미지 경로 수정 시작 */
		if( type == "T01") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon03.png' /></span>"; }		//드라이브 스르라면
		if( type == "T03") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon01.png' /></span>"; }		//리저브라면
		if( type == "T12") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon02.png' /></span>"; }		//커뮤니티 스토오라면
		if( type == "T09") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon04.png' /></span>"; }		//주차라면
		if( type == "T10") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon05.png' /></span>"; }		//외화결제라면
		if( type == "P10") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon07.png' /></span>"; }		//공항내
		if( type == "P50") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon09.png' /></span>"; }		//해안가
		if( type == "P20") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon08.png' /></span>"; }		//대학가
		if( type == "P60") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon12.png' /></span>"; }		//터미널/기차역
		if( type == "P50") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon11.png' /></span>"; }		//리조트
		if( type == "P70") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon13.png' /></span>"; }		//병원
		if( type == "P40") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon10.png' /></span>"; }		//입점
		if( type == "P80") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon14.png' /></span>"; }		//지하철 인접
		//if( type == "T04") {	return "<span><img src='/common/img/store/store_icon/icon16.png' /></span>"; }		//에스프레소 초이스
		if( type == "T20") {	return ""; }		//콜드브루
		if( type == "T22") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon18.png' /></span>"; }		//나이트로 콜드브루
		if( type == "WHCROAD") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon19.png' /></span>"; }	//휠체어 접근
		if( type == "T21") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon20.png' /></span>"; }		//현금없는 매장
		if( type == "P90") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon21.png' /></span>"; }		//공기청정기
		if( type == "P01") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/EV_icon_map.png' /></span>"; }		//전기차 충전소
		if( type == "T05") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon22.png' /></span>"; }		//피지오
		if( type == "T30") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon23.png' /></span>"; }		//블론드
		if( type == "T36") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_24.png' /></span>"; }		//2020.03.27 매장찾기 검색옵션 내 '식약처 위생등급제 인증' 속성(T36) 추가
		if( type == "T27") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_wt.png' /></span>"; }		//[픽업존 관리시스템 개선] 워크스루 아이콘 추가
		if( type == "T43") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_delivers_service.png' /></span>"; }		//20210401 '딜리버스' 서비스 추가
		if( type == "T48") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_eco_service.png' /></span>"; }		//20210407 '에코매장' 서비스 추가
		if( type == "Z9999") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/Moon_icon_16x16_230324.png' /></span>"; }   //230324 21이후 오픈 매장 추가
		if( type == "P02") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_pet_01.png' /></span>"; } //231220 pet zone
		if( type == "T64") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_now_brewing.png' /></span>"; } //241205 나우 브루잉 매장 추가
		if( type == "T66") {	return "<span><img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_fast_serve.png' /></span>"; } //241205 패스트 서브 매장 추가
		}/* 240124 아이콘 이미지 경로 수정 끝 */
	else
	{
		return "";
	}	
}

$(document).ready(function(){
	

	
	
	$(window).on("resize", function(){
		var ww = $(window).width();
		
		if ( inSlider != null )
		{
			if (ww > 960) 
			{
				inSlider.reloadSlider
				(
					{
						minSlides:4,
						maxSlides:4,
						slideWidth:140,
						slideMargin:10,
						infiniteLoop:false			,
						controls:false,
						auto:false,
						autoControls:false,
						autoControlsCombine:false,
						pause:2000,
						pager:false,
						onSlideBefore : function($slideElement, oldIndex, newIndex){
							$("#prevBtn").show();
						}
					}						
				);
			} 
			else if ((ww > 640) && (ww <= 960)) 
			{
				inSlider.reloadSlider
				(
					{
						minSlides:3,
						maxSlides:3,
						slideWidth:140,
						slideMargin:10,
						infiniteLoop:false			,
						controls:false,
						auto:false,
						autoControls:false,
						autoControlsCombine:false,
						pause:2000,
						pager:false,
						onSlideBefore : function($slideElement, oldIndex, newIndex){
							$("#prevBtn").show();
						}
					}					
				);

			} 
			else if (ww <= 640) 
			{
				inSlider.reloadSlider
				(
					{
						minSlides:1,
						maxSlides:1,
						infiniteLoop:false			,
						controls:false,
						auto:false,
						autoControls:false,
						autoControlsCombine:false,
						pause:2000,
						pager:false,
						onSlideBefore : function($slideElement, oldIndex, newIndex){
							$("#prevBtn").show();
						}
					}					
				);
			}
		}																				
	});
});


(function ($) {
    $.date = {
    	arrWeekKor  :  new Array('일요일','월요일','화요일','수요일','목요일','금요일','토요일')																					,
    	nowDate : function(obj)
    	{
  		  var today 		= new Date(); // 날자 변수 선언
		  var dateNow 		= fnLPAD(String(today.getDate()),"0",2); //일자를 구함
		  var monthNow 		= fnLPAD(String((today.getMonth()+1)),"0",2); // 월(month)을 구함
		  var yearNow    	= String(today.getFullYear()); //년(year)을 구함
		  
		  if (!!(obj))
		  {
			  obj.year = yearNow;
			  obj.month = monthNow;
			  obj.day = dateNow;			  
		  }
		  else
		  {
			  $date.year = yearNow;
			  $date.month = monthNow;
			  $date.day = dateNow;			  
		  }
    	}
    	,
		returnDateFormat : function(iType, $object)
		{
			if (iType=="string")
			{
				if ( !!($object) )
				{
					return $object.year + "-" + $object.month + "-" + $object.day;
				}
				else
				{
					return $date.year + "-" + $date.month + "-" + $date.day;
				}
				
			}
			else if(iType="object")
			{ 
				
				if ( !!($object) )
				{
					return  new Date( parseInt($object.year, 10), parseInt($object.month, 10) - 1, parseInt($object.day, 10), 0, 0, 0);
				}
				else
				{
					return  new Date( parseInt($date.year, 10), parseInt($date.month, 10) - 1, parseInt($date.day, 10), 0, 0, 0);
				}
				
				
			}
		}    	
    	,
    	dateDiff : function(start, end)
    	{
    		var startArr    = start.split("-");	
    		var endArr     	= end.split("-");	
    		var start_date  = new Date(startArr[0], startArr[1] - 1 ,  startArr[2], 0, 0, 0);
    		var end_date    = new Date(endArr[0], endArr[1] - 1 ,  endArr[2], 0, 0, 0);
    		var day 		= 1000*60*60*24;
    		var interval 	= end_date - start_date;
    		var diff        = parseInt(interval/day,10);
    		return diff;    		
    	}
    	,
    	dateAdd : function(DateStr, AddType, AddCnt)
    	{
    		var _strDate = null;
    		var parts 		= DateStr.split('-');
    		var iYar 		= Number(parts[0]);
    		var iMonth 		= Number(parts[1]) - 1;
    		var iDay 		= Number(parts[2]);
    		switch (AddType) {
    			case "y":
    				iYar = iYar + AddCnt;
    				break;
    			case "m":
    				iMonth = iMonth + AddCnt;
    				break;
    			case "d":
    				iDay = iDay + AddCnt;
    				break;
    			default:
    		}
    		var now = new Date(iYar, iMonth, iDay);
    		var year = now.getFullYear();
    		var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
    		var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();
    		return String.format("{0}-{1}-{2}", year, mon, day);    		

    	}
    };
})(jQuery);