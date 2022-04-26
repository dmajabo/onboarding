import React from 'react';
import Map from './../../components/Dashboard/Map';
// import Map from './../../components/superadmin/deployments/Overview/map/Map';
import Dashboard from 'components/Dashboard';

const SuperAdminDashboard = () => (
    <div className="dashboard-container">
        <Map />
        <hr className="divider" />
        <Dashboard />
    </div>
);

export default SuperAdminDashboard;
