import React from "react";
import { Container, Typography } from "@mui/material";
import ChangeRoleModule from "features/common/ui/organisms/ChangeRoleModule";
import FeatureToggleModule from "features/common/ui/organisms/FeatureToggleModule";
import MainWrapper from "features/common/ui/organisms/MainWrapper";

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
