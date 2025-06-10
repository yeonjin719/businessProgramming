/** 오픈 이벤트 관련 **/
(function ($) {
    $.openevent = {
    	nowStampType : "" 
    	,
    	getStamp : function(typeCode)
    	{
    		if ( $(".btn_sb_emblem").size()  > 0 )
    		{
    			$(".btn_sb_emblem").remove();
    		}
    		
    		/**
    		console.log( $("link[title='promotionOpenEvent']").attr("href") );
    		console.log( $(".btn_sb_emblem").size() );
    		

    		//$(".btn_sb_emblem").remove();
    		
    		if ( $("link[title='promotionOpenEvent']").attr("href") == undefined )
    		{
    			$("head").append('<link href="/common/css/style_whatsnew_prom.css" rel="stylesheet" title="promotionOpenEvent" />  ');
    		}
    		
    		
    		
    		if ( typeCode == "" || typeCode == undefined)
    		{
    			alert("잘못된 호출입니다.");
    			return;
    		}
    		
    		this.nowStampType = typeCode;
			__ajaxCall("/openevent/stamp.do",{}, true, "json", "post",
					function (data) 
					{
						if ( data.error_code == "0" )
						{
							console.log(data);
							var ww = $(window).width();
							var wh = $(window).height();
							
							var stamp_left = (ww * ( data.left / 100));
							var stamp_top  = (wh * ( data.top  / 100));
							
							var stamp = '<div class="btn_sb_emblem" style="left:'+stamp_left+'px;top:'+stamp_top+'px"><a href="javascript:void(0);"></a></div>';
							
							$("#container").prepend(stamp);
							
							$(window).on("resize", function(){
								var ww = $(window).width();
								var wh = $(window).height();
								
								var stamp_left = (ww * ( data.left / 100));
								var stamp_top  = (wh * ( data.top  / 100));
								
								$("#container").find("div.btn_sb_emblem").css({
									"left" : stamp_left + "px",
									"top" : stamp_top + "px"
								});
								
							});
							
							$(".btn_sb_emblem").find("a").unbind("click").on("click", function(){
								
								$(this).parent().effect('shake').animate({
									'top':'-100px',
									'left':'200px',
									'opacity':'0'
								}, 200);
								
								
								setTimeout(function(){
									var isType = $.openevent.nowStampType;
									console.log(isType);									
									__ajaxCall("/openevent/stampInsert.do",{ "stamp_type" : isType}, true, "json", "post",
											function (data) 
											{
												if (data.error_code == "0" || data.error_code == "-8")
												{
													if ( data.error_code == "-8" )
													{
														alert(data.error_msg);
													}
													
													
													var openHtml = "";
													
														openHtml += ' <div class="pop_renew_congu openEventWrap" style="display:none"> ';
														openHtml += ' 	<header class="pop_renew_congu_ttl"> ';
														openHtml += ' 		<h4>축하합니다!</h4> ';
														openHtml += ' 		<p class="pop_renew_congu_close"> ';
														openHtml += ' 			<a href="javascript:void(0):" class="openEventClose">닫기</a> ';
														openHtml += ' 		</p> ';
														openHtml += ' 	</header> ';
														openHtml += ' 	<section class="pop_renew_congu_cont"> ';
														openHtml += ' 		<p class="regist_stat_txt">16주년 엠블럼을 <strong class="oe_stamp_count"></strong> 찾으셨습니다.</p> ';
														openHtml += ' 			<div class="pop_renew_stamp_wrap"> ';
														openHtml += ' 				<ul class="openEventList"> ';
														openHtml += ' 				</ul> ';
														openHtml += ' 			</div> ';
														openHtml += ' 		<div class="btn_renew_regi_guide"> ';
														openHtml += ' 			<a href="/whats_new/campaign_view.do?pro_seq=1048"><img alt="" src="/common/img/whatsnew/rn_open/btn_renew_regi_guide.png"></a> ';
														openHtml += ' 		</div> ';
														openHtml += ' 		<p class="congu_stat_warn">* 16개의 엠블럼을 모두 찾으실 경우 당첨 확률이 높아집니다.</p> ';
														openHtml += ' 	</section> ';
														openHtml += ' </div> ';			
														
														$(".openEventWrap").remove();
														$("#container").prepend(openHtml);
														
														$(".openEventClose").on("click", function(){
															$(".openEventWrap").hide();
														});
														
														__ajaxCall("/openevent/getStamp.do",{}, true, "json", "post",
																function (data) 
																{
																	console.log(data);
																	
																	if ( data.error_code == "0")
																	{
																		if (data.recordcount > 0)
																		{
																			$(".btn_sb_emblem").hide();
																			$(".openEventWrap").fadeIn("fast", function(){
																				
																				if ( parseInt( data.recordcount ) >= 16)
																				{
																					$(".oe_stamp_count").html( "16개");
																				}
																				else
																				{
																					$(".oe_stamp_count").html( data.recordcount + "개");
																				}
																				
																				var cHtml = "";
																				$(".openEventList").html("");
																				$.each( data.list, function(x,y){
																					console.log(y);
																					
																					if ( x <= 15)
																					{
																						cHtml = "";
																						cHtml = '<li class="pop_renew_stamp"><img alt="" src="/common/img/whatsnew/rn_open/stamp_on.png" style="display:none" class="stampImage"></li>';
																						$(".openEventList").append(cHtml);
																						$(".stampImage").fadeIn(1000, 'easeInOutBounce');
																					}
																					
																				});
																				//$(".openEventList").html(cHtml);
																				
																				
																				if ( data.recordcount <= 5 )
																				{
																					cHtml = "";
																					for ( var i = 0; i < 5-(data.recordcount); i++)
																					{
																						cHtml = "";
																						cHtml += '<li class="pop_renew_stamp"></li>';
																						$(".openEventList").append(cHtml);
																					}
																				}
																				//console.log(isLeft);
																				
																			})
																		}
																		
																	}
																	else
																	{
																		alert(data.error_msg);
																		return;
																	}
															    }
																, 
																function(_error)
																{
																}
													    	);    													
														
														
														
														
														
														
														
													
													
												}
												else
												{
													if (data.error_code == "-9")
													{
														if ( confirm(data.error_msg) )
														{
															$.loginLib.showLayerLogin();
														}
													}
													else
													{
														alert(data.error_msg);
														return;
													}
													

												}
												
										    }
											, 
											function(_error)
											{
											}
								    	); 									
								},800);
								
								


   								
								
								
							});
							
						}
			        }
					, 
					function(_error)
					{
					}
	    	);    		
    		
    		
    		**/
    		
    		
    		
    	}
    };
})(jQuery);

