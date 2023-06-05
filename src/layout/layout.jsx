export default function TwoColumnLayout({ children }) {
  return (
    <div className="container">
      <div className="row">{children}</div>
    </div>
  );
}
