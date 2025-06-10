/**오픈이벤트 컨트롤**/
$(document).ready(function(){
	$('.campaign_renew_each p.btn_renew_open02').bind('click', function(){
		var y = $(window).scrollTop();
		$(".campaign_veiw_info").css('top', y + "px");
		
		console.log( $(".pop_renew_regist").height() );
		
		
		
		__ajaxCall("/openevent/getCount.do",{}, true, "json", "post",
				function (data) 
				{
					if (data.error_code == "0")
					{
						console.log(data.list);
						var all_regist_cnt = data.list[0].all_regist_cnt;
						var my_regist_cnt = data.list[0].my_regist_cnt;
						
						$(".evtReg").hide();
						
						if ( all_regist_cnt > 50000 )
						{
							$(".evtRegOver").show();
							
						}
						else
						{
							if( my_regist_cnt > 0)
							{
								$(".evtRegYes").show();
							}
							else
							{
								$(".evtRegNo").show();
							}
						}
						
						var my_stamp_cnt = data.list[0].my_stamp_cnt;
						$(".evtStamp").hide();
						if (my_stamp_cnt < 5)
						{
							$(".evtStampN").show();
							
						}
						else
						{
							$(".evtStampY").show();
						}
						
						var my_update_cnt = data.list[0].my_update_cnt;
						$(".evtUpdate").hide();
						if (my_update_cnt <= 0)
						{
							$(".evtUpdateNo").show();
						}
						else
						{
							$(".evtUpdateYes").show();
						}
														
						
						
						__ajaxCall("/openevent/getStamp.do",{}, true, "json", "post",
								function (data) 
								{
									console.log(data);
									
									if ( data.error_code == "0")
									{
										if (data.recordcount > 0)
										{
											$(".my_oe_stamp").html("");
											
											$.each( data.list, function(x,y){
												
												if ( x <= 15 )
												{
													var cHtml = "";
													cHtml = '<li class="pop_renew_stamp"><img alt="" src="/common/img/whatsnew/rn_open/stamp_on.png" style="opacity: 1; transform: matrix(0.86602, 0.49999, -0.49999, 0.86602, 0, 0);"></li>';
													$(".my_oe_stamp").append(cHtml);
												}
											});													
											
											if ( data.recordcount <= 16 )
											{
												cHtml = "";
												for ( var i = 0; i < 16-(data.recordcount); i++)
												{
													cHtml = "";
													cHtml += ' <li class="pop_renew_stamp"></li> ';
													$(".my_oe_stamp").append(cHtml);
												}
											}
											
											
											
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
						
						
						
						$('.pop_renew_regist, .pop_dimm').fadeIn("fast", function(){
							
							var controller = new TimelineLite();

							controller
								.append([
									TweenMax.from($('.pop_renew_stamp_wrap ul li img'), .3, {css:{scale:5, opacity:0, ease:Elastic.easeOut}}),
									TweenMax.to($('.pop_renew_stamp_wrap ul li img'), .3, {css:{scale:1, rotation:30, opacity:1, ease:Elastic.easeOut}})
								]);
							
							$(".openEventViewClose").on("click", function(){
								$('.pop_renew_regist, .pop_dimm').hide();
							});
							
						});
						
						
					}
					else
					{
						if ( confirm(data.error_msg) )
						{
							$.loginLib.showLayerLogin();
						}								
					}
			    }
				, 
				function(_error)
				{
				}
	    	);    				
	});
});
