import React, { useState } from 'react';
import Item from './ExpenseItem'
import {MdDelete} from 'react-icons/md' ;



export const ExpenseList = ({expenses,clearItems,handleDelete,handleEdit }) => {
    
    return (
        
        <div>
            <ul className="list">
                {expenses.map((expense) => {
                    return <Item key={expense.id}
                     expense={expense}
                     handleDelete={handleDelete}
                     handleEdit={handleEdit}
                     />;
                })}
            </ul>

            {expenses.length>0  && 
                <button className="btn delete-btn"
                onClick={clearItems} >
                    clear expense
                    <MdDelete className="btn-icon"/>
                </button>
            }

        {/*  <Item/> */}
        </div>
    )
}

export default ExpenseList;

