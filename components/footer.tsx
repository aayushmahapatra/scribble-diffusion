import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full my-8">
      <div className="text-center lil-text mt-8">
        Powered by{" "}
        <Link href="https://github.com/lllyasviel/ControlNet" target="_blank">
          ControlNet
        </Link>{" "}
        by{" "}
        <Link
          href="https://lllyasviel.github.io/Style2PaintsResearch/lvmin"
          target="_blank"
        >
          Lyumin Zhang
        </Link>
        ,{" "}
        <Link
          href="https://replicate.com/rossjillian/controlnet?utm_source=project&utm_campaign=scribblediffusion"
          target="_blank"
        >
          Replicate
        </Link>
        , and{" "}
        <Link href="https://spheron.network/" target="_blank">
          Spheron
        </Link>
        .
      </div>
    </footer>
  );
};

export default Footer;
