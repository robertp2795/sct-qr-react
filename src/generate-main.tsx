import QRCode from "react-qr-code";
import { generateQRCode } from "./lib/generate-qr-code";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useState } from "react";

export const QRMain = () => {
  // Local state for form fields
  const [bic, setBic] = useState("BIC");
  const [name, setName] = useState("NAME");
  const [iban, setIban] = useState("IBAN");
  const [amount, setAmount] = useState(0);
  const [purposeCode, setPurposeCode] = useState("");
  const [structuredReference, setStructuredReference] = useState("");
  const [unstructuredReference, setUnstructuredReference] = useState("");
  const [information, setInformation] = useState("");

  // Separate state for the QR code value
  const [qrCodeValue, setQRCodeValue] = useState("");

  // Function to update QR code state
  const updateQRCode = () => {
    const generatedCode = generateQRCode({
      bic,
      name,
      iban,
      amount,
      purposeCode,
      structuredReference,
      unstructuredReference,
      information,
    });
    setQRCodeValue(generatedCode);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form from submitting in the traditional way
    updateQRCode(); // Update the QR code based on the current form state
  };

  const downloadQR = () => {
    const qrContainer = document.getElementById("qrCodeContainer");
    if (!qrContainer) return; // Exit if QR container is not found.
    const svg = qrContainer.querySelector("svg");
    if (!svg) return; // Exit if SVG is not found
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Exit if canvas context is not found
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      // set up a slug from the name
      downloadLink.download = `${name
        .toLowerCase()
        .replace(/\s/g, "-")}-qr-code`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(decodeURIComponent(encodeURIComponent(svgData)));
  };

  return (
    <main className="pb-8 pt-3 md:pb-12 md:mt-5 lg:pt-10 transition-all">
      <div className="flex flex-col items-center gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full justify-end max-w-3xl px-5"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Label htmlFor="bic">BIC</Label>
            <Input
              id="bic"
              placeholder="NBBEBEBBEOC"
              onChange={(e) => setBic(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Label htmlFor="bic">Name</Label>
            <Input
              id="Name"
              placeholder="Red Cross of Belgium"
              onChange={(e) => setName(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Label htmlFor="bic">IBAN</Label>
            <Input
              id="iban"
              placeholder="BE68539007547034"
              onChange={(e) => setIban(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Label htmlFor="bic">Amount</Label>
            <Input
              id="amount"
              placeholder="55.00"
              onChange={(e) => setAmount(Number(e.target.value))}
              className="max-w-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Label htmlFor="bic">Purpose Code</Label>
            <Input
              id="purposeCode"
              placeholder="CHAR"
              onChange={(e) => setPurposeCode(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Label htmlFor="bic">Remittance Info (Structured)</Label>
            <Input
              id="structuredReference"
              placeholder="RF84REDX123456789012"
              onChange={(e) => setStructuredReference(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Label htmlFor="bic">Remittance Info (Unstructured)</Label>
            <Input
              id="unstructuredReference"
              placeholder="Thank you Red Cross"
              onChange={(e) => setUnstructuredReference(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Label htmlFor="bic">Beneficiary to Originator Information</Label>
            <Input
              id="unstructuredReference"
              placeholder="Donation for disaster relief"
              onChange={(e) => setInformation(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex justify-center pt-5">
            <Button type="submit" className="max-w-md">
              Generate QR Code
            </Button>
          </div>
        </form>
        {qrCodeValue === "" ? null : (
          <div className="flex justify-center flex-col py-5 px-5 bg-white mt-5 rounded-lg ring-2 ring-secondary-foreground/20">
            <div id="qrCodeContainer">
              <QRCode value={qrCodeValue} size={256} />
            </div>
            <Button onClick={() => downloadQR()} className="mt-5">
              Download QR Code
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};
