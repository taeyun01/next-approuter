import style from "./input.module.css";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  placeholder: string;
  readOnly: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  id,
  name,
  value,
  onChange,
  required,
  placeholder,
  readOnly,
  onClick,
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
      onClick={onClick}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
    />
  </div>
);

export default InputField;
