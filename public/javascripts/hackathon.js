$(document).ready(function() {
	$(document).foundation();

	$(window).resize(function() {
             	$('.text-top').height($('.logo').height());
	});

	$(".field").css("min-height", $(window).height());

	$(".sections").find("a").click(function(e) {
		e.preventDefault();
		
		var section = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $(section).offset().top
		});
            });
});