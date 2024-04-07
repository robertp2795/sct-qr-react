import { QRMain } from "./generate-main";
import { MainHeader } from "./header";

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
      <div className="relative flex min-h-dvh flex-col">
        <MainHeader />
        <QRMain />
      </div>
    </div>
  );
};
