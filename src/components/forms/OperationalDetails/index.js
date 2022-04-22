import React from "react";
import Occupants from "./Occupants";
import TypicalWorkingHours from "./TypicalWorkingHours";
import UploadComponentWrapper from "../formik-fields/UploadComponent";

const OccupantsD = ({  account, refetch }) => {

    return (
            <div>
                <Occupants account={account} refetch={refetch}/>

                <TypicalWorkingHours day='monday'       account={account} refetch={refetch}/>
                <TypicalWorkingHours day='tuesday'      account={account} refetch={refetch}/>
                <TypicalWorkingHours day='wednesday'    account={account} refetch={refetch}/>
                <TypicalWorkingHours day='thursday'     account={account} refetch={refetch}/>
                <TypicalWorkingHours day='friday'       account={account} refetch={refetch}/>
                <TypicalWorkingHours day='saturday'     account={account} refetch={refetch}/>
                <TypicalWorkingHours day='sunday'       account={account} refetch={refetch}/>

                <br/>

                <UploadComponentWrapper account={account} field={'Holidays'} title={'Fixed Holidays'} refetch={refetch}/>
            </div>


    );
};

export default OccupantsD;
