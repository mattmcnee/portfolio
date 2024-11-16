import React, { useEffect, useRef, useMemo } from "react";

const TextMask = ({
  backgroundColor = "black",
  text = "See Through Text",
  textOpacity = 1,
  className = "",
}) => {
  const containerRef = useRef(null);

  // Function to generate a random color in rgba format
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const rgba = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 1)`; // Random color with full opacity
    return rgba;
  };

  // Generate fixed colors for each word
  const wordColors = useMemo(() => {
    return text.split(" ").map(() => getRandomColor());
  }, [text]);

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

        // Calculate glow intensity based on distance
        const maxDistance = 200;
        const glowOpacity =
          distance > maxDistance
            ? 0
            : Math.max(0, 1 - distance / maxDistance); // 1 for closest, 0 for farthest

        if (glowOpacity > 0) {
          const wordIndex = char.dataset.wordIndex; // Use the word's index for consistent color
          const color = wordColors[wordIndex];
          char.style.filter = "brightness(2)";
          // Apply the calculated opacity to the rgba color
          char.style.textShadow = `0 0 20px ${color.replace(
            /rgba\((\d+), (\d+), (\d+), (\d+\.?\d*)\)/,
            (match, r, g, b) => `rgba(${r}, ${g}, ${b}, ${glowOpacity})`
          )}`;
        } else {
          char.style.filter = "none";
          char.style.textShadow = "none";
        }
      });
    };

    // Attach mousemove listener
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Clean up listener on unmount
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [wordColors]);

  // Render the text with spans for each character
  const renderText = () => {
    return text.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} style={{ display: "inline-block", marginRight: "1rem" }}>
        {word.split("").map((char, charIndex) => (
          <span
            key={`${wordIndex}-${charIndex}`}
            className="character"
            data-word-index={wordIndex} // Attach word index for color lookup
            style={{
              display: "inline-block",
              position: "relative",
              transition: "filter 0.1s, text-shadow 0.1s",
            }}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        backgroundColor,
        position: "relative",
        padding: "2rem",
        cursor: "default",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          opacity: textOpacity,
          display: "inline-block",
        }}
      >
        {renderText()}
      </h1>
    </div>
  );
};

export default TextMask;
