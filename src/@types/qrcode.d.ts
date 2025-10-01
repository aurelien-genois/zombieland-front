declare module "qrcode" {
  type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

  interface ToDataURLOptions {
    errorCorrectionLevel?: ErrorCorrectionLevel;
    type?: "image/png" | "image/jpeg";
    width?: number;
    margin?: number;
    color?: { dark?: string; light?: string };
  }

  export function toDataURL(text: string, options?: ToDataURLOptions): Promise<string>;
}