import { Campaign } from "./campaign";

export const Landing = () => {
  return (
    <div className="space-y-10 py-12">
      <h1 className="text-2xl font-medium">All Campaigns</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 5 }).map((_, i) => {
          return <Campaign key={i} />;
        })}
      </div>
    </div>
  );
};
