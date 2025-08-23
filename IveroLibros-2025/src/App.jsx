import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import MyNavbar from './components/navbar';
import Footer from './components/footer';
import HomePage from './pages/homePage';
import ForumsPage from './pages/forumsPage';
import CreatePostPage from './pages/createPost';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import FeaturedBooksPage from './pages/booksFeature';
import BookDetailsPage from './pages/booksDetails';
import Forums from './pages/forums';
import AdminDashboard from './pages/dashboardPage';
import PromoteBookPage from './pages/promotionBookPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageProps, setPageProps] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [user, setUser] = useState(null);

  const handleSetCurrentPage = (pageName, props = {}) => {
    setCurrentPage(pageName);
    setPageProps(props);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    handleSetCurrentPage('home');
  };

  const renderPage = () => {
    const isAdmin = user?.rol === 'admin';
    const userSubscriptionStatus = user?.suscripcion || 'Gratuita';

    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={handleSetCurrentPage} />;
      case 'forums':
        return <ForumsPage setCurrentPage={handleSetCurrentPage} />;
      case 'create-post':
        return <CreatePostPage setCurrentPage={handleSetCurrentPage} user={user} />;
      case 'register':
        return <RegisterPage setCurrentPage={handleSetCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={handleSetCurrentPage} onLoginSuccess={handleLoginSuccess} />;
      case 'forumsPage':
        return <Forums setCurrentPage={handleSetCurrentPage} pageProps={pageProps} user={user} />;
      case 'featured-books':
        return (
          <FeaturedBooksPage
            setCurrentPage={handleSetCurrentPage}
            setSelectedBook={setSelectedBook}
          />
        );
      case 'book-details':
        return (
          <BookDetailsPage
            bookId={selectedBook}
            setCurrentPage={handleSetCurrentPage}
          />
        );
      case 'promote-book':
        return <PromoteBookPage userSubscriptionStatus={userSubscriptionStatus} />;
      case 'dashboard':
        return isAdmin ? <AdminDashboard setCurrentPage={handleSetCurrentPage} /> : <HomePage setCurrentPage={handleSetCurrentPage} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <MyNavbar setCurrentPage={handleSetCurrentPage} user={user} isAdmin={user?.rol === 'admin'} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;