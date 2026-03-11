import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
};

export default function Input({ label, error, id, style, ...props }: InputProps){
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor={id} style={{ fontSize: "14px", fontWeight: 500 }}>
                {label}
            </label>
            <input id={id} {...props} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "10px 15px", backgroundColor: "var(--color-surface)", color: "var(--color-text-primary)", ...style, }}/>
            {error && (
                <span style={{ color: "var(--color-error)", fontSize: "12px" }}>
                    {error}
                </span>
            )}
        </div>
    );
}