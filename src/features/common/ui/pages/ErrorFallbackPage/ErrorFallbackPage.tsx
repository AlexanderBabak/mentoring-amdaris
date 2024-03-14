import { Box, Button, Stack, Typography } from "@mui/material";

const ErrorFallbackPage = () => {
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.primary.main,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        placeItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.primary.contrastText,
          borderRadius: 2,
          p: 6,
        }}
      >
        <Stack spacing={4} sx={{ alignItems: "center" }}>
          <Stack gap={2} sx={{ alignItems: "center" }}>
            <Typography variant="h1">Something went wrong.</Typography>
            <Typography variant="h3">Please try reloading the application.</Typography>
          </Stack>
          <Button sx={{ letterSpacing: "1.25px" }} variant="contained" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ErrorFallbackPage;
