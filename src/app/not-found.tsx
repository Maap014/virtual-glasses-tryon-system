import Link from "next/link";
import { AppLayout } from "./appLayout";

const NotFound = () => {
  return (
    <AppLayout className="p-0! min-h-0!" fotterClassName="mt-0!">
      <section className="h-[calc(100vh-189px)] 1024:h-[calc(100vh-167px)] flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <p className="text-primary-dark text-sm uppercase tracking-[0.3em] mb-4 pt-5">
            404 Error
          </p>

          <h1 className="text-6xl 768:text-8xl font-bold leading-none text-foreground">
            PAGE
            <br />
            NOT FOUND
          </h1>

          <p className="text-foreground/70 mt-6 text-lg leading-relaxed">
            The page you are looking for does not exist or may have been moved.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-primary hover:bg-primary-dark transition-colors rounded-full px-8 py-4 text-sm font-medium"
            >
              Back Home
            </Link>

            <Link
              href="/shop"
              className="border border-border hover:border-foreground transition-colors rounded-full px-8 py-4 text-sm font-medium"
            >
              Explore Shop
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="w-4 h-4 rounded-full bg-primary" />

            <div className="w-24 h-0.5 bg-border" />

            <div className="w-4 h-4 rounded-full border border-primary" />
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default NotFound;
