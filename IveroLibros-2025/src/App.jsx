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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'forums':
        return <ForumsPage setCurrentPage={setCurrentPage} />;
      case 'create-post':
        return <CreatePostPage />;
      case 'register':
        return <RegisterPage />;
      case 'login':
        return <LoginPage />;
      case 'featured-books':
        return <FeaturedBooksPage />;
      case 'book-details':
        return <BookDetailsPage />;
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