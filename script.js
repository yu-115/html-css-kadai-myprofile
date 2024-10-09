$(function () {
  //カルーセル
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 2000,
    arrows: false,
    fade: true,
    speed: 1500
  });

  //リンクのホバー時の不透明度アニメーション
  $('a').on({
    'mouseenter':function() {
      //TOPに戻るボタンが非表示時の場合は処理が行われないようにする
      if ($(this).css('opacity') !== '0') {
        $(this).css('opacity', '0.5');
      }
    },
    'mouseleave':function() {
      if ($(this).css('opacity') !== '0') {
        $(this).css('opacity', '1');
      }
    }
  });

  //TOPに戻るボタンの表示/非表示
  //アニメーションで表示/非表示させる処理がdisplayプロパティではうまくいかなかったので、visibilityを使用
  $(window).scroll(function() {
    const scrollValue = $(window).scrollTop();
    if (scrollValue >= 100) {
      $('#back-btn').css('visibility', 'visible');
      $('#back-btn').css('opacity', '1');
    } else {
      $('#back-btn').css('opacity', '0', function() {
        $('#back-btn').css('visibility', 'hidden');
      });
    }
  });

  //リンククリック時のスクロール
  $('a[href^="#"]').on('click', function(event) {
    //瞬時に遷移する機能を止める
    event.preventDefault();

    //クリックしたaタグのhref属性を取得し、#であればhtmlに変える
    let href = $(this).attr('href');
    let $target;
    if (href == '#') {
      $target = $('html');
    } else {
      $target = $(href);
    }
    const position =$target.offset().top;

    //0.5秒かけてtargetが頭の位置に来るようにスクロール
      $('html, body').animate({scrollTop: position}, 500, 'swing');
  });

  //スクロール時にセッションをフェードインさせる
  $(window).scroll(function() {
    $('.section').each(function() {
      const position = $(this).offset().top;
      const scrollValue = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scrollValue > position - windowHeight + 200){
        $(this).addClass('active');
      }
    });
  });

  //Worksの画像クリックしたとき、モーダルで拡大表示
  $('#works-content div img').on('click', function() {
    const getSrc = $(this).attr('src');
    $('#modal-photo').attr('src', getSrc);
    $('#modal, #grayBack').addClass('active');
  });
  //modai-close-btnをクリックしたとき、モーダルを閉じる
  $('#modal-close-btn').on('click', function() {
    $('#modal, #grayBack').removeClass('active');
  });
})