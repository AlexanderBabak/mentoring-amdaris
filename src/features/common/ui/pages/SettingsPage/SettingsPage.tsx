import React, { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, CircularProgress, Container, SelectChangeEvent, Stack, Typography } from "@mui/material";
import SearchIcon from "../../../assets/isons/search.svg";
import ImageFolder from "../../../assets/isons/warning.svg";
import useSnackbar from "../../../hooks/useSnackbar";
import { CHANGE_USER_ROLE, GET_USER_BY_EMAIL } from "../../../libs/apollo/user";
import { searchParamsToObject, withoutFalsyValues } from "../../../libs/utils";
import Loading from "../../atoms/Loading";
import MessageCard from "../../molecules/MessageCard";
import SearchBar from "../../molecules/SearchBar";
import SelectCustom from "../../molecules/Select";
import { SelectItemsProps } from "../../molecules/Select/Select";
import MainWrapper from "../../organisms/MainWrapper";

const SettingsPage = () => {
  const { openSnackbar, closeSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = useMemo<string>(() => searchParams.get("userSearchEmail") || "", [searchParams]);

  const { data, loading } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: searchTerm },
    fetchPolicy: searchTerm ? "cache-and-network" : "standby",
    onCompleted({ getUserByEmail }) {
      if (getUserByEmail?.role) {
        setRole(getUserByEmail?.role);
      }
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors.length > 0) {
        openSnackbar({
          alertSeverity: "error",
          alertTitle: "Unable to find user",
          alertContent: (
            <Stack rowGap={0.25}>
              <Typography>{graphQLErrors[0].message}</Typography>
              <Typography>Please try again</Typography>
            </Stack>
          ),
          alertAction: (
            <Button sx={{ color: (theme) => theme.palette.common.white }} onClick={closeSnackbar}>
              Okay
            </Button>
          ),
          ClickAwayListenerProps: {
            onClickAway: (event) => event.preventDefault(),
          },
          autoHideDuration: null,
        });
      }
    },
  });

  const [role, setRole] = useState("");

  const handleSelectRole = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const [changeUserRole, { loading: changeRoleLoading }] = useMutation(CHANGE_USER_ROLE, {
    update() {
      setSearchParams("");
      openSnackbar({
        alertSeverity: "success",
        alertTitle: "Role successfully changed",
        alertContent: "Now you can proceed working",
        alertAction: false,
      });
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors.length > 0) {
        openSnackbar({
          alertSeverity: "error",
          alertTitle: "Unable to change user role",
          alertContent: (
            <Stack rowGap={0.25}>
              <Typography>{graphQLErrors[0].message}</Typography>
              <Typography>Please try again</Typography>
            </Stack>
          ),
          alertAction: (
            <Button sx={{ color: (theme) => theme.palette.common.white }} onClick={closeSnackbar}>
              Okay
            </Button>
          ),
          ClickAwayListenerProps: {
            onClickAway: (event) => event.preventDefault(),
          },
          autoHideDuration: null,
        });
      }
    },
  });

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
    <MainWrapper>
      <Container fixed maxWidth="md" disableGutters sx={{ my: 4 }}>
        <Typography variant="h1" marginBottom={4} fontSize={36}>
          Settings
        </Typography>

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

        <Container sx={{ p: 3, bgcolor: (theme) => theme.palette.common.white, borderRadius: 3 }}>
          <Typography variant="h1" marginBottom={4}>
            Feature toggle
          </Typography>
          <Container maxWidth="sm">
            {loading && (
              <Stack padding={6}>
                <Loading />
              </Stack>
            )}
          </Container>
        </Container>
      </Container>
    </MainWrapper>
  );
};

export default SettingsPage;
