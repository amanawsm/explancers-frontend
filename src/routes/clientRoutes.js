import React from 'react';

const Breadcrumbs = React.lazy(() => import('../views/Base/Breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('../views/Base/Cards/Cards'));
const Carousels = React.lazy(() => import('../views/Base/Carousels/Carousels'));
const Collapses = React.lazy(() => import('../views/Base/Collapses/Collapses'));
const Dropdowns = React.lazy(() => import('../views/Base/Dropdowns/Dropdowns'));
const Forms = React.lazy(() => import('../views/Base/Forms/Forms'));
const Jumbotrons = React.lazy(() => import('../views/Base/Jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('../views/Base/ListGroups/ListGroups'));
const Navbars = React.lazy(() => import('../views/Base/Navbars/Navbars'));
const Navs = React.lazy(() => import('../views/Base/Navs/Navs'));
const Paginations = React.lazy(() => import('../views/Base/Paginations/Pagnations'));
const Popovers = React.lazy(() => import('../views/Base/Popovers/Popovers'));
const ProgressBar = React.lazy(() => import('../views/Base/ProgressBar/ProgressBar'));
const Switches = React.lazy(() => import('../views/Base/Switches/Switches'));
const Tables = React.lazy(() => import('../views/Base/Tables/Tables'));
const Tabs = React.lazy(() => import('../views/Base/Tabs/Tabs'));
const Tooltips = React.lazy(() => import('../views/Base/Tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('../views/Buttons/BrandButtons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('../views/Buttons/ButtonDropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('../views/Buttons/ButtonGroups/ButtonGroups'));
const Buttons = React.lazy(() => import('../views/Buttons/Buttons/Buttons'));
const Charts = React.lazy(() => import('../views/Charts/Charts'));
const Dashboard = React.lazy(() => import('../views/Dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('../views/Icons/CoreUIIcons/CoreUIIcons'));
const Flags = React.lazy(() => import('../views/Icons/Flags/Flags'));
const FontAwesome = React.lazy(() => import('../views/Icons/FontAwesome/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('../views/Icons/SimpleLineIcons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('../views/Notifications/Alerts/Alerts'));
const Badges = React.lazy(() => import('../views/Notifications/Badges/Badges'));
const Modals = React.lazy(() => import('../views/Notifications/Modals/Modals'));
const Colors = React.lazy(() => import('../views/Theme/Colors/Colors'));
const Typography = React.lazy(() => import('../views/Theme/Typography/Typography'));
const Widgets = React.lazy(() => import('../views/Widgets/Widgets'));
const Users = React.lazy(() => import('../views/Users/Users'));
const User = React.lazy(() => import('../views/Users/User'));

const EditClientProfile = React.lazy(() => import('containers/Client/EditClientProfile/EditClientProfile'));
const ViewClientProfile = React.lazy(() => import('containers/Client/ViewClientProfile/ViewClientProfile'));
const PostJob = React.lazy(() => import('containers/Job/CreateJob/CreateJob'));
const ClientJobsCreatedReport = React.lazy(() => import('containers/Job/ClientJobsCreatedReport/ClientJobsCreatedReport'));
const ProposalsReceivedOnJob = React.lazy(() => import('containers/Client/ProposalsReceivedOnJob/ProposalsReceivedOnJob'));
const ViewFullProposalReceived = React.lazy(() => import('containers/Client/ViewFullProposalReceived/ViewFullProposalReceived'));
const EditPersonalDetails = React.lazy( () => import('components/PersonalDetails/EditPersonalDetails/EditPersonalDetails'));
const AcceptFreelancerProposalMessage = React.lazy(() => import('containers/Client/ViewFullProposalReceived/AcceptFreelancerProposalMessage/AcceptFreelancerProposalMessage'));
const CommunicationContainer = React.lazy( () => import('containers/Chat/CommunicationContainer/CommunicationContainer') );
const MarketFreelancers = React.lazy(() => import('containers/Public/MarketFreelancers/MarketFreelancers'));
const FreelancerPublicProfile = React.lazy(() => import('components/Public/FreelancerPublicProfile/FreelancerPublicProfile'));
// Change this temp only
const ClientViewFullJobPost = React.lazy( () => import('containers/Client/ClientViewFullJobPost/ClientViewFullJobPost'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/account', exact: true,  name: 'Account Setting', component: EditPersonalDetails },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/messages', name: 'Messages', component: CommunicationContainer },
  { path: '/client/profile', exact: true, name: 'Client Profile', component: ViewClientProfile },
  { path: '/client/profile/edit', exact: true, name: 'Edit', component: EditClientProfile },
  { path: '/jobs/post', exact: true, name: 'Post Job', component: PostJob },
  { path: '/jobs/reports', exact: true, name: 'Jobs Report', component: ClientJobsCreatedReport },
  { path: '/jobs/reports/:id', exact: true, name: 'Full Job Post', component: ClientViewFullJobPost },
  { path: '/jobs/reports/:jobId/proposals', exact: true, name: 'Proposals Received', component: ProposalsReceivedOnJob },
  { path: '/jobs/reports/:jobId/proposals/:proposalId', exact: true, name: 'Proposal', component: ViewFullProposalReceived },
  { path: '/jobs/reports/:jobId/proposals/:proposalId/message', exact: true, name: 'Accept Proposal', component: AcceptFreelancerProposalMessage },
  { path: '/freelancer', exact: true, name: 'Market Freelancers', component: MarketFreelancers },
  { path: '/freelancer/:username', exact: true, name: 'Freelancers Profile', component: FreelancerPublicProfile }
];

export default routes;