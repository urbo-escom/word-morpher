function chain_words() {
	var config = {
		from: document.getElementById("from").value,
		to: document.getElementById("to").value,
		search: document.getElementById("search").value
	}

	var morpher;
	if (config.from.length == 4 && config.to.length == 4)
		morpher = WordMorpher4;
	else
		morpher = WordMorpher5;

	var info = "Todo salió bien";
	try {
		word_morpher(morpher, config);
	} catch(e) {
		info = e;
	}

	document.getElementById("info").innerHTML = info;
}

function word_morpher(morpher, config) {
	var path = morpher.getPath(config);

	document.getElementById("word-text").innerHTML =
		GraphBuilder.asText(config, path);
	document.getElementById("word-dot").innerHTML =
		GraphBuilder.asDot(config, path);
	document.getElementById("word-svg").innerHTML =
		GraphBuilder.asSVG(config, path);
}

