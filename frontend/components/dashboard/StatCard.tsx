import Card from "../ui/Card";

type StatCardProps = {
    label: string;
    value: string | number;
    trend?: string;
};

export default function StatCard({ label, value, trend }: StatCardProps){
    return(
        <Card>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "10px", }}>
                {label}
            </p>
            <p style={{ fontSize: "32px", fontWeight: 700 }}>{value}</p>
            {trend && (
                <p style={{ marginTop: "10px", fontSize: "14px", color: "var(--color-accent)", fontWeight: 500, }}>
                    {trend}
                </p>
            )}
        </Card>
    );
}