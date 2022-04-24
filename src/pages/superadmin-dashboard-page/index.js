import React from 'react';
import Overview from './../../components/superadmin/deployments/Overview';
import ListDeployments from './../../components/superadmin/deployments/ListDeployments';

const SuperAdminDashboard = () => (
    <div>
        <Overview />
        <ListDeployments />
    </div>
);

export default SuperAdminDashboard;
