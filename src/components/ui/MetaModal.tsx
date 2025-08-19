import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Shield } from "lucide-react";
import { SiMeta } from "react-icons/si";

interface MetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
  onLearnMore: () => void;
  onSkip: () => void;
}

export function MetaModal({ isOpen, onClose, onConnect, onLearnMore, onSkip }: MetaModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  if (!isOpen) return null;

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      setTimeout(() => {
        onConnect();
      }, 1500);
    }, 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in"
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 opacity-5 rounded-full blur-3xl meta-pulse"
          style={{
            background: 'linear-gradient(to right, var(--meta-blue-light), transparent)',
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-5 rounded-full blur-3xl meta-pulse"
          style={{
            background: 'linear-gradient(to left, var(--meta-blue), transparent)',
            animationDelay: '1s',
          }}
        ></div>
      </div>

      {/* Modal Card */}
      <Card className="max-w-md w-full scale-in relative shadow-2xl border-[var(--meta-border)]">
        <CardContent className="p-8">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-[var(--meta-gray)] hover:text-[var(--meta-dark)] hover:bg-gray-100 rounded-full"
            onClick={onClose}
            data-testid="button-close"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Meta Icon Container */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-20 h-20 meta-gradient rounded-full flex items-center justify-center shadow-lg meta-pulse"
            >
              <SiMeta className="text-white text-3xl" />
            </div>
          </div>

          {/* Title */}
          <h2 
            className="text-2xl font-bold text-center mb-2"
            style={{ color: 'var(--meta-dark)' }}
          >
            Connect to Meta
          </h2>

          {/* Subtitle */}
          <p 
            className="text-center mb-8 leading-relaxed"
            style={{ color: 'var(--meta-gray)' }}
          >
            Link your account to access Meta's suite of tools and services for a seamless experience.
          </p>

          {/* Connect Button */}
          <Button
            className="w-full font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-30 active:scale-[0.98] text-white"
            style={{
              backgroundColor: isConnected ? '#10b981' : 'var(--meta-blue)',
              borderColor: isConnected ? '#10b981' : 'var(--meta-blue)',
            }}
            onMouseEnter={(e) => {
              if (!isConnected && !isConnecting) {
                e.currentTarget.style.backgroundColor = 'var(--meta-blue-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isConnected && !isConnecting) {
                e.currentTarget.style.backgroundColor = 'var(--meta-blue)';
              }
            }}
            onClick={handleConnect}
            disabled={isConnecting || isConnected}
            data-testid="button-connect"
          >
            <div className="flex items-center justify-center space-x-3">
              {isConnecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </>
              ) : isConnected ? (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Connected!</span>
                </>
              ) : (
                <>
                  <SiMeta className="text-lg" />
                  <span>Connect with Meta</span>
                </>
              )}
            </div>
          </Button>

          {/* Secondary Actions */}
          <div 
            className="mt-6 pt-6"
            style={{ borderTop: `1px solid var(--meta-border)` }}
          >
            <div className="flex justify-center space-x-6 text-sm">
              <Button
                variant="ghost"
                className="text-[var(--meta-gray)] hover:text-[var(--meta-dark)] p-0 h-auto font-normal"
                onClick={onLearnMore}
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
              <Button
                variant="ghost"
                className="text-[var(--meta-gray)] hover:text-[var(--meta-dark)] p-0 h-auto font-normal"
                onClick={onSkip}
                data-testid="button-skip"
              >
                Skip for Now
              </Button>
            </div>
          </div>

          {/* Security Badge */}
          <div 
            className="mt-6 flex items-center justify-center text-xs"
            style={{ color: 'var(--meta-gray)' }}
          >
            <Shield className="mr-2 h-4 w-4 text-green-500" />
            <span>Secured by Meta's trusted authentication</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
