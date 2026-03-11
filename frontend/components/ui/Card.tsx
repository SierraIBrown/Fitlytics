import { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    title?: string;
};

export default function Card({ children, title }: CardProps){
    return (
        <div style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "20px", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)", }}>
            {title && (
                <h3 style={{ marginBottom: "15px", fontSize: "20px", fontWeight: 600, }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}