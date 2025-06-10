/** 스토어 검색 **/

$(document).ready(function(){
	
	$(window).on("load", function(){
		$.storemap.init(true);
	});
	
	
	$(".quickSearchBtn").on("click", function(){
		var deny_char = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s!-@#?$%&*().\r\n,\*]+$/
		if(pattern_check("#quickSearchText" ,   "매장명 또는 주소를 입력하세요." , "해당 영역은 한글/숫자/영문, 특수기호  !,@,#,?,$,%,&,*,(,) 입력 가능합니다.", deny_char )==false){return;}
		
		
		$vo.ip_lat					=  "";
		$vo.ip_long					=  "";
		$vo.espresso				=  "";
		$vo.new_store				=  "";
		$vo.premiere_food			=  "";
		
		$search.ins_lat 		= $geo_backup.latitude;
		$search.ins_lng 		= $geo_backup.longitude;						
		$search.search_text 	= $("#quickSearchText").val();
		$search.p_sido_cd	 	= "";
		$search.p_gugun_cd	 	= "";
		$search.in_distance 	= 0;
		$search.isError			= true;
		$search.in_biz_cd 		= "";
		$search.in_biz_cds 		= 0;
		$search.in_scodes 		= 0;		
		$.storemap.checkbox_init();
		$.storemap.setStoreInfo();
		
		
	});	
	
    $("#quickSearchText").unbind("keydown").keydown(function (e) {
    	var deny_char = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s!-@#?$%&*().\r\n,\*]+$/
    	if (e.keyCode == 13) 
    	{
    		e.preventDefault();
			if(pattern_check("#quickSearchText" ,   "매장명 또는 주소를 입력하세요." , "해당 영역은 한글/숫자/영문, 특수기호  !,@,#,?,$,%,&,*,(,) 입력 가능합니다.", deny_char )==false){return;}
			
			
			$vo.ip_lat					=  "";
			$vo.ip_long					=  "";
			$vo.espresso				=  "";
			$vo.new_store				=  "";
			$vo.premiere_food			=  "";
			
			
			$search.ins_lat 		= $geo_backup.latitude;
			$search.ins_lng 		= $geo_backup.longitude;					
			$search.search_text 	= $("#quickSearchText").val();
			$search.p_sido_cd	 	= "";
			$search.p_gugun_cd	 	= "";
			$search.in_distance 	= 0;
			$search.isError			= true;
			$search.in_biz_cd 		= "";
			
			$search.in_biz_cds 		= 0;
			$search.in_scodes 		= 0;			
			$.storemap.checkbox_init();
			$.storemap.setStoreInfo();

			
			$(this).next().focus();
			
			
    	}
    });
    
    $(".btn_storemap_quick").find("a").on("click", function(){
		$('.store_map_layer_cont header h3').removeClass('on');
		$('.store_map_layer_cont header h3').eq(0).addClass('on');
		$('.store_map_layer_cont article').hide();
		$('.store_map_layer_cont header h3').eq(0).parent().next().show();    	
		
		
		$(".resultCtnNumberTab1").html(0);
		$(".quickSearchResultCtn").html("");
		$(".quickSearchResultBox").empty();
		
		
		$vo.ip_lat					=  "";
		$vo.ip_long					=  "";
		$vo.espresso				=  "";
		$vo.new_store				=  "";
		$vo.premiere_food			=  "";
		
		$search.ins_lat 		= $geo_backup.latitude;
		$search.ins_lng 		= $geo_backup.longitude;						
		$search.search_text 	= "";
		$search.p_sido_cd	 	= "";
		$search.p_gugun_cd	 	= "";
		$search.in_distance 	= 5;
		$search.isError			= true;
		$search.in_biz_cd 		= "";
		$search.iend	 		=30;
		$search.in_biz_cds 		= 0;
		$search.in_scodes 		= 0;
		
		/* 240401 내위치보기 프로세스 개선 */
		// $.storemap.checkbox_init();
		navigator.geolocation.getCurrentPosition(function (position) {
			$geo.latitude = position.coords.latitude;
			$geo.longitude = position.coords.longitude;
			var myLocation = new daum.maps.LatLng($geo.latitude, $geo.longitude);
			$map.map.setCenter(myLocation);
			$.storemap.setStoreInfo();
		}, function () {
			$.storemap.setStoreInfo();
		});
    });
        
    
	$('.store_map_layer_cont header h3:not(.on)').parent().next().hide();
	$('.store_map_layer_cont header h3').bind('click', function(){
		
		var control = $(this).parent().attr("class");
		
		$('.store_map_layer_cont header h3').removeClass('on');
		$(this).addClass('on');
		$('.store_map_layer_cont article').hide();
		$(this).parent().next().show();
		
		if ( control == "quick_search")		//퀵검색을 눌렀다면
		{
			$(".resultCtnNumberTab1").html(0);
			$(".quickSearchResultCtn").html("");
			$(".quickSearchResultBox").empty();
			
			
			$vo.ip_lat					=  "";
			$vo.ip_long					=  "";
			$vo.espresso				=  "";
			$vo.new_store				=  "";
			$vo.premiere_food			=  "";
			
			$search.ins_lat 		= $geo_backup.latitude;
			$search.ins_lng 		= $geo_backup.longitude;						
			$search.search_text 	= "";
			$search.p_sido_cd	 	= "";
			$search.p_gugun_cd	 	= "";
			$search.in_distance 	= 5;
			$search.isError			= true;
			$search.in_biz_cd 		= "";
			$search.iend	 		= 20;
			$search.in_biz_cds 		= 0;
			$search.in_scodes 		= 0;
			
			
			$.storemap.checkbox_init();
			$.storemap.setStoreInfo();
		}
		
		if ( control == "loca_search")		//지역검색 눌렀다면
		{
			$(".loca_step1").show();
			$(".loca_step2").hide();
			$(".loca_step3").hide();
			$.storemap.checkbox_init();
		}	
		return false;
	});    

	
	$(".opt_sel_btns").find("li.li1").find("a").on("click", function(){
		$("INPUT:CHECKBOX").each(function(x,y){
			var tagName = $(y).attr("name");
			if ( tagName != "all_store" )
			{
				$(this).prop("checked", false);
				$("INPUT:CHECKBOX").trigger("change");
			}
			else
			{
				$(this).prop("checked", true);
				$("INPUT:CHECKBOX").trigger("change");
			}
		});
	});
	
	$("INPUT:CHECKBOX").on("click", function(){
		var checkCnt = 0;
		$("INPUT:CHECKBOX").each(function(x,y){
			var tagName = $(y).attr("name");
			if ( tagName != "all_store" )
			{
				var checked = $(y).is(":checked");
				if (checked)
				{
					checkCnt++;
				}
			}
		});

		if ( checkCnt > 0)
		{
			$("#all_store").prop("checked", false);
			$("INPUT:CHECKBOX").trigger("change");
		}
		else
		{
			$("#all_store").prop("checked", true);
			$("INPUT:CHECKBOX").trigger("change");
		}
	});
		
	
	
	$(".opt_apply_btn").on("click", function(){
		$("INPUT:CHECKBOX").each(function(x,y){
			var inputCheckName = $(y).attr("name");
			var checked = $(y).is(":checked");
			$option[inputCheckName] = checked;
		});
		
		$.storemap.setStoreInfo();
		
		$('.opt_select_pop').hide();
	});
    
});

function getStoreDetail(param)
{
	var $viewr = $("#container");//.children("section").eq(0);
	$.storeView.init(param, function(){}, $viewr);
}
