import React from "react";
import Select from "react-select";
import './styles.css'

const StyledSelect = ({ ...rest }) => {
  return <Select {...rest} classNamePrefix='filter' />;
};

export default StyledSelect;
