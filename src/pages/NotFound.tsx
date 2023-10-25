import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className='flex  justify-center w-screen h-screen mt-20'>
      <div className='px-4 lg:py-10'>
        <div className='lg:gap-4 lg:flex'>
          <div className='flex flex-col items-center justify-center md:py-15 lg:py-10'>
            <h1 className='font-bold text-gray-600 text-9xl'>404</h1>
            <p className='mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl'>
              <span className='text-red-500'>Oops!</span> Page Not Found
            </p>
            <p className='mb-8 text-center text-gray-500 md:text-lg'>
              The page you’re looking for doesn’t exist.
            </p>
            <Link
              to='/'
              className='px-5 py-2 rounded-md text-white bg-gray-900  hover:shadow-lg hover:shadow-gray-900/20 '
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
