//перед началом рекомендуется прочитать текстовый документ documentation
let fs = require('fs');
let inText;
//запуск программы НОК
inText = fs.readFileSync('nok.ap');
//запуск программы поиска n - ого числа Фиб.
//inText = fs.readFileSync('fib.ap');
inText = inText.toString().split('\n');
let mem = new Array();
for (let i = 0; i < inText.length - 1; i++) mem = mem.concat(inText[i].replace('\r', '').split(' '));
if (mem[mem.length] != 'end') mem.push('end');
let flag;
let ip = mem.indexOf('var')+1;
let variables = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];

while (mem[ip] != 'end') {
	switch (mem[ip]) {
		//ввод input <номер ячейки> <значение>
		case 'input':
			variables[mem[ip+1]/1] = mem[ip+2]/1;
			ip += 3;
			break;
		//вывод 
		case 'output':
			console.log(variables[mem[ip+1]/1]);
			ip += 2;
			break;
		//присваивание ячейкиi значение ячейкиj
		case 'ass':
			variables[mem[ip+1]/1] = variables[mem[ip+2]/1];
			ip += 3;
			break;
		//вычитание
		case 'sub':
			variables[mem[ip+1]/1] = variables[mem[ip+1]/1] - variables[mem[ip+2]/1];
			ip += 3;
			break;
		//сложение
		case 'add':
			variables[mem[ip+1]/1] = variables[mem[ip+1]/1] + variables[mem[ip+2]/1];
			ip += 3;
			break;
		// == ?
		case 'cmp':
			if (variables[mem[ip+1]/1] == variables[mem[ip+2]/1]) flag = true;
			else flag = false;
			ip += 3;
			break;
		// > ?
		case 'more':
			if (variables[mem[ip+1]/1] > variables[mem[ip+2]/1]) flag = true;
			else flag = false;
			ip += 3;
			break;
		//переход к флагу
		case 'je':
			if (flag) ip = mem.indexOf((mem[ip+1]) + ':')+1;
			else ip += 2;
			break;
		//переход к началу/концу основного тела программы
		case 'jmp':
			if ((mem[ip+1]) == '@begin') ip = mem.indexOf('begin')+1;
			else ip = mem.indexOf('end');
			break;
		// пропуск ненужного
		default:
			ip += 1;
			break;
	}
}