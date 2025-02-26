
import { Input as GluestackInput, InputField } from "./ui/input";

export default function Input({
  inputValue,
  setInputValue,
  placeholder = "",
  type = "text",
  size = "md",
  autocapitalize = undefined,
}) {
  return (
    <GluestackInput className="my-1" size={size}>
      <InputField
        type={type}
        placeholder={placeholder}
        autoCapitalize={autocapitalize}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
    </GluestackInput>
  );
}