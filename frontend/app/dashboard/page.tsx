"use client";
import { useEffect, useMemo, useState } from "react";
import { getWorkouts, type Workout } from "@/lib/api";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import StatCard from "@/components/dashboard/StatCard";

const suggestedWorkouts = [
    {
        title: "Easy Run",
        description: "A light 20-30 minute run to build consistency.",
    },
    {
        title: "Strength Session",
        description: "Focus on upper body and core for 30-40 minutes.",
    },
    {
        title: "Mobility / Recovery",
        description: "Stretching and movement work to support recovery.",
    },
];

export default function DashboardPage(){
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
            } catch (err){
                console.error(err);
                setError("Failed to load workouts.");
            } finally {
                setLoading(false);
            }
        }

        loadWorkouts();
    }, []);

    const stats = useMemo(() => {
        const totalWorkouts = workouts.length;

        const totalMinutes = workouts.reduce((sum, workout) => {
            return sum + workout.durationMin;
        }, 0);

        const mostRecentWorkout = workouts.length > 0 ? [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] : null;

        const thisWeek = workouts.filter((workout) => {
            const workoutDate = new Date(workout.date);
            const now = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);

            return workoutDate >= sevenDaysAgo && workoutDate <= now;
        }).length;

        return{
            totalWorkouts,
            totalMinutes,
            thisWeek,
            mostRecentWorkout,
        };
    }, [workouts]);

    return(
        <main className="mx-auto max-w-6xl px-6 py-8">
            <PageHeader 
                title="Dashboard" 
                subtitle="Track your recent activity and stay on top of your training." 
                actions={
                    <Link href="/log">
                        <Button>Log Workout</Button>
                    </Link>
                }
            />

            <Section title="Quick Stats">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard label="Workouts This Week" value={loading ? "..." : stats.thisWeek}/>
                    <StatCard label="Total Minutes" value={loading ? "...": stats.totalMinutes}/>
                    <StatCard label="Current Streak" value={loading ? "...": stats.totalMinutes}/>
                    <StatCard label="Most Recent" value={loading ? "...": stats.mostRecentWorkout ? stats.mostRecentWorkout.type : "None"} trend={stats.mostRecentWorkout ? new Date(stats.mostRecentWorkout.date) : undefined}/>
                </div>
            </Section>

            {error && (
                <p style={{ color: "var(--color-error)", marginBottom: "20px" }}>
                    {error}
                </p>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                <Section title="Recent Workouts" subtitle="Your latest logged sessions">
                    {loading ? (
                        <Card>
                            <p>Loading workouts...</p>
                        </Card>
                    ) : workouts.length === 0 ? (
                        <Card>
                            <p style={{ color: "var(--color-text-secondary)" }}>
                                No workouts yet. Log your first workout to get started.
                            </p>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {[...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3).map((workout) => (
                                <Card key={workout.id}>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 style={{ fontSize: "20px", fontWeight: 600 }}>
                                                {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                                            </h3>
                                            <p style={{ color: "var(--color-text-secondary)", marginTop: "5px", }}>
                                                {workout.durationMin} min
                                                {workout.distanceMi ? ` • ${workout.distanceMi} mi` : ""}
                                            </p>
                                        </div>
                                        <span style={{ fontSize: "14px", color: "var(--color-text-secondary)", }}>
                                            {new Date(workout.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </Section>

                <Section title="Suggested Workouts" subtitle="A few ideas to help plan your next sessions">
                    <div className="space-y-4">
                        {suggestedWorkouts.map((workout) => (
                            <Card key={workout.title}>
                                <h3 style={{ fontSize: "20px", fontWeight: 600 }}>
                                    {workout.title}
                                </h3>
                                <p style={{ color: "var(--color-text-secondary)", marginTop: "10px", }}>
                                    {workout.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </Section>
            </div>

            <Section title="Progress Preview" subtitle="A quick look at where future visualization will go">
                <Card title="Weekly Activity">
                    <p style={{ color: "var(--color-text-secondary)" }}>
                        Progress charts and workout trends will appear here in a future update.
                    </p>
                </Card>
            </Section>
        </main>
    );
}