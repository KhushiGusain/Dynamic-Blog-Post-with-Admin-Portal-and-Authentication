"use client"
import { useEffect, useState } from "react";

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const percent = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
      setProgress(percent);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ width: `${progress}%` }}
      className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-150"
    />
  );
};

export default ReadingProgressBar; 