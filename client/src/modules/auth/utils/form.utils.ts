import { type FormikProps } from 'formik'

export async function handleNextStep<T>(
  formik: FormikProps<T>,
  fieldsToValidate: string[],
  onSuccess: () => void
): Promise<void> {
  const errors = await formik.validateForm()
  
  const hasErrors = fieldsToValidate.some((field) => !!errors[field as keyof typeof errors])
  
  fieldsToValidate.forEach((field) => {
    formik.setFieldTouched(field, true, false)
  })

  if (!hasErrors) {
    onSuccess()
  }
}
