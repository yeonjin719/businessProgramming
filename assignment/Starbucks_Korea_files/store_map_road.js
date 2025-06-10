/** 다음 길찾기 로직 **/
var daumtype="";

$(document).ready(function(){
	
	$("#destination").on("keyup", function(){
		
		var destination = $("#destination").val();
		$search_position="destination";
		$search_target="keyup";
		
		if ( destination != "" )
		{
			//sbSearchPlace( destination );
		}		
	});
	
	
    $("#destination").unbind("keydown").keydown(function (e) {
    	if (e.keyCode == 13) 
    	{
    		e.preventDefault();
    		var destination = $("#destination").val();
    		
    		if (destination=="")
    		{
    			alert("검색할 도착지를 입력하세요.");
    			return false;
    		}
    		
    		$search_position="destination";
    		$search_target="click";
    		
    		if ( destination != "" )
    		{
    			sbSearchPlace( destination );
    		}	
    	}
    });	
	
	$("#destination1").on("click", function(){
		var destination = $("#destination").val();
		
		if (destination=="")
		{
			alert("검색할 도착지를 입력하세요.");
			return false;
		}
		
		$search_position="destination";
		$search_target="click";
		
		if ( destination != "" )
		{
			sbSearchPlace( destination );
		}			
		
	});
	
	
    $("#start").unbind("keydown").keydown(function (e) {
    	if (e.keyCode == 13) 
    	{
    		e.preventDefault();
    		var start = $.trim($("#start").val());
    		$("#start").val(start);
    		
    		if (start=="")
    		{
    			alert("검색할 출발지를 입력하세요.");
    			return false;
    		}
    		
    		$search_position="start";
    		$search_target="click";
    		
    		if ( start != "" )
    		{
    			daumSearchPlace( start );
    		}	
    	}
    });
	
	$("#start1").on("click", function(){
		var start = $.trim($("#start").val());
		$("#start").val(start);
		
		if (start=="")
		{
			alert("검색할 출발지를 입력하세요.");
			return false;
		}
		
		$search_position="start";
		$search_target="click";
		
		if ( start != "" )
		{
			daumSearchPlace( start );
		}			
		
	});
	
	$(".road_find_current").on("click", function(){

		$roadGps.latitude  = $geo.latitude;
		$roadGps.longitude = $geo.longitude;
		roadCurrentSet();		
	});
	
	
	$(".inmap_short_info_wrap").on("click", function(){
		$('.road_layer_toggle a').removeClass('on');
		$('.road_map_layer_cont').show();

		var myWin 		= $(window).width();
		if ( myWin < 641 )
		{
			$('.road_map_layer_cont').show();
			$('.road_map_layer_cont').height(roadSetHeight);
			

			$(".afterMobileSearchWrap").hide();
			$(".inmap_short_info_wrap").hide();
			$(".road_map_layer_inner").show();
		}
		
		
		var sid = $(this).attr("sid");
		
		if ( parseInt(sid) >= 0 )
		{
			var all_height = 0;
			$(".ivTrafficWrapBox").each(function(ix){
				if ( ix < parseInt(sid) )
				{
					all_height += $(this).outerHeight();
				}
			});
			
			all_height += $(".desti_top_wrap").outerHeight();
				
			setTimeout(function(){
				$(".transfer_method_cont2").mCustomScrollbar("scrollTo", parseInt(all_height) + 50 );
			}, 500);
		}
		roadMapShow = false;		
	});
	
	$("#initStartTxt").on("click", function(){
		$('.road_layer_toggle a').removeClass('on');
		$('.road_map_layer_cont').show();
		
		var myWin 		= $(window).width();
		if ( myWin < 641 )
		{
			$('.road_map_layer_cont').show();
			$('.road_map_layer_cont').height(roadSetHeight);
			$(".afterMobileSearchWrap").hide();
			$(".inmap_short_info_wrap").hide();
			$(".road_map_layer_inner").show();
		}
		
		roadMapShow = false;
		
		$("#start").focus();
	});
	
	
	$("#initEndTxt").on("click", function(){
		$('.road_layer_toggle a').removeClass('on');
		$('.road_map_layer_cont').show();
		var myWin 		= $(window).width();
		if ( myWin < 641 )
		{
			$('.road_map_layer_cont').show();
			$('.road_map_layer_cont').height(roadSetHeight);
			$(".afterMobileSearchWrap").hide();
			$(".inmap_short_info_wrap").hide();
			$(".road_map_layer_inner").show();
		}
		
		roadMapShow = false;
		
		$("#destination").focus();
	});	
	
	
	$(".roadFindStartBtn").on("click", function(){
		//[디파이너리 이벤트]길찾기 수단 선택 S
		try {
			if(window.location.pathname.indexOf("/app/store/store_map.do") > -1) {
				var dfineryEventData = {
					type : $(this).text()
				};
				
				dfineryFn.commonEvent(dfinery.EVENT_NAME.STORE_STOREMAP_FINDROADTYPE, dfineryEventData);
			}
		}catch(e) {
		}
		//[디파이너리 이벤트]길찾기 수단 선택 E
		
		var setMode = $(this).attr("data-target");
		
		if ( $startPostion.displayName==null || $startPostion.gps_lat == null || $startPostion.gps_lng == null)
		{
			alert("출발지 설정 후 이용해주세요..");
			return false;
		}
		else if ( $endPostion.displayName==null || $endPostion.gps_lat == null || $endPostion.gps_lng == null)
		{
			alert("목적지 설정 후 이용해주세요..");
			return false;
		}
		else
		{
			var index = $(".roadFindStartBtn").index(this);
			$(".roadFindStartBtn").removeClass("on");
			$(".roadFindStartBtn").each(function(ix){
				if (index == ix)
				{
					$(this).addClass("on");
				}
			});
			
			
			$roadFindBool = true;
			
			if (setMode=="car")
			{
				$(".transfer_method_cont1").show();
				$(".transfer_method_cont2").hide();
				$(".transfer_method_cont3").hide();
				daumRoadFindCar();
				
				var myWinWidth = $(window).width();
				if (myWinWidth < 641) 
				{
					$(".daumFindParentToggle").addClass("on");
					$(".road_map_layer_cont").hide();
					
					$('.find_store_wrap').css({
						'height':'118px'
					});
					roadMapShow = true;				
				}			
			}

			if (setMode=="transport")
			{
				$(".transfer_method_cont1").hide();
				$(".transfer_method_cont2").show();
				$(".transfer_method_cont3").hide();			
				daumRoadFindTransport();
				
				var myWinWidth = $(window).width();
				if (myWinWidth < 641) 
				{
					$(".daumFindParentToggle").removeClass("on");
					$('.road_map_layer_cont').show();
					
					roadMapShow = false;		
				}			
			}		


			if (setMode=="foot")
			{
				$(".transfer_method_cont1").hide();
				$(".transfer_method_cont2").hide();
				$(".transfer_method_cont3").show();				
				daumRoadFindFoot();
				
				var myWinWidth = $(window).width();
				if (myWinWidth < 641) 
				{
					$(".daumFindParentToggle").addClass("on");
					$(".road_map_layer_cont").hide();
					
					$('.find_store_wrap').css({
						'height':'118px'
					});
					roadMapShow = true;				
				}			
			}			
		}
		

	});
	
	
	$('.btn_after_search li').on('click',function(){

		
		if ( afterSearch ==true ){
			$('.btn_after_search li').show();
			afterSearch = false;
		}else {
			var pId = $(this).attr("pId");

			//alert(pId);

			$('.btn_after_search li').stop().hide();
			$('.btn_after_search li').children('a').removeClass('on');
			$(this).stop().show();
			$(this).prependTo('.btn_after_search');
			$(this).children('a').addClass('on');
			afterSearch = true;
			
			if ( pId =="car")
			{
				$(".transfer_method_cont1").show();
				$(".transfer_method_cont2").hide();
				$(".transfer_method_cont3").hide();
				daumRoadFindCar();
				
				var myWinWidth = $(window).width();
				if (myWinWidth < 641) 
				{
					$(".daumFindParentToggle").addClass("on");
					$(".road_map_layer_cont").hide();
					
					$('.find_store_wrap').css({
						'height':'118px'
					});
					roadMapShow = true;				
				}			
				
				$(".roadFindStartBtn").removeClass("on");
				$(".roadFindStartBtn").each(function(ix){
					if (ix==0)
					{
						$(this).addClass("on");
					}
				});				
			}
			else if ( pId =="trasfer")
			{
				$(".transfer_method_cont1").hide();
				$(".transfer_method_cont2").show();
				$(".transfer_method_cont3").hide();			
				daumRoadFindTransport();
				
				$('.road_layer_toggle a').removeClass('on');
				$('.road_map_layer_cont').show();
				
				var myWin 		= $(window).width();
				if ( myWin < 641 )
				{
					$('.road_map_layer_cont').show();
					$('.road_map_layer_cont').height(roadSetHeight);
					$(".afterMobileSearchWrap").hide();
					$(".inmap_short_info_wrap").hide();
					$(".road_map_layer_inner").show();
				}
				roadMapShow = false;
				$(".roadFindStartBtn").removeClass("on");
				$(".roadFindStartBtn").each(function(ix){
					if (ix==1)
					{
						$(this).addClass("on");
					}
				});						
			}
			else if ( pId =="walk")
			{
				$(".transfer_method_cont1").hide();
				$(".transfer_method_cont2").hide();
				$(".transfer_method_cont3").show();				
				daumRoadFindFoot();
				
				var myWinWidth = $(window).width();
				if (myWinWidth < 641) 
				{
					$(".daumFindParentToggle").addClass("on");
					$(".road_map_layer_cont").hide();
					
					$('.find_store_wrap').css({
						'height':'118px'
					});
					roadMapShow = true;				
				}			
				$(".roadFindStartBtn").removeClass("on");
				$(".roadFindStartBtn").each(function(ix){
					if (ix==2)
					{
						$(this).addClass("on");
					}
				});					
			}
		}
	});
	
	
	
	$(".daumGoBtn").on("click", function(){
		
		if ( $startPostion.displayName==null || $startPostion.gps_lat == null || $startPostion.gps_lng == null)
		{
			alert("출발지 설정 후 이용해주세요.");
			return false;
		}

		
		if ( $endPostion.displayName==null || $endPostion.gps_lat == null || $endPostion.gps_lng == null)
		{
			alert("목적지 설정 후 이용해주세요.");
			return false;
		}		
		
		// daumtype
		
		if ( daumtype == "" )
		{
			$(this).attr("href", 'http://map.daum.net/etc/partner/carroute?s='+$startPostion.gps_lng+','+$startPostion.gps_lat+','+$startPostion.displayName+'&e='+$endPostion.gps_lng+','+$endPostion.gps_lat+','+$endPostion.displayName+'&partner=STARBUCKS');
		}
		else
		{
			if( daumtype == "car" )
			{
				
				$(this).attr("href", 'http://map.daum.net/etc/partner/carroute?s='+$startPostion.gps_lng+','+$startPostion.gps_lat+','+$startPostion.displayName+'&e='+$endPostion.gps_lng+','+$endPostion.gps_lat+','+$endPostion.displayName+'&partner=STARBUCKS');
				
			}
			
			if( daumtype == "transport" )
			{
				$(this).attr("href", 'http://map.daum.net/etc/partner/publicroute?s='+$startPostion.gps_lng+','+$startPostion.gps_lat+','+$startPostion.displayName+'&e='+$endPostion.gps_lng+','+$endPostion.gps_lat+','+$endPostion.displayName+'&partner=STARBUCKS');
			}
			
			if( daumtype == "foot" )
			{
				$(this).attr("href", 'http://map.daum.net/etc/partner/walkroute?s='+$startPostion.gps_lng+','+$startPostion.gps_lat+','+$startPostion.displayName+'&e='+$endPostion.gps_lng+','+$endPostion.gps_lat+','+$endPostion.displayName+'&partner=STARBUCKS');				
			}
			
			
			
		}
		
				
		//if ( $roadFindBool )
		//{
			
		//}
		//else
		//{
		//	$(this).attr("href", "javascript:void(0)");
		//}
	});
	
});





function roadCurrentSet()
{
	$startPostion.displayName = "현재위치";
	$startPostion.gps_lat     = $roadGps.latitude;
	$startPostion.gps_lng     = $roadGps.longitude;	

	var url = "https://dapi.kakao.com/v2/local/geo/coord2address.json";
	var param = {
		x: $startPostion.gps_lng,
		y: $startPostion.gps_lat,
		input_coord: "WGS84"
	}
	var option = {
		type: "get",
		url: url,
		data: param,
		scriptCharset: "utf-8",
		async: true,
		dataType: "json",
		beforeSend: function (request) {
			request.setRequestHeader('Authorization', 'KakaoAK 1f3e334827ede0ab19a24b253d0e9042');
		},
		success: function (data) {
			if (typeof data.documents[0].address.address_name !== 'undefined') {
				$startPostion.displayName = data.documents[0].address.address_name;
				$("#start").val(data.documents[0].address.address_name);
			} else {
				$startPostion.displayName = "현재위치";
				$("#start").val("현재 위치");
			}
		},
		error: function (data) {
			$startPostion.displayName = "현재위치";
			$("#start").val("현재 위치");
			return;
		}
	};

	$.ajax(option);
	
	

	
	
	
	$.daum.markerRemove();
	if ( $start_road_marker != null )
	{
		$start_road_marker.setMap(null);
	}
	
	
	if( $daumRoadLine != null )
	{
		$daumRoadLine.setMap(null);
	}
	
	$(".roadFindStartBtn").removeClass("on");
	$(".carFindRoad").hide();
	$(".carFindRoadErr").hide();
	$roadFindBool = false;
	
	var markerImageSize 		= new daum.maps.Size( 38 , 60 );
	var markerImageOptions 		= { offset : new daum.maps.Point(16 , 55 ) };  
	var markerPosition 			= new daum.maps.LatLng( $startPostion.gps_lat , $startPostion.gps_lng  );
	var markerImage 			= new daum.maps.MarkerImage( "/common/img/store/pin/pin_start.png"	, markerImageSize, markerImageOptions);
	
	$start_road_marker = new daum.maps.Marker({
		position: markerPosition		, // 마커의 좌표
		image : markerImage				, // 마커의 이미지
		map: $map.map					, // 마커를 표시할 지도 객체
		clickable: true
	});	
	
	
	
	
	if($(window).width() > 640){
		if ( $start_road_marker != null )
		{
			$map.map.setCenter(markerPosition);
		}			
	}else{
		if ( $start_road_marker != null )
		{	
			if(window.location.pathname.indexOf("/app/store/store_map.do") > -1){
				markerPosition.Ma = Number(markerPosition.Ma) + 0.001
			}else{
				markerPosition.Ma = Number(markerPosition.Ma) + 0.00085
			}
			$map.map.setCenter(markerPosition);
		}
	}
		
}




function unserialize(str) {
  str = decodeURIComponent(str);
  var chunks = str.split('&'),
      obj = {};
  for(var c=0; c < chunks.length; c++) {
    var split = chunks[c].split('=', 2);
    obj[split[0]] = split[1];
  }
  return obj;
}



