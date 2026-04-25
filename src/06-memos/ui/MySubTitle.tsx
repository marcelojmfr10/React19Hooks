import { memo } from "react";

interface Props {
  subTitle: string;
  //   callMyApi: (myValue: string) => void;
  callMyApi: () => void;
}

export const MySubTitle = memo(({ subTitle, callMyApi }: Props) => {
  console.log("rerender sub");
  console.log("tarea pesada");
  return (
    <>
      <h6 className="text-2xl font-bold">{subTitle}</h6>

      <button
        onClick={callMyApi}
        className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
      >
        llamar a función
      </button>
    </>
  );
});
