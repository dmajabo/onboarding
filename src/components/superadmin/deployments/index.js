import React, {Fragment} from 'react';
import AddDeployment from "./AddDeployment";
import ListDeployments from "./ListDeployments";

export default () => <div>

    <h1>Deployment Administration</h1>

    <ListDeployments>
        <AddDeployment/>
    </ListDeployments>

</div>
