<<<<<<< HEAD
// Prueba real


const sum = require('./suma'); // Importamos la funcion que queremos probar

test("La funcion suma debe devolver suma correcta", () => { // Definimos una prueba con el nombre "La funcion suma debe devolver suma correcta"
    expect(sum(1, 2)).toBe(3); // Esperamos que la funcion sum(1, 2) retorne 3
});
=======
// prueba real 

const sum = require ('./suma');

test("La funcion suma debe devolver suma correcta", () =>{
  expect(sum(6, 4)).toBe(10);
});

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
