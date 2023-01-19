import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import AdminLayout from './Components/Admin/AdminLayout';
import UserLayout from './Components/User/UserLayout';
import { AuthProvider } from './Context/AuthContext';
import AddAppPage from './Pages/Admin/AddAppPage';
import AdminHomepage from './Pages/Admin/AdminHomepage';
import AdminLoginPage from './Pages/Admin/AdminLoginPage';
import SignupPage from './Pages/User/SignupPage';
import UserHomePage from './Pages/User/UserHomePage';
import UserLoginPage from './Pages/User/UserLoginPage';
import AdminPrivateRoute from './Utils/Admin/AdminPrivateRoute';
import UserPrivateRoutes from './Utils/User/UserPrivateRoutes';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route element={<SignupPage/>} path='/signup' />   {/* Signup page for user */}
      </Routes>
        <AuthProvider>
          <Routes>
          <Route element={<AdminLoginPage/>} path='/loginadmin' />
            <Route element={<AdminPrivateRoute/>}  >
             <Route element={<AdminLayout></AdminLayout>} path='/admin/' >
                  <Route element={<AdminHomepage/>} path='/admin/home' exact />
                  <Route element={<AddAppPage/>} path='/admin/add-app' />
             </Route>
            </Route>
          <Route element={<UserLoginPage/>} path='/' exact />
            <Route element={<UserPrivateRoutes/>} >
              <Route element={<UserLayout></UserLayout>} path='/user/' >
                <Route element={<UserHomePage/>} path='/user/home' />
              </Route>
            </Route>  
          </Routes>
        </AuthProvider> 
      </Router>
    </div>
  );
}

export default App;
