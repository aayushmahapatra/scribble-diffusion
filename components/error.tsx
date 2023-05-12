import { FC } from "react";

interface IFooter {
  error: boolean;
}

const Footer: FC<IFooter> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mx-auto w-full">
      {error && <p className="bold text-red-500 pb-5">{error}</p>}
    </div>
  );
};

export default Footer;
