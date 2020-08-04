const helpers = {};

helpers.randomNombreImg = () => {
    const posible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomNombreImg = 0;
    for(let i = 0;i < 6; i++) {
        //numero aleatorio dentro de las posiblilidades de 
        // Math.floor redondea para abajo 
        randomNombreImg += posible.charAt(Math.floor(Math.random() * posible.length));
    }
  return randomNombreImg;
}

module.exports = helpers;