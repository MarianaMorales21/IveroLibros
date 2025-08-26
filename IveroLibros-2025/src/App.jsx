import React, { useState, useEffect } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 Al montar la App, revisamos si hay usuario guardado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user);
      setIsLoggedIn(true);
      setCurrentPage('home'); // lo mandamos al home automáticamente
    }
  }, []);

  const handleSetCurrentPage = (pageName, props = {}) => {
    setCurrentPage(pageName);
    setPageProps(props);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);

    // 🔹 Guardar usuario en localStorage
    localStorage.setItem('user', JSON.stringify({ user: userData }));

    handleSetCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);

    // 🔹 Eliminar sesión de localStorage
    localStorage.removeItem('user');

    handleSetCurrentPage('home');
  };

  const renderPage = () => {
    const isAdmin = user?.rol === 'Administrador';
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
        return (
          <LoginPage
            setCurrentPage={handleSetCurrentPage}
            onLoginSuccess={handleLoginSuccess}
          />
        );
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
        return <PromoteBookPage userSubscriptionStatus={userSubscriptionStatus} user={user} />;
      case 'dashboard':
        return isAdmin ? (
          <AdminDashboard setCurrentPage={handleSetCurrentPage} user={user} />
        ) : (
          <HomePage setCurrentPage={handleSetCurrentPage} />
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <MyNavbar
        setCurrentPage={handleSetCurrentPage}
        user={user}
        isAdmin={user?.rol === 'Administrador'}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
