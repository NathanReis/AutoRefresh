document
	.querySelector("time")
	.innerHTML = (new Date()).toLocaleString("pt-br");

setTimeout(function() {
	location.href = location.href;
}, calcTimeLeftToRefresh(5000));

/**
 * Calcula quantos milesegundos faltam através de um valor para período e um momento de início
 * 
 * @param {number} period 
 * @param {Date|string} start 
 * 
 * @returns {number}
 */
function calcTimeLeftToRefresh(period, start) {
	if (!start) {
		/**
		 * Quando não receber um momento inicial
		 * Esperar apenas o próprio período
		 */

		return period;
	}

	const NOW = new Date();

	if (typeof start === "string") {
		/**
		 * Quando não recebido um objeto
		 * Verificar se a string possuí um valor válido
		 */

		const REGEX_DATE = /^\d{4}-\d{2}-\d{2}$/;
		const REGEX_TIME = /^\d{2}:\d{2}$/;
		const REGEX_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

		if (REGEX_DATE.test(start) || REGEX_DATE_TIME.test(start)) {
			/**
			 * Quando a string possuir um formato valído contendo a data
			 * Utilizar a própia string para criar o objeto
			 */

			start = new Date(start);
		} else if (REGEX_TIME.test(start)) {
			/**
			 * Quando a string possuir um formato valído contendo apenas a hora
			 * Utilizar a data de hoje junto a hora informada para montar o objeto
			 */

			let dateNow = String(NOW.getDate()).padStart(2, "0");
			let monthNow = String(NOW.getMonth() + 1).padStart(2, "0");
			let fullYearNow = NOW.getFullYear();

			start = new Date(`${fullYearNow}-${monthNow}-${dateNow}T${start}`);

			if (NOW.getTime() > start.getTime()) {
				/**
				 * Quando a data de início já tiver passado
				 * Somar 1 dia para considerar a contagem a partir do dia seguinte
				 */

				start.setDate(start.getDate() + 1);
			}
		} else {
			throw new Error("Valor inválido de início");
		}
	}

	if (NOW.getTime() > start.getTime()) {
		/**
		 * Quando já passou o momento do refresh
		 * Retornar 0 pois não tem que esperar nada
		 */

		return 0;
	}

	/**
	 * É subtraido do momento esperado o agora e o período para esperar
	 */
	let timeLeft = start.getTime() - (NOW.getTime() + period);

	return timeLeft;
}
