import React, { useEffect, useRef, useMemo } from "react";

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
    { text: "Text", color: "green" }
  ],
  className = "",
}) => {
  const containerRef = useRef(null);

  // Ensure that the passed words array is valid and convert colors to RGBA
  const adjustedWords = useMemo(() => {
    return words.map((word) => ({
      ...word,
      color: colorToRGBA(word.color) // Convert color to RGBA
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

        // Calculate opacity based on distance, with max distance of 200px
        const maxDistance = 100;
        const opacity =
          (distance > maxDistance ? 0 : Math.max(0, 1 - distance / maxDistance)) * 0.9; // 1 for closest, 0 for farthest

        const wordIndex = char.dataset.wordIndex; // Use the word's index for consistent color
        const color = adjustedWords[wordIndex].color;
        char.style.color = `${color.replace(/rgba\((\d+), (\d+), (\d+), (\d+\.?\d*)\)/, (match, r, g, b) => `rgba(${r}, ${g}, ${b}, ${opacity})`)}`;
      });
    };

    // Attach mousemove listener
    window.addEventListener("mousemove", handleMouseMove);
    handleMouseMove({ clientX: 0, clientY: 0 });

    return () => {
      // Clean up listener on unmount
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [adjustedWords]);

  // Render the text with spans for each character, including spaces and newlines
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
              data-word-index={wordIndex} // Attach word index for color lookup
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
        backgroundColor: backgroundColor,
        position: "relative",
        padding: "2rem",
        cursor: "default",
      }}
    >
      <span
        style={{
          fontSize: "1rem",
          display: "inline-block",
        }}
      >
        {renderText()}
      </span>
    </div>
  );
};

export default TextMask;
