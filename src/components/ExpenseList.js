import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";
const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems ,handlePlusMinusColor}) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handlePlusMinusColor={handlePlusMinusColor}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn delete-btn" onClick={clearItems}>
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;