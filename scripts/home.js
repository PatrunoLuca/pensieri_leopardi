var links = {
	Tempo: "/macrocategoria/tempo",
	Gioventú: "/categoria/giovent%C3%BA",
	Vecchiaia: "/categoria/vecchiaia",
	Esperienza: "/categoria/esperienza",
	Anniversari: "/categoria/anniversari",
	Dualismi: "/macrocategoria/dualismi",
	"Essere e Apparire": "/categoria/essere%20e%20apparire",
	"Dire e Fare": "/categoria/dire%20e%20fare",
	"Immaginazione e Realtà": "/categoria/immaginazione%20e%20realt%C3%A0",
	"Uomo e Natura": "/categoria/uomo%20e%20natura",
	"Uomo e Donna": "/categoria/uomo%20e%20donna",
	"Miserie Umane": "/macrocategoria/miserie%20umane",
	Presunzione: "/categoria/presunzione",
	Malvagità: "/categoria/malvagit%C3%A0",
	Superbia: "/categoria/superbia",
	Prepotenza: "/categoria/prepotenza",
	Viltà: "/categoria/vilt%C3%A0",
	Disprezzo: "/categoria/disprezzo",
	Ipocrisia: "/categoria/ipocrisia",
	Intolleranza: "/categoria/intolleranza",
	Credulità: "/categoria/credulit%C3%A0",
	Virtú: "/macrocategoria/virt%C3%BA",
	Onesta: "/categoria/onesta",
	Bontà: "/categoria/bont%C3%A0",
	Sincerità: "/categoria/sincerit%C3%A0",
	Modestia: "/categoria/modestia",
	Sentimenti: "/macrocategoria/sentimenti",
	Allegria: "/categoria/allegria",
	Malinconia: "/categoria/malinconia",
	Noia: "/categoria/noia",
	Popolarità: "/categoria/popolarit%C3%A0",
	Ingiurie: "/categoria/ingiurie",
	"Parlare Troppo": "/categoria/parlare%20troppo",
	Inganno: "/categoria/inganno",
	Denaro: "/categoria/denaro",
	Segreti: "/categoria/segreti",
	Epidemie: "/categoria/epidemie",
	Destino: "/categoria/destino",
	Specchio: "/categoria/specchio",
	Conoscenza: "/macrocategoria/conoscenza",
	Letteratura: "/categoria/letteratura",
	Guicciardini: "/categoria/guicciardini",
	Educazione: "/categoria/educazione",
	Illusioni: "/categoria/illusioni",
};

document.addEventListener("click", function (event) {
	if (event.target.tagName !== "tspan") {
		return;
	}

	var tspan_text;
	if (event.target.classList.contains("text-outer-tspan")) {
		tspan_text = event.target.textContent;
	} else {
		tspan_text = event.target.parentElement.textContent;
	}

	if (tspan_text in links) {
		window.location.href = links[tspan_text];
	}
});
