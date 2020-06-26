import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./containers/Auth/Login'));
const AdminLogin = React.lazy(() => import('./containers/Auth/Admin/Login/Login'));
const Register = React.lazy(() => import('./containers/Auth/Register/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const ActivateUserAccount = React.lazy( () => import('containers/Public/ActivateUserAccount/ActivateUserAccount'));
const ForgotPassword = React.lazy( () => import('containers/Public/ForgotPassword/ForgotPassword'));

const appRoutes = (props) => {

    let allowedRoutes = null;   

    // If initial Request to check Auth status is sent
    if (props.loadingAuth === true) {
        allowedRoutes = (<Switch>
            <Route path="/" name="Loading" render={routeProps => <h6>Loading</h6>} />
        </Switch>);
    } else 
    if (props.isAuthenticated) {
        // If User has been Authenticated
        allowedRoutes = (<Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/" name="Home" render={routeProps => <DefaultLayout {...routeProps} {...props} />} />
        </Switch>);
    } else if (!props.isAuthenticated && props.loadingAuth === false) {
        // If user is unauthenticated
        allowedRoutes = (<Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/admin/login" name="Admin Login Page" render={props => <AdminLogin {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route exact path="/account/activate" name="Activate Account" render={routeProps => <ActivateUserAccount {...routeProps} {...props}/>} />
            <Route exact path="/account/reset/password" name="Forgot Password" render={routeProps => <ForgotPassword {...routeProps} {...props}/>} />
            <Redirect to="/login"></Redirect>
        </Switch>);
    }

    return (
        allowedRoutes
    );
}

export default appRoutes;