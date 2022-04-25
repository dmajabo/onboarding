import React from 'react';
import Map from './../../components/Dashboard/Map';
// import Snapshots from './../../components/superadmin/dashboard/snapshots';
import Dashboard from 'components/Dashboard';

const SuperAdminDashboard = () => (
    <div className="dashboard-container">
        <Map />
        {/* <Snapshots /> */}
        <Dashboard />
    </div>
);

export default SuperAdminDashboard;
