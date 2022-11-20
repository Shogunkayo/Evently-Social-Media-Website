import React from 'react';

const FormInput = (props) => {
    const { label, errorMessage, onChange, id, ...inputProps } = props;
  
    const [focused, setFocused] = React.useState(false);
  
    const handleFocused = () => {
      setFocused(true);
    };
  
    return (
      <div className="formInput">
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocused}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
          focused={focused.toString()}
        />
        <span>{errorMessage}</span>
      </div>
    );
  };
  
  export default FormInput;
  