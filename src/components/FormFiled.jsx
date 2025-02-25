import { Controller } from "react-hook-form";

const FormFiled = ({ control, label, name, Component, type, placeholder }) => {
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
            />
          );
        }}
      />
    </div>
  );
};

export default FormFiled;
