import { PencilIcon } from "@heroicons/react/24/solid";
import { Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import { updateUser } from "../services/users";
import { useAppDispatch } from "../app/hooks";
import { Modal } from "./modals/Modal";
import { User } from "../types/users";

type Props = User & {
  classes: string;
};

export const TableItem: React.FC<Props> = ({
  id,
  name,
  email,
  birthdayDate,
  classes,
  phoneNumber,
  address,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const dispatch = useAppDispatch();

  const handleUpdateUser = async (
    name: string,
    email: string,
    birthdayDate: string,
    phoneNumber: string,
    address: string
  ) => {
    const userData = {
      id,
      name,
      email,
      birthdayDate,
      phoneNumber,
      address,
    };

    return await dispatch(updateUser(userData));
  };

  return (
    <>
      <Modal
        open={open}
        handleOpen={handleOpen}
        setOpen={setOpen}
        name={name}
        email={email}
        birthdayDate={birthdayDate}
        phoneNumber={phoneNumber}
        address={address}
        handleUpdateUser={handleUpdateUser}
      />

      <tr>
        <td className={classes}>
          <div className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <Typography
                variant='small'
                color='blue-gray'
                className='font-normal'
              >
                {name}
              </Typography>

              <Typography
                variant='small'
                color='blue-gray'
                className='font-normal opacity-70'
              >
                {email}
              </Typography>
            </div>
          </div>
        </td>
				
        <td className={classes}>
          <Typography variant='small' color='blue-gray' className='font-normal'>
            {birthdayDate}
          </Typography>
        </td>

        <td className={classes}>
          <Typography variant='small' color='blue-gray' className='font-normal'>
            {phoneNumber}
          </Typography>
        </td>

        <td className={classes}>
          <Typography variant='small' color='blue-gray' className='font-normal'>
            {address}
          </Typography>
        </td>

        <td className={classes} onClick={handleOpen}>
          <Tooltip content='Edit User'>
            <IconButton variant='text'>
              <PencilIcon className='h-4 w-4' />
            </IconButton>
          </Tooltip>
        </td>
      </tr>
    </>
  );
};
