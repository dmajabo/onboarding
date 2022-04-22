import React, {Fragment} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Typography } from '@mui/material';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import DeleteDeployment from "../DeleteDeployment";

const UPDATE_DEPLOYMENT_NAME = gql`
    mutation ($deployment_id: uuid, $name: String) {
        update_deployment_table(where: { id: { _eq: $deployment_id } }, _set: { name: $name }) {
            returning {
                id
            }
        }
    }
`;

export default function DeploymentName({ deployment, refetch }) {

    return (
        <div>
            <Mutation mutation={UPDATE_DEPLOYMENT_NAME} onError={() => {}} onCompleted={() => refetch()}>
                {(MyMutation, { loading, error }) => {

                    return (<Fragment>
                        <DeleteDeployment deployment={deployment} refetch={refetch}/>
                            <Typography
                                variant="p"
                                className={'testDeploymentName'}
                                gutterBottom={true}
                                suppressContentEditableWarning={true}
                                contentEditable={true}
                                onBlur={(e) => {
                                    MyMutation({ variables: { deployment_id: deployment.id, name: e.target.innerText } });
                                }}
                            >
                                {deployment.name}
                            </Typography>

                            <span style={{marginLeft : '5px'}} >
                                {deployment.id}
                            </span>
                        </Fragment>
                    );
                }}
            </Mutation>

        </div>
    );
}
