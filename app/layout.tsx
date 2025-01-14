import './globals.css'
import { Figtree } from 'next/font/google'

import Sidebar from "@/components/Sidebar";
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
// import getSongsByUserId from '@/actions/getSongsByUserId';
import Player from '@/components/Player';
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices';
import Navbar from '@/components/Navbar';
import getLikedSongs from '@/actions/getLikedSongs';

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Agoravoci',
  description: 'Blockchain subscriptions for creators',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const userSongs = await getSongsByUserId();
  const likedSongs = await getLikedSongs();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <div className='container mx-auto'>
              <ModalProvider products={products}/>
              <Navbar/>
              <Sidebar songs= {likedSongs}>
                {children}
              </Sidebar>
              <Player/>
            </div>
          </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  )
}
