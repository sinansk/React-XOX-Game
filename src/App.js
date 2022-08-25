import Board from "./components/Board";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="grid w-screen h-screen bg-slate-800 selection:text-slate-700 selection:bg-slate-300 text-slate-300">
      <Board />
      <Footer />
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
}

export default App;
