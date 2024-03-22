import { Button, CircularProgress, Container, Stack, Typography } from "@mui/material";
import SearchIcon from "../../../assets/isons/search.svg";
import ImageFolder from "../../../assets/isons/warning.svg";
import Loading from "../../atoms/Loading";
import MessageCard from "../../molecules/MessageCard";
import SearchBar from "../../molecules/SearchBar";
import MainWrapper from "../../organisms/MainWrapper";

const SettingsPage = () => {
  const loading = false;
  const searchTerm = "ds";
  const searchResult = "res";

  return (
    <MainWrapper>
      <Container
        fixed
        maxWidth="md"
        sx={{ my: 4, p: 3, bgcolor: (theme) => theme.palette.common.white, borderRadius: 3, minHeight: "300px" }}
      >
        <Typography variant="h1" marginBottom={4}>
          Change user role
        </Typography>
        <Container maxWidth="sm">
          <SearchBar onSearch={() => {}} value={""} />

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

          {searchTerm && !loading && !searchResult && (
            <Stack padding={6}>
              <MessageCard
                image={ImageFolder}
                imgWidth="42px"
                imgHeight="42px"
                heading="No users were found matching your search term"
              />
            </Stack>
          )}

          {searchTerm && !loading && searchResult && (
            <>
              <Typography variant="h2" marginTop={4}>
                <b>Username:</b> {"Alex"}
              </Typography>
              <Typography variant="h2" marginBottom={2}>
                <b>Role:</b> {"admin"}
              </Typography>

              <Button
                onClick={() => {}}
                variant="contained"
                disabled={false}
                sx={{ padding: 1.5 }}
                data-testid="change-role-button"
              >
                {loading ? <CircularProgress color="inherit" size={20} /> : "Change role"}
              </Button>
            </>
          )}
        </Container>
      </Container>
    </MainWrapper>
  );
};

export default SettingsPage;
