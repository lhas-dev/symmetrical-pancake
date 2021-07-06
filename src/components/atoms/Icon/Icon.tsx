import React, { Suspense, useEffect, useState } from "react";

interface IconProps {
  src: string;
}

export const Icon = ({ src }: IconProps) => {
  const [path, setPath] = useState("");

  useEffect(() => {
    const dynamicPath = () => import(`../../../icons/${src}.svg`);
    const onReady = async () => {
      try {
        const response = await dynamicPath();
  
        setPath(response.default);
      } catch (e) {
        setPath("");
      }
    };
    
    onReady();
  }, [src]);

  return (
    <Suspense fallback={<div />}>
      <img src={path} className={src} alt="Icon" />
    </Suspense>
  );
};
