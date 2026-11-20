"use client";

import { useGSAP, type useGSAPConfig } from "@gsap/react";
import { registerGsap } from "@/lib/animations";

registerGsap();

type GsapCallback = Parameters<typeof useGSAP>[0];

export function useGsap(callback: GsapCallback, config: useGSAPConfig = {}) {
  return useGSAP(callback, config);
}
