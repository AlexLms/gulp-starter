if (!window.global) {
	window.global = {};
}
$(document).ready(function() {

	// Datepicker 
	/* lib - https://github.com/Eonasdan/bootstrap-datetimepicker
	*  installation - https://eonasdan.github.io/bootstrap-datetimepicker/Installing/
	*  change language - http://momentjs.com/docs/#/i18n/loading-into-browser/
	*/

	//font-awesome
	/* http://fontawesome.io/icons/ */

	//bootstrap
	/* http://getbootstrap.com/
	* last version(4) with flexboxes [not in ie<9] | current 3.3.7(floats)
	*/

	// popups
	/* http://dimsemenov.com/plugins/magnific-popup/ */

	// same height of blocks
	/* https://github.com/liabru/jquery-match-height */


	// Owl-carousel
	/*
	* lib - https://owlcarousel2.github.io/OwlCarousel2/
	* installation - https://owlcarousel2.github.io/OwlCarousel2/docs/started-installation.html
	*/ 

	global.breakpointsname = ["xs", "sm", "smbig", "md", "lg", "max"];
	global.breakpoints = {
		sm: 760,
		smbig: 992,
		md: 1248,
		lg: 1568,
		max: 1672
	};

	
	// breakpoints options
	$(window).on("resize.ismobile", function() {
		var newBreakpoint = "xs";
		$.each(global.breakpoints, function(breakpoint) {
			var points = this + 0,
				match = window.matchMedia("(min-width:" + points + "px)").matches;

			if (breakpoint == "sm") {
				global.isMobile = !match;
				global.isTablet = !match;
			}
			if (breakpoint == "smbig") {
				global.isTablet = !match;
			}
			if (!match) {
				return false;
			} else {
				newBreakpoint = breakpoint;
			}
		});

		if (newBreakpoint !== global.breakpoint) {
			global.breakpoint = newBreakpoint;
			global.isDesktop = (["md", "lg", "max"].indexOf(global.breakpoint) !== -1);
			$(window).trigger("ismobilechange");
		}

		global.wHeight = $(window).height();
		global.wWidth = $(window).width() - parseInt($(document.body).css("border-right-width"));
	});
	$(window).trigger("resize.ismobile");

	// simle toggle script
	$(document).on("click", ".js-slide-toggle", function(e) {
		e.preventDefault();

		var $this = $(this),
			trigger = $this.data("slidetrigger"),
			selector = $this.data("slidetoggle") || ".js-slide-toggle-content",
			context = $this.data("slidecontext"),
			mode = $this.data("slidemode"),
			toggleclass = $this.data("slideclasstoggle"),
			effect = $this.data("slideeffect"),
			bodycover = $this.data("bodycover"),
			bodyfix = $this.data("bodyfix"),
			$target = selector ? (context ? $(selector, $this.closest(context)) : $(selector)) : $this.closest(context);

		if (mode) {
			if ((mode == "desktop" && global.mobile) || (mode == "mobile" && !global.mobile)) {
				return;
			}
		}

		if (trigger) {
			$(".js-slide-toggle[data-slidetoggle='" + trigger + "']").click();
			return;
		}

		if (effect == "fade") {
			$target.each(function() {
				if ($(this).is(":visible")) {
					$(this).fadeOut(250);
				} else {
					$(this).addClass("animate");
					$(this).fadeIn(250, function() {
						$target.removeClass("animate");
						$(window).trigger("scroll");
						$(window).trigger("resize");
					});
				}
			});
		} else if (effect == "slideleft") {
			var is_active = $target.hasClass("active"),
				$parent = $target.parent();
				$findBody = $target.parents("body"); // find body from the target element - back to top. 

			$parent.addClass("b-overflow");
			$target.show().animate({
				left: $target.hasClass("active") ? "-100%" : "0" //the target class has to me "left: -100%;"
			}, 350, false, function() {
				$(window).trigger("scroll");
				$(window).trigger("resize");
				$parent.removeClass("b-overflow").end().toggleClass("active");
				$target.closest(toggleclass).toggleClass("activate");
				$target.closest(bodyfix).parents("body").toggleClass("bodyfixed"); // toggle body
				$findBody.find(bodycover).toggleClass("js-cover-content"); // toggleClass for cover(content) [has to be css rules at "cover-content"]

				$target.toggle(!is_active);
			});
		} else {
			$findBody = $target.parents("body");

			$target.addClass("animate");
			$target.closest(bodyfix).parents("body").toggleClass("bodyfixed"); //toggle body
			$findBody.find(bodycover).toggleClass("js-cover-content");
			$target.closest(toggleclass).toggleClass("activate");
			$target.slideToggle(300, function() {
				$target.removeClass("animate");
				$(window).trigger("scroll");
				$(window).trigger("resize");
			});
		}
		if ($this.data("slidehide")) {
			$this.toggle();
		}

	});
});
