// Character sets:
// 1: UTF-8 - Recommended
// 2: ISO 8859-1
// 3: ISO 8859-2
// 4: ISO 8859-4
// 5: ISO 8859-5
// 6: ISO 8859-7
// 7: ISO 8859-10
// 8: ISO 8859-15

// Versions:
// V1: `001`
// V2: `002`

const serializedIban = (iban: string) => {
  const ibanParts = iban.split(" ");
  return ibanParts.join("");
};

const SERVICE_TAG = "BCD";
const VERSION_V = "002";
const CHARACTER_SET = 1;
const IDENTIFICATION_CODE = "SCT";

// name: 'Red Cross of Belgium',
// 	iban: 'BE72000000001616',
// 	amount: 123.45,
// 	unstructuredReference: 'Urgency fund',
// 	information: 'Sample QR code'

export const generateQRCode = (data: {
  bic: string;
  name: string;
  iban: string;
  amount: number;
  purposeCode: string;
  structuredReference: string;
  unstructuredReference: string;
  information: string;
}) => {
  const {
    bic,
    name,
    iban,
    amount,
    purposeCode,
    structuredReference,
    unstructuredReference,
    information,
  } = data;

  return [
    SERVICE_TAG,
    VERSION_V,
    CHARACTER_SET,
    IDENTIFICATION_CODE,
    bic,
    name,
    serializedIban(iban),
    amount === null ? "" : "EUR" + amount.toFixed(2),
    purposeCode || "",
    structuredReference || "",
    unstructuredReference || "",
    information || "",
  ].join("\n");
};
