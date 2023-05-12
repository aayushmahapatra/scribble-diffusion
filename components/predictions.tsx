import { FC, Fragment, useEffect, useRef } from "react";
import Loader from "components/loader";
import { Prediction } from "components/prediction";

interface IPredictions {
  predictions: any;
  isProcessing?: boolean;
  submissionCount?: number;
}

const Predictions: FC<IPredictions> = ({ predictions, submissionCount }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (submissionCount > 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [predictions, submissionCount]);

  if (submissionCount === 0) return;

  return (
    <section className="w-full my-10">
      <h2 className="text-center text-3xl font-bold m-6">Results</h2>

      {submissionCount > Object.keys(predictions)?.length && (
        <div className="pb-10 mx-auto w-full text-center">
          <div className="pt-10" ref={scrollRef} />
          <Loader />
        </div>
      )}

      {Object.values(predictions)
        ?.slice()
        .reverse()
        ?.map((prediction: any, index) => (
          <Fragment key={prediction.id}>
            {index === 0 &&
              submissionCount == Object.keys(predictions).length && (
                <div ref={scrollRef} />
              )}
            <Prediction prediction={prediction} />
          </Fragment>
        ))}
    </section>
  );
};

export default Predictions;
