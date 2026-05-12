import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function AccountPage(){
    return (
        <main className="mx-auto max-w-4xl px-6 py-8">
            <PageHeader title="Account" subtitle="Manage your profile and training preferences." />
            <Section title="Profile">
                <Card>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Input label="Name" id="name" defaultValue="Demo User" />
                        <Input label="email" id="email" defaultValue="demo@fitlytics.app" />
                    </div>
                </Card>
            </Section>

            <Section title="Preferences">
                <Card>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Select label="Preferred Units" id="units" defaultValue="miles" options={[
                            { label: "Miles / Pounds", value: "miles" },
                            { label: "Kilometers / Kilograms", value: "kilometers" },
                        ]} />
                        <Input label="Weekly Workout Goal" id="weeklyGoal" type="number" defaultValue="4" />
                    </div>

                    <div className="mt-5">
                        <Button type="button">Save Preferences</Button>
                    </div>
                </Card>
            </Section>
        </main>
    );
}