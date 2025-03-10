import { FC, useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Undo as UndoIcon, Trash as TrashIcon } from "lucide-react";

interface ICanvas {
  startingPaths: any;
  onScribble: any;
  scribbleExists: any;
  setScribbleExists: any;
}

const Canvas: FC<ICanvas> = ({
  startingPaths,
  onScribble,
  scribbleExists,
  setScribbleExists,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Hack to work around Firfox bug in react-sketch-canvas
    // https://github.com/vinothpandian/react-sketch-canvas/issues/54
    document
      .querySelector("#react-sketch-canvas__stroke-group-0")
      ?.removeAttribute("mask");

    loadStartingPaths();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadStartingPaths() {
    await canvasRef.current.loadPaths(startingPaths);
    setScribbleExists(true);
    onChange();
  }

  const onChange = async () => {
    const paths = await canvasRef.current.exportPaths();
    localStorage.setItem("paths", JSON.stringify(paths, null, 2));

    if (!paths.length) return;

    setScribbleExists(true);

    const data = await canvasRef.current?.exportImage("png");
    onScribble(data);
  };

  const undo = () => {
    canvasRef.current.undo();
  };

  const reset = () => {
    setScribbleExists(false);
    canvasRef.current.resetCanvas();
  };

  return (
    <div className="relative">
      {scribbleExists || (
        <div>
          <div className="absolute grid w-full h-full p-3 place-items-center pointer-events-none text-xl">
            <span className="opacity-40">Draw something here.</span>
          </div>
        </div>
      )}

      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square border-none cursor-crosshair hover:shadow-md"
        strokeWidth={4}
        strokeColor="black"
        onChange={onChange}
        withTimestamp={true}
      />

      {scribbleExists && (
        <div className="animate-in fade-in duration-700 text-left">
          <button
            className="lil-button hover:opacity-80 active:opacity-100 active:bg-[#9bf96e]"
            onClick={undo}
          >
            <UndoIcon className="icon" />
            Undo
          </button>
          <button
            className="lil-button hover:opacity-80 active:opacity-100 active:bg-[#9bf96e]"
            onClick={reset}
          >
            <TrashIcon className="icon" />
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default Canvas;
