'use strict';

$(document).ready(function () {
  // svgs sprites working everywhere now
  /*
  * https://github.com/jonathantneal/svg4everybody
  */
  svg4everybody();

  // simle toggle script
  $(document).on('click', '.js-slide-toggle', function (e) {
    e.preventDefault();

    var $this = $(this);
    var trigger = $this.data('slidetrigger');
    var selector = $this.data('slidetoggle') || '.js-slide-toggle-content';
    var context = $this.data('slidecontext');
    var mode = $this.data('slidemode');
    var thisonetoggle = $this.data('thisclass');
    var toggleclass = $this.data('slideclasstoggle');
    var effect = $this.data('slideeffect');
    var bodycover = $this.data('bodycover');
    var bodyfix = $this.data('bodyfix');
    var $target = selector ? context ? $(selector, $this.closest(context)) : $(selector) : $this.closest(context);

    if (mode) {
      if (mode === 'desktop' && global.mobile || mode === 'mobile' && !global.mobile) {
        return;
      }
    }
    if (thisonetoggle) {
      $(this).toggleClass('activate');
    }

    if (trigger) {
      $('.js-slide-toggle[data-slidetoggle=', ' + trigger + ', ']').click();
      return;
    }

    if (effect === 'fade') {
      $target.each(function () {
        if ($(this).is(':visible')) {
          $(this).fadeOut(250);
        } else {
          $(this).addClass('animate');
          $(this).fadeIn(250, function () {
            $target.removeClass('animate');
            $(window).trigger('scroll');
            $(window).trigger('resize');
          });
        }
      });
    } else if (effect === 'slideleft') {
      var isActive = $target.hasClass('active');
      var $parent = $target.parent();
      var $findBody = $target.parents('body'); // find body from the target element - back to top.

      $parent.addClass('b-overflow');
      $target.show().animate({
        left: $target.hasClass('active') ? '-100%' : '0' // the target class has to me 'left: -100%;'
      }, 350, false, function () {
        $(window).trigger('scroll');
        $(window).trigger('resize');
        $parent.removeClass('b-overflow').end().toggleClass('active');
        $target.closest(toggleclass).toggleClass('activate');
        $target.closest(bodyfix).parents('body').toggleClass('bodyfixed'); // toggle body
        $findBody.find(bodycover).toggleClass('js-cover-content'); // toggleClass for cover(content) [has to be css rules at 'cover-content']

        $target.toggle(!isActive);
      });
    } else if (effect === 'slideright') {
      var _isActive = $target.hasClass('active');
      var _$parent = $target.parent();
      var _$findBody = $target.parents('body'); // find body from the target element - back to top.

      _$parent.addClass('b-overflow');
      $target.show().animate({
        right: $target.hasClass('active') ? '-100%' : '0' // the target class has to me 'right: -100%;'
      }, 350, false, function () {
        $(window).trigger('scroll');
        $(window).trigger('resize');
        _$parent.removeClass('b-overflow').end().toggleClass('active');
        $target.closest(toggleclass).toggleClass('activate');
        $target.closest(bodyfix).parents('body').toggleClass('bodyfixed'); // toggle body
        _$findBody.find(bodycover).toggleClass('js-cover-content'); // toggleClass for cover(content) [has to be css rules at 'cover-content']

        $target.toggle(!_isActive);
      });
    } else {
      var _$findBody2 = $target.parents('body');

      $target.addClass('animate');
      $target.closest(bodyfix).parents('body').toggleClass('bodyfixed'); // toggle body
      _$findBody2.find(bodycover).toggleClass('js-cover-content');
      $target.closest(toggleclass).toggleClass('activate');
      $target.slideToggle(300, function () {
        $target.removeClass('animate');
        $(window).trigger('scroll');
        $(window).trigger('resize');
      });
    }
    if ($this.data('slidehide')) {
      $this.toggle();
    }
  });

  /* ajax requests */
  $(document).on('click', '.js-ajax', function () {
    var urlget = $(this).data('urlget');
    var placetoload = $(this).data('placetoload');

    if ($(window).width() > 992) {
      $(placetoload).append('<span class="b-preloader">LOADING...</span>');
      $('.b-preloader').show();

      $.ajax({
        url: urlget,
        success: function success(result) {
          $('.b-preloader').fadeOut(function () {
            $('.b-preloader').remove();
          });

          // console.log(array);
          $(placetoload).find('div').hide().html(result).fadeIn();

          /* --------------- libs reinitialize --------------- */
        }
      } // success
      );
    } // if
  });
});