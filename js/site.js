/*
 * Função genérica para estilizar um input inválido
 */
function mark_as_invalid(id_input, message) {
	$('#' + id_input).removeClass('is-valid');
	$('#' + id_input).addClass('is-invalid');

	$('#error_' + id_input).html(message);
}

/*
 * Função genérica para estilizar um input válido
 */
function mark_as_valid(id_input) {
	$('#' + id_input).removeClass('is-invalid');
	$('#' + id_input).addClass('is-valid');
}

/*
 * Função genérica para limpar um input após todos campos estarem corretos
 */
function clean_field(id_input) {
	$('#' + id_input).val('');
	$('#' + id_input).removeClass('is-valid');
}

/*
 * Função genérica para validar um campo texto
 * Lógica da função:
 * Sem conteúdo -> inválido = false
 * Com conteúdo -> válido = true
 * Retorna se é válido
 */
function validate_text(text, field) {
	// Remove espaços finais e iniciais
	text = text.trim();
	
	// Retorna true para:
	// null, undefined, NaN, empty, 0 ou false
	var invalid = !text;

	if(invalid) {
		mark_as_invalid(field, 'Deve ser informado');
	} else {
		mark_as_valid(field);
	}

	// true -> inválido
	// false -> válido
	// Por isso retornar o valor invertido
	return !invalid;
}

/*
 * Função genérica para validar um campo numérico positivo
 * Lógica da função:
 * Não numérico -> inválido = false
 * Numérico <= 0 -> inválido = false
 * Numérico > 0 -> válido = true
 * Retorna se é válido
 */
function validate_positive_number(number, field) {
	// Verifica se é um número
	var valid = $.isNumeric(number);
	
	if(valid) {
		if(number > 0) {
			mark_as_valid(field);
		} else {
			mark_as_invalid(field, 'Deve ser maior que zero');
		}
	} else {
		mark_as_invalid(field, 'Deve ser numérico');
	}

	// true -> válido
	// false -> inválido
	return valid;
}

/*
 * Função genérica para validar um campo data
 * Lógica da função:
 * Data > Hoje -> inválida = false
 * Data <= Hoje -> válida = true
 * Retorna se é válido
 */
function validate_date(date, field) {
	var valid = true;

	var date_obj = new Date();
	
	var splitted_date = date.split('-');
	var date = parseInt(splitted_date[2]);
	var month = parseInt(splitted_date[1]);
	var year = parseInt(splitted_date[0]);

	if(year > date_obj.getFullYear()) {
		// Significa que ano é maior que atual

		valid = false;
	} else if(month > date_obj.getMonth() + 1 && year == date_obj.getFullYear()) {
		// Significa que ano é o mesmo
		// Mas o mês é maior que o atual

		valid = false;
	} else if(date > date_obj.getDate() && month == date_obj.getMonth() + 1 && year == date_obj.getFullYear()) {
		// Significa que ano é o mesmo
		// Significa que mês é o mesmo
		// Mas o dia é maior que o atual

		valid = false;
	}

	// Opção restante:
	// Todos componentes da data são menores que atual
	// Ou seja, está correto

	if(valid) {
		mark_as_valid(field);
	} else {
		mark_as_invalid(field, 'Data deve ser menor ou igual a hoje');
	}

	// true -> válido
	// false -> inválido
	return valid;
}

/*
 * Função genérica para converter uma data ymd para dmy
 * Loógica da função:
 * Desmembra a data recebida e remonta no formato definido
 * Retorna a data no  novo formato
 */
function convert_ymd_to_dmy(date) {
	// Cria um array da data a ser formatda
	// Y-m-d
	// 0 1 2 -> Posicão de cada parte no array
	var splitted_date = date.split('-');

	var year = splitted_date[0];
	var month = splitted_date[1];
	var date = splitted_date[2];

	return date + '/' + month + '/' + year;
}

/*
 * Função genérica pegar a data no formato internacional: yyyy-mm-dd
 */
