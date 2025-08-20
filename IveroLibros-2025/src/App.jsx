import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import HomePage from './pages/homePage';
import ForumsPage from './pages/forumsPage';
import CreatePostPage from './pages/createPost';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import FeaturedBooksPage from './pages/booksFeature';
import BookDetailsPage from './pages/booksDetails';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null); // Nuevo estado

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'forums':
        return <ForumsPage setCurrentPage={setCurrentPage} />;
      case 'create-post':
        return <CreatePostPage />;
      case 'register':
        return <RegisterPage />;
      case 'login':
        return <LoginPage />;
      case 'featured-books':
        return (
          <FeaturedBooksPage
            setCurrentPage={setCurrentPage}
            setSelectedBook={setSelectedBook}
          />
        );
      case 'book-details':
        return (
          <BookDetailsPage
            book={selectedBook}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;