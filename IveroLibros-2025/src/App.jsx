import React, { useState, useEffect, lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import MyNavbar from './components/navbar';
import Footer from './components/footer';
import { Spinner } from 'react-bootstrap';

// 🚀 Uso de React.lazy para la carga dinámica de componentes
const HomePage = lazy(() => import('./pages/homePage'));
const ForumsPage = lazy(() => import('./pages/forumsPage'));
const CreatePostPage = lazy(() => import('./pages/createPost'));
const RegisterPage = lazy(() => import('./pages/registerPage'));
const LoginPage = lazy(() => import('./pages/loginPage'));
const FeaturedBooksPage = lazy(() => import('./pages/booksFeature'));
const BookDetailsPage = lazy(() => import('./pages/booksDetails'));
const Forums = lazy(() => import('./pages/forums'));
const AdminDashboard = lazy(() => import('./pages/dashboardPage'));
const PromoteBookPage = lazy(() => import('./pages/promotionBookPage'));
const ForgotPasswordPage = lazy(() => import('./pages/forgotPassword'));
const ResetPasswordPage = lazy(() => import('./pages/resetPassword'));

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageProps, setPageProps] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user);
      setIsLoggedIn(true);
    }

    const path = window.location.pathname;
    if (path === '/reset-password') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        setCurrentPage('reset-password');
      } else {
        setCurrentPage('home');
      }
    }
  }, []);

  const handleSetCurrentPage = (pageName, props = {}) => {
    setCurrentPage(pageName);
    setPageProps(props);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify({ user: userData }));
    handleSetCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
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
      case 'forgot-password':
        return <ForgotPasswordPage setCurrentPage={handleSetCurrentPage} />;
      case 'reset-password': {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        return <ResetPasswordPage setCurrentPage={handleSetCurrentPage} token={token} />;
      }
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
      <Suspense fallback={      
        <div className="forums-page py-5 d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando ...</span>
          </Spinner>
          <p className="mt-2">Cargando ...</p>
        </div>
      </div>}>
        {renderPage()}
      </Suspense>
      <Footer setCurrentPage={handleSetCurrentPage} />
    </div>
  );
}

export default App;