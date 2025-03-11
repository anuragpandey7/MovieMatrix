import React from "react";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="select">
      <select onChange={func} defaultValue={0} name="format" id="format">
        <option value={0} disabled>
         {title}
        </option>
        {
          options.map((option, index) => {
            return (
              <option  key={index} value={option}>
                {option.toUpperCase()}
              </option>
            );
          })
        }
      </select>
    </div>
  );
};

export default Dropdown;

