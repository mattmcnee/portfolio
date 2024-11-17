import React, { useState, useEffect } from 'react';
import headshot from '/src/assets/headshot.jpg';
import './Hexagon.scss';

const ImageHexagon = ({ size = 200, pulsing = false, spinning = false, clickable = false, uniqueId }) => {
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    if (clickable) {
      setRotation((prevRotation) => prevRotation + 60);
    }
  };

  // Handle continuous rotation when spinning is true
  useEffect(() => {
    let intervalId;
    if (spinning) {
      intervalId = setInterval(() => {
        setRotation((prevRotation) => prevRotation + 60); // Adjust the increment for speed
      }, 900); // 0.9 seconds
    }

    return () => {
      clearInterval(intervalId); // Cleanup the interval on unmount or when spinning changes
    };
  }, [spinning]);

  return (
    <div className={`hexagon-container`} style={{ width: size, height: size }}>
      <svg
        width="44"
        height="40"
        viewBox="0 0 44 40"
        className={`hexagon ${pulsing ? 'pulsing' : ''}`}
        style={{ width: '100%', height: '100%' }}
        onClick={handleClick}
      >
        <defs>
          <clipPath id={`shield-clip-${uniqueId}`} style={{ transition: 'transform 0.3s ease', transform: `rotate(${rotation}deg)`, transformOrigin: '22px 20px' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.5851 22.084C4.49931 21.943 4.42257 21.7973 4.35514 21.6477C4.11464 21.1171 3.99948 20.5558 4 20.0007C3.99948 19.4455 4.11464 18.8842 4.35514 18.3536C4.42257 18.204 4.49931 18.0583 4.5851 17.9173L11.5073 6.0507C11.5835 5.91454 11.6674 5.7833 11.7584 5.65756C12.0987 5.18542 12.5276 4.80679 13.0085 4.53125C13.4879 4.25539 14.0298 4.07603 14.6078 4.0197C14.7632 4.00424 14.9197 3.99782 15.0766 4.00065H28.8931L28.92 4.00074C30.3229 3.97371 31.6985 4.68703 32.4558 5.98517L39.4162 17.9174C39.5019 18.0582 39.5786 18.2038 39.646 18.3532C39.8866 18.884 40.0018 19.4453 40.0013 20.0007C40.0018 20.556 39.8866 21.1174 39.646 21.6481C39.5786 21.7975 39.5019 21.9431 39.4162 22.0839L32.4558 34.0161C31.6985 35.3143 30.3229 36.0276 28.92 36.0006L28.8931 36.0007H15.0766C14.9198 36.0035 14.7633 35.9971 14.608 35.9816C14.0299 35.9253 13.4879 35.7459 13.0084 35.47C12.527 35.1941 12.0977 34.8149 11.7571 34.342C11.6666 34.2168 11.5831 34.0861 11.5073 33.9506L4.5851 22.084Z" fill="black"/>
          </clipPath>
        </defs>

        <image
          href={headshot}
          className="img"
          width="44"
          height="40"
          clipPath={`url(#shield-clip-${uniqueId})`}
          preserveAspectRatio="xMidYMid slice"
          style={{ transition: 'transform 0.3s ease', transform: 'none' }}
        />
      </svg>
    </div>
  );
};

export default ImageHexagon;
