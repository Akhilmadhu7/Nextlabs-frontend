import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import { AdminAuthProvider } from './Context/Admin/AuthContext';
import AdminHomepage from './Pages/Admin/AdminHomepage';
import AdminLoginPage from './Pages/Admin/AdminLoginPage';
import AdminPrivateRoute from './Utils/Admin/AdminPrivateRoute';
function App() {
  return (
    <div className="App">
      <Router>
      {/* <Routes>
        <Route element={<AdminLoginPage/>} path='/loginadmin' />
      </Routes> */}
        <AdminAuthProvider>
          <Routes>
          <Route element={<AdminLoginPage/>} path='/loginadmin' />
            <Route element={<AdminPrivateRoute/>}  >
                  <Route element={<AdminHomepage/>} path='/admin/home' exact />
            </Route>
          </Routes>
        </AdminAuthProvider>  
      </Router>
    </div>
  );
}

export default App;
