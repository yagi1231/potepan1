var POTEPANCAMP = POTEPANCAMP || {};
POTEPANCAMP.HAMBURGER_MENU = {
  init: function () {
    if (!this.setParams()) return;
    this.prepare();
    this.bindEvents();
  },
  setParams: function () {
    this.$hamburgerMenu = $('.jsc-hamburger');
    this.$hamburgerList = $('.jsc-hamburger-list');
    this.$siteHeader = $('.site-header');
    this.siteHeaderHeight = this.$siteHeader.outerHeight();
    this.hamburgerListHeight = this.$hamburgerList.outerHeight();
    this.scrollMenu();
    if (this.$hamburgerMenu.length == 0) return false;
    return true;
  },
  prepare: function () {},
  bindEvents: function () {
    this.$hamburgerMenu.on('click', $.proxy(this.toggleMenu, this));
  },
  toggleMenu: function () {
    this.$hamburgerMenu.toggleClass('is-active');
    this.$hamburgerList.toggleClass('is-active');
    var self = this;
    $(window).resize(function () {
      self.scrollMenu();
    });
  },
  scrollMenu: function () {
    var self = this;
    if (window.innerHeight < self.siteHeaderHeight + self.hamburgerListHeight) {
      self.$hamburgerList.addClass('is-scroll');
    } else {
      self.$hamburgerList.removeClass('is-scroll');
    }
  }
};

POTEPANCAMP.CAROUSEL = {
  init: function () {
    this.bindEvents();
    this.sliderSetting();
  },
  bindEvents: function () {
    var $self = this;
    $(window).resize(function () {
      $self.sliderSetting();
    });
  },
  sliderSetting: function () {
    let width = $(window).width();
    const slickClass = $('#jsi-engineer-list, #jsi-counselor-list, #jsi-production-list, #jsi-interview-else-list, #jsi-pick-up-list')
    if (width <= 767) {
      $('.contents-background').width(width - 120);
      $('.contents-background').height((width - 120) / 1.47);
      $('.pick-up-contents-background').width(width - 80);
      $('.pick-up-contents-background').height((width - 80) / 1.7);
      slickClass.not('.slick-initialized').slick({
        arrows: true,
        dots: true,
        slidesToShow: 1,
        autoplay: false,
        infinite: true,
      });
      $('#jsi-pick-up-list').not('.slick-initialized').slick({
        appendArrows: $('.pick-up-contents-background'),
      });
    } else {
      function unslick(listID) {
        $(`${listID}.slick-initialized`).slick('unslick');
      }
      unslick('#jsi-engineer-list');
      unslick('#jsi-production-list');
      unslick('#jsi-counselor-list');
      unslick('#jsi-pick-up-list');
      unslick('#jsi-interview-else-list');
      $('.contents-background, .pick-up-contents-background').height(0);
    }
  }
};

POTEPANCAMP.PLAN_NAV = {
  SLIDE_SPEED: 800,
  OFFSET_Y: -50,
  init: function () {
    this.setParams();
    this.prepare();
    this.bindEvent();
  },
  setParams: function () {
    this.$htmlBody = $('html, body');
    this.$scrollTriggers = $('.jsc-smooth-scroll');
  },
  prepare: function () {
    if (location.hash != "") {
      this.moveCourse(location.hash, false);
    }
  },
  bindEvent: function () {
    var self = this;
    this.$scrollTriggers.each(function () {
      var $this = $(this);
      $this.on('click', function (e) {
        e.preventDefault();
        self.moveCourse($(this).attr('href'), true);
      });
    });
  },
  moveCourse: function (id, isAnimate) {
    if (!id) return;
    var $target = $(id);
    if ($target.length === 0) return;
    var courseTop = $target.offset().top + this.OFFSET_Y;
    this.$htmlBody.animate({
      scrollTop: courseTop
    }, isAnimate ? this.SLIDE_SPEED : 0);
  }
}

POTEPANCAMP.PAGE_TOP = {
  init: function () {
    this.setParams();
    this.bindEvent();
  },
  setParams: function () {
    this.$pageTopButton = $('.jsi-page-top');
  },
  bindEvent: function () {
    this.$pageTopButton.click(function () {
      $('html,body').animate({
        scrollTop: 0
      }, '800');
      return false;
    })
  }
}

POTEPANCAMP.ACCORDION = {
  init: function () {
    this.setParams();
    this.bindEvent();
  },
  setParams: function () {
    this.$accordion = $('.faq-list-border');
  },
  bindEvent: function () {
    this.$accordion.each(function () {
      var $myself = $(this);
      $myself.click(function () {
        var $selectedContents = $myself.prev();
        var $selectedTitle = $selectedContents.prev();
        if ($selectedContents.is(':hidden')) {
          if ($selectedContents.is(':animated')) {
            return;
          }
          $selectedContents.slideDown(500);
          $selectedTitle.addClass('visible');
        }
        if ($selectedContents.is(':visible')) {
          if ($selectedContents.is(':animated')) {
            return;
          }
          $selectedContents.slideUp(500);
          $selectedTitle.removeClass('visible');
        }
      })
    })
  }
}

