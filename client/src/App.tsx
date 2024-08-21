import Root from "./Root";
import "./output.css";
import Footer from "./pages/Footer";
import Navbar from "./pages/Navbar";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
      <div className="bg-slate-50 min-h-screen text-slate-900">
        <Navbar />
        <Root />
        <Toaster />
        <Footer />
      </div>
  );
}

export default App;
