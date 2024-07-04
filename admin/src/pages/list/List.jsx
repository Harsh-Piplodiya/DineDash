import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './list.css';
import { url } from '../../assets/assets';
import { toast } from 'react-toastify';

const List = () => {
  const [ list, setList ] = useState([]);
  
  // making the funciton to call the listItems API
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/v1/food/list`);
    console.log(response.data);

    if(response.data.success){
      setList(response.data.data); // the response data will be saved in the setList
    } else {
      console.log(response.data.message);
      toast.error("Error");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  const removeFoodItem = async (foodId) => {
    // console.log(foodId);

    // passed foodId cos the rmeoveFoodItem API needs the foodID to remove the data from the DB
    const response = await axios.post(`${url}/api/v1/food/remove`, {id: foodId}); 
    
    // called the fetchList function again coz after the data is removed we need to load the new list/data
    await fetchList(); 
    
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  }

  // as we need to run the fetchList function,
  // whenever the page is loaded that is why we use useEffect.
  useEffect(() => {
    fetchList();
  }, [])
  
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        { list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={item.image[0]} alt="" />
              <p>{ item.name }</p>
              <p>{ item.category }</p>
              <p>&#x20B9;{ item.price }</p>
              <p onClick={() => removeFoodItem(item._id)} className='cursor'>X</p>
            </div>
          )
        }) }
      </div>
    </div>
  )
}

export default List;