import { type FormikProps } from 'formik';

export const handleNextStep = async <T,>(
  formik: FormikProps<T>,
  fieldsToValidate: string[],
  onSuccess: () => void
) => {
  const errors = await formik.validateForm();
  const hasError = fieldsToValidate.some((field) => errors[field as keyof typeof errors]);

  formik.setTouched(
    fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {})
  );

  if (!hasError) {
    onSuccess();
  }
};
