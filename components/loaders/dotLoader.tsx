import DotLoader from "react-spinners/DotLoader";

interface DotLoaderSpinnerProps {
  loading: boolean;
}

export default function DotLoaderSpinner({ loading }: DotLoaderSpinnerProps) {
  return (
    <div
      className={`fixed inset-0 bg-white bg-opacity-50 z-10 grid place-items-center ${
        loading ? "block" : "hidden"
      }`}
    >
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
}
