import axios from 'axios';
import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function UsersPage() {
  const [users, setUsers] = React.useState([]);
  const [roles, setRoles] = React.useState([]);

  const navigate = useNavigate()

  const callApi = () => {
    axios.get("http://localhost:9999/users")
    .then(res => {
        console.log(res?.data)
        setUsers(res?.data)

    })
    .catch(err => {
        console.log(err)
    })
  }

  React.useEffect(() => {
    callApi();

    axios.get("http://localhost:9999/roles")
    .then(res => {
        console.log(res?.data)
        setRoles(res?.data)
    })
    .catch(err => {
        console.log(err)
    })
  }, [])

  const handleDelete = (id) => {
    axios.delete("http://localhost:9999/users/"+id)
    .then(res => {
        alert('Delete user successfully')
        callApi();
    }).catch(err => {
        console.log(err)
    })    
  }

  return (
    <div>
        <h1>Users Page</h1>
        <div>
            <Table striped bordered responsive hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Fullname</th>
                        <th>Role</th>
                        <th>View</th>
                        <th>Delele</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{user?.username}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.fullname}</td>
                                    <td>{
                                    roles?.map(role => {
                                        if(role?.id == user?.role){
                                            return role?.name
                                        }
                                    })

                                    
                                    }</td>
                                    <td>
                                        <Button variant="info" onClick={() => {
                                            navigate("/users/"+user?.id)
                                        }}>
                                            Info
                                        </Button>
                                    </td>
                                    <td>
                                    <Button variant="danger" onClick={() => handleDelete(user?.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
        </div>
    </div>
  )
}
