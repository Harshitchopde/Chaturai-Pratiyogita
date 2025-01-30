import { Route, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/common/NavBar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { VerifyEmail } from './pages/VerifyEmail';
import Quizzes from './pages/Quizzes';

function App() {
  return (
    <div className="App flex flex-col text-xl ">
      <NavBar/>
      <Routes>
        <Route path='/'>
            <Route index element={<Quizzes/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='signUp' element={<SignUp/>}/>
            <Route path='verify-email' element={<VerifyEmail/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
