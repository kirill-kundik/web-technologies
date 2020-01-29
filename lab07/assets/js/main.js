document.addEventListener("DOMContentLoaded", function (_event) {

	const availableGoods = ["Стол письменный", "Стол кухонный", "Стул", "Шкаф книжный"];

	let goods = localStorage.getItem("goods");

	let goodsStorage = [];

	if (goods !== null && goods !== undefined) {
		goodsStorage = JSON.parse(goods);
	}

	let summaryContainer = document.getElementById("summary");
	let goodsContainer = document.getElementById("goodsContainer");
	let clearAllBtn = document.getElementById("clearAll");
	let inputGood = document.getElementById("inputGood");
	let infoContainer = document.getElementById("infoContainer");
	let refreshBtn = document.getElementById("refresh");

	function showMessage(text) {
		while (infoContainer.firstChild) {
			infoContainer.removeChild(infoContainer.firstChild);
		}
		infoContainer.innerHTML = "<div class='alert alert-primary' role='alert'>" + text + "</div>";
	}

	function calculateSummary() {
		let summary = 0;
		goodsStorage.forEach(function (item) {
			summary += item.price * item.count
		});
		summaryContainer.innerText = summary + "";
	}

	function generateInputNode(name, index) {
		let option = document.createElement("option");
		option.value = index;
		option.text = name;
		return option;
	}

	function generateGoodNode(name, price, count, index) {
		let tr = document.createElement("tr");
		tr.innerHTML = "<th scope='row'>" + name + "</th>\n" +
			"<td>" + price + "</td>\n" +
			"<td>" + count + "</td>\n" +
			"<td>" + price * count + "</td>" +
			"<td><button class='btn btn-danger clear' attr-data='" + index + "'>Удалить</button></td>";
		return tr;
	}

	function clearAll() {
		goodsStorage = [];
		displayGoods();
		showMessage("Все товары удалены!")
	}

	function clearItem() {
		let index = parseInt(this.getAttribute("attr-data"));
		let good = goodsStorage[index];
		goodsStorage.splice(index, 1);
		displayGoods();
		showMessage(good.name + " удалён!")
	}

	function refreshGoods() {
		goodsStorage = [
			{name: availableGoods[0], price: 12000.0, count: 5.0},
			{name: availableGoods[1], price: 8000.0, count: 10.0},
			{name: availableGoods[2], price: 20.0, count: 1200.0},
			{name: availableGoods[3], price: 14200.0, count: 4.0},
		];
		displayGoods();
	}

	function displayGoods() {
		while (goodsContainer.firstChild) {
			goodsContainer.removeChild(goodsContainer.firstChild);
		}
		while (inputGood.firstChild) {
			inputGood.removeChild(inputGood.firstChild);
		}

		goodsStorage.forEach(function (item, index) {
			goodsContainer.appendChild(generateGoodNode(item.name, item.price, item.count, index));
			inputGood.appendChild(generateInputNode(item.name, index))
		});

		document.querySelectorAll(".clear").forEach(function (item) {
			item.onclick = clearItem;
		});

		calculateSummary();

		localStorage.setItem("goods", JSON.stringify(goodsStorage));
	}

	function onSubmit(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		let good = document.getElementById("inputGood").value;
		let price = document.getElementById("inputPrice").value;
		let count = document.getElementById("inputCount").value;

		goodsStorage[good].count = count;
		goodsStorage[good].price = price;

		document.getElementById("inputGood").value = 0;
		document.getElementById("inputPrice").value = 0;
		document.getElementById("inputCount").value = 0;

		displayGoods();
		showMessage("Изменено " + goodsStorage[good].name + ": цена - " + price + ", количество - " + count)
	}

	clearAllBtn.onclick = clearAll;
	refreshBtn.onclick = refreshGoods;

	document.getElementById("form").onsubmit = onSubmit;

	displayGoods();

});