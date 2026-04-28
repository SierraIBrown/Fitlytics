import { useEffect, useMemo, useState } from "react";
import { getWorkouts, type Workout } from "@/lib/api";
import PageHeader from "@/components/layout/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import Select from '@/components/ui/Select';
import Input from "@/components/ui/Input";
import WeeklyWorkoutsLineChart from "@/components/charts/WeeklyWorkoutsLineChart";
import WorkoutTypeBarChart from "@/components/charts/WorkoutTypeBarChart";

export default function ProgressPage(){
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadWorkouts(){
            try{
                setLoading(true);
                setError("");
                const data = await getWorkouts();
                setWorkouts(data);
            } catch(err){
                console.error(error);
                setError("Failed to load workout data.");
            } finally{
                setLoading(false);
            }
        }

        loadWorkouts();
    }, []);

    const weeklyData = useMemo(() => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const counts = days.map((day) => ({
            day,
            count: 0,
        }));

        workouts.forEach((workout) => {
            const date = new Date(workout.date);
            const dayIndex = date.getDay();
            counts[dayIndex].count += 1;
        });

        return[
            counts[1],
            counts[2],
            counts[3],
            counts[4],
            counts[5],
            counts[6],
            counts[0],
        ];
    }, [workouts]);

    const typeData = useMemo(() => {
        const counts: Record<string, number> ={
            Run: 0,
            Strength: 0,
            Other: 0,
        };

        workouts.forEach((workout) => {
            if(workout.type === "run") counts.Run += 1;
            else if(workout.type === "strength") counts.Strength += 1;
            else counts.Other += 1;
        });

        return Object.entries(counts).map(([type, count]) => ({
            type,
            count,
        }));
    }, [workouts]);

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
                        {loading ? (
                            <p>Loading chart...</p>
                        ) : error ? (
                            <p style={{ color: "var (--color-error)" }}>{error}</p>
                        ) : (
                            <WeeklyWorkoutsLineChart data={weeklyData} />
                        )}
                    </Card>

                    <Card title="Workout Type Distribution">
                        {loading ? (
                            <p>Loading chart...</p>
                        ) : error ? (
                            <p style={{ color: "var (--color-error)" }}>{error}</p>
                        ) : (
                            <WorkoutTypeBarChart data={typeData} />
                        )}
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