import React, { ChangeEvent } from "react";
import { Container, Stack, Switch, Typography } from "@mui/material";
import { FeatureSwitch } from "../../../../../__generated__/graphql";
import useChangeFeatureToggle from "../../../hooks/useCangeFeatureToggle";
import useGetUser from "../../../hooks/useGetUser";

const FeatureToggleModule = () => {
  const { featureToggle } = useGetUser();
  const [changeFeatureToggle] = useChangeFeatureToggle();

  const handleShowFeature = (event: ChangeEvent<HTMLInputElement>) => {
    const switchName = event.target.name as keyof FeatureSwitch;
    changeFeatureToggle({
      variables: { values: { ...featureToggle, [switchName]: featureToggle ? !featureToggle[switchName] : false } },
    });
  };

  return (
    <Container sx={{ p: 3, bgcolor: (theme) => theme.palette.common.white, borderRadius: 3 }}>
      <Typography variant="h1" marginBottom={4}>
        Feature toggle
      </Typography>
      <Container maxWidth="sm">
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography variant="h2">Show Sales</Typography>
          <Switch
            checked={Boolean(featureToggle?.showSales)}
            color="primary"
            name="showSales"
            onChange={handleShowFeature}
          />
        </Stack>
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography variant="h2">Show Old Collection</Typography>
          <Switch
            checked={Boolean(featureToggle?.showOldCollection)}
            color="primary"
            name="showOldCollection"
            onChange={handleShowFeature}
          />
        </Stack>
      </Container>
    </Container>
  );
};

export default FeatureToggleModule;
