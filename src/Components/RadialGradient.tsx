export const RadialGradient = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="radial-gradient-container">
        <div className="radial-gradient one radial-gradient-dimension"></div>
        <div className="radial-gradient two radial-gradient-dimension"></div>
        <div className="radial-gradient three radial-gradient-dimension"></div>
        <div className="radial-gradient four radial-gradient-dimension"></div>
        <div className="radial-gradient five radial-gradient-dimension"></div>
      </div>
      {children}
    </>
  );
};
