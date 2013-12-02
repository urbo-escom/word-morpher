console.log.info = function() {
	console.log("[INFO] "+arguments[0]);
}

console.log.debug = function() {
	console.log("[DEBUG] "+arguments[0]);
}

Array.prototype.add = Array.prototype.push;

var WordMorpher = function(_words) {

	var words = _words;

	var predecessors = function(from, to) {
		var predecessor = [];
		var process = [];
		var canChain = Dictionary.areChainable;
		var found = false;

		var k = -1, stop = 500;
		process.add(from);
		predecessor[from] = -1;
		while (process.length > 0 && !found) {
			var node = process.remove();

			k++;
			if (k%stop == 0) {
				console.log.debug("Node "+words[node]);
				console.log.debug("-Iter:"+k);
			}

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

	var unkown_word = function(w) {
		return "Palabra '"+w+"' no en diccionario";
	}

	return {

		getPath: function(config) {
			var w1 = config.from;
			var w2 = config.to;
			var indices = Dictionary.indexOf(words, w1, w2);

			var from = indices[0];
			var to = indices[1];
			if (from == undefined)
				throw unkown_word(w1);
			if (to == undefined)
				throw unkown_word(w2);

			console.log.info("Index of "+w1+":"+from);
			console.log.info("Index of "+w2+":"+to);

			if (config.search == "stack")
				Array.prototype.remove =
					Array.prototype.pop;
			else if (config.search == "queue")
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

