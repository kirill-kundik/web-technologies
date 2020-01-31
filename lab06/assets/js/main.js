document.addEventListener("DOMContentLoaded", function (_event) {

	function wordIndex(s, n) {
		let ret = [];
		let splits = s.split(" ");
		let index = 0;
		for (let i = 0; i < splits.length; i++) {
			ret.push([index, splits[i]]);
			index += splits[i].length + 1
		}
		ret = ret.filter(x => x[1] !== "");
		if (n <= ret.length && n > 0)
			return ret[n - 1][0];
		else
			return -1;
	}

	function avg(a, b) {
		return (a + b) / 2;
	}

	function geom(a, b) {
		return Math.sqrt(a * b);
	}

	function factorial(num) {
		let rval = 1;
		for (let i = 2; i <= num; i++)
			rval *= i;
		return rval;
	}

	function arccos(x, n) {
		let result = 0;
		for (let i = 0; i <= n; i++) {
			let y = (factorial(2 * i) * Math.pow(x, 2 * i + 1)) / (Math.pow(4, i) * Math.pow(factorial(i), 2) * (2 * i + 1));
			result += y;
		}

		return Math.PI / 2 - result;
	}

	function trapecia(_a, b, c) {
		let h = Math.sqrt(b * c);
		let r = h / 2;
		let sq = Math.PI * Math.pow(r, 2);
		return [r, sq];
	}

	const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
	const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

	function generateProducts() {
		let names = ["Sugar", "Salt", "Soup", "Meat"];
		let producers = ["Amazon", "Netflix", "NaUKMA"];
		let prices = [100, 200, 4000, 10000];
		let exps = [new Date(2020, 1, 26), new Date(2020, 1, 14), new Date(2020, 2, 8)];
		let counts = [10, 15, 100, 1000];

		return cartesian(names, producers, prices, exps, counts).map(x => makeProduct(...x))
	}

	function makeProduct(name, producer, price, expirationDate, count) {
		return {
			name: name,
			producer: producer,
			price: price,
			expirationDate: expirationDate,
			count: count
		}
	}

	function findByName(products, name) {
		return products.filter(function (item) {
			return item.name === name;
		})
	}

	function findByNameAndPrice(products, name, price) {
		return products.filter(function (item) {
			return item.name === name && item.price <= price;
		})
	}

	function findByExpirationDate(products, expDate) {
		return products.filter(function (item) {
			return item.expirationDate > expDate;
		})
	}

	let products = generateProducts();

	function alertMsg(task, msg) {
		let container = document.getElementById(task + "alert");
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
		container.innerHTML = "<div class='alert alert-danger' role='alert'>" + msg + "</div>";
	}

	function displayAnswer(task, msg) {
		let container = document.getElementById(task + "alert");
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
		document.getElementById(task + "answer").innerText = msg;
	}

	let task1Text = document.getElementById("task1Text");
	let task1Number = document.getElementById("task1Number");

	function task1() {
		if (task1Number.value === "") {
			displayAnswer("task1", "");
			return;
		}

		let x = parseInt(task1Number.value);
		if (isNaN(x)) {
			displayAnswer("task1", "");
			alertMsg("task1", "Значення номера слова має містити тільки цілі числа!");
			return;
		}
		let answer = wordIndex(task1Text.value.trim(), x);
		if (x === 0) {
			displayAnswer("task1", "Нульове слово? :)");
		} else if (answer === -1) {
			displayAnswer("task1", "Рядок, що ви ввели не містить такої кількості слів :(");
		} else {
			displayAnswer("task1", "Початок слово в індексі - " + answer);
		}
	}

	task1Text.onchange = task1;
	task1Number.addEventListener("change", task1);

	let task2Number1 = document.getElementById("task2Number1");
	let task2Number2 = document.getElementById("task2Number2");

	function task2() {
		if (task2Number1.value === "") {
			displayAnswer("task2", "");
			return;
		}
		if (task2Number2.value === "") {
			displayAnswer("task2", "");
			return;
		}

		let x = parseInt(task2Number1.value);
		if (isNaN(x)) {
			displayAnswer("task2", "");
			alertMsg("task2", "Значення першого числа має бути тільки цілим числом!");
			return;
		}
		let y = parseInt(task2Number2.value);
		if (isNaN(y)) {
			displayAnswer("task2", "");
			alertMsg("task2", "Значення другого числа має бути тільки цілим числом!");
			return;
		}
		let avg_ = avg(x, y);
		if (x * y < 0) {
			displayAnswer("task2", "Середнє значення: " + avg_);
			alertMsg("task2", "Добуток двох чисел від'ємний, обчислення середнього геометричного неможливе!");
			return;
		}
		let geom_ = geom(x, y);
		displayAnswer("task2", "Середнє значення: " + avg_ + ", середнє геометричне: " + geom_)
	}

	task2Number1.onchange = task2;
	task2Number2.onchange = task2;

	let task3Number1 = document.getElementById("task3Number1");
	let task3Number2 = document.getElementById("task3Number2");

	function task3() {
		if (task3Number1.value === "") {
			displayAnswer("task3", "");
			return;
		}
		if (task3Number2.value === "") {
			displayAnswer("task3", "");
			return;
		}

		let x = parseFloat(task3Number1.value);
		if (isNaN(x)) {
			displayAnswer("task3", "");
			alertMsg("task3", "Значення x має бути тільки дійсним числом!");
			return;
		}

		let n = parseInt(task3Number2.value);
		if (isNaN(n)) {
			displayAnswer("task3", "");
			alertMsg("task3", "Значення n має бути тільки цілим числом!");
			return;
		}

		if (n < 0) {
			displayAnswer("task3", "");
			alertMsg("task3", "Значення n має бути більше або рівне 0!");
			return;
		}

		if (Math.abs(x) >= 1) {
			displayAnswer("task3", "");
			alertMsg("task3", "Значення |x| має бути менше 1!");
			return;
		}

		displayAnswer("task3", "\narccos(" + x + "," + n + "): " + arccos(x, n) + "\nMath.arccos: " + Math.acos(x))
	}

	task3Number1.onchange = task3;
	task3Number2.onchange = task3;

	let task4Number1 = document.getElementById("task4Number1");
	let task4Number2 = document.getElementById("task4Number2");
	let task4Number3 = document.getElementById("task4Number3");

	function task4() {
		if (task4Number1.value === "") {
			displayAnswer("task4", "");
			return;
		}
		if (task4Number2.value === "") {
			displayAnswer("task4", "");
			return;
		}
		if (task4Number3.value === "") {
			displayAnswer("task4", "");
			return;
		}

		let b = parseFloat(task4Number1.value);
		if (isNaN(b)) {
			displayAnswer("task4", "");
			alertMsg("task4", "Значення довжини нижньої основи має бути тільки цілим числом!");
			return;
		}

		let c = parseFloat(task4Number2.value);
		if (isNaN(c)) {
			displayAnswer("task4", "");
			alertMsg("task4", "Значення довжини верхньої основи має бути тільки цілим числом!");
			return;
		}

		let a = parseFloat(task4Number3.value);
		if (isNaN(a)) {
			displayAnswer("task4", "");
			alertMsg("task4", "Значення довжини бічної сторони має бути тільки цілим числом!");
			return;
		}

		if (a < 0 || b < 0 || c < 0) {
			displayAnswer("task4", "");
			alertMsg("task4", "Значення довжини не може бути менше 0!");
			return;
		}

		let res = trapecia(a, b, c);
		displayAnswer("task4", "Радіус вписаного кола кола: " + res[0] + ", його площа: " + res[1]);
	}

	task4Number1.onchange = task4;
	task4Number2.onchange = task4;
	task4Number3.onchange = task4;

	const pickRandom = (arr, count) => {
		let _arr = [...arr];
		return [...Array(count)].map(() => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]).filter(x => x !== undefined);
	};

	function displayTable(productsToDisplay) {
		let res = "<table class='table table-bordered table-hover'>" +
			"<thead class='thead-dark'>" +
			"    <tr>" +
			"      <th scope='col'>Найменування</th>" +
			"      <th scope='col'>Виробник</th>" +
			"      <th scope='col'>Ціна</th>" +
			"      <th scope='col'>Термін придатності</th>" +
			"      <th scope='col'>Кількість</th>" +
			"    </tr>" +
			"  </thead>" +
			"  <tbody>";

		productsToDisplay.forEach(item => {
			res += "<tr><th scope='row'>" + item.name + "</th>" +
				"<td>" + item.producer + "</td>" +
				"<td>" + item.price + "</td>" +
				"<td>" + item.expirationDate + "</td>" +
				"<td>" + item.count + "</td></tr>"
		});

		res += "</tbody></table>";
		return res;
	}

	document.getElementById("productsCount").innerText = products.length;
	document.getElementById("productsDemo").innerHTML = displayTable(pickRandom(products, 10));

	let task5Text1 = document.getElementById("task5Text1");
	task5Text1.onchange = () => {
		document.getElementById("task51answer").innerHTML = displayTable(pickRandom(findByName(products, task5Text1.value), 5))
	};

	let task5Date = document.getElementById("task5Date");
	task5Date.onchange = () => {
		let date = Date.parse(task5Date.value);
		document.getElementById("task53answer").innerHTML = displayTable(pickRandom(findByExpirationDate(products, date), 5))
	};

	let task5Text2 = document.getElementById("task5Text2");
	let task5Number1 = document.getElementById("task5Number1");

	function task5() {
		let container = document.getElementById("task5alert");
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		let price = parseFloat(task5Number1.value);
		if (isNaN(price)) {
			document.getElementById("task52answer").innerHTML = displayTable([]);
			alertMsg("task5", "Значення ціни недопустиме!");
			return;
		}
		if (price < 0) {
			document.getElementById("task52answer").innerHTML = displayTable([]);
			alertMsg("task5", "Значення ціни має бути більше або рівне 0!");
			return;
		}
		document.getElementById("task52answer").innerHTML = displayTable(pickRandom(findByNameAndPrice(products, task5Text2.value, price), 5))
	}

	task5Text2.onchange = task5;
	task5Number1.onchange = task5;

});