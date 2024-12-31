"use client";

import { useMemo, useState } from "react";
import classNames from "classnames";

type TDescription = {
  value: string;
  maxLength?: number;
  className?: string;
};

export const Description = ({
  value,
  maxLength = 400,
  className,
}: TDescription) => {
  const [expanded, setExpand] = useState(false);

  const isLonger = useMemo(
    () => value?.length && value?.length > maxLength,
    [maxLength, value?.length],
  );

  if (isLonger) {
    return (
      <div
        className={classNames(
          "h-max w-full whitespace-pre-wrap break-all",
          className,
        )}
      >
        {expanded && value}
        {!expanded && `${value?.substring(0, maxLength)}....`}
        <span
          className="w-max cursor-pointer whitespace-nowrap pl-1 font-semibold text-black underline-offset-2 hover:underline dark:text-secondary"
          onClick={() => setExpand(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </span>
      </div>
    );
  }
  return (
    <div
      className={classNames(
        "h-max w-full whitespace-pre-wrap break-all",
        className,
      )}
    >
      {value}
    </div>
  );
};
