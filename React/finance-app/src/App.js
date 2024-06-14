import React, {useState, useEffect} from "react";
import api from "./api";

// transaction: a state to store the transactions list
// formData: a state to store the forms data
const App = () => {
    const [transaction, setTransaction] = useState([]);
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
    });

    // async function that makes a GET request to obtain transactions and update the transaction state
    const fetchTransactions = async () => {
        const response = await api.get('/transactions/');
        setTransaction(response.data)
    };

    // hook that executes fetchTransactions when the component is first mounted
    useEffect(() => {
        fetchTransactions();
    }, [])

    // function to manipulate changes in form fields
    // updates formData with the values ​​of the form fields.
    // everytime a input box is changed, the function is called
    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        console.log("mudou fml")
        setFormData({
            ...formData,
            [event.target.name]: value,
        });
    };

    // function to manipulate the form submit 
    // (Prevents the form's default behavior, sends the data to the backend, reloads the transactions and resets the form)
    // When an HTML form is submitted, the browser's default behavior is to reload the page. This is because the default action of a form is to submit data to a server and load the server's response as a new page
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await api.post('/transactions/', formData)
        fetchTransactions(); // call to get the updated list of transactions from the backend. This ensures that the new transaction is immediately displayed in the user interface after being added.
        setFormData({ // setFormData is called with an empty object to clear form fields after submission. This prepares the form for the entry of a new transaction.
            amount: '',
            category: '',
            description: '',
            is_income: false,
            date: ''   
        });
    };

    return(
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="cointainer-fluid">
                    <a className="navbar-brand" href="#">
                        Finance App
                    </a>
                </div>
            </nav>

            <div className="container">
                <form onSubmit={handleFormSubmit}>

                    <div className="mb-3 mt-3">
                        <label htmlFor="amount" className="form-label">
                            Amount
                        </label>
                        <input type="text" className="form-control" id="amount" name="amount" onChange={handleInputChange} value={formData.amount}/>
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <input type="text" className="form-control" id="category" name="category" onChange={handleInputChange} value={formData.category}/>
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input type="text" className="form-control" id="description" name="description" onChange={handleInputChange} value={formData.description}/>
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="is_income" className="form-label">
                            Income?
                        </label>
                        <input type="checkbox" id="is_income" name="is_income" onChange={handleInputChange} value={formData.is_income}/>
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="date" className="form-label">
                            Date
                        </label>
                        <input type="text" className="form-control" id="date" name="date" onChange={handleInputChange} value={formData.data}/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>

                </form>
                <p/>
                <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Income?</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.amount}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.is_income ? "Yes" : "No"}</td>
                            <td>{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
                </table>

            </div>  
        </div>
    );
}

export default App;