function get_date_international_format() {
	var date_obj = new Date();

	// Converte valores para string
	var date = String(date_obj.getDate());
	var month = String(date_obj.getMonth() + 1);

	if(date.length == 1) {
		// Concatena um 0 na frente caso seja menor que 10
		// Pois manter apenas 1 dígito foge da regra 'dd' do input date
		date = '0' + date;
	}

	if(month.length == 1) {
		// Concatena um 0 na frente caso seja menor que 10
		// Pois manter apenas 1 dígito foge da regra 'mm' do input date
		month = '0' + month;
	}

	// Mantém o ano direto do objeto pois já vem no formato correto: 'yyyy'
	return date_obj.getFullYear() + '-' + month + '-' + date
}

/*
 * Função genérica para validar um campo select
 * Lógica da função:
 * Opção <= 0 -> inválida = false
 * Opção > 0 -> válida = true
 * Retorna se é válido
 */
function validate_select(option, field) {
	// Opção 0 significa que está selecionada a opção inválida
	var valid = (option > 0);

	if(valid) {
		mark_as_valid(field);
	} else {
		mark_as_invalid(field, 'Selecione uma opção');
	}

	// true -> válido
	// false -> inválido
	return valid;
}

/*
 * Função genérica para exibir uma mensagem estilizada durante requisição
 */
function display_message_during_request(message) {
	// Remove estilizações de sucesso
	$('#mensagem_requisicao').removeClass('text-success');
	$('#mensagem_requisicao').removeClass('alert-success');

	// Remove estilizações de falha
	$('#mensagem_requisicao').removeClass('text-danger');
	$('#mensagem_requisicao').removeClass('alert-danger');

	// Adiciona estilização de aviso
	$('#mensagem_requisicao').addClass('text-warning');
	$('#mensagem_requisicao').addClass('alert-warning');

	// Coloca a menssagem na tag
	$('#mensagem_requisicao').html(message);

	// Exibe a tag
	$('#mensagem_requisicao').removeClass('sr-only');
}

/*
 * Função genérica para exibir uma mensagem estilizada no sucesso da requisição
 */
function display_request_success_message(message) {
	// Remove estilização de aviso
	$('#mensagem_requisicao').removeClass('text-warning');
	$('#mensagem_requisicao').removeClass('alert-warning');

	// Adiciona estilização de sucesso
	$('#mensagem_requisicao').addClass('text-success');
	$('#mensagem_requisicao').addClass('alert-success');

	// Coloca a menssagem na tag
	$('#mensagem_requisicao').html(message);

	setTimeout(function() {
		// Remove estilização de sucesso
		$('#mensagem_requisicao').removeClass('text-success');
		$('#mensagem_requisicao').removeClass('alert-success');

		// Tira a menssagem na tag
		$('#mensagem_requisicao').html('');

		// Remove a classe 'is-valid' de todos os inputs que a pessuam
		$('input.is-valid').removeClass('is-valid');

		// Esconde a tag
		$('#mensagem_requisicao').addClass('sr-only');
	}, 2000);
}

/*
 * Função genérica para exibir uma mensagem estilizada na falha da requisição
 */
function display_request_fail_message(message) {
	// Remove estilização de aviso
	$('#mensagem_requisicao').removeClass('text-warning');
	$('#mensagem_requisicao').removeClass('alert-warning');

	// Adiciona estilização de falha
	$('#mensagem_requisicao').addClass('text-danger');
	$('#mensagem_requisicao').addClass('alert-danger');

	// Coloca a menssagem na tag
	$('#mensagem_requisicao').html(message);
}

/*
 * Função genérica para remover todos espaços de um texto
 * Lógica da função:
 * Primeiro elimina os espaços do começo e final
 * Depois elimina os espaços no meio do texto
 * Retorna o texto sem espaços
 */
function remove_all_spaces(text) {
	text = text.trim();

	// Necessário looping pois o replace retira apenas um espaço de cada vez
	while(text.indexOf(' ') != -1) {
		text = text.replace(' ', '');
	}

	return text;
}