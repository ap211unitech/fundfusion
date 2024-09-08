import { Campaign } from "./campaign";

export const Landing = () => {
  return (
    <div className="xl:container px-4 sm:px-10 mx-auto">
      <h1 className="text-2xl my-8">All Campaigns</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 5 }).map((_, i) => {
          return <Campaign key={i} />;
        })}
      </div>
    </div>
  );
};
