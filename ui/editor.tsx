'use client';

import { cn } from '@/lib/className';
import html2canvas from 'html2canvas';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
// import 'react-quill/dist/quill.snow.css';
import '@/styles/editor.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Editor() {
  const [value, setValue] = useState('');
  const [takeScreenshot, setTakeScreenshot] = useState(false);
  const quillRef = useRef<any>(null);

  // memoize the date
  const date = useMemo(
    () =>
      new Date().toLocaleString('locale', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    [],
  );

  // Listen for Ctrl+S and call handleDownload
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleDownload();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const contentRef = useRef(null);

  // Quill modules configuration - no toolbar, only keyboard shortcuts
  const modules = useMemo(
    () => ({
      toolbar: false, // Hide the toolbar
      keyboard: {
        bindings: {
          bold: {
            key: 'B',
            ctrlKey: true,
            handler: function (this: any) {
              const format = this.quill.getFormat();
              this.quill.format('bold', !format.bold);
            },
          },
          italic: {
            key: 'I',
            ctrlKey: true,
            handler: function (this: any) {
              const format = this.quill.getFormat();
              this.quill.format('italic', !format.italic);
            },
          },
          underline: {
            key: 'U',
            ctrlKey: true,
            handler: function (this: any) {
              const format = this.quill.getFormat();
              this.quill.format('underline', !format.underline);
            },
          },
        },
      },
    }),
    [],
  );

  // Formats we want to allow
  const formats = ['bold', 'italic', 'underline'];

  const playShutterSound = async () => {
    const audioContext = new window.AudioContext();
    const response = await fetch('/static/camera.mp3');
    const audioData = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(audioData);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  };

  const handleDownload = async () => {
    setTakeScreenshot(true);
    await new Promise((r) => setTimeout(r, 200));
    await playShutterSound();
    if (contentRef.current) {
      await html2canvas(contentRef.current, {
        backgroundColor: null, // Preserve the background color
        scale: 2, // Higher quality
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'viewport-image.png';
        link.click();
      });
    }
    setTakeScreenshot(false);
  };

  useEffect(() => {
    if (takeScreenshot) {
      const timer = setTimeout(() => {
        setTakeScreenshot(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [takeScreenshot]);

  // Get clean content for display (remove empty <p> tags)
  const getCleanContent = () => {
    if (!value || value === '<p><br></p>' || value === '<p></p>') {
      return '\u00A0'; // Non-breaking space for empty content
    }
    return value;
  };

  return (
    <>
      {takeScreenshot && <div className="flash"></div>}

      <div
        className={cn(
          'flex flex-col gap-16 bg-white dark:bg-gray-900',
          takeScreenshot ? 'screenshot-container' : 'mx-auto w-full max-w-2xl',
        )}
        ref={contentRef}
      >
        <div className="text-quaternary space-y-4">
          <p>~{date}</p>
          <div className="text-quaternary border-t border-dashed border-gray-200 dark:border-gray-700 dark:text-gray-600"></div>
        </div>

        {/* Show Quill editor for editing, and rendered HTML for screenshot */}
        {!takeScreenshot ? (
          <div className="min-h-[120px] w-full">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
              placeholder="Write something..."
            />
          </div>
        ) : (
          <div
            className={cn(
              'screenshot-content min-h-[120px] w-full px-0 py-2 text-lg font-normal leading-relaxed',
            )}
            style={{ paddingTop: '8px', paddingBottom: '8px' }}
            dangerouslySetInnerHTML={{ __html: getCleanContent() }}
          />
        )}
      </div>

      {!takeScreenshot && (
        <div className="mx-auto mt-8 max-w-2xl">
          <button onClick={handleDownload} className="text-quaternary text-xs">
            Take Screenshot
          </button>
        </div>
      )}
    </>
  );
}

// 'use client';

// import { cn } from '@/lib/className';
// import html2canvas from 'html2canvas';
// import dynamic from 'next/dynamic';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import 'react-quill/dist/quill.snow.css';
// import '@/styles/editor.css';

// // Dynamically import ReactQuill to avoid SSR issues
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// export default function Editor() {
//   const [value, setValue] = useState('');
//   const [takeScreenshot, setTakeScreenshot] = useState(false);
//   const quillRef = useRef<any>(null);

//   // memoize the date
//   const date = useMemo(
//     () =>
//       new Date().toLocaleString('locale', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//       }),
//     [],
//   );

//   // Listen for Ctrl+S and call handleDownload
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
//         e.preventDefault();
//         handleDownload();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   const contentRef = useRef(null);

//   // Quill modules configuration - no toolbar, only keyboard shortcuts
//   const modules = useMemo(
//     () => ({
//       toolbar: false, // Hide the toolbar
//       keyboard: {
//         bindings: {
//           bold: {
//             key: 'B',
//             ctrlKey: true,
//             handler: function (this: any) {
//               const format = this.quill.getFormat();
//               this.quill.format('bold', !format.bold);
//             },
//           },
//           italic: {
//             key: 'I',
//             ctrlKey: true,
//             handler: function (this: any) {
//               const format = this.quill.getFormat();
//               this.quill.format('italic', !format.italic);
//             },
//           },
//           underline: {
//             key: 'U',
//             ctrlKey: true,
//             handler: function (this: any) {
//               const format = this.quill.getFormat();
//               this.quill.format('underline', !format.underline);
//             },
//           },
//         },
//       },
//     }),
//     [],
//   );

//   // Formats we want to allow
//   const formats = ['bold', 'italic', 'underline'];

//   const playShutterSound = async () => {
//     const audioContext = new window.AudioContext();
//     const response = await fetch('/static/camera.mp3');
//     const audioData = await response.arrayBuffer();
//     const audioBuffer = await audioContext.decodeAudioData(audioData);
//     const source = audioContext.createBufferSource();
//     source.buffer = audioBuffer;
//     source.connect(audioContext.destination);
//     source.start();
//   };

//   const handleDownload = async () => {
//     setTakeScreenshot(true);
//     await new Promise((r) => setTimeout(r, 200));
//     await playShutterSound();
//     if (contentRef.current) {
//       await html2canvas(contentRef.current, {
//         backgroundColor: null, // Preserve the background color
//         scale: 2, // Higher quality
//         useCORS: true,
//       }).then((canvas) => {
//         const link = document.createElement('a');
//         link.href = canvas.toDataURL('image/png');
//         link.download = 'viewport-image.png';
//         link.click();
//       });
//     }
//     setTakeScreenshot(false);
//   };

//   useEffect(() => {
//     if (takeScreenshot) {
//       const timer = setTimeout(() => {
//         setTakeScreenshot(false);
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [takeScreenshot]);

//   // Get clean content for display (remove empty <p> tags)
//   const getCleanContent = () => {
//     if (!value || value === '<p><br></p>' || value === '<p></p>') {
//       return '\u00A0'; // Non-breaking space for empty content
//     }
//     return value;
//   };

//   return (
//     <>
//       {takeScreenshot && <div className="flash"></div>}

//       <div
//         className={cn(
//           'flex flex-col gap-16 bg-white dark:bg-gray-900',
//           takeScreenshot
//             ? 'm-16 max-w-3xl rounded-lg p-24 shadow-lg'
//             : 'mx-auto w-full max-w-2xl',
//         )}
//         ref={contentRef}
//         style={
//           takeScreenshot
//             ? {
//                 minHeight: '400px',
//                 margin: '64px',
//                 padding: '96px',
//                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//               }
//             : {}
//         }
//       >
//         <div className="text-quaternary space-y-4">
//           <p>~{date}</p>
//           <div className="text-quaternary border-t border-dashed border-gray-200 dark:border-gray-700 dark:text-gray-600"></div>
//         </div>

//         {/* Show Quill editor for editing, and rendered HTML for screenshot */}
//         {!takeScreenshot ? (
//           <div className="min-h-[120px] w-full">
//             <ReactQuill
//               ref={quillRef}
//               theme="snow"
//               value={value}
//               onChange={setValue}
//               modules={modules}
//               formats={formats}
//               placeholder="Write something..."
//             />
//           </div>
//         ) : (
//           <div
//             className={cn(
//               'screenshot-content min-h-[120px] w-full px-0 py-2 text-lg font-normal leading-relaxed',
//             )}
//             dangerouslySetInnerHTML={{ __html: getCleanContent() }}
//           />
//         )}
//       </div>

//       {!takeScreenshot && (
//         <div className="mx-auto mt-8 max-w-2xl">
//           <button onClick={handleDownload} className="text-quaternary text-xs">
//             Take Screenshot
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

// The Below code used Textarea instead of ReactQuill

// 'use client';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import html2canvas from 'html2canvas';
// import { cn } from '@/lib/className';
// export default function Editor() {
//   const [value, setValue] = useState('');
//   const [takeScreenshot, setTakeScreenshot] = useState(false);
//   // memoize the date
//   const date = useMemo(
//     () =>
//       new Date().toLocaleString('locale', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//       }),
//     [],
//   );
//   const contentRef = useRef(null);
//   const playShutterSound = async () => {
//     const audioContext = new window.AudioContext();
//     const response = await fetch('/static/camera.mp3');
//     const audioData = await response.arrayBuffer();
//     const audioBuffer = await audioContext.decodeAudioData(audioData);
//     const source = audioContext.createBufferSource();
//     source.buffer = audioBuffer;
//     source.connect(audioContext.destination);
//     source.start();
//   };
//   const handleDownload = async () => {
//     setTakeScreenshot(true);
//     await new Promise((r) => setTimeout(r, 200));
//     await playShutterSound();
//     if (contentRef.current) {
//       await html2canvas(contentRef.current).then((canvas) => {
//         const link = document.createElement('a');
//         link.href = canvas.toDataURL('image/png');
//         link.download = 'viewport-image.png';
//         link.click();
//       });
//     }
//     setTakeScreenshot(false);
//   };
//   useEffect(() => {
//     if (takeScreenshot) {
//       const timer = setTimeout(() => {
//         setTakeScreenshot(false);
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [takeScreenshot]);
//   return (
//     <>
//       {takeScreenshot && <div className="flash"></div>}
//       <div
//         className={cn(
//           'flex flex-col gap-16 bg-white dark:bg-gray-900',
//           takeScreenshot ? 'max-w-3xl p-24' : 'mx-auto w-full max-w-2xl',
//         )}
//         ref={contentRef}
//       >
//         <div className="text-quaternary space-y-4">
//           <p>~{date}</p>
//           <div className="text-quaternary border-t border-dashed border-gray-200 dark:border-gray-700 dark:text-gray-600"></div>
//         </div>
//         {/* Show TEXTAREA for editing,
//             And pre-line DIV for screenshot */}
//         {!takeScreenshot ? (
//           <textarea
//             value={value}
//             onChange={e => setValue(e.target.value)}
//             className={cn(
//               "bg-red-300 dark:bg-gray-900 bg-transparent text-lg font-normal leading-relaxed px-0 py-2 text-gray-500 dark:text-[#ce6161] placeholder:text-gray-500 w-full min-h-[120px] border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent resize-none"
//             )}
//             rows={6}
//             placeholder="Write something..."
//             spellCheck={true}
//             autoFocus
//           />
//         ) : (
//           <div
//             className={cn(
//               "w-full min-h-[120px] text-gray-500 text-lg font-normal leading-relaxed px-0 py-2 whitespace-pre-line"
//             )}
//             // Converts empty string to nbsp for screenshot
//             style={{whiteSpace: 'pre-line'}}
//           >
//             {value || '\u00A0'}
//           </div>
//         )}
//       </div>
//       <div className="mx-auto mt-8 max-w-2xl">
//         <button onClick={handleDownload} className="text-quaternary text-xs">
//           Take Screenshot
//         </button>
//       </div>
//     </>
//   );
// }
// ----------------------------------------------------------------------------------------------------------------------------------
