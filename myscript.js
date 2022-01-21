let myLibrary = [];
let count = 0; 
function Book(author, title, genre, price, publish_date, description) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.price = price; 
    this.publish_date = publish_date; 
    this.description = description; 
}
/*
function addBooktoLibrary(author, title, genre, price, publish_date, description) {
    const newBook = new Book(author, title, genre, price, publish_date, description)
    myLibrary.push(newBook)
}*/


function addBooktoLibrary(author, title, genre, price, publish_date, description) {
    const newBook = ({
        title: title,
        author: author,
        genre: genre,
        price: price,
        publish_date: publish_date,
        description: description, 
    })
    
   // const newBook = new Book(author, title, genre, price, publish_date, description)
   
    myLibrary.push(newBook )
    
}



function removeBookbyTitle(title) {
    //const tobeDeleted = myLibrary.indexOf(val => val.title === title) 
    const newArray = myLibrary.filter(val => val.title !== title)
    myLibrary = [...newArray];

}

function removeBookbyID(ID) {
    console.log("ID = " + ID)
    myLibrary.splice(ID, 1)
  
    displayLibrary();
}

function onLoad() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
       // loadBooks(this)
        loadArray(this);
    }
    xhttp.open("GET", "books.xml");
    xhttp.send();

}

function loadBooks(xml) {
    const xmlDoc = xml.responseXML; 
    const x = xmlDoc.getElementsByTagName("book")

    let table = "<tr><th>Author</th><th>Title</th><th>Genre</th><th>Price</th><th>Published Date</th><th>Description</th></tr>"
    
    for (let i = 0; i < x.length; i++) {
        table += "<tr><td>" +
            x[i].getElementsByTagName('author')[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName('title')[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName('genre')[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName('price')[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName('publish_date')[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName('description')[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    document.getElementById('books').innerHTML = table; 
} 

onLoad();


async function loadArray(xml) {
    const xmlDoc = await xml.responseXML;
    const x = xmlDoc.getElementsByTagName("book")

    for (let i = 0; i < x.length; i++) {
        let author, title, genre, price, publish_date, description; 
        author = x[i].getElementsByTagName('author')[0].childNodes[0].nodeValue
        title = x[i].getElementsByTagName('title')[0].childNodes[0].nodeValue
        genre = x[i].getElementsByTagName('genre')[0].childNodes[0].nodeValue
        price = x[i].getElementsByTagName('price')[0].childNodes[0].nodeValue
        publish_date = x[i].getElementsByTagName('publish_date')[0].childNodes[0].nodeValue
        description = x[i].getElementsByTagName('description')[0].childNodes[0].nodeValue
        addBooktoLibrary(author, title, genre, price, publish_date, description)
    }

    displayLibrary(); 
}


function displayLibrary() {
    let table = "<tr><th>Author</th><th>Title</th><th>Genre</th><th>Price</th><th>Publish Date</th><th>Description</th><th>Action</th></tr>"
    let countID = 0; 
    console.log(myLibrary)
        myLibrary.forEach(function (val){
            
            table += "<tr id = 'text'><td id = countID>" +
                val.author + "</td><td>" +
                val.title + "</td><td>" +
                val.genre + "</td><td>" +
                "$" + val.price + "</td><td>" +
                val.publish_date + "</td><td>" +
                val.description
                + "</td><td><button onclick = 'removeBookbyID(" + countID + ")'>Remove from library</button></td></tr>"; 

            countID++;
        })

    /*
    console.log(myLibrary)
    myLibrary.forEach((val) => {
          console.log(val.author)
    })
    */
    document.getElementById('books').innerHTML = table;
}

const renderButton = () => {
    const x = "<Button onclick = 'addBookPrompt()'>Add Book</Button>"
    document.getElementById('button').innerHTML = x; 
}

renderButton(); 

function addBookPrompt() {
    const title = prompt('Please, type in the title of the book: ')
    const author = prompt('Please, type in the name of the author: ')
    const genre = prompt('Please, type in the genre of the book: ')
    const price = prompt('Type in the price: ')
    const description = prompt('Type in the description: ')
    const published_date = prompt('Please, type in the published date: ')
    addBooktoLibrary(author, title, genre, price, published_date, description);
    displayLibrary(); 
}