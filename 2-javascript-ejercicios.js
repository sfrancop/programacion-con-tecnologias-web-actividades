/*

1. ¿Qué es un closure? Proporcione un ejemplo.

Es la capacidad que tiene una función de recordar el contexto en el que fue
creada, incluso cuando la función es ejecutada en un contexto diferente al de
su creación.

*/

function holaMundo() {
  const mensaje = 'Hola mundo';
  return function() {
    return mensaje;
  }
}

const mensaje = holaMundo();
console.log(mensaje()); // La funcion mensaje recuerda el valor de la variable "mensaje" declarada en la linea 12 y dentro de la función "holaMundo".

/*

2. ¿Qué es el hoisting? Proporcione un ejemplo.

Es el comportamiento por defecto de JavaScript de mover las declaraciones de
variables y funciones al inicio de su contexto de ejecución Esto permite
usar una variable o función en la escritura del código antes de haberla 
declarado.

*/

console.log(miFuncion());
function miFuncion() {
  return 'Hola mundo';
}

/*

3. El máximo común divisor (mcd) de dos números a, b es a, si a y b son
iguales, o el mcd de c y d, donde c es el menor entre a y b, y d es la
diferencia entre el mayor y el menor. Implemente una función arrow, de una
sola línea, recursiva, que calcule el mcd de dos números dados.
    
*/

const mcd = (a, b) => a === b ? a : mcd(a<b ? a:b, a<b ? b-a:a-b);
console.log(mcd(80, 100));