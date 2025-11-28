import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
};

const SizeStyles = {
    small: "px-4 py-2 text-sm rounded font-small",
    medium: "px-6 py-3 text-base rounded font-medium",
    large: "px-8 py-4 text-lg rounded-md font-semibold",
};

const VariantStyles = {
    primary: "bg-foreground border-primary text-background hover:bg-primary/90 transition-colors",
    secondary: "border border-primary text-primary hover:bg-primary/10 transition-colors",
};

const Button: React.FC<ButtonProps> = ({
    onClick,
    disabled = false,
    className,
    variant = 'primary',
    size = 'medium',
    children,
}) => {
  return (
    <motion.button
        className={`${VariantStyles[variant]} ${SizeStyles[size]} ${className || ''} cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </motion.button>
  )
}

export default Button;
