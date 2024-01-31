import urllib.parse as urllib
from json import dump as json

with open("ejs_imports/leopardi.mmd", "r", encoding="utf-8") as infile:
    old_list = [i.replace("    ", "\t").strip("\n") for i in infile.readlines()]

links = {}

for i in old_list:
    j = i.strip(" \t")

    match i.count("\t"):
        case 2:
            links[j] = f"/macrocategoria/{urllib.quote(j.lower())}"
        case 3:
            links[j] = f"/categoria/{urllib.quote(j.lower())}"

with open("public/mermaid-links.json", "w", encoding="utf-8") as outfile:
    json(links, outfile, indent=4, ensure_ascii=False)
