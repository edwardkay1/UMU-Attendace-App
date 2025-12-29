import { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
  isActive: boolean;
}

export default function QRScanner({ onScan, onError, isActive }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(true);

  useEffect(() => {
    if (!videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        onScan(result.data);
      },
      {
        onDecodeError: (error) => {
          // Only log errors if they're not "No QR code found" to avoid spam
          const errorMessage = error instanceof Error ? error.message : String(error);
          if (!errorMessage.includes('No QR code found')) {
            console.error('QR Scanner error:', error);
            onError?.(errorMessage);
          }
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    setScanner(qrScanner);

    // Check if camera is available
    QrScanner.hasCamera().then(setHasCamera);

    return () => {
      qrScanner.destroy();
    };
  }, [onScan, onError]);

  useEffect(() => {
    if (!scanner) return;

    if (isActive) {
      scanner.start().catch((error) => {
        console.error('Failed to start scanner:', error);
        onError?.('Failed to access camera. Please check permissions.');
        setHasCamera(false);
      });
    } else {
      scanner.stop();
    }
  }, [scanner, isActive, onError]);

  if (!hasCamera) {
    return (
      <div className="py-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-400 to-pink-500">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-600">Camera not available</p>
        <p className="mt-2 text-sm text-gray-500">Please check your camera permissions and try again.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full max-w-md mx-auto shadow-lg rounded-2xl"
        style={{ transform: 'scaleX(-1)' }} // Mirror the video for natural feel
      />
      {isActive && (
        <div className="absolute inset-0 border-2 border-green-400 pointer-events-none rounded-2xl">
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <div className="w-48 h-48 border-2 border-green-400 rounded-lg opacity-50"></div>
          </div>
        </div>
      )}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl">
          <div className="text-center text-white">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Scanner paused</p>
          </div>
        </div>
      )}
    </div>
  );
}