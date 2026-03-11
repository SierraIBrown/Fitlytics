import PageContainer from "../../components/PageContainer";

export default function DashboardPage(){
    return (
        <PageContainer title="Dashboard">
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-white p-4">Quick Stats</div>
                <div className="rounded-lg border bg-white p-4">Workout Summary</div>
                <div className="rounded-lg border bg-white p-4">Suggestions</div>
            </div>
        </PageContainer>
    );
}