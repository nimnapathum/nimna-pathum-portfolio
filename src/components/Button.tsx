interface ButtonProps {
    title: string;
    classnames?: string;
    onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    RightIcon?: React.ReactNode;
    LeftIcon?: React.ReactNode;
    size: 's' | 'm' | 'l';
}

const sizeClasses: Record<ButtonProps['size'], string> = {
    s: 'px-3 py-1 text-sm',
    m: 'px-4 py-2 text-md',
    l: 'px-6 py-2 text-lg',
};


const Button: React.FC<ButtonProps> = ({title, classnames, onclick, RightIcon, LeftIcon, size = 'm'}) => {
  
    const sizeClass = sizeClasses[size];

  return (
    <div className="relative inline-block">
      <div className="relative transition-transform duration-300 ease-out">
        <div className="absolute inset-0 bg-dark-high [transform:translateX(4px)_translateY(4px)] transition-all duration-300 ease-out" />

            {RightIcon}

            <button
            className={`relative overflow-hidden border bg-white-primary text-dark-high transition-all duration-300 ease-out hover:translate-x-2 hover:translate-y-2 hover:cursor-pointer ${classnames ?? ''} ${sizeClass}`}
            onClick={onclick}
            >
            <span className='font-ccsmashRegular relative z-10'>{title}</span>
            </button>

            {LeftIcon}

      </div>
    </div>
  );
};

export default Button;
