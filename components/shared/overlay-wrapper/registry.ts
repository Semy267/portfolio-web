import * as React from "react";
import OvConfirmation, { OvConfirmationProps } from "./ov-confirmation";

export interface OverlayComponentPropsMap {
  ov_confirmation: OvConfirmationProps;
  CONFRIMATION: OvConfirmationProps;
}

export const OVERLAY_REGISTRY: Record<string, React.ComponentType<any>> = {
  ov_confirmation: OvConfirmation,
  CONFRIMATION: OvConfirmation,
};

export type OverlayCode = keyof OverlayComponentPropsMap | (string & {});