function daumRoadFindCar()
{
	
	var url = "/daumroad/getFindRoad.do";
	
	var param 	="";
	param += 'appId=car';
	param += '&startX='+$startPostion.gps_lng;
	param += '&startY='+$startPostion.gps_lat;
	param += '&endX='+$endPostion.gps_lng;
	param += '&endY='+$endPostion.gps_lat;
	param += '&routeMode=SHORTEST_TIME';
	param += '&routeOption=NONE';
	param += '&guidanceLevel=LEVEL_1';
	param += '&inputCoordSystem=WGS84';
	param += '&outputCoordSystem=WGS84';
	

	var prm = unserialize(param);

	var option = { 
			 type			: "post"													,
			 url			: url													,
			 data			: prm													,
			 scriptCharset	: "utf-8"												,
			 contentType	: "application/x-www-form-urlencoded; charset=UTF-8"	,
			 async			: true													,
			 dataType 		: "json"												,
			 success        : function(obj){


				var data = obj.road;
				data = JSON.parse(data);
				var pathArray = new Array();

				if ( data.success == true)
				{

					if ( data.section[0].resultCode == "ROUTE_RESULT_SUCCESS" )
					{
						var linked = data.section[0].link;
						var noded  = data.section[0].node;
						
						//natural_lang_result_wrap
						$(".road_found_list").html("");
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						var km 		= parseInt(data.length) / 1000;
							km 		= km.toFixed(1); 
						var time	= parseInt(data.time) / 60;
							time	= time.toFixed(0); 
						
							$(".iTrafficSubView1").hide();
							$(".iTrafficSubView2").show();
							$(".iv_end_position").html($endPostion.displayName);
		
						var timeMsg = "";
						if ( parseInt(time) > 60 )
						{
							var timeHour = "";
							var timeMin  = "";
							
							timeHour = parseInt(parseInt(time) / 60);
							timeMin  = parseInt(parseInt(time) % 60);
							timeMsg ='<strong>'+timeHour+'</strong>시간 <strong>'+timeMin+'</strong> 분';
							
							$(".iv_end_min").html(timeHour + "시간 " + timeMin + "분");
							
						}
						else
						{
							timeMsg = '<strong>'+time+'</strong> 분';
							$(".iv_end_min").html(time + "분");
						}
						
						$(".iv_end_length").html(km + "km");
						//class="setStoreFavBtn"  data-store="'+y.s_code+'" data-yn="Y" data-name="'+y.s_name+'"
								
						//</span><strong class="car_find_min">8</strong>분
						$(".car_find_endName").html($endPostion.displayName);
						$(".car_find_min").html(timeMsg);
						$(".car_find_lengtn").html(km);
						$(".car_find_startName").html($startPostion.displayName);	
						$(".carFindRoad").show();
						$(".carFindRoadErr").hide();
						

						
						//$(".transfer_method_cont1").prepend(html1);
						
						
						var roadInfoArr = new Array();
						
						jQuery.each( noded , function(z,q){
							var roadviewObj = q.roadview;
							var roadGpsLat = q.y;
							var roadGpsLng = q.x;
							var roadText = "";
							var strongNames = "";
							
							
							if ( z < noded.length - 1)
							{
								
								var h = data.section[0].link[z];
								if ( q.name !="출발지" && q.name != "") 
								{
									strongNames = '<strong>'+q.name+'</strong><br>';
								}
								
								if ( q.name == "출발지")
								{
									roadText = h.name + "방면으로 "+h.length+"m "+q.routeinfo;
								}
								else if ( q.name=="" && q.guidecode != "0" )
								{
									roadText = strongNames + q.routeinfo + " 후 " + h.name + " 방면으로 "+h.length+"m 이동"
								}
								else
								{
									roadText = strongNames + q.routeinfo + " 후 " + h.name + " 방면으로 "+h.length+"m 이동"
								}
								
								var iconClassName = "";
								
								
								if ( q.guidecode == "0" || q.guidecode == "37" )
								{
									iconClassName="icon_straight";
								}
								
								if ( q.guidecode == "3" || q.guidecode == "7" || q.guidecode == "38" )
								{
									iconClassName="icon_left";
								}								
								
								
								if ( q.guidecode == "1" || q.guidecode == "5" || q.guidecode == "39" )
								{
									iconClassName="icon_right";
								}		
								
								
								
								if ( q.guidecode == "2"  )
								{
									iconClassName="icon_uturn";
								}		
								
								
								
								if ( q.guidecode == "21"  )
								{
									iconClassName="icon_bridge";
								}										
								
								
								if (  q.guidecode == "9" || q.guidecode == "10" || q.guidecode == "11" )
								{
									iconClassName="icon_highlevel";
								}		
								
								
								if (  q.guidecode == "12" || q.guidecode == "13" || q.guidecode == "14" )
								{
									iconClassName="icon_highlevel_side";
								}
								
								
								if (  q.guidecode == "15" || q.guidecode == "16" || q.guidecode == "17" )
								{
									iconClassName="icon_ug";
								}								
								
								
								if (  q.guidecode == "18" || q.guidecode == "19" || q.guidecode == "20" )
								{
									iconClassName="icon_ug_side";
								}								
								
								
								if ( q.guidecode == "22"  )
								{
									iconClassName="icon_tunner";
								}										
																
								if ( q.guidecode == "35"  )
								{
									iconClassName="icon_rest";
								}
								
								if ( q.guidecode == "36"  )
								{
									iconClassName="icon_tollgate";
								}		
								
								
								
								if (  q.guidecode == "23" || q.guidecode == "24" || q.guidecode == "25" || q.guidecode == "26" || q.guidecode == "27" || q.guidecode == "28" )
								{
									iconClassName="icon_highway";
								}		
								
								if (  q.guidecode == "29" || q.guidecode == "30" || q.guidecode == "31" || q.guidecode == "32" || q.guidecode == "33" || q.guidecode == "34" )
								{
									iconClassName="icon_urban";
								}									
																
								
								var html = '';
								html += '<li class="road_find_resultInfo" type="car" lat="'+q.y+'" lng="'+q.x+'" guidecode="'+q.guidecode+'" >';
								html += '	<p class="road_found_list_txt">'+roadText+'</p>';
								html += '	<p class="walk_icon_wrap">';
								html += '		<i class="'+iconClassName+'"></i>';
								html += '	</p>';
								html += '</li>';		
								$(".road_found_list").append(html);						
													
							}
							

							

							
							
						
							//pathArray.push(  new daum.maps.LatLng( roadGpsLat , roadGpsLng ) );

						});	
						
						
						
						var html2 = "";
						html2 += ' <dl class="bg_start_desti">';
						html2 += ' <dt>도착</dt>';
						html2 += ' <dd><p>'+$endPostion.displayName+'</p></dd>';
						html2 += ' </dl>';					
						
						//$(".transfer_method_cont1").append(html2);					
						
						jQuery.each( linked , function(z,q){
							var pointsObj = q.points;
							var pointsArr = pointsObj.split(" ");
							for ( var i = 0; i <= pointsArr.length - 1 ; i++)
							{
								var pointGpsArr = pointsArr[i].split(",");
								pathArray.push(  new daum.maps.LatLng( pointGpsArr[1] , pointGpsArr[0] ) );
							}
						});					

						$daumRoadLine = new daum.maps.Polyline({
							path: pathArray	, // 선을 구성하는 좌표배열 입니다
							strokeWeight	: 5, // 선의 두께 입니다
							strokeColor		: '#1a1aff', // 선의 색깔입니다
							strokeOpacity	: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
							strokeStyle		: 'solid' // 선의 스타일입니다
						});					
						
						$daumRoadLine.setMap($map.map);
						window.scrollTo(0, 0);
						daumtype = "car";
						
						$roadResult = true;
						
						if ( roadMapShow == true)
						{
							var myWin 		= $(window).width();
							
							if ( myWin < 641 )
							{
								$('.road_map_layer_cont').show();
								$('.road_map_layer_cont').css({
									'height':'38px'
								});
								$(".afterMobileSearchWrap").show();
								$(".inmap_short_info_wrap").show();
								$(".road_map_layer_inner").hide();
								
								$("#initStartTxt").val( $("#start").val() );
								$("#initEndTxt").val( $("#destination").val() );
							}
						}		
						
						$(".inmap_short_info_wrap").attr("sid", "-1");
						$(".iv_sub_target").each(function(){
							var pId = $(this).attr("pId");
							
							if ( pId == "car")
							{
								$('.btn_after_search li').stop().hide();
								$('.btn_after_search li').children('a').removeClass('on');
								$(this).stop().show();
								$(this).prependTo('.btn_after_search');
								$(this).children('a').addClass('on');
								afterSearch = true;								
							}
						});
					}
					
								
					
				}
				else
				{
					if ( data.section[0].resultCode == "NO_SEARCH" || data.sections[0].resultCode == "ROUTE_RESULT_NOT_FOUND"  )
					{
						$(".icon_exclam").html("검색결과가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();
						$(".road_found_list").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
												
						return;	
					}
					else if ( data.section[0].resultCode == "SAME_POINT"   )
					{
						$(".icon_exclam").html("출발지와 도착지가 동일합니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();
						$(".road_found_list").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
												
						return;	
					}
					else if ( data.section[0].resultCode == "START_LINK_NOT_FOUND"  )
					{
						$(".icon_exclam").html("출발지 주변 자동차 경로가 없습니다. ");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();
						$(".road_found_list").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
												
						return;	
					}
					else if ( data.section[0].resultCode == "END_LINK_NOT_FOUND"  )
					{
						$(".icon_exclam").html("도착지 주변 자동차 경로가 없습니다. ");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();
						$(".road_found_list").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
												
						return;	
					}
					else if ( data.section[0].resultCode == "TOO_MANY_SEARCH_LINK"  )
					{
						alert("너무많은 링크를 탐색함");
						return;	
					}
					else if ( data.section[0].resultCode == "NONE"  )
					{
						$(".icon_exclam").html("잘못된 요청입니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
												
						return;	
					}				
				}
			 }
	};

	$.ajax(option);



	/**

	var url 	= "//addr.mdplus.kr/@daum/getFindRoad_car.php";
	
	
	var param 	="";
	param += 'startX='+$startPostion.gps_lng;
	param += '&startY='+$startPostion.gps_lat;
	param += '&endX='+$endPostion.gps_lng;
	param += '&endY='+$endPostion.gps_lat;
	param += '&routeMode=SHORTEST_TIME';
	param += '&routeOption=NONE';
	param += '&guidanceLevel=LEVEL_1';
	param += '&inputCoordSystem=WGS84';
	param += '&outputCoordSystem=WGS84';

	
	var option = { 
			 type			: "get"													,
			 url			: url+"?"+param											,
			 data			: ""													,
			 scriptCharset	: "utf-8"												,
			 contentType	: "application/x-www-form-urlencoded; charset=UTF-8"	,
			 async			: true													,
			 dataType 		: "jsonp"												,
			 jsonp 			: "callback"											,			 
			 success        : function(data){
				var pathArray = new Array();
				if ( data.success == true)
				{

					if ( data.section[0].resultCode == "ROUTE_RESULT_SUCCESS" )
					{
						var linked = data.section[0].link;
						var noded  = data.section[0].node;
						
						//natural_lang_result_wrap
						$(".road_found_list").html("");
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						var km 		= parseInt(data.length) / 1000;
							km 		= km.toFixed(1); 
						var time	= parseInt(data.time) / 60;
							time	= time.toFixed(0); 
						
							$(".iTrafficSubView1").hide();
							$(".iTrafficSubView2").show();
							$(".iv_end_position").html($endPostion.displayName);
		
						var timeMsg = "";
						if ( parseInt(time) > 60 )
						{
							var timeHour = "";
							var timeMin  = "";
							
							timeHour = parseInt(parseInt(time) / 60);
							timeMin  = parseInt(parseInt(time) % 60);
							timeMsg ='<strong>'+timeHour+'</strong>시간 <strong>'+timeMin+'</strong> 분';
							
							$(".iv_end_min").html(timeHour + "시간 " + timeMin + "분");
							
						}
						else
						{
							timeMsg = '<strong>'+time+'</strong> 분';
							$(".iv_end_min").html(time + "분");
						}
						
						$(".iv_end_length").html(km + "km");
						//class="setStoreFavBtn"  data-store="'+y.s_code+'" data-yn="Y" data-name="'+y.s_name+'"
								
							
						
						$(".roadFav").attr("data-store", $endPostion.store_code);
						$(".roadFav").attr("data-name", $endPostion.displayName);
						
						if( $endPostion.favorites != null)
						{
							if($endPostion.favorites == "0")
							{
								$(".roadFav").attr("data-yn", "N");
								$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_off.png");
							}
							else
							{
								$(".roadFav").attr("data-yn", "Y");
								$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_on.png");
							}
							
						}
						else
						{
							$(".roadFav").attr("data-yn", "N");
							$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_off.png");							
						}
							
								
							
						//</span><strong class="car_find_min">8</strong>분
						$(".car_find_endName").html($endPostion.displayName);
						$(".car_find_min").html(timeMsg);
						$(".car_find_lengtn").html(km);
						$(".car_find_startName").html($startPostion.displayName);	
						$(".carFindRoad").show();
						$(".carFindRoadErr").hide();
						

						
						//$(".transfer_method_cont1").prepend(html1);
						
						
						var roadInfoArr = new Array();
						
						jQuery.each( noded , function(z,q){
							var roadviewObj = q.roadview;
							var roadGpsLat = q.y;
							var roadGpsLng = q.x;
							var roadText = "";
							var strongNames = "";
							
							
							if ( z < noded.length - 1)
							{
								
								var h = data.section[0].link[z];
								if ( q.name !="출발지" && q.name != "") 
								{
									strongNames = '<strong>'+q.name+'</strong><br>';
								}
								
								if ( q.name == "출발지")
								{
									roadText = h.name + "방면으로 "+h.length+"m "+q.routeinfo;
								}
								else if ( q.name=="" && q.guidecode != "0" )
								{
									roadText = strongNames + q.routeinfo + " 후 " + h.name + " 방면으로 "+h.length+"m 이동"
								}
								else
								{
									roadText = strongNames + q.routeinfo + " 후 " + h.name + " 방면으로 "+h.length+"m 이동"
								}
								
								var iconClassName = "";
								
								
								if ( q.guidecode == "0" || q.guidecode == "37" )
								{
									iconClassName="icon_straight";
								}
								
								if ( q.guidecode == "3" || q.guidecode == "7" || q.guidecode == "38" )
								{
									iconClassName="icon_left";
								}								
								
								
								if ( q.guidecode == "1" || q.guidecode == "5" || q.guidecode == "39" )
								{
									iconClassName="icon_right";
								}		
								
								
								
								if ( q.guidecode == "2"  )
								{
									iconClassName="icon_uturn";
								}		
								
								
								
								if ( q.guidecode == "21"  )
								{
									iconClassName="icon_bridge";
								}										
								
								
								if (  q.guidecode == "9" || q.guidecode == "10" || q.guidecode == "11" )
								{
									iconClassName="icon_highlevel";
								}		
								
								
								if (  q.guidecode == "12" || q.guidecode == "13" || q.guidecode == "14" )
								{
									iconClassName="icon_highlevel_side";
								}
								
								
								if (  q.guidecode == "15" || q.guidecode == "16" || q.guidecode == "17" )
								{
									iconClassName="icon_ug";
								}								
								
								
								if (  q.guidecode == "18" || q.guidecode == "19" || q.guidecode == "20" )
								{
									iconClassName="icon_ug_side";
								}								
								
								
								if ( q.guidecode == "22"  )
								{
									iconClassName="icon_tunner";
								}										
																
								if ( q.guidecode == "35"  )
								{
									iconClassName="icon_rest";
								}
								
								if ( q.guidecode == "36"  )
								{
									iconClassName="icon_tollgate";
								}		
								
								
								
								if (  q.guidecode == "23" || q.guidecode == "24" || q.guidecode == "25" || q.guidecode == "26" || q.guidecode == "27" || q.guidecode == "28" )
								{
									iconClassName="icon_highway";
								}		
								
								if (  q.guidecode == "29" || q.guidecode == "30" || q.guidecode == "31" || q.guidecode == "32" || q.guidecode == "33" || q.guidecode == "34" )
								{
									iconClassName="icon_urban";
								}									
																
								
								var html = '';
								html += '<li class="road_find_resultInfo" type="car" lat="'+q.y+'" lng="'+q.x+'" guidecode="'+q.guidecode+'" >';
								html += '	<p class="road_found_list_txt">'+roadText+'</p>';
								html += '	<p class="walk_icon_wrap">';
								html += '		<i class="'+iconClassName+'"></i>';
								html += '	</p>';
								html += '</li>';		
								$(".road_found_list").append(html);						
													
							}
							

							

							
							
						
							//pathArray.push(  new daum.maps.LatLng( roadGpsLat , roadGpsLng ) );

						});	
						
						
						
						var html2 = "";
						html2 += ' <dl class="bg_start_desti">';
						html2 += ' <dt>도착</dt>';
						html2 += ' <dd><p>'+$endPostion.displayName+'</p></dd>';
						html2 += ' </dl>';					
						
						//$(".transfer_method_cont1").append(html2);					
						
						jQuery.each( linked , function(z,q){
							var pointsObj = q.points;
							var pointsArr = pointsObj.split(" ");
							for ( var i = 0; i <= pointsArr.length - 1 ; i++)
							{
								var pointGpsArr = pointsArr[i].split(",");
								pathArray.push(  new daum.maps.LatLng( pointGpsArr[1] , pointGpsArr[0] ) );
							}
						});					

						$daumRoadLine = new daum.maps.Polyline({
							path: pathArray	, // 선을 구성하는 좌표배열 입니다
							strokeWeight	: 5, // 선의 두께 입니다
							strokeColor		: '#1a1aff', // 선의 색깔입니다
							strokeOpacity	: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
							strokeStyle		: 'solid' // 선의 스타일입니다
						});					
						
						$daumRoadLine.setMap($map.map);
						window.scrollTo(0, 0);
						daumtype = "car";
						
						$roadResult = true;
						
						if ( roadMapShow == true)
						{
							var myWin 		= $(window).width();
							
							if ( myWin < 641 )
							{
								$('.road_map_layer_cont').show();
								$('.road_map_layer_cont').css({
									'height':'38px'
								});
								$(".afterMobileSearchWrap").show();
								$(".inmap_short_info_wrap").show();
								$(".road_map_layer_inner").hide();
								
								$("#initStartTxt").val( $("#start").val() );
								$("#initEndTxt").val( $("#destination").val() );
							}
						}		
						
						$(".inmap_short_info_wrap").attr("sid", "-1");
						$(".iv_sub_target").each(function(){
							var pId = $(this).attr("pId");
							
							if ( pId == "car")
							{
								$('.btn_after_search li').stop().hide();
								$('.btn_after_search li').children('a').removeClass('on');
								$(this).stop().show();
								$(this).prependTo('.btn_after_search');
								$(this).children('a').addClass('on');
								afterSearch = true;								
							}
						});
					}
					
								
					
				}
				else
				{
					if ( data.section[0].resultCode == "NO_SEARCH" || data.sections[0].resultCode == "ROUTE_RESULT_NOT_FOUND"  )
					{
						$(".icon_exclam").html("검색결과가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();
						$(".road_found_list").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
												
						return;	
					}
					else if ( data.section[0].resultCode == "SAME_POINT"   )
					{
						$(".icon_exclam").html("출발지와 도착지가 동일합니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();
						$(".road_found_list").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
												
						return;	
					}
					else if ( data.section[0].resultCode == "START_LINK_NOT_FOUND"  )
					{
						$(".icon_exclam").html("출발지 주변 자동차 경로가 없습니다. ");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();
						$(".road_found_list").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
												
						return;	
					}
					else if ( data.section[0].resultCode == "END_LINK_NOT_FOUND"  )
					{
						$(".icon_exclam").html("도착지 주변 자동차 경로가 없습니다. ");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();
						$(".road_found_list").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
												
						return;	
					}
					else if ( data.section[0].resultCode == "TOO_MANY_SEARCH_LINK"  )
					{
						alert("너무많은 링크를 탐색함");
						return;	
					}
					else if ( data.section[0].resultCode == "NONE"  )
					{
						$(".icon_exclam").html("잘못된 요청입니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
												
						return;	
					}				
				}
					 
			 }					,
			 error			: function(data){ 
				 alert("예기치 않은 오류로 인해 길찾기 연동이 실패하였습니다.");
				 return;
			 }
		};
	
	  $.ajax(option);
	

	**/

}


function daumRoadFindTransport()
{
	var url = "/daumroad/getFindRoad.do";
	var param 	="";
	
	param += 'appId=publictraffic';
	param += '&startX='+$startPostion.gps_lng;
	param += '&startY='+$startPostion.gps_lat;
	param += '&endX='+$endPostion.gps_lng;
	param += '&endY='+$endPostion.gps_lat;
	param += '&inputCoordSystem=WGS84';
	param += '&outputCoordSystem=WGS84';
	param += '&startPointName='+$startPostion.displayName;
	param += '&endPointName='+$endPostion.displayName;	

	var prm = unserialize(param);

	var option = { 
			 type			: "post"													,
			 url			: url													,
			 data			: prm													,
			 scriptCharset	: "utf-8"												,
			 contentType	: "application/x-www-form-urlencoded; charset=UTF-8"	,
			 async			: true													,
			 dataType 		: "json"												,
			 success        : function(obj){
				var data = obj.road;
				data = JSON.parse(data);
				var y = data.publictraffic;
				
				if ( data.publictraffic_status == "OK" )
				{
					if (y.status=="OK")
					{
						
						/*if( $endPostion.favorites != null)
						{
							if($endPostion.favorites == "0")
							{
								$(".roadFav").attr("data-yn", "N");
								$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_off.png");
							}
							else
							{
								$(".roadFav").attr("data-yn", "Y");
								$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_on.png");
							}
							
						}
						else
						{
							$(".roadFav").attr("data-yn", "N");
							$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_off.png");							
						}*/ /* 20210308 제거 */

						$(".car_find_endName").html($endPostion.displayName);
						$(".carFindRoad").show();
						$(".carFindRoadErr").hide();
						$(".trafficViewInfo").html("전체:"+y.numberOfRoutes.total+" | 버스:"+y.numberOfRoutes.bus+" | 지하철:"+y.numberOfRoutes.subway+" | 버스+지하철:"+y.numberOfRoutes.busAndSubway);
						
						$trafficData = y.routes;
						
						
						$(".trafficSummery").html("");

						
						$trafficPoint = new Array();
						
						jQuery.each( y.routes , function(z,q){
							
							
							var html = "";
							
							var transferBool = "";
							
							if ( q.transfers == "0")
							{
								transferBool ="환승없음";
							}
							else
							{
								transferBool ="환승 " + q.transfers +"회";
							}
							
							
							var summeryInfo = "";
							var summeryObj	= q.summaries;
							var iCnt = 0;
							
							
							
							jQuery.each( summeryObj , function(x1, y1){
								

								
								if ( summeryObj.length - 1 > 0)
								{
									if ( x1 == summeryObj.length - 1)
									{
										
										var startImg = "";
										
										if ( y1.startLocation.type=="BUSSTOP")
										{
											startImg="/common/img/store/trans_icon/icon_bus.png";
										}
										else if(y1.startLocation.type=="SUBWAYSTATION")
										{
											
											if ( y1.startLocation.subwayId == "SES34") //분당
											{
												startImg="/common/img/store/trans_icon/icon_subway_bun.png"; 
											}
											else if ( y1.startLocation.subwayId == "SES22") //인천
											{
												startImg="/common/img/store/trans_icon/icon_subway_in.png";
											}
											else if ( y1.startLocation.subwayId == "SES26") //경의중앙
											{
												startImg="/common/img/store/trans_icon/icon_subway_jung.png";
											}
											else if ( y1.startLocation.subwayId == "SES33") //경춘선
											{
												startImg="/common/img/store/trans_icon/icon_subway_kyung.png";
											}
											else if ( y1.startLocation.subwayId == "SES27") //공항철도
											{
												startImg="/common/img/store/trans_icon/icon_subway_kong.png";
											}
											else if ( y1.startLocation.subwayId == "SES36") //의정부
											{
												startImg="/common/img/store/trans_icon/icon_subway_eu.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}	
											else if ( y1.startLocation.subwayId == "SES37") //에바러인
											{
												startImg="/common/img/store/trans_icon/icon_subway_e.png";
											}	
											else if ( y1.startLocation.subwayId == "SES38") //자기부상
											{
												startImg="/common/img/store/trans_icon/icon_subway_ja.png";
											}	
											else
											{
												var numSubway = y1.startLocation.subwayId.substring(3,4);
												startImg="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
												
											}
																						
											
											
											
											
										}
										var startInformation = "";
										if (  y1.vehicles.length > 0)
										{
											startInformation='<br /><span class="public_trans_coord">';
											jQuery.each( y1.vehicles , function(a, b){
												var aName = "";
												
												if ( b.subType == "RED")
												{
													aName = '<font style="color:red">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "BLUE")
												{
													aName = '<font style="color:BLUE">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "GREEN")
												{
													aName = '<font style="color:GREEN">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "MAUL")
												{
													aName = '<font style="color:#e5e500">'+b.name+'</font>&nbsp;';
												}
												else
												{
													aName = "&nbsp;";
												}
												
												startInformation += aName;
											});
											startInformation += '</span><br/>';
										}
										
										
										summeryInfo += '			<div class="public_trans_each">';
										summeryInfo += '				<div class="public_trans_exl">';
										summeryInfo += '					<i class="icon_transfer"><img alt="" src="'+startImg+'"></i>';
										summeryInfo += '					<p class="line_grey"></p>';
										summeryInfo += '				</div>';
										summeryInfo += '			<div class="public_trans_exr">'+y1.startLocation.name+startInformation+'</div>';
										summeryInfo += '			</div>';
										
										
										var endImg = "";
					
										if ( y1.endLocation.type=="BUSSTOP")
										{
											startImg="/common/img/store/trans_icon/icon_desti.png";
										}
										else if(y1.endLocation.type=="SUBWAYSTATION")
										{
											if ( y1.startLocation.subwayId == "SES34") //분당
											{
												startImg="/common/img/store/trans_icon/icon_subway_bun.png"; 
											}
											else if ( y1.startLocation.subwayId == "SES22") //인천
											{
												startImg="/common/img/store/trans_icon/icon_subway_in.png";
											}
											else if ( y1.startLocation.subwayId == "SES26") //경의중앙
											{
												startImg="/common/img/store/trans_icon/icon_subway_jung.png";
											}
											else if ( y1.startLocation.subwayId == "SES33") //경춘선
											{
												startImg="/common/img/store/trans_icon/icon_subway_kyung.png";
											}
											else if ( y1.startLocation.subwayId == "SES27") //공항철도
											{
												startImg="/common/img/store/trans_icon/icon_subway_kong.png";
											}
											else if ( y1.startLocation.subwayId == "SES36") //의정부
											{
												startImg="/common/img/store/trans_icon/icon_subway_eu.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}	
											else if ( y1.startLocation.subwayId == "SES37") //에바러인
											{
												startImg="/common/img/store/trans_icon/icon_subway_e.png";
											}	
											else if ( y1.startLocation.subwayId == "SES38") //자기부상
											{
												startImg="/common/img/store/trans_icon/icon_subway_ja.png";
											}	
											else
											{
												var numSubway = y1.startLocation.subwayId.substring(3,4);
												startImg="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
												
											}
										}
										
										summeryInfo += '			<div class="public_trans_each">';
										summeryInfo += '			<div class="public_trans_exl">';
										summeryInfo += '				<i class="icon_transfer"><img alt="" src="'+startImg+'"></i>';
										summeryInfo += '				<p class="line_grey1"></p>';
										summeryInfo += '			</div>';
										summeryInfo += '			<div class="public_trans_exr">'+y1.endLocation.name+'<br /></div></div>';											
										
									}
									else
									{
										var startImg = "";
									
										if ( y1.startLocation.type=="BUSSTOP")
										{
											startImg="/common/img/store/trans_icon/icon_bus.png";
										}
										else if(y1.startLocation.type=="SUBWAYSTATION")
										{
											
											if ( y1.startLocation.subwayId == "SES34") //분당
											{
												startImg="/common/img/store/trans_icon/icon_subway_bun.png"; 
											}
											else if ( y1.startLocation.subwayId == "SES22") //인천
											{
												startImg="/common/img/store/trans_icon/icon_subway_in.png";
											}
											else if ( y1.startLocation.subwayId == "SES26") //경의중앙
											{
												startImg="/common/img/store/trans_icon/icon_subway_jung.png";
											}
											else if ( y1.startLocation.subwayId == "SES33") //경춘선
											{
												startImg="/common/img/store/trans_icon/icon_subway_kyung.png";
											}
											else if ( y1.startLocation.subwayId == "SES27") //공항철도
											{
												startImg="/common/img/store/trans_icon/icon_subway_kong.png";
											}
											else if ( y1.startLocation.subwayId == "SES36") //의정부
											{
												startImg="/common/img/store/trans_icon/icon_subway_eu.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}	
											else if ( y1.startLocation.subwayId == "SES37") //에바러인
											{
												startImg="/common/img/store/trans_icon/icon_subway_e.png";
											}	
											else if ( y1.startLocation.subwayId == "SES38") //자기부상
											{
												startImg="/common/img/store/trans_icon/icon_subway_ja.png";
											}	
											else
											{
												var numSubway = y1.startLocation.subwayId.substring(3,4);
												startImg="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
												
											}
										}
										var startInformation = "";
										if (  y1.vehicles.length > 0)
										{
											startInformation='<br /><span class="public_trans_coord">';
											jQuery.each( y1.vehicles , function(a, b){
												var aName = "";
												
												if ( b.subType == "RED")
												{
													aName = '<font style="color:red">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "BLUE")
												{
													aName = '<font style="color:BLUE">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "GREEN")
												{
													aName = '<font style="color:GREEN">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "MAUL")
												{
													aName = '<font style="color:#e5e500">'+b.name+'</font>&nbsp;';
												}
												else
												{
													aName = "&nbsp;";
												}
												
												startInformation += aName;
											});
											startInformation += '</span><br/>';
										}
										
										
										summeryInfo += '			<div class="public_trans_each">';
										summeryInfo += '			<div class="public_trans_exl">';
										summeryInfo += '				<i class="icon_transfer"><img alt="" src="'+startImg+'"></i>';
										summeryInfo += '				<p class="line_grey"></p>';
										summeryInfo += '			</div>';
										summeryInfo += '			<div class="public_trans_exr">'+y1.startLocation.name+startInformation+'</div></div>';	
										
									}
								}
								else
								{
									var startImg = "";
								
									if ( y1.startLocation.type=="BUSSTOP")
									{
										startImg="/common/img/store/trans_icon/icon_bus.png";
									}
									else if(y1.startLocation.type=="SUBWAYSTATION")
									{
										if ( y1.startLocation.subwayId == "SES34") //분당
										{
											startImg="/common/img/store/trans_icon/icon_subway_bun.png"; 
										}
										else if ( y1.startLocation.subwayId == "SES22") //인천
										{
											startImg="/common/img/store/trans_icon/icon_subway_in.png";
										}
										else if ( y1.startLocation.subwayId == "SES26") //경의중앙
										{
											startImg="/common/img/store/trans_icon/icon_subway_jung.png";
										}
										else if ( y1.startLocation.subwayId == "SES33") //경춘선
										{
											startImg="/common/img/store/trans_icon/icon_subway_kyung.png";
										}
										else if ( y1.startLocation.subwayId == "SES27") //공항철도
										{
											startImg="/common/img/store/trans_icon/icon_subway_kong.png";
										}
										else if ( y1.startLocation.subwayId == "SES36") //의정부
										{
											startImg="/common/img/store/trans_icon/icon_subway_eu.png";
										}
										else if ( y1.startLocation.subwayId == "SES35") //수인역
										{
											startImg="/common/img/store/trans_icon/icon_subway_su.png";
										}
										else if ( y1.startLocation.subwayId == "SES35") //수인역
										{
											startImg="/common/img/store/trans_icon/icon_subway_su.png";
										}	
										else if ( y1.startLocation.subwayId == "SES37") //에바러인
										{
											startImg="/common/img/store/trans_icon/icon_subway_e.png";
										}	
										else if ( y1.startLocation.subwayId == "SES38") //자기부상
										{
											startImg="/common/img/store/trans_icon/icon_subway_ja.png";
										}	
										else
										{
											var numSubway = y1.startLocation.subwayId.substring(3,4);
											startImg="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
											
										}
									}
									
									var startInformation = "";
									
									
									
									if (  y1.vehicles.length > 0)
									{
										startInformation='<br /><span class="public_trans_coord">';
										jQuery.each( y1.vehicles , function(a, b){
											var aName = "";
											
											if ( b.subType == "RED")
											{
												aName = '<font style="color:red">'+b.name+'</font>&nbsp;';
											}
											else if(b.subType == "BLUE")
											{
												aName = '<font style="color:BLUE">'+b.name+'</font>&nbsp;';
											}
											else if(b.subType == "GREEN")
											{
												aName = '<font style="color:GREEN">'+b.name+'</font>&nbsp;';
											}
											else if(b.subType == "MAUL")
											{
												aName = '<font style="color:#e5e500">'+b.name+'</font>&nbsp;';
											}
											else
											{
												aName = "&nbsp;";
											}
											
											startInformation += aName;
										});
										startInformation += '</span><br/>';
									}
									
							
									summeryInfo += '			<div class="public_trans_each">';
									summeryInfo += '			<div class="public_trans_exl">';
									summeryInfo += '				<i class="icon_transfer"><img alt="" src="'+startImg+'"></i>';
									summeryInfo += '				<p class="line_grey"></p>';
									summeryInfo += '			</div>';
									summeryInfo += '			<div class="public_trans_exr">'+y1.startLocation.name+startInformation+'</div></div>';		
									
									
									
									var endImg = "";
									var endInformation ="<br/><br/><br/>";
									
									if ( y1.endLocation.type=="BUSSTOP")
									{
										startImg="/common/img/store/trans_icon/icon_desti.png";
									}
									else if(y1.endLocation.type=="SUBWAYSTATION")
									{
										if ( y1.startLocation.subwayId == "SES34") //분당
										{
											startImg="/common/img/store/trans_icon/icon_subway_bun.png"; 
										}
										else if ( y1.startLocation.subwayId == "SES22") //인천
										{
											startImg="/common/img/store/trans_icon/icon_subway_in.png";
										}
										else if ( y1.startLocation.subwayId == "SES26") //경의중앙
										{
											startImg="/common/img/store/trans_icon/icon_subway_jung.png";
										}
										else if ( y1.startLocation.subwayId == "SES33") //경춘선
										{
											startImg="/common/img/store/trans_icon/icon_subway_kyung.png";
										}
										else if ( y1.startLocation.subwayId == "SES27") //공항철도
										{
											startImg="/common/img/store/trans_icon/icon_subway_kong.png";
										}
										else if ( y1.startLocation.subwayId == "SES36") //의정부
										{
											startImg="/common/img/store/trans_icon/icon_subway_eu.png";
										}
										else if ( y1.startLocation.subwayId == "SES35") //수인역
										{
											startImg="/common/img/store/trans_icon/icon_subway_su.png";
										}
										else if ( y1.startLocation.subwayId == "SES35") //수인역
										{
											startImg="/common/img/store/trans_icon/icon_subway_su.png";
										}	
										else if ( y1.startLocation.subwayId == "SES37") //에바러인
										{
											startImg="/common/img/store/trans_icon/icon_subway_e.png";
										}	
										else if ( y1.startLocation.subwayId == "SES38") //자기부상
										{
											startImg="/common/img/store/trans_icon/icon_subway_ja.png";
										}	
										else
										{
											var numSubway = y1.startLocation.subwayId.substring(3,4);
											startImg="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
											
										}
									}
									

									summeryInfo += '			<div class="public_trans_each">';
									summeryInfo += '			<div class="public_trans_exl">';
									summeryInfo += '				<i class="icon_transfer"><img alt="" src="'+startImg+'"></i>';
									summeryInfo += '				<p class="line_grey1"></p>';
									summeryInfo += '			</div>';
									summeryInfo += '			<div class="public_trans_exr">'+y1.endLocation.name+'</div></div>';											
									
								}
								iCnt++;
							});
							
							
							
							html += '<div class="public_trans_info ivTrafficWrapBox">';
							html += '	<div class="public_trans_info_l liTrafficClick" num="'+z+'">';
							html += '		<p class="public_trans_time"><strong>'+q.time.text+'</strong>(도보 '+q.walkingTime.text+', '+transferBool+')</p>';
							html += '		<p class="desti_top_dist">요금: '+q.fare.text+'| 총  '+q.distance.text+'</p>';
							html += '		<div class="public_trans_ex trafficSummeryWrap" style="display:block">'+summeryInfo+'</div>';
							html += '	</div>';
							html += '	<div class="public_trans_info_r">';
							html += '		<p class="btn_trans_info_map"><a href="javascript:void(0);" class="getTrafficMobileMapBtn" num="'+z+'" time="'+q.time.text+'" walk="'+q.walkingTime.text+'" transfer="'+transferBool+'" price="'+q.fare.text+'" km="'+q.distance.text+'"  >지도</a></p>';							
							html += '		<p class="trans_info_down"><a href="javascript:void(0);" class="getTrafficViewer" num="'+z+'"></a></p>';
							html += '	</div>';
							html += '</div>';

							var isViewHtml = daumTrafficView(q, html, z);
							html += isViewHtml;
							$(".trafficSummery").append(html);
							
							daumtype = "transport";
						});
						
						
						$(".getTrafficMobileMapBtn").unbind("click").on("click", function(){
							var num = $(this).attr("num");
							var index = $(".getTrafficMobileMapBtn").index(this);
							var $target = $(".findTrafficView").eq(index);
							$(".findTrafficView").each(function(ix){
								if ( ix == index)
								{
									 if( $(this).css("display") == "none")
									 {
										 $(".trafficSummeryWrap").eq(ix).hide();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_down').addClass('trans_info_up');
										 $(this).show();
									 } else 
									 {
										 $(".trafficSummeryWrap").eq(ix).show();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
										 $(this).hide();
									 }
								}
								else
								{
									$(".trafficSummeryWrap").eq(ix).show();
									$(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
									$(this).hide();
								}
							});
							
							daumTrafficPoliyLine(num);
							
							
							$(".inmap_short_info_wrap").attr("sid",  index );
							
							
							var myWinWidth = $(window).width();
							
							if (myWinWidth < 641) 
							{
								$(".daumFindParentToggle").addClass("on");
								$(".road_map_layer_cont").hide();
								
								$('.find_store_wrap').css({
									'height':'118px'
								});
								roadMapShow = true;				
							}	
							var iTime = $(this).attr("time");
							var iWalk = $(this).attr("walk");
							var iTransfer = $(this).attr("transfer");
							var iPrice = $(this).attr("price");
							var iKm = $(this).attr("km");
							//time="'+q.time.text+'" walk="'+q.walkingTime.text+'" transfer="'+transferBool+'" price="'+q.fare.text+'" km="'+q.distance.text+'" 
							//<p class="desti_top_dist">요금: <span class="iv_t_price"></span>| 총 <span class="iv_t_km"></span></p>
							
							window.scrollTo(0, 0);
							if ( roadMapShow == true)
							{
								var myWin 		= $(window).width();
								
								if ( myWin < 641 )
								{
									$('.road_map_layer_cont').show();
									$('.road_map_layer_cont').css({
										'height':'38px'
									});
									$(".afterMobileSearchWrap").show();
									$(".inmap_short_info_wrap").show();
									$(".road_map_layer_inner").hide();
									
									$("#initStartTxt").val( $("#start").val() );
									$("#initEndTxt").val( $("#destination").val() );
									
									$(".iTrafficSubView1").show();
									$(".iTrafficSubView2").hide();
									
									$(".iv_t_time").html(iTime);
									$(".iv_t_walk").html(iWalk);
									$(".iv_t_transfer").html(iTransfer);
									$(".iv_t_price").html(iPrice);
									$(".iv_t_km").html(iKm);
									
									$roadResult = true; 
									
									
									
									$(".iv_sub_target").each(function(){
										var pId = $(this).attr("pId");
										
										if ( pId == "trasfer")
										{
											$('.btn_after_search li').stop().hide();
											$('.btn_after_search li').children('a').removeClass('on');
											$(this).stop().show();
											$(this).prependTo('.btn_after_search');
											$(this).children('a').addClass('on');
											afterSearch = true;								
										}
									});										
																		
								}
							}							
						});
						
						
						
						$(".getTrafficViewer").unbind("click").on("click", function(){
							var num = $(this).attr("num");
							var index = $(".getTrafficViewer").index(this);
							var $target = $(".findTrafficView").eq(index);
							$(".findTrafficView").each(function(ix){
								if ( ix == index)
								{
									 if( $(this).css("display") == "none")
									 {
										 $(".trafficSummeryWrap").eq(ix).hide();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_down').addClass('trans_info_up');
										 $(this).show();
									 } else 
									 {
										 $(".trafficSummeryWrap").eq(ix).show();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
										 $(this).hide();
									 }
								}
								else
								{
									$(".trafficSummeryWrap").eq(ix).show();
									$(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
									$(this).hide();
								}
							});
							
							daumTrafficPoliyLine(num);
						});
						
						
						
						$(".liTrafficClick").unbind("click").on("click", function(){
							var num = $(this).attr("num");
							var index = $(".liTrafficClick").index(this);
							var $target = $(".findTrafficView").eq(index);
							$(".findTrafficView").each(function(ix){
								if ( ix == index)
								{
									 if( $(this).css("display") == "none")
									 {
										 $(".trafficSummeryWrap").eq(ix).hide();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_down').addClass('trans_info_up');
										 $(this).show();
									 } else 
									 {
										 $(".trafficSummeryWrap").eq(ix).show();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
										 $(this).hide();
									 }
								}
								else
								{
									$(".trafficSummeryWrap").eq(ix).show();
									$(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
									$(this).hide();
								}
							});
							
							daumTrafficPoliyLine(num);
						});
						

						
						var publicTransExr = $('.public_trans_exr').height();
						$('.public_trans_exl').css({
							'height':publicTransExr
						});

						$('.trans_icon_wrap').each(function(){
							var thisHeight = $(this).height();
							var thisHeightNext = $(this).parent().next().children('.trans_icon_wrap').height();

							$(this).children('.trans_line').each(function(){
								$(this).css({
									'height' : (thisHeight / 2) + (thisHeightNext /2)
								});
							});
						});		

						
						
					}
					else if(y.status=="ZERO_RESULTS")
					{
						
						$(".icon_exclam").html('<strong>일반 시내 교통수단</strong> (지하철/버스/광역버스 등)으로 이동하는 경우에 한하여 대중교통 찾기 결과를 제공합니다.');
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();	
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						
						return;
					}
					else if(y.status=="UNKNOWN_ERROR")
					{
						$(".icon_exclam").html("잘못된 요청입니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();	
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if(y.status=="INVALID_REQUEST")
					{
						$(".icon_exclam").html("잘못된 요청입니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();	
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if(y.status=="STARTPOINT_NULL")
					{
						$(".icon_exclam").html("출발경로가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if(y.status=="ENDPOINT_NULL")
					{
						$(".icon_exclam").html("도착경로를 지정해 주세요.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												

						return;
					}					
					else if(y.status=="TOO_NEAR_POINTS")
					{

						$(".icon_exclam").html("출발지와 도착지가 너무 가깝습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if(y.status=="EQUAL_POINTS")
					{
						$(".icon_exclam").html("출발지와 도착지가 동일합니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if(y.status=="STARTNODES_NUL")
					{
						$(".icon_exclam").html("출발경로가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}					
					else if(y.status=="ENDNODES_NULL")
					{
						$(".icon_exclam").html("도착경로를 지정해 주세요.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();	
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}					
					else if(y.status=="NODES_NULL")
					{
						$(".icon_exclam").html("잘못된 요청입니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();	
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}					
										
					
					
					
				}
				else
				{
					$(".icon_exclam").html('<strong>일반 시내 교통수단</strong> (지하철/버스/광역버스 등)으로 이동하는 경우에 한하여 대중교통 찾기 결과를 제공합니다.');
					$(".carFindRoadErr").show();
					$(".carFindRoad").hide();
					$(".road_found_list").html("");
					
					$(".trafficSummery").html("");
					
					
					if( $daumRoadLine != null )
					{
						$daumRoadLine.setMap(null);
					}
										
					return;
				}
			 }
	};

	$.ajax(option);

	/**
	var option = { 
			 type			: "get"													,
			 url			: url+"?"+param											,
			 data			: ""													,
			 scriptCharset	: "utf-8"												,
			 contentType	: "application/x-www-form-urlencoded; charset=UTF-8"	,
			 async			: true													,
			 dataType 		: "jsonp"												,
			 jsonp 			: "callback"											,			 
			 success        : function(data){
				 
				var y = data.publictraffic;
				
				if ( data.publictraffic_status == "OK" )
				{
					if (y.status=="OK")
					{
						$(".roadFav").attr("data-store", $endPostion.store_code);
						$(".roadFav").attr("data-name", $endPostion.displayName);
						
						if( $endPostion.favorites != null)
						{
							if($endPostion.favorites == "0")
							{
								$(".roadFav").attr("data-yn", "N");
								$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_off.png");
							}
							else
							{
								$(".roadFav").attr("data-yn", "Y");
								$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_on.png");
							}
							
						}
						else
						{
							$(".roadFav").attr("data-yn", "N");
							$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_off.png");							
						}

						$(".car_find_endName").html($endPostion.displayName);
						$(".carFindRoad").show();
						$(".carFindRoadErr").hide();
						$(".trafficViewInfo").html("전체:"+y.numberOfRoutes.total+" | 버스:"+y.numberOfRoutes.bus+" | 지하철:"+y.numberOfRoutes.subway+" | 버스+지하철:"+y.numberOfRoutes.busAndSubway);
						
						$trafficData = y.routes;
						
						
						$(".trafficSummery").html("");

						
						$trafficPoint = new Array();
						
						jQuery.each( y.routes , function(z,q){
							
							
							var html = "";
							
							var transferBool = "";
							
							if ( q.transfers == "0")
							{
								transferBool ="환승없음";
							}
							else
							{
								transferBool ="환승 " + q.transfers +"회";
							}
							
							
							var summeryInfo = "";
							var summeryObj	= q.summaries;
							var iCnt = 0;
							
							
							
							jQuery.each( summeryObj , function(x1, y1){
								

								
								if ( summeryObj.length - 1 > 0)
								{
									if ( x1 == summeryObj.length - 1)
									{
										
										var startImg = "";
										
										if ( y1.startLocation.type=="BUSSTOP")
										{
											startImg="/common/img/store/trans_icon/icon_bus.png";
										}
										else if(y1.startLocation.type=="SUBWAYSTATION")
										{
											
											if ( y1.startLocation.subwayId == "SES34") //분당
											{
												startImg="/common/img/store/trans_icon/icon_subway_bun.png"; 
											}
											else if ( y1.startLocation.subwayId == "SES22") //인천
											{
												startImg="/common/img/store/trans_icon/icon_subway_in.png";
											}
											else if ( y1.startLocation.subwayId == "SES26") //경의중앙
											{
												startImg="/common/img/store/trans_icon/icon_subway_jung.png";
											}
											else if ( y1.startLocation.subwayId == "SES33") //경춘선
											{
												startImg="/common/img/store/trans_icon/icon_subway_kyung.png";
											}
											else if ( y1.startLocation.subwayId == "SES27") //공항철도
											{
												startImg="/common/img/store/trans_icon/icon_subway_kong.png";
											}
											else if ( y1.startLocation.subwayId == "SES36") //의정부
											{
												startImg="/common/img/store/trans_icon/icon_subway_eu.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}	
											else if ( y1.startLocation.subwayId == "SES37") //에바러인
											{
												startImg="/common/img/store/trans_icon/icon_subway_e.png";
											}	
											else if ( y1.startLocation.subwayId == "SES38") //자기부상
											{
												startImg="/common/img/store/trans_icon/icon_subway_ja.png";
											}	
											else
											{
												var numSubway = y1.startLocation.subwayId.substring(3,4);
												startImg="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
												
											}
																						
											
											
											
											
										}
										var startInformation = "";
										if (  y1.vehicles.length > 0)
										{
											startInformation='<br /><span class="public_trans_coord">';
											jQuery.each( y1.vehicles , function(a, b){
												var aName = "";
												
												if ( b.subType == "RED")
												{
													aName = '<font style="color:red">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "BLUE")
												{
													aName = '<font style="color:BLUE">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "GREEN")
												{
													aName = '<font style="color:GREEN">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "MAUL")
												{
													aName = '<font style="color:#e5e500">'+b.name+'</font>&nbsp;';
												}
												else
												{
													aName = "&nbsp;";
												}
												
												startInformation += aName;
											});
											startInformation += '</span><br/>';
										}
										
										
										summeryInfo += '			<div class="public_trans_each">';
										summeryInfo += '				<div class="public_trans_exl">';
										summeryInfo += '					<i class="icon_transfer"><img alt="" src="'+startImg+'"></i>';
										summeryInfo += '					<p class="line_grey"></p>';
										summeryInfo += '				</div>';
										summeryInfo += '			<div class="public_trans_exr">'+y1.startLocation.name+startInformation+'</div>';
										summeryInfo += '			</div>';
										
										
										var endImg = "";
					
										if ( y1.endLocation.type=="BUSSTOP")
										{
											startImg="/common/img/store/trans_icon/icon_desti.png";
										}
										else if(y1.endLocation.type=="SUBWAYSTATION")
										{
											if ( y1.startLocation.subwayId == "SES34") //분당
											{
												startImg="/common/img/store/trans_icon/icon_subway_bun.png"; 
											}
											else if ( y1.startLocation.subwayId == "SES22") //인천
											{
												startImg="/common/img/store/trans_icon/icon_subway_in.png";
											}
											else if ( y1.startLocation.subwayId == "SES26") //경의중앙
											{
												startImg="/common/img/store/trans_icon/icon_subway_jung.png";
											}
											else if ( y1.startLocation.subwayId == "SES33") //경춘선
											{
												startImg="/common/img/store/trans_icon/icon_subway_kyung.png";
											}
											else if ( y1.startLocation.subwayId == "SES27") //공항철도
											{
												startImg="/common/img/store/trans_icon/icon_subway_kong.png";
											}
											else if ( y1.startLocation.subwayId == "SES36") //의정부
											{
												startImg="/common/img/store/trans_icon/icon_subway_eu.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}	
											else if ( y1.startLocation.subwayId == "SES37") //에바러인
											{
												startImg="/common/img/store/trans_icon/icon_subway_e.png";
											}	
											else if ( y1.startLocation.subwayId == "SES38") //자기부상
											{
												startImg="/common/img/store/trans_icon/icon_subway_ja.png";
											}	
											else
											{
												var numSubway = y1.startLocation.subwayId.substring(3,4);
												startImg="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
												
											}
										}
										
										summeryInfo += '			<div class="public_trans_each">';
										summeryInfo += '			<div class="public_trans_exl">';
										summeryInfo += '				<i class="icon_transfer"><img alt="" src="'+startImg+'"></i>';
										summeryInfo += '				<p class="line_grey1"></p>';
										summeryInfo += '			</div>';
										summeryInfo += '			<div class="public_trans_exr">'+y1.endLocation.name+'<br /></div></div>';											
										
									}
									else
									{
										var startImg = "";
									
										if ( y1.startLocation.type=="BUSSTOP")
										{
											startImg="/common/img/store/trans_icon/icon_bus.png";
										}
										else if(y1.startLocation.type=="SUBWAYSTATION")
										{
											
											if ( y1.startLocation.subwayId == "SES34") //분당
											{
												startImg="/common/img/store/trans_icon/icon_subway_bun.png"; 
											}
											else if ( y1.startLocation.subwayId == "SES22") //인천
											{
												startImg="/common/img/store/trans_icon/icon_subway_in.png";
											}
											else if ( y1.startLocation.subwayId == "SES26") //경의중앙
											{
												startImg="/common/img/store/trans_icon/icon_subway_jung.png";
											}
											else if ( y1.startLocation.subwayId == "SES33") //경춘선
											{
												startImg="/common/img/store/trans_icon/icon_subway_kyung.png";
											}
											else if ( y1.startLocation.subwayId == "SES27") //공항철도
											{
												startImg="/common/img/store/trans_icon/icon_subway_kong.png";
											}
											else if ( y1.startLocation.subwayId == "SES36") //의정부
											{
												startImg="/common/img/store/trans_icon/icon_subway_eu.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}
											else if ( y1.startLocation.subwayId == "SES35") //수인역
											{
												startImg="/common/img/store/trans_icon/icon_subway_su.png";
											}	
											else if ( y1.startLocation.subwayId == "SES37") //에바러인
											{
												startImg="/common/img/store/trans_icon/icon_subway_e.png";
											}	
											else if ( y1.startLocation.subwayId == "SES38") //자기부상
											{
												startImg="/common/img/store/trans_icon/icon_subway_ja.png";
											}	
											else
											{
												var numSubway = y1.startLocation.subwayId.substring(3,4);
												startImg="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
												
											}
										}
										var startInformation = "";
										if (  y1.vehicles.length > 0)
										{
											startInformation='<br /><span class="public_trans_coord">';
											jQuery.each( y1.vehicles , function(a, b){
												var aName = "";
												
												if ( b.subType == "RED")
												{
													aName = '<font style="color:red">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "BLUE")
												{
													aName = '<font style="color:BLUE">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "GREEN")
												{
													aName = '<font style="color:GREEN">'+b.name+'</font>&nbsp;';
												}
												else if(b.subType == "MAUL")
												{
													aName = '<font style="color:#e5e500">'+b.name+'</font>&nbsp;';
												}
												else
												{
													aName = "&nbsp;";
												}
												
												startInformation += aName;
											});
											startInformation += '</span><br/>';
										}
										
										
										summeryInfo += '			<div class="public_trans_each">';
										summeryInfo += '			<div class="public_trans_exl">';
										summeryInfo += '				<i class="icon_transfer"><img alt="" src="'+startImg+'"></i>';
										summeryInfo += '				<p class="line_grey"></p>';
										summeryInfo += '			</div>';
										summeryInfo += '			<div class="public_trans_exr">'+y1.startLocation.name+startInformation+'</div></div>';	
										
									}
								}
								else
								{
									var startImg = "";
								
									if ( y1.startLocation.type=="BUSSTOP")
									{
										startImg="/common/img/store/trans_icon/icon_bus.png";
									}
									else if(y1.startLocation.type=="SUBWAYSTATION")
									{
										if ( y1.startLocation.subwayId == "SES34") //분당
										{
											startImg="/common/img/store/trans_icon/icon_subway_bun.png"; 
										}
										else if ( y1.startLocation.subwayId == "SES22") //인천
										{
											startImg="/common/img/store/trans_icon/icon_subway_in.png";
										}
										else if ( y1.startLocation.subwayId == "SES26") //경의중앙
										{
											startImg="/common/img/store/trans_icon/icon_subway_jung.png";
										}
										else if ( y1.startLocation.subwayId == "SES33") //경춘선
										{
											startImg="/common/img/store/trans_icon/icon_subway_kyung.png";
										}
										else if ( y1.startLocation.subwayId == "SES27") //공항철도
										{
											startImg="/common/img/store/trans_icon/icon_subway_kong.png";
										}
										else if ( y1.startLocation.subwayId == "SES36") //의정부
										{
											startImg="/common/img/store/trans_icon/icon_subway_eu.png";
										}
										else if ( y1.startLocation.subwayId == "SES35") //수인역
										{
											startImg="/common/img/store/trans_icon/icon_subway_su.png";
										}
										else if ( y1.startLocation.subwayId == "SES35") //수인역
										{
											startImg="/common/img/store/trans_icon/icon_subway_su.png";
										}	
										else if ( y1.startLocation.subwayId == "SES37") //에바러인
										{
											startImg="/common/img/store/trans_icon/icon_subway_e.png";
										}	
										else if ( y1.startLocation.subwayId == "SES38") //자기부상
										{
											startImg="/common/img/store/trans_icon/icon_subway_ja.png";
										}	
										else
										{
											var numSubway = y1.startLocation.subwayId.substring(3,4);
											startImg="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
											
										}
									}
									
									var startInformation = "";
									
									
									
									if (  y1.vehicles.length > 0)
									{
										startInformation='<br /><span class="public_trans_coord">';
										jQuery.each( y1.vehicles , function(a, b){
											var aName = "";
											
											if ( b.subType == "RED")
											{
												aName = '<font style="color:red">'+b.name+'</font>&nbsp;';
											}
											else if(b.subType == "BLUE")
											{
												aName = '<font style="color:BLUE">'+b.name+'</font>&nbsp;';
											}
											else if(b.subType == "GREEN")
											{
												aName = '<font style="color:GREEN">'+b.name+'</font>&nbsp;';
											}
											else if(b.subType == "MAUL")
											{
												aName = '<font style="color:#e5e500">'+b.name+'</font>&nbsp;';
											}
											else
											{
												aName = "&nbsp;";
											}
											
											startInformation += aName;
										});
										startInformation += '</span><br/>';
									}
									
							
									summeryInfo += '			<div class="public_trans_each">';
									summeryInfo += '			<div class="public_trans_exl">';
									summeryInfo += '				<i class="icon_transfer"><img alt="" src="'+startImg+'"></i>';
									summeryInfo += '				<p class="line_grey"></p>';
									summeryInfo += '			</div>';
									summeryInfo += '			<div class="public_trans_exr">'+y1.startLocation.name+startInformation+'</div></div>';		
									
									
									
									var endImg = "";
									var endInformation ="<br/><br/><br/>";
									
									if ( y1.endLocation.type=="BUSSTOP")
									{
										startImg="/common/img/store/trans_icon/icon_desti.png";
									}
									else if(y1.endLocation.type=="SUBWAYSTATION")
									{
										if ( y1.startLocation.subwayId == "SES34") //분당
										{
											startImg="/common/img/store/trans_icon/icon_subway_bun.png"; 
										}
										else if ( y1.startLocation.subwayId == "SES22") //인천
										{
											startImg="/common/img/store/trans_icon/icon_subway_in.png";
										}
										else if ( y1.startLocation.subwayId == "SES26") //경의중앙
										{
											startImg="/common/img/store/trans_icon/icon_subway_jung.png";
										}
										else if ( y1.startLocation.subwayId == "SES33") //경춘선
										{
											startImg="/common/img/store/trans_icon/icon_subway_kyung.png";
										}
										else if ( y1.startLocation.subwayId == "SES27") //공항철도
										{
											startImg="/common/img/store/trans_icon/icon_subway_kong.png";
										}
										else if ( y1.startLocation.subwayId == "SES36") //의정부
										{
											startImg="/common/img/store/trans_icon/icon_subway_eu.png";
										}
										else if ( y1.startLocation.subwayId == "SES35") //수인역
										{
											startImg="/common/img/store/trans_icon/icon_subway_su.png";
										}
										else if ( y1.startLocation.subwayId == "SES35") //수인역
										{
											startImg="/common/img/store/trans_icon/icon_subway_su.png";
										}	
										else if ( y1.startLocation.subwayId == "SES37") //에바러인
										{
											startImg="/common/img/store/trans_icon/icon_subway_e.png";
										}	
										else if ( y1.startLocation.subwayId == "SES38") //자기부상
										{
											startImg="/common/img/store/trans_icon/icon_subway_ja.png";
										}	
										else
										{
											var numSubway = y1.startLocation.subwayId.substring(3,4);
											startImg="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
											
										}
									}
									

									summeryInfo += '			<div class="public_trans_each">';
									summeryInfo += '			<div class="public_trans_exl">';
									summeryInfo += '				<i class="icon_transfer"><img alt="" src="'+startImg+'"></i>';
									summeryInfo += '				<p class="line_grey1"></p>';
									summeryInfo += '			</div>';
									summeryInfo += '			<div class="public_trans_exr">'+y1.endLocation.name+'</div></div>';											
									
								}
								iCnt++;
							});
							
							
							
							html += '<div class="public_trans_info ivTrafficWrapBox">';
							html += '	<div class="public_trans_info_l liTrafficClick" num="'+z+'">';
							html += '		<p class="public_trans_time"><strong>'+q.time.text+'</strong>(도보 '+q.walkingTime.text+', '+transferBool+')</p>';
							html += '		<p class="desti_top_dist">요금: '+q.fare.text+'| 총  '+q.distance.text+'</p>';
							html += '		<div class="public_trans_ex trafficSummeryWrap" style="display:block">'+summeryInfo+'</div>';
							html += '	</div>';
							html += '	<div class="public_trans_info_r">';
							html += '		<p class="btn_trans_info_map"><a href="javascript:void(0);" class="getTrafficMobileMapBtn" num="'+z+'" time="'+q.time.text+'" walk="'+q.walkingTime.text+'" transfer="'+transferBool+'" price="'+q.fare.text+'" km="'+q.distance.text+'"  >지도</a></p>';							
							html += '		<p class="trans_info_down"><a href="javascript:void(0);" class="getTrafficViewer" num="'+z+'"></a></p>';
							html += '	</div>';
							html += '</div>';

							var isViewHtml = daumTrafficView(q, html, z);
							html += isViewHtml;
							$(".trafficSummery").append(html);
							
							daumtype = "transport";
						});
						
						
						$(".getTrafficMobileMapBtn").unbind("click").on("click", function(){
							var num = $(this).attr("num");
							var index = $(".getTrafficMobileMapBtn").index(this);
							var $target = $(".findTrafficView").eq(index);
							$(".findTrafficView").each(function(ix){
								if ( ix == index)
								{
									 if( $(this).css("display") == "none")
									 {
										 $(".trafficSummeryWrap").eq(ix).hide();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_down').addClass('trans_info_up');
										 $(this).show();
									 } else 
									 {
										 $(".trafficSummeryWrap").eq(ix).show();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
										 $(this).hide();
									 }
								}
								else
								{
									$(".trafficSummeryWrap").eq(ix).show();
									$(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
									$(this).hide();
								}
							});
							
							daumTrafficPoliyLine(num);
							
							
							$(".inmap_short_info_wrap").attr("sid",  index );
							
							
							var myWinWidth = $(window).width();
							
							if (myWinWidth < 641) 
							{
								$(".daumFindParentToggle").addClass("on");
								$(".road_map_layer_cont").hide();
								
								$('.find_store_wrap').css({
									'height':'118px'
								});
								roadMapShow = true;				
							}	
							var iTime = $(this).attr("time");
							var iWalk = $(this).attr("walk");
							var iTransfer = $(this).attr("transfer");
							var iPrice = $(this).attr("price");
							var iKm = $(this).attr("km");
							//time="'+q.time.text+'" walk="'+q.walkingTime.text+'" transfer="'+transferBool+'" price="'+q.fare.text+'" km="'+q.distance.text+'" 
							//<p class="desti_top_dist">요금: <span class="iv_t_price"></span>| 총 <span class="iv_t_km"></span></p>
							
							window.scrollTo(0, 0);
							if ( roadMapShow == true)
							{
								var myWin 		= $(window).width();
								
								if ( myWin < 641 )
								{
									$('.road_map_layer_cont').show();
									$('.road_map_layer_cont').css({
										'height':'38px'
									});
									$(".afterMobileSearchWrap").show();
									$(".inmap_short_info_wrap").show();
									$(".road_map_layer_inner").hide();
									
									$("#initStartTxt").val( $("#start").val() );
									$("#initEndTxt").val( $("#destination").val() );
									
									$(".iTrafficSubView1").show();
									$(".iTrafficSubView2").hide();
									
									$(".iv_t_time").html(iTime);
									$(".iv_t_walk").html(iWalk);
									$(".iv_t_transfer").html(iTransfer);
									$(".iv_t_price").html(iPrice);
									$(".iv_t_km").html(iKm);
									
									$roadResult = true; 
									
									
									
									$(".iv_sub_target").each(function(){
										var pId = $(this).attr("pId");
										
										if ( pId == "trasfer")
										{
											$('.btn_after_search li').stop().hide();
											$('.btn_after_search li').children('a').removeClass('on');
											$(this).stop().show();
											$(this).prependTo('.btn_after_search');
											$(this).children('a').addClass('on');
											afterSearch = true;								
										}
									});										
																		
								}
							}							
						});
						
						
						
						$(".getTrafficViewer").unbind("click").on("click", function(){
							var num = $(this).attr("num");
							var index = $(".getTrafficViewer").index(this);
							var $target = $(".findTrafficView").eq(index);
							$(".findTrafficView").each(function(ix){
								if ( ix == index)
								{
									 if( $(this).css("display") == "none")
									 {
										 $(".trafficSummeryWrap").eq(ix).hide();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_down').addClass('trans_info_up');
										 $(this).show();
									 } else 
									 {
										 $(".trafficSummeryWrap").eq(ix).show();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
										 $(this).hide();
									 }
								}
								else
								{
									$(".trafficSummeryWrap").eq(ix).show();
									$(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
									$(this).hide();
								}
							});
							
							daumTrafficPoliyLine(num);
						});
						
						
						
						$(".liTrafficClick").unbind("click").on("click", function(){
							var num = $(this).attr("num");
							var index = $(".liTrafficClick").index(this);
							var $target = $(".findTrafficView").eq(index);
							$(".findTrafficView").each(function(ix){
								if ( ix == index)
								{
									 if( $(this).css("display") == "none")
									 {
										 $(".trafficSummeryWrap").eq(ix).hide();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_down').addClass('trans_info_up');
										 $(this).show();
									 } else 
									 {
										 $(".trafficSummeryWrap").eq(ix).show();
										 $(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
										 $(this).hide();
									 }
								}
								else
								{
									$(".trafficSummeryWrap").eq(ix).show();
									$(".getTrafficViewer").eq(ix).removeClass('trans_info_up').addClass('trans_info_down');
									$(this).hide();
								}
							});
							
							daumTrafficPoliyLine(num);
						});
						

						
						var publicTransExr = $('.public_trans_exr').height();
						$('.public_trans_exl').css({
							'height':publicTransExr
						});

						$('.trans_icon_wrap').each(function(){
							var thisHeight = $(this).height();
							var thisHeightNext = $(this).parent().next().children('.trans_icon_wrap').height();

							$(this).children('.trans_line').each(function(){
								$(this).css({
									'height' : (thisHeight / 2) + (thisHeightNext /2)
								});
							});
						});		

						
						
					}
					else if(y.status=="ZERO_RESULTS")
					{
						
						$(".icon_exclam").html('<strong>일반 시내 교통수단</strong> (지하철/버스/광역버스 등)으로 이동하는 경우에 한하여 대중교통 찾기 결과를 제공합니다.');
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();	
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						
						return;
					}
					else if(y.status=="UNKNOWN_ERROR")
					{
						$(".icon_exclam").html("잘못된 요청입니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();	
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if(y.status=="INVALID_REQUEST")
					{
						$(".icon_exclam").html("잘못된 요청입니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();	
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if(y.status=="STARTPOINT_NULL")
					{
						$(".icon_exclam").html("출발경로가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if(y.status=="ENDPOINT_NULL")
					{
						$(".icon_exclam").html("도착경로를 지정해 주세요.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												

						return;
					}					
					else if(y.status=="TOO_NEAR_POINTS")
					{

						$(".icon_exclam").html("출발지와 도착지가 너무 가깝습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if(y.status=="EQUAL_POINTS")
					{
						$(".icon_exclam").html("출발지와 도착지가 동일합니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if(y.status=="STARTNODES_NUL")
					{
						$(".icon_exclam").html("출발경로가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}					
					else if(y.status=="ENDNODES_NULL")
					{
						$(".icon_exclam").html("도착경로를 지정해 주세요.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();	
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}					
					else if(y.status=="NODES_NULL")
					{
						$(".icon_exclam").html("잘못된 요청입니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();	
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}					
										
					
					
					
				}
				else
				{
					$(".icon_exclam").html('<strong>일반 시내 교통수단</strong> (지하철/버스/광역버스 등)으로 이동하는 경우에 한하여 대중교통 찾기 결과를 제공합니다.');
					$(".carFindRoadErr").show();
					$(".carFindRoad").hide();
					$(".road_found_list").html("");
					
					$(".trafficSummery").html("");
					
					
					if( $daumRoadLine != null )
					{
						$daumRoadLine.setMap(null);
					}
										
					return;
				}
			 }					,
			 error			: function(data){ 
				 alert("예기치 않은 오류로 인해 길찾기 연동이 실패하였습니다.");
				 return;
			 }
		};
	
	  $.ajax(option);	
	
	**/
}




function daumTrafficPoliyLine(num)
{
	var y = $trafficData[num];

	
	if( $daumRoadLine != null )
	{
		$daumRoadLine.setMap(null);
	}
	
	
	/**
	if( $trafficPolylineArr != null )
	{
		for ( var i = 0; $trafficPolylineArr.length - 1;i++)
		{
			if ( $trafficPolylineArr[i] != undefined )
			{
				$trafficPolylineArr[i].setMap(null);	
			}
		}
	}
	**/
	
	
	var trafficPolyline = new Array();
	
	jQuery.each( y.steps , function(z,q){
		if ( z > 0 && z < y.steps.length - 1 )
		{
			
			var polyline 		= q.polyline;
			if (polyline != undefined)
			{
				//trafficPolyline = new Array();
				
				if ( q.nodes != undefined )
				{
					trafficPolyline.push(  new daum.maps.LatLng( q.polylineStart.y , q.polylineStart.x ) );
					jQuery.each( q.nodes , function(az,aq){
						trafficPolyline.push(  new daum.maps.LatLng( aq.y , aq.x ) );
					});
					trafficPolyline.push(  new daum.maps.LatLng( q.polylineEnd.y , q.polylineEnd.x ) );
				}
				else
				{
					trafficPolyline.push(  new daum.maps.LatLng( q.polylineStart.y , q.polylineStart.x ) );
					trafficPolyline.push(  new daum.maps.LatLng( q.polylineEnd.y , q.polylineEnd.x ) );
				}
			}
		}
	});
	
	
	
	
	$daumRoadLine = new daum.maps.Polyline({
	    path: trafficPolyline	, // 선을 구성하는 좌표배열 입니다
	    strokeWeight	: 5, // 선의 두께 입니다
	    strokeColor		: '#1a1aff', // 선의 색깔입니다
	    strokeOpacity	: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
	    strokeStyle		: 'solid' // 선의 스타일입니다
	});					
	$daumRoadLine.setMap($map.map);	
		
	
	
	
	
}


function daumTrafficView(obj, html, number)
{
	var sHtml = "";
	
	var poliyLine = "";
	var iHtml = "";
	
	jQuery.each( obj.steps , function(z,q){
		if ( z > 0  && z < obj.steps.length - 1)
		{
			if ( q.polyline != undefined)
			{
				poliyLine += q.polyline;
			}
			
			
			var icons = "";
			var lines = "";
			var qHtml = "";
			if ( q.type == "WALKING")
			{
				icons = '/common/img/store/trans_icon/icon_walk.png';
				lines = 'line_dash66';
				qHtml ='<p class="road_found_list_txt"><b>도보로 이동</b> |'+q.time.text+'|'+q.distance.text+'<br>'+q.information+'</p>';
			}
			if ( q.type=="BUS")
			{
				icons = '/common/img/store/trans_icon/icon_bus.png';
				lines = 'line_grey66';
				
				var vehiclesHtml = "";
				
				if ( q.vehicles != undefined )
				{
					if (  q.vehicles.length > 0)
					{
						vehiclesHtml='<br /><span class="public_trans_coord">';
						jQuery.each( q.vehicles , function(a, b){
							var aName = "";
							
							if ( b.subType == "RED")
							{
								aName = '<font style="color:red">'+b.name+'</font>&nbsp;';
							}
							else if(b.subType == "BLUE")
							{
								aName = '<font style="color:BLUE">'+b.name+'</font>&nbsp;';
							}
							else if(b.subType == "GREEN")
							{
								aName = '<font style="color:GREEN">'+b.name+'</font>&nbsp;';
							}
							else if(b.subType == "MAUL")
							{
								aName = '<font style="color:#e5e500">'+b.name+'</font>&nbsp;';
							}
							else
							{
								aName = "&nbsp;";
							}
							
							vehiclesHtml += aName;
						});
						vehiclesHtml += '</span>';
					}
				}
				
				if ( q.nodes != undefined)
				{
					vehiclesHtml += q.nodes.length+'개 정류장 이동('+q.time.text+' | ' +q.distance.text+')';	
				}
							
				qHtml ='<p class="road_found_list_txt"><b>'+q.information+'</b>'+vehiclesHtml+'</p>';
			}
			else if(q.type=="SUBWAY")
			{
				lines = 'line_grey66';
				var vehiclesHtml = "";
				if (q.startLocation != undefined)
				{
					if ( q.startLocation.subwayId == "SES34") //분당
					{
						icons="/common/img/store/trans_icon/icon_subway_bun.png"; 
					}
					else if ( q.startLocation.subwayId == "SES22") //인천
					{
						icons="/common/img/store/trans_icon/icon_subway_in.png";
					}
					else if ( q.startLocation.subwayId == "SES26") //경의중앙
					{
						icons="/common/img/store/trans_icon/icon_subway_jung.png";
					}
					else if ( q.startLocation.subwayId == "SES33") //경춘선
					{
						icons="/common/img/store/trans_icon/icon_subway_kyung.png";
					}
					else if ( q.startLocation.subwayId == "SES27") //공항철도
					{
						icons="/common/img/store/trans_icon/icon_subway_kong.png";
					}
					else if ( q.startLocation.subwayId == "SES36") //의정부
					{
						icons="/common/img/store/trans_icon/icon_subway_eu.png";
					}
					else if ( q.startLocation.subwayId == "SES35") //수인역
					{
						icons="/common/img/store/trans_icon/icon_subway_su.png";
					}
					else if ( q.startLocation.subwayId == "SES35") //수인역
					{
						icons="/common/img/store/trans_icon/icon_subway_su.png";
					}	
					else if ( q.startLocation.subwayId == "SES37") //에바러인
					{
						icons="/common/img/store/trans_icon/icon_subway_e.png";
					}	
					else if ( q.startLocation.subwayId == "SES38") //자기부상
					{
						icons="/common/img/store/trans_icon/icon_subway_ja.png";
					}	
					else
					{
						var numSubway = q.startLocation.subwayId.substring(3,4);
						icons="/common/img/store/trans_icon/icon_subway"+numSubway+".png";
					}	
					
					
					if ( q.vehicles != undefined )
					{
						vehiclesHtml = "";
						vehiclesHtml +='<br /><span class="public_trans_coord">';				
						vehiclesHtml += q.vehicles[0].name + ' ' +q.direction +" 방면</span>";
						
						if ( q.nodes != undefined)
						{
							vehiclesHtml += q.nodes.length+'개역 이동('+q.time.text+' | ' +q.distance.text+')';	
						}
					}
										
				}
				else
				{
					icons="/common/img/store/trans_icon/icon_desti.png"; 
				}
				
				qHtml ='<p class="road_found_list_txt"><b>'+q.information+'</b>'+vehiclesHtml+'</p>';

			}		
			
			
			iHtml +='<li>';
			iHtml += qHtml;
			iHtml +='<p class="trans_icon_wrap">';
			iHtml +='	<i class="icon_trans"><img alt="" src="'+icons+'"></i>';
			iHtml +='	<i class="trans_line '+lines+'"></i>';	
			iHtml +='</p>';
			iHtml +='</li>';				
		}
	});
	
	$trafficPoint[number] = poliyLine;
	
	
	
	
	
	
	
	
	
	
	
	
	sHtml += '<div class="findTrafficView" num="'+number+'" style="display:none">';
	sHtml += '<dl class="bg_start_desti">';
	sHtml += '	<dt>출발</dt>';
	sHtml += '	<dd><p>'+$startPostion.displayName+'</p></dd>';
	sHtml += '</dl>';
	sHtml += '<ul class="road_found_list">';
	sHtml += iHtml;
	sHtml += '</ul>';
	sHtml += '<dl class="bg_start_desti">';
	sHtml += '	<dt>도착</dt>';
	sHtml += '	<dd><p>'+$endPostion.displayName+'</p></dd>';
	sHtml += '</dl>';	
	sHtml += '</div>'
	
	return sHtml;
}




function daumRoadFindFoot()
{
	var url = "/daumroad/getFindRoad.do";
	var param 	="";
	param += 'appId=walk';
	param += '&startX='+$startPostion.gps_lng;
	param += '&startY='+$startPostion.gps_lat;
	param += '&endX='+$endPostion.gps_lng;
	param += '&endY='+$endPostion.gps_lat;
	param += '&routeMode=RECOMMENDATION';
	param += '&selectOption=NONE';
	param += '&inputCoordSystem=WGS84';
	param += '&outputCoordSystem=WGS84';
	var prm = unserialize(param);


	var option = { 
			 type			: "post"													,
			 url			: url													,
			 data			: prm													,
			 scriptCharset	: "utf-8"												,
			 contentType	: "application/x-www-form-urlencoded; charset=UTF-8"	,
			 async			: true													,
			 dataType 		: "json"												,
			 success        : function(obj){
				var data = obj.road;
				data = JSON.parse(data);
				var pathArray = new Array();
				if ( data.success == true )
				{
					
					var km 		= parseInt(data.length) / 1000;
					km 			= km.toFixed(1); 
					var time	= parseInt(data.time) / 60;
					time		= time.toFixed(0); 
					
					$(".iTrafficSubView1").hide();
				    $(".iTrafficSubView2").show();							
					var timeMsg = "";
					
					if ( parseInt(time) > 60 )
					{
						var timeHour = "";
						var timeMin  = "";
						
						timeHour = parseInt(parseInt(time) / 60);
						timeMin  = parseInt(parseInt(time) % 60);
						timeMsg ='<strong>'+timeHour+'</strong>시간 <strong>'+timeMin+'</strong> 분';
						$(".iv_end_min").html(timeHour + "시간 " + timeMin + "분");
						
					}
					else
					{
						timeMsg = '<strong>'+time+'</strong> 분';
						$(".iv_end_min").html(time + "분");
					}
					$(".iv_end_length").html(km + "km"); 
					$(".iv_end_position").html($endPostion.displayName); 
					
					if ( data.sections[0].resultCode == "ROUTE_RESULT_SUCCESS" )
					{
						$(".road_found_list").html("");
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
						/*if( $endPostion.favorites != null)
						{
							if($endPostion.favorites == "0")
							{
								$(".roadFav").attr("data-yn", "N");
								$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_off.png");
							}
							else
							{
								$(".roadFav").attr("data-yn", "Y");
								$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_on.png");
							}
							
						}
						else
						{
							$(".roadFav").attr("data-yn", "N");
							$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_off.png");							
						}*/ /* 20210308 제거 */
						
							
						$(".foot_find_endName").html($endPostion.displayName);
						$(".foot_find_min").html(timeMsg);
						$(".foot_find_lengtn").html(km);
						$(".foot_find_startName").html($startPostion.displayName);	
						$(".carFindRoad").show();
						$(".carFindRoadErr").hide();
						
						
						var guideObj  = data.sections[0].guides;
						
						
						jQuery.each( guideObj , function(z,q){
							var guideLinkObj = q.guideLink;
							if ( guideLinkObj != undefined )
							{
								
								if ( guideLinkObj.points != undefined )
								{
									var pointObj	 = guideLinkObj.points;
									var pointsArr 	 = pointObj.split("|");
									for ( var i = 0; i <= pointsArr.length - 1 ; i++)
									{
										var pointGpsArr = pointsArr[i].split(",");
										pathArray.push(  new daum.maps.LatLng( pointGpsArr[1] , pointGpsArr[0] ) );
									}
								}
								
								var guideCode 		= q.guideCode;
								var rotationCode 	= q.rotationCode;
								var iconClass		= "";
								
								if ( guideCode.indexOf("ENTER_CROSSWALK") > -1 )
								{
									iconClass = "icon_crosswalk";
								}
								else
								{
									if ( rotationCode == "STRAIGHT")
									{
										iconClass = "icon_straight";
									}
									
									if ( rotationCode == "TURN_LEFT")
									{
										iconClass = "icon_left";
									}
									
									if ( rotationCode == "TURN_RIGHT")
									{
										iconClass = "icon_right";
									}							
									
								}
								
								var roadText = "";
								var strongNames = "";
								
								if ( guideLinkObj.roadName != undefined )
								{
									if ( guideLinkObj.roadName != "" ) 
									{
										strongNames = '<strong>'+guideLinkObj.roadName+'</strong><br>';
									}
								}
								
								//roadText = h.name + "방면으로 "+h.length+"m "+q.routeinfo;

								var html = '';
								
								html += '<li class="road_find_resultInfo" type="car" lat="'+q.y+'" lng="'+q.x+'" guidecode="'+q.guidecode+'" >';
								html += '	<p class="road_found_list_txt">'+strongNames+' '+q.guideMent+'</p>';
								html += '	<p class="walk_icon_wrap">';
								html += '		<i class="'+iconClass+'"></i>';
								html += '	</p>';
								html += '</li>';		
								
								$(".road_found_list").append(html);								
							}
						});			
						
						
						
						$daumRoadLine = new daum.maps.Polyline({
						    path: pathArray	, // 선을 구성하는 좌표배열 입니다
						    strokeWeight	: 5, // 선의 두께 입니다
						    strokeColor		: '#1a1aff', // 선의 색깔입니다
						    strokeOpacity	: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
						    strokeStyle		: 'dashed' // 선의 스타일입니다
						});					
						
						
						$daumRoadLine.setMap($map.map);		
						window.scrollTo(0, 0);
						$roadResult = true; 
						daumtype = "foot";
						
						if ( roadMapShow == true)
						{
							var myWin 		= $(window).width();
							
							if ( myWin < 641 )
							{
								$('.road_map_layer_cont').show();
								$('.road_map_layer_cont').css({
									'height':'38px'
								});
								$(".afterMobileSearchWrap").show();
								$(".inmap_short_info_wrap").show();
								$(".road_map_layer_inner").hide();
								
								$("#initStartTxt").val( $("#start").val() );
								$("#initEndTxt").val( $("#destination").val() );
							}
						}		
						$(".inmap_short_info_wrap").attr("sid", "-1");
						$(".iv_sub_target").each(function(){
							var pId = $(this).attr("pId");
							
							if ( pId == "walk")
							{
								$('.btn_after_search li').stop().hide();
								$('.btn_after_search li').children('a').removeClass('on');
								$(this).stop().show();
								$(this).prependTo('.btn_after_search');
								$(this).children('a').addClass('on');
								afterSearch = true;								
							}
						});						
						
					}
				}
				else
				{
					if( data.sections[0].resultCode == "ROUTE_RESULT_NOT_FOUND" )
					{
						$(".icon_exclam").html("검색결과가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "SAME_POINT" )
					{
						$(".icon_exclam").html("출발지와 도착지가 동일합니다");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "SAME_AREA" )
					{
						$(".icon_exclam").html("출발지와 도착지가 동일합니다");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "START_LINK_NOT_FOUND" )
					{
						$(".icon_exclam").html("출발지 주변 도보 경로가 없습니다. ");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
						
					else if( data.sections[0].resultCode == "END_LINK_NOT_FOUND" )
					{
						$(".icon_exclam").html("도착지 주변 도보 경로가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "TOO_FAR_AWAY" )
					{
						$(".icon_exclam").html('직선거리가 <strong>30km</strong> 이내인 경우에 한하여 도보 찾기 결과를 제공합니다.');
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "TOO_MANY_SEARCH_LINK" )
					{
						$(".icon_exclam").html("검색결과가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "NONE" )
					{
						$(".icon_exclam").html("잘못된 요청입니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						
						return;
					}
				}
			 }
	};
	
	$.ajax(option);	

	/**
	var option = { 
			 type			: "get"													,
			 url			: url+"?"+param											,
			 data			: ""													,
			 scriptCharset	: "utf-8"												,
			 contentType	: "application/x-www-form-urlencoded; charset=UTF-8"	,
			 async			: true													,
			 dataType 		: "jsonp"												,
			 jsonp 			: "callback"											,			 
			 success        : function(data){
				var pathArray = new Array();
				if ( data.success == true )
				{
					
					var km 		= parseInt(data.length) / 1000;
					km 			= km.toFixed(1); 
					var time	= parseInt(data.time) / 60;
					time		= time.toFixed(0); 
					
					$(".iTrafficSubView1").hide();
				    $(".iTrafficSubView2").show();							
					var timeMsg = "";
					
					if ( parseInt(time) > 60 )
					{
						var timeHour = "";
						var timeMin  = "";
						
						timeHour = parseInt(parseInt(time) / 60);
						timeMin  = parseInt(parseInt(time) % 60);
						timeMsg ='<strong>'+timeHour+'</strong>시간 <strong>'+timeMin+'</strong> 분';
						$(".iv_end_min").html(timeHour + "시간 " + timeMin + "분");
						
					}
					else
					{
						timeMsg = '<strong>'+time+'</strong> 분';
						$(".iv_end_min").html(time + "분");
					}
					$(".iv_end_length").html(km + "km"); 
					$(".iv_end_position").html($endPostion.displayName); 
					
					if ( data.sections[0].resultCode == "ROUTE_RESULT_SUCCESS" )
					{
						$(".road_found_list").html("");
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
						
						$(".roadFav").attr("data-store", $endPostion.store_code);
						$(".roadFav").attr("data-name", $endPostion.displayName);
						
						if( $endPostion.favorites != null)
						{
							if($endPostion.favorites == "0")
							{
								$(".roadFav").attr("data-yn", "N");
								$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_off.png");
							}
							else
							{
								$(".roadFav").attr("data-yn", "Y");
								$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_on.png");
							}
							
						}
						else
						{
							$(".roadFav").attr("data-yn", "N");
							$(this).attr("src","//image.istarbucks.co.kr/common/img/store/icon_fav_off.png");							
						}
						
							
						$(".foot_find_endName").html($endPostion.displayName);
						$(".foot_find_min").html(timeMsg);
						$(".foot_find_lengtn").html(km);
						$(".foot_find_startName").html($startPostion.displayName);	
						$(".carFindRoad").show();
						$(".carFindRoadErr").hide();
						
						
						var guideObj  = data.sections[0].guides;
						
						
						jQuery.each( guideObj , function(z,q){
							var guideLinkObj = q.guideLink;
							if ( guideLinkObj != undefined )
							{
								
								if ( guideLinkObj.points != undefined )
								{
									var pointObj	 = guideLinkObj.points;
									var pointsArr 	 = pointObj.split("|");
									for ( var i = 0; i <= pointsArr.length - 1 ; i++)
									{
										var pointGpsArr = pointsArr[i].split(",");
										pathArray.push(  new daum.maps.LatLng( pointGpsArr[1] , pointGpsArr[0] ) );
									}
								}
								
								var guideCode 		= q.guideCode;
								var rotationCode 	= q.rotationCode;
								var iconClass		= "";
								
								if ( guideCode.indexOf("ENTER_CROSSWALK") > -1 )
								{
									iconClass = "icon_crosswalk";
								}
								else
								{
									if ( rotationCode == "STRAIGHT")
									{
										iconClass = "icon_straight";
									}
									
									if ( rotationCode == "TURN_LEFT")
									{
										iconClass = "icon_left";
									}
									
									if ( rotationCode == "TURN_RIGHT")
									{
										iconClass = "icon_right";
									}							
									
								}
								
								var roadText = "";
								var strongNames = "";
								
								if ( guideLinkObj.roadName != undefined )
								{
									if ( gu
ideLinkObj.roadName != "" ) 
									{
										strongNames = '<strong>'+guideLinkObj.roadName+'</strong><br>';
									}
								}
								
								//roadText = h.name + "방면으로 "+h.length+"m "+q.routeinfo;

								var html = '';
								
								html += '<li class="road_find_resultInfo" type="car" lat="'+q.y+'" lng="'+q.x+'" guidecode="'+q.guidecode+'" >';
								html += '	<p class="road_found_list_txt">'+strongNames+' '+q.guideMent+'</p>';
								html += '	<p class="walk_icon_wrap">';
								html += '		<i class="'+iconClass+'"></i>';
								html += '	</p>';
								html += '</li>';		
								
								$(".road_found_list").append(html);								
							}
						});			
						
						
						
						$daumRoadLine = new daum.maps.Polyline({
						    path: pathArray	, // 선을 구성하는 좌표배열 입니다
						    strokeWeight	: 5, // 선의 두께 입니다
						    strokeColor		: '#1a1aff', // 선의 색깔입니다
						    strokeOpacity	: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
						    strokeStyle		: 'dashed' // 선의 스타일입니다
						});					
						
						
						$daumRoadLine.setMap($map.map);		
						window.scrollTo(0, 0);
						$roadResult = true; 
						daumtype = "foot";
						
						if ( roadMapShow == true)
						{
							var myWin 		= $(window).width();
							
							if ( myWin < 641 )
							{
								$('.road_map_layer_cont').show();
								$('.road_map_layer_cont').css({
									'height':'38px'
								});
								$(".afterMobileSearchWrap").show();
								$(".inmap_short_info_wrap").show();
								$(".road_map_layer_inner").hide();
								
								$("#initStartTxt").val( $("#start").val() );
								$("#initEndTxt").val( $("#destination").val() );
							}
						}		
						$(".inmap_short_info_wrap").attr("sid", "-1");
						$(".iv_sub_target").each(function(){
							var pId = $(this).attr("pId");
							
							if ( pId == "walk")
							{
								$('.btn_after_search li').stop().hide();
								$('.btn_after_search li').children('a').removeClass('on');
								$(this).stop().show();
								$(this).prependTo('.btn_after_search');
								$(this).children('a').addClass('on');
								afterSearch = true;								
							}
						});						
						
					}
				}
				else
				{
					if( data.sections[0].resultCode == "ROUTE_RESULT_NOT_FOUND" )
					{
						$(".icon_exclam").html("검색결과가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "SAME_POINT" )
					{
						$(".icon_exclam").html("출발지와 도착지가 동일합니다");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "SAME_AREA" )
					{
						$(".icon_exclam").html("출발지와 도착지가 동일합니다");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "START_LINK_NOT_FOUND" )
					{
						$(".icon_exclam").html("출발지 주변 도보 경로가 없습니다. ");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
						
					else if( data.sections[0].resultCode == "END_LINK_NOT_FOUND" )
					{
						$(".icon_exclam").html("도착지 주변 도보 경로가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "TOO_FAR_AWAY" )
					{
						$(".icon_exclam").html('직선거리가 <strong>30km</strong> 이내인 경우에 한하여 도보 찾기 결과를 제공합니다.');
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "TOO_MANY_SEARCH_LINK" )
					{
						$(".icon_exclam").html("검색결과가 없습니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();						
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						return;
					}
					else if( data.sections[0].resultCode == "NONE" )
					{
						$(".icon_exclam").html("잘못된 요청입니다.");
						$(".carFindRoadErr").show();
						$(".carFindRoad").hide();		
						$(".road_found_list").html("");
						$(".trafficSummery").html("");
						
						
						if( $daumRoadLine != null )
						{
							$daumRoadLine.setMap(null);
						}
						
						
												
						
						return;
					}
				}
			 }					,
			 error			: function(data){ 
				 alert("예기치 않은 오류로 인해 길찾기 연동이 실패하였습니다.");
				 return;
			 }
		};

	  **/

	
}


function sbSearchPlace(search)
{
	var $search = {};

	

	
	
	$search.in_biz_cds 		= 0;
	$search.in_scodes 		= 0;	
	$search.ins_lat 			= 37.56682;
	$search.ins_lng 			= 126.97865;						
	$search.search_text 	= search;
	$search.p_sido_cd 		= "";
	$search.p_gugun_cd 	= "";
	$search.isError				= true;
	$search.in_distance 		= 0;
	$search.in_biz_cd 		= "";			
	
	if ( $search_target == "keyup" )
	{
		$search.iend = 10;
	}
	else
	{
		$search.iend = 100;
	}
	$search.searchType = "B";
	$search.set_date		="";
	$search.todayPop 	= 0;
	$search.all_store  	= 0;	
	
	
	$search.T03=0;
	$search.T01=0;
	$search.T12=0;
	$search.T06=0;
	$search.T09=0;
	$search.T10=0;
	$search.T04=0;
	$search.T20=0;
	$search.P10=0;
	$search.P50=0;
	$search.P20=0;
	$search.P60=0;
	$search.P30=0;
	$search.P70=0;
	$search.P40=0;
	$search.P80=0;
	$search.new_bool=0;		
	
	var rndCod = randomString();
	var storeInterfaceUrl = "/store/getStore.do?r="+rndCod;
	
	$(".carFindRoad").hide();
	$(".carFindRoadErr").hide();
	$(".transfer_method_cont1").show();
	$(".transfer_method_cont2").hide();
	$(".transfer_method_cont3").hide();
	
	
	
	$roadFindBool = false;
	__ajaxCall(storeInterfaceUrl ,$search, true, "json", "post",
			function (_response) 
			{
				
				if ( _response.list.length > 0 )
				{
					$storeDataGrp = _response;
					
					$(".road_found_list").html("");

					
					jQuery.each( _response.list  , function(x,y){
						var html = '';
						var storeAddress = y.doro_address;
						var theme 		 = y.theme_state;
						var iClass ="pin_end";
						
		    			if ( theme.indexOf("T03") > -1 )	//해당 매장이 리저브라면
		    			{
		    				iClass = "pin_res_end";
		    			}
		    			else
		    			{
		    				iClass = "pin_reg_end";     		    				
		    			}						
						
						html += '<li class="road_search_result endPositionWrapBox" s_code="'+y.s_code+'" lat="'+y.lat+'" lng="'+y.lot+'" displat="'+y.s_name+'" biz="'+y.s_biz_code+'"  theme="'+theme+'" fav="'+y.favorites+'" address="'+storeAddress+'" tel="'+y.tel+'" whcroad="'+y.whcroad_yn+'">';
						html += '	<p class="road_found_list_txt"><strong>'+y.s_name+'</strong><br>'+y.doro_address+'</p>';
						html += '	<p class="walk_icon_wrap">';
						html += '		<i class="'+iClass+'"></i>';
						html += '	</p>';
						html += '</li>';		
						$(".road_found_list").append(html);
					});
					
					$(".endPositionWrapBox").unbind("click");
					$(".endPositionWrapBox").on("click", function(){
						var lat = $(this).attr("lat");
						var lng = $(this).attr("lng");
						var display = $(this).attr("displat");
						var _s_name 	= $(this).attr("displat");
						var _s_address  = $(this).attr("address");
						var _s_tel	    = $(this).attr("tel");
						var _s_biz	    = $(this).attr("biz");
						var _s_theme    = $(this).attr("theme");
						var whcroad    = $(this).attr("whcroad");
						
						$.daum.closeInfoWindow(function(){
							if($roadInfoWindow){
								$roadInfoWindow.close($map.map, $end_road_marker);
							}
						});
						
						//[디파이너리 이벤트]길찾기 매장 클릭 S
						try {
							if(window.location.pathname.indexOf("/app/store/store_map.do") > -1) {
								var dfineryEventData = {
										storename : _s_name
								};
								
								dfineryFn.commonEvent(dfinery.EVENT_NAME.STORE_STOREMAP_FINDROADSTORESELECT, dfineryEventData);
							}
						}catch(e) {
						}
						//[디파이너리 이벤트]길찾기 매장 클릭 E
						
						/* 2016.09.27, 이인철, 길찾기 수정 사항 적용 */						
						$("#destination").val($(this).attr("displat"));
						$(".road_found_list").html("");
						
						//if ( confirm("해당 지점을 목적지로 설정하시겠습니까?\n목적지로 설정시 기존 정보는 삭제됩니다."))
						//{
							$.daum.markerRemove();
							if ( $end_road_marker != null )
							{
								$end_road_marker.setMap(null);
							}
							
							
							if( $daumRoadLine != null )
							{
								$daumRoadLine.setMap(null);
							}					
							
							$(".roadFindStartBtn").removeClass("on");
							$(".carFindRoad").hide();
							$(".carFindRoadErr").hide();
							
							$endPostion.displayName = "스타벅스 " + display;
							$endPostion.gps_lat     = lat;
							$endPostion.gps_lng     = lng;
							$endPostion.favorites	= $(this).attr("fav");
							$endPostion.store_code	= $(this).attr("s_code");
							
	
							var markerImageSize 		= new daum.maps.Size( 38 , 60 );
							var markerImageOptions 		= { offset : new daum.maps.Point(16 , 55 ) };  
							var markerPosition 			= new daum.maps.LatLng( lat , lng );
							
							
    		    			if ( _s_theme.indexOf("T03") > -1 )	//해당 매장이 리저브라면
    		    			{
	    						 var markerImage 			= new daum.maps.MarkerImage( "/common/img/store/pin/pin_res_end.png"	, markerImageSize, markerImageOptions);
    		    			}
    		    			else
    		    			{
	    						 var markerImage 			= new daum.maps.MarkerImage( "/common/img/store/pin/pin_reg_end.png"	, markerImageSize, markerImageOptions);     		    				
    		    			}
							
							$end_road_marker = new daum.maps.Marker({
								position: markerPosition		, // 마커의 좌표
								image : markerImage				, // 마커의 이미지
								map: $map.map					, // 마커를 표시할 지도 객체
								clickable: true
							});	
							
							//lat="'+y.lat+'" lng="'+y.lot+'" displat="'+y.s_name+'" biz="'+y.s_biz_code+'"  theme="'+theme+'" fav="'+y.favorites+'" address="'+storeAddress+'" tel="'+y.tel+'"
							
							

							
							
	    					var setIconConvert = "";
	    					

	    					
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T01");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T03");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T12");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T09");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T10");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "P10");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "P50");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "P20");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "P60");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "P70");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "P40");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "P80");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T04");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T20");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T22"); //나이트로 콜드브루
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T21"); //현금없는 매장
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T05"); //피지오
	    					setIconConvert = setIconConvert + $.storemap.setIncon(whcroad, "WHCROAD");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "P90");
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T30"); //2019.10.24 매장찾기 검색옵션 내 '블론드' 속성(T30) 추가
	    					setIconConvert = setIconConvert + $.storemap.setIncon(_s_theme, "T36"); //2020.03.27 매장찾기 검색옵션 내 '식약처 위생등급제 인증' 속성(T36) 추가
							
	    					var iwContent =
	    						'<div class="map_marker_pop">' +
	    							'<header>'+_s_name+'</header>'+
	    							'<article>' +
	    								'<div class="map_marker_pop_inner">' +
	    									'<div class="icon_wrap">' +
	    										'<div class="icon_wrap_l">'+setIconConvert+'</div>' +
	    										'<div class="icon_wrap_r">' +
	    											'<a href="javascript:void(0);" style="display:none"><img alt="트위터" src="//image.istarbucks.co.kr/common/img/util/reward/btn_t.gif"></a>' +
	    											'<a href="javascript:void(0);" style="display:none"><img alt="페이스북" src="//image.istarbucks.co.kr/common/img/util/reward/btn_f.gif"></a>' +
	    											'<a href="javascript:void(0);" style="display:none"><img alt="카카오 스토리" src="//image.istarbucks.co.kr/common/img/util/reward/btn_k.gif"></a>' +
	    										'</div>' +
	    									'</div>' +
	    									'<div class="cont_wrap">' +
	    										'<p class="addr">'+_s_address+'</p>' +
	    										'<p class="tel"><a href="tel:'+_s_tel+'">'+_s_tel+'</a></p>' +
	    										'<a class="btn_marker_detail" href="javascript:getStoreDetail(\''+_s_biz+'\');">상세 정보 보기</a>' +
	    									'</div>' +
	    								'</div>' +
	    							'</article>'+
	    						'</div>';
	    												
							
							
							
							
							var infowindow = "";
							$roadInfoWindow = new daum.maps.InfoWindow({
								content : iwContent	,
								removable : true
							});
							
							
							
							daum.maps.event.addListener($end_road_marker, 'click', function() {
								$.daum.closeInfoWindow(function(){
									if($roadInfoWindow){
										$roadInfoWindow.close($map.map, $start_road_marker);
									}
									$roadInfoWindow.open($map.map, $end_road_marker);
									$map.map.setCenter(markerPosition);
								});
							});  							
														

							if($(window).width() > 640){
								if ( $end_road_marker != null )
								{
									$map.map.setCenter(markerPosition);
								}			
							}else{
								if ( $end_road_marker != null )
								{	
									if(window.location.pathname.indexOf("/app/store/store_map.do") > -1){
										markerPosition.Ma = Number(markerPosition.Ma) + 0.001
									}else{
										markerPosition.Ma = Number(markerPosition.Ma) + 0.00085
									}
									$map.map.setCenter(markerPosition);
								}
							}
							
							
						//}
						
					});
					
					
					
				}
				else
				{
					alert("해당 검색어로 조회된 매장정보가 존재하지 않습니다.");
					return;
				}
	        }
			, 
			function(_error)
			{
			}
	);        	
}

function daumSearchPlace( search  )
{
	$daumSearch = new daum.maps.services.Places();
	$daumSearch.keywordSearch( search , placesSearchCB); 
}

function isMobileBool()
{

	var filter = "win16|win32|win64|mac";
	 
	if(navigator.platform)
	{
		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			return true;
		}else{
			return false;
		}
	}	
	else
	{
		return false;
	}
}

//장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(result, status, pagination) {
	$(".carFindRoad").hide();
	$(".carFindRoadErr").hide();
	$(".transfer_method_cont1").show();
	$(".transfer_method_cont2").hide();
	$(".transfer_method_cont3").hide();

	
	$roadFindBool = true;
	
    if (status === daum.maps.services.Status.OK) {
    	
    	
    	
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        //displayPlaces(data.places);
        // 페이지 번호를 표출합니다
        //displayPagination(pagination);
    	
    	if( result.length > 0 )
    	{
    		
			$(".road_found_list").html("");
			
			jQuery.each(result, function(index, value){
				var html = '';
				html += '<li class="road_search_result startPositionWrapBox" lat="'+value.y+'" lng="'+value.x+'" display="'+value.place_name+'" >';
				html += '	<p class="road_found_list_txt"><strong>'+value.place_name+'</strong><br>'+value.address_name+'</p>';
				html += '	<p class="walk_icon_wrap">';
				html += '		<i class="pin_start"></i>';
				html += '	</p>';
				html += '</li>';		
				$(".road_found_list").append(html);
			});   
			
			
			$(".startPositionWrapBox").unbind("click");
			$(".startPositionWrapBox").on("click", function(){
				
				var lat = $(this).attr("lat");
				var lng = $(this).attr("lng");
				var display = $(this).attr("display");
	
				$.daum.closeInfoWindow(function(){
					if($roadInfoWindow){
						$roadInfoWindow.close($map.map, $end_road_marker);
					}
				});
				
				//if ( confirm("해당 지점을 출발지로 설정하시겠습니까?\n목적지로 설정시 기존 정보는 삭제됩니다."))
				//{
					$.daum.markerRemove();
					if ( $start_road_marker != null )
					{
						$start_road_marker.setMap(null);
					}
					
					if( $daumRoadLine != null )
					{
						$daumRoadLine.setMap(null);
					}
					
					$(".roadFindStartBtn").removeClass("on");
					
					$(".carFindRoad").hide();
					$(".carFindRoadErr").hide();
					
					$startPostion.displayName = display;
					$startPostion.gps_lat     = lat;
					$startPostion.gps_lng     = lng;
					

					var markerImageSize 		= new daum.maps.Size( 38 , 60 );
					var markerImageOptions 		= { offset : new daum.maps.Point(16 , 55 ) };  
					var markerPosition 			= new daum.maps.LatLng( lat , lng );
					var markerImage 			= new daum.maps.MarkerImage( "/common/img/store/pin/pin_start.png"	, markerImageSize, markerImageOptions);		
					$start_road_marker = new daum.maps.Marker({
						position: markerPosition		, // 마커의 좌표
						image : markerImage				, // 마커의 이미지
						map: $map.map					, // 마커를 표시할 지도 객체
						clickable: true
					});
					
					
					daum.maps.event.addListener($start_road_marker, 'click', function() {							
						if ( $end_road_marker != null )
						{
							$.daum.closeInfoWindow(function(){
								$roadInfoWindow.close($map.map, $end_road_marker);
							});
						}
						$map.map.setCenter(markerPosition);
					}); 	
					
					
					
					if($(window).width() > 640){
						if ( $start_road_marker != null )
						{
							$map.map.setCenter(markerPosition);
						}			
					}else{
						if ( $start_road_marker != null )
						{
							if(window.location.pathname.indexOf("/app/store/store_map.do") > -1){
								markerPosition.Ma = Number(markerPosition.Ma) + 0.001
							}else{
								markerPosition.Ma = Number(markerPosition.Ma) + 0.00085
							}	
							$map.map.setCenter(markerPosition);
						}
					}
					
					$("#start").val(display);
					$(".road_found_list").empty();
					
					//$map.map.setCenter(markerPosition);
					
				//}
				
			});			
    		
    	}

    } else if (status === daum.maps.services.Status.ZERO_RESULT) {
    	
    	if( $search_target != "keyup" )
    	{
            alert('검색 결과가 존재하지 않습니다.');
            return;
    	}

    } else if (status === daum.maps.services.Status.ERROR) {

    	if( $search_target != "keyup" )
    	{
            alert('검색 결과가 존재하지 않습니다.');
            return;
    	}
    }
}
