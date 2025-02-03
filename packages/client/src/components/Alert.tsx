export interface AlertProps {
  message: string;
}

export const Alert = (props: AlertProps) => {
  return (
    <div className="alert alert-danger" role="alert">
      {props.message}
    </div>
  );
};
