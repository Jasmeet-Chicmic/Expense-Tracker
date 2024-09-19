import { useState } from 'react';
import ICONS from '../../assets';


type CustomDropdownProps = {
  placeholder?: string;
  toggleClassName?: string;
  containerStyle?: string;
  mainContainerStyle?: string;
  options?: {
    value: string;
    label: string;
    disabled?: boolean;
    icon?: string;
  }[];
  onChange?: ({ value, label }: { value: string; label: string }) => void;
  icon?: string;
};

function CustomDropdown({
  placeholder = '',
  toggleClassName = '[text-decoration:none] relative text-[inherit] inline-block min-w-[70px] shrink-0 mq450:text-base border-[0]',
  containerStyle = '',
  mainContainerStyle = '',
  options = [],
  onChange = () => {},
  icon = '',
}: CustomDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (option: { value: string; label: string }) => {
    onChange(option);
    setShowDropdown(false);
  };

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={`relative inline-block text-left ${mainContainerStyle}`}>
      <div
        className={`dropdown-btn-wrapper cursor-pointer flex flex-row items-center justify-start gap-[2.9px] ${containerStyle}`}
        onClick={handleToggle}
      >
        <button
          type="button"
          className={toggleClassName}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {placeholder}
          {icon ? (
            <span className="block lg:hidden">
              <img src={icon} alt="login-icon" />
            </span>
          ) : null}
        </button>
        <div className="flex flex-col items-start justify-start px-0 pb-0">
          <img
            className={`arrow relative object-contain shrink-0 ${
              showDropdown ? 'rotate-0' : 'rotate-180'
            }`}
            alt=""
            src={ICONS.ArrowUp}
          />
        </div>
      </div>
      <div
        className={`${showDropdown ? 'block' : 'hidden'} absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${mainContainerStyle}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {options.map((option) => (
            <div
              key={option.label}
              className="cursor-pointer flex px-4 py-2 w-full items-center bg-transparent justify-start rounded-md text-lg text-grey hover:text-black relative text-[inherit]"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              onClick={() => handleChange(option)}
            >
              {option?.icon ? (
                <img
                  className="max-w-[18px] relative object-contain shrink-0 mr-2"
                  alt=""
                  src={option?.icon}
                />
              ) : null}
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomDropdown;
