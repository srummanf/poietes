import Footer from '../ui/Footer';
import './globals.css';
import Providers from './providers';
import { cn } from '@/lib/className';
import AnimateEnter from '@/ui/AnimateEnter';
import RollingMenu from '@/ui/RollingMenu';
import { Metadata } from 'next';
import { Inter, Merriweather, Crimson_Text, Esteban } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400'],
});
const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['600'],
});
const esteban = Esteban({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  authors: [{ name: 'poietes', url: 'https://poietes.dev' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${esteban.className}  ${merriweather.className} ${crimsonText.className}  ${inter.className}`,
          'h-full, min-h-screen, relative w-full',
          'my-4 bg-white dark:bg-gray-900 sm:my-24',
          'motion-reduce:transform-none motion-reduce:transition-none',
        )}
      >
        {/* <div className="absolute z-10 flex flex-col items-center bg-gray-200 dark:bg-gray-800 w-fit space-y-2 rounded-t-2xl rounded-xl p-1.5"></div>
        <div className="p-2  sticky left-5 bottom-5 w-12 h-14 flex text-xs text-white flex-col bg-[#7786FE] bg-[#9CB7FF] hover:bg-opacity-80 transition-all duration-200 items-center space-y-1 cursor-pointer transition-all duration-200 rounded-t-xl rounded-b-lg rounded-lg" />
        <div className="bg-[#ADC9FA] p-2 w-12 h-14 flex flex-col items-center justify-center cursor-crosshair rounded-b-xl rounded-t-lg" />
        <div className="bg-[#CC697D] bg-[#E19DC2]" />
        <div className="bg-[#BC7BFD] bg-[#D5ACFF] font-semibold" /> */}
        {/* <div className="sticky    py-2 z-[1] bottom-2 top-2 md:top-4  mx-auto flex rounded-full justify-center items-center " /> */}
        {/* <div className="px-2 mt-24 pb-24 pt-4"></div> */}
        {/* <article className="prose-quoteless prose prose-neutral dark:prose-invert"></article>
        <div className="select-none pl-2 pt-4 underline underline-offset-[3px] hover:bg-[url('/static/squiggle.svg')] hover:no-underline"></div>
        <div className="flip-card-inner rotate-y-180 flip-card flip-card flip-card-back flip-card-front flex flex h-full h-96 w-1/2 w-1/2  rotate-180 cursor-pointer select-none flex-col items-center items-center justify-center justify-center  gap-0 gap-2 rounded-lg rounded-lg bg-[#1DB954] bg-[#C4150C] bg-[#214D72] bg-[#171515] bg-indigo-400 bg-orange-500 bg-[#00acee] bg-green-500 p-6 p-6 text-center text-lg text-2xl  font-semibold text-gray-100 opacity-70"></div>
        <div className="bg-blue-500 p-4"></div>
        <div className="mx-0.5 h-8 w-8 items-center rounded-full bg-black p-3 text-white dark:bg-white dark:text-black"></div>
        <div className=" ml-0.5 w-3 bg-[#228B22]  bg-[#EC605A] bg-[#EC605A] bg-[#5D0F07] bg-[#F7D358] bg-[#673D13] bg-[#61C167] bg-[#0D2805] bg-[#63C7FA] bg-[#63C7FA] bg-[#102E62] bg-[#EC79F9] bg-[#EC79F9] bg-[#5C0E63] bg-[#9f3e1b] bg-[#FF7F50] text-[#9f3e1b] text-[#5D0F07] text-[#673D13] text-[#102E62] text-[#5C0E63] text-[#0D2805]"></div>
        <div className="prose-quoteless prose prose prose-sm prose-neutral inline-block dark:prose-invert sm:prose lg:prose-lg xl:prose-2xl focus:outline-none"></div>
        <div className="flex h-10 h-10 w-10 w-10 cursor-pointer select-none select-none flex-col items-center items-center space-y-1 rounded-full rounded-full bg-black bg-gray-500 bg-gray-200 p-3 p-3 transition-all duration-200 dark:bg-white dark:bg-gray-700"></div> */}
        {/* <div className="mx-auto max-w-2xl p-4"></div> */}
        {/* <div className="text-quaternary mx-auto mt-4 mt-8 max-w-2xl space-y-4 border-t border-dashed border-gray-200 py-12 py-4 pb-24 pt-4 text-sm dark:border-gray-700 dark:text-gray-600"></div> */}
        {/* <div className="left-1/2 p-24">f</div> */}
        <div className="max-w-3xl"></div>
        <Providers>
          <nav className="fixed bottom-4 left-4 z-10">
            <RollingMenu />
          </nav>
          <AnimateEnter>
            <>
              {children}
              <Footer />
            </>
          </AnimateEnter>
        </Providers>
      </body>
    </html>
  );
}