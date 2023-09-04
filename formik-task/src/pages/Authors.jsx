import React from 'react'
import { useFormik } from 'formik';
import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';


function Authors() {
  const[authors,setAuthors]=useState([
    {
      id:1,
      name:'Khushwant Singh',
      birthday:'1915-02-02', //yyyy-mm-dd
      biography:'journalist and politician',

    },
    {
      id:2,
      name:'Roald Dahl',
      birthday:'1916-09-13',
      biography:'Novelist,poet,screenwriter',

    },
    {
      id:3,
      name:'Perry',
      birthday:'1957-11-01 ',
      biography:'Psychotherapy,journalism',

    },
    {
      id:4,
      name:'Sudha Murthy',
      birthday:'1950-08-19',
      biography:'Chairperson of Infosys Foundation,Children writer',

    },
  ]) ;
   const [selectedAuthor,setSelectedAuthor]=useState(null);
   const[newAuthor,setNewAuthor]=useState({
    name:'',
    birthday:'',
    biography:'',
   });

const handleEdit=(author)=>{
setSelectedAuthor(author);
setNewAuthor({...author});
};

const handleSave=()=>{
  if(selectedAuthor){
    //Edit Author
    const updateAuthors=authors.map((author)=>author.id===selectedAuthor.id ? {...newAuthor}:author);
    setAuthors(updateAuthors);
  }else{
    //Add New author
    const newId=authors.length+1;
    setAuthors([...authors,{id:newId,...newAuthor}]);
  }
  setSelectedAuthor(null);
  setNewAuthor({
    name:'',
    birthday:'',
    biography:'',
  });
};

//Delete author
const handleDelete=(id)=>{
  const updateAuthors= authors.filter((author)=>author.id !==id);
  setAuthors(updateAuthors);
  };

  //form validation using formik
  const validate = values =>{
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }
  
    if (!values.birthday) {
      errors.birthday = 'Required';
    }   
      return errors;
  };

//use formik

 const formik = useFormik({
     initialValues: {
       name: '',
       birthday: '',
       biography: '',
       
     },
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });

  return (
    <div>
      <h4>Authors Details:</h4><br/>
<form onSubmit={formik.handleSubmit}>
       <label htmlFor="name">Author :  </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <input
         id="name"
         name="name"
         type="text"
         placeholder='Author Name'
         onChange={(e)=>setNewAuthor({...newAuthor,name:e.target.value})}
         value={newAuthor.name}
       /><br/><br/>
       {formik.errors.name ?<div> {formik.errors.name} </div>: null}
 
       <label htmlFor="birthday">Birthday : </label>
       &nbsp;&nbsp;&nbsp;&nbsp;
       <input
         id="birthday"
         name="birthday"
         type="date"
         placeholder="yyyy-mm-dd"
         onChange={(e)=>setNewAuthor({...newAuthor,birthday:e.target.value})}
         value={newAuthor.birthday}
       /><br/><br/>
       {formik.errors.author ? <div>{formik.errors.author}</div> : null}
 
       <label htmlFor="biography">Biography :</label>&nbsp;
       <input
         id="biography"
         name="biography"
         type="text"
         placeholder='Biography'
         onChange={(e)=>setNewAuthor({...newAuthor,biography:e.target.value})}
         value={newAuthor.biography}
       /><br/><br/>
       {formik.errors.biography ? <div>{formik.errors.biography}</div> : null}     
       <br/>    
      <button onClick={handleSave}>{selectedAuthor ? 'Save Change' :'Add Author'}</button>
     </form>
<br/><br/>

{/* Display table */}
  <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Author Name</th>
                        <th style={{ width: '20%' }}>Birthday</th>
                        <th style={{ width: '30%' }}>Biography</th>
                        <th style={{ width: '30%' }}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                      authors && authors.length>0 ?
                      authors.map((author)=>(
                              <tr key={author.id}>
                                <td>{author.name}</td>
                                <td>{author.birthday}</td>
                                <td>{author.biography}</td>
                               
                                <td style={{ whiteSpace: 'nowrap' }}>
                               
                               <button className="btn btn-sm btn-primary mr-1" onClick={()=>handleEdit(author)}>
                                 Edit</button>
                                  
                                <button onClick={()=>handleDelete(author.id)} className="btn btn-sm btn-danger btn-delete-user" >Delete                                 
                                       
                                </button>
                            </td>
                              </tr>

                      )):'NO data avaiable'
                      }
                    </tbody>
</table>


    </div>
  )
}

export default Authors