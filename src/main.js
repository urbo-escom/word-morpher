console.log.info = function() {
	console.log("[INFO] "+arguments[0]);
}

console.log.debug = function() {
	//console.log("[DEBUG] "+arguments[0]);
}

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

	var info;
	document.getElementById("info").innerHTML = "";
	try {
		var samples = document.getElementById("samples").value;
		// Ejecutamos samples veces para obtener μ y σ²
		word_morpher(morpher, config, samples);
		info = "Todo salió bien";
	} catch(e) {
		info = e;
	}

	document.getElementById("info").innerHTML += info;
}

function word_morpher(morpher, config, samples) {
	var path;
	var μ = 0, square_σ = 0;
	var times = [];

	if (samples == undefined) samples = 1;
	for(var i = 0; i < samples; i++) {
		var time_before = new Date().getTime()/1000;
		path = morpher.getPath(config);
		var time_after = new Date().getTime()/1000;

		var time = time_after - time_before;
		times.push(time);
		console.log.info("Muestra "+i+" de "+samples+
			" "+time+" segundos");
	}

	times.forEach(function(time) { μ += time; });
	μ /= samples;
	times.forEach(function(time) { square_σ += (time - μ)*(time - μ); });
	square_σ /= samples;

	document.getElementById("mean").innerHTML =
		μ+" segundos de "+samples+" muestras";
	document.getElementById("variance").innerHTML =
		square_σ+" segundos de "+samples+" muestras";

	document.getElementById("word-text").innerHTML =
		GraphBuilder.asText(config, path);
	document.getElementById("word-dot").innerHTML =
		GraphBuilder.asDot(config, path);
	document.getElementById("word-svg").innerHTML =
		GraphBuilder.asSVG(config, path);
}

