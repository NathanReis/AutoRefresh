setTimeout(function() {
	location.href = location.href;
}, calcularTempoRestante());

function calcularTempoRestante() {
	var dateObj = new Date();

	// Configurado para 24:00:00.000
	var horaAlvo_s = 24 * 60 * 60;
	var minutoAlvo_s = 0 * 60;
	var segundoAlvo_s = 0;
	var milisegundoAlvo_ms = 0; 

	// Soma todos segundos alvos
	// Converte para milisegundos
	// Soma com os milisegundos alvo
	var totalAlvo_ms = (horaAlvo_s + minutoAlvo_s + segundoAlvo_s) * 1000 + milisegundoAlvo_ms;

	// Configurado para hh:mm:ss.fff
	// hh -> Hora
	// mm -> Minuto
	// ss -> Segundo
	// fff -> Acho que representa Milisegundo
	var horaAtual_s = dateObj.getHours() * 60 * 60;
	var minutoAtual_s = dateObj.getMinutes() * 60;
	var segundoAtual_s = dateObj.getSeconds();
	var milisegundoAtual_ms = dateObj.getMilliseconds();

	// Soma todos segundos atuais
	// Converte para milisegundos
	// Soma com os milisegundos atuais
	var totalAtual_ms = (horaAtual_s + minutoAtual_s + segundoAtual_s) * 1000 + milisegundoAtual_ms;

	// A diferença entre alvo e atual resulta no tempo restante para o tempo alvo
	var tempoRestante_ms = totalAlvo_ms - totalAtual_ms;

	if(tempoRestante_ms < 0) {
		// Caso deferença seja negativa
		// Significa que falta menos de um dia para atualizar
		// Então é calculado a quantidade de milisegundos em um dia
		// Somado, pois o valor é negativo, com o tempo restante
		// Exemplo:
		// ---------
		// Set 08:25
		// ---------
		// Current 08:24
		// Dif 1min
		// Current 08:25
		// Dif 0min
		// Current 08:26
		// Dif -1min = 23:59
		tempoRestante_ms = (24 * 60 * 60 * 1000) + tempoRestante_ms;
	}
	
	return tempoRestante_ms;
}