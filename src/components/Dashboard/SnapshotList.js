import { Table } from 'antd';
import React from 'react';
// import DashboardImg from '../../assets/dashboard.png';
// import './style.css';

const SnapshotsLists = ({ dataSource, columns }) => {
    return (
        <div className="table-container">
            <div className="custom-table">
                <h3 className="table-heading">Your tenants snapshot</h3>
                <Table dataSource={dataSource} columns={columns} pagination={false} />;
            </div>
        </div>
    );
};

export default SnapshotsLists;
