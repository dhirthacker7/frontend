import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../../_actions';
import styled from 'styled-components';

const StyledInput = styled.input`
    width: auto;
    height: auto;
    padding: 1% 2%;
    margin: 0px 5px 16px 5px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const StyledButton = styled.button`
    background-color: #008CBA; /* Blue */
    border: 2px solid black;
    color: white;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
		margin: 0 4% 1% 2%;
		cursor: pointer;
`;

const StyledOuterDiv = styled.div`
    border: 2px solid #664567;
    background: #ededed;
`

// const StyledLink = styled.Link`
//     text-decoration: none;
//     color: white;
// `

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		// reset login status
		this.props.logout();

		this.state = {
			email: '',
			password: '',
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { email, password } = this.state;
		if (email && password) {
			this.props.login(email, password);
		}
	}

	render() {
		const { loggingIn } = this.props;
		const { email, password, submitted } = this.state;
		return (
			<StyledOuterDiv style={{padding: '16px' }}>
				<h1>Login</h1>
				<form name="form" onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="email"> <strong>Email:</strong> </label>
						<StyledInput type="text" name="email" value={email} onChange={this.handleChange} />
						{submitted && !email && <div>Email is required</div>}
					</div>
					<div>
						<label htmlFor="password"> <strong>Password:</strong> </label>
						<StyledInput type="password" name="password" value={password} onChange={this.handleChange} />
						{submitted && !password && <div>Password is required</div>}
					</div>
					<div>
						<StyledButton>Login</StyledButton>
						{loggingIn && (
							<img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
						)}
						<StyledButton> <Link style={{ textDecoration: 'none', color: 'white' }} to="/register">Register</Link> </StyledButton>
					</div>
				</form>
			</StyledOuterDiv>
		);
	}
}

function mapState(state) {
	const { loggingIn } = state.authentication;
	return { loggingIn };
}

const actionCreators = {
	login: userActions.login,
	logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
