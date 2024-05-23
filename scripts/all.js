document.querySelector("#random-thought").onclick = function () {
	window.location.replace(`/pensiero/${Math.floor(Math.random() * 110) + 1}`);
};

function search() {
	const query = document.getElementById("querySearch").value.trim();
	console.log(query);
	if (query != "") {
		window.location.replace(`/search/${query}`);
	}
}
