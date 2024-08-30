
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert'
import Home from './components/Home';
import NoteState from './context/expenses/NoteState'
import { useState} from 'react'
import MonthlyExpensesChart from './components/MonthlyExpensesChart';
function App() {

  
  

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  const expenses = {
    Travel: 300,
    Entertainment: 150,
    Education: 500,
    Books: 200,
    EMI: 400
  };

 
  return (
    <div  className='bg-dark text-white'>
      <NoteState>
    <Router>
    <Navbar />
    <Alert alert={alert}/>

    <Routes>
        <Route exact path='/' element ={<Home  showAlert ={showAlert}/>}  />
    <Route exact path='/MonthlyExpensesChart' element ={ <MonthlyExpensesChart expenses= {expenses} />}/>
       <Route exact path='/login' element={<Login showAlert ={showAlert}  />} />
      <Route exact path='/signup' element={<Signup showAlert ={showAlert} />} />

    </Routes>

  </Router>
  </NoteState>
  </div>
  );
}

export default App;
