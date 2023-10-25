import { Navbar, Typography, Button } from "@material-tailwind/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Router } from "../../types/enums";

export function Header() {
  const navigate = useNavigate();
  const storedValue = localStorage.getItem("isValidData");

  const signOut = useCallback(() => {
    localStorage.removeItem("isValidData");
    navigate(Router.SIGNIN);
  }, [navigate]);

  return (
    <Navbar
      variant='gradient'
      color='blue-gray'
      className='max-w-full from-blue-gray-900 to-blue-gray-600 px-4 py-3 rounded-none mb-10'
    >
      <div className='mx-auto max-w-screen-xl'>
        <div className='flex flex-wrap justify-between items-center'>
          <Typography
            as='a'
            href='#'
            variant='h5'
            className='mr-4 ml-2 cursor-pointer py-1.5'
          >
            <svg width='170' height='57' viewBox='0 0 390 90'>
              <defs id='SvgjsDefs1589'></defs>
              <g id='SvgjsG1590' transform='matrix(1,0,0,1,0,0)' fill='#111111'>
                <rect
                  xmlns='http://www.w3.org/2000/svg'
                  width='390'
                  height='90'
                  rx='10'
                  ry='10'
                ></rect>
              </g>
              <g
                id='SvgjsG1591'
                transform='matrix(3.25520843496576,0,0,3.25520843496576,17.52604162047011,3.789061931782342)'
                fill='#f8f3d4'
              >
                <path d='M0.76 17.44 l0.1 -11.92 l0.78 -0.34 l2.4 0.14 l0.54 0.2 l-0.2 4.7 l-0.24 7.34 l0.8 1.08 l1.52 -0.32 l-0.12 -8.5 l0.12 -4.62 l1.9 0 l0.06 12.98 l-0.54 1.32 l-2.5 0.72 l-3.6 -0.5 z M21.33 5.52 l0.52 0.86 l0 2.44 l-0.06 1.24 l-2.68 -0.14 l0 -0.78 l0 -1.06 l-1.32 0.02 l-0.22 0.56 l0.22 2.72 l2.06 0.12 l2 0.24 l0.06 2.54 l0 1.8 l-0.26 3.14 l-1.8 0.88 l-2.64 -0.12 l-1.2 -0.48 l-0.6 -0.46 l-0.28 -1.46 l0.1 -2.48 l0.1 -0.8 l0.68 0.04 l1.56 0.18 l0 0.6 l0 0.66 l0 0.34 l0 0.54 l1.88 0.22 l0.06 -3.6 l-3.98 -0.22 l-0.16 -4.4 l-0.04 -2.88 l0.66 -0.48 c0.46 -0.02 0.86 -0.06 1.24 -0.1 c0.64 -0.06 1.28 -0.1 1.42 -0.1 c0.1 0 0.46 0.02 0.8 0.04 l0.64 0.04 z M28.32 19.92 l-0.04 -6.94 l0.08 -0.74 l-0.04 -0.74 l0.1 -4.42 l0.18 -1.72 l6.5 0.12 l0.1 3.9 l-4.26 0 l-0.08 2.5 l3.26 -0.06 l0 0.22 l0.1 1.7 l-3.04 0.06 l0.1 2.96 l4.06 0.2 l0 3.08 z M43.49 7.699999999999999 l0.06 1.58 l0 2.06 l0.72 0 l0.7 -0.06 l0.46 -0.44 l0 -0.2 l0.08 -1.36 l-0.16 -1.22 l0 -0.04 l-0.22 -0.8 l-0.54 -0.24 l-1.04 0 z M43.37 5.24 l2.62 0.04 l1.24 0.14 l1.02 0.58 l0.8 1.32 l-0.26 3.86 l-0.32 0.6 l-1.18 0.38 l1.34 1 l0.36 0.98 l0 1.6 l-0.18 4.24 l-0.52 0.12 l-2.06 -0.1 l-0.1 -3.9 l-0.14 -2.06 l-0.48 -0.52 l-0.92 -0.3 l0 1.48 l0 3.72 l0.06 1.56 l-1.94 -0.02 l-0.92 0.06 l-0.32 -0.06 l0 -2.88 l0 -2.1 l0.12 -2.72 l-0.08 -4.68 l-0.04 -2.32 z M69.37 5.199999999999999 l0 12.2 l1.5 0.28 l1.46 0.04 l-0.14 2.26 l-1.14 0 l-3.8 0.14 l-1.26 -0.04 l-0.26 -13.28 l0.12 -1.44 z M78.54 8.88 l3.2 0.08 l-0.16 2.5 l0.24 5.08 l-0.14 3.38 l-0.28 0.04 l-2.8 -0.06 l-0.12 -0.92 l-0.04 -5.36 z M78.66000000000001 4.98 l3.02 0.04 l0.14 0.78 l0 1.34 l-0.08 0.72 l-3.2 0.02 l-0.1 -1.3 l-0.04 -1.4 z M94.65 5.52 l0.52 0.86 l0 2.44 l-0.06 1.24 l-2.68 -0.14 l0 -0.78 l0 -1.06 l-1.32 0.02 l-0.22 0.56 l0.22 2.72 l2.06 0.12 l2 0.24 l0.06 2.54 l0 1.8 l-0.26 3.14 l-1.8 0.88 l-2.64 -0.12 l-1.2 -0.48 l-0.6 -0.46 l-0.28 -1.46 l0.1 -2.48 l0.1 -0.8 l0.68 0.04 l1.56 0.18 l0 0.6 l0 0.66 l0 0.34 l0 0.54 l1.88 0.22 l0.06 -3.6 l-3.98 -0.22 l-0.16 -4.4 l-0.04 -2.88 l0.66 -0.48 c0.46 -0.02 0.86 -0.06 1.24 -0.1 c0.64 -0.06 1.28 -0.1 1.42 -0.1 c0.1 0 0.46 0.02 0.8 0.04 l0.64 0.04 z M101.5 5.359999999999999 l4.06 -0.12 l2.12 0.08 l0.6 0.04 l-0.22 2.9 l-1.6 -0.1 l0.12 11.84 l-3.54 0.04 l0.18 -7.04 l0.08 -4.88 l-1.94 -0.18 z'></path>
              </g>
            </svg>
          </Typography>
          <div className='relative flex gap-2'>
            {storedValue && (
              <Button variant='gradient' size='sm' onClick={signOut} className='h-10'>
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
}
