import { Container, Stack, Typography } from "@mui/material";
import Loading from "../../atoms/Loading";

const FeatureToggleModule = () => {
  const loading = false; // TODO: fix

  return (
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
  );
};

export default FeatureToggleModule;
