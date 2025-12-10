import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-coffee-300">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;