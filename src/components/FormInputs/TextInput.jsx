import { TextField } from "@mui/material";

const TextInput = ({ onChange, value, name, type = "text", placeholder }) => {
  return (
    <TextField
      slotProps={{
        input: { className: "h-10 px-3 py-2" },
        htmlInput: { className: "!p-0" },
      }}
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
