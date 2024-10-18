import { RadialGradient } from "../Components/RadialGradient";
import "../CSS/utility.css";

export const Root = ({
  children,
}: {
  queryParam: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <RadialGradient>{children}</RadialGradient>
    </>
  );
};
