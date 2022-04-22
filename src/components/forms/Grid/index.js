import * as Yup from 'yup';
import { Formik } from 'formik';
import Supplier from './GridConnection/Supplier';
import OwnerType from './OwnerType';
import MRP from './MRP';
import DSO from './DSO';
import UploadComponentWrapper from '../formik-fields/UploadComponent';


const SiteDetails = ({
    account,
    activeStep,
    setActiveStep,
    formsToComplete,
    onAllFormsComplete,
    setFormValid,
    form,
    showButtons = true,
    refetch
}) => {
    return (
        <Formik
            initialValues={{}}
            validationSchema={Yup.object().shape({
                operationType: Yup.string().required('Field must be entered')
            })}
            enableReinitialize={true}
            onSubmit={() => null}
            isInitialValid={false}
        >
            {({ values, submitForm, isValid }) => (
                <div>

                    <Supplier account={account} refetch={refetch} />

                    <br />

                    <DSO account={account} refetch={refetch} />

                    <br/>

                    <OwnerType account={account} refetch={refetch} />

                    <br/>

                    <MRP account={account} refetch={refetch} />

                    <br/>

                    <UploadComponentWrapper
                        account={account}
                        field={'CurrentContract'}
                        title={'Current Energy Contract'}
                        refetch={refetch}
                    />

                    <br />

                    {/*<UploadComponent showButtons={showButtons} refetch={refetch} field={'CurrentEnergyContract'} form={form} level="public" title="Current energy contract" size={4048000} fileType='application/pdf' />*/}
                </div>
            )}
        </Formik>
    );
};

export default SiteDetails;
