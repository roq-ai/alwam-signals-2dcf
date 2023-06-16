import * as yup from 'yup';

export const customerServiceValidationSchema = yup.object().shape({
  cloud_service_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
