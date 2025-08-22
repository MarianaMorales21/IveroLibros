import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import MyNavbar from './components/navbar'; // Componente de barra de navegación
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
  const [selectedBook, setSelectedBook] = useState(null);

  // Estado para la suscripción del usuario.
  const [userSubscriptionStatus] = useState('Premium'); //Gratuita

  // Estado para el rol de administrador.
  const [isAdmin] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'forums':
        return <ForumsPage setCurrentPage={setCurrentPage} />;
      case 'create-post':
        return <CreatePostPage setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'forumsPage':
        return <Forums setCurrentPage={setCurrentPage} />;
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
      // **AQUÍ ESTÁ EL CAMBIO**
      // Se corrigió el nombre de la página y se pasó la prop de la suscripción
      case 'promote-book':
        return <PromoteBookPage userSubscriptionStatus={userSubscriptionStatus} />;

      case 'dashboard':
        return isAdmin ? <AdminDashboard setCurrentPage={setCurrentPage} /> : <HomePage setCurrentPage={setCurrentPage} />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <MyNavbar setCurrentPage={setCurrentPage} isAdmin={isAdmin} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;