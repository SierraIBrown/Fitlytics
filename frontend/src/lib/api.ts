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