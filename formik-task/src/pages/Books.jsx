import React from 'react'
import { useFormik } from 'formik';
import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import{v4 as uuid} from 'uuid';

function Books() {

   const list=[
    {
    id:1,
    title:'Junior Level Books Introduction to Computer',
    author:'Amit Garg',
    isbn:'978-93-5019-561-1',
    pubyear:'2011'

  },
  {
    id:2,
    title:'Computer Networks',
    author:'Saurabh Singhal',
    isbn:'978-93-8067-432-3',
    pubyear:'2015'
  },
  {
    id:3,
    title:'Client Server Computing',
    author:'Lalit Kumar',
    isbn:'978-93-8067-432-2',
    pubyear:'2012'
  },
  {
    id:4,
    title:'Computer Networks',
    author:'Sharad Kumar Verma',
    isbn:'978-93-8067-432-4',
    pubyear:'2010'
  },
  {
    id:5,
    title:'Mobile Computing',
    author:'Vinay Kumar',
    isbn:'978-93-5163-389-1',
    pubyear:'2011'
  },
  ]

  const[selectedBook,setSelectedBook]=useState(null);
  const[books,setBooks]=useState(list);
  const[newBook,setNewBook]=useState({
    title:'',
    author:'',
    isbn:'',
    pubyear:'',
  });

  let navigate=useNavigate();

//form validation using formik
  const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Required';
    } else if (values.title.length > 15) {
      errors.title = 'Must be 15 characters or less';
    }
  
    if (!values.author) {
      errors.author = 'Required';
    } else if (values.author.length > 20) {
      errors.author = 'Must be 20 characters or less';
    }
  
    if (!values.pubyear) {
      errors.pubyear = 'Required';
    } 
      return errors;
  };

//use formik

 const formik = useFormik({
     initialValues: {
       title: '',
       author: '',
       isbn: '',
       pubyear:'',
     },
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });

//form submit
const handleSave=()=>{
  if(selectedBook){
    //Edit Book
    const updateBooks=books.map((book)=>
    book.id===selectedBook.id ? {...newBook}:book);
    setBooks(updateBooks);
  }else{
    //Add New Book
    const newId=books.length+1;
    setBooks([...books,{id:newId,...newBook}]);
  }
  setSelectedBook(null);
  setNewBook({title:'',author:'',isbn:'',pubyear:''});
  // navigate('/books');
};

 //handleEdit  
const handleEdit=(book)=>{
  setSelectedBook(book);
  setNewBook({...book});
};
//handle delete
const handleDelete=(id)=>{
  var index=books.map(function(e){
    return e.id
  }).indexOf(id);
  books.splice(index,1);
  navigate('/books');
}

//Form
   return (    
    <div>
      <h4>Books Details:</h4><br/>
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="title">Book Title :  </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <input
         id="title"
         name="title"
         type="text"
         placeholder='Book Title'
         onChange={(e)=>setNewBook({...newBook,title:e.target.value})}
         value={newBook.title}
       /><br/><br/>
       {formik.errors.title ?<div> {formik.errors.title} </div>: null}
 
       <label htmlFor="author">Author Name : </label>&nbsp;
       <input
         id="author"
         name="author"
         type="text"
         placeholder="Author"
         onChange={(e)=>setNewBook({...newBook,author:e.target.value})}
         value={newBook.author}
       /><br/><br/>
       {formik.errors.author ? <div>{formik.errors.author}</div> : null}
 
       <label htmlFor="isbn">ISBN Number :</label>&nbsp;
       <input
         id="isbn"
         name="isbn"
         type="number"
         placeholder='ISBN number'
         onChange={(e)=>setNewBook({...newBook,isbn:e.target.value})}
         value={newBook.isbn}
       /><br/><br/>
       {formik.errors.isbn ? <div>{formik.errors.isbn}</div> : null}

       <label htmlFor="pubyear">Publication Year:</label>&nbsp;
       <input
         id="pubyear"
         name="pubyear"
         type="number"
         placeholder='Publication Year'
         onChange={(e)=>setNewBook({...newBook,pubyear:e.target.value})}
         value={newBook.pubyear}
       /><br/><br/>
       {formik.errors.pubyear ? <div>{formik.errors.pubyear}</div> : null}
 
       <button onClick={handleSave}>{selectedBook ? 'Save Change' :'Add Book'}</button>
     </form>
<br/><br/>

{/* Display table */}
  <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Title</th>
                        <th style={{ width: '20%' }}>Author</th>
                        <th style={{ width: '20%' }}>ISBN num</th>
                        <th style={{ width: '20%' }}>Publication Year</th>
                        <th style={{ width: '20%' }}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                      books && books.length>0 ?
                      books.map((book)=>(
                              <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.isbn}</td>
                                <td>{book.pubyear}</td>

                                <td style={{ whiteSpace: 'nowrap' }}>
                               
                                  <button className="btn btn-sm btn-primary mr-1" onClick={()=>handleEdit(book)}>
                                   Edit</button>
                                  
                                <button onClick={()=>handleDelete(book.id)} className="btn btn-sm btn-danger btn-delete-user" >Delete
                                   
                                       
                                </button>
                            </td>
                              </tr>

                      )):'NO data avaiable'
                      }
                    </tbody>
</table>

    
</div>
   );
                    }                

export default Books