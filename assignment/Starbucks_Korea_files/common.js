
var myWindow = $(window).width();

/*
if (myWindow > 960) {
	$(window).resize(function(){
		location.reload();
	});
}
*/

$(document).ready(function () {

  /* gnb */

  /* 150517 추가 - 문진욱 */

  var btnSearch = false;

  $('.gnb_wrap p.btn_search a, .sdown_gnb_wrap p.btn_search a, .sub_gnb_wrap p.btn_search a').click(function () {
    if (btnSearch == false) {
      $('.gnb_wrap p.btn_search').css({
        'background': 'url("img/common/util_search_blackbg.png")'
      });
      $('.gnb_wrap p.btn_search').animate({
        'width': '180px'
      });
      $('.gnb_wrap nav.util_nav').animate({
        'right': '232px'
      });
      $('.sdown_gnb_wrap p.btn_search').css({
        'background': '#fff'
      });
      $('.sdown_gnb_wrap p.btn_search').animate({
        'width': '180px'
      });
      $('.sdown_gnb_wrap nav.util_nav').animate({
        'right': '232px'
      });
      $('.sub_gnb_wrap p.btn_search').css({
        'background': '#fff'
      });
      $('.sub_gnb_wrap p.btn_search').animate({
        'width': '180px'
      });
      $('.sub_gnb_wrap nav.util_nav').animate({
        'right': '232px'
      });
      btnSearch = true;

    } else {

      if (pattern_check("#totalSearch", "검색어를  입력하세요.", "허용되지 않은 문자입니다.", getPattern('BASIC3')) == false) { return; }
      var search_word = encodeURI(encodeURIComponent($("#totalSearch").val()));
      location.href = "/search/search.do?search=" + search_word;

    }

  });

  /* 150517 추가 - 문진욱 end */

  /* 150827 추가 - 박종현 */

	var optJsMv = {
		 sequence    : '###.png'
		,from        : 1
		,playOnLoad  : true
		,performStop : false
		,repeat      : false
	};
	var strFolder = "";
	var bIsLogin  = false;
	
	__ajaxCall("/interface/checkLogin.do", {}, true, "json", "post"
		,function (_response) {
			if (_response.result_code == "SUCCESS") {
				bIsLogin = true;
			}
			
			// 가로 960 초과
			strFolder = '//image.istarbucks.co.kr/common/img/common/rcup/logout/';
			if (bIsLogin) {
				strFolder = '//image.istarbucks.co.kr/common/img/common/rcup/login/';
			}
			
			var option1 = $.extend({}, optJsMv, {
				 to     : 39
				,folder : strFolder 
				,height : 45
				,width  : 53
			});
			
			$('.rCup1 , .rCup3').jsMovie(option1);

      $('.rCup3_wrap').bind('keydown', function (e) { // 접근성_20171201 enter key event 추가
        if (e.which === 13) {
          $('.rCup3').trigger('click');
        }
      });
      
      // 가로 960 이하
      strFolder = '//image.istarbucks.co.kr/common/img/common/rcup_m/logout/';
      if (bIsLogin) {
        strFolder = '//image.istarbucks.co.kr/common/img/common/rcup_m/login/';
      }
      
      var option2 = $.extend({}, optJsMv, {
        to: 42
        , folder: strFolder
        , height: 90
        , width: 90
      });
      
      $('.rCup2').jsMovie(option2);

      $('.rCup2_wrap').bind('keydown', function (e) { // 접근성_20171201 enter key event 추가
        if (e.which === 13) {
          $('.rCup2').trigger('click');
        }
      });
     }
		,function (_error) {
		}
	);


  /* 150827 추가 - 박종현 end */

  if (myWindow < 1025) {
    $('.sdown_gnb_wrap, .sub_gnb_wrap').css({
      'position': 'absolute'
    });
  }

  /* 150526 성연욱 - 모바일 MSR 컵 애니메이션 추가 */
	/*
	$('li.tablet_gnb01 a').jsMovie({
		sequence:'###.png',
		from:1,
		to:44,
		folder:'img/common/rcup_m/login2/',
		height:90,
		width:90,
		playOnLoad:true,
		performStop:false,
		repeat:false
	});

	if($(window).width() <= 480) {
		$('li.tablet_gnb01 a').jsMovie({
			sequence:'###.png',
			from:1,
			to:44,
			folder:'img/common/rcup_m/login3/',
			height:50,
			width:50,
			playOnLoad:true,
			performStop:false,
			repeat:false
		});
	}
	*/
  /* 150526 성연욱 - 모바일 MSR 컵 애니메이션 추가 end */
  /* 150709 수정 반영 - 구명준  */
  var rewardCup = false;
  //
  //	$('.rCup1').click(function(){
  //		$('#top_MSR').css({
  //			'position':'relative'
  //		});
  //		$('#top_MSR').slideToggle();
  //		$(this).toggleClass('on');
  //	});

  //	$('.rCup2').click(function(){/*.tablet_gnb01*/
  //		$('#top_MSR').css({
  //			'position':'fixed'
  //		});
  //		$('#top_MSR').slideToggle().focus();
  //		$(this).parent('a').toggleClass('on');
  //	});

 // 	$('.rCup3').click(function(){		
 // 		if (rewardCup == false){			
 // 			$('#top_MSR').css({
 // 				'position':'fixed',
 // 				'z-index':'15'
 // 			});
 // 			$('#top_MSR').slideDown().attr('tabindex','0').focus(); // 접근성_20171201 attr, focus 추가
 // 			$('.sdown_gnb_wrap, .sub_gnb_wrap').animate({ // 150716 서브메뉴 gnb 효과 수정
 // 				'top':'120px'
 // 			});
 // 			// 150716 서브메뉴 gnb 효과 수정
 // 			$('#container, #topWrap').animate({
 // 				'margin-top':'120px'
 // 			});
 // 			//170512 e-프리퀀시 배너
 // 			$(".eFreqTopQuick").animate({
 // 				"top":"250px"
 // 			});
 //       $(this).parent('a').addClass('on');
 //       $('.rCup3_wrap').attr('title','마이 리워드 닫기'); // 접근성_20171201 추가
 // 			rewardCup = true;
 // 		} else {
 // 			$('#top_MSR').css({
 // 				'position':'fixed'
 // 			});
 // 			$('.sdown_gnb_wrap, .sub_gnb_wrap').animate({ // 150716 서브메뉴 gnb 효과 수정
 // 				'top':'0px'
 // 			});
 // 			$('#top_MSR').slideUp().attr('tabindex','-1'); // 접근성_20171201 attr 추가
 // 			// 150716 서브메뉴 gnb 효과 수정
 // 			$('#container, #topWrap').animate({
 // 				'margin-top':0
 // 			});
 // 			//170512 e-프리퀀시 배너 
 // 			$(".eFreqTopQuick").animate({
 // 				"top":"130px"
 // 			});
 //       $(this).parent('a').removeClass('on');
 //       $('.rCup3_wrap').attr('title', '마이 리워드 열기'); // 접근성_20171201 추가
 // 			rewardCup = false;
 // 		}
 // 	});

  $(window).scroll(function () {
    var y = $(window).scrollTop();
    if (y == 0) {
      // $('#top_MSR').css({'display':'none'});
      // rewardCup = false;
    }
  });

  /* 150517 추가 - 문진욱 */

  $('.rCup2').click(function () {
    if (rewardCup == false) {
      $('#top_MSR').css({'position': 'fixed','z-index': '15'});
      $('#top_MSR').slideDown().attr('tabindex','0').focus(); // 접근성_20171201 attr, focus 추가
      $('.sdown_gnb_wrap, .sub_gnb_wrap').animate({'top': '119px'});
      $(this).parent('a').addClass('on');
      $('.rCup2_wrap').attr('title','마이 리워드 닫기'); // 접근성_20171201 추가
      rewardCup = true;
    } else {
      $('#top_MSR').css({'position': 'relative'});
      $('.sdown_gnb_wrap, .sub_gnb_wrap').animate({'top': '0'});
      $('#top_MSR').slideUp().attr('tabindex','-1'); // 접근성_20171201 attr 추가
      $(this).parent('a').removeClass('on');
      $('.rCup2_wrap').attr('title', '마이 리워드 열기'); // 접근성_20171201 추가
      rewardCup = false;
    }
  });

  /* 150709 수정 반영 - 구명준 end */
  /* 150517 추가 - 문진욱 end */

  /* 150518 추가 - 문진욱 */

  $('.tablet_gnb04 a').click(function () {
    $('#wrap').css({
      'position': 'relative'
    });
    $('#wrap').animate({
      'left': '-70%'
    });
    $('.mob_gnb_dimm').show();
    $('.mob_gnb_wrap').animate({
      'right': '0'
    });
  });

  $('.btn_gnb_close a').click(function () {
	  fn_hideGnbMenu();    
  });

  $('.mob_gnb_menus > ul > li, .mob_gnb_menus ul li ul li').hide();
  $('.mob_gnb_menus ul li.mob_gnb_ttl1, .mob_gnb_menus ul li.mob_gnb_ttl2').show();

  // 150527 성연욱 추가 (My Starbucks 하위메뉴 추가)
  $('.mob_gnb_menus ul li.mob_gnb_ttl1 a').click(function (e) {

    $(this).parent().siblings().stop(true, true).slideToggle();
    $(this).toggleClass('mob_gnb_arrow_up');
    //e.preventDefault();

  });
  // 150527 성연욱 추가 (My Starbucks 하위메뉴 추가) End

  $('.mob_gnb_menus ul li.mob_gnb_ttl2 a').click(function (e) {

    $(this).parent().siblings().stop(true, true).slideToggle();
    $(this).toggleClass('mob_gnb_arrow_up');
    //e.preventDefault();

  });

  $('.mob_gnb_menus ul li a').click(function (e) {

    $(this).siblings().children().stop(true, true).slideToggle();
    $(this).children().toggleClass('mob_gnb_arrow_up');
    //e.preventDefault();

  });

  /* 150518 추가 - 문진욱 end */

  /* gnb end */

  var lineNotice = false;

  /* 150527 성연욱 - 푸터를 위한 스크립트 */
  /* 20210714 제거
    if (myWindow <= 1280 && myWindow >= 960) {
    $('.footer_menus ul:nth-of-type(5)').css({
      'clear': 'both'
    });

    $('.footer_menus ul:nth-of-type(5)').css({
      'margin-top': '30px'
    });
    $('.footer_menus ul:nth-of-type(6)').css({
      'margin-top': '30px'
    });
  } else if ((myWindow > 640) && (myWindow <= 960)) {
    $('.footer_menus ul:nth-of-type(5)').css({
      'clear': 'both'
    });

    $('.footer_menus ul:nth-of-type(3)').css({
      'margin-top': '30px'
    });
    $('.footer_menus ul:nth-of-type(4)').css({
      'margin-top': '30px'
    });

    $('.footer_menus ul:nth-of-type(5)').css({
      'margin-top': '30px'
    });
    $('.footer_menus ul:nth-of-type(6)').css({
      'margin-top': '30px'
    });
  }*/
  /* 150527 성연욱 - 푸터를 위한 스크립트 end */

  /* 150818 성연욱 - 리사이징 이벤트를 위한 스크립트 수정 */
  if (myWindow > 960) {

    $('.line_notice_bgr a, .btn_main_bnr_close').click(function () {
      if (lineNotice == false) {
        // $('.line_notice_bgr a span.btn_prom_arrow').css({'background-position':'-35px 0'});
        $('.line_notice_bgr a span.btn_prom').find('img').attr('src', '//image.istarbucks.co.kr/common/img/common/btn_prom_up.png');
        $('.main_prom_bnr').slideDown();
        $('body').animate({
          scrollTop: $('.line_notice_bgr').offset().top - 120
        }, 1000);
        lineNotice = true;
      } else {
        // $('.line_notice_bgr a span.btn_prom_arrow').css({'background-position':'0 0'});
        $('.line_notice_bgr a span.btn_prom').find('img').attr('src', '//image.istarbucks.co.kr/common/img/common/btn_prom_down.png');
        $('.main_prom_bnr').slideUp();
        lineNotice = false;
      }
    });

    $('.footer_menus ul li.footer_2depth_ttl > a').click(function (e) {
      location.href = '/footer/company/starbucks_information.do';
      //e.preventDefault();
    });
    $('.footer_menus ul li.footer_2depth_ttl2 > a').click(function (e) {
        location.href = '/footer/company/compliance_ceo.do';
        //e.preventDefault();
      });


  } else if ((myWindow > 640) && (myWindow <= 960)) {

    $('.line_notice_bgr a, .btn_main_bnr_close').click(function () {
      if (lineNotice == false) {
        // console.log('down');
        // $('.line_notice_bgr a span.btn_prom_arrow').css({'background-position':'-43px 0'});
        $('.line_notice_bgr a span.btn_prom').find('img').attr('src', '//image.istarbucks.co.kr/common/img/common/btn_prom_up.png');
        $('.main_prom_bnr').slideDown();
        $('body').animate({
          scrollTop: $('.line_notice_bgr').offset().top
        }, 1000);
        lineNotice = true;
      } else {
        // $('.line_notice_bgr a span.btn_prom_arrow').css({'background-position':'0 0'});
        $('.line_notice_bgr a span.btn_prom').find('img').attr('src', '//image.istarbucks.co.kr/common/img/common/btn_prom_down.png');
        $('.main_prom_bnr').slideUp();
        lineNotice = false;
      }
    });

    $('.footer_menus ul li.footer_2depth_ttl > a').click(function (e) {
      location.href = '/footer/company/starbucks_information.do';
      //e.preventDefault();
    });
    $('.footer_menus ul li.footer_2depth_ttl2 > a').click(function (e) {
        location.href = '/footer/company/compliance_ceo.do';
        //e.preventDefault();
      });

  } else if ((myWindow > 320) && (myWindow <= 640)) {

    $('.line_notice_bgr a, .btn_main_bnr_close').click(function () {
      if (lineNotice == false) {
        // console.log('down');
        // $('.line_notice_bgr a span.btn_prom_arrow').css({'background-position':'-55px 0'});
        $('.line_notice_bgr a span.btn_prom').find('img').attr('src', '//image.istarbucks.co.kr/common/img/common/btn_prom_up.png');
        $('.main_prom_bnr').slideDown();
        $('body').animate({
          scrollTop: $('.line_notice_bgr').offset().top
        }, 1000);
        lineNotice = true;
      } else {
        // $('.line_notice_bgr a span.btn_prom_arrow').css({'background-position':'0 0'});
        $('.line_notice_bgr a span.btn_prom').find('img').attr('src', '//image.istarbucks.co.kr/common/img/common/btn_prom_down.png');
        $('.main_prom_bnr').slideUp();
        lineNotice = false;
      }
    });

    $('.footer_menus ul li').hide();
    $('.footer_menus ul li.footer_menu_ttl').css({
      'display': 'block'
    });

    /* 150518 수정 - 문진욱 */

    $('.footer_menus ul li.footer_menu_ttl a').click(function (e) {

      $(this).parent().siblings().stop(true, true).slideToggle();
      $(this).children().toggleClass('footer_arrow_up');
      //e.preventDefault();

    });

    $('.footer_menus ul li.footer_2depth_ttl > a').click(function (e) {

      $(this).next().stop(true, true).slideToggle();
      $(this).children().toggleClass('footer_arrow_up');
      //e.preventDefault();
    });

    $('.footer_menus ul li.footer_2depth_ttl2 > a').click(function (e) {

        $(this).next().stop(true, true).slideToggle();
        $(this).children().toggleClass('footer_arrow_up');
        //e.preventDefault();
      });


    /* 150518 수정 - 문진욱 end */

  } else if (myWindow <= 320) {

    $('.line_notice_bgr a, .btn_main_bnr_close').click(function () {
      if (lineNotice == false) {
        // $('.line_notice_bgr a span.btn_prom_arrow').css({'background-position':'-30px 0'});
        $('.line_notice_bgr a span.btn_prom').find('img').attr('src', '//image.istarbucks.co.kr/common/img/common/btn_prom_up.png');
        $('.main_prom_bnr').slideDown();
        lineNotice = true;
      } else {
        // $('.line_notice_bgr a span.btn_prom_arrow').css({'background-position':'0 0'});
        $('.line_notice_bgr a span.btn_prom').find('img').attr('src', '//image.istarbucks.co.kr/common/img/common/btn_prom_down.png');
        $('.main_prom_bnr').slideUp();
        lineNotice = false;
      }
    });

    $('.footer_menus ul li').hide();
    $('.footer_menus ul li.footer_menu_ttl').css({
      'display': 'block'
    });

    /* 150518 수정 - 문진욱 */

    $('.footer_menus ul li.footer_menu_ttl a').click(function (e) {

      $(this).parent().siblings().stop(true, true).slideToggle();
      $(this).children().toggleClass('footer_arrow_up');
      //e.preventDefault();

    });

    $('.footer_menus ul li.footer_2depth_ttl > a').click(function (e) {

      $(this).next().stop(true, true).slideToggle();
      $(this).children().toggleClass('footer_arrow_up');
      //e.preventDefault();
    });
    $('.footer_menus ul li.footer_2depth_ttl2 > a').click(function (e) {

        $(this).next().stop(true, true).slideToggle();
        $(this).children().toggleClass('footer_arrow_up');
        //e.preventDefault();
      });

    /* 150518 수정 - 문진욱 end */

  }
  /* 150818 성연욱 - 리사이징 이벤트를 위한 스크립트 수정 */

  $('.ms_nav > ul > li > a').click(function (e) {

    $(this).siblings().stop(true, true).slideToggle();
    $(this).children().toggleClass('sbox_arrow_up');
    //e.preventDefault();

  });

  /* 20150526 구명준 msRnb 추가 시작 */
  $("#msRnb > ul > li.msRnb_btn").bind("click", function () {

    goUrl = $(this).find("a").attr("href");
    location.href = goUrl;

  });
  /* 20150526 구명준 msRnb 추가 끝 */

  /* 150613 - 문진욱 */
  $('.auto_charge_list_btns ul li.auto_charge_btn2 a').click(function () {
    $('.pop_dimm').fadeIn();
    $('.auto_cancel_reason_pop').fadeIn();
  });

  $('.auto_cancel_reason_ttl a, li.auto_cancel_reason_btn2 a').click(function () {
    $('.pop_dimm').fadeOut();
    $('.auto_cancel_reason_pop').fadeOut();
  });
  /* 150613 - 문진욱 end */

  /* 150617 로그인팝업 추가 - 문진욱 */
  $('.util_nav ul li.util_nav01').click(function () {
    $('.login_layer_dimm').fadeIn();
    $('.login_layer').fadeIn();
  });

  $('.login_layer header a.login_layer_close').click(function () {
    $('.login_layer_dimm').fadeOut();
    $('.login_layer').fadeOut();
  });

  $('.btn_nick_pos').click(function () {
    $('.nick_guide_pop').show();
  });

  $('.nick_guide_pop_inner a').click(function () {
    $('.nick_guide_pop').hide();
  });

  $('.btn_cell_pos').click(function () {
    $('.cell_guide_pop').show();
  });

  $('.cell_guide_pop_inner a').click(function () {
    $('.cell_guide_pop').hide();
  });

  $('.btn_mail_pos').click(function () {
    $('.mail_guide_pop').show();
  });

  $('.mail_guide_pop_inner a').click(function () {
    $('.mail_guide_pop').hide();
  });

  $('.btn_addr_pos').click(function () {
    $('.addr_guide_pop').show();
  });

  $('.addr_guide_pop_inner a').click(function () {
    $('.addr_guide_pop').hide();
  });
  /* 150617 로그인팝업 추가 - 문진욱 end */

  /* 150625 추가 - 문진욱 */
  // 1
  $('.grade_card01 p.btn_more a').click(function () {
    $('.grade_card01_add, .pop_dimm').show();
    $('ul.note_list > li.card_flip1').eq(0).css({
      'z-index': '100'
    });
  });
  $('.grade_card01_add p.grade_card_add_close a').click(function () {
    $('.grade_card01_add, .pop_dimm').hide();
    $('ul.note_list > li.card_flip1').eq(0).css({
      'z-index': '5'
    });
  });
	/*
	$('ul.note_list > li').mouseleave(function(){
		$('.grade_card01_add, .pop_dimm').hide();
		$('ul.note_list > li.card_flip1').eq(0).css({
			'z-index':'5'
		});
	});
	*/

  //2
  $('.grade_card02 p.btn_more a').click(function () {
    $('.grade_card02_add, .pop_dimm').show();
    $('ul.note_list > li.card_flip1').eq(1).css({
      'z-index': '100'
    });
  });
  $('.grade_card02_add p.grade_card_add_close a').click(function () {
    $('.grade_card02_add, .pop_dimm').hide();
    $('ul.note_list > li.card_flip1').eq(1).css({
      'z-index': '5'
    });
  });
	/*
	$('ul.note_list > li').mouseleave(function(){
		$('.grade_card02_add, .pop_dimm').hide();
		$('ul.note_list > li.card_flip1').eq(1).css({
			'z-index':'5'
		});
	});
	*/

  //3
  $('.grade_card03 p.btn_more a').click(function () {
    $('.grade_card03_add, .pop_dimm').show();
    $('.grade_card09_add, .pop_dimm').show();
    $('ul.note_list > li.card_flip1').eq(2).css({
      'z-index': '100'
    });
  });
  $('.grade_card03_add p.grade_card_add_close a').click(function () {
    $('.grade_card03_add, .pop_dimm').hide();
    $('ul.note_list > li.card_flip1').eq(2).css({
      'z-index': '5'
    });
  });
	/*
	$('ul.note_list > li').mouseleave(function(){
		$('.grade_card03_add, .pop_dimm').hide();
		$('ul.note_list > li.card_flip1').eq(2).css({
			'z-index':'5'
		});
	});
	*/

  //4
  $('.grade_card04 p.btn_more a').click(function () {
    $('.grade_card04_add, .pop_dimm').show();
    $('ul.note_list > li.card_flip1').eq(3).css({
      'z-index': '100'
    });
  });
  $('.grade_card04_add p.grade_card_add_close a').click(function () {
    $('.grade_card04_add, .pop_dimm').hide();
    $('ul.note_list > li.card_flip1').eq(3).css({
      'z-index': '5'
    });
  });
	/*
	$('ul.note_list > li').mouseleave(function(){
		$('.grade_card04_add, .pop_dimm').hide();
		$('ul.note_list > li.card_flip1').eq(3).css({
			'z-index':'5'
		});
	});
	*/

  //5
  $('.grade_card05 p.btn_more a').click(function () {
    $('.grade_card05_add, .pop_dimm').show();
    $('ul.note_list > li.card_flip2').eq(0).css({
      'z-index': '100'
    });
  });
  $('.grade_card05_add p.grade_card_add_close a').click(function () {
    $('.grade_card05_add, .pop_dimm').hide();
    $('ul.note_list > li.card_flip2').eq(0).css({
      'z-index': '5'
    });
  });
	/*
	$('ul.note_list > li').mouseleave(function(){
		$('.grade_card05_add, .pop_dimm').hide();
		$('ul.note_list > li.card_flip2').eq(0).css({
			'z-index':'5'
		});
	});
	*/

  //6
  $('.grade_card06 p.btn_more a').click(function () {
    $('.grade_card06_add, .pop_dimm').show();
    $('ul.note_list > li.card_flip2').eq(1).css({
      'z-index': '100'
    });
  });
  $('.grade_card06_add p.grade_card_add_close a').click(function () {
    $('.grade_card06_add, .pop_dimm').hide();
    $('ul.note_list > li.card_flip2').eq(1).css({
      'z-index': '5'
    });
  });
	/*
	$('ul.note_list > li').mouseleave(function(){
		$('.grade_card06_add, .pop_dimm').hide();
		$('ul.note_list > li.card_flip2').eq(1).css({
			'z-index':'5'
		});
	});
	*/

  $('.grade_card14 p.btn_more a').click(function () {
    $('.grade_card14_add, .pop_dimm').show();
    $('ul.note_list > li.card_flip2').eq(2).css({
      'z-index': '100'
    });
  });
  $('.grade_card14_add p.grade_card_add_close a').click(function () {
    $('.grade_card14_add, .pop_dimm').hide();
    $('ul.note_list > li.card_flip2').eq(2).css({
      'z-index': '5'
    });
  });
  
  
  //7
  //s::20210416 수정
  $('.grade_card07 p.btn_more a').click(function () {
    $('.grade_card07_add, .pop_dimm').show();
    $('ul.note_list > li.card_flip2').eq(3).css({
      'z-index': '100'
    });
  });
  $('.grade_card07_add p.grade_card_add_close a').click(function () {
    $('.grade_card07_add, .pop_dimm').hide();
    $('ul.note_list > li.card_flip2').eq(3).css({
      'z-index': '5'
    });
  });
  
  //s::20181205 추가 13
  $('.grade_card13 p.btn_more a').click(function () {
    $('.grade_card13_add, .pop_dimm').show();
    $('ul.note_list > li.card_flip3').eq(0).css({
      'z-index': '100'
    });
  });
  $('.grade_card13_add p.grade_card_add_close a').click(function () {
    $('.grade_card13_add, .pop_dimm').hide();
    $('ul.note_list > li.card_flip3').eq(0).css({
      'z-index': '5'
    });
  });
  //e::20181205 추가 13

	/*
	$('ul.note_list > li').mouseleave(function(){
		$('.grade_card07_add, .pop_dimm').hide();
		$('ul.note_list > li.card_flip2').eq(2).css({
			'z-index':'5'
		});
	});
	*/

  //6
  $('.grade_card08 p.btn_more a').click(function () {
    $('.grade_card08_add, .pop_dimm').show();
    $('ul.note_list > li.card_flip3').eq(1).css({
      'z-index': '100'
    });
  });
  $('.grade_card08_add p.grade_card_add_close a').click(function () {
    $('.grade_card08_add, .pop_dimm').hide();
    $('ul.note_list > li.card_flip3').eq(1).css({
      'z-index': '5'
    });
  });
  //e::20210416 수정

	/*
	$('ul.note_list > li').mouseleave(function(){
		$('.grade_card08_add, .pop_dimm').hide();
		$('ul.note_list > li.card_flip2').eq(3).css({
			'z-index':'5'
		});
	});
	*/
  /* 150625 추가 - 문진욱 end */
  /* 150702 추가 - 문진욱 */
  $('.cosales_help_btns a.cosales_help_btn1').click(function () {
    $('.pop_up_dimm, .sb_prod_pop').fadeIn();
  });
  $('.btn_sb_close_pop a, .sb_prod_pop_close a').click(function () {
    $('.pop_up_dimm, .sb_prod_pop').fadeOut();
  });
  /* 150702 추가 - 문진욱 end */

  /* 150715 추가 - 문진욱 */
  $('.my_store_tabs_wrap header h4:not(.on)').parent().next().hide();
  $('.my_store_tabs_wrap header h4').bind('click', function () {
    $('.my_store_tabs_wrap header h4').removeClass('on');
    $(this).addClass('on');
    $('.my_store_tabs_wrap article').hide();
    $(this).parent().next().show();
    return false;
  });
  /* 150715 추가 - 문진욱 */

  $('.my_ms_card_id_modify').hide();
  $('.my_ms_card_id a.icon_pencil').click(function () {
    $('.my_ms_card_id').hide();
    $('.my_ms_card_id_modify').show();
  });
  $('.my_ms_card_id_modify a.my_nick_cancel').click(function () {
    $('.my_ms_card_id').show();
    $('.my_ms_card_id_modify').hide();
  });

  $('.my_ms_card_detail_id_modify').hide();
  $('.my_ms_card_detail_id a.icon_pencil').click(function () {
    $('.my_ms_card_detail_id').hide();
    $('.my_ms_card_detail_id_modify').show();
  });
  $('.my_ms_card_detail_id_modify a.my_nick_cancel').click(function () {
    $('.my_ms_card_detail_id').show();
    $('.my_ms_card_detail_id_modify').hide();
  });

  $('.my_ms_card_slider_id_modify').hide();
  $('.my_ms_slider_txt_l a.icon_pencil_g').click(function () {
    $('.my_ms_slider_txt_l strong, .my_ms_slider_txt_l a.icon_pencil_g').hide();
    $('.my_ms_card_slider_id_modify').show();
  });
  $('.my_ms_card_slider_id_modify a.my_nick_cancel').click(function () {
    $('.my_ms_slider_txt_l strong, .my_ms_slider_txt_l a.icon_pencil_g').show();
    $('.my_ms_card_slider_id_modify').hide();
  });

  if (myWindow < 641) {
    $('.total_search_btns ul li').click(function () {
      $('.total_search_btns').animate({ 'height': '455px' });
    });

    $('li.total_search_btn1').click(function () {
      $('li.total_search_btn2').animate({ 'top': '35px' });
      $('li.total_search_btn3').animate({ 'top': '70px' });
      $('li.total_search_btn4').animate({ 'top': '105px' });
      $('li.total_search_btn5').animate({ 'top': '140px' });
      $('li.total_search_btn6').animate({ 'top': '175px' });
      $('li.total_search_btn7').animate({ 'top': '210px' });
      $('li.total_search_btn8').animate({ 'top': '245px' });
      $('li.total_search_btn9').animate({ 'top': '280px' });
      $('li.total_search_btn10').animate({ 'top': '315px' });
      $('li.total_search_btn11').animate({ 'top': '350px' });
      $('li.total_search_btn12').animate({ 'top': '385px' });
      $('li.total_search_btn13').animate({ 'top': '420px' });
    });

    $('li.total_search_btn2').click(function () {
      $('li.total_search_btn1, li.total_search_btn3, li.total_search_btn4, li.total_search_btn5, li.total_search_btn6, li.total_search_btn7, li.total_search_btn8, li.total_search_btn9, li.total_search_btn10, li.total_search_btn11, li.total_search_btn12, li.total_search_btn13').animate({ 'top': '0' });
      $('li.total_search_btn2').animate({ 'top': '0', 'z-index': '13' });
      $('li.total_search_btn2').toggleClass('total_search_btn_reset');
      $('.total_search_btns').animate({ 'height': '35px' });
    });
  }

  $('.myLine_up a').click(function () {
    $('.pop_dimm, .lineup_pop_wrap').fadeIn();
  });

  $('.lineup_pop_ttl a, .btn_lineup_close a, .pop_dimm').click(function () {
    $('.pop_dimm, .lineup_pop_wrap').fadeOut();
    $('ul.note_list > li.card_flip1').css({
      'z-index': '5'
    });
    $('ul.note_list > li.card_flip2').css({
      'z-index': '5'
    });
    $('ul.note_list > li.card_flip3').css({
      'z-index': '5'
    });
    $('.grade_card01_add').hide();
    $('.grade_card02_add').hide();
    $('.grade_card03_add').hide();
    $('.grade_card04_add').hide();
    $('.grade_card05_add').hide();
    $('.grade_card06_add').hide();
    $('.grade_card07_add').hide();
    $('.grade_card08_add').hide();
    $('.grade_card13_add').hide();//20181205 추가
    $('.grade_card14_add').hide();//20210416 추가
  });

});

function fn_hideGnbMenu(){
	
	$('#wrap').css({
      'position': 'initial'
    });
    $('#wrap').animate({
      'left': '0'
    });
    $('.mob_gnb_dimm').hide();
    $('.mob_gnb_wrap').animate({
      'right': '-100%'
    });
}