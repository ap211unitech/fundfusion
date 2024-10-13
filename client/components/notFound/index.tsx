import { Unbounded } from "next/font/google";
import { Circle, TriangleAlert } from "lucide-react";
import classNames from "classnames";
import Link from "next/link";

const font = Unbounded({
  subsets: ["cyrillic-ext"],
  weight: ["200", "300", "400"],
});

export const NotFound = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:gap-16 py-10">
      <div>
        <TriangleAlert className="w-[18rem] h-[18rem] xl:w-[25rem] xl:h-[25rem] stroke-primary" />
      </div>
      <div className="mt-6 space-y-6 flex flex-col items-center md:items-start">
        <h1
          className={classNames(
            "text-8xl font-semibold tracking-widest",
            font.className
          )}
        >
          404
        </h1>
        <h2 className="text-2xl sm:text-4xl text-primary">
          Oops! Page Not Found
        </h2>
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <div className="text-center md:text-left">
            It looks like the page you&apos;re trying to reach doesn&apos;t
            exist or has been moved.
          </div>
          <div className="flex flex-col gap-3">
            <p>But you don&apos;t worry, you can :</p>
            <ul className="ml-6 space-y-1">
              <li className="flex items-center gap-2">
                <Circle className="w-2 h-2 fill-primary stroke-primary" />
                Go back to the
                <Link
                  href="/"
                  className="text-primary hover:underline underline-offset-2"
                >
                  Home Page
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Circle className="w-2 h-2 fill-primary stroke-primary" />
                Check out all
                <Link
                  href="/"
                  className="text-primary hover:underline underline-offset-2"
                >
                  Active Campaigns
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
