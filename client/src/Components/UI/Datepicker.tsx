import React, { forwardRef } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { MdOutlineCalendarMonth } from "react-icons/md";
import "./Datepicker.css";

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
}

const customDateInput = ({ value, onClick, onChange }: any, ref: any) => (
  <Input
    autoComplete="off"
    value={value}
    ref={ref}
    onClick={onClick}
    onChange={onChange}
  />
);

const CustomInput = forwardRef(customDateInput);

const icon = <MdOutlineCalendarMonth fontSize="sm" />;

export const DatePicker = ({ selectedDate, onChange, ...props }: Props) => {
  return (
    <>
      <InputGroup zIndex={1}>
        <ReactDatePicker
          selected={selectedDate}
          onChange={onChange}
          customInput={<CustomInput />}
          dateFormat="MMMM d, yyyy h:mm aa"
          showTimeInput
          timeInputLabel="Time:"
          popperPlacement="top-end"
          {...props}
        />
        <InputRightElement children={icon} />
      </InputGroup>
    </>
  );
};
