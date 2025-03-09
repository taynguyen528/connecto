import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const FormFiled = ({
  control,
  label,
  name,
  Component,
  type,
  placeholder,
  error,
}) => {
  return (
    <div>
      <p className="mb-1 text-sm font-bold text-dark-100 opacity-80">{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => {
          return (
            <Component
              onChange={onChange}
              value={value}
              name={name}
              control={control}
              type={type}
              placeholder={placeholder}
              error={error?.message}
            />
          );
        }}
      />
      {error?.message && (
        <FormHelperText error={true}>{error.message}</FormHelperText>
      )}
    </div>
  );
};

export default FormFiled;
