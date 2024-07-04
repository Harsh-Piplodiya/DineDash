import React, { useState, useEffect } from 'react';
import './add.css';
import axios from 'axios';
import { assets, url } from '../../assets/assets'
import { toast } from 'react-toastify';

const Add = () => {
  // the uploaded image is getting stored in this state variable
  const [ image, setImage ] = useState(false);
  const [ data, setData ] =useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  // we create this funciton so that whenever any change happens it'll save the data in the useState variables
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}));
  }

  // using the onSubmitHandler function we'll do the API call
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price)); // as it is defined as a number in the backend.
    formData.append("category", data.category);
    formData.append("image", image);

    // doing the API call to the add method in the backend, and using 'post' mehtod coz we used this only to create the addItem API.
    const response = await axios.post(`${url}/api/v1/food/add`, formData);

    if(response.data.success){
      // doing this to refresh the form after upload of data is complete.
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      });
      setImage(false);

      console.log(response.data.message);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  // used useEffect to check if the data is being stored correctly or not
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area } alt="upload area image" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='&#x20B9;199' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add;