import React from "react";

interface Props {
  title: string;
}
export const MyTitle = React.memo(({ title }: Props) => {
  console.log("rerender title");
  return <h1 className="text-3xl">{title}</h1>;
});
