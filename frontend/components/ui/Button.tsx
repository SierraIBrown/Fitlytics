import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
        backgroundColor: "var(--color-primary)",
        color: "white",
        border: "1px solid var(--color-primary)",
    },
    secondary: {
        backgroundColor: "var(--color-surface)",
        color: "var(--color-primary)",
        border: "1px solid var(--color-primary)",
    },
    ghost: {
        backgroundColor: "transparent",
        color: "var(--color-text-primary)",
        border: "1px solid transparent",
    },
    danger: {
        backgroundColor: "var(--color-error)",
        color: "white",
        border: "1px solid var(--color-error)",
    },
};

export default function Button({
    children,
    variant = "primary",
    style,
    ...props
}: ButtonProps){
    return(
        <button
        {...props}
        style={{
            borderRadius: "var(--radius-md)",
            padding: "10px 20px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s ease",
            ...variantStyles[variant],
            ...style,
        }}
        >
            {children}
        </button>
    );
}