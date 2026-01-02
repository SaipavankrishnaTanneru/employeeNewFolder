import React from 'react';
import styles from '../css/Button.module.css';

const Button = ({
    children, leftIcon, rightIcon, onClick, type = 'button',
    variant = 'primary', disabled = false, fullWidth = false, ...props
}) => {
    const buttonClasses = [
        styles.button, styles[variant],
        fullWidth ? styles.fullWidth : '',
        disabled ? styles.disabled : ''
    ].join(' ');

    return (
        <button className={buttonClasses} onClick={onClick} type={type} disabled={disabled} {...props}>
            {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </button>
    );
};

export default Button;