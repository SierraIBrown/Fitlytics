"use client";
import { useEffect, useMemo, useState } from "react";
import { getWorkouts, type Workout } from "@/lib/api";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import StatCard from "@/components/dashboard/StatCard";

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

const recentWorkouts = [
    {
        title: "Morning Run",
        details: "30 min, 3.2 mi",
        date: "Today",
    },
    {
        title: "Upper Body Strength",
        details: "45 min, Strength",
        date: "Yesterday",
    },
    {
        title: "Recovery Walk",
        details: "20min, Light cardio",
        date: "2 days ago",
    },
];

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

export default function DashboardPage(){
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
                    <StatCard label="Workouts This Week" value="4" trend="+1 from last week"/>
                    <StatCard label="Total Minutes" value="140" trend="+20 this week"/>
                    <StatCard label="Current Streak" value="3 days" trend="Keep it going"/>
                    <StatCard label="Most Recent" value="Run" trend="Today"/>
                </div>
            </Section>

            <div className="grid gap-6 lg:grid-cols-2">
                <Section title="Recent Workouts" subtitle="Your latest logged sessions">
                    <div className="space-y-4">
                        {recentWorkouts.map((workout) => (
                            <Card key={`${workout.title}-${workout.date}`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 style={{ fontSize: "20px", fontWeight: 600 }}>
                                            {workout.title}
                                        </h3>
                                        <p style={{ color: "var(--color-text-secondary)", marginTop: "5px", }}>
                                            {workout.details}
                                        </p>
                                    </div>
                                    <span style={{ fontSize: "14px", color: "var(--color-text-secondary)",}}>
                                        {workout.date}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
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