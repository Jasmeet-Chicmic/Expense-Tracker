import React, { Ref, SyntheticEvent, useEffect, useState } from 'react';
import './styles.scss'; // You can define your styles in this CSS file

function Switch({
  onChange,
  checked,
}: {
  onChange: (value: boolean) => void;
  checked: boolean;
}) {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange(newState);
  };

  return (
    <div className="switch-container" onClick={handleToggle}>
      <div className={`switch ${isChecked ? 'checked' : ''}`}>
        <div className="switch-toggle" />
      </div>
    </div>
  );
}

// eslint-disable-next-line react/display-name
// export const CustomSwitch = React.forwardRef(
//     ({ className = 'form-control', control, ...otherProps }, ref) => {
//       return (
//         <Controller
//         name="toggle" // The name prop should be consistent with the defaultValues key
//         control={control}
//         {...otherProps}
//         render={({ field: { onChange, value, name } }) => {
//             return(
//             <label className={`switch ${value ? 'checked' : ''}`}>
//                 <input
//                 type="checkbox"
//                 name={name}
//                 className={className}
//                 ref={ref}
//                 checked={value}
//                 onChange={onChange} // Pass the event to the parent handler

//                 />
//                 <span className="slider round"></span>
//           </label>
//         )}}
//       />
//       );
//     }
//   );

// eslint-disable-next-line react/display-name
export const CustomSwitch = React.forwardRef(
  (
    {
      checked,
      ...otherProps
    }: { checked: boolean; onChange: (e: SyntheticEvent) => void },
    ref
  ) => {
    return (
      <label htmlFor="checkbox" className="switch">
        <input
          type="checkbox"
          checked={checked}
          ref={ref as Ref<HTMLInputElement>}
          {...otherProps}
        />
        <span className="slider round" />
      </label>
    );
  }
);
export default Switch;
