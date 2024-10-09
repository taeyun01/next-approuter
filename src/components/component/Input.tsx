import style from "./input.module.css";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  placeholder: string;
}

const InputField = ({
  label,
  id,
  name,
  value,
  onChange,
  required,
  placeholder,
}: InputFieldProps) => (
  <div className={style.inputContainer}>
    <label htmlFor={id}>{label}</label>
    <input
      className={style.input}
      id={id}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default InputField;
