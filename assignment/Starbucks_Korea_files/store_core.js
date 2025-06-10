/** 스토어 검색 **/
(function ($) {
    $.storemap = {
    		
    	geo_option : {
		  enableHighAccuracy: true, 
		  maximumAge        : 60000, 
		  timeout           : 5000    		
    	}
    	,
    	checkbox_init : function()
    	{
			$("INPUT:CHECKBOX").each(function(x,y){
				var inputCheckName = $(y).attr("name");
				if ( inputCheckName != "receive_info")
				{
					$(y).prop("checked", false);
					$(y).trigger("change");
					
					$option[inputCheckName] = false;
				}
			});
    	}
    	,
    	init : function(bool)
    	{
    		if ( $vo.appYN != "Y" )
    		{
    			$.commonLib.showLoadingImg();	
    		}
    		
    		
    		
    		if ($vo.ip_lat == "" || $vo.ip_long == "")
    		{

					
        		if (navigator.geolocation) 
        		{
        			$geo.watchid = navigator.geolocation.getCurrentPosition(
        						  function(position){

      								$geo.latitude = position.coords.latitude;
    								$geo.longitude = position.coords.longitude;
    								
    								$geo_backup.latitude = position.coords.latitude;
    								$geo_backup.longitude = position.coords.longitude;
    								
    								$.storemap.callbackGeo(bool);
        						  }
        						, function()
        						  {
        							$.storemap.getIpGeo(function(){
        								$.storemap.callbackGeo(bool);
        							});            							
        						  }
        						, $.storemap.geo_option
        			);
        		}
        		else
        		{
        			$.storemap.getIpGeo(function(){
        				$.storemap.callbackGeo(bool);
        			});
        		}    			
    		}
    		else
    		{
				$geo.latitude 			= $vo.ip_lat;
				$geo.longitude 			= $vo.ip_long;
				$geo_backup.latitude 	= $vo.ip_lat;
				$geo_backup.longitude 	= $vo.ip_long;
				$.storemap.callbackGeo(bool);    			
    		}
    		
    		
    	}
        ,
        callbackGeo : function(bool)
        {
        	//navigator.geolocation.clearWatch($geo.watchid);
    		if(bool) 
    		{
				var d = $.Deferred();
				d.addCallback(
					function()
					{
						if( $page == "")
						{
							$.storemap.setSidoGugun();	
						}
	                }
				).addCallback(
					function()
					{
						if( $page == "reserve")
						{
							$search.ins_lat 		= $geo_backup.latitude;
							$search.ins_lng 		= $geo_backup.longitude;
							$search.search_text 	= "";
							$search.p_sido_cd 		= "";
							$search.p_gugun_cd 		= "";
							$search.isError			= true;
							$search.in_distance 	= 0;
							$search.T03=1;
							$search.T01=0;
							$search.T12=0;
							$search.T09=0;
							$search.T06=0;
							$search.T10=0;
							$search.P10=0;
							$search.P50=0;
							$search.P20=0;
							$search.P60=0;
							$search.P30=0;
							$search.P70=0;
							$search.P40=0;
							$search.P80=0;
							$search.T20=0;
							$search.T22=0;
							$search.T29=0;
							$search.new_bool=0;		
							$search.in_biz_cd = "";
							$.storemap.setStoreInfo();		
						}
						else if($page == "drive")
						{
							$search.ins_lat 		= $geo_backup.latitude;
							$search.ins_lng 		= $geo_backup.longitude;						
							$search.search_text 	= "";
							$search.p_sido_cd 		= "";
							$search.p_gugun_cd 		= "";
							$search.isError			= true;
							$search.in_distance 	= 0;
							$search.T03=0;
							$search.T01=1;
							$search.T12=0;
							$search.T09=0;
							$search.T06=0;
							$search.T10=0;
							$search.P10=0;
							$search.P50=0;
							$search.P20=0;
							$search.P60=0;
							$search.P30=0;
							$search.P70=0;
							$search.P40=0;
							$search.P80=0;
							$search.T20=0;
							$search.T22=0;
							$search.T29=0;
							$search.new_bool=0;		
							$search.in_biz_cd = "";		
							$.storemap.setStoreInfo();		
						}
						else if($page == "community")
						{
							$search.ins_lat 		= $geo_backup.latitude;
							$search.ins_lng 		= $geo_backup.longitude;						
							$search.search_text 	= "";
							$search.p_sido_cd 		= "";
							$search.p_gugun_cd 		= "";
							$search.isError			= true;
							$search.in_distance 	= 0;

							$search.T03=0;
							$search.T01=0;
							$search.T12=1;
							$search.T09=0;
							$search.T06=0;
							$search.T10=0;
							$search.P10=0;
							$search.P50=0;
							$search.P20=0;
							$search.P60=0;
							$search.P30=0;
							$search.P70=0;
							$search.P40=0;
							$search.P80=0;
							$search.T20=0;
							$search.T22=0;
							$search.T29=0;
							$search.new_bool=0;		
							$search.in_biz_cd = "";		
							$.storemap.setStoreInfo();		
						}
						else if($page == "food")
						{
							$search.ins_lat 		= $geo_backup.latitude;
							$search.ins_lng 		= $geo_backup.longitude;						
							$search.search_text 	= "";
							$search.p_sido_cd 		= "";
							$search.p_gugun_cd 		= "";
							$search.isError			= true;
							$search.in_distance 	= 0;

							$search.T03=0;
							$search.T01=0;
							$search.T12=0;
							$search.T09=0;
							$search.T06=1;
							$search.T10=0;
							$search.P10=0;
							$search.P50=0;
							$search.P20=0;
							$search.P60=0;
							$search.P30=0;
							$search.P70=0;
							$search.P40=0;
							$search.P80=0;
							$search.T20=0;
							$search.T22=0;
							$search.T29=0;
							$search.new_bool=0;		
							$search.in_biz_cd = "";		
							$.storemap.setStoreInfo();		
						}	
						else if($page == "park")
						{
							$search.ins_lat 		= $geo_backup.latitude;
							$search.ins_lng 		= $geo_backup.longitude;						
							$search.search_text 	= "";
							$search.p_sido_cd 		= "";
							$search.p_gugun_cd 		= "";
							$search.isError			= true;
							$search.in_distance 	= 0;

							$search.T03=0;
							$search.T01=0;
							$search.T12=0;
							$search.T09=0;
							$search.T06=0;
							$search.T10=0;
							$search.P10=0;
							$search.P50=0;
							$search.P20=0;
							$search.P60=0;
							$search.P30=0;
							$search.P70=0;
							$search.P40=0;
							$search.P80=0;
							$search.T20=0;
							$search.T22=0;
							$search.T29=0;
							$search.new_bool=0;		
							$search.in_biz_cd = "9990";		
							$.storemap.setStoreInfo();		
						}	
						else if($page == "store_star_field")
						{
							
							$search.ins_lat 		= $geo_backup.latitude;
							$search.ins_lng 		= $geo_backup.longitude;						
							$search.search_text 	= "";
							$search.p_sido_cd 		= "";
							$search.p_gugun_cd 		= "";
							$search.isError			= true;
							$search.in_distance 	= 0;

							$search.T03=0;
							$search.T01=0;
							$search.T12=0;
							$search.T09=0;
							$search.T06=0;
							$search.T10=0;
							$search.P10=0;
							$search.P50=0;
							$search.P20=0;
							$search.P60=0;
							$search.P30=0;
							$search.P70=0;
							$search.P40=0;
							$search.P80=0;
							$search.T20=0;
							$search.T22=0;
							$search.T29=1;
							$search.new_bool=0;		
							//$search.in_biz_cd = "3266";
							$search.in_biz_cd = "";
							$search.in_biz_arrdata = "";
							$search.in_biz_cds = 0;		
							$.storemap.setStoreInfo();
						}else if($page == "menuStory_teavana")
						{
							
							$search.ins_lat 		= $geo_backup.latitude;
							$search.ins_lng 		= $geo_backup.longitude;						
							$search.search_text 	= "";
							$search.p_sido_cd 		= "";
							$search.p_gugun_cd 		= "";
							$search.isError			= true;
							$search.in_distance 	= 0;
							$search.iend            = 1000;
							$search.T03=0;
							$search.T01=0;
							$search.T12=0;
							$search.T09=0;
							$search.T06=0;
							$search.T10=0;
							$search.P10=0;
							$search.P50=0;
							$search.P20=0;
							$search.P60=0;
							$search.P30=0;
							$search.P70=0;
							$search.P40=0;
							$search.P80=0;
							$search.T20=0;
							$search.T22=0;
							$search.T29=1;
							$search.new_bool=0;		
							//$search.in_biz_cd = "3266";
							$search.in_biz_cd = "";
							$search.in_biz_arrdata = "";
							$search.in_biz_cds = 0;		
							$.storemap.setStoreInfo();
						}
						else if($page == "cold_brew")
						{
							$search.ins_lat 		= $geo_backup.latitude;
							$search.ins_lng 		= $geo_backup.longitude;						
							$search.search_text 	= "";
							$search.p_sido_cd 		= "";
							$search.p_gugun_cd 		= "";
							$search.isError			= true;
							$search.in_distance 	= 0;

							$search.T03=0;
							$search.T01=0;
							$search.T12=0;
							$search.T09=0;
							$search.T06=0;
							$search.T10=0;
							$search.P10=0;
							$search.P50=0;
							$search.P20=0;
							$search.P60=0;
							$search.P30=0;
							$search.P70=0;
							$search.P40=0;
							$search.P80=0;
							$search.T20=1;
							$search.T22=0;
							$search.T29=0;
							$search.new_bool=0;		
							$search.in_biz_cd = "";		
							$.storemap.setStoreInfo();		
						}
						else if($page == "nitro_cold_brew")
						{
							$search.ins_lat 		= $geo_backup.latitude;
							$search.ins_lng 		= $geo_backup.longitude;						
							$search.search_text 	= "";
							$search.p_sido_cd 		= "";
							$search.p_gugun_cd 		= "";
							$search.isError			= true;
							$search.in_distance 	= 0;
							$search.T03=0;
							$search.T01=0;
							$search.T12=0;
							$search.T09=0;
							$search.T06=0;
							$search.T10=0;
							$search.P10=0;
							$search.P50=0;
							$search.P20=0;
							$search.P60=0;
							$search.P30=0;
							$search.P70=0;
							$search.P40=0;
							$search.P80=0;
							$search.T20=0;
							$search.T22=1;
							$search.T29=0;
							
							$search.new_bool=0;		
							$search.in_biz_cd = "";
							$.storemap.setStoreInfo();		
						}	
						else
						{
							if ( $vo.new_store != "" )
							{
								$search.ins_lat 		= $geo_backup.latitude;
								$search.ins_lng 		= $geo_backup.longitude;	
								
								$search.search_text 	= "";
								$search.p_sido_cd 		= "";
								$search.p_gugun_cd 		= "";
								$search.in_biz_cds 		= 0;
								$search.in_scodes 		= 0;						
								$search.isError			= true;
								
								$search.in_biz_cd 		= "";
								$search.in_distance 	= 0;
								$search.iend 			= "100";
								$("INPUT[name='new_bool']").prop("checked", true);
								$.storemap.setStoreInfo();							
							}
							else
							{
								if( $vo.in_biz_cd != "" )
								{
									$search.ins_lat 		= $geo_backup.latitude;
									$search.ins_lng 		= $geo_backup.longitude;	
									
									$search.search_text 	= "";
									$search.p_sido_cd 		= "";
									$search.p_gugun_cd 		= "";
									$search.in_biz_cds 		= 0;
									$search.in_scodes 		= 0;						
									$search.isError			= true;
									
									$search.in_biz_cd = $vo.in_biz_cd;
									$search.in_distance 	= 0;
									$search.iend 			= "10";
									$.storemap.setStoreInfo();
								}
								else
								{
									if ( $vo.disp == "" || $vo.disp == "quick")
									{
										$search.ins_lat 		= $geo_backup.latitude;
										$search.ins_lng 		= $geo_backup.longitude;	
										$search.search_text 	= "";
										$search.p_sido_cd 		= "";
										$search.p_gugun_cd 		= "";
										$search.in_biz_cds 		= 0;
										$search.in_scodes 		= 0;						
										$search.isError			= true;
										$search.in_distance 	= 5;
										$search.in_biz_cd 		= "";	
										$search.iend 			= "30";
										$.storemap.setStoreInfo();
										
										if ( $vo.disp == "quick" )
										{
											var widthSize = $(window).width();
											if ( widthSize < 641 )
											{
												
												$('.store_map_layer').find('article.store_map_layer_cont').show();
												$('p.btn_opt_chk').show();
												$('.map_layer_toggle a').addClass('on');	
												store_map_layer_height = $(".store_map_layer").height();
												
											}										
										}
									}
									else if( $vo.disp=="locale")
									{
										var $this = $('.store_map_layer_cont header h3').eq(1);
										
										$('.store_map_layer_cont header h3').removeClass('on');
										$this.addClass('on');
										$('.store_map_layer_cont article').hide();
										$this.parent().next().show();
										
										$(".loca_step1").show();
										$(".loca_step2").hide();
										$(".loca_step3").hide();
										$.storemap.checkbox_init();		
										
						        		if ( $param.appYN != "Y" )
						        		{
						        			$.commonLib.hideLoadingImg();
						        		}										
										var widthSize = $(window).width();
										if ( widthSize < 641 )
										{
											
											$('.store_map_layer').find('article.store_map_layer_cont').show();
											$('p.btn_opt_chk').show();
											$('.map_layer_toggle a').addClass('on');
											
											
											
											setTimeout(function(){
												store_map_layer_height = $(".store_map_layer").height();
												//alert("store_map_layer_height :: " + store_map_layer_height);
											},500);
											
											
										}
										
									}
								}							
								
							}
						}
	                }
				);
                d.callback();
    		}
        },
        setStoreInfo : function()
        {
        	
        	
        	
        	
        	if ( $search.search_text == "")
        	{
        		if ( $search.p_sido_cd != "" ||  $search.p_sido_cd != "" )
        		{
        			$mode = "C";
        			$search.searchType = "C";        			
        		}
        		else
        		{
        			$mode = "A";
        			$search.searchType = "A";
        		}
        	}
        	else
        	{
    			$mode = "B";
    			$search.searchType = "B";        		
        	}
        	
    		if( $search.in_scodes > 0 ) //즐겨찾기 매장 검색
        	{
        		$mode="D";
        		$search.iend = "30";
        		$search.searchType = "D";
        	}
    		
    		if( $search.in_biz_cds > 0 ) //즐겨찾기 매장 검색
        	{
        		$mode="E";
        		$search.searchType = "E";
        	}
    		
    		var setDateStr = $("#r_pickdate").val();
    		
    		
    		
    		if( !(setDateStr) )
    		{
    			$search.set_date = "";
    		}
    		else
    		{
        		if( setDateStr != "")
        		{
        			setDateStr = setDateStr.replace(/-/gi,"");
        			
        			
        			
        			$search.set_date = setDateStr;
        		}
        		else
        		{
        			$search.set_date = "";
        		}
    		}
    		
    		/** 골드카드 **/
    		if ( $store_pop == "goldcard" )
    		{
    			$search.gold_card = 1;
    		}
    		
    		
    		
    		
    		$.each($option, function(index,value){
    			if ( value )
    			{
    				$search[index] = 1;
    			}
    			else
    			{
    				$search[index] = 0;
    			}
    		});
    		
    		if ( $vo.espresso  != "" )
    		{
    			$search["T04"] = 1;
    		}
    		else if($vo.new_store != "")
    		{
    			$search["new_bool"] = 1;
    		}
    		else if($vo.premiere_food != "")
    		{
    			$search["T06"] 			= 1;
    			$search.iend   			= "100"; 
    			$search.in_distance 	= 0;
    		}
    		else if($vo.cold_blew  != "" && $vo.T20 != undefined)
    		{
    			$search["T20"] 			= 1;
    			$search.iend   				= "100"; 
    			$search.in_distance 		= 0;
    		}    		
    		    	    		
    		    		
    		

    		if ( $search.p_sido_cd != "")
    		{
    			if ( $search.p_gugun_cd == "" )
    			{
    				$search.iend = "1000";
    			}
    		}

			//[픽업존 관리시스템 개선] 메장 전체 목록 조회 테마 (T20: 콜드브루 , T01: 드랴이브 스루, T03: 리저브, T22: 나이트로 콜드브루, T27: 워크스루, T48 : 에코매장) 
			var allSearchThemes = ["T20", "T01", "T03", "T22", "T27" , "T48"];
			for (var i = 0; i < allSearchThemes.length; i++) {
				if ($search[allSearchThemes[i]] == "1") {
					$search.iend = "1000";
					$search.in_distance = "500";
					break;
				}
			}
			
			/** ajax 캐시문제를 해결하기 **/
			var rndCod = randomString();
			var storeInterfaceUrl = "/store/getStore.do?r="+rndCod;

			__ajaxCall( storeInterfaceUrl ,$search, true, "json", "post",
					function (_response) 
					{
						var $offset = { x:0 , y:0	};
						var $image  = {};
							$image.store 	= $pin.store;
							$image.reserve 	= $pin.reserve;
						$.storemap.createMapContents(_response.list, $image, $offset, $search);
						
						if ( _response.list.length > 0 )
						{
							if ( $page == "reserve")
							{
								$(".store_reserve_count_text").html( _response.list.length + "곳");
							}
							if ( $page == "food")
							{
								$(".store_food_count_text").html(_response.list.length);
								for (var i in _response.list) {
									var $option = $('<option value="' + _response.list[i].s_biz_code + '" data-lat="' + _response.list[i].lat + '" data-long="' + _response.list[i].lot + '" data-index="' + [i] + '">' + _response.list[i].s_name + '</option>');
									$("[name='store_select']").append( $option );
								}
							}
							if ( $page == "store_star_field")
							{
								$('.store_star_field_count_text').html(_response.list.length + "개")
								for (var i in _response.list) {
									var $option = $('<option value="' + _response.list[i].s_biz_code + '" data-lat="' + _response.list[i].lat + '" data-long="' + _response.list[i].lot + '" data-index="' + [i] + '">' + _response.list[i].s_name + '</option>');
									$("[name='store_select']").append( $option );
								}
							}
							if ( $page == "menuStory_teavana")
							{
								$('.teavana_shop_num').html(_response.list.length);							
							}
							
							
							if ( $page == "cold_brew")
							{
								$(".coldbrew_cnt").html( _response.list.length);
							}	
							if ( $page == "nitro_cold_brew")
							{
								$(".nitro_coldbrew_cnt").html( _response.list.length);
							}							
						}
			        }
					, 
					function(_error)
					{
					}
	    	);          	
        	
        }
        ,
        createMapContents : function($rows, $image, $offset, $vo)
        {
        	
        	if ( $rows.length > 0)
        	{
        		
        		if ( $vo.searchType == "C")
        		{
            		if ($rows.length >= 50)
            		{
            			$(".sidoSetResult").html($rows.length);
            		}
            		else
            		{
            			$(".sidoSetResult").html($rows.length);
            		}
            		
            		$(".quickSearchResultBoxSidoGugun").html("");	
        			
        		}
        		else
        		{
            		if ($rows.length >= 50)
            		{
            			$(".resultCtnNumberTab1").html($rows.length);
            		}
            		else
            		{
            			$(".resultCtnNumberTab1").html($rows.length);
            		}
    				
    				
    				if( $vo.search_text != "")
    				{
    					$("#quickSearchText").val("");
    					$(".quickSearchResultCtn").html($vo.search_text);
    				}
    				$(".quickSearchResultMsg").hide();
    				$(".quickSearchResultBox").empty();     
    				   
        			
        		}

				
				$.daum.closeInfoWindow(function(){
					$.daum.markerRemove(); 
				});
				
    			$marker 		= new Array();
    			$infowindow		= new Array();				
				//모바일인지 아닌지 판별 
    			function isMobile() {
    			    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    			}
    			
        		jQuery.each( $rows , function(x,y){
        			
        			
        			//if ( x < 60)
        			//{
        				
        				var cdn_domain = $config.imgUploadPath;
    					var $paramOption = {};
    					if (  y.theme_state != null )
    					{
							if ( y.theme_state.indexOf("T01") > -1 && y.theme_state.indexOf("T03") > -1 )	//해당 매장이 리저브DT라면
							{
								$paramOption.makerClass = "pin_reserveDT";
								$paramOption.image = cdn_domain+"/common/img/store/pin/pin_reserve_DT.png?v=210802";   
							}
							else if ( y.theme_state.indexOf("T03") > -1 )	//해당 매장이 리저브라면
							{
								$paramOption.makerClass = "pin_reserve";
								$paramOption.image = cdn_domain+"/common/img/store/pin/pin_reserve.png?v=210802";   
							}
							else if ( y.theme_state.indexOf("T01") > -1 )	//해당 매장이 DT라면
							{
								$paramOption.makerClass = "pin_generalDT";
								$paramOption.image = cdn_domain+"/common/img/store/pin/pin_general_DT.png";   
							}
							else if ( y.theme_state.indexOf("T27") > -1 )	//[픽업존 관리시스템 개선] 워크스루 아이콘 추가
							{
								$paramOption.makerClass = "pin_generalWT";
								$paramOption.image = cdn_domain+"/upload/common/img/icon/pin_general_wt.png";
							}
	    					else
	    					{
	    						$paramOption.makerClass = "pin_general";
	    						$paramOption.image = cdn_domain+"/common/img/store/pin/pin_general.png";        							
	    					}
    					}
    					else
    					{
    						$paramOption.makerClass = "pin_general";
    						$paramOption.image = cdn_domain+"/common/img/store/pin/pin_general.png";        							
    					}

    		    		$paramOption.lat = y.lat;
    					$paramOption.lot = y.lot;
    					
    					var setIconConvert = "";
    					
    					
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T01");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T03");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T27"); //[픽업존 관리시스템 개선] 워크스루 아이콘 추가
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T12");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T09");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T10");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P10");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P50");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P20");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P60");
    					//setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P50");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P70");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P40");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P80");
    					//setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T04");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T20");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T22"); //나이트로 콜드브루
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T21"); //현금없는 매장
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T05"); //피지오
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.whcroad_yn, "WHCROAD");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P90");
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P01");// 전기차 충전소
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T30"); //2019.10.24 매장찾기 검색옵션 내 '블론드' 속성(T30) 추가
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T36"); //2020.03.26 매장찾기 검색옵션 내 '식약처 위생등급제 인증' 속성(T36) 추가
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T43"); //20210401 '딜리버스' 서비스 추가
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T48"); //20210407 '에코매장' 서비스 추가
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "Z9999"); //20230327 21시 이후 영업 종료 매장 추가
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "P02"); //20231226 펫 존 매장 추가
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T64"); //241205 나우 브루잉 매장 추가
    					setIconConvert = setIconConvert + $.storemap.setIncon(y.theme_state, "T66"); //241205 패스트 서브 매장 추가

    					
    					if( y.gugun_name == "" || y.gugun_name == null || y.gugun_name == "null")
    					{
    						var gugun_string = "";
    					}
    					else
    					{
    						var gugun_string = y.gugun_name;
    					}
    					
						if ( y.doro_address == "")
						{
							var storeAddress = y.sido_name + " " + y.gugun_name + " " + y.addr;
						}
						else
						{
							var storeAddress = y.doro_address;
						}
					
						
    					var iwContent =
    						'<div class="map_marker_pop">' +
    							'<header>'+y.s_name+'</header>'+
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
    										'<p class="addr">'+storeAddress+'</p>'+
    										'<p class="tel">';
    										
    					// 모바일인 경우에만 전화번호 연결할 수 있게 설정  
    					if(isMobile()){
    						iwContent += '<a href="tel:'+y.tel+'">'+y.tel+'</a>' ;
    					}else{
    						iwContent += y.tel;
    					}
    					
				    					iwContent += 
				    							'</p>' +
				    						 '<a class="btn_marker_detail" href="javascript:getStoreDetail(\''+y.s_biz_code+'\');">상세 정보 보기</a>' +
										 '</div>' +
									 '</div>' +
								'</article>'+
							'</div>';
    					
    					
    					$.daum.markerCreate($paramOption, iwContent, $offset, x);
    					
    					if ( $drag )
    					{
        					var iLstBox =  '';
        					

        					iLstBox += '<li class="quickResultLstCon" style="background:#fff" data-lat="'+y.lat+'" data-long="'+y.lot+'" data-index="'+x+'" data-name="'+y.s_name+'" data-code="'+y.s_biz_code+'" data-storecd="'+y.s_code+'" data-hlytag="'+y.hlytag+'" >';
        					
        					var hlytagMsg = "";
        					if (y.hlytag == "4")
        					{
        						hlytagMsg = "[휴점]"
        					}
        					
        					var newTag = "";
        					if ( y.new_icon == "Y")
        					{
        						newTag = '<img alt="" src="//image.istarbucks.co.kr/common/img/store/icon_nstore.png" class="mCS_img_loaded">';
        					}
        					
        					
    						if ( y.favorites > 0 )
    						{
    							iLstBox += '	<strong data-store="'+y.s_code+'" data-yn="Y" data-name="'+y.s_name+'" data-my_siren_order_store_yn="' + y.my_siren_order_store_yn + '">'+y.s_name+' '+hlytagMsg+' '+newTag+'</strong>';    							
    						}
    						else
    						{
    							iLstBox += '	<strong data-store="'+y.s_code+'" data-yn="N" data-name="'+y.s_name+'" data-my_siren_order_store_yn="' + y.my_siren_order_store_yn + '">'+y.s_name+' '+hlytagMsg+' '+newTag+'</strong>';
    						}	
    						
    						iLstBox += '	<p class="result_details">'+storeAddress+'<br>';
    						
    						// 모바일인 경우에만 전화번호 연결할 수 있게 설정  
    						if(isMobile()){
    							iLstBox += '<a href="tel:'+y.tel+'">'+y.tel+'</a>';
    						}else{
    							iLstBox += y.tel;	
    						}
    						
    						iLstBox += '</p>';
    						
        					if ( $store_pop != "window")
        					{
        						iLstBox += '	<p class="btn_select_store"><a href="javascript:void(0)" class="popStoreClick"  data-lat="'+y.lat+'" data-long="'+y.lot+'" data-index="'+x+'" data-name="'+y.s_name+'" data-code="'+y.s_biz_code+'" data-storecd="'+y.s_code+'" data-hlytag="'+y.hlytag+'">선택</a></p>';
        					}
        					
        					iLstBox += '	<i class="'+$paramOption.makerClass+'">리저브 매장 2번</i>';
        					iLstBox += '</li>';
        					//quickSearchResultBoxSidoGugun
        					
        					
        					if ( $vo.searchType == "C")
        					{
        						$(".loca_step1").hide();
        						$(".loca_step2").hide();
        						$(".loca_step3").show();
        						
        						$(".quickSearchResultBoxSidoGugun").append(iLstBox);	
        						//$(".quickResultLstConSido").unbind("click").on("click", $.storemap.quickSearchClick);  
        					}
        					else
        					{
        						$(".quickSearchResultBox").append(iLstBox);
        						
        					}
    					}
        			//}
        		});
        		
        		$(".quickSearchBtn").focus();
        		
        		if ( $param.appYN != "Y" )
        		{
        			$.commonLib.hideLoadingImg();
        		}
        		
        		
        		if ( $param.appYN == "Y" )
        		{
					$("#container").addClass("app");
					if ( $param.in_biz_cd  != "" )
					{
						getStoreDetail($param.in_biz_cd);
					}
        		}
        		
        		$(".popStoreClick").on("click", function(){
        			if ( $store_pop != "window" )
        			{
        				var index = $(".popStoreClick").index(this);
            			var code = $(this).data("code");
            			var name = $(this).data("name");
            			
            			var $parent =  $(this).parent().parent();
            			var $target = $parent.find(".result_details");
            			
            			var addr = $target.html().replace("<br>", " | ");
            			var s_cd = $(this).data("storecd");
            			var hlytag = $(this).data("hlytag");
            			
            			if ( $store_pop == "cake" )
            			{
            				if ( hlytag == "4")
            				{
            					alert("휴점 매장은 선택하실 수 없습니다.");
            					return;
            				}
            				else
            				{
            					/*
            					if ( s_cd == "448" 	||  s_cd == "287" || s_cd == "527" || s_cd == "912" || s_cd == "833"  || s_cd == "933"  || s_cd == "480"  || s_cd == "664"  || s_cd == "547"  || s_cd == "719" || s_cd == "972"	|| s_cd == "950"  || s_cd == "521"  || s_cd == "748" 
            						||  s_cd == "411" || s_cd == "304" || s_cd == "285" || s_cd == "373"  || s_cd == "284"  || s_cd == "112"  || s_cd == "447"  || s_cd == "459"  || s_cd == "521" || s_cd == "195"	|| s_cd == "514"  || s_cd == "451"  || s_cd == "480" 
            						||  s_cd == "547" || s_cd == "527" || s_cd == "448" || s_cd == "308"  || s_cd == "13"  || s_cd == "54"    || s_cd == "62"  || s_cd == "282"  || s_cd == "286" || s_cd == "287"	|| s_cd == "186"  || s_cd == "40"  || s_cd == "950" || s_cd == "915"
            						||  s_cd == "912" || s_cd == "933" || s_cd == "664" || s_cd == "748"  || s_cd == "719"  || s_cd == "602"  || s_cd == "833" || s_cd == "110" || s_cd == "937" 
            							
            					)
            					{
            						alert("해당 매장은 케익 수령이 불가한 매장입니다. 이점 양해 부탁 드립니다.");
            						return;
            					}
            					else
            					{
            					*/
                    				$store_cake = {};
                    				$store_cake.store_name 		= name;
                    				$store_cake.store_biz_code 	= code;
                    				$store_cake.store_code 		= s_cd;   
                    				
                	    			$('.pop_up_dimm, .pop_gcard_store_map').fadeOut("fast", function(){
                						// 150604 성연욱 추가 - 팝업 초기화
                						$('div.box_info dl.box_tabmenu dt').removeClass('on');
                						$('div.box_info dl.box_tabmenu dd.panel').hide();
                						// 150604 성연욱 추가 - 팝업 초기화 end    				

                						$(".setStoreInfoBox").html('선택하신 수령 매장은 <span>'+name+' </span> 입니다. <a href="/store/store_map.do?in_biz_cd='+code+'" target="_blank">매장 상세 보기</a>');
                						$(".setStoreInfoBox").show();
                	    			});             						
            					//}
            				}
            			}
            			else
            			{
            				/* 매장선택 시 값 셋팅(골드카드 신청 시 사용) */
            				$("#storeCode").val(code);
            				$("#storeName").val(name);
            				
            				$('.pop_gcard_store_map').fadeOut();
            				
            				// 150604 성연욱 추가 - 팝업 초기화
            				$('div.box_info dl.box_tabmenu dt').removeClass('on');
            				$('div.box_info dl.box_tabmenu dd.panel').hide();
            				
            				$(".btn_find_store").hide();
            				
            				if ($store_pop == "planner")
                			{
            					$("h2.btn_find_store").show();
            					$('.pop_gcard_store_ttl strong').html(name+"점 마이 홀리데이 매트(증정용) 수량 현황");
            					
        						var objParam = {
        								 "store_cd"    : code
        								,"storeName"    : name
        							};
        						
        							var url = "/planner/getPlannerLeftCount.do";
        							
        							___ajaxCall(url, objParam, false, "json", "post"
        								,function (data) {
	        								var planner_skyblue = "재고 없음";
	        								var planner_yellow = "재고 없음";
	
	        								$('.stockPop').fadeIn();
	        								
	        								if (data.list.length > 0 && data.list[0] != null) {
	        									if (data.list[0].sky_BLUE_COUNT != null &&  data.list[0].sky_BLUE_COUNT > 0) {
	        										planner_skyblue = data.list[0].sky_BLUE_COUNT;
	        									}
	        									if (data.list[0].yellow_COUNT != null &&  data.list[0].yellow_COUNT > 0) {
	        										planner_yellow = data.list[0].yellow_COUNT;
	        									}
	        								} else {
	        									alert(name + "점은 매트(증정용)가 모두 소진 되었습니다.");
	        								}
	
	        								var noticeTmp = '<tr><td>' + planner_yellow + '</td><td>' + planner_skyblue + '</td></tr>';
	        								$('#lestcnt').html(noticeTmp);
        								}
        							);
        							
                			}else{
                				//if (confirm("스타벅스 " + name + "점을 선택하시겠습니까?")) {
                				
                				$('.pop_up_dimm, .pop_gcard_store_map').fadeOut();
                				
                				if ( $store_pop == "goldcard")
                				{
                					$("h2.btn_find_store").show();
                				}
   				
                			}
            				
            				$(".gcard_store_addr").html('<strong>' + name + '점</strong> | ' + addr);
            				$(".gcard_store_addr, .btn_chg_store").show(); 
            				
            			}         				
        			}
       			
        		});
        		
        		$(".quickResultLstCon").on("click", $.storemap.quickSearchClick);
        		
        		if ($page.indexOf('store_star_field') > -1 || $page.indexOf('reserve') > -1 ||  $page.indexOf('menuStory_teavana') > -1) {
        			$.storemap.getRecentLocation();

					var recent_lat = $geo.latitude;
					var recent_long = $geo.longitude;

					// 별다방 위치
					var center_lat = 37.5602013;
					var center_long = 126.9829327;

					if (recent_lat && recent_long) {
						var min_distance = 10000;
						$.each($rows, function(i, item){
							var cal_distance = $.storemap.haversine_distance(recent_lat, recent_long, $rows[i].lat, $rows[i].lot)
							if (cal_distance < min_distance) {
								center_lat = $rows[i].lat;
								center_long = $rows[i].lot;
								min_distance = cal_distance;
							}
	        			});
					}

					var markerPosition = new daum.maps.LatLng(center_lat, center_long);
					$map.map.setCenter(markerPosition);
        			return;
        		} 
    			setTimeout(function(){
					var _move={};
					 	_move.latitude = $rows[0].lat;
					 	_move.longitude = $rows[0].lot;
					
					if ( $vo.isError != false )
					{
						$.daum.mapMove(_move, function(){
							$.daum.setLevel(3);
						});						
					}

    			}, 500);
        		//$.daum.setBounds();
        		
        	}
        	else
        	{
        		if ( $vo.isError != false )
        		{
            		if ( $vo.searchType == "C")
            		{
            			$(".quickSearchResultBoxSidoGugun").empty(); 
            			$(".sidoSelectName").html("");
            			$(".sidoSetResult").html(0);
            			
    					$(".loca_step1").show();
    					$(".loca_step2").hide();
    					$(".loca_step3").hide();          			
            			alert("해당 지역에 소속된 매장정보를 찾을 수 없습니다.\n다른 지역을 검색해주세요.");
            		}
            		
            		if ( $vo.searchType == "B")
            		{
            			alert("해당 검색어에 따른 매장 정보가 존재하지 않습니다.");
            		}        			
            		
            		if ( $vo.searchType == "A" || $vo.searchType == "D" || $vo.searchType == "E" )
            		{
            			alert("해당 조건과 일치하는 매장 정보가 존재하지 않습니다.");
            		}                 		
        		}
        		
        		return;
        	}
        	
        }
        ,
    	quickSearchClick : function(e)
    	{

    		var $target = $(e.target);
    		
    		var $targetClass = $target.attr("class");
    		
    		if ( $targetClass == undefined )
    		{
    			$targetClass = "none";
    		}
    		
    		
    		if ( $targetClass.indexOf("setStoreFavBtn") <= -1 )
    		{
        		var thisLat 	= $(this).data("lat");
        		var thisLot 	= $(this).data("long");
        		var thisIndex	= $(this).data("index");
        		var param = {};
        		
        			if ($(window).width() > 640 || $(window).width() < 376){
        				param.latitude = thisLat;
        			}else{
        				param.latitude = Number(thisLat) + 0.00085
        			}
        			//param.latitude = thisLat;
        			param.longitude = thisLot;
        			
    			$.daum.closeInfoWindow(function(){
    	    		$.daum.mapMove(param, function(){
    	    			//$.daum.setLevel(1);e
    	    			
    					/**
    	    			setTimeout(function(){
    	    				$.daum.setLevel(1);
    	    			}, 500);
    					**/
    	    			
    	    			$.daum.showInfoWindow(thisIndex);
    	    			
    	    			
    	    		});
    			});  
    			
    			var getWindowWidth = $(window).width();
    			
    			if ( getWindowWidth < 641 )
    			{
    				$('.store_map_layer').find('article.store_map_layer_cont').hide();
    				
    				
    				$('.find_store_wrap').css({
						'height':'118px'
					});
    				
    				$('.map_layer_toggle a').removeClass('on');	
    				//$(".store_map_layer").height( $(".store_map_layer_ttl").height() );
    			}
    			
    			if ( $vo.appYN == "Y" )
    			{
    				$('.store_map_layer').find('article.store_map_layer_cont').hide();
    				$('p.btn_opt_chk').hide();
    				$('.map_layer_toggle a').removeClass('on');
    				//$('.map_layer_toggle a, .result_list ul li, .result_list2 ul li, .result_list3 ul li').trigger("click");
    				
    			} 
    			else
    			{
    				var getWindowWidth = $(window).width();
    				
    				if ( getWindowWidth < 641 )
    				{
    					$('.store_map_layer').find('article.store_map_layer_cont').hide();
        				$('.find_store_wrap').css({
    						'height':'118px'
    					});
    					$('.map_layer_toggle a').removeClass('on');	
    					//$(".store_map_layer").height( $(".store_map_layer_ttl").height() );
    				}
    			}
    			    			
    		}

			
			


    	
    	}
        ,
        setIncon : function(theme, type)
        {
        	if( theme != null )
        	{
            	if ( theme.indexOf(type) >-1 )
            	{ /* 240124 아이콘 이미지 경로 수정 시작 */
            		if( type == "T01") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon03.png' />"; }		//드라이브 스르라면
            		if( type == "T03") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon01.png' />"; }		//리저브라면
            		if( type == "T12") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon02.png' />"; }		//커뮤니티 스토오라면
            		if( type == "T09") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon04.png' />"; }		//주차라면
            		if( type == "T10") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon05.png' />"; }		//외화결제라면
            		if( type == "P10") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon07.png' />"; }		//공항내
            		if( type == "P50") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon09.png' />"; }		//해안가
            		if( type == "P20") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon08.png' />"; }		//대학가 //240125 src 수정
            		if( type == "P60") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon12.png' />"; }		//터미널/기차역
            		if( type == "P50") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon11.png' />"; }		//리조트
            		if( type == "P70") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon13.png' />"; }		//병원
            		if( type == "P40") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon10.png' />"; }		//입점
            		if( type == "P80") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon14.png' />"; }		//지하철 인접
            		if( type == "T04") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon16.png' />"; }		//에스프레스 초이스 //240125 src 수정
            		if( type == "T20") {	return ""; }		//콜드브루
            		if( type == "T22") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon18.png' />"; }		//나이트로콜드브루
            		if( type == "WHCROAD") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon19.png' />"; }	//휠체어 접근
            		if( type == "T21") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon20.png' />"; }		//현금없는 매장
            		if( type == "P90") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon21.png' />"; }		//공기청정기
            		if( type == "P01") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/EV_icon_map.png' />"; }		//전기차충전소
            		if( type == "T05") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon22.png' />"; }		//피지오
            		if( type == "T30") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon23.png' />"; }		//2019.10.24 매장찾기 검색옵션 내 '블론드' 속성(T30) 추가
            		if( type == "T36") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_24.png' />"; }		//2020.03.26 매장찾기 검색옵션 내 '우수위생 관리 인증' 속성(T36) 추가
            		if( type == "T27") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_wt.png' />"; }		//[픽업존 관리시스템 개선] 워크스루 아이콘 추가
            		if( type == "T43") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_delivers_service.png' />"; }		//20210401 '딜리버스' 서비스 추가
            		if( type == "T48") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_eco_service.png' />"; }		//20210407 '에코매장' 서비스 추가
            		if( type == "Z9999") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/Moon_icon_16x16_230324.png' />"; }   //230324 21이후 오픈 매장 추가
            		if( type == "P02") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_pet_01.png' />"; }   //231226 펫 존 매장 추가
					if( type == "T64") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_now_brewing.png' />"; } //241205 나우 브루잉 매장 추가
					if( type == "T66") {	return "<img src='https://image.istarbucks.co.kr/upload/common/img/icon/icon_fast_serve.png' />"; } //241205 패스트 서브 매장 추가
            	} /* 240124 아이콘 이미지 경로 수정 끝 */
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
        ,
        setSidoGugun : function()
        {
        	var tempSido 	= '<li><a href="javascript:void(0);" class="set_sido_cd_btn" data-sidocd="${sido_cd}">${sido_nm}</a></li>';
        	var tempGugun 	= '<li><a href="javascript:void(0);" class="set_gugun_cd_btn" data-sidocd="${$item.isSidoCD()}" data-sidonm="${$item.isSidoNM()}" data-guguncd="${gugun_cd}">${gugun_nm}</a></li>';
        	$.template( "sidoUiCtrl", tempSido );
        	$.template( "gugunUiCtrl", tempGugun );
      		
			__ajaxCall("/store/getSidoList.do", {}, true, "json", "post",
					function (_response) 
					{
        				if ( _response.list.length > 0 )
        				{
        					$(".sido_arae_box").html("");
            				$.tmpl( "sidoUiCtrl" , _response.list, {}).appendTo( ".sido_arae_box" );

            				/**
    						$('.loca_step1_cont').mCustomScrollbar({
    							axis:"y",
    							advanced:{autoExpandHorizontalScroll:true}
    						});
    						**/
    						      						
    						
            				$(".set_sido_cd_btn").on("click", function(e){
            					var sido 	= $(this).data("sidocd");
            					var sido_nm	= $(this).text();
            					
            					$(".setSidoNm").html(sido_nm);
            					
            					
            					if ( sido == "17") //세종시는 구군이 없어 바로 검색한다.
            					{
            						
            						$(".loca_step1").hide();
            						$(".loca_step2").hide();
            						$(".loca_step3").show();
            						
            						$(".gugunSelectName").html(sido_nm);
            						
            						$vo.ip_lat					=  "";
            						$vo.ip_long					=  "";
            						$vo.espresso				=  "";
            						$vo.new_store				=  "";
            						$vo.premiere_food			=  "";
            						
            						
            						$search.ins_lat 		= $geo_backup.latitude;
            						$search.ins_lng 		= $geo_backup.longitude;						
            						$search.search_text 	= "";
            						$search.p_sido_cd 		= sido;
            						$search.p_gugun_cd 		= "";
            						$search.in_distance 	= 0;
            						$search.isError			= true;
            						$search.in_biz_cd 		= "";
            						$search.in_biz_cds 		= 0;
            						$search.in_scodes 		= 0;
            						$search.iend 			= "100";
            						$.storemap.checkbox_init();
            						
            						$.storemap.setStoreInfo();
            					}
            					else
            					{
                					__ajaxCall("/store/getGugunList.do", {"sido_cd":sido}, true, "json", "post",
                							function (_response) 
                							{
                								$(".gugun_arae_box").html("");
                								//$("#gugun_arae_box").mCustomScrollbar("destroy");
                								
                		        				if ( _response.list.length > 0 )
                		        				{
                		        					$(".gugun_arae_box").empty();
                		        					$(".sidoSelectName").html(sido_nm);
                		            				$.tmpl( "gugunUiCtrl" , _response.list, {
                		            					isSidoCD : function()
                		            					{
                		            						return sido;
                		            					}
                		            					,
                		            					isSidoNM : function()
                		            					{
                		            						return sido_nm;
                		            					}                		            					
                		            					
                		            				}).appendTo( ".gugun_arae_box" );
                		            				
                		            				/* 매장 재고 조회일 경우는 지역검색 전체 제외 */
                		            				if( $store_pop != 'planner') {
                		            					$(".gugun_arae_box").prepend('<li><a href="javascript:void(0);" class="set_gugun_cd_btn" data-sidocd="'+sido+'" data-sidonm="'+sido_nm+'" data-guguncd="">전체</a></li>');
                		            				}
                		            				/**
                		    						$('.loca_step2_cont').mCustomScrollbar({
                		    							axis:"y",
                		    							advanced:{autoExpandHorizontalScroll:true}
                		    						});
                		    						**/                		            				
                		    						
                		        					$('.loca_step1').hide();
                		        					$('.loca_step2').show();
                		        					
                		        					$(".set_gugun_cd_btn").on("click", function(){
                		        						var sido_cd = $(this).data("sidocd");
                		        						var sido_nm = $(this).data("sidonm");
                		        						var gugun_cd = $(this).data("guguncd");  
                		        						var gugun_nm = $(this).text();   
                		        						
                		        						if ( gugun_cd == "")
                		        						{
                    		        						$(".gugunSelectName").html(sido_nm + " 전체");
                    		        						
                    		        						$vo.ip_lat					=  "";
                    		        						$vo.ip_long					=  "";
                    		        						$vo.espresso				=  "";
                    		        						$vo.new_store				=  "";
                    		        						$vo.premiere_food			=  "";
                    		        						$search.ins_lat 		= $geo_backup.latitude;
                    		        						$search.ins_lng 		= $geo_backup.longitude;					
                    	            						$search.search_text 	= "";
                    	            						$search.p_sido_cd	 	= sido_cd;
                    	            						$search.p_gugun_cd	 	= "";
                    	            						$search.in_distance 	= 0;
                    	            						$search.in_biz_cd 		= "";
                    	            						$search.in_biz_cds 		= 0;
                    	            						$search.in_scodes 		= 0;                	            						
                    	            						$search.isError			= true;
                    	            						
                    	            						$.storemap.checkbox_init();
                    		        						$.storemap.setStoreInfo();
                    		        						
                    	            						$(".loca_step1").hide();
                    	            						$(".loca_step2").hide();
                    	            						$(".loca_step3").show();                  		        							
                		        						}
                		        						else
                		        						{
                    		        						$(".gugunSelectName").html(sido_nm + " " + gugun_nm);
                    		        						
                    		        						$vo.ip_lat					=  "";
                    		        						$vo.ip_long					=  "";
                    		        						$vo.espresso				=  "";
                    		        						$vo.new_store				=  "";
                    		        						$vo.premiere_food			=  "";
                    		        						$search.ins_lat 		= $geo_backup.latitude;
                    		        						$search.ins_lng 		= $geo_backup.longitude;					
                    	            						$search.search_text 	= "";
                    	            						$search.p_sido_cd	 	= sido_cd;
                    	            						$search.p_gugun_cd	 	= gugun_cd;
                    	            						$search.in_distance 	= 0;
                    	            						$search.in_biz_cd 		= "";
                    	            						$search.in_biz_cds 		= 0;
                    	            						$search.in_scodes 		= 0;                	            						
                    	            						$search.isError			= true;
                    	            						$search.iend 			= "100";
                    	            						
                    	            						$.storemap.checkbox_init();
                    		        						$.storemap.setStoreInfo();
                    		        						
                    	            						$(".loca_step1").hide();
                    	            						$(".loca_step2").hide();
                    	            						$(".loca_step3").show();                  		        							
                		        						}
              		        						
                		        						
                		        					});
                		        				}						
                					        }
                							, 
                							function(_error)
                							{
                							}
                			    	);             						
            						
            					}
            					
            					
            					
            				});
        				}						
			        }
					, 
					function(_error)
					{
					}
	    	);  
			
			        	
        },
        getIpGeo : function(callback) {
	    	if ( $vo.appYN == "Y" ) {
        		alert("위치정보를 설정하지 않아 임의 위치로 검색됩니다.");
        		
	        	$geo.latitude  = 37.56682;
	        	$geo.longitude = 126.97865;
				$geo_backup.latitude =  37.56682;
				$geo_backup.longitude = 126.97865;   	
				callback();        		
        	}
	    	else {
            	        	$geo.latitude  = 37.56682;
            	        	$geo.longitude = 126.97865;
    						$geo_backup.latitude =  37.56682;
    						$geo_backup.longitude = 126.97865; 
    						
    						callback();
            	        }
    	},
    	getRecentLocation : function () {
    		navigator.geolocation.getCurrentPosition(function(position){
				$geo.latitude = position.coords.latitude;
				$geo.longitude = position.coords.longitude;
            	});
    	},
    	haversine_distance: function (lat1,lng1,lat2,lng2) {

    		var R = 6371; // Radius of the earth in km 
    		var dLat = (lat2-lat1)*(Math.PI/180); 
    		var dLon = (lng2-lng1)*(Math.PI/180); 
    		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos((Math.PI/180)*(lat1)) * Math.cos((Math.PI/180)*(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    		var d = R * c; // Distance in km 
    		return d;
				
        	}
        	
    };
})(jQuery);

$(document).ready(function(){
	setTimeout(function(){
		$.commonLib.hideLoadingImg();
	},5000);
})