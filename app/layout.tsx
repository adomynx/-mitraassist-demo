import './globals.css';

export const metadata = {
  title: 'MitraAssist · Service Certificate Portal',
  description: 'RSA certificate issuance portal — demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
