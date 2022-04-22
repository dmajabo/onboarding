import React, {Fragment, useState} from 'react';
import { Button } from '@mui/material';
import Modal from './Modal'

const UserCreate = ({refetch, selectedAccount}) => {
    const [showModal, setShowModal]       = useState(false);

    return (
        <Fragment>

            {!showModal && <Button id="createUser" style={{marginBottom : '24px'}} onClick={() => setShowModal(true)} variant={'outlined'} >Add User</Button>}

            <Modal refetch={refetch} visible={showModal} hide={()=> setShowModal(false)} selectedAccount={selectedAccount}/>

        </Fragment>
    );
};

export default UserCreate;
