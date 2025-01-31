import { Route, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/common/NavBar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { VerifyEmail } from './pages/VerifyEmail';
import Quizzes from './pages/Quizzes';
import { PrivateRoute } from './components/core/auth/PrivateRoute';
import DashBoard from './pages/DashBoard';
import MyProfile from './components/core/dashboard/MyProfile';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './utils/constants';
import AddQuiz from './components/core/dashboard/AddQuiz';
import MyQuiz from './components/core/dashboard/MyQuiz';
import Instructor from './components/core/dashboard/Instructors/Instructor';
import Setting from './components/core/dashboard/Setting';


function App() {
  const {user} = useSelector(state=>state.profile);
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
        <Route element={
          <PrivateRoute>
            <DashBoard/>
          </PrivateRoute>
        }>
          <Route path='/dashboard/profile' element={<MyProfile/>}/>
          <Route path='/dashboard/my-quiz' element={<MyQuiz/>}/>
          <Route path='/dashboard/settings' element={<Setting/>}/>
          {
            user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='/dashboard/add-quiz' element={<AddQuiz/>}/>
                <Route path='/dashboard/instructor' element={<Instructor/>}/>
              </>
            )
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
