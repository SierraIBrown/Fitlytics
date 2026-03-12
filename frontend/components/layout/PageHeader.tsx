import { ReactNode } from "react";

type PageHeaderProps = {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
};

export default function PageHeader({
    title,
    subtitle,
    actions,
}: PageHeaderProps){
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between" style={{ marginBottom: "30px" }}>
            <div>
                <h1 style={{ fontSize: "32px", fontWeight: 700 }}>{title}</h1>
                {subtitle && (
                    <p style={{ marginTop: "5px", color: "var(--color-text-secondary)", fontSize: "16px", }}>
                        {subtitle}
                    </p>
                )}
            </div>

            {actions && <div>{actions}</div>}
        </div>
    );
}