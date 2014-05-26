$(document).ready(function() {
	$(document).foundation(foundationConfig());

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
	configureConfirmRegistrationDialog();
});

function foundationConfig() {
	return {
		abide: {
			live_validate: false,
			patterns: {
				date: /(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d/,
			},
			validators: {
				cpf: function(el, required, parent) {
					if (typeof(el.value) === "string" && el.value.trim().length > 0) {
						return isCpfValid(el.value);
					}

					return !required;
				}
			}
		}
	}
}

function configureRegistratioForm() {
	var confirmDialog = $("#confirm-registration");

	var form = $("#inscricoes form");
	form.submit(function() {
		return false;
	});

	form.on("valid", function() {
		confirmDialog.foundation("reveal", "open");
		$("#registration-error").hide();
	});

	form.find("#cpf").mask("999.999.999-99");
	form.find("#bornDate").mask("99/99/9999");
	form.find("#feevaleCode").mask("9999999");
	form.find("#phone").mask("(99) 9999-9999?9");
}

function configureConfirmRegistrationDialog() {
	var confirmDialog = $("#confirm-registration");
	var form = $("#inscricoes form");
	
	confirmDialog.on("closed", function() {
		confirmDialog.find(".loading").hide();
		confirmDialog.find(".default-button").show();
	});

	confirmDialog.find("#cancel-registration").click(function() {
		confirmDialog.foundation("reveal", "close");
	});

	confirmDialog.find("#submit-registration").click(function() {
		confirmDialog.find(".default-button").fadeOut(function() {
			confirmDialog.find(".loading").fadeIn();
		});

		setTimeout(function() {
			$.post("/register/add", form.serialize(), function(response) {
				if (response.success) {
					$("#registration-sucess").foundation("reveal", "open");
					form[0].reset();
				} else {
					showRegistrationError(confirmDialog)
				}
			}, "json").fail(function() {
				showRegistrationError(confirmDialog);
			});
		}, 100);
	});
}

function showRegistrationError(dialog) {
	$("#registration-error").show();

	$("html, body").animate({
		scrollTop: $("#inscricoes").offset().top
	});

	if (dialog) {
		dialog.foundation("reveal", "close");
	}
}

function isCpfValid(cpf) {
	cpf = cpf.replace(new RegExp("[^0-9]", "g"), "");

	if (cpf.length < 11) {
		return false;
	} else if (cpf.length > 11) {
		cpf = cpf.substring(0, 11);
	}

	var checksum = cpf.substring(9, 11);
	cpf = cpf.substring(0, 9);

	var firstCheksum = module11(cpf);
	var secondChecksum = module11(cpf + firstCheksum);

	return (firstCheksum + secondChecksum) == checksum;
}

function module11(s) {
	var result = 0;
	for (var i = 0, multiple = (s.length + 1); i < s.length; i++, multiple--) {
		var number = parseInt(s.charAt(i));
		result += (number * multiple);
	}

	var rest = result%11;
	return rest < 2 ? "0" : (11-rest).toString(); 
}