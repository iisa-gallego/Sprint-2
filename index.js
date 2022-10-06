const listA = document.querySelector('.nombreA__input');
const listB = document.querySelector('.nombreB__input');

let file;
let upload;

let arrayProb;
var kNeighbors = [];
let nombres = [];
let caracteristicas = [];
let similitudes = [];

function preload() {
    file = loadStrings("./data/sprint2.csv");
    console.log(file);
}

function setup() {
    splitCsv();
}

function splitCsv() {
    for (let i = 1; i < file.length; i++) {

        upload = file[i].split(',');
        let name = upload[0];
        arrayProb = [];
        for (let j = 1; j < upload.length; j++) {

            arrayProb.push(parseInt(upload[j]));

        }
        nombres.push(new Nombre(name, arrayProb));
        console.log(nombres);

    }

    for (let i = 1; i < file.length; i++) {

        upload = file[i].split(',');
        let name = upload[0];
        arrayProb = [];
        for (let j = 1; j < upload.length; j++) {

            arrayProb.push(parseInt(upload[j]));

        }
        caracteristicas.push(new Nombre(name, arrayProb));
        //console.log(caracteristicas);
    }


    let size = nombres.length;
    let htmlString = "";
    //para hacer la lista
    for (let j = 0; j < size; j++) {

        let user = nombres[j];
        htmlString += '<option value= "' + user.name + '">' + user.name + '</option>';
    }

    listA.innerHTML = htmlString;
    listB.innerHTML = htmlString;
    listC.innerHTML = htmlString;


   htmlString = "";
    for (let i = 0; i < size - 1; i++) {
        htmlString += '<option value= "' + (i + 1) + '">' + (i + 1) + '</option>';
    }
    listK.innerHTML = htmlString;
}

function scalarProduct(user1, user2) {
    let result = 0;
    for (let i = 0; i < user1.caracteristicas.length; i++) {
        result += user1.caracteristicas[i] * user2.caracteristicas[i];
    }
    return result;
}

function findSimilarity(user1, user2) {

    let magnitude1 = user1.magnitude();
    let magnitude2 = user2.magnitude();
    let similarity;

    similarity = scalarProduct(user1, user2) / (magnitude1 * magnitude2);


    return similarity;
}

function calculate() {
    var select1 = document.getElementById('nombreA');
    var select2 = document.getElementById('nombreB');
    let similarity = findSimilarity(nombres[select1.selectedIndex], nombres[select2.selectedIndex]);
    var result = document.getElementById('result');
    result.innerText = 'similitud:' + Math.round(similarity * 100) + '%';
}

function searchUser(name) {

    let = -1;

    let flag = false;
    for (let i = 0; i < nombres.length && !flag; i++) {
        if (name === nombres[i].name) {
            flag = true;
            return i;
        }
    }

    return -1;

}