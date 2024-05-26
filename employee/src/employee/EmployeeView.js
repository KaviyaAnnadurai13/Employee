import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Search from '../common/Search';
const EmployeeView = () => {
  const [employees, setEmployees] = useState([]);
  const[search,setSearch]=useState("");
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/employee");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/employee/delete/${id}`);
      loadEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <section>
      <Search search={search} setSearch={setSearch}/>
      <table className='table table-bordered table-hover shadow'>
        <thead>
          <tr className='text-center'>
            <th>Id</th>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Employee PhoneNumber</th>
            <th>Employee EmailId</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {employees.filter((em)=>
          em.employeeName.toLowerCase().includes(search)
          ).map((emp, index) => (
          <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.empid}</td>
              <td>{emp.employeeName}</td>
              <td>{emp.employeephonenumber}</td>
              <td>{emp.employeemailid}</td>
              <td className='mx-2'><Link to={`/emp-profile/${emp.id}`} className='btn btn-info'><FaEye/></Link></td>
              <td className='mx-2'><Link to={`/edit-emp/${emp.id}`} className='btn btn-warning'><FaEdit/></Link></td>
              <td className='mx-2'><button onClick={() => handleDelete(emp.id)} className='btn btn-danger'><FaTrashAlt/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default EmployeeView;
