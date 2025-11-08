import React from "react";
import { Box } from "@mui/material";

type Props = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

const ProtectedContent: React.FC<Props> = ({
  children,
  style,
  className,
  ...rest
}) => {
  return (
    <Box
      {...rest}
      className={className}
      sx={{ border: "1px solid red", ...style }}
    >
      {children}
    </Box>
  );
};

export default ProtectedContent;
