import React, { useEffect } from 'react';
import './verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Verify = () => {

  const navigate = useNavigate();
  // this is used to get the parameters from the url
  const [ searchParams, setSearchParams ] = useSearchParams();
  // tis will get us the value of success whether it's true or false
  const success = searchParams.get("success");

  useEffect(() => {
    if(success){
      navigate("/myorders");
    } else {
      navigate("/");
    }
  }, [])


  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  )
}

export default Verify;