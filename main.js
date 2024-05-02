// event listener button masukkan buku ke rak pada form
document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');  //select id form, bukan id button submit yg ada dlm form
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});


const books = [];
const RENDER_EVENT = 'render-book';     
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

// fungsi utk generate atribut id pada obj book
function generateId() {
    return +new Date();
}

// generate obj book
function generateBookObject(id, title, author, year, isComplete) {
    return {
      id,
      title,
      author,
      year,
      isComplete
    }
} 

// buat obj book
function addBook() {
    const generatedID = generateId();
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = parseInt(document.getElementById('inputBookYear').value);
    const isComplete = document.getElementById('inputBookIsComplete').checked;
        
    const bookObject = generateBookObject(generatedID, title, author, year, isComplete);
    books.push(bookObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    console.log();
}


/*  mengambil data dari penyimpanan lokal (localStorage), 
    mengonversinya dari format serialisasi JSON menjadi objek JavaScript, 
    memuatnya ke dalam array books
*/
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const book of data) {
        books.push(book);
      }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

// listener dari RENDER_EVENT, dengan menampilkan array books menggunakan console.log()
document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');   
    incompleteBookshelfList.innerHTML = '';                
    const completeBookshelfList = document.getElementById('completeBookshelfList');
    completeBookshelfList.innerHTML = '';
   
    for (const bookItem of books) {
      const bookElement = makeBook(bookItem);
      if (!bookItem.isComplete)
      incompleteBookshelfList.append(bookElement);
      else
      completeBookshelfList.append(bookElement);
    }
});

// make book
function makeBook(bookObject) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title; 
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = "Penulis: " + bookObject.author;
    const bookYear = document.createElement('p');
    bookYear.innerText = "Tahun: " + bookObject.year;
   
    // buat card booknya
    const textContainer = document.createElement('article');
    textContainer.classList.add('book_item');
    textContainer.append(bookTitle, bookAuthor, bookYear);
   
    // buat bagian yg tampung button red green
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');

    // button green
    const actionButton = document.createElement('button');
    actionButton.innerText = bookObject.isComplete ? "Belum selesai dibaca" : "Selesai dibaca";
    actionButton.classList.add('green');

    actionButton.addEventListener('click', function () {
      if (bookObject.isComplete)
        undoBookFromCompleted(bookObject.id);
      else
        addBookToCompleted(bookObject.id);
    });

    // button red
    const removeButton = document.createElement('button');
    removeButton.innerText = "Hapus Buku";
    removeButton.classList.add('red');
    removeButton.addEventListener('click', function () {
      removeBook(bookObject.id);
    });


    buttonContainer.append(actionButton, removeButton);     // masukkan red dan green button ke  button container
    textContainer.append(buttonContainer);                  // masukkan buttoncontainer kedlm text container

    return textContainer;
}

// fungsi fungsi dalam event listener di makebook
function undoBookFromCompleted(bookId){
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function addBookToCompleted(bookId){
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


function removeBook(bookId){
    const bookIndex = findBookIndex(bookId);
   
    if (bookIndex === -1) return;
   
    books.splice(bookIndex, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// findbook
function findBook(bookId) {
    for (const bookItem of books) {
      if (bookItem.id === bookId) {
        return bookItem;
      }
    }
    return null;
}

// findBookIndex
function findBookIndex(bookId) {
    for (const index in books) {
      if (books[index].id === bookId) {
        return index;
      }
    }
    return -1;
}

// savedata
function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(books);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }
  
  document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});