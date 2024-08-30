import { useState  } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props)=>{

    const [expenses , SetExpenses]= useState({travel:0 , rent:0 , education:0 , food:0 , other:0})

    const fetchUserData = async ()=>{

        const url = "http://localhost:5000/api/expenses/fetchalldetails";
    let data = null;
    
        const headers = {
          'Content-Type': 'application/json',
          'auth-token' :localStorage.getItem('Token')
        };
        
        
       
        
        const requestOptions = {
          method: 'POST',
          headers: headers
        };
        
        try {
          const response = await fetch(url, requestOptions);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
           data = await response.json();
          
           const keysToKeep = ['rent', 'food', 'education', 'travel', 'other'];

// Filter the objects to keep only the specified keys
const filteredDataArray = data.map(item => {
  return Object.fromEntries(
    Object.entries(item).filter(([key]) => keysToKeep.includes(key))
  );
});
console.log(filteredDataArray)

// eslint-disable-next-line
const expenseObject = new Object();
expenseObject.rent =0;
expenseObject.food =0;
expenseObject.education =0;
expenseObject.travel =0;
expenseObject.other = 0;
// SetExpenses(filteredDataArray)
filteredDataArray.forEach(item => {
  expenseObject.travel +=item.travel
  expenseObject.rent +=item.rent
  expenseObject.education +=item.education
  expenseObject.food +=item.food
  expenseObject.other +=item.other
});



SetExpenses({travel:expenseObject.travel ,rent:expenseObject.rent ,food:expenseObject.food ,other:expenseObject.other ,education:expenseObject.education})
console.log(expenses)

        
        }
        catch(error){
                console.error('Error fetching data:', error);
        
        }
    
      
        
      }
    return (
        <NoteContext.Provider value={{expenses , fetchUserData}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;