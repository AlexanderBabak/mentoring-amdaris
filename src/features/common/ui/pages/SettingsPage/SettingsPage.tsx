import React from "react";
import { Container, Typography } from "@mui/material";
import ChangeRoleModule from "../../organisms/ChangeRoleModule";
import FeatureToggleModule from "../../organisms/FeatureToggleModule";
import MainWrapper from "../../organisms/MainWrapper";

const SettingsPage = () => {
  return (
    <MainWrapper>
      <Container fixed maxWidth="md" disableGutters sx={{ my: 4 }}>
        <Typography variant="h1" marginBottom={4} fontSize={36}>
          Settings
        </Typography>

        <ChangeRoleModule />

        <FeatureToggleModule />
      </Container>
    </MainWrapper>
  );
};

export default SettingsPage;
