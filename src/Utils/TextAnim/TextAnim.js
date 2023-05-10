import React from "react";
import AnimatedText from "react-animated-text-content";

const TextAnim = ({ children, tagName, type, aniType, interval, duration, className }) => {
  return (
    <AnimatedText
      type={type ? type : "words"} // animate words or chars
      animation={{
        x: "200px",
        y: "-20px",
        scale: 1.1,
        ease: "ease-in-out",
      }}
      animationType={aniType}
      interval={interval ? interval : 0.06}
      duration={duration? duration : 0.8}
      tag={tagName}
      className={className}
      includeWhiteSpaces
      threshold={0}
      rootMargin="20%"
    >
      {children}
    </AnimatedText>
  );
};

export default TextAnim;
