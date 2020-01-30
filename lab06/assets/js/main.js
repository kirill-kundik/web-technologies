document.addEventListener("DOMContentLoaded", function (event) {

	function wordIndex(s, n) {
		if (s.length)
			n--;
		for (let i in s) {
			// console.log(i + "   " + s[i] + " , n: " + n);
			if (n === 0)
				return i;
			if (s[i] === " ")
				n--;
		}
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

	let products = [];

	function makeProduct(name, producer, price, expirationDate, count) {
		return {
			name: name,
			producer: producer,
			price: price,
			expirationDate: expirationDate,
			count: count
		}
	}

	function findByName(name) {
		return products.filter(function (item) {
			return item.name === name;
		})
	}

	function findByNameAndPrice(name, price) {
		return products.filter(function (item) {
			return item.name === name && item.price <= price;
		})
	}

	function findByExpirationDate(expDate) {
		return products.filter(function (item) {
			return item.expirationDate > expDate;
		})
	}

	console.log(Math.acos(0.6));
	console.log(arccos(0.6, 30));

});