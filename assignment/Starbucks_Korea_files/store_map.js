/** 스토어 검색 **/
$(document).ready(function () {
  $.daum.init();
});

(function ($) {
  $.daum = {
    init: function ()	//지도 생성
    {


      $map.mapContainer = document.getElementById('storeMap'), // 지도를 표시할 div 
        $map.mapOption = {
          center: new daum.maps.LatLng(37.56682, 126.97865), // 지도의 중심좌표
          level: $mapSize, // 지도의 확대 레벨
          mapTypeId: daum.maps.MapTypeId.ROADMAP // 지도종류
        };
      $map.map = new daum.maps.Map($map.mapContainer, $map.mapOption);

      if ($drag) {

        daum.maps.event.addListener($map.map, 'dragend', function () {
          var latlng = $map.map.getCenter();
          if ($mode == null || $mode == "A") {
            if ($parentMenuType == "A") {
              $.daum.closeInfoWindow(function () {
                $.daum.markerRemove();
                $geo.latitude = latlng.getLat();
                $geo.longitude = latlng.getLng();

                $search.isError = false;
                $search.ins_lat = $geo.latitude;
                $search.ins_lng = $geo.longitude;
                $search.search_text = "";
                $search.p_sido_cd = "";
                $search.p_gugun_cd = "";
                $search.in_distance = 5;
                $search.in_biz_cd = "";
                $search.in_biz_cds = 0;
                $search.in_scodes = 0;
                $search.iend = "100";
                //$.storemap.checkbox_init();
                $.storemap.setStoreInfo();
              });
            }
          }
        });

      }

    }
    ,
    mapMove: function ($location, callback)	//지도 이동 시키기
    {
      var moveLatLon = new daum.maps.LatLng($location.latitude, $location.longitude);
      $map.map.setCenter(moveLatLon);
      //$map.map.panTo(moveLatLon);  
      callback();
    }
    ,
    markerRemove: function () {
      if ($marker) {
        for (i in $marker) {
          $marker[i].setMap(null);
        }
        //$marker.length = 0;
        //$infowindow.length = 0;
        //$marker 		= new Array();
        //$infowindow		= new Array();
      }
    }
    ,
    setLevel: function (level) {
      $map.map.setLevel($mapSize);
    }
    ,
    setBounds: function () {
      $map.map.setBounds($bounds);
    }
    ,
    showInfoWindow: function (index) {
      $infowindow[index].open($map.map, $marker[index]);
    }

    ,
    closeInfoWindow: function (callback) {

      $(".isStoreBizViewWrap").fadeOut("fast", function () {
        $(".isStoreBizViewWrap").remove();
      });

      if ($infowindow) {
        for (i in $infowindow) {
          $infowindow[i].close();
        }

        callback();
      }



    }
    ,
    markerCreate: function ($position, $content, $offset, $arrIndex) {
      //$bounds = new daum.maps.LatLngBounds();
      var $img = new Image();
      $img.src = $position.image

      //$img.onload = function()
      //{
      var markerImageSize = new daum.maps.Size(38, 60);
      var markerImageOptions = { offset: new daum.maps.Point(16, 55) };
      var markerPosition = new daum.maps.LatLng($position.lat, $position.lot);
      
      if($(window).width() > 640 || $(window).width() < 376){
      	var movePosition = new daum.maps.LatLng(Number($position.lat), $position.lot);
      }else{
      	var movePosition = new daum.maps.LatLng(Number($position.lat) + 0.00085, $position.lot);
      }
      var markerImage = new daum.maps.MarkerImage($position.image, markerImageSize, markerImageOptions);

      var marker = "";
      marker = new daum.maps.Marker({
        position: markerPosition, // 마커의 좌표
        image: markerImage, // 마커의 이미지
        map: $map.map, // 마커를 표시할 지도 객체
        clickable: true,
        title: $($content).find('header').text() // 접근성_20171127 title 추가
      });
      if(marker.Zb) marker.Zb.alt = marker.Zb.title; // 접근성_20171127 alt 추가
      $marker[$arrIndex] = marker;
      //$bounds.extend(markerPosition);
      var infowindow = "";
      infowindow = new daum.maps.InfoWindow({
        content: $content,
        removable: true
      });

      $infowindow[$arrIndex] = infowindow;

      daum.maps.event.addListener(marker, 'click', function () {
        $.daum.closeInfoWindow(function () {
          $map.map.setCenter(movePosition);
          infowindow.open($map.map, marker);
        });
      });
      /**
      daum.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close();
      });
      **/
      //}
    }
  };
})(jQuery);