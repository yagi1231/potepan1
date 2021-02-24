// =======================================================
// https://camp.potepan.com/openclass
// =======================================================


// エンジニア転職に強いプログラミングスクール
$(function() {
  const width = $(window).width();
  if (width <= 568) {
    $('#jsi-graduates-list').slick({
      arrows: false,
      dots: false,
      centerMode: true,
      slidesToShow: 1,
      sidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0, //待ち時間を０に
      speed: 5000, // スピードをゆっくり
      cssEase: 'linear',// 切り替えイージングを'linear'に
      infinite: true,
      // 以下、操作後に止まってしまう仕様の対策
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
    });
	} else if (width <= 767) {
    $('#jsi-graduates-list').not('.slick-initialized').slick({
      arrows: false,
      dots: false,
      centerMode: true,
      slidesToShow: 2,
      sidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 0, //待ち時間を０に
      speed: 5000, // スピードをゆっくり
      cssEase: 'linear',// 切り替えイージングを'linear'に
      infinite: true,
      // 以下、操作後に止まってしまう仕様の対策
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
    });
	} else {
    $('#jsi-graduates-list').slick({
      arrows: false,
      dots: false,
      centerMode: true,
      slidesToShow: 3,
      sidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 0, //待ち時間を０に
      speed: 5000, // スピードをゆっくり
      cssEase: 'linear',// 切り替えイージングを'linear'に
      infinite: true,
      // 以下、操作後に止まってしまう仕様の対策
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
    });
	}
});
