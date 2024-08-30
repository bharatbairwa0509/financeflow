import { React , useState} from 'react'

function Home(props) {
const [expenses , SetExpenses] = useState({travel :0 , food:0 , rent:0 , education:0 , other:0})




const Handlesubmit = async(e)=>{
  e.preventDefault();


const url = "http://localhost:5000/api/expenses/addExpenses";


const headers = {
  'Content-Type': 'application/json',
  'auth-token' :localStorage.getItem('Token')
};


const body = JSON.stringify({
  travel:expenses.travel,
  food:expenses.food,
  rent:expenses.rent,
  education:expenses.education,
  other:expenses.other
});

const requestOptions = {
  method: 'POST',
  headers: headers,
  body: body
};

try {
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }
  props.showAlert("Your expenses is added successfully " , "success")
  
  

}
catch(error){
        console.error('Error fetching data:', error);

}


}



const onChange =(e)=>{
  SetExpenses({...expenses , [e.target.name]: e.target.value})

  }



  return (
    <div className='container bg-dark text-white'>
      <h1>Please add Your today Expenses</h1>
      <form onSubmit={Handlesubmit}> 
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Travel</label>
    <input type="number" className="form-control bg-dark text-white" id="travel" name='travel' onChange={onChange} value={expenses.travel}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">rent</label>
    <input type="number" className="form-control bg-dark text-white" id="rent"  name='rent' onChange={onChange} value={expenses.rent}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Food</label>
    <input type="number" className="form-control bg-dark text-white" id="food"   name='food' onChange={onChange} value={expenses.food}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Education</label>
    <input type="number" className="form-control bg-dark text-white" id="education" name='education' onChange={onChange} value={expenses.education}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Other</label>
    <input type="number" className="form-control bg-dark text-white" id="other" name='other' onChange={onChange} value={expenses.other}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Home