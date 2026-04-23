import PageHeader from "@/components/layout/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import Select from '@/components/ui/Select';
import Input from "@/components/ui/Input";

export default function ProgressPage(){
    return(
        <main className="mx-auto max-w-6xl px-6 py-8">
            <PageHeader title="Progress" subtitle="Review training trends and visualize workout progress over time." />
            <Section title="Filters" subtitle="Adjust the view for future progress charts.">
                <Card>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Select 
                            label="Workout Type" 
                            id="workoutType" 
                            defaultValue="all" 
                            options={[
                                { label: "All Workouts", value: "all" },
                                { label: "Run", value: "run" },
                                { label: "Strength", value: "strength" },
                                { label: "Other", value: "other" },
                            ]}
                        />

                        <Input label="From" id="fromDate" type="date"/>
                        <Input label="To" id="toDate" type="date"/>
                    </div>
                </Card>
            </Section>

            <Section title="Progress Summary">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard label="Total Workouts" value="12" trend="+3 this month"/>
                    <StatCard label="Total Minutes" value="420" trend="+75 this month"/>
                    <StatCard label="Avg Duration" value="35 min" trend="steady pace"/>
                    <StatCard label="Top Category" value="Run" trend="most logged"/>
                </div>
            </Section>

            <Section title="Charts">
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card title="Weekly Activity">
                        <div className="flex h-64 items-center justify-center" style={{ border: "1px dashed var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text-secondary)", }}>
                            Weekly activity chart placeholder
                        </div>
                    </Card>

                    <Card title="Workout Type Distribution">
                        <div className="flex h-64 items-center justify-center" style={{ border: "1px dashed var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text-secondary)", }}>
                            Workout type chart placeholder
                        </div>
                    </Card>
                </div>
            </Section>

            <Section title="Insights">
                <Card>
                    <ul className="space-y-3" style={{ color: "var(--color-text-secondary)" }}>
                        <li>Your future charts will show consistency over time.</li>
                        <li>Workout type distribution will help balance training.</li>
                        <li>Date filters will make it easier to review weekly or monthly progress.</li>
                    </ul>
                </Card>
            </Section>
        </main>
    );
}