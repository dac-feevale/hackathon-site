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

	configureRegistratioForm();
});

function configureRegistratioForm() {
	var form = $("#inscricoes");
	form.submit(function() {
		return false;
	});

	form.find("#cpf").mask("999.999.999-99");
	form.find("#bornDate").mask("99/99/9999");
	form.find("#feevaleCode").mask("9999999");
	form.find("#phone").mask("(99) 9999-9999?9");
}