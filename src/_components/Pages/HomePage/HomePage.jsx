import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../../_actions';
import styled from 'styled-components';

const StyledUl = styled.ul`
    list-style-type: none;
`

const StyledOuterDiv = styled.div`
    border: 2px solid #664567;
    background: #ededed;
`
const Styleda = styled.a`
    background-color: #008CBA; /* Blue */
    border: 1px solid black;
    color: white;
    padding: 2px 10px;
    margin: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-right: 4%;
`;

const StyledButton = styled.button`
    background-color: #008CBA; /* Blue */
    border: 2px solid black;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-right: 4%;    
    cursor: pointer;
`;

// const StyledLink = styled.Link`
//     text-deoration: none;
// `

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <StyledOuterDiv>
                <h1 align="center"> Welcome {user.firstName} {user.lastName}</h1>
                <h2 align="center">You are logged in </h2>
                <h3 align="center">All registered users</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <StyledUl align="center">
                        {users.items.map((user, index) =>
                            <li align="center" key={user.id}>
                                <strong> {user.firstName + ' ' + user.lastName} </strong>
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span> - ERROR: {user.deleteError}</span>
                                    : <span> - <Styleda onClick={this.handleDeleteUser(user.id)}>Delete</Styleda></span>
                                }
                            </li>
                        )}
                    </StyledUl>
                }
                <p>

                    <StyledButton style={{ marginLeft: '16px' }}> <Link style={{ textDecoration: 'none', color: 'white' }}  to="/login">Add another</Link> </StyledButton>
                    <br/> <br/>
                    <StyledButton style={{ marginLeft: '16px' }}> <Link style={{ textDecoration: 'none', color: 'white' }} to="/login">Logout</Link> </StyledButton>
                </p> 
            </StyledOuterDiv>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };