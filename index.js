const express = require("express");
const path = require("path");
const flexsearch = require("flexsearch");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/styles", express.static(path.join(__dirname, "styles")));

const pensieri = require(path.join(__dirname, "public", "pensieri.json"));

app.use(
    "/bootstrap",
    express.static(path.join(__dirname, "node_modules", "bootstrap", "dist"))
);

app.use(
    "/mermaid",
    express.static(path.join(__dirname, "node_modules", "mermaid", "dist"))
);

app.use(
    "/markmap-common",
    express.static(
        path.join(__dirname, "node_modules", "markmap-common", "dist")
    )
);
app.use(
    "/markmap-view",
    express.static(path.join(__dirname, "node_modules", "markmap-view", "dist"))
);

app.set("view-engine", require("ejs"));
app.set("views", [
    path.join(__dirname, "views"),
    path.join(__dirname, "ejs_imports"),
]);

app.get("/", (req, res) => {
    res.render("home.ejs", {});
});

app.get("/categoria", (req, res) => {
    res.render("home.ejs", {});
});

app.get("/pensiero/:id", (req, res) => {
    res.render("thought.ejs", {
        numero: pensieri[req.params.id]["numeral"],
        pensiero: pensieri[req.params.id]["text"],
        categorie: [
            {
                nome: "Mortadella",
                link: "/categoria/mortadella",
            },
            {
                nome: "Prosciutto",
                link: "/categoria/prosciutto",
            },
            {
                nome: "Salame",
                link: "/categoria/salame",
            },
            {
                nome: "Tacchino",
                link: "/categoria/tacchino",
            },
        ],
    });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000!");
});
