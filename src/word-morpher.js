console.log.info = function() {
	console.log("[INFO] "+arguments[0]);
}

console.log.debug = function() {
	//console.log("[DEBUG] "+arguments[0]);
}

Array.prototype.add = Array.prototype.push;

var WordMorpher = function(_words) {

	var words = _words;

	// Algoritmos
	var predecessors = function(from, to) {
		var predecessor = [];
		var process = [];
		var canChain = Dictionary.areChainable;
		var found = false;

		var k = -1, stop = 5000;
		// Función prototipo add debe estar especificada
		process.add(from);
		predecessor[from] = -1;
		while (process.length > 0 && !found) {
			// Función prototipo remove debe ser especificada
			var node = process.remove();

			k++; // Cada tantos nodos imprime
			if (k%stop == 0) {
				console.log.debug("Node "+words[node]);
				console.log.debug("-Iter:"+k);
			}

			// Obtén solo 
			var chainable_words = words.filter(function(e, i) {
				if (predecessor[i] == undefined &&
				    canChain(words[node], words[i])) {
					process.add(i);
					predecessor[i] = node;
					if (i == to)
						found = true;
					return true;
				}

				return false;
			});

			if (k%stop == 0)
				console.log.debug("-Chain "+chainable_words);
		}

		if (!found)
			throw "Palabras incomunicadas";

		console.log.debug("Done!");
		return predecessor;
	};

	// Obtener el camino
	var buildPath = function(from, to, predecessor) {
		var path = {};

		for (var n = to, p = predecessor[n];
		     0 < n && p != undefined;
		     n = predecessor[n], p = predecessor[p]) {
			if (words[p] != undefined)
				path[words[p]] = words[n];
		}

		return path;
	}

	// Excepción
	var unkown_word = function(w) {
		return "Palabra '"+w+"' no en diccionario";
	}

	return {

		// Método público
		getPath: function(config) {
			var w1 = config.from; // Origen
			var w2 = config.to; // Destino
			var indices = Dictionary.indexOf(words, w1, w2);

			var from = indices[0];
			var to = indices[1];
			if (from == undefined)
				throw unkown_word(w1);
			if (to == undefined)
				throw unkown_word(w2);

			console.log.debug("Index of "+w1+":"+from);
			console.log.debug("Index of "+w2+":"+to);

			if (config.search == "stack") // Profundidad
				Array.prototype.remove =
					Array.prototype.pop;
			else if (config.search == "queue") // Amplitud
				Array.prototype.remove =
					Array.prototype.shift;

			config.path = buildPath(from, to,
				predecessors(from, to));
			return config.path;
		}

	};

}

WordMorpher4 = new WordMorpher(words4);
WordMorpher5 = new WordMorpher(words5);

