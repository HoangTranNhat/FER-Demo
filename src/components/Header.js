import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <div>
        <Nav variant="pills" activeKey="1" onSelect={(eventKey) => console.log("selected", eventKey)}>
            <Nav.Item>
                <Nav.Link as={Link} to={"/"}>
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to={"/users"}>
                    User
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to={"/create-user"}>
                    Create User
                </Nav.Link>
            </Nav.Item>
        </Nav>
        </div>
    )
}