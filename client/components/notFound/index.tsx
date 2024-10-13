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
    <div className="flex flex-col items-center justify-center py-10 md:flex-row md:items-start md:gap-16">
      <div>
        <TriangleAlert className="h-[18rem] w-[18rem] stroke-primary xl:h-[25rem] xl:w-[25rem]" />
      </div>
      <div className="mt-6 flex flex-col items-center space-y-6 md:items-start">
        <h1
          className={classNames(
            "text-8xl font-semibold tracking-widest",
            font.className,
          )}
        >
          404
        </h1>
        <h2 className="text-2xl text-primary sm:text-4xl">
          Oops! Page Not Found
        </h2>
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <div className="text-center md:text-left">
            It looks like the page you&apos;re trying to reach doesn&apos;t
            exist or has been moved.
          </div>
          <div className="flex flex-col gap-3">
            <p>But you don&apos;t worry, you can :</p>
            <ul className="ml-6 space-y-1">
              <li className="flex items-center gap-2">
                <Circle className="h-2 w-2 fill-primary stroke-primary" />
                Go back to the
                <Link
                  href="/"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  Home Page
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Circle className="h-2 w-2 fill-primary stroke-primary" />
                Check out all
                <Link
                  href="/"
                  className="text-primary underline-offset-2 hover:underline"
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
