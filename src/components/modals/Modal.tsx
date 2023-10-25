import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import * as yup from "yup";
import { Formik, Form } from "formik";

type Props = {
  open: boolean;
  handleOpen: () => void;
  setOpen: (v: boolean) => void;
  name: string;
  email: string;
  birthdayDate: string;
  phoneNumber: string;
  address: string;
  handleUpdateUser: (
    name: string,
    email: string,
    birthdayDate: string,
    phoneNumber: string,
    address: string
  ) => void;
};

export const Modal: React.FC<Props> = ({
  open,
  handleOpen,
  setOpen,
  name,
  email,
  birthdayDate,
  phoneNumber,
  address,
  handleUpdateUser,
}) => {
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Required"),
    name: yup.string().required("Required").max(255, "max 255 symbols"),
    birthdayDate: yup
      .string()
      .matches(/\d{2}-\d{2}-\d{2}/g, "The format should be: dd-mm-yy")
      .required("Required"),
    phoneNumber: yup.string().required("Required").max(20, "max 20 symbols"),
  });
	
  return (
    <Dialog open={open} size='xs' handler={handleOpen}>
      <div className='flex items-center justify-between'>
        <DialogHeader className='flex flex-col items-start'>
          <Typography className='mb-1' variant='h4'>
            Edit user
          </Typography>
        </DialogHeader>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='mr-3 h-5 w-5 cursor-pointer'
          onClick={() => {
            setOpen(false);
          }}
        >
          <path
            fillRule='evenodd'
            d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
            clipRule='evenodd'
          />
        </svg>
      </div>

      <Formik
        initialValues={{
          name,
          email,
          birthdayDate,
          phoneNumber,
          address,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              handleUpdateUser(
                values.name,
                values.email,
                values.birthdayDate,
                values.phoneNumber,
                values.address
              );
            }}
          >
            <DialogBody>
              <div className='grid gap-6'>
                <Input
                  label='Username'
                  name='name'
                  crossOrigin={undefined}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (errors.name as boolean | undefined) &&
                    (touched.name as boolean | undefined)
                  }
                />
                {errors.name && touched.name ? (
                  <Typography
                    variant='small'
                    color='red'
                    className='font-normal '
                    style={{ marginTop: "-20px" }}
                  >
                    {`${errors.name}`}
                  </Typography>
                ) : null}

                <Input
                  label='Email'
                  name='email'
                  crossOrigin={undefined}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (errors.email as boolean | undefined) &&
                    (touched.email as boolean | undefined)
                  }
                />
                {errors.email && touched.email ? (
                  <Typography
                    variant='small'
                    color='red'
                    className='font-normal '
                    style={{ marginTop: "-20px" }}
                  >
                    {`${errors.email}`}
                  </Typography>
                ) : null}

                <Input
                  name='birthdayDate'
                  type='data'
                  value={values.birthdayDate}
                  label='Birthdate'
                  crossOrigin={undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (errors.birthdayDate as boolean | undefined) &&
                    (touched.birthdayDate as boolean | undefined)
                  }
                />
                {errors.birthdayDate && touched.birthdayDate ? (
                  <Typography
                    variant='small'
                    color='red'
                    className='font-normal '
                    style={{ marginTop: "-20px" }}
                  >
                    {`${errors.birthdayDate}`}
                  </Typography>
                ) : null}

                <Input
                  value={values.phoneNumber}
                  name='phoneNumber'
                  label='Phone number'
                  crossOrigin={undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (errors.phoneNumber as boolean | undefined) &&
                    (touched.phoneNumber as boolean | undefined)
                  }
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <Typography
                    variant='small'
                    color='red'
                    className='font-normal'
                    style={{ marginTop: "-20px" }}
                  >
                    {`${errors.phoneNumber}`}
                  </Typography>
                ) : null}

                <Input
                  value={values.address}
                  name='address'
                  label='Address'
                  crossOrigin={undefined}
                  onChange={handleChange}
                />

                <DialogFooter className='space-x-2'>
                  <Button
                    variant='text'
                    color='gray'
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    cancel
                  </Button>
                  <Button
                    type='submit'
                    variant='gradient'
                    color='gray'
                    disabled={Object.keys(errors).length !== 0}
                  >
                    save
                  </Button>
                </DialogFooter>
              </div>
            </DialogBody>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
