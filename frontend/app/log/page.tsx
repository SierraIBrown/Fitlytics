"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkout } from "@/lib/api";
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const router = useRouter();

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ){
        const { name, value } = e.target;
        
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFieldErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if (isSubmitting) return;

        setError("");
        setSuccess("");

        const errors = validateForm();
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0){
            setError("Please fix the highlighted fields.");
            return;
        }

        const payload = {
            date: form.date,
            type: form.type,
            durationMin: Number(form.durationMin),
            ...(form.distanceMi ? { distanceMi: Number(form.distanceMi) } : {}),
            ...(form.sets ? { sets: Number(form.sets) } : {}),
            ...(form.reps ? { reps: Number(form.reps) } : {}),
            ...(form.weightLb ? { weightLb: Number(form.weightLb) } : {}),
            ...(form.notes.trim() ? { notes: form.notes.trim() } : {}),
        };

        try{
            setIsSubmitting(true);
            await createWorkout(payload);
            setSuccess("Workout saved successfully.");
            setForm(initialForm);
            router.push("/dashboard");
            router.refresh();
        } catch(err){
            console.error(err);
            setError(err instanceof Error ? err.message : "Failed to save workout.");
        } finally{
            setIsSubmitting(false);
        }
    }

    function validateForm(){
        const errors: Record<string, string> = {};

        if(!form.date){
            errors.date = "Date is required";
        }

        if(!form.durationMin){
            errors.durationMin = "Duration is required.";
        } else if(Number(form.durationMin) <= 0){
            errors.durationMin = "Duration must be greater than 0.";
        }

        if(form.type === "run" && form.distanceMi && Number(form.distanceMi) < 0){
            errors.distanceMi = "Distance cannot be negative.";
        }

        if(form.type === "strength"){
            if(form.sets && Number(form.sets) < 0){
                errors.sets = "Sets cannot be negative.";
            }
            if(form.reps && Number(form.reps) < 0){
                errors.reps = "Reps cannot be negative.";
            }
            if(form.weightLb && Number(form.weightLb) < 0){
                errors.weightLb = "Weight cannot be negative.";
            }
        }

        return errors;
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
                        <Input label="Date" id="date" name="date" type="date" value={form.date} onChange={handleChange} error={fieldErrors.date} required />
                        <Input label="Duration (minutes)" id="durationMin" name="durationMin" type="number" min="1" value={form.durationMin} onChange={handleChange} error={fieldErrors.durationMin} required />
                    </div>

                    {showRunFields && (
                        <Input label="Distance (miles)" id="distanceMi" name="distanceMi" type="number" step="0.1" min="0" value={form.distanceMi} onChange={handleChange} error={fieldErrors.distanceMi} required />
                    )}

                    {showStrengthFields && (
                        <div className="grid gap-4 md:grid-cols-3">
                            <Input label="Sets" id="sets" name="sets" type="number" min="0" value={form.sets} onChange={handleChange} error={fieldErrors.sets} required />
                            <Input label="Reps" id="reps" name="reps" type="number" min="0" value={form.reps} onChange={handleChange} error={fieldErrors.reps} required />
                            <Input label="Weight (lb)" id="weightLb" name="weightLb" type="number" min="0" value={form.weightLb} onChange={handleChange} error={fieldErrors.weightLb} required />
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

                    {error && (
                        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
                            {error}
                        </p>
                    )}

                    {success && (
                        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
                            {success}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Workout"}</Button>
                        <Link href="/dashboard">
                            <Button variant="secondary" type="button" disabled={isSubmitting}>
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </form>
            </Card>
        </main>
    );
}