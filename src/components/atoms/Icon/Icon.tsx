import React, { Suspense, useEffect, useState } from "react";

interface IconProps {
  src: string;
}

export const Icon = ({ src }: IconProps) => {
  const dynamicPath = () => import(`../../../icons/${src}.svg`);
  const [path, setPath] = useState("");

  const onReady = async () => {
    try {
      const response = await dynamicPath();

      setPath(response.default);
    } catch (e) {
      setPath("");
    }
  };

  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <Suspense fallback={<div />}>
      <img src={path} className={src} alt="Icon" />
    </Suspense>
  );
};
