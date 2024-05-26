import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = ({ token }) => {
  let navigate = useNavigate();

  const [employee, setEmployee] = useState({
    empid: '',
    employeeName: '',
    employeephonenumber: '',
    employeemailid: ''
  });

  const { empid, employeeName, employeephonenumber, employeemailid } = employee;

  const handleInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/employee/post", employee, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate("/view-emp");
    } catch (error) {
      console.error('Error saving employee:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <div className='col-sm-8 py-2 px-5 offset-2 shadow'>
      <h2 className='mt-5'>Add Employee</h2>
      <form onSubmit={saveEmployee}>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='empid'>EmployeeId</label>
          <input className='form-control col-sm-6' type='number' name='empid' id='empid' required value={empid} onChange={handleInputChange} />
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='employeeName'>Employee Name</label>
          <input className='form-control col-sm-6' type='text' name='employeeName' id='employeeName' required value={employeeName} onChange={handleInputChange} />
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='employeephonenumber'>Employee Phonenumber</label>
          <input className='form-control col-sm-6' type='text' name='employeephonenumber' id='employeephonenumber' required value={employeephonenumber} onChange={handleInputChange} />
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='employeemailid'>Employee EmailId</label>
          <input className='form-control col-sm-6' type='text' name='employeemailid' id='employeemailid' required value={employeemailid} onChange={handleInputChange} />
        </div>
        
        <div className='row mb-5'>
          <div className='col-sm-2'>
            <button type='submit' className='btn btn-outline-success btn-lg'>Save</button>
          </div>
          <div className='col-sm-2'>
            <Link to={"/view-emp"} className='btn btn-outline-warning btn-lg'>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
