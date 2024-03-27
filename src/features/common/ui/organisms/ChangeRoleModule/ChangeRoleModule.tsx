import React, { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, CircularProgress, Container, SelectChangeEvent, Stack, Typography } from "@mui/material";
import SearchIcon from "features/common/assets/isons/search.svg";
import ImageFolder from "features/common/assets/isons/warning.svg";
import useChangeUserRole from "features/common/hooks/useChangeUserRole";
import useGetUserByEmail from "features/common/hooks/useGetUserByEmail";
import { searchParamsToObject, withoutFalsyValues } from "features/common/libs/utils";
import Loading from "features/common/ui/atoms/Loading";
import MessageCard from "features/common/ui/molecules/MessageCard";
import SearchBar from "features/common/ui/molecules/SearchBar";
import SelectCustom from "features/common/ui/molecules/Select";
import { SelectItemsProps } from "features/common/ui/molecules/Select/Select";

const ChangeRoleModule = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = useMemo<string>(() => searchParams.get("userSearchEmail") || "", [searchParams]);
  const [role, setRole] = useState("");

  const { data, loading } = useGetUserByEmail(searchTerm, setRole);
  const [changeUserRole, { loading: changeRoleLoading }] = useChangeUserRole(setSearchParams);
  const handleSelectRole = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleChangeRole = () => {
    if (data?.getUserByEmail?.id) {
      changeUserRole({ variables: { id: data?.getUserByEmail?.id, role } });
    }
  };

  const handleSearch = useCallback(
    (searchText: string) => {
      const newQueryParams = {
        ...searchParamsToObject(searchParams),
        userSearchEmail: [searchText],
      };

      setSearchParams(withoutFalsyValues(newQueryParams));
    },
    [searchParams, setSearchParams],
  );

  const selectItems: SelectItemsProps[] = [
    { name: "Admin", value: "admin" },
    { name: "User", value: "user" },
  ];

  return (
    <Container
      sx={{
        p: 3,
        marginBottom: 2,
        bgcolor: (theme) => theme.palette.common.white,
        borderRadius: 3,
        minHeight: "300px",
      }}
    >
      <Typography variant="h1" marginBottom={4}>
        Change user role
      </Typography>
      <Container maxWidth="sm">
        <SearchBar onSearch={handleSearch} value={searchTerm} />

        {loading && (
          <Stack padding={6}>
            <Loading />
          </Stack>
        )}

        {!searchTerm && !loading && (
          <Stack padding={6}>
            <MessageCard
              imgWidth="42px"
              imgHeight="42px"
              image={SearchIcon}
              heading="Start searching by a user email"
            />
          </Stack>
        )}

        {searchTerm && !loading && !data?.getUserByEmail && (
          <Stack padding={6}>
            <MessageCard
              image={ImageFolder}
              imgWidth="42px"
              imgHeight="42px"
              heading="No users were found matching your search term"
            />
          </Stack>
        )}

        {searchTerm && !loading && data?.getUserByEmail && (
          <>
            <Typography variant="h2" marginTop={5} marginBottom={1}>
              <b>Username:</b> {data?.getUserByEmail.username}
            </Typography>
            <Stack flexDirection="row" alignItems="center" marginBottom={3}>
              <Typography variant="h2" fontWeight={700} marginRight={1}>
                Role:
              </Typography>

              <SelectCustom selectItems={selectItems} selectedValue={role} onChange={handleSelectRole} />
            </Stack>

            <Button
              onClick={handleChangeRole}
              variant="contained"
              disabled={role === data?.getUserByEmail.role}
              sx={{ padding: 1.5 }}
              data-testid="change-role-button"
            >
              {changeRoleLoading ? <CircularProgress color="inherit" size={20} /> : "Change role"}
            </Button>
          </>
        )}
      </Container>
    </Container>
  );
};

export default ChangeRoleModule;
