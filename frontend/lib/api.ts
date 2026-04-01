const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function request<T>(path: string, options?: RequestInit): Promise<T>{
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers:{
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        ...options,
    });

    if(!response.ok){
        let errorMessage = "Request Failed";

        try{
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
        } catch {
            //ignore JSON parse failure
        }

        throw new Error(errorMessage);
    }

    if(response.status === 204){
        return undefined as T;
    }

    return response.json();
}

export type WorkoutType = "run" | "strength" | "other";

export type Workout = {
    id: string;
    date: string;
    type: WorkoutType;
    durationMin: number;
    distanceMi?: number;
    sets?: number;
    reps?: number;
    weightLb?: number;
    notes?: string;
};

export type CreateWorkoutInput = Omit<Workout, "id">;

export async function getHealth(){
    return request<{ status: string }>("/health");
}

export async function getWorkouts(params?: {
    type?: WorkoutType;
    from?: string;
    to?: string;
}){
    const searchParams = new URLSearchParams();

    if(params?.type) searchParams.set("type", params.type);
    if(params?.from) searchParams.set("from", params.from);
    if(params?.to) searchParams.set("to", params.to);

    const query = searchParams.toString();
    const path = query ? `/workouts?${query}` : "/workouts";

    return request<Workout[]>(path);
}

export async function createWorkout(input: CreateWorkoutInput){
    return request<Workout>("/workouts", {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export async function updateWorkout(id: string, input: CreateWorkoutInput){
    return request<Workout>(`/workouts/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
    });
}

export async function deleteWorkout(id: string){
    return request<void>(`/workouts/${id}`, {
        method: "DELETE",
    });
}