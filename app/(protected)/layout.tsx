// import { createClient } from "@/utils/supabase/server";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const supabase = createClient()
  // const { data: user, error } = await supabase.auth.getUser();
  // console.log('user', user)
  // console.log('errrors', error)
  return<>{children}</>;
}
