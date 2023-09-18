import React, { useState } from "react";

function CustomRadioButtons() {
  const [formData, setFormData] = useState({ credit: "" });

  return (
    <div>
      <h1>Inline Radio Buttons</h1>
      <p>Semantic and Accessible</p>
      <fieldset>
        <input
          id="item-1"
          className="radio-inline__input"
          type="radio"
          name="accessible-radio"
          value="item-1"
          checked={formData.credit === "0"}
          onChange={() =>
            setFormData((prevData) => ({ ...prevData, credit: "0" }))
          }
        />
        <label className="radio-inline__label" htmlFor="item-1">
          必要
        </label>
        <input
          id="item-2"
          className="radio-inline__input"
          type="radio"
          name="accessible-radio"
          value="item-2"
          checked={formData.credit === "1"}
          onChange={() =>
            setFormData((prevData) => ({ ...prevData, credit: "1" }))
          }
        />
        <label className="radio-inline__label" htmlFor="item-2">
          不要
        </label>
      </fieldset>
    </div>
  );
}

export default CustomRadioButtons;
