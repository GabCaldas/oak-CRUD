import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './AppRouter';

function App() {


  return (
    <>
   <AppRouter/>
   <ToastContainer position="top-right" autoClose={5000} /> {/* Configure as opções do ToastContainer aqui */}
    </>
  )
}

export default App

