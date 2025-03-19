import { CircularProgress, Button as MUIButton } from "@mui/material";

const Button = ({
  isLoading = false,
  onClick,
  variant = "outlined",
  icon,
  size,
  children,
}) => {
  return (
    <MUIButton
      variant={variant}
      onClick={onClick}
      size={size}
      disabled={isLoading}
    >
      {isLoading ? (
        <CircularProgress className="mr-1 animate-spin" size="16px" />
      ) : (
        icon
      )}
      {children}
    </MUIButton>
  );
};

export default Button;
