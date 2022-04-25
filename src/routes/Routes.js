import React from 'react';
import { Switch } from 'react-router-dom';
import DashboardPage from 'pages/dashboard-page/';
import Dashboard2 from 'components/Dashboard';
import UsersPage from 'pages/users';
import MapPage from 'pages/map-page';
import WelcomePage2 from 'pages/login/welcome-page/';
import LoginPage from 'pages/login/login-page/LoginPage';
import ResetPasswordPage from 'pages/login/login-page/ResetPasswordPage';
import OnboardingPage from 'pages/onboarding';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PrivateTermsRoute from './PrivateTermsRoute';
import SuperAdminAccounts from 'pages/superadmin-accounts-page';
import SuperAdminDashboard from 'pages/superadmin-dashboard-page';
import SuperAdminDeployments from 'pages/superadmin-deployments-page';
import SuperAdminAudit from 'pages/superadmin-audit-page';
import MainTemplate from 'templates/main-template/MainTemplate';
import TermsPage from 'pages/terms-page/TermsPage';
import WalletPage from 'pages/wallet-page';
import InvoicePage from 'pages/invoice-page';
import FAQPage from 'pages/faq-page';
import HelpPage from 'pages/help-page';
import IntroPage from 'pages/intro-page';

const Routes = () => {
    //use account context to get the logged in account
    //super admin wont have one of these, as they can see all accounts

    return (
        <Switch>
            <MainTemplate ignores={['/terms']}>
                <PrivateRoute exact={true} path="/" component={DashboardPage} />
                <PrivateRoute exact={true} path="/dashboard" component={DashboardPage} />
                <PrivateRoute exact={true} path="/users" component={UsersPage} />
                <PrivateRoute exact={true} path="/onboarding" component={OnboardingPage} />
                <PrivateRoute exact={true} path="/map" component={MapPage} />
                <PrivateRoute exact={true} path="/wallet" component={WalletPage} />
                <PrivateRoute exact={true} path="/invoices" component={InvoicePage} />
                <PrivateRoute exact={true} path="/faq" component={FAQPage} />
                <PrivateRoute exact={true} path="/help" component={HelpPage} />

                <PrivateRoute exact={true} path="/admin/dashboard" component={SuperAdminDashboard} />
                <PrivateRoute exact={true} path="/admin/dashboard2" component={WelcomePage2} />
                <PrivateRoute exact={true} path="/admin/accounts" component={SuperAdminAccounts} />
                <PrivateRoute exact={true} path="/admin/audit" component={SuperAdminAudit} />
                <PrivateRoute exact={true} path="/admin/deployments" component={SuperAdminDeployments} />

                <PrivateTermsRoute exact={true} path="/terms" component={TermsPage} />

                <PublicRoute exact={true} path="/intro" component={IntroPage} />
                <PublicRoute exact={true} path="/welcome" component={IntroPage} />
                <PublicRoute exact={true} path="/invite" component={LoginPage} />
                <PublicRoute exact={true} path="/login" component={LoginPage} />
                <PublicRoute exact={true} path="/reset" component={ResetPasswordPage} />
            </MainTemplate>
        </Switch>
    );
};

export default Routes;
