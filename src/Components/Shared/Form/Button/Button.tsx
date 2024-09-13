interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
  btnType?: 'primary' | 'secondary' | '';
  className?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  bgColor?: string;
}

export const returnButtonClass = (
  size: string,
  btnType: string,
  bgColor: string
) => {
  let classname = '';
  switch (size) {
    case 'extraSmall':
      classname = 'px-3 py-2 text-xs font-medium text-center';
      break;
    case 'small':
      classname = 'px-3 py-2 text-sm font-medium';
      break;
    case 'medium':
      classname = 'px-5 py-2.5 text-lg font-medium';
      break;
    case 'large':
      classname =
        'px-3 md:px-5 pt-2 pb-1 md:py-3 text-lg md:text-xl font-medium';
      break;
    case 'extraLarge':
      classname = 'px-6 py-3.5 text-base font-medium';
      break;
    default:
      classname = '';
  }
  if (btnType === 'primary') {
    return `${classname} text-center text-white inline-flex items-center ${bgColor || 'bg-[#14A800] hover:bg-limegreen-500 '} focus:outline-none rounded-[10.26px] font-urw-geometric-light border-2 border-solid border-[#14A800] justify-center`;
  }
  if (btnType === 'secondary') {
    return `${classname} text-center text-black hover:text-white inline-flex items-center border-2 border-solid border-[#14A800] bg-white hover:bg-[#218e12] rounded-[10.26px] justify-center`;
  }
  return `cursor-pointer ${classname}`;
};

function Button({
  onClick = () => {},
  type = 'button',
  size = 'medium',
  btnType = '',
  className,
  prepend,
  append,
  children,
  disabled = false,
  bgColor = '',
}: ButtonProps) {
  const btnClass = returnButtonClass(size, btnType, bgColor);
  return (
    <button
      className={`${btnClass} ${className}`}
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {prepend}
      {children}
      {append}
    </button>
  );
}

export default Button;
