import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/history", label: "History" },
  { href: "/pricing", label: "Pricing" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-brandNavy">
          Wekabets
        </Link>

        <nav className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brandGreen">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2">
          <Link href="/auth" className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium">
            Login
          </Link>
          <Link href="/auth" className="rounded-md bg-brandNavy px-3 py-2 text-sm font-medium text-white">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
