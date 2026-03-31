"use client";
import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

type WorkoutType = "run" | "strength" | "other"

type FormState = {
    type: WorkoutType;
    date: string;
    durationMin: string;
    distanceMi: string;
    sets: string;
    reps: string;
    weightLb: string;
    notes: string;
};

const initialForm: FormState = {
    type: "run",
    date: "",
    durationMin: "",
    distanceMi: "",
    sets: "",
    reps: "",
    weightLb: "",
    notes: "",
};

export default function LogPage(){
    const [form, setForm] = useState<FormState>(initialForm);
    const [message, setMessage] = useState("");

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ){
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(!form.date || !form.durationMin){
            setMessage("Please fill in all required fields.");
            return;
        }

        setMessage("Workout saved locally for now. Backend submission comes next.");
        console.log("Workout form submitted:", form);
    }

    const showRunFields = form.type === "run";
    const showStrengthFields = form.type === "strength";

    return (
        <main className="mx-auto max-w-3xl px-6 py-8">
            <PageHeader title="Log Workout" subtitle="Add a new workout session to your training history."/>
            
            <Card title="Workout Details">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Select label="Workout Type"
                        id="type"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        options={[
                            { label: "Run", value: "run" },
                            { label: "Strength", value: "strength" },
                            { label: "Other", value: "other" },
                        ]}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                        <Input label="Date" id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
                        <Input label="Duration (minutes)" id="durationMin" name="durationMin" type="number" min="1" value={form.durationMin} onChange={handleChange} required />
                    </div>

                    {showRunFields && (
                        <Input label="Distance (miles)" id="distanceMi" name="distanceMi" type="number" step="0.1" min="0" value={form.distanceMi} onChange={handleChange}/>
                    )}

                    {showStrengthFields && (
                        <div className="grid gap-4 md:grid-cols-3">
                            <Input label="Sets" id="sets" name="sets" type="number" min="0" value={form.sets} onChange={handleChange} />
                            <Input label="Reps" id="reps" type="number" min="0" value={form.reps} onChange={handleChange} />
                            <Input label="Weight (lb)" id="weightLb" name="weightLb" type="number" min="0" value={form.weightLb} onChange={handleChange} />
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="notes" style={{ fontSize: "14px", fontWeight: 500 }}>
                            Notes
                        </label>
                        <textarea 
                            id="notes" 
                            name="notes" 
                            value={form.notes} 
                            onChange={handleChange} 
                            rows={4} 
                            style={{
                                border: "1px solid var(--color-border)",
                                borderRadius: "var(--radius-md)",
                                padding: "10px 15px",
                                backgroundColor: "var(--color-surface)",
                                color: "var(--color-text-primary)",
                            }}
                            placeholder="How did the workout feel?"
                        />
                    </div>

                    {message && (
                        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
                            {message}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                        <Button type="submit">Save Workout</Button>
                        <Link href="/dashboard">
                            <Button variant="secondary" type="button">
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </form>
            </Card>
        </main>
    );
}