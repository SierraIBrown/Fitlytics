import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Section from "@/components/ui/Section";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/layout/PageHeader";

const colors = [
    { name: "Primary", hex: "#1D4ED8", value: "var(--color-primary)" },
    { name: "Secondary", hex: "#14B8A6", value: "var(--color-secondary)" },
    { name: "Background", hex: "#F8FAFC", value: "var(--color-background)" },
    { name: "Text Primary", hex: "#0F172A", value: "var(--color-text-primary)" },
    { name: "Text Secondary", hex: "#475569", value: "var(--color-text-secondary)" },
    { name: "Border", hex: "#CBD5E1", value: "var(--color-border)" },
    { name: "Success", hex: "#22C55E", value: "var(--color-success)" },
    { name: "Warning", hex: "#F59E0B", value: "var(--color-warning)" },
    { name: "Error", hex: "#EF4444", value: "var(--color-error)" },
];

export default function DesignPage(){
    return(
        <main className="mx-auto max-w-6xl px-6 py-8">
            <PageHeader title="Fitlytics Design System"
                subtitle="Reference page for colors, typography, and reusable components."
            />

            <Section title="Colors">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {colors.map((color) => (
                        <div key={color.name}>
                            <div style={{ backgroundColor: color.value, height: "80px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", }}/>
                            <p style={{ marginTop: "10px", fontWeight: 600 }}>{color.name}</p>
                            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
                                {color.hex}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Buttons">
                <div className="flex flex-wrap gap-4">
                    <Button>Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="danger">Danger Button</Button>
                </div>
            </Section>

            <Section title="Cards">
                <div className="grid gap-4 md:grid-cols-2">
                    <Card title="Standard Card">
                        <p>This is a reusable card component for dashboard sections.</p>
                    </Card>
                    <StatCard label="Workouts This Week" value="4" trend="+1 from last week" />
                </div>
            </Section>

            <Section title="Form Controls">
                <div className="grid gap-4 md:grid-cols-2">
                    <Input label="Workout Name" id="workoutName" placeholder="Morning Run" />
                    <Select label="Workout Type" id="workoutType" defaultValue="run" options={[
                        { label: "Run", value: "run" },
                        { label: "Strength", value: "strength" },
                        { label: "Other", value: "other" },
                        ]}
                    />
                </div>
            </Section>
        </main>
    );
}