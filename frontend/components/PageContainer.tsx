import { ReactNode } from "react";

type PageContainerProps = {
    title: string;
    children: ReactNode;
};

export default function PageContainer({
    title,
    children,
}: PageContainerProps){
    return (
        <main className="mx-auto max-w-6xl px-6 py-8">
            <h1 className="mb-6 text-3xl font-bold">{title}</h1>
            {children}
        </main>
    );
}