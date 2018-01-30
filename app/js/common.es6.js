$(document).ready(() => {
  // svgs sprites working everywhere now
  /*
 * https://github.com/jonathantneal/svg4everybody
 */
  svg4everybody()

  // simle toggle script
  $(document).on('click', '.js-slide-toggle', function (e) {
    e.preventDefault()

    const $this = $(this)
    const trigger = $this.data('slidetrigger')
    const selector = $this.data('slidetoggle') || '.js-slide-toggle-content'
    const context = $this.data('slidecontext')
    const mode = $this.data('slidemode')
    const thisonetoggle = $this.data('thisclass')
    const toggleclass = $this.data('slideclasstoggle')
    const effect = $this.data('slideeffect')
    const bodycover = $this.data('bodycover')
    const bodyfix = $this.data('bodyfix')
    const $target = selector ? (context ? $(selector, $this.closest(context)) : $(selector)) : $this.closest(context)

    if (mode) {
      if ((mode === 'desktop' && global.mobile) || (mode === 'mobile' && !global.mobile)) {
        return
      }
    }
    if (thisonetoggle) {
      $(this).toggleClass('activate')
    }

    if (trigger) {
      $('.js-slide-toggle[data-slidetoggle=', ' + trigger + ', ']').click()
      return
    }

    if (effect === 'fade') {
      $target.each(function () {
        if ($(this).is(':visible')) {
          $(this).fadeOut(250)
        } else {
          $(this).addClass('animate')
          $(this).fadeIn(250, () => {
            $target.removeClass('animate')
            $(window).trigger('scroll')
            $(window).trigger('resize')
          })
        }
      })
    } else if (effect === 'slideleft') {
      const isActive = $target.hasClass('active')
      const $parent = $target.parent()
      const $findBody = $target.parents('body') // find body from the target element - back to top.

      $parent.addClass('b-overflow')
      $target.show().animate({
        left: $target.hasClass('active') ? '-100%' : '0', // the target class has to me 'left: -100%;'
      }, 350, false, () => {
        $(window).trigger('scroll')
        $(window).trigger('resize')
        $parent.removeClass('b-overflow').end().toggleClass('active')
        $target.closest(toggleclass).toggleClass('activate')
        $target.closest(bodyfix).parents('body').toggleClass('bodyfixed') // toggle body
        $findBody.find(bodycover).toggleClass('js-cover-content') // toggleClass for cover(content) [has to be css rules at 'cover-content']

        $target.toggle(!isActive)
      })
    } else if (effect === 'slideright') {
      const isActive = $target.hasClass('active')
      const $parent = $target.parent()
      const $findBody = $target.parents('body') // find body from the target element - back to top.

      $parent.addClass('b-overflow')
      $target.show().animate({
        right: $target.hasClass('active') ? '-100%' : '0', // the target class has to me 'right: -100%;'
      }, 350, false, () => {
        $(window).trigger('scroll')
        $(window).trigger('resize')
        $parent.removeClass('b-overflow').end().toggleClass('active')
        $target.closest(toggleclass).toggleClass('activate')
        $target.closest(bodyfix).parents('body').toggleClass('bodyfixed') // toggle body
        $findBody.find(bodycover).toggleClass('js-cover-content') // toggleClass for cover(content) [has to be css rules at 'cover-content']

        $target.toggle(!isActive)
      })
    } else {
      const $findBody = $target.parents('body')

      $target.addClass('animate')
      $target.closest(bodyfix).parents('body').toggleClass('bodyfixed') // toggle body
      $findBody.find(bodycover).toggleClass('js-cover-content')
      $target.closest(toggleclass).toggleClass('activate')
      $target.slideToggle(300, () => {
        $target.removeClass('animate')
        $(window).trigger('scroll')
        $(window).trigger('resize')
      })
    }
    if ($this.data('slidehide')) {
      $this.toggle()
    }
  })

  /* ajax requests */
  $(document).on('click', '.js-ajax', function () {
    const urlget = $(this).data('urlget')
    const placetoload = $(this).data('placetoload')

    if ($(window).width() > 992) {
      $(placetoload).append('<span class="b-preloader">LOADING...</span>')
      $('.b-preloader').show()

      $.ajax({
        url: urlget,
        success(result) {
          $('.b-preloader').fadeOut(() => { $('.b-preloader').remove() })


          // console.log(array);
          $(placetoload).find('div').hide().html(result)
            .fadeIn()

          /* --------------- libs reinitialize --------------- */
        }, // success
      })
    } // if
  })
})
