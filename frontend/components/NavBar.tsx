import Link from "next/link";

const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/log", label: "Log Workout" },
    { href: "/progress", label: "Progress" },
    { href: "/account", label: "Account" },
];

export default function NavBar(){
    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-xl font-bold">
                    Fitlytics
                </Link>

                <nav className="flex gap-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="text-gray-700 transition hover:text-black">
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}