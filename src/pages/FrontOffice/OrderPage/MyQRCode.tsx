import { useEffect, useState } from "react";
import QRCode from "qrcode";

type MyQRCodeProps = {
  value: string;
  size?: number;
  margin?: number;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  darkColor?: string;
  lightColor?: string;
};

export default function MyQRCode({
  value,
  size = 150,
  margin = 2,
  errorCorrectionLevel = "H",
  darkColor = "#000000",
  lightColor = "#FFFFFF",
}: MyQRCodeProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (!value) return;

    QRCode.toDataURL(value, {
      width: size,
      margin,
      errorCorrectionLevel,
      color: { dark: darkColor, light: lightColor },
    })
      .then(setQrDataUrl)
      .catch(console.error);
  }, [value, size, margin, errorCorrectionLevel, darkColor, lightColor]);

  if (!qrDataUrl) return <p>Chargement du QR code...</p>;

  return <img src={qrDataUrl} alt="QR Code" style={{ width: size, height: size }} />;
}