import React from "react";
import { Reveal } from "./Reveal";

export const AutoReveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;

        return (
          <Reveal delay={i * 0.1}>
            <div className="w-full">
              {child}
            </div>
          </Reveal>
        );
      })}
    </>
  );
};
