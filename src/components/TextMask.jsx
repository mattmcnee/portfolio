import React, { useEffect, useRef, useMemo, useState } from "react";

// Utility function to map color names to RGBA values
const colorToRGBA = (color) => {
  const colors = {
    purple: "rgba(145, 126, 187, 1)",
    turquoise: "rgba(64, 224, 208, 1)",
    green: "rgba(111, 168, 136, 1)",
    yellow: "rgba(255, 255, 0, 1)",
    orange: "rgba(255, 165, 0, 1)",
    red: "rgba(152, 63, 69, 1)",
    black: "rgba(50, 50, 50, 1)", // Default color
  };

  return colors[color.toLowerCase()] || colors.black; // Default to black if not found
};

const TextMask = ({
  backgroundColor = "blue",
  words = [
    { text: "See", color: "purple" },
    { text: "Through", color: "turquoise" },
    { text: "Text", color: "green" },
  ],
  className = "",
  scrollSpeed = 50, // Animation duration in seconds
}) => {
  const containerRef = useRef(null);
  const [textOpacity, setTextOpacity] = useState(0);

  // Ensure that the passed words array is valid and convert colors to RGBA
  const adjustedWords = useMemo(() => {
    return words.map((word) => ({
      ...word,
      color: colorToRGBA(word.color), // Convert color to RGBA
    }));
  }, [words]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;

      const characters = containerRef.current.querySelectorAll(".character");
      characters.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(charX - event.clientX, 2) + Math.pow(charY - event.clientY, 2)
        );

        const maxDistance = 150;
        const opacity =
          (distance > maxDistance ? 0 : Math.max(0, 1 - distance / maxDistance));

        const wordIndex = char.dataset.wordIndex;
        const color = adjustedWords[wordIndex].color;
        char.style.color = `${color.replace(
          /rgba\((\d+), (\d+), (\d+), (\d+\.?\d*)\)/,
          (match, r, g, b) => `rgba(${r}, ${g}, ${b}, ${opacity})`
        )}`;
        char.style.transform = `scale(${0.5 + opacity/2})`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    handleMouseMove({ clientX: 0, clientY: 0 });
    setTextOpacity(1);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [adjustedWords]);

  const renderText = () => {
    return adjustedWords.map((word, wordIndex) => {
      if (word.text === "SPACE") {
        return <span key={wordIndex} style={{ display: "inline-block", width: "0.3rem" }} />;
      } else if (word.text === "NEWLINE") {
        return <br key={wordIndex} />;
      }

      return (
        <span key={wordIndex} style={{ display: "inline-block" }}>
          {word.text.split("").map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className="character"
              data-word-index={wordIndex}
              style={{
                display: "inline-block",
                position: "relative",
                transition: "color 0.1s",
              }}
            >
              {char}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        backgroundColor: "transparent",
        position: "relative",
        padding: "4rem 2rem 2rem 2rem",
        cursor: "default",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: `scroll ${scrollSpeed}s linear infinite`,
          opacity: textOpacity
        }}
      >
        {renderText()}
      </div>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateY(0); }
            46% { transform: translateY(-70%); }
            50% { transform: translateY(-70%); }
            96% { transform: translateY(0%); }
            100% { transform: translateY(0%); }
          }
        `}
      </style>
    </div>
  );
};

export default TextMask;