POTEPANCAMP.PAGE_TRANSITION = {
  init: function () {
    this.setParams();
    this.prepare();
    this.bindEvent();
  },
  setParams: function () {
    this.$inputCourse = $('#course');
    this.$inputName = $('#name');
    this.$inputMailaddress = $('#mailaddress');
    this.$inputTel = $('#tel');
    this.$errorMessageCourse = $("#course_error");
    this.$errorMessageName = $("#name_error");
    this.$errorMessageMailaddress = $("#mailaddress_error");
    this.$errorMessageTel = $("#tel_error");
    this.$requiredInput = $('form input:required, form select:required');
    this.$sendButton = $('#btn_send');
  },
  prepare: function () {
    this.changePullDownColor();
    this.isEnabledSendButton();
  },
  bindEvent: function () {
    var self = this;
    this.$requiredInput.on('input', $.proxy(this.isEnabledSendButton, this));
    $('#course').change($.proxy(this.isEnabledSendButton, this));
    this.$sendButton.on('click', $.proxy(function (e) {
      e.preventDefault();
      this.submit();
    }, this));
  },
  submit() {
    var result = this.checkInput();
    if (result === true) {
      document.potepancampForm.submit();
    }
  },
  isEnabledSendButton: function () {
    var isEnable = true;
    this.$requiredInput.each(function () {
      if ($(this).val() === "") isEnable = isEnable && false;
    });
    this.$sendButton.prop('disabled', !isEnable);
  },
  changePullDownColor: function () {
    $('select').on('change', function () {
      $(this).css('color', $(this).find('option:selected').get(0).style.color);
    }).trigger('change');
  },
  checkInput: function () {
    var result = true;
    this.$inputCourse.removeClass("inp_error");
    this.$inputName.removeClass("inp_error");
    this.$inputMailaddress.removeClass("inp_error");
    this.$inputTel.removeClass("inp_error");
    this.$errorMessageCourse.empty();
    this.$errorMessageName.empty();
    this.$errorMessageMailaddress.empty();
    this.$errorMessageTel.empty();
    var course = this.$inputCourse.val();
    var name = this.$inputName.val();
    var mailaddress = this.$inputMailaddress.val();
    var tel = this.$inputTel.val().replace(/[━.*‐.*―.*－.*\–.*ー.*\-]/gi, '');
    if (course == "none") {
      this.$errorMessageCourse.html(" コースを選択してください。");
      this.$inputCourse.addClass("inp_error");
      this.$inputCourse.css('color', '#FF4949');
      result = false;
    }
    if (name == "") {
      this.$errorMessageName.html(" お名前を入力してください。");
      this.$inputName.addClass("inp_error");
      result = false;
    } else if (name.match(/[0-9.,０-９．，]+/u)) {
      this.$errorMessageName.html(" 正しいお名前を入力してください。");
      this.$inputName.addClass("inp_error");
      result = false;
    } else if (name.length > 25) {
      this.$errorMessageName.html(" お名前は25文字以内で入力してください。");
      this.$inputName.addClass("inp_error");
      result = false;
    }
    if (mailaddress == "") {
      this.$errorMessageMailaddress.html(" メールアドレスを入力してください。");
      this.$inputMailaddress.addClass("inp_error");
      result = false;
    } else if (!mailaddress.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
      this.$errorMessageMailaddress.html(" 正しいメールアドレスを入力してください。");
      this.$inputMailaddress.addClass("inp_error");
      result = false;
    } else if (mailaddress.length > 255) {
      this.$errorMessageMailaddress.html(" メールアドレスは255文字以内で入力してください。");
      this.$inputMailaddress.addClass("inp_error");
      result = false;
    }
    if (tel == "") {
      this.$errorMessageTel.html(" 電話番号を入力してください。");
      this.$inputTel.addClass("inp_error");
      result = false;
    } else if ((!tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) || (tel.length < 10)) {
      this.$errorMessageTel.html(" 正しい電話番号を入力してください。");
      this.$inputTel.addClass("inp_error");
      result = false;
    }
    return result;
  }
}

$(function () {
  POTEPANCAMP.HAMBURGER_MENU.init();
  POTEPANCAMP.CAROUSEL.init();
  POTEPANCAMP.PLAN_NAV.init();
  POTEPANCAMP.PAGE_TOP.init();
  POTEPANCAMP.ACCORDION.init();
  POTEPANCAMP.PAGE_TRANSITION.init();
});
$(window).on('load', function () {});
