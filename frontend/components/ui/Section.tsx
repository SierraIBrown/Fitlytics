import { ReactNode } from "react";

type SectionProps = {
    title: string;
    children: ReactNode;
    subtitle?: string;
};

export default function Section({ title, subtitle, children }: SectionProps){
    return(
        <section style={{ marginBottom: "30px" }}>
            <div style={{ marginBottom: "15px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 600 }}>{title}</h2>
                {subtitle && (
                    <p style={{ marginTop: "5px", color: "var(--color-text-secondary)", }}>
                        {subtitle}
                    </p>
                )}
            </div>
            {children}
        </section>
    );
}