import { ThemeTogle } from "./components/theme-toggle";
import { Icons } from "./components/icons";

export const MainHeader = () => {
  return (
    <header className="bg-background border-b border-border p-5 flex flex-col sm:flex-row justify-between gap-5 items-center">
      <div className="logo flex justify-between w-fit gap-3 items-center">
        <div>
          <Icons.qr />
        </div>
        <h1 className="text-xl">SEPA Payment QR Code Generator</h1>
      </div>
      <ThemeTogle />
    </header>
  );
};
