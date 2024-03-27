import { FC, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

export interface MessageCardProps {
  image: string;
  heading: string;
  message?: ReactNode;
  imgWidth?: string;
  imgHeight?: string;
}

const MessageCard: FC<MessageCardProps> = ({ image: Image, heading, message, imgWidth, imgHeight }) => {
  return (
    <Box
      data-testid="message-card"
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img width={imgWidth || "132px"} height={imgHeight || "132px"} src={Image} alt={heading} />

      <Typography variant="h2" aria-label="Message heading" mt={2}>
        {heading}
      </Typography>

      {message}
    </Box>
  );
};

export default MessageCard;
