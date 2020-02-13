import React, { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4'

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 1200 },
  { id: uuid(), charge: "internet payment", amount: 250 },
];

function App() {
  //  -----  state  values ---------
  // all expenses, add expense

  // setExpenses will control the function
  const [expenses, setExpenses] = useState(initialExpenses);
  
  // single expense
  const [charge, setCharge] = useState(''); // default value that will be in charge
  // single amount
  const [amount, setAmount] = useState('');
  // alert
  const [alert,setAlert] = useState({show:false});
  // edit 
  const [edit, setEdit]  = useState(false);

  

  // edit id
  const [id,setId] = useState(0);
  // ------   functionality ---------

  const handleCharge = e =>{
    setCharge(e.target.value)
  }

  const handleAmount = e =>{
    setAmount(e.target.value);
  }
  // handle alert
  const handleAlert = ({type, text})=>{
    setAlert({show:true,type,text});
    setTimeout(() =>{
      setAlert({show:false})
    },3000);
  } 

  const handleSubmit = e =>{
    if(charge !== '' && (amount >0 || amount <= 0 ) ){
      if (edit){
          let tempExpenses = expenses.map(item=>
            {
              return item.id === id?
              {...item,charge,amount}:item
            });
            setExpenses(tempExpenses);
            setEdit(false);
            handleAlert({type:'success', text:'item edited'});  

      }else{
        // if  charge equale to the value we want insert 
        // we can keep it  the same
        const singleExpense = {id:uuid(),charge, amount};
        setExpenses([...expenses,singleExpense]);
        handleAlert({type:'success', text:'item added'});  
      }
           
      setCharge('');
      setAmount('');
    }
    else{
      handleAlert({type:'danger',
       text:`values can't be empty`});
    }
  };

  // clear all items
  const clearItems =() => {
   setExpenses([]);
   handleAlert({type:"danger", text:"items Deleted"});

  }

  // handle delete
  const handleDelete = (id) =>{
    let tempExpenses = expenses.filter(
      item => item.id !== id);
      setExpenses(tempExpenses);
      handleAlert({type:"danger", text:"item Deleted"});
  }

  // handle edit
  const handleEdit = (id) =>{
    let expense = expenses.find(item => item.id === id);
    let {charge,amount}= expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  
  }


  return (
    <>
      {alert.show &&
       <Alert type={alert.type}
       text={alert.text}
       />}

      <h1 className="h1-bottomline">Budget calculator</h1>

      <main className="App">

        <ExpenseForm charge={charge} amount={amount}
        handleAmount={handleAmount}
        handleCharge={handleCharge}
        handleSubmit={handleSubmit}
        edit ={ edit }
        />
        <ExpenseList expenses={expenses}
          handleDelete={handleDelete}  
          handleEdit ={handleEdit}
          clearItems = {clearItems}
          />
      </main>
      <h1>Total spendings:{" "}
      <span className="total">
        $
        {expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)} 
          </span>
        </h1>
      
    </>
  );
}

export default App;
