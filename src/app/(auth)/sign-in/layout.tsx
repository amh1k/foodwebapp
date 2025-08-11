// app/signin/layout.tsx
export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children} {/* No navbar here */}
    </>
  );
}
