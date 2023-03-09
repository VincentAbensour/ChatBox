import './App.css';
import Home from './page/Home';
import Header from './components/Header';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import PrivateRoute from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
        <div className='header-app'>
          <Header/>
        </div>
        <div className='page-app'>
        <Routes>
          <Route element={<PrivateRoute><Home/></PrivateRoute>} path="/"/>
          <Route element={<LoginPage/>} path="/login" />
          <Route element={<RegisterPage/>} path="/register"/>
        </Routes>
        </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;



