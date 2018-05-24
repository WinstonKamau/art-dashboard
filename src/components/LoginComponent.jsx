import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Container, Header, Image } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

import { loginAction } from '../_actions/login.action';
import { signInWithEmail, firebase } from '../firebase';

import '../_css/LoginComponent.css';

const provider = new firebase.auth.GoogleAuthProvider();

class LoginComponent extends React.Component {

  redirectToDashboard(props) {
    if (props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    this.redirectToDashboard(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectToDashboard(nextProps);
  }

  // toasts message
  toastMessage = (description, type = 'warning', time = 5000) => {
    toast({ type, description, time });
  }

  // checks that the user used an Andela email
  validateUser = (result) => {
    const VALID_ANDELA_EMAIL = /^[\w.-]+@andela\.com$/;

    if (VALID_ANDELA_EMAIL.test(result.user.email)) {
      this.props.loginAction();
      localStorage.set('token', result.credential.accessToken);
    } else {
      this.toastMessage('Please sign in with your andela email');
    }
  }

  // authenticates user
  handleLogin = () => {
    signInWithEmail(provider).then(result => {
      this.validateUser(result);
    }).catch(error => {
      if (error) {
        this.toastMessage(error.message);
      }
    });
  }

  render() {
    return (
      <div>
        <SemanticToastContainer position="top-right" />
        <div className='app landing-overlay background'>
          <Container>
            <Image
              centered
              src='http://res.cloudinary.com/damc3mj5u/image/upload/v1526571584/logo_uw39tc.png'
              alt='Andela logo'
              id="andela-logo"
            />
            <Header className='landing-heading' inverted content='ART' />
            <Header as='h1' className='description' inverted content='Andela Resource Tracker' />
            <Button onClick={this.handleLogin} className='google-button' size='large'>
              <Image
                floated='left'
                src='http://res.cloudinary.com/damc3mj5u/image/upload/v1526571608/google-logo_jjjjqs.svg'
                alt='Google logo'
                id='google-logo'
              />
              Sign in with Google
          </Button>
          </Container>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ loginReducer }) => {
  const { isAuthenticated } = loginReducer;
  return {
    isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps, {
  loginAction,
})(LoginComponent));
