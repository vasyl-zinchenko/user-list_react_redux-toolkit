import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import * as authActions from "../features/auth";
import { initAuth } from "../services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Router } from "../types/enums";

export const LoginForm = () => {
  const { username, password, loading, error } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const [name, setName] = useState(username);
  const [pass, setPass] = useState(password);

  const storedValue = localStorage.getItem("isValidData");

  const handleLogin = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const loginData = {
        username: name,
        password: pass,
      };
      dispatch(initAuth(loginData)).then(() => {
        navigate(state?.pathname || Router.TABLE, { replace: true });
      });
    },
    [name, pass, dispatch, state, navigate]
  );

  useEffect(() => {
    dispatch(
      authActions.setIsValidData(storedValue ? JSON.parse(storedValue) : false)
    );
  }, [dispatch, storedValue]);

  return (
    <Card className='m-auto p-5'>
      <Typography variant='h4' color='blue-gray'>
        Sign In
      </Typography>

      <form
        className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
        onSubmit={handleLogin}
      >
        <div className='mb-1 flex flex-col gap-6'>
          <Typography variant='h6' color='blue-gray' className='-mb-3'>
            Your Name
          </Typography>
          <Input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            size='lg'
            placeholder='username'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
          />

          <Typography variant='h6' color='blue-gray' className='-mb-3'>
            Password
          </Typography>
          <Input
            value={pass}
            onChange={(event) => {
              setPass(event.target.value);
            }}
            type='password'
            size='lg'
            placeholder='********'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
          />
        </div>

        <Button className='mt-6' fullWidth type='submit'>
          {loading ? (
            <svg
              className='animate-spin mx-auto  w-6 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          ) : (
            "Sign in"
          )}
        </Button>

        {error && (
          <div
            className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3'
            role='alert'
          >
            <span className='block sm:inline'>{error}</span>
            <span
              className='absolute top-0 bottom-0 right-0 px-4 py-3'
              onClick={() => {
                dispatch(authActions.clearError());
              }}
            >
              <svg
                className='fill-current h-6 w-6 text-red-500'
                role='button'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <title>Close</title>
                <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
              </svg>
            </span>
          </div>
        )}
      </form>
    </Card>
  );
};
