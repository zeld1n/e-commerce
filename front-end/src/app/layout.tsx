import type { Metadata } from "next";
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import './global.css';


export const metadata: Metadata = {
  title: "E-Commerce",
};

type Props = Readonly<{ children: React.ReactNode }>

export default function RootLayout(props: Props) {
  return (
    
    <html lang="en">
      <body className={'flex flex-col min-h-dvh'}>
        <Header/>
        

        <main className={'grow p-[20px]'}>
          {props.children}
        </main>
        
        <Footer/>
      </body>
    </html>
  );
}
