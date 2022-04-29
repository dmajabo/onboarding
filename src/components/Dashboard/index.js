import React from 'react';
import Stack from '@mui/material/Stack';
import SnapshotList from './SnapshotList';
import Map from './Map';
import './styles.scss';

const dataSource = [
    {
        key: '1',
        name: 'Innovation Dock',
        connections: 2,
        role: 'Hybrid',
        admin: 'Clear'
    },
    {
        key: '2',
        name: 'Innovation Dock',
        connections: 2,
        role: 'Hybrid',
        admin: 'Clear'
    },
    {
        key: '3',
        name: 'Innovation Dock',
        connections: 2,
        role: 'Hybrid',
        admin: 'Clear'
    },
    {
        key: '4',
        name: 'Innovation Dock',
        connections: 2,
        role: 'Hybrid',
        admin: 'Clear'
    }
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Connections',
        dataIndex: 'connections',
        key: 'connections'
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
    },
    {
        title: 'Admin',
        dataIndex: 'admin',
        key: 'admin'
    }
];

function Dashboard() {
    return (
        <Stack direction={'column'} divider={<hr className="divider" />}>
            <Map />
            <SnapshotList dataSource={dataSource} columns={columns} />
        </Stack>
    );
}

export default Dashboard;
