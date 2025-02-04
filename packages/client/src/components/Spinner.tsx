export interface SpinnerProps {
  message: string;
}

export const Spinner = (props: SpinnerProps) => {
  return (
    <div className="spinner-border p-3 mx-auto d-flex" role="status">
      <span className="sr-only">{props.message}</span>
    </div>
  );
};
