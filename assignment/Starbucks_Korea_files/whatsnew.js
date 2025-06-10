$(document).ready( function(){
	// 메인 WHAT'S NEW? 탭 버튼
	$('.promotionView a').bind('click', function(){
		var promViewer = $('section.prom_section').css('display');
		if( promViewer == 'block' ){
			$(this).find('img').attr('src', $(this).find('img').attr('src').replace('up.png','down.png'));
			$('section.prom_section').slideUp();
		}else{
			$(this).find('img').attr('src', $(this).find('img').attr('src').replace('down.png','up.png'));
			$('section.prom_section').slideDown();
		}
	});

	// 프로모션 갤러리
	$('.prom_section ul.prom_gallery li').bind('mouseover focusin', function(){
		$('.prom_cover').remove(); // 초기화
		$(this).append('<div class="prom_cover"></div>');
	});

	$('.prom_section ul.prom_gallery li').bind('mouseleave focusout', function(){
		$(this).find('.prom_cover').remove();
	});
});