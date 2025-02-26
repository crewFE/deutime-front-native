import {
    FormControl as BluestackFormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText,
  } from "./ui/form-control";
  import { AlertCircle } from "lucide-react-native";
  
  export default function FormControl({
    children,
    labelText,
    helperText,
    errorText,
    size = "md",
    isReadOnly = false,
    isDisabled = false,
    isRequired = false,
    isInvalid = false,
  }) {
    return (
      <BluestackFormControl
        isInvalid={isInvalid}
        size={size}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      >
        <FormControlLabel>
          <FormControlLabelText size={size}>{labelText}</FormControlLabelText>
        </FormControlLabel>
        {children}
        {/*  */}
        <FormControlHelper>
          <FormControlHelperText size={size}>{helperText}</FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircle} />
          <FormControlErrorText size={size}>{errorText}</FormControlErrorText>
        </FormControlError>
      </BluestackFormControl>
    );
  }