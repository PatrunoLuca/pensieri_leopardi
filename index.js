const express = require("express");
const path = require("path");
const flexsearch = require("flexsearch");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/styles", express.static(path.join(__dirname, "styles")));

const categorie = require(path.join(__dirname, "public", "categorie.json"));
const pensieri = require(path.join(__dirname, "public", "pensieri.json"));

app.use("/bootstrap", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));

app.use("/mermaid", express.static(path.join(__dirname, "node_modules", "mermaid", "dist")));

app.use("/markmap-common", express.static(path.join(__dirname, "node_modules", "markmap-common", "dist")));
app.use("/markmap-view", express.static(path.join(__dirname, "node_modules", "markmap-view", "dist")));

app.set("view-engine", require("ejs"));
app.set("views", [path.join(__dirname, "views"), path.join(__dirname, "ejs_imports")]);

function capitalize(name) {
	return name
		.split(" ")
		.map((x) => {
			if (x != "e") {
				return x.charAt(0).toUpperCase() + x.slice(1);
			} else {
				return x;
			}
		})
		.join(" ");
}

function urlify(path1, path2) {
	return { nome: path2, link: encodeURI(`/${path1}/${path2}`).toLowerCase() };
}

app.get("/", (req, res) => {
	res.render("home.ejs", {});
});

app.get("/categoria", (req, res) => {
	res.render("home.ejs", {});
});

app.get("/pensiero/:id", (req, res) => {
	const single_thought = pensieri[req.params.id];
	res.render("thought.ejs", {
		numero: single_thought["numeral"],
		pensiero: single_thought["text"],
		categorie: single_thought["macrocategories"]
			.map((x) => urlify("macrocategoria", x))
			.concat(single_thought["categories"].map((x) => urlify("categoria", x))),
	});
});

app.get("/categoria/:ctg", (req, res) => {
	const category = capitalize(req.params.ctg);

	res.render("category.ejs", {
		categoria: category,
		pensieri: Object.values(pensieri).filter((x) => {
			if (x.categories.includes(category)) {
				return true;
			} else {
				return false;
			}
		}),
	});
});

app.get("/macrocategoria/:mctg", (req, res) => {
	const macrocategory = capitalize(req.params.mctg);

	res.render("macrocategory.ejs", {
		macrocategoria: macrocategory,
		categorie: categorie[macrocategory].map((x) => urlify("categoria", x)),
		pensieri: Object.values(pensieri).filter((x) => {
			if (x.macrocategories.includes(macrocategory)) {
				return true;
			} else {
				return false;
			}
		}),
	});
});

app.get("/search/:query", (req, res) => {
	const query = req.params.query
		.replace(/[^a-zA-Z]+/g, "")
		.trim()
		.toLowerCase();
	console.log(query);

	res.render("search.ejs", {
		query: query,
		pensieri: Object.values(pensieri)
			.filter((x) => {
				console.log(x.text.toLowerCase());
				if (x.text.toLowerCase().includes(query)) {
					return true;
				} else {
					return false;
				}
			})
			.map((x) => {
				let dot_before;
				let dot_after;

				console.log(x);

				var regex = new RegExp("\\b" + query + "\\b");
				const q_position = x.text.toLowerCase().search(regex);

				let start_pos = q_position - Math.floor((190 - query.length) / 2);

				if (start_pos < 1) {
					start_pos = 0;
				}

				let end_pos = start_pos + 190;

				if (end_pos > x.text.length) {
					end_pos = x.text.length;
					start_pos = end_pos - 180;
					dot_after = "";
				} else {
					dot_after = "...";
				}

				if (start_pos < 1) {
					start_pos = 0;
					dot_before = "";
				} else {
					dot_before = "...";
				}

				const newX = x;
				newX.text = dot_before + x.text.slice(start_pos, end_pos).trim() + dot_after;
				return x;
			}),
	});
});

app.listen(3000, () => {
	console.log("Server is listening on port 3000!");
});
