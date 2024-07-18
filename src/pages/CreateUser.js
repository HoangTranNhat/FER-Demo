import axios from 'axios';
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    fullname: '',
    role: 1
  })
  const [roles, setRoles] = React.useState([]);
  const navigate = useNavigate()

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

    axios.post("http://localhost:9999/users", formData)
    .then(res => {
        console.log(res)
        alert('Create user successfully')
        navigate("/users")
    })
    .catch(err => {
        console.log(err)
    })
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' 
                    value={formData.username}
                    onChange={(event) => {
                        setFormData({
                            ...formData,
                            username: event.target.value
                        })
                    }}
                />
            </div>

            <div>
                <label htmlFor='fullname'>Fullname</label>
                <input type='text' id='fullname' 
                    value={formData.fullname}
                    onChange={(event) => {
                        setFormData({
                            ...formData,
                            fullname: event.target.value
                        })
                    }}
                />
            </div>

            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' 
                    value={formData.email}
                    onChange={(event) => {
                        setFormData({
                            ...formData,
                            email: event.target.value
                        })
                    }}
                />
            </div>
            <div>
                <label htmlFor='role'>Role</label>
                <select 
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
                </select>
            </div>

            <Button type='submit'>Submit</Button>
        </form>
    </div>
  )
}
