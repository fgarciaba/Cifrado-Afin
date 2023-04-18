function recogerTextoCifrado(){
  var text = document.getElementById("texto").value;
  var lim = limpiarTexto(text);
  var a = document.getElementById("a").value;
  var a2 = parseInt(a,10);
  var b = document.getElementById("b").value;
  var b2 = parseInt(b,10);
  var cif = cifrado(lim,a2,b2);
  document.getElementById("textoCifrado").value = cif;
}


function recogerTextoDescifrado(){
  var cif = document.getElementById("textoCifrado").value;
  var fre = frecuencia(cif);
  var des = descifrado(cif,fre.varra1,fre.varra2);  
  document.getElementById("textoDescifrado").value = des.plaintext;
  document.getElementById("textoDescifrado2").value = des.plaintext2;
}


function limpiarTexto(texto) {
  var mapaCaracteres = {
    "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ü": "u",
    "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U", "Ü": "U",
  };
  var expresionRegular = /[\s.,\/#!$%\^&\*;:{}=\-_`~()\n0-9]/g;
  function reemplazo(caracter) {
    return mapaCaracteres[caracter] || caracter;
  }
  return texto.replace(expresionRegular, "").replace(/[áéíóúüÁÉÍÓÚÜ]/g, reemplazo).toUpperCase();
}


function sonCoprimos(numero) {
  function calcularMCD(a, b) {
    return b === 0 ? a : calcularMCD(b, a % b);
  }
  return calcularMCD(numero, 27) === 1;
}


function frecuencia(texto) {
  var frecuencia = {};
  var caracteres = texto.split('');
  var totalvarras = 0;
  for (var i = 0; i < caracteres.length; i++) {
    var varra = caracteres[i];
    if (varra in frecuencia) {
      frecuencia[varra]++;
    } else {
      frecuencia[varra] = 1;
    }
    totalvarras++;
  }
  var frecuenciaOrdenada = Object.entries(frecuencia).sort((a, b) => b[1] - a[1]);
  var frecuenciaOrdenadaString = "";
  var frecuenciaOrdenadaString2 = "";
  for (var i = 0; i < frecuenciaOrdenada.length; i++) {
    var frecuenciaAbsoluta = frecuenciaOrdenada[i][1];
    frecuenciaOrdenadaString += `${frecuenciaOrdenada[i][0]}:${frecuenciaOrdenada[i][1]}\n`;
    var frecuenciaRelativa = (frecuenciaAbsoluta / totalvarras * 100).toFixed(2);
    frecuenciaOrdenadaString2 += `${frecuenciaOrdenada[i][0]}:${frecuenciaRelativa}%\n`;
  }
  var varra1 = frecuenciaOrdenada[0][0];
  var varra2 = frecuenciaOrdenada[1][0];

  return {varra1, varra2, frecuenciaOrdenadaString, frecuenciaOrdenadaString2, totalvarras, frecuencia};
}


function inverso(a, m) {
  for (var x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x
    }
  }
  return 1;
}


function cifrado(plaintext, a, b) {
  if(sonCoprimos(a) === true){
    var ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    var m = ALPHABET.length;
    var ciphertext = '';
    for (var i = 0; i < plaintext.length; i++) {
      var char = plaintext[i];
      var index = ALPHABET.indexOf(char);
      if (index === -1) {
        ciphertext += char;
      } else {
        var encryptedIndex = (a * index + b) % m;
        var encryptedChar = ALPHABET[encryptedIndex];
        ciphertext += encryptedChar;
      }
    }
    return ciphertext;
  } else {
    alert("A y el módulo 27 no son coprimos, ingrese un valor de A valido.")
  }
}


function descifrado(ciphertext, varra1, varra2) {
  var ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  var m = ALPHABET.length;
  var b = ALPHABET.indexOf(varra2);
  var a = (ALPHABET.indexOf(varra1) - b) * inverso(4, 27) % m;
  if(a < 0){
    a = a + 27;
  }
    var invA = inverso(a, m);
    var plaintext = '';
    for (var i = 0; i < ciphertext.length; i++) {
      var char = ciphertext[i];
      var index = ALPHABET.indexOf(char);
      if (index === -1) {
        plaintext += char;
      } else {
        var decryptedIndex = (invA * (index - b + m)) % m;
        var decryptedChar = ALPHABET[decryptedIndex];
        plaintext += decryptedChar;
      }
    }
  var b1 = ALPHABET.indexOf(varra1);
  var a1 = (ALPHABET.indexOf(varra2) - b1) * inverso(4, 27) % m;
  if(a1 < 0){
    a1 = a1 + 27;
  }
    var invA1 = inverso(a1, m);
    var plaintext2 = '';
    for (var i = 0; i < ciphertext.length; i++) {
      var char = ciphertext[i];
      var index = ALPHABET.indexOf(char);
      if (index === -1) {
        plaintext2 += char;
      } else {
        var decryptedIndex = (invA1 * (index - b1 + m)) % m;
        var decryptedChar = ALPHABET[decryptedIndex];
        plaintext2 += decryptedChar;
      }
    }
  return {plaintext, plaintext2};
}




