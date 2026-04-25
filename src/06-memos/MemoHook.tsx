import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubTitle } from "./ui/MySubTitle";

// no cambia entre re-render, no es necesario memorizarla
// const handleMyApiCall = (myValue: string) => {
//   console.log("llamar a mi api" + myValue);
// };

export const MemoHook = () => {
  const [title, setTitle] = useState("hola");
  const [subTitle, setSubTitle] = useState("mundo");

  const handleMyApiCall = useCallback(() => {
    console.log("llamando a api ", subTitle);
  }, [subTitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>

      <MyTitle title={title} />
      <MySubTitle subTitle={subTitle} callMyApi={handleMyApiCall} />

      <button
        onClick={() => setTitle("título cambiado " + new Date().getTime())}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        Cambiar título
      </button>
      <button
        onClick={() => setSubTitle("subtítulo cambiado")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        Cambiar subtítulo
      </button>
    </div>
  );
};
