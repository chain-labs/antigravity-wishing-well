"use client ";
import { useEffect, useRef } from "react";

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string; // YouTube video ID
}

const YouTubeModal: React.FC<YouTubeModalProps> = ({
  isOpen,
  onClose,
  videoId,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Attach the event listeners
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    // Cleanup the event listeners
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        id="modal-content"
        ref={modalRef}
        className="bg-white h-1/3 w-5/6 sm:h-4/6 sm:w-3/4 rounded-lg shadow-lg"
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeModal;
