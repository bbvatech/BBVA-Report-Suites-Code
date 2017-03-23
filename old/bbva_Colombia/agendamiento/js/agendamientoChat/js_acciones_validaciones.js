$(function() {

	function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for ( var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) {
				return sParameterName[1];
			}
		}
	}

	var url = '';

	var param = getUrlParameter('product') || '004';
	var asesor = getUrlParameter('asesor') || '';
	var product_name = '';
	var product_classname = '';
	switch (param) {
	case '001':
		product_name = "Mastercard Platinum";
		product_classname = "credit_card_bg_mastercard_bbva_platinum";
		break;

	case '002':
		product_name = "Mastercard Standard";
		product_classname = "credit_card_bg_mastercard_bbva_standard";
		break;

	case '003':
		product_name = "Visa Platinum";
		product_classname = "credit_card_bg_visa_bbva_platinum";
		break;

	case '004':
		product_name = "Visa Clásica";
		product_classname = "credit_card_bg_visa_bbva_clasica";
		break;

	case '005':
		product_name = "Mastercard Gold";
		product_classname = "credit_card_bg_mastercad_bbva_gold";
		break;

	case '006':
		product_name = "Visa Oro";
		product_classname = "credit_card_bg_visa_bbva_oro";
		break;

	case '007':
		product_name = "Mastercard Black";
		product_classname = "credit_card_bg_mastercard_bbva_black";
		break;

	case '008':
		product_name = "Mastercard Héroes";
		product_classname = "credit_card_bg_mastercard_bbva_heroes";
		break;

	case '009':
		product_name = "Visa Avianca LifeMiles Gold";
		product_classname = "credit_card_bg_gold";
		break;

	case '010':
		product_name = "Visa Avianca LifeMiles Platinum";
		product_classname = "credit_card_bg_platinum";
		break;

	case '011':
		product_name = "Visa Avianca LifeMiles Platinum Elite";
		product_classname = "credit_card_bg_platinum_elite";
		break;

	case '012':
		product_name = "Visa Clásica Mujer";
		product_classname = "credit_card_bg_visa_mujer_clasica";
		break;

	case '013':
		product_name = "Visa Oro Mujer";
		product_classname = "credit_card_bg_visa_mujer_oro";
		break;

	case '014':
		product_name = "Visa Platinum Mujer";
		product_classname = "credit_card_bg_visa_mujer_platinum";
		break;

	case '015':
		product_name = "Mastercard Gold Visión Mundial";
		product_classname = "credit_card_bg_mastercard_visionmundial_gold";
		break;

	case '016':
		product_name = "Mastercard Standard Visión Mundial";
		product_classname = "credit_card_bg_mastercard_visionmundial_standard";
		break;

	case '017':
		product_name = "Mastercard Euro";
		product_classname = "credit_card_bg_gold";
		break;

	case '018':
		product_name = "Visa Congelada";
		product_classname = "credit_card_bg_visa_bbva_congelada";
		break;

	default:
		product_name = "Visa Clásica";
		product_classname = "credit_card_bg_visa_bbva_clasica";
		break;
	}
	$("#error_div1").css('display', 'none');
	$("#error_div3").css('display', 'none');
	$("#error_div4").css('display', 'none');

	var form = {
		credit_cards_select : [],
		error : '',
		id : '',
		name : '',
		edad : 0,
		lastname : '',
		type_id : '',
		form_step1 : '',
		form_step2 : '',
		form_step3 : '',
		situacion_laboral : '',
		init : function() {
			this.events();

			$('#lb_principalearn').priceFormat({
				prefix : '$',
				centsLimit : 0
			});

		},
		events : function() {
			$('#next_one,#link_next_one').on(
					'click',
					function(e) {
						$("#lb_accept").prop('checked', false);
						$('#accept_term').attr('disabled', 'disabled').css(
								'opacity', '0.5');
						e.preventDefault();
						ga('send', 'event', 'agendamientotc-paso1-completado',
								'click', 'boton-siguiente-paso1');
						form.step1();
					});

			/*
			 * $('.arrow_collapsable').on('click',function(){
			 * if(!$(this).hasClass("rotated_arrow_right")) {
			 * $(this).addClass('rotated_arrow_right'); } else {
			 * $(this).removeClass('rotated_arrow_right'); } });
			 */

			$('body').on(
					'click',
					'#next_three',
					function(e) {
						e.preventDefault();
						ga('send', 'event', 'agendamientotc-paso3-completado',
								'click', 'boton-siguiente-paso3');
						form.step3();
					});

			$('body').on(
					'click',
					'#next_four',
					function(e) {
						e.preventDefault();
						ga('send', 'event', 'agendamientotc-paso4-completado',
								'click', 'boton-siguiente-paso4');
						form.step4();
					});

			$('#lb_principalearn').priceFormat({
				prefix : '$',
				centsLimit : 0
			}).on('click', function() {
				if (!$(this).hasClass('open_once')) {
					$(this).addClass('open_once');
					$('#firstModal').foundation('reveal', 'open');
				}
			});

			$('#btnFinalizar').on('click', function(e) {
				e.preventDefault();
				$('#content5').foundation('reveal', 'close');
				// form.collapsable("#content4-collapsable",null);
				// form.rotated_arrow("#content4_arrow");
			});

			$('#accept_term').on('click', function(e) {
				e.preventDefault();
				form.step1();
			});

			/* select a credit card */

			$('body').on('click', '.radio_card_selection', function() {
				product_name = $(this).data('product');
                product_classname = $(this).data('classname');
				// console.log(product_classname);
				// form.form_step1.lb_creditcard = product_name;
				form.progress_slide(1);
				form.step2();
				form.scroll_to(".content3");
			})

		},

		progress_slide : function(step) {

			var active_elem = '';
			var width = '';

			switch (step) {
			case 1:
				active_elem = '.second';
				width = ($('.progress-line').width() / 3) - 14;
				break;

			case 2:
				active_elem = '.third';
				width = (($('.progress-line').width() / 3) * 2) - 14;
				break;
			case 3:
				active_elem = '.fourth';
				width = $('.progress-line').width() - 16;
				break;
			}

			$('.progress-display').animate({
				width : width
			}, 1000, function() {
				$(active_elem).addClass('active');
			});

		},
		step1 : function() {
			/*
			 * types 1 : obligatory 2 : check, obligatory 3 : numeric,
			 * obligatory 4 : email, obligatory 5 : numeric,with a max,
			 * obligatory 6 : numeric,with a length, obligatory 7 : different of
			 * a, obligatory 8 : numeric, phone, with a length 9 : numeric,
			 * greater or lower than, obligatory
			 */
			var obj = {
				lb_typeid : {
					msg : 'Debes seleccionar un tipo de documento',
					field : $('#lb_typeid'),
					field_foundation : $("#lb_typeid-button"),
					type : 1
				},
				lb_id : {
					msg : 'Escribe un número de identificación válido',
					field : $('#lb_id'),
					type : 3
				},
				id_day : {
					msg : 'Escribe un día válido',
					field : $('#id_day'),
					type : 11,
					max : 31,
					maxlength : 2
				},
				id_month : {
					msg : 'Escribe un mes válido',
					field : $('#id_month'),
					type : 11,
					max : 12,
					maxlength : 2
				},
				id_year : {
					msg : 'Escribe un año válido',
					field : $('#id_year'),
					type : 11,
					max : moment().format("YYYY"),
					maxlength : 4
				},
				lb_email : {
					msg : 'Escribe un correo válido',
					field : $('#lb_email'),
					type : 4
				},
				lb_cellphone : {
					msg : 'Escribe un celular válido',
					field : $('#lb_celphone'),
					type : 8,
					max : 10
				},
				lb_principalearn : {
					msg : 'Digita un valor de ingresos fijos mensuales mayor o igual a $1.000.000',
					field : $('#lb_principalearn'),
					type : 9,
					lower_or_greater : 'greater',
					than : 999999
				},
				lb_accept : {
					msg : 'Para continuar debes aceptar los términos y condiciones',
					field : $('#lb_accept'),
					type : 2
				}
			}

			if (this.validate(obj)) {
				var date = obj.id_year.field.val() + obj.id_month.field.val()
						+ obj.id_day.field.val();

				if (this.validate_date(date)) {
					$('.error_msg').css('opacity', '0');

					/*
					 * the flow has change we put a step first to validate that
					 * the earns actually match with the selected credit card
					 */
					// old flow
					// form.post1(obj);
					// new flow
					$("#error_div1").css('display', 'none');
					this.post1(obj);

				} else {
					$("#error_div1").css('display', 'block');
					form.show_error();
				}

			}
		},
		back1 : function() {

			$('#lb_id').val('');
			$('#lb_typeid').val('');
			$('#lb_email').val('');
			$('#lb_accept').attr('checked', false);
			$('#id_day').val('');
			$('#id_month').val('');
			$('#id_year').val('');
			$('#lb_principalearn').val('');
			$('#lb_celphone').val('');

			setTimeout(function() {
				$('#content2').foundation('reveal', 'close');
				/* hidde the continue buttons in step 2 */
				$('#btn_aprobado').hide();
				$('#btn_preaprobado').hide();
				$('#btn_solicitud_previa').hide();
				$('#btn_no_continuar').hide();

				$('.content1').show();
				$('#content1-error').show();
				$('#content3-error').hide();
				$('#content4-error').hide();
				$("#lb_typeid").selectmenu("refresh");
			}, 500);

		},
		post1 : function(obj) {
			/*
			 * $('.general_content').hide(); $('.content1').hide();
			 * $('.content_loader').show();
			 */

			$('#content_loader').foundation('reveal', 'open');

			if (obj) {
			} else {
				obj = form.obj_auxstep1
			}

			form.id = parseInt(obj.lb_id.field.val());
			form.type_id = obj.lb_typeid.field.val();

			var poster = {
				action : "step1",
				lb_id : parseInt(obj.lb_id.field.val()),
				lb_typeid : obj.lb_typeid.field.val(),
				lb_email : obj.lb_email.field.val(),
				lb_accept : /* obj.lb_accept.field.prop( "checked" ) */true,
				lb_creditcard : product_name,
				lb_principalearn : obj.lb_principalearn.field.val(),
				lb_cellphone : obj.lb_cellphone.field.val(),
				lb_fechaexpedicion : obj.id_day.field.val() + '/'
						+ obj.id_month.field.val() + '/'
						+ obj.id_year.field.val(),
				lb_asesor : asesor
			};

			form.form_step1 = poster;

			$
					.ajax({
						method : "POST",
						url : url + "/VentasDG/Validacion",
						timeout : 60000,
						data : poster
					})
					.done(
							function(msg) {

								$('body').off('click', '#next_two_aprobado');
								$('body').off('click', '#next_two_preaprobado');
								$('body').off('click',
										'#next_two_solicitud_previa');
								$('body')
										.off('click', '#next_two_no_continuar');

								switch (msg.result) {
								case 0:

									// var id = $('#next_two') &&
									// $('#next_no_continue') &&
									// $('#next_preaprobado') &&
									// $('#next_proceso_en_curso');

									// id.html('Continuar').removeAttr('id').attr('id',
									// 'next_two');

									$('#btn_aprobado').show();
									$('#img_validacion')
											.html(
													'<img src="img/icon_aprobacion.jpg">');
									// $('#next_two').html('Continuar');

									$('#texto_validacion')
											.html(
													'Nos complace informarte que tu proceso de validación ha sido exitoso. Por favor continúa con el registro de tu información para completar la solicitud de tu Tarjeta de Crédito BBVA. Adelante.');

									$('body')
											.on(
													'click',
													'#next_two_aprobado',
													function(e) {
														e.preventDefault();
														ga(
																'send',
																'event',
																'agendamientotc-paso2-completado',
																'click',
																'boton-siguiente-paso2');
														form
																.validate_type_credit_card(obj);
													});
									break;
								case 2:

									form.post_googledocs_preaprobados();

									$('#btn_preaprobado').show();

									$('#texto_validacion')
											.html(
													'¡Buenas Noticias!<br>Tienes un pre-aprobado a tu disposición. Uno de nuestros asesores se pondrá en contacto contigo próximamente. Gracias por preferirnos.');

									$('body')
											.on(
													'click',
													'#next_two_preaprobado',
													function(e) {
														e.preventDefault();
														ga(
																'send',
																'event',
																'agendamientotc-paso2-finalizado',
																'click',
																'boton-siguiente-paso2-preaprobado');
														form.back1();
													});

									break;
								case 3:

									$('#img_validacion')
											.html(
													'<img src="img/icon_denegacion.jpg">');
									$('#texto_validacion')
											.html(
													'Te confirmamos que actualmente tienes un proceso de solicitud de tarjeta de crédito realizado desde nuestra página web. Agradecemos tu comprensión, seguiremos atendiendo tu solicitud inicial para que puedas disfrutar de los beneficios nuestras Tarjetas de Crédito BBVA.');

									$('#btn_solicitud_previa').show();

									// $('#next_two').html('Finalizar');

									$('body')
											.on(
													'click',
													'#next_two_solicitud_previa',
													function(e) {
														e.preventDefault();
														ga(
																'send',
																'event',
																'agendamientotc-paso2-finalizado',
																'click',
																'boton-siguiente-paso2-finalizado')
														form.back1();
													});

									break;

								case 4:

									$('#img_validacion')
											.html(
													'<img src="img/icon_aprobacion.jpg">');
									$('#texto_validacion')
											.html(
													'Haces parte del Equipo BBVA Colombia, por esto tu solicitud de Tarjeta de Crédito será tramitada por medio de la oficina Gente BBVA.');

									$('#btn_gente_bbva').show();

									form.send_dataGente();

									// $('#next_two').html('Finalizar');

									$('body')
											.on(
													'click',
													'#next_two_equipoBBVA',
													function(e) {
														e.preventDefault();
														ga(
																'send',
																'event',
																'agendamientotc-paso2-finalizado',
																'click',
																'boton-equipoBBVA-paso2-finalizado')
														form.back1();
													});

									break;

								case 100:

									$('#img_validacion')
											.html(
													'<img src="img/icon_denegacion.jpg">');
									$('#texto_validacion')
											.html(
													'Estamos presentando inconvenientes con nuestro sistema y no podemos procesar tu solicitud en este momento, te invitamos a intentarlo más tarde.');

									$('#btn_error_platform').show();

									// $('#next_two').html('Finalizar');

									$('body')
											.on(
													'click',
													'#next_two_error_platform',
													function(e) {
														e.preventDefault();
														ga(
																'send',
																'event',
																'agendamientotc-paso2-finalizado-error',
																'click',
																'boton-equipoBBVA-paso2-finalizado-error')
														form.back1();
													});

									break;

								default:
									$('#img_validacion')
											.html(
													'<img src="img/icon_denegacion.jpg">');
									$('#texto_validacion')
											.html(
													'Lo sentimos, según nuestro proceso de validación interna no es posible continuar con tu solicitud. Te agradecemos por ingresar tus datos y por tu interés en nuestras Tarjetas de Crédito BBVA. Te invitamos a realizar tu próxima solicitud de Tarjeta de Crédito BBVA después de 30 días a partir de la fecha.');

									$('#btn_no_continuar').show();

									// $('#next_two').html('Finalizar');

									$('body')
											.on(
													'click',
													'#next_two_no_continuar',
													function(e) {
														e.preventDefault();
														ga(
																'send',
																'event',
																'agendamientotc-paso2-finalizado',
																'click',
																'boton-siguiente-paso2-finalizado')
														form.back1();
													});
									break;
								}

								setTimeout(
										function() {
											// $('.content_loader').hide();
											$('#content2').foundation('reveal',
													'open');
											// $('.content2').show();
										}, 1000);

							})
					.fail(
							function(jqXHR, textStatus) {
								$('#img_validacion').html(
										'<img src="img/icon_denegacion.jpg">');
								$('#texto_validacion')
										.html(
												'Estamos presentando inconvenientes con nuestro sistema y no podemos procesar tu solicitud en este momento, te invitamos a intentarlo más tarde.');
								$('#btn_error_platform').show();
								$('#content2').foundation('reveal', 'open');
								$('body').on('click',
										'#next_two_error_platform',
										function(e) {
											e.preventDefault();
											form.back1();
										});
							});

		},
		step2 : function() {

			setTimeout(function() {
				$('#content2').foundation('reveal', 'close');
				// $('.content2').hide();
				$('.content3').show();
				$('#content1-error').hide();
				$('#content3-error').show();
				$('#content4-error').hide();
				$('#content3-block').removeClass('block');
				$('#general_content-block').addClass('block');
				$('#content1-block').addClass('block');

			}, 500);

			setTimeout(
					function() {

						$("#lb_department")
								.selectmenu(
										{
											change : function(event, data) {

												// console.log(data.item.value);

												var departamentos = new Array();

												switch (data.item.value) {
												case 'Amazonas':
													departamentos = [ {
														name : 'Leticia'
													} ];
													break;
												case 'Antioquia':

													departamentos = [

													{
														name : 'Apartado'
													}, {
														name : 'Medellin'
													}, {
														name : 'Bello'
													}, {
														name : 'Rionegro'
													}, {
														name : 'Caucasia'
													}, {
														name : 'Sabaneta'
													}, {
														name : 'Envigado'
													}, {
														name : 'Itagui'
													}, {
														name : 'La Ceja'
													}, {
														name : 'Puerto Berrio'
													}, {
														name : 'Turbo'
													}, {
														name : 'Urrao'
													} ];
													break;
												case 'Arauca':
													departamentos = [

													{
														name : 'Arauca'
													}, {
														name : 'Saravena'
													} ];
													break;
												case 'Atlantico':
													departamentos = [ {
														name : 'Barranquilla'
													}, {
														name : 'Sabanalarga'
													}, {
														name : 'Soledad'
													} ];
													break;
												case 'Bogotá D.C.':
													departamentos = [ {
														name : 'Bogota D.C.'
													} ];
													break;
												case 'Bolivar':
													departamentos = [

													{
														name : 'Cartagena'
													}, {
														name : 'Magangue'
													}, {
														name : 'Mompóx'
													}, {
														name : 'Villanueva'
													} ];
													break;
												case 'Boyaca':
													departamentos = [

													{
														name : 'Duitama'
													}, {
														name : 'Tunja'
													}, {
														name : 'Chiquinquirá'
													}, {
														name : 'Puerto Boyacá'
													}, {
														name : 'Sogamoso'
													} ];
													break;
												case 'Caldas':
													departamentos = [

													{
														name : 'Manizales'
													}, {
														name : 'La Dorada'
													} ];
													break;
												case 'Caqueta':
													departamentos = [

													{
														name : 'Florencia'
													}

													];

													break;
												case 'Casanare':
													departamentos = [ {
														name : 'Aguazul'
													}, {
														name : 'Paz De Ariporo'
													}, {
														name : 'Yopal'
													}, {
														name : 'Mani'
													}

													];

													break;
												case 'Cauca':
													departamentos = [ {
														name : 'Popayan'
													} ];
													break;
												case 'Cesar':
													departamentos = [ {
														name : 'Curumaní'
													}, {
														name : 'Valledupar'
													}, {
														name : 'Aguachica'
													}, {
														name : 'LA LOMA'
													} ];
													break;
												case 'Choco':
													departamentos = [ {
														name : 'Quibdo'
													} ];
													break;
												case 'Cordoba':
													departamentos = [ {
														name : 'Chinu'
													}, {
														name : 'Montería'
													}, {
														name : 'Lorica'
													}, {
														name : 'Planeta Rica'
													}, {
														name : 'Sahagún'
													}, {
														name : 'Montelíbano'
													}

													];
													break;
												case 'Cundinamarca':
													departamentos = [

													{
														name : 'Tenjo'
													}, {
														name : 'Chía'
													}, {
														name : 'Madrid'
													}, {
														name : 'Funza'
													}, {
														name : 'Fusagasugá'
													}, {
														name : 'Mosquera'
													}, {
														name : 'Zipaquirá'
													}, {
														name : 'Facatativá'
													}, {
														name : 'Girardot'
													}, {
														name : 'Ubaté'
													}, {
														name : 'Villeta'
													}, {
														name : 'Cajicá'
													}, {
														name : 'Tocancipá'
													}, {
														name : 'Tauramena'
													}, {
														name : 'Soacha'
													}, {
														name : 'Cota'
													} ];
													break;
												case 'Huila':
													departamentos = [

													{
														name : 'Neiva'
													}, {
														name : 'Garzón'
													}, {
														name : 'Pitalito'
													}, {
														name : 'Villagarzón'
													} ];
													break;
												case 'La Guajira':
													departamentos = [

													{
														name : 'Albania'
													}, {
														name : 'Barrancas'
													}, {
														name : 'Fonseca'
													}, {
														name : 'Maicao'
													}, {
														name : 'Riohacha'
													} ];
													break;
												case 'Magdalena':
													departamentos = [

													{
														name : 'Santa Marta'
													}, {
														name : 'El Banco'
													}, {
														name : 'Fundación'
													}, {
														name : 'Plato'
													} ];
													break;
												case 'Meta':
													departamentos = [

													{
														name : 'Puerto Gaitán'
													}, {
														name : 'Acacías'
													}, {
														name : 'Villavicencio'
													}, {
														name : 'Puerto López'
													}, {
														name : 'Granada'
													} ];
													break;
												case 'Nariño':
													departamentos = [

													{
														name : 'Ipiales'
													}, {
														name : 'Pasto'
													}, {
														name : 'Tuquerres'
													} ];
													break;
												case 'Norte De Santander':
													departamentos = [

													{
														name : 'Cúcuta'
													}, {
														name : 'Pamplona'
													}, {
														name : 'Ocaña'
													} ];
													break;
												case 'Putumayo':
													departamentos = [

													{
														name : 'Mocoa'
													}, {
														name : 'Puerto Asís'
													}, {
														name : 'Orito'
													} ];
													break;
												case 'Quindio':
													departamentos = [

													{
														name : 'Armenia'
													}, {
														name : 'Calarcá'
													} ];
													break;
												case 'Risaralda':
													departamentos = [

															{
																name : 'Pereira'
															},
															{
																name : 'Dosquebradas'
															},
															{
																name : 'Santa Rosa De Cabal'
															} ];
													break;
												case 'Santander':
													departamentos = [
															{
																name : 'Barrancabermeja'
															},
															{
																name : 'Bucaramanga'
															},
															{
																name : 'Floridablanca'
															},
															{
																name : 'Cimitarra'
															},
															{
																name : 'Barbosa'
															},
															{
																name : 'San Gil'
															},
															{
																name : 'Socorro'
															},
															{
																name : 'Girón'
															},
															{
																name : 'Piedecuesta'
															}, {
																name : 'Vélez'
															} ];
													break;
												case 'Sucre':
													departamentos = [ {
														name : 'Sincelejo'
													}, {
														name : 'San Marcos'
													} ];
													break;
												case 'Tolima':
													departamentos = [ {
														name : 'Ibagué'
													}, {
														name : 'Espinal'
													}, {
														name : 'Mariquita'
													}, {
														name : 'Melgar'
													}

													];
													break;

												case 'San Andrés':
													departamentos = [ {
														name : 'San Andrés'
													} ];
													break;
												case 'Valle del Cauca':
													departamentos = [

													{
														name : 'Cali'
													}, {
														name : 'Buenaventura'
													}, {
														name : 'Buga'
													}, {
														name : 'Cartago'
													}, {
														name : 'Tuluá'
													}, {
														name : 'Yumbo'
													}, {
														name : 'Palmira'
													}, {
														name : 'Jamundí'
													}

													];
													break;
												case 'Vichada':
													departamentos = [ {
														name : 'San Jose De Ocune'
													} ];
													break;
												}

												var lista_city = '<option value="">Selecciona</option>';
												for ( var i = 0; i < departamentos.length; i++) {
													// console.log(departamentos[i].name);

													lista_city = lista_city
															+ '<option value="'
															+ departamentos[i].name
															+ '">'
															+ departamentos[i].name
															+ '</option>';
												}
												;

												$("#lb_city").html(lista_city)
														.selectmenu("refresh");
											}

										}).selectmenu("menuWidget").addClass(
										"overflow_select");
						$("#lb_city").selectmenu();
						$("#lb_status").selectmenu();
						$("#lb_nationality").selectmenu();
						$("#lb_estrato").selectmenu().selectmenu("menuWidget")
								.addClass("overflow_select");

					}, 700);

		},
		step3 : function() {
			var obj = {
				lb_name : {
					msg : 'Escribe un nombre válido',
					field : $('#lb_name'),
					type : 12
				},
				lb_lastname : {
					msg : 'Escribe un apellido válido',
					field : $('#lb_lastname'),
					type : 12
				},
				lb_department : {
					msg : 'Escoge un departamento',
					field : $('#lb_department'),
					field_foundation : $("#lb_department-button"),
					type : 1
				},
				lb_city : {
					msg : 'Escoge una ciudad',
					field : $('#lb_city'),
					field_foundation : $("#lb_city-button"),
					type : 1
				},
				born_day : {
					msg : 'Escribe un dia válido',
					field : $('#born_day'),
					type : 11,
					max : 31,
					maxlength : 2
				},
				born_month : {
					msg : 'Escribe un mes válido',
					field : $('#born_month'),
					type : 11,
					max : 12,
					maxlength : 2
				},
				born_year : {
					msg : 'Escribe un año válido',
					field : $('#born_year'),
					type : 11,
					max : moment().format("YYYY"),
					maxlength : 4,
					min : 1900
				},
				lb_status : {
					msg : 'Escoge una estado civil',
					field : $('#lb_status'),
					field_foundation : $("#lb_status-button"),
					type : 1
				},
				lb_nationality : {
					msg : 'Escoge una nacionalidad',
					field : $('#lb_nationality'),
					field_foundation : $("#lb_nationality-button"),
					type : 1
				},
				lb_sex : {
					msg : 'Escoge un sexo',
					field : $('input:radio[name=lb_sex]:checked'),
					type : 1
				},
				lb_estrato : {
					msg : 'Escoge un estrato',
					field : $('#lb_estrato'),
					field_foundation : $("#lb_estrato-button"),
					type : 1
				}
			}

			if (this.validate(obj)) {
				// YYYYMMDD
				var date = obj.born_year.field.val()
						+ obj.born_month.field.val() + obj.born_day.field.val();

				if (this.validate_date(date)
						&& this.validate_age(date)
						&& this.validate_date_vs_dateNow(1, obj.born_year.field
								.val(), obj.born_month.field.val(),
								obj.born_day.field.val())) {
					$('.error_msg').css('opacity', '0');
					$("#error_div3").css('display', 'none');
					form.post3(obj);
				} else {
					$("#error_div3").css('display', 'block');
					form.show_error();
				}
			}
		},
		post3 : function(obj) {
			// $('.content3').hide();
			// $('.content_loader').show();
			$('#content_loader').foundation('reveal', 'open');

			form.name = obj.lb_name.field.val();
			form.lastname = obj.lb_lastname.field.val();

			var poster = {
				action : "step2",
				lb_name : obj.lb_name.field.val(),
				lb_lastname : obj.lb_lastname.field.val(),
				lb_department : obj.lb_department.field.val(),
				lb_city : obj.lb_city.field.val(),
				lb_borndate : obj.born_day.field.val() + '/'
						+ obj.born_month.field.val() + '/'
						+ obj.born_year.field.val(),
				lb_status : obj.lb_status.field.val(),
				lb_nationality : obj.lb_nationality.field.val(),
				lb_creditcard : product_name,
				lb_sex : obj.lb_sex.field.val(),
				lb_estrato : obj.lb_estrato.field.val(),
				lb_id : parseInt(form.id),
				lb_typeid : form.type_id
			};

			form.form_step2 = poster;

			$
					.ajax({
						method : "POST",
						url : url + "/VentasDG/Validacion",
						timeout : 60000,
						data : poster
					})
					.done(
							function(msg) {

								if (msg.result != 0) {
									$('#img_validacion')
											.html(
													'<img src="img/icon_denegacion.jpg">');
									$('#texto_validacion')
											.html(
													'¡Lo sentimos! Tu proceso de validación no ha sido satisfactorio según criterios internos del Banco y no es viable continuar con tu solicitud. Muchas gracias. ');
								}

								setTimeout(function() {

									// $('.content_loader').hide();
									// $('.content4').show();

									$('#content3-block').addClass('block');
									$('#content4-block').removeClass('block');
									$('#content_loader').foundation('reveal',
											'close');
									$('#content1-error').hide();
									$('#content3-error').hide();
									$('#content4-error').show();
									form.div_fake(".content4");
									form.scroll_to(".content4");
									form.select_independiente();

								}, 1000);

							})
					.fail(
							function(jqXHR, textStatus) {
								$('#img_validacion').html(
										'<img src="img/icon_denegacion.jpg">');
								$('#texto_validacion')
										.html(
												'Estamos presentando inconvenientes con nuestro sistema y no podemos procesar tu solicitud en este momento, te invitamos a intentarlo más tarde.');
								$('#btn_error_platform').show();
								$('#content2').foundation('reveal', 'open');
								$('body').on('click',
										'#next_two_error_platform',
										function(e) {
											e.preventDefault();
											form.back1();
										});
							});
		},
		select_independiente : function() {
			if (form.edad >= 25 && form.edad <= 75) {
				$('#lb_workstatus').append(
						'<option value="Independiente">Independiente</option>');
				$('#lb_workstatus').append(
						'<option value="Otros">Otros</option>');
			} else {
				$('#lb_workstatus').append(
						'<option value="Otros">Otros</option>');
			}
			form.select_form4();
		},
		select_form4 : function() {

			$("#lb_workstatus").selectmenu(
					{
						change : function(event, data) {
							// console.log(data.item.value);

							form.situacion_laboral = data.item.value;

							switch (data.item.value) {
							case 'Independiente':
							case 'Otros':
								$('#label_lbnomina').addClass('disabled_grey');
								$('#lb_nomina').attr('disabled', true)
										.addClass('disabled_text_field_white');

								setTimeout(function() {
									$('#lb_nomina').val('no aplica');
								}, 700);
								break;
							default:
								$('#label_lbnomina').removeClass(
										'disabled_grey');
								$('#lb_nomina').attr('disabled', false).val('')
										.removeClass(
												'disabled_text_field_white');

							}
						}
					});
			$("#lb_economicactitivy").selectmenu().selectmenu("menuWidget")
					.addClass("overflow_select");
			$("#lb_occupation").selectmenu().selectmenu("menuWidget").addClass(
					"overflow_select");
			$("#lb_studylevel").selectmenu();
			$("#lb_home").selectmenu(
					{
						change : function(event, data) {

							switch (data.item.value) {
							// case 'Arriendo':
							case 'Familia':
								// case 'Otro':
								$('#label_costhousing').addClass(
										'disabled_grey');
								$('#lb_costhousing').attr('disabled', true)
										.addClass('disabled_text_field_white');

								setTimeout(function() {
									$('#lb_costhousing').val('no aplica');
								}, 700);

								break;
							default:
								$('#label_costhousing').removeClass(
										'disabled_grey');
								$('#lb_costhousing').attr('disabled', false)
										.val('').removeClass(
												'disabled_text_field_white');

							}

						}
					});

			$('#lb_principalearn_cp').val(form.form_step1.lb_principalearn)

			$('#lb_heritage,#lb_otherearn,#lb_costhousing,#lb_nomina')
					.priceFormat({
						prefix : '$',
						centsLimit : 0
					});

		},

		step4 : function() {
			var obj = {
				lb_workstatus : {
					msg : 'Escoge una situación laboral',
					field : $('#lb_workstatus'),
					field_foundation : $("#lb_workstatus-button"),
					type : 1
				},
				work_day : {
					msg : 'Escribe un día válido',
					field : $('#work_day'),
					type : 11,
					max : 31,
					maxlength : 2
				},
				work_month : {
					msg : 'Escribe un mes válido',
					field : $('#work_month'),
					type : 11,
					max : 12,
					maxlength : 2
				},
				work_year : {
					msg : 'Escribe un año válido',
					field : $('#work_year'),
					type : 11,
					max : moment().format("YYYY"),
					maxlength : 4
				},
				lb_economicactitivy : {
					msg : 'Escoge una actividad económica',
					field : $('#lb_economicactitivy'),
					field_foundation : $("#lb_economicactitivy-button"),
					type : 1
				},
				lb_occupation : {
					msg : 'Escoge una profesión',
					field : $('#lb_occupation'),
					field_foundation : $("#lb_occupation-button"),
					type : 1
				},
				lb_home : {
					msg : 'Escoge un tipo de vivienda',
					field : $('#lb_home'),
					field_foundation : $("#lb_home-button"),
					type : 1
				},
				lb_costhousing : {
					msg : 'Digita un valor de vivienda mayor a $0',
					field : $('#lb_costhousing'),
					type : 1
				},
				lb_heritage : {
					msg : 'Digita un valor de patrimonio válido',
					field : $('#lb_heritage'),
					type : 1
				},
				lb_otherearn : {
					msg : 'Digita un valor de otros ingresos válido',
					field : $('#lb_otherearn'),
					type : 1
				},

				lb_nomina : {
					msg : 'Digita un valor de deducciones de nómina válido',
					field : $('#lb_nomina'),
					type : 1
				},
				lb_childrens : {
					msg : 'Digita un número de personas a cargo válido',
					field : $('#lb_childrens'),
					type : 3
				},
				lb_studylevel : {
					msg : 'Escoge un nivel de estudios',
					field : $('#lb_studylevel'),
					field_foundation : $("#lb_studylevel-button"),
					type : 1
				}
			};

			if (this.validate(obj)) {

				if (form.validar_salario_tipo_situacion_laboral()
						&& form.validate_0($('#lb_costhousing').unmask()) && this.validate_date_vs_dateNow(3, obj.work_year.field
								.val(), obj.work_month.field.val(),
								obj.work_day.field.val())) {
					$('.error_msg').css('opacity', '0');
					// console.log('paso');
					$("#error_div4").css('display', 'none');
					form.post4(obj);
				} else {
					form.show_error();
					$("#error_div4").css('display', 'block');
				}
			}
		},
		post4 : function(obj) {

			// $('.content4').hide();
			// $('.content_loader').show();
			$('#content_loader').foundation('reveal', 'open');

			// the credit that was choosen
			$('#bg_credit_card').addClass(product_classname);

			var poster = {
				action : "step3",
				lb_workstatus : obj.lb_workstatus.field.val(),
				lb_economicactitivy : obj.lb_economicactitivy.field.val(),
				lb_occupation : obj.lb_occupation.field.val(),
				lb_home : obj.lb_home.field.val(),
				lb_costhousing : obj.lb_costhousing.field.val(),
				lb_work : obj.work_day.field.val() + '/'
						+ obj.work_month.field.val() + '/'
						+ obj.work_year.field.val(),
				lb_heritage : obj.lb_heritage.field.val(),
				lb_otherearn : obj.lb_otherearn.field.val(),
				lb_nomina : obj.lb_nomina.field.val(),
				lb_childrens : obj.lb_childrens.field.val(),
				lb_studylevel : obj.lb_studylevel.field.val(),
				lb_id : parseInt(form.id),
				lb_typeid : form.type_id
			};

			form.form_step3 = poster;

			$
					.ajax({
						method : "POST",
						url : url + "/VentasDG/Validacion",
						timeout : 60000,
						data : poster
					})
					.done(
							function(msg) {

								form.post_googledocs();

								$('#customer_name').html(
										form.name.split(" ")[0]);
								$('#customer_lastname').html(
										form.lastname.split(" ")[0]);

								setTimeout(
										function() {

											// $('.content_loader').hide();
											/*
											 * $('#content_loader').foundation('reveal',
											 * 'close'); $('.content5').show();
											 * $('#content4-block').addClass('block');
											 * form.div_fake(".content5");
											 * form.scroll_to(".content5");
											 */
											_satellite
													.track("agendamientoThankYou");
											$('#content4-block').addClass(
													'block');
											$('#content5').foundation('reveal',
													'open');
										}, 1000);

							})
					.fail(
							function(jqXHR, textStatus) {
								$('#img_validacion').html(
										'<img src="img/icon_denegacion.jpg">');
								$('#texto_validacion')
										.html(
												'Estamos presentando inconvenientes con nuestro sistema y no podemos procesar tu solicitud en este momento, te invitamos a intentarlo más tarde.');
								$('#btn_error_platform').show();
								$('#content2').foundation('reveal', 'open');
								$('body').on('click',
										'#next_two_error_platform',
										function(e) {
											e.preventDefault();
											form.back1();
										});
							});

		},

		post_googledocs : function() {

			/*
			 * Antiguo Form var obj = { "entry_464265927":form.form_step1.lb_id,
			 * "entry_266920883":form.form_step1.lb_typeid,
			 * "entry_9209175":form.form_step1.lb_fechaexpedicion,
			 * "entry_119757898":form.form_step1.lb_email,
			 * "entry_88128372":form.form_step1.lb_principalearn,
			 * "entry_377342084":form.form_step1.lb_accept,
			 * "entry_377342084":form.form_step1.lb_asesor,
			 * "entry_1695101495":form.form_step2.lb_name,
			 * "entry_1798949826":form.form_step2.lb_lastname,
			 * "entry_611467800":form.form_step1.lb_cellphone,
			 * "entry_2137527":form.form_step2.lb_department,
			 * "entry_1869060722":form.form_step2.lb_city,
			 * "entry_2065997431":form.form_step2.lb_borndate,
			 * "entry_1091714308":form.form_step2.lb_status, //Falta enviar
			 * Nacionalidad "entry_38080041":form.form_step2.lb_sex,
			 * "entry_1591797507":form.form_step2.lb_estrato,
			 * "entry_364001940":form.form_step3.lb_workstatus,
			 * "entry_67017837":form.form_step3.lb_work,
			 * "entry_673584749":form.form_step3.lb_economicactitivy,
			 * "entry_1184930007":form.form_step3.lb_occupation,
			 * "entry_737782245":form.form_step3.lb_home, //Falta nivel de
			 * estudios "entry_1516965250":form.form_step3.lb_costhousing,
			 * "entry_2076978405":form.form_step3.lb_heritage,
			 * "entry_1520751572":form.form_step3.lb_otherearn,
			 * "entry_1401988299":form.form_step3.lb_nomina,
			 * "entry_134892712":form.form_step3.lb_childrens,
			 * "entry_1037940618": form.form_step1.lb_creditcard }
			 */

			var obj = {
				"entry_373339095" : form.form_step1.lb_id,
				"entry_1696785305" : form.form_step1.lb_typeid,
				"entry_1210276857" : form.form_step1.lb_fechaexpedicion,
				"entry_1349692204" : form.form_step1.lb_email,
				"entry_30333846" : form.form_step1.lb_principalearn,
				"entry_640075787" : form.form_step1.lb_accept,
				"entry_226044533" : form.form_step1.lb_asesor,
				"entry_354611668" : form.form_step2.lb_name,
				"entry_1003343880" : form.form_step2.lb_lastname,
				"entry_770024029" : form.form_step1.lb_cellphone,
				"entry_77260769" : form.form_step2.lb_department,
				"entry_805351874" : form.form_step2.lb_city,
				"entry_1735922549" : form.form_step2.lb_borndate,
				"entry_1712105483" : form.form_step2.lb_status,
				"entry_1275446164" : form.form_step2.lb_nationality,
				"entry_1459007588" : form.form_step2.lb_sex,
				"entry_1247929241" : form.form_step2.lb_estrato,
				"entry_1195057425" : form.form_step3.lb_workstatus,
				"entry_649472694" : form.form_step3.lb_work,
				"entry_274664120" : form.form_step3.lb_economicactitivy,
				"entry_1152905563" : form.form_step3.lb_occupation,
				"entry_99565950" : form.form_step3.lb_home,
				"entry_793025259" : form.form_step3.lb_costhousing,
				"entry_1655914741" : form.form_step3.lb_studylevel,
				"entry_1355305872" : form.form_step3.lb_heritage,
				"entry_1558893683" : form.form_step3.lb_otherearn,
				"entry_475847275" : form.form_step3.lb_nomina,
				"entry_1407729910" : form.form_step3.lb_childrens,
				"entry_937410729" : product_name
			}

			$
					.ajax({
						url : "https://docs.google.com/forms/d/1q0BhodhIH-zdGSei20On1QgbzjFTioDvXhnmwONLzjM/formResponse",
						data : obj,
						type : "POST",
						statusCode : {
							0 : function() {
								// $('#lastInfoModal').foundation('reveal',
								// 'open');
								console.log('perfecto');
							},
							200 : function() {
								// $('#lastInfoModal').foundation('reveal',
								// 'open');
								console.log('perfecto');
							}
						}
					});
		},

		send_dataGente : function() {
			var obj = {
				"entry_2049001946" : form.form_step1.lb_id,
				"entry_244344755" : form.form_step1.lb_email,
				"entry_1992453391" : form.form_step1.lb_cellphone,
				"entry_1401659794" : form.form_step1.lb_creditcard
			}

			$
					.ajax({
						url : "https://docs.google.com/forms/d/1aYOWmoed3T738yzzIpPFLuyv3MSfv0J13xLGqxZpMDU/formResponse",
						data : obj,
						type : "POST",
						statusCode : {
							0 : function() {
								// $('#lastInfoModal').foundation('reveal',
								// 'open');
								console.log('perfecto');
							},
							200 : function() {
								// $('#lastInfoModal').foundation('reveal',
								// 'open');
								console.log('perfecto');
							}
						}
					});

		},
		post_googledocs_preaprobados : function() {

			var obj = {
				"entry_722493114" : form.form_step1.lb_id,
				"entry_2115461719" : form.form_step1.lb_email,
				"entry_61766384" : form.form_step1.lb_cellphone,
				"entry_380038584" : form.form_step1.lb_creditcard
			}

			$
					.ajax({
						url : "https://docs.google.com/forms/d/1nSK6cC2XJybEda27OaaZygsQRWVm-xCrj4LmXhcD1xM/formResponse",
						data : obj,
						type : "POST",
						statusCode : {
							0 : function() {
								// $('#lastInfoModal').foundation('reveal',
								// 'open');
								console.log('perfecto');
							},
							200 : function() {
								// $('#lastInfoModal').foundation('reveal',
								// 'open');
								console.log('perfecto');
							}
						}
					});
		},

		validate : function(obj) {
			var without_errors = true;
			form.error = "";
			for ( var propertyName in obj) {
				// console.log(obj[propertyName]);
				var field = obj[propertyName];

				switch (field.type) {
				case 1:
					if (!form.validate_obligatory(field)) {
						if (field.field_foundation != undefined) {
							field.field_foundation.attr("title", field.msg);
							field.field_foundation
									.addClass("ui-selectmenu-error");
						} else {
							field.field.attr("title", field.msg);
							field.field.addClass("error-input");
						}
						form.error = field.msg;
					} else {
						if (field.field_foundation != undefined) {
							field.field_foundation.attr("title", "")
							field.field_foundation
									.removeClass("ui-selectmenu-error");
						} else {
							field.field.attr("title", "");
							field.field.removeClass("error-input");
						}
					}
					break;
				case 2:
					if (form.error == '') {
						if (!form.validate_check(field)) {
							var date = obj.id_year.field.val()
									+ obj.id_month.field.val()
									+ obj.id_day.field.val();
							if (this.validate_date(date)
									&& this.validate_date_vs_dateNow(2,
											obj.id_year.field.val(),
											obj.id_month.field.val(),
											obj.id_day.field.val())) {
								$('#myModal').foundation('reveal', 'open');
								form.error = field.msg;
								$("#error_div1").css('display', 'block');
								form.show_error();
								return false;
							}
						} else {
							return true;
						}
					} else {
						return false;
					}
					break;
				case 3:
					if (!form.validate_obligatory(field)
							|| !form.validate_numeric(field)) {
						field.field.attr("title", field.msg);
						field.field.addClass("error-input");
						form.error = field.msg;
					} else {
						field.field.attr("title", "");
						field.field.removeClass("error-input");
					}
					break;

				case 4:
					if (!form.validate_obligatory(field)
							|| !form.validate_EmailAddress(field)) {
						field.field.attr("title", field.msg);
						field.field.addClass("error-input");
						form.error = field.msg;
					} else {
						field.field.attr("title", "");
						field.field.removeClass("error-input");
					}
					break;

				case 5:
					if (!form.validate_obligatory(field)
							|| !form.validate_numeric(field)
							|| field.field.val() > field.max) {
						field.field.attr("title", field.msg);
						field.field.addClass("error-input");
						form.error = field.msg;
					} else {
						field.field.attr("title", "");
						field.field.removeClass("error-input");
					}
					break;

				case 6:

					// console.log(! field.field.val().lenght == field.max);
					if (!form.validate_obligatory(field)
							|| !form.validate_numeric(field)
							|| field.field.val().length != field.max) {
						field.field.attr("title", field.msg);
						field.field.addClass("error-input");
						form.error = field.msg;
					} else {
						field.field.attr("title", "");
						field.field.removeClass("error-input");
					}
					break;
				case 7:

					if (!form.validate_obligatory(field)
							|| !form.validate_diferent_of(field)) {
						field.field.attr("title", field.msg);
						field.field.addClass("error-input");
						form.error = field.msg;
					} else {
						field.field.attr("title", "");
						field.field.removeClass("error-input");
					}
					break;
				case 8:
					if (!form.validate_obligatory(field)
							|| !form.validate_numeric(field)
							|| !form.validate_phone(field, 2)
							|| field.field.val().length != field.max) {
						field.field.attr("title", field.msg);
						field.field.addClass("error-input");
						form.error = field.msg;
					} else {
						field.field.attr("title", "");
						field.field.removeClass("error-input");
					}
					break;
				case 9:

					// console.log(! field.field.val().lenght == field.max);
					if (!form.validate_obligatory(field)
							|| !form.validate_greater_lower(field)) {
						field.field.attr("title", field.msg);
						field.field.addClass("error-input");
						form.error = field.msg;
					} else {
						field.field.attr("title", "");
						field.field.removeClass("error-input");
					}
					break;
				case 10:

					if (!form.validate_issue_date(field.field.val())) {
						field.field.attr("title", field.msg);
						field.field.addClass("error-input");
						form.error = field.msg;
					} else {
						field.field.attr("title", "");
						field.field.removeClass("error-input");
					}
					break;
				case 11:
					if (!form.validate_obligatory(field)
							|| !form.validate_numeric(field)
							|| field.field.val() > field.max
							|| field.field.val().length != field.maxlength) {
						field.field.attr("title", field.msg);
						field.field.addClass("error-input");
						form.error = field.msg;
					} else {
						field.field.attr("title", "");
						field.field.removeClass("error-input");
					}
					break;
				case 12:
					if (!form.validate_obligatory(field) || !form.validate_onlynumbersspaces(field)) {
						if (field.field_foundation != undefined) {
							field.field_foundation.attr("title", field.msg);
							field.field_foundation
									.addClass("ui-selectmenu-error");
						} else {
							field.field.attr("title", field.msg);
							field.field.addClass("error-input");
						}
						form.error = field.msg;
					} else {
						if (field.field_foundation != undefined) {
							field.field_foundation.attr("title", "")
							field.field_foundation
									.removeClass("ui-selectmenu-error");
						} else {
							field.field.attr("title", "");
							field.field.removeClass("error-input");
						}
					}
					break;	
					

				}
				;

			}

			if (form.error != "") {
				return false;
			} else {
				return true;
			}

		},

		validate_type_credit_card : function(obj) {

			var earns = $('#lb_principalearn').unmask();
			var pos = 0;
			var array_credit_card_range = [
					[ '018' ],
					[ '002', '004', '005', '012', '016', '018' ],
					[ '002', '004', '005', '006', '009', '012', '013', '015',
							'016', '018' ],
					[ '001', '003', '005', '006', '009', '010', '013', '014',
							'015' ],
					[ '001', '003', '007', '010', '014', '015' ],
					[ '001', '003', '007', '010', '011', '014', '015' ] ];

			/*
			 * Ranges 0. $800.000 a $1.199.999 1. "$1.200.000 a $2.999.999" 2.
			 * "$3.000.000 a $6.999.999" 3. "$7.000.000 a $9.999.999" 4. ">
			 * $10.000.000"
			 */

			switch (true) {
			case (earns >= 80000 && earns <= 1199999):
				pos = 1;
				break;
			case (earns >= 1200000 && earns <= 2999999):
				pos = 2;
				break;
			case (earns >= 3000000 && earns <= 6999999):
				pos = 3;
				break;
			case (earns >= 7000000 && earns <= 9999999):
				pos = 4;
				break;
			case (earns >= 10000000):
				pos = 5;
				break;

			default:
				pos = 0;
			}

			// console.log('look up '+pos);

			if ($.inArray(param, array_credit_card_range[pos]) == -1) {
				// console.log('selecciona tarjeta');

				var list_elem = $.map(array_credit_card_range[pos], function(
						val, i) {
					return form.select_credit_card(val);
				});

				this.credit_cards_select = list_elem;
				form.obj_auxstep1 = obj;
				$('#content_loader').foundation('reveal', 'close');
				this.show_credit_cards_content();

			} else {
				// console.log('continua el flujo normal');
				form.progress_slide(1);
				form.step2();
				form.scroll_to(".content3");
			}

		},
		validate_obligatory : function(value) {
			if (value.field.val() == '') {
				return false;
			}
			return true;
		},

		validate_onlynumbersspaces : function(value) {
			var regex = /^[a-zA-Z\u00E0-\u00FC\u00C0-\u00DC\s]+$/;
			if (regex.test(value.field.val())) {
				return true;
			}
			return false;
		},

		validate_numeric : function(value) {
			// console.log($.isNumeric( value.field.val()));
			return $.isNumeric(value.field.val());
		},
		validate_greater_lower : function(field) {

			/* with the library */
			var num = parseInt(field.field.unmask());

			if (field.lower_or_greater == "greater") {
				if (num > field.than) {
					return true;
				}
			} else {
				if (num < field.than) {
					return true;
				}
			}

			return false;

		},
		validate_phone : function(value, flag) {

			var cadena = value.field.val();
			if (cadena.length == 10) {
				if (cadena[0] == 3) {
					if (cadena.length != flag) {
						if (cadena[1] != cadena[flag]) {
							return true;
						} else {
							return form.validate_phone(value, ++flag);
						}
					}
				}
			}
			return false;
		},
		validate_check : function(value) {
			return value.field.prop("checked");
		},
		validate_EmailAddress : function(value) {
			var pattern = new RegExp(
					/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			return pattern.test(value.field.val());
		},
		validate_age : function(age) {

			var mome = moment(age, "YYYYMMDD").fromNow(true);
			var ago = parseInt(mome);
			/*
			 * console.log('----'); console.log(mome); console.log(ago);
			 */

			if (ago >= 18 && ago <= 80) {
				form.edad = ago;
				form.error = "";
				return true;
			}

			if (ago > 80) {
				form.error = "Lo sentimos, la edad máxima requerida es 80 años.";
			} else {
				form.error = "Lo sentimos, la edad mínima requerida es 18 años.";
			}
			return false;
		},
		validate_issue_date : function(issue_date) {
			if (moment().diff(moment(issue_date, "YYYYMMDD"), 'years') < 18) {
				return false;
			} else {
				return true;
			}
		},
		validate_date : function(date) {

			var validation = moment(date, "YYYYMMDD").isValid();
			if (validation) {
				form.error = "";
			} else {
				form.error = "Por favor, digite un fecha valida";
			}

			return validation;
		},
		validate_dateBorn_vs_dateExp : function() {
			$("#born_day,#born_month,#born_year").removeClass("error-input");
			$("#id_day,#id_month,#id_year").removeClass("error-input");

			var validation = true;
			var msg1 = 'La fecha de expedición del documento de identificación debe ser mayor a la fecha de nacimiento';
			var msg2 = 'La diferencia entre la fecha de nacimiento y la fecha de expedición del documento de identificación debe ser al menos de 18 años. ';
			var field1 = moment($("#born_day").val() + ""
					+ $("#born_month").val() + "" + $("#born_year").val(),
					"DDMMYYYY");
			var field2 = moment($("#id_day").val() + "" + $("#id_month").val()
					+ "" + $("#id_year").val(), "DDMMYYYY");

			if (moment(field1, "YYYYMMDD").diff(moment(field2, "YYYYMMDD"),
					'days') > 0) {
				form.error = msg1;
				validation = false;
			} else if (moment(field2, "YYYYMMDD").diff(
					moment(field1, "YYYYMMDD"), 'years') < 18) {
				form.error = msg2;
				validation = false;
			}
			if (!validation) {
				$("#error_div1").css('display', 'block');
				$("#born_day,#born_month,#born_year").attr("title", form.error)
						.addClass("error-input");
				$("#id_day,#id_month,#id_year").attr("title", form.error)
						.addClass("error-input");
				form.show_error();
			}
			return validation;
		},
		validate_date_vs_dateNow : function(type_date, year, month, day) {
			$("#born_day,#born_month,#born_year").removeClass("error-input");
			$("#id_day,#id_month,#id_year").removeClass("error-input");
			$("#work_day,#work_month,#work_year").removeClass("error-input");
			var validation = true;

			var nowDate = moment();
			var fieldDate = moment(year + month + day, "YYYY-MM-DD");
			var ago = parseInt(moment(year + month + day, "YYYYMMDD").fromNow(
					true));


			if (fieldDate > nowDate) {
				switch (type_date) {
				case 1:
					form.error = 'La fecha de fecha nacimiento debe ser menor a la fecha actual.';
					$("#born_day,#born_month,#born_year").attr("title",form.error).addClass("error-input");
					break;
				case 2:
					form.error = 'La fecha de expedición de tu documento debe ser menor a la fecha actual.';
					$("#id_day,#id_month,#id_year").attr("title", form.error).addClass("error-input");
					break;
				case 3:
					form.error = 'La fecha de inicio actividad  debe ser menor a la fecha actual.';
					$("#work_day,#work_month,#work_year").attr("title",form.error).addClass("error-input");
					break;
				}
				$("#error_div1").css('display', 'block');
				form.show_error();
				validation = false;
			} else {
				switch (type_date) {
				case 1:
					if (ago > 80) {
						form.error = 'Lo sentimos, la edad máxima requerida es 80 años.';
						$("#born_day,#born_month,#born_year").attr("title",
								form.error).addClass("error-input");
						$("#error_div1").css('display', 'block');
						form.show_error();
						validation = false;
					}
					break;
				case 2:
					if (ago > 62) {
						form.error = 'La fecha de expedición de tu documento no debe superar los 62 años.';
						$("#id_day,#id_month,#id_year").attr("title",
								form.error).addClass("error-input");
						$("#error_div1").css('display', 'block');
						form.show_error();
						validation = false;
					}
					break;
				}
			}
			return validation;
		},
		validar_salario_tipo_situacion_laboral : function() {
			switch (form.situacion_laboral) {
			case 'Independiente':
				var cast = parseInt($('#lb_principalearn_cp').unmask());
				if (cast >= 2000000) {
					form.error = "";
					return true;
				} else {
					form.error = "Lo sentimos, los ingresos fijos mínimos de "
							+ form.situacion_laboral + " son $2.000.000.";
					form.show_error();
					return false;
				}

				break;
			case 'Asalariado término indefinido':
			case 'Asalariado término fijo':
			case 'Pensionado':
			case 'Prestador de servicio':

				var cast = parseInt($('#lb_principalearn_cp').unmask());
				if (cast >= 689454) {
					form.error = "";
					return true;
				} else {
					form.error = "Lo sentimos, los ingresos fijos mínimos de "
							+ form.situacion_laboral + " son $689.454.";
					form.show_error();
					return false;
				}

				break;
			default:
				form.error = "";
				return true;
			}
		},
		validate_0 : function(number) {

			if (number == "0") {
				form.error = "No puedes ingresar valores en $0 en el campo Valor vivienda/arriendo/cuotas hipotecarias*";
				form.show_error();
				return false;
			}
			form.error = "";
			return true;
		},
		show_credit_cards_content : function() {
			/*
			 * $('.content1').hide(); $('.general_content').show();
			 */

			$('#general_content-block').removeClass('block');
			$("#wrapper_general_content").css("padding", "15px");
			$('#content1-block').addClass('block');

			var list_elem = $
					.map(
							this.credit_cards_select,
							function(val, i) {

								return '<div class="large-3 medium-4 small-6  end columns">'
										+ '<div class="item_card">'
										+ '<div class="text-left '
										+ val.classname
										+ '_small"></div>'
										+ '<div class="card_selection">'
										+ '<div class="radio_card_selection" data-product="'
										+ val.name
										+ '" data-classname="'
										+ val.classname
										+ '">'
										+ '<input type="radio" name="rb_item_card" id="rb_'
										+ val.name
										+ '" value="'
										+ val.name
										+ '" class="css-checkbox" />'
										+ '<label for="rb_'
										+ val.name
										+ '" class="css-label radGroup1 radGroup2"></label>'
										+ '</div>'
										+ '<p class="txt_card_selection">'
										+ val.content
										+ '</p>'
										+ '</div>'
										+ '</div>' + '</div>';
							});

			$('#wrapper_general_content').html(list_elem.join(''));
			form.scroll_to(".general_content");

		},
		validate_diferent_of : function(value) {

			if (value.field.val() != value.not_be) {
				return true;
			}
			form.error = "";
			return false;
		},
		scroll_to : function(div) {
			$('html, body').animate({
				scrollTop : $(div).offset().top
			}, 1000);
		},
		div_fake : function(div) {
			$('.content_fake').css('height',
					((window.innerHeight) - (($(div).height()) * 1.6)));
		},
		show_error : function() {
			$('.error_msg').html(form.error);
			$('.error_display').css('display', 'block');
			$('.error_msg').animate({
				opacity : 1
			}, 500);
		},
		select_credit_card : function(id_card) {

			var obj = {};

			switch (id_card) {
			case '001':

				product_name = "Mastercard Platinum";
				product_classname = "credit_card_bg_mastercard_bbva_platinum";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'MasterCard Platinum te brinda servicio de concierge 24h y seguro de viajes con cobertura hasta de US$500.000 para tus viajes.'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '002':
				product_name = "Mastercard Standard";
				product_classname = "credit_card_bg_mastercard_bbva_standard";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Disfruta todos los beneficios de tu tarjeta incluyendo un seguro de fraudes y accidentes de viajes hasta por USD$75.000'
				}

				// this.credit_cards_select.push(obj);
				break;

			case '003':
				product_name = "Visa Platinum";
				product_classname = "credit_card_bg_visa_bbva_platinum";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Con Visa Platinum, una tarjeta eficiente y sofisticada podrás compartir un mundo de privilegios hasta con 9 tarjetas amparadas.'
				}

				// this.credit_cards_select.push(obj);
				break;

			case '004':
				product_name = "Visa Clásica";
				product_classname = "credit_card_bg_visa_bbva_clasica";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Haz de tu vida algo más fácil, accede a múltiples beneficios y promociones alrededor del mundo con Visa Clásica.'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '005':
				product_name = "Mastercard Gold";
				product_classname = "credit_card_bg_mastercad_bbva_gold";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Con MasterCard Gold cuentas con un paquete de beneficios y servicios que incluyen seguros hasta por USD$250.000'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '006':
				product_name = "Visa Oro";
				product_classname = "credit_card_bg_visa_bbva_oro";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Con Visa Oro recibirás una dirección de SkyBox para que compres todo lo que deseas alrededor del mundo.'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '007':
				product_name = "Mastercard Black";
				product_classname = "credit_card_bg_mastercard_bbva_black";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Disfruta la exclusividad y distinción que MasterCard Black te brinda, cuentas con asistencia global las 24h y acceso a salas VIP.'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '008':
				product_name = "Mastercard Héroes";
				product_classname = "credit_card_bg_mastercard_bbva_heroes";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Una tarjeta con el estatus que mereces. Disfruta del servicio de concierge en tus viajes para asesorarte en lo que necesites, además de un seguro de viajes con cobertura hasta de US$500.000.'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '009':
				product_name = "Visa Avianca LifeMiles Oro";
				product_classname = "credit_card_bg_gold";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Con Visa LifeMiles Oro acumulas 1,2 millas por cada dólar en compras, así cada compra te acerca a tu próximo destino.'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '010':
				product_name = "Visa Avianca LifeMiles Platinum";
				product_classname = "credit_card_bg_platinum";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Con Visa LifeMilles Platinum acumulas 1,6 millas por cada dólar en compras. Más millas para disfrutar el mundo.'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '011':
				product_name = "Visa Avianca LifeMiles Platinum Elite";
				product_classname = "credit_card_bg_platinum_elite";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Con Visa LifeMiles Platinum Elite acumula 2,0 millas por cada dolar en compras, un beneficio único para que cada viaje sea una experiencia.'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '012':
				product_name = "Visa Clásica Mujer";
				product_classname = "credit_card_bg_visa_mujer_clasica";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Pensada exclusivamente para las mujeres, brinda un paquete completo de asistencias para tu hogar, así como acceso a las promociones de Visa.'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '013':
				product_name = "Visa Oro Mujer";
				product_classname = "credit_card_bg_visa_mujer_oro";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Tarjeta Visa Oro Mujer te brinda un completo servicio de asistencias para tu hogar, como plomería, cerrajería y otros beneficios pensados para las mujeres.'
				}

				// this.credit_cards_select.push(obj);

				break;

			case '014':
				product_name = "Visa Platinum Mujer";
				product_classname = "credit_card_bg_visa_mujer_platinum";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Disfruta de un variado paquete de seguros, asistencias y beneficios pensados especialmente para las mujeres que aman las compras.'
				}
				// this.credit_cards_select.push(obj);

				break;

			case '015':
				product_name = "MasterCard World Vision Gold";
				product_classname = "credit_card_bg_mastercard_visionmundial_gold";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Por cada compra realizada donaremos el 0,5% de los intereses recibidos a proyectos que World Vision lidera en Colombia.'
				}
				// this.credit_cards_select.push(obj);

				break;

			case '016':
				product_name = "MasterCard World Vision Standard";
				product_classname = "credit_card_bg_mastercard_visionmundial_standard";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Haz sonreír a un niño en Colombia,  Por cada compra que realices BBVA donará el 0,5% de los intereses recibidos.'
				}
				// this.credit_cards_select.push(obj);

				break;

			case '017':
				product_name = "Mastercard Euro";
				product_classname = "credit_card_bg_gold";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Una tarjeta con el estatus que mereces. Disfruta del servicio de concierge en tus viajes para asesorarte en lo que necesites, además de un seguro de viajes con cobertura hasta de US$500.000.'
				}
				// this.credit_cards_select.push(obj);

				break;

			case '018':
				product_name = "Visa Congelada";
				product_classname = "credit_card_bg_visa_bbva_congelada";
				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Con Visa Congelada cuentas con múltiples beneficios para tu hogar, como el seguro de canasta básica.'
				}
				// this.credit_cards_select.push(obj);

				break;

			default:
				product_name = "Visa Avianca LifeMiles Oro";
				product_classname = "credit_card_bg_gold";

				obj = {
					name : product_name,
					classname : product_classname,
					content : 'Todas las compras que realices te llevan más cerca de tu próximo destino porque por cada dólar en compras acumulas 1,2 millas.'
				}
				// this.credit_cards_select.push(obj);
				break;
			}

			return obj;

		}
	}

	form.init();

});