$(document).ready(function(){
	
	$('.ev_seq1129_link2').bind('click', function(){
		alert('페이스북에서 360도 동영상을 원활하게 시청하기 위하여 아래 사항을 꼭 확인해주세요.\n - 모바일 접속 시 : 페이스북 앱으로 시청하시기 바랍니다. (최신버전 업데이트 필수)\n - PC 접속 시 : 크롬(Chrome)을 통해 시청하시기 바랍니다. (기타 브라우져 이용 시, 원활한 영상 감상이 어려울 수 있음) ');
	});

	$(window).on("load", function(){
			
		
		var openCnt = 0;
		var openJsUrl = "";
		
		
		
		/** 4주년 이벤트 담청자 발표 로직 **/
		$(".ev_seq1066_link").on("click", function(){
			
			var wt = $(window).scrollTop();
			$('.msr4_result_pop').css({'top' : wt + 50});
			
			$(".msr4_result_pop").fadeIn("fast", function(){
				$(".msr4_close_btn").on("click", function(){
					
					$(".msr4yesWinWrap").hide();
					$(".msr4noWinWrap").hide();				
					$("#label_q").val("");					
					$(".msr4_result_pop").hide();
				});
				$(".msr4yesWinWrap").hide();
				$(".msr4noWinWrap").hide();				
				$("#label_q").val("");
				
				
				$(".msr4_id_search").unbind("click").on("click", function(){
					var winner = $("#label_q").val();
					if( winner == "") 
					{
						alert("당첨자 조회할 아이디를 입력하세요.");
						$("#label_q").focus();
						return;
					}	
					
					__ajaxCall("/common/js/openevent/msr4_user.js",{}, true, "json", "post",
							function (data) {
								
								var msr4_winUser = winner.toUpperCase();
								var msr4_winRank = "";
								var msr4_winCnt  = 0;
								
								$.each( data.people, function(x,y){
									if ( msr4_winUser  == y.USER) {
										msr4_winRank = y.RANK;
										msr4_winCnt++;
									}
								});
								
								if ( msr4_winCnt > 0 )	//당첨됬을때
								{
									$(".msr4noWinWrap").hide();
									$(".msr4yesWinWrap").show();
									
									$(".msr4_rank").hide();
									if( msr4_winRank == "1")
									{
										$(".msr4_rank_1").show();
									}
									
									if( msr4_winRank == "2")
									{
										$(".msr4_rank_2").show();
									}
									
									if( msr4_winRank == "3")
									{
										$(".msr4_rank_3").show();
									}									
																		
								}
								else //당첨되지 않았을때
								{
									$(".msr4yesWinWrap").hide();
									$(".msr4noWinWrap").show();
									$(".msr4UserInfo").html( msr4_winUser + "님");
								}
								

					        } , 
							function(_error) {
							}
					);					
					
					
				});
				
			});
		});
		/** 4주년 이벤트 담청자 발표 로직 **/
		
		/** event_1058 */
		
		$(".ev_seq1058_link5").bind("click",function(){
			
			var wt = $(window).scrollTop();
			$('.msr4_result_pop').css({'top' : wt + 50});
			
			$(".msr4_result_pop").fadeIn("fast", function(){
				$(".msr4_close_btn").on("click", function(){
					
					$(".msr4yesWinWrap").hide();
					$(".msr4noWinWrap").hide();				
					$("#label_q").val("");					
					$(".msr4_result_pop").hide();
					$('.pop_dimm').hide();
				});
				$(".msr4yesWinWrap").hide();
				$(".msr4noWinWrap").hide();				
				$("#label_q").val("");
				$('.pop_dimm').show();
				
				
				$(".msr4_id_search").unbind("click").on("click", function(){
					var winner = $("#label_q").val();
					if( winner == "") 
					{
						alert("당첨자 조회할 아이디를 입력하세요.");
						$("#label_q").focus();
						return;
					}	
					
					__ajaxCall("/common/js/openevent/openevent_1058.js",{}, true, "json", "post",
							function (data) {
						
								var msr4_winUser = winner.toUpperCase();
								var msr4_winRank = "";
								var msr4_winCnt  = 0;
								var testuser = "";
								
								$.each( data.people, function(x, y){
																		
									if ( msr4_winUser  == y.USER) {
										msr4_winCnt++;
										testuser = y.USER;
									}
								});
																
								if ( msr4_winCnt > 0 )	//당첨됬을때
								{
									$(".msr4noWinWrap").hide();
									$(".msr4yesWinWrap").show();
									
									$(".msr4_rank").hide();

									$(".msr4_rank_1").show();
									$(".msr4UserInfo2").html( msr4_winUser + " 님");	
								}
								else //당첨되지 않았을때
								{
									$(".msr4yesWinWrap").hide();
									$(".msr4noWinWrap").show();
									$(".msr4UserInfo2").html( msr4_winUser + " 님");	
								}
								

					        } , 
							function(_error) {
							}
					);					
					
					
				});
				
			});
			
		});
		
		
		
		
		$(".openEventPopCall").on("click", function(){
			openCnt = $(".openEventPopCall").index($(this));
			
			if(openCnt == 0) {
				openJsUrl = "/common/js/openevent/openevent_join_user.js";
				$('.evenprizewinner > h4').text("Event 1 - 당첨 여부 확인 하기");
			} else if(openCnt == 1) {
				openJsUrl = "/common/js/openevent/openevent_16th_user.js";
				$('.evenprizewinner > h4').text("Event 2 - 당첨 여부 확인 하기");
			} else if(openCnt == 2) {
				openJsUrl = "/common/js/openevent/openevent_mod_user.js";
				$('.evenprizewinner > h4').text("Event 3 - 당첨 여부 확인 하기");
			}
			
			$("#openEvnetWinnerTxt").val('');
			$(".winnerResult").hide();
			$(".failResult").hide();
			$(".pop_dimm").show();
			$(".pop_dimm").off('click');
			$(".openEventWinnerPopCall").fadeIn("fast", function(){
			});
			
			
			$(".openEventPopCloseBtn").on("click", function(){
				$(".openEventWinnerPopCall").fadeOut("fast");
				$(".pop_dimm").hide();
			});		
			
			$(".winnerSearchBtn").on("click", function(){
				var winner = $("#openEvnetWinnerTxt").val();
				
				if( winner == "") 
				{
					alert("당첨자 조회할 아이디를 입력하세요.");
					$("#openEvnetWinnerTxt").focus();
					return;
				}
				
				__ajaxCall(openJsUrl,{}, true, "json", "post",
				function (data) {
					
					var winUser = winner.toUpperCase();
					var winCnt  = 0;
					
					$.each( data.people, function(x,y){
						if ( winUser == y.id) {
							winCnt++;
						}
					});
					
					$(".targetUserTxt").html( winUser + "님");
					if(openCnt == 0) {
						$('.tallDrink').html('오늘의 커피 무료 음료(Tall size)<br />e-쿠폰을 드립니다.');
					} else {
						$('.tallDrink').html('무료 음료 Tall size e-쿠폰을<br />드립니다.');
					}
					if ( winCnt > 0 ) {
						$(".winnerResult").show();
						$(".failResult").hide();
					} else {
						$(".winnerResult").hide();
						$(".failResult").show();								
					}
		        } , 
				function(_error) {
				});
			});
		});
		
		
});
	$(".ev_seq1102_link2").on("click", function () {
		if (new Date() < new Date(2015, 12 - 1, 15, 0, 0, 0)) {
			alert("이벤트 응모는 12월15일 부터 가능합니다.");
			return;
		}
		
		location.href = "https://www.starbucks.co.kr/mem/join.do";
	});
	
	$(".ev_seq1102_link3").on("click", function () {
		if (new Date() < new Date(2015, 12 - 1, 15, 0, 0, 0)) {
			alert("이벤트 응모는 12월15일 부터 가능합니다.");
			return;
		}
		
		location.href = "https://www.starbucks.co.kr/my/myinfo_modify_login.do";
	});
	
	// 페이스북 공유 20151214
	$(".ev_seq1102_link4").on("click", function(){
		if (new Date() < new Date(2015, 12 - 1, 15, 0, 0, 0)) {
			alert("이벤트 응모는 12월15일 부터 가능합니다.");
			return;
		}
		
		__ajaxCall("/whats_new/stempLoginCheck.do", {}, true, "json", "post",
			function (data) {
				if(data.result_code == "SUCESS"){
					var msg = "이벤트 참여를 위해 페이스북 계정으로 로그인합니다.";
					if (navigator.userAgent.toLocaleLowerCase().indexOf("android") > -1) {
						msg += "\n\n*안드로이드 기반의 모바일 기기에서 이벤트 참여 시 chrome을 사용하시면 보다 안정적으로 공유하여 이벤트에 참여하실 수 있습니다.";
					}
					
					if(confirm(msg)){
						var $param = {
							method: 'feed',
							/*name: '스타벅스 웹사이트 & 애플리케이션  3관왕 수상 기념 이벤트',*/
							link: 'https://www.starbucks.co.kr/whats_new/campaign_view.do?pro_seq=1102' ,
							image: 'http://sns.mdplus.kr/images/event/award.jpg'			,
							caption: '스타벅스 웹사이트 & 애플리케이션  3관왕 수상 기념 이벤트',
							description: '앱어워드 코리아 & 스마트앱 어워드 3개부문 수상 기념 다양하게 준비된 이벤트에 참여해보시고 풍성하게 준비된 음료 쿠폰의 주인공이 되세요!'
						};
						
						facebookFeed( $param, function(){
							alert("페이스북 공유가 완료 되었습니다.");
							setUserInfo();
							return;
						}, function(){
							alert("공유가 취소 되었습니다.");
							return;									
						});
					} else{
						return;
					}
				}else{
					if(confirm("로그인 후 이용 가능 합니다. 로그인 하시겠습니까?")){
						location.href="/login/login.do?redirect_url=/whats_new/campaign_view.do?pro_seq=1102";
					}else{
						return;
					}
				}
			},
			function(data) {
			}
		);
	});
	
	
	// 고객정보 등록
	function setUserInfo()
	{
		var param = {};
		__ajaxCall("/openevent/setStbOpenEvent.do", param, true, "json", "post",
				function (_response) 
				{
					if ( _response.error_code != "0"){
						alert(_response.error_msg);
					}
		        }
				, 
				function(_error)
				{
					console.log('실패');
				}
		);
	}
			
	//SEQ=1102 팝업 추가
	$('.ev_seq1102_img01 a.ev_seq1102_link1').bind('click', function(){
		$('.layer_dimm_seq1102, .layer_popup_seq1102').fadeIn();
	});
	$('.layer_popup_seq1102_close, .layer_dimm_seq1102').bind('click', function(){
		$('.layer_dimm_seq1102, .layer_popup_seq1102').fadeOut();
	});
	//SEQ=1102 팝업 end

	
	/* 151222 김민호 추가 */
	$('.ev_seq1085_last_img01 a').bind('click', function(){
		$('.smt_evenprizewinner_popUp').fadeIn();
		$('.pop_dimm').show();
	});
	$('.smt_evenprizewinner_popUp p.close a, p.btn_pz_close a, .pop_dimm').bind('click', function(){
		$('.smt_evenprizewinner_popUp, .pop_dimm').fadeOut();
	});
	/* 151222 김민호 추가 end */

	$('.ev_seq1102_last_img01 a.ev_seq1102_last_link1').bind('click', function(){
		$(".btn_smt_ztext").html("");
		$("#label_q").val('');
		$("#label_q2").val('');
		$(".btn_smt_zimg").hide();
		$(".btn_smt_pimg").hide();
		$('.smt_evenprizewinner_popUp').fadeIn();
			$('.pop_dimm').show();
	});

	//SEQ=1112 팝업 추가
	$('.ev_seq1112_img01 a.ev_seq1112_link1').bind('click', function(){
		$('.layer_dimm_seq1112, .layer_popup_seq1112').fadeIn();
	});
	$('.layer_popup_seq1112_close, .layer_dimm_seq1112').bind('click', function(){
		$('.layer_dimm_seq1112, .layer_popup_seq1112').fadeOut();
	});
	//SEQ=1112 팝업 end
	//수상기념 축하 메시지 페이스북 공유 팝업
	$('.ev_seq1102_last_img01 a.ev_seq1102_last_link2').bind('click', function(){
		$(".btn_smt_ztext").html("");
		$("#label_q").val('');
		$("#label_q2").val('');
		$(".btn_smt_zimg").hide();
		$(".btn_smt_pimg").hide();
		$('.smt_evenprizewinner_popUp2').fadeIn();
		$('.pop_dimm').show();
	});
	$('.smt_evenprizewinner_popUp2 p.close a, p.btn_pz_close a, .pop_dimm').bind('click', function(){
		$('.smt_evenprizewinner_popUp2, .pop_dimm').fadeOut();
	});
	//웹,스마트앱  어워드 코리아란? 팝업
	$('.ev_seq1102_last_img02 a.ev_seq1102_last_link3').bind('click', function(){
		$('.layer_dimm_seq1102_last, .layer_popup_seq1102_last').fadeIn();
	});
	$('.layer_popup_seq1102_last_close, .layer_dimm_seq1102_last').bind('click', function(){
		$('.layer_dimm_seq1102_last, .layer_popup_seq1102_last').fadeOut();
	});
	
	//SEQ=1102 팝업 추가
	//신규 가입 또는 계정 정보 업데이트 팝업 
						 
	$('.ev_seq1120_last_img01 a.ev_seq1120_last_link1').bind('click', function(){
		$('.smt_evenprizewinner_popUp').fadeIn();
		$('.pop_dimm').show();
	});
	$('.smt_evenprizewinner_popUp p.close a, p.btn_pz_close a, .pop_dimm').bind('click', function(){
		$('.smt_evenprizewinner_popUp, .pop_dimm').fadeOut();
	});
	
	//SEQ=1102 팝업 end
	
	//SEQ=1149 팝업 추가
	$('.ev_seq1149_img01 a.ev_seq1149_link1').bind('click', function(){
		$('.1149_smt_evenprizewinner_popUp').fadeIn();
		$('.pop_dimm').show();
	});
	$('.1149_smt_evenprizewinner_popUp p.close a, p.btn_pz_close a, .pop_dimm').bind('click', function(){
		$('.1149_smt_evenprizewinner_popUp, .pop_dimm').fadeOut();
	});
	//SEQ=1149 팝업 end

	//SEQ=1168 팝업 추가
	$('.ev_seq1168_img01 a.ev_seq1168_link1').bind('click', function(){
		$('.1168_smt_evenprizewinner_popUp').fadeIn();
		$('.pop_dimm').show();
	});
	$('.1168_smt_evenprizewinner_popUp p.close a, p.btn_pz_close a, .pop_dimm').bind('click', function(){
		$('.1168_smt_evenprizewinner_popUp, .pop_dimm').fadeOut();
	});
	//SEQ=1168 팝업 end
	
	//SEQ=1168 당첨자
	$(".1168_btn_eq").on("click", function() {
		try {
			var winner = $("#1168_label_q").val();
			if( winner == "") 
			{
				alert("당첨자 조회할 아이디를 입력하세요.");
				$("#1168_label_q").focus();
				return;
			}	
		
			$.getJSON( "/common/js/openevent/pro1168_0525.js", function( data ) {
				var msr4_winUser = winner.toUpperCase();
				var msr4_winRank = "";
				var msr4_winCnt  = 0;
				
				$.each( data.people, function(x,y){
					if ( msr4_winUser  == y.USER) {
						msr4_winRank = y.RANK;
						msr4_winCnt++;
					}
				});
				
				if ( msr4_winCnt == 0 )	//당첨됬을때
				{
					$(".1168_zimg").hide();
					$(".1168_pimg").show();
					$(".1168_ztext").html( msr4_winUser + "님");
				}
				else //당첨되지 않았을때
				{
					$(".1168_zimg").show();
					$(".1168_pimg").hide();
					$(".1168_ztext").html( msr4_winUser + "님");
				}
			});					
		} catch(_e) {
			alert("당첨자 조회 중 오류가 발생하였습니다.");
		}
	});

	//SEQ=1180 팝업 추가
	$('.ev_seq1180_img01 a.ev_seq1180_link1').bind('click', function(){
		$('.1180_smt_evenprizewinner_popUp').fadeIn();
		$('.pop_dimm').show();
	});
	$('.1180_smt_evenprizewinner_popUp p.close a, p.btn_pz_close a, .pop_dimm').bind('click', function(){
		$('.1180_smt_evenprizewinner_popUp, .pop_dimm').fadeOut();
	});
	//SEQ=1180 팝업 end
	//SEQ=1180 당첨자
	$(".1180_btn_eq").on("click", function() {
		try {
			var winner = $("#1180_label_q").val();
			if( winner == "") 
			{
				alert("당첨자 조회할 아이디를 입력하세요.");
				$("#1180_label_q").focus();
				return;
			}	
		
			$.getJSON( "/common/js/openevent/pro1180_0629.js", function( data ) {
				var msr4_winUser = winner.toUpperCase();
				var msr4_winRank = "";
				var msr4_winCnt  = 0;
				
				$.each( data.people, function(x,y){
					if ( msr4_winUser  == y.USER) {
						msr4_winRank = y.RANK;
						msr4_winCnt++;
					}
				});
				
				if ( msr4_winCnt == 0 )	//당첨됬을때
				{
					$(".1180_zimg").hide();
					$(".1180_pimg").show();
					$(".1180_ztext").html( msr4_winUser + "님");
				}
				else //당첨되지 않았을때
				{
					$(".1180_zimg").show();
					$(".1180_pimg").hide();
					$(".1180_ztext").html( msr4_winUser + "님");
				}
			});					
		} catch(_e) {
			alert("당첨자 조회 중 오류가 발생하였습니다.");
		}
	});
	
	//SEQ=1183 팝업 추가
	$('.ev_seq1183_img01 a.ev_seq1183_link1').bind('click', function(){
		$('.smt_evenprizewinner_popUp').fadeIn();
		$('.pop_dimm').show();
	});
	$('.1183_smt_evenprizewinner_popUp p.close a, p.btn_pz_close a, .pop_dimm').bind('click', function(){
		$('.1183_smt_evenprizewinner_popUp, .pop_dimm').fadeOut();
	});
	//SEQ=1183 팝업 end
	//SEQ=1183 당첨자
	$(".1183_btn_eq").on("click", function() {
		try {
			var winner = $("#1183_label_q").val();
			if( winner == "") 
			{
				alert("당첨자 조회할 아이디를 입력하세요.");
				$("#1183_label_q").focus();
				return;
			}	
		
			$.getJSON( "/common/js/openevent/pro1183_0630.js", function( data ) {
				var msr4_winUser = winner.toUpperCase();
				var msr4_winRank = "";
				var msr4_winCnt  = 0;
				
				$.each( data.people, function(x,y){
					if ( msr4_winUser  == y.USER) {
						msr4_winRank = y.RANK;
						msr4_winCnt++;
					}
				});
				
				if ( msr4_winCnt == 0 )	//당첨됬을때
				{
					$(".1183_zimg").hide();
					$(".1183_pimg").show();
					$(".1183_ztext").html( msr4_winUser + "님");
				}
				else //당첨되지 않았을때
				{
					$(".1183_zimg").show();
					$(".1183_pimg").hide();
					$(".1183_ztext").html( msr4_winUser + "님");
				}
			});					
		} catch(_e) {
			alert("당첨자 조회 중 오류가 발생하였습니다.");
		}
	});
	
	
	$(".label_q_1120").unbind("click").on("click", function(){
		var winner = $("#label_q_1120").val();
		if( winner == "") 
		{
			alert("당첨자 조회할 아이디를 입력하세요.");
			$("#label_q_1120").focus();
			return;
		}	
		
		__ajaxCall("/common/js/openevent/cvStatistics_0307.js",{}, true, "json", "post",
				function (data) {
					var msr4_winUser = winner.toUpperCase();
					var msr4_winRank = "";
					var msr4_winCnt  = 0;
					
					$.each( data.people, function(x,y){
						if ( msr4_winUser  == y.USER) {
							msr4_winRank = y.RANK;
							msr4_winCnt++;
						}
					});
					
					if ( msr4_winCnt == 0 )	//당첨됬을때
					{
						$(".1120_zimg").hide();
						$(".1120_pimg").show();
						$(".1120_ztext").html( msr4_winUser + "님");
					}
					else //당첨되지 않았을때
					{
						$(".1120_zimg").show();
						$(".1120_pimg").hide();
						$(".1120_ztext").html( msr4_winUser + "님");
					}
					
		        } , 
				function(_error) {
				}
		);

	});
	
	$(".1149_btn_eq").unbind("click").on("click", function(){
		var winner = $("#1149_label_q").val();
		if( winner == "") 
		{
			alert("당첨자 조회할 아이디를 입력하세요.");
			$("#1149_label_q").focus();
			return;
		}	
		
		__ajaxCall("/common/js/openevent/pro1149_0414.js",{}, true, "json", "post",
				function (data) {
					var msr4_winUser = winner.toUpperCase();
					var msr4_winRank = "";
					var msr4_winCnt  = 0;
					
					$.each( data.people, function(x,y){
						if ( msr4_winUser  == y.USER) {
							msr4_winRank = y.RANK;
							msr4_winCnt++;
						}
					});
					
					if ( msr4_winCnt == 0 )	//당첨됬을때
					{
						$(".1149_zimg").hide();
						$(".1149_pimg").show();
						$(".1149_ztext").html( msr4_winUser + "님");
					}
					else //당첨되지 않았을때
					{
						$(".1149_zimg").show();
						$(".1149_pimg").hide();
						$(".1149_ztext").html( msr4_winUser + "님");
					}
					
		        } , 
				function(_error) {
				}
		);

	});
	
	
	
	
	$(".1085btn").unbind("click").on("click", function(){
		var winner = $("#label_q").val();
		if( winner == "") 
		{
			alert("당첨자 조회할 아이디를 입력하세요.");
			$("#label_q").focus();
			return;
		}	
		
		__ajaxCall("/common/js/openevent/christmas_week_user.js",{}, true, "json", "post",
				function (data) {
					
					var msr4_winUser = winner.toUpperCase();
					var msr4_winRank = "";
					var msr4_winCnt  = 0;
					
					$.each( data.people, function(x,y){
						if ( msr4_winUser  == y.USER) {
							msr4_winRank = y.RANK;
							msr4_winCnt++;
						}
					});
					
					if ( msr4_winCnt > 0 )	//당첨됬을때
					{
						$(".btn_smt_zimg").hide();
						$(".btn_smt_pimg").show();
						
					}
					else //당첨되지 않았을때
					{
						$(".btn_smt_zimg").show();
						$(".btn_smt_pimg").hide();
						$(".btn_smt_ztext").html( msr4_winUser + "님");
					}
					
		        } , 
				function(_error) {
				}
		);

	});
		$(".1102btn1").unbind("click").on("click", function(){
		var winner = $("#label_q").val();
		if( winner == "") 
		{
			alert("당첨자 조회할 아이디를 입력하세요.");
			$("#label_q").focus();
			return;
		}	
		
		__ajaxCall("/common/js/openevent/award_1_0104.js",{}, true, "json", "post",
				function (data) {
					
					var msr4_winUser = winner.toUpperCase();
					var msr4_winRank = "";
					var msr4_winCnt  = 0;
					$.each( data.people, function(x,y){
						
						if ( msr4_winUser  == y.USER) {
							msr4_winRank = y.RANK;
							msr4_winCnt++;
						}
					});
					
					if ( msr4_winCnt == 0 )	//당첨되지 않았을때
					{
						$(".btn_smt_zimg").hide();
						$(".btn_smt_pimg").show();
						$(".btn_smt_ztext").html( msr4_winUser + "님");
					}
					else //당첨됬을때
					{
						$(".btn_smt_zimg").show();
						$(".btn_smt_pimg").hide();
						$(".btn_smt_ztext").html( msr4_winUser + "님");
					}
					
		        } , 
				function(_error) {
				}
		);					
		
		
	});
	
	$(".1102btn2").unbind("click").on("click", function(){
		var winner = $("#label_q2").val();
		if( winner == "") 
		{
			alert("당첨자 조회할 아이디를 입력하세요.");
			$("#label_q2").focus();
			return;
		}	
		
		__ajaxCall("/common/js/openevent/award_2_0104.js",{}, true, "json", "post",
				function (data) {
					var msr4_winUser = winner.toUpperCase();
					var msr4_winRank = "";
					var msr4_winCnt  = 0;
					
					$.each( data.people, function(x,y){
						if ( msr4_winUser  == y.USER) {
							msr4_winRank = y.RANK;
							msr4_winCnt++;
						}
					});
					if ( msr4_winCnt == 0 )	//당첨되지 않았을때
					{
						$(".btn_smt_zimg").hide();
						$(".btn_smt_pimg").show()
						$(".btn_smt_ztext").html( msr4_winUser + "님");
						
					}
					else 
					{//당첨됬을때
						$(".btn_smt_zimg").show();
						$(".btn_smt_pimg").hide();
						$(".btn_smt_ztext").html( msr4_winUser + "님");
					}
					
		        } , 
				function(_error) {
				}
		);					
		
	});
	//SEQ=1157 팝업 추가
	$('.ev_seq1157_img02 a.ev_seq1157_link1').bind('click', function(){
		$('.layer_dimm, .layer_popup_seq1157').fadeIn();
	});
	$('.layer_popup_seq1157_close').bind('click', function(){
		$('.layer_dimm, .layer_popup_seq1157').fadeOut();
	});
	//SEQ=1157 팝업 end
});