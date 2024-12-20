import { Circle, TriangleAlert } from "lucide-react";
import Link from "next/link";

export const NoCampaignsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 md:flex-row md:items-start md:gap-16">
      <div>
        <TriangleAlert className="h-[18rem] w-[18rem] stroke-primary xl:h-[25rem] xl:w-[25rem]" />
      </div>
      <div className="mt-6 flex flex-col items-center space-y-6 md:items-start">
        <h2 className="text-2xl text-primary sm:text-4xl">
          Oops! No campaigns found
        </h2>
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <div className="text-center md:text-left">
            It looks like you doesn&apos;t have any active campaigns
          </div>
          <div className="flex flex-col gap-3">
            <p>But you don&apos;t worry, you can :</p>
            <ul className="ml-6 space-y-1">
              <li className="flex items-center gap-2">
                <Circle className="h-2 w-2 fill-primary stroke-primary" />
                <div>
                  <Link
                    href="/createCampaign"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    Create
                  </Link>{" "}
                  new campaign
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Circle className="h-2 w-2 fill-primary stroke-primary" />
                <div>
                  Check out all{" "}
                  <Link
                    href="/"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    Active Campaigns
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
