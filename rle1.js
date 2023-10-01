let fs = require('fs');
let inText;
let newString = ""; //строка для (де)кодирования

console.log(process.argv[3], process.argv[4])

//cod
if (process.argv[2] == 'code') {
	inText = fs.readFileSync('input.txt');
	inText = inText.toString();
	let i = 0, n = 1, j; 
	//кодирование
	while (i < inText.length){
			j = i;
			while (inText.charAt(j) == inText.charAt(j+1)) {
				n ++;
				j++;
				if (n == 255) break;
			}
			if (n <= 3) newString += inText.charAt(i).repeat(n);
			else newString += '#'+String.fromCharCode(n)+inText.charAt(i);
			i += n;
			n = 1;
		} 
	//запись в файл
	fs.writeFile('code.txt', newString, err => {
	  if (err) {
		console.error(err);
	  }
	});
}

//decode
else {
	inText = fs.readFileSync('code.txt');
	inText = inText.toString();
	i = 0; 
	// декодирование
	while (i < inText.length){
			if (inText.charAt(i) != '#') newString += inText.charAt(i)
			else {
				newString += inText.charAt(i+2).repeat(inText.charAt(i+1).charCodeAt());
				i += 2;
			}
			i++
		} 
	//запись в файл
	fs.writeFile('decode.txt', newString, err => {
	  if (err) {
		console.error(err);
	  }
	});
}