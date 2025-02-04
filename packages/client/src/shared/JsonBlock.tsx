export const JsonBlock = (props: { obj: object }) => {
  const text = JSON.stringify(props.obj, null, 2);
  return (
    <pre>
      <code>{text}</code>
    </pre>
  );
};
