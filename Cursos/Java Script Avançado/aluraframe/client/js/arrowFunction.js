let numeros = [3, 2, 11, 20, 8, 7];
let novosNumeros = numeros.map((item, index) => item % 2 != 0 ? item * 2 : item);

let maioresQueDez = numeros.filter(numero => numero > 10);
