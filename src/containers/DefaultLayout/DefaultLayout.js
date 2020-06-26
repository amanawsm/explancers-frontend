import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { clientNavigationItems, freelancerNavigationItems, adminNavigationItems } from 'routes/headerNavItems';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import freelancerRoutes from '../../routes/freelancerRoutes';
import clientRoutes from '../../routes/clientRoutes';
import adminRoutes from '../../routes/adminRoutes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    // this.props.history.push('/login')
    this.props.onLogout();
  }

  componentDidMount() {
    this.resize();
    // window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    if (window.innerWidth > 760) {
      document.body.classList.remove('sidebar-lg-show');
      document.body.classList.remove('sidebar-show');
    }
  }

  render() {

    let preparedNavigationItems = { items: [...navigation.items] };

    if (this.props.isAuthenticated && this.props.accountType.type === 'work') {
      freelancerNavigationItems.forEach((navItem, index) => {
        preparedNavigationItems.items.push({ name: navItem.displayNavItemName, url: navItem.to });
      });
    } else if (this.props.isAuthenticated && this.props.accountType.type === 'hire') {
      clientNavigationItems.forEach((navItem, index) => {
        preparedNavigationItems.items.push({ name: navItem.displayNavItemName, url: navItem.to });
      });
    }  else if (this.props.isAuthenticated && this.props.accountType.type === 'admin') {
      adminNavigationItems.forEach((navItem, index) => {
        preparedNavigationItems.items.push({ name: navItem.displayNavItemName, url: navItem.to });
      });
    }

    const routes = this.props.accountType.type === "work" ? freelancerRoutes :
      this.props.accountType.type === "hire" ? clientRoutes : 
      this.props.accountType.type === "admin" ? adminRoutes : [];

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              onLogout={e => this.signOut(e)}
              isAuthenticated={this.props.isAuthenticated}
              accountType={this.props.accountType}
              userHasProfileAvatar={this.props.userHasProfileAvatar}
              userName={this.props.userName}
              toggleUserHasProfileAvatar={this.props.toggleUserHasProfileAvatar} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          {/* Left Sidebar Content */}
          <AppSidebar className="d-xl-none d-lg-none" fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={preparedNavigationItems} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} router={router} /> */}

            <Container fluid style={{ paddingTop: '15px' }}>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component
                            {...props}
                            userHasProfileAvatar={this.props.userHasProfileAvatar}
                            userName={this.props.userName}
                            toggleUserHasProfileAvatar={this.props.toggleUserHasProfileAvatar} />
                        )} />
                    ) : (null);
                  })}
                  {this.props.accountType.type === "hire" ? <Redirect from="/" to="/jobs/post" /> :
                    this.props.accountType.type === "work" ? <Redirect from="/" to="/freelancer/profile" /> :
                    this.props.accountType.type === "admin" ? <Redirect from="/" to="/dashboard" /> : 
                    <Redirect to="/" />
                  }
                </Switch>
              </Suspense>
            </Container>

          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              {/* Right Aside */}
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
  }
}

const mapDispatchToState = dispatch => {
  return {
  }
}


export default connect(mapPropsToState, mapDispatchToState)(DefaultLayout);
