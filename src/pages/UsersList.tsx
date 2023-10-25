import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Spinner,
} from "@material-tailwind/react";
import { TableItem } from "../components/User";
import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUsers } from "../services/users";
import { useSearchParams } from "react-router-dom";
import * as usersActions from "../features/users";

export function Table() {
  const { users, loading, nextPage, prevPage, usersLength } = useAppSelector(
    (state) => state.users
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  const dispatch = useAppDispatch();

  const TABLE_HEAD = ["Member", "Birthdate", "Phone number", "Address", "Edit"];

  const TABS = [
    {
      label: "All",
      value: `${usersLength}`,
    },
    {
      label: "10",
      value: "10",
    },
    {
      label: "20",
      value: "20",
    },
    {
      label: "30",
      value: "30",
    },
  ];

  useEffect(() => {
    dispatch(getUsers({ limit, offset }));
  }, [dispatch, limit, offset, usersLength]);

  const next = useCallback(() => {
    searchParams.set("offset", (offset + limit).toString());
    searchParams.delete("query");
    setSearchParams(searchParams);
  }, [limit, offset, searchParams, setSearchParams]);

  const prev = useCallback(() => {
    searchParams.set("offset", (offset - limit).toString());
    searchParams.delete("query");
    setSearchParams(searchParams);
  }, [limit, offset, searchParams, setSearchParams]);

  const currentPage = useMemo(
    () => Math.floor(offset / limit) + 1,
    [limit, offset]
  );

  const changeItemsPerPage = useCallback(
    (value: string) => {
      searchParams.set("limit", value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const onQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value.replace(/^(\s)*/g, "");
      const updatedSearchParams = new URLSearchParams(searchParams);

      if (!newQuery || newQuery === " ") {
        updatedSearchParams.delete("query");
      } else {
        updatedSearchParams.set("query", newQuery);
      }

      setSearchParams(updatedSearchParams.toString());
      dispatch(usersActions.searchByQuery(newQuery));
    },
    [dispatch, searchParams, setSearchParams]
  );

  useEffect(() => {
    dispatch(usersActions.searchByQuery(query));
  }, [dispatch, query]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [query, users]);

  return (
    <Card className='h-full w-full mb-20'>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-8 flex items-center justify-between gap-8'>
          <div></div>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <Tabs value={limit.toString()} className='w-full md:w-max'>
            <Typography variant='paragraph'>Items per page:</Typography>
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  onClick={() => {
                    changeItemsPerPage(value);
                  }}
                  key={value}
                  value={value}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className='w-full md:w-72'>
            <Input
              label='Search by name'
              icon={<MagnifyingGlassIcon className='h-5 w-5' />}
              crossOrigin={undefined}
              value={query}
              onChange={onQueryChange}
            />
          </div>
        </div>
      </CardHeader>
      {loading ? (
        <div className='flex mx-auto my-20 gap-8'>
          <Spinner className='h-12 w-12' />
        </div>
      ) : (
        <>
          <CardBody className='overflow-auto px-0'>
            <table className='mt-4 w-full min-w-max table-auto text-left'>
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
                    >
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredUsers?.map((user, index) => {
                  const isLast = index === users.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50 w-3";

                  return (
                    <TableItem
                      key={user.id}
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      birthdayDate={user.birthday_date}
                      phoneNumber={user.phone_number}
                      address={user.address}
                      classes={classes}
                    />
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal'
            >
              Page {currentPage} / {Math.ceil(usersLength / limit)}
            </Typography>
            <div className='flex gap-2'>
              <Button
                variant='outlined'
                size='sm'
                onClick={prev}
                disabled={prevPage === null}
              >
                Previous
              </Button>
              <Button
                variant='outlined'
                size='sm'
                onClick={next}
                disabled={nextPage === null}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
