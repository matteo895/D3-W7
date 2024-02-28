// Definizione della classe Book per rappresentare un libro
class Book {
  constructor(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
  }

  // Metodo per renderizzare l'HTML di una singola card del libro
  render() {
    return `
          <div class="col-md-3">
            <div class="card h-100">
              <img src="${this.image}" class="card-img-top img-fluid">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">${this.price}</p>
                <button class="btn btn-danger mt-auto"  onclick="removeBook(this)">Scarta</button>
              </div>
            </div>
          </div>
        `;
  }
}

// Funzione asincrona per recuperare i dati dei libri dall'API
async function fetchBooks() {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/books?limit=16"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Errore nel recupero dei libri:", error);
  }
}

// Funzione asincrona per renderizzare i libri sulla pagina
async function renderBooks() {
  // Otteniamo il riferimento all'elemento HTML in cui visualizzare i libri
  const bookList = document.getElementById("bookList");
  // Recuperiamo i dati dei libri dall'API
  const books = await fetchBooks();

  // Verifichiamo se ci sono libri disponibili
  if (books && books.length > 0) {
    // Generiamo l'HTML delle card per ogni libro e lo inseriamo nell'elemento bookList
    bookList.innerHTML = books
      .map((book) => {
        const { title, price, img } = book;
        const bookObj = new Book(title, price, img);
        return bookObj.render();
      })
      .join("");
  } else {
    // Se non ci sono libri disponibili, visualizziamo un messaggio di avviso
    bookList.innerHTML = "<p>Nessun libro disponibile</p>";
  }
}

// Funzione per rimuovere una card quando viene premuto il pulsante "Scarta"
function removeBook(button) {
  // Troviamo il genitore più vicino con la classe "card" (la card del libro)
  const card = button.closest(".card");
  // Rimuoviamo la card dal DOM
  card.remove();
}

// Chiamiamo la funzione renderBooks() quando la finestra è completamente caricata
window.onload = renderBooks;
