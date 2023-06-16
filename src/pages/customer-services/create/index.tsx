import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCustomerService } from 'apiSdk/customer-services';
import { Error } from 'components/error';
import { customerServiceValidationSchema } from 'validationSchema/customer-services';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CloudServiceInterface } from 'interfaces/cloud-service';
import { UserInterface } from 'interfaces/user';
import { getCloudServices } from 'apiSdk/cloud-services';
import { getUsers } from 'apiSdk/users';
import { CustomerServiceInterface } from 'interfaces/customer-service';

function CustomerServiceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CustomerServiceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCustomerService(values);
      resetForm();
      router.push('/customer-services');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CustomerServiceInterface>({
    initialValues: {
      cloud_service_id: (router.query.cloud_service_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: customerServiceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Customer Service
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<CloudServiceInterface>
            formik={formik}
            name={'cloud_service_id'}
            label={'Select Cloud Service'}
            placeholder={'Select Cloud Service'}
            fetcher={getCloudServices}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'customer_service',
  operation: AccessOperationEnum.CREATE,
})(CustomerServiceCreatePage);
