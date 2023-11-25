const {
    addBookHandler,
    view,
    editBook,
    viewById,
    deleteBook
  } = require('./handler');
  
  const routes = [
  
    {
      method: 'POST',
      path: '/books',
      handler: addBookHandler,
    },
  
    {
      method: "GET",
      path: "/books",
      handler: view,
    }, {
      method: 'GET',
      path: '/books/{bookId}',
      handler: viewById,
    },
  
    {
      method: "PUT",
      path: "/books/{bookId}",
      handler: editBook,
    },
    {
      method: "DELETE",
      path: "/books/{bookId}", 
      handler: deleteBook,
    }
  ];
  
  module.exports = routes;