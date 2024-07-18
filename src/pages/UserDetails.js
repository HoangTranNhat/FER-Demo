import axios from 'axios';
import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'

export default function UserDetails() {
    const {id} = useParams();

    const [user, setUser] = React.useState({
        username: '',
        email: '',
        fullname: '',
        role: 1
    });
    const [roles, setRoles] = React.useState([]);
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        fullname: '',
        role: 1
    })

    const navigate = useNavigate()

    React.useEffect(() => {
        axios.get(`http://localhost:9999/users/${id}`)
        .then(res => {
            console.log(res?.data)
            setUser(res?.data)
            setFormData(res?.data)
        })
    }, [])

    React.useEffect(() => {
        axios.get("http://localhost:9999/roles")
        .then(res => {
            console.log(res?.data)
            setRoles(res?.data)
        })
        .catch(err => {
            console.log(err)
        })
      }, [])
    
      const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    
        axios.put("http://localhost:9999/users/"+user?.id, formData)
        .then(res => {
            console.log(res)
            alert('Update user successfully')
            navigate("/users")
        })
        .catch(err => {
            console.log(err)
        })
      }


  return (
    <div className='container'>
        <div>
            <h1>User Details</h1>
            <p>Id: {user?.id}</p>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
            <p>Fullname: {user?.fullname}</p>
            <p>Role: {user?.role}</p>
        </div>

        <h1>Form Update</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter email" 
                    value={formData.username}
                    onChange={(event) => {
                        setFormData({
                            ...formData,
                            username: event.target.value
                        })
                    }}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                    value={formData.email}
                    onChange={(event) => {
                        setFormData({
                            ...formData,
                            email: event.target.value
                        })
                    }}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Fullname</Form.Label>
                <Form.Control type="type" placeholder="Enter email" 
                    value={formData.fullname}
                    onChange={(event) => {
                        setFormData({
                            ...formData,
                            fullname: event.target.value
                        })
                    }}
                />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
            <Form.Select
                value={formData.role}
                onChange={(event) => {
                    setFormData({
                        ...formData,
                        role: event.target.value
                    })
                }}
            >
                {
                    roles?.map(role => (
                        <option value={role?.id}>{role?.name}</option>
                    ))
                
                }
            </Form.Select>

            </Form.Group>


            <Button type='submit'>Submit</Button>
        </Form>

        
    </div>
  )
}
