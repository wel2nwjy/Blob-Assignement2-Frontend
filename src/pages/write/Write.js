import React,{useContext,useState,useEffect} from 'react';
import axios from 'axios';
import Multiselect from "multiselect-react-dropdown";
import { Context } from '../../context/Context';
import './Write.css';

const style = {
  chips: {
    background: "none",
    color:"grey",
  },
  searchBox: {
    "borderRadius": "0px"
  },
  multiselectContainer: {
    color: "grey",
    "fontfamily": "Josefin Sans, sans-serif",
  },
  closeIcon:{
    color:"grey",
  }
};

const Write = () => {

  const { user } = useContext(Context);

  //State declaration for all the input variables
  var [inputValues,setinputValues]=useState({title:'',desc:''});

  //State declaration for categories
  const [cats, setCats] = useState([]);

  //State declaration for selected categories
  const [selectedCats, setselectedCats] = useState([]);

  //State declaration for storing the file
  const [file, setFile] = useState(null);

  //Fetch the categories from db
  useEffect(()=>{
    const fetchCategories= async () => {
      const response = await axios.get("/categories");
      let result = response.data.map( ({name}) =>({"label":name,"value":name}));
      setCats(result);
    };
    fetchCategories();
  },[])

  //For storing the values entered
  const valueEntered=(event)=>{
    const { name, value } = event.target; //destructuring
    setinputValues({ ...inputValues, [name]: value });
  };

 // Multiselect Selecetion handlers
  const  handleSelectedCat  =  (event)  => {
     setselectedCats(event);
  }

  const  handleRemoveCat  =  (event)  => {
    setselectedCats(event);
 }

  //When submit button is pressed
  const handleSubmit = async (event) => {
    event.preventDefault();
    let result = selectedCats.map( ({value}) =>value);
    const newPost = {
      username: user.username,
      title: inputValues.title,
      desc: inputValues.desc,
      categories:result   
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const response = await axios.post("/posts", newPost);
      window.location.replace("/post/" + response.data._id);
    } catch (err) {}
  };


  return (    
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            name="title"
            className="writeInput"
            style={{ width: "40vw" }}
            placeholder="Title"
            autoFocus={true}
            required=""
            value={inputValues.title}
            onChange={valueEntered}
          />
          <Multiselect
            className='writeMultiSelect'
            options={cats}
            placeholder="Category"
            onSelect={handleSelectedCat}
            onRemove={handleRemoveCat}
            displayValue="label"
            style={style}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            type="text"
            name="desc"
            className="writeInput writeText"
            style={{ width: "70vw" }}
            placeholder="Tell your story..."
            required=""
            value={inputValues.desc}
            onChange={valueEntered}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  )
}

export default Write