import { SelectHTMLAttributes } from "react";

type Option = {
    label: string;
    value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    options: Option[];
    error?: string;
};

export default function Select({
    label,
    options,
    error,
    id,
    style,
    ...props
}: SelectProps){
    return(
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor={id} style={{ fontSize: "14px", fontWeight: 500 }}>
                {label}
            </label>
            <select id={id} {...props} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "10px 15px", backgroundColor: "var(--color-surface)", color: "var(--color-text-primary)", ...style, }}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <span style={{ color: "var(--color-error)", fontSize: "12px" }}>
                    {error}
                </span>
            )}
        </div>
    );
}