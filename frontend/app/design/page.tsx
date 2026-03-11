export default function DesignPage(){
    const colors = [
        { name: "Primary", value: "var(--color-primary)" },
        { name: "Secondary", value: "var(--color-secondary)" },
        { name: "Background", value: "var(--color-background)" },
        { name: "Text Primary", value: "var(--color-text-primary)" },
        { name: "Text Secondary", value: "var(--color-text-secondary)" },
        { name: "Border", value: "var(--color-border)" },
        { name: "Success", value: "var(--color-success)" },
        { name: "Warning", value: "var(--color-warning)" },
        { name: "Error", value: "var(--color-error)" },
    ];

    return(
        <main style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
            <h1>Fitlytics Design System</h1>

            <h2 style={{ marginTop: "40px" }}>Colors</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 150px)", gap: "20px", marginTop: "20px", }}>
                {colors.map((color) => (
                    <div key={color.name}>
                        <div style={{ height: "80px", borderRadius: "10px", background: color.value, border: "1px solid var(--color-border)", }}/>
                            <p style={{ marginTop: "8px", fontSize: "14px" }}>{color.name}</p>
                        </div>
                ))}
            </div>
        </main>
    );
}