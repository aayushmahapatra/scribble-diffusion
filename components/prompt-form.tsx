import { FC, useEffect, useState } from "react";

interface IPromptForm {
  initialPrompt: string;
  onSubmit: (e: any) => Promise<void>;
  isProcessing?: boolean;
  scribbleExists: boolean;
}

const PromptForm: FC<IPromptForm> = ({
  initialPrompt,
  onSubmit,
  scribbleExists,
}) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt);

  const disabled = !(scribbleExists && prompt?.length > 0);

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">
      <div className="flex mt-4">
        <input
          id="prompt-input"
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="block w-full flex-grow rounded-md bg-gray-300 border border-black mr-2"
        />

        <button
          className={`bg-[#9bf96e] border border-black rounded-md text-small inline-block px-5 py-3 flex-none hover:opacity-80 active:opacity-100 active:bg-[#9bf96e] ${
            disabled ? "opacity-20 cursor-not-allowed	" : ""
          }`}
          type="submit"
          disabled={disabled}
        >
          Go
        </button>
      </div>
    </form>
  );
};

export default PromptForm;
