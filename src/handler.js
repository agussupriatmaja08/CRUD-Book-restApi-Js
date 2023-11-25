const {
    nanoid
} = require("nanoid");

let books = require('./books');


//menambahkan books
const addBookHandler = (request, h) => {
    // menerima inputan dengan method POST.  
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    //membuat id otomatis dengan 16 digit
    const id = nanoid(16);
    // jika pageCount lebih besar dari redpage 
    if (pageCount > readPage) {
        finished = false;
    }
    // jika pageCount samadengan redpage 

    if (pageCount === readPage) {
        finished = true;
    }
    //membuat insertAt dan updateAt
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    // membuat new book 
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt
    };

    // jika nama kososng
    if (!name) {
        const response = h.response(

            {
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            }
        );
        response.code(400);
        return response;

    }
    // jika pageCount lebih kecil dari redpage 

    if (pageCount < readPage) {
        const response = h.response(

            {
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            }

        );
        response.code(400);
        return response;

    }
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    });

    //melakukan push atau add data
    books.push(newBook);
    console.log(books);
    response.code(201);
    return response;


};

//menampilkan book
const view = (request, h) => {
    const book = books.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      }));

      book;
      
      const response = h.response({
        status: 'success',
        data: {
            books : book,
        },
      });
      response.code(200);
      return response;  
   
}

// menampilkan book berdasarkan ID
const viewById = (request, h) => {
    // menampung parameter request. Yang ada di url books/{bookId}
    const {
        bookId
    } = request.params;

    // melakukan filter pada array book
    const book = books.filter((b) => b.id === bookId)[0];

    // jika book undefined 
    if (book == undefined) {
        const response = h.response({
            "status": "fail",
            "message": "Buku tidak ditemukan",

        });
        response.code(404);
        return response;

    }

    const response = h.response({
        status: "success",
        data: {
            book,
        }
    });
    response.code(200);
    return response;


};

//mengedit buku
const editBook = async (request, h) => {
    try {
        const { bookId } = request.params;
        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        } = request.payload;
        const updatedAt = new Date().toISOString();
        if (!name) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }
        if (pageCount < readPage) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }
        if (!bookId) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
            });
            response.code(404);
            return response;
        }
        let finished;
        if (pageCount > readPage) {
            finished = false;
        }
        if (pageCount === readPage) {
            finished = true;
        }
        
        const index = books.findIndex((b) => b.id === bookId);
        
        if (index >= 0) {
            // Menunggu proses asinkronous selesai
            await updateBook(books[index], {
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
                finished,
                updatedAt,
                insertedAt ,
            
            });

            const response = h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            });
            response.code(200);
            return response;
        }

        // Jika bookId tidak ditemukan
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    } catch (error) {
        // Handle errors here
        console.error(error);
        
};
}
// Fungsi untuk melakukan update
const updateBook = (book, updated) => {
    return new Promise((resolve) => {
        // simulasikan proses asinkron
        setTimeout(() => {

            books[books.indexOf(book)] = {
                ...book,
                ...updated
            };
            resolve();
        }, 1000);
    });
};

//menghapus book
const deleteBook = (request, h) => {

    // menampung parameter request. Yang ada di url books/{id}
    const {
        bookId
    } = request.params;

    const index = books.findIndex((b) => b.id === bookId);

    if (index >= 0) {
        books.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus"

        });
        response.code(200);
        return response;

    }


    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"

    });
    response.code(404);
    return response;
}


module.exports = {
    addBookHandler,
    view,
    viewById,
    editBook,
    deleteBook
};