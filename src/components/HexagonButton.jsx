import React, { useState } from 'react';

const HexagonButton = ({
  backgroundColor = "#000000",
  color = "#ffffff",
  contentWidth = 100,
  size = 80,
  rotation = 0,
  isExpanded = true,
  fill = true,
  hoverable = true,
  action = () => {},
  children
}) => {

  const [isHovered, setIsHovered] = useState(false);
  const width = size + size / 10;
  const height = size;
  const hexagonCenterX = width / 2;
  const hexagonCenterY = height / 2;

  const transformScale = isHovered && isExpanded && hoverable ? (fill ? 1.02 : 1.03) : 1;

  const filledLeftPath = (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 44 40`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transformOrigin: `${hexagonCenterX}px ${hexagonCenterY}px`,
        marginRight: `-${width/2 + 0.5}px`
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 36.0007H15.1069L15.08 36.0006C13.6771 36.0276 12.3015 35.3143 11.5442 34.0161L4.58378 22.0839C4.49805 21.9431 4.42137 21.7975 4.35398 21.648C4.11338 21.1173 3.99818 20.556 3.9987 20.0007C3.99818 19.4453 4.11339 18.8839 4.35402 18.3532C4.42139 18.2038 4.49806 18.0582 4.58377 17.9174L11.5442 5.98517C12.3015 4.68703 13.6771 3.97371 15.0801 4.00074L15.1069 4.00065H22V36.0007Z"
        fill={backgroundColor}
      />
    </svg>
  );

  const filledRightPath = (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 44 40`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transformOrigin: `${hexagonCenterX}px ${hexagonCenterY}px`,
        marginLeft: `-${width/2 + 0.5}px`
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 36.0007H28.8931L28.92 36.0006C30.3229 36.0276 31.6985 35.3143 32.4558 34.0161L39.4162 22.0839C39.5019 21.9431 39.5786 21.7975 39.646 21.648C39.8866 21.1173 40.0018 20.556 40.0013 20.0007C40.0018 19.4453 39.8866 18.8839 39.646 18.3532C39.5786 18.2038 39.5019 18.0582 39.4162 17.9174L32.4558 5.98517C31.6985 4.68703 30.3229 3.97371 28.9199 4.00074L28.8931 4.00065H22V36.0007Z"
        fill={backgroundColor}
      />
    </svg>
  );

  const outlinedLeftPath = (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 44 40`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transformOrigin: `${hexagonCenterX}px ${hexagonCenterY}px`,
        marginRight: `-${width/2 + 0.5}px`
      }}
    >
      <path
        d="M4.35398 21.648C4.11338 21.1173 3.99818 20.556 3.9987 20.0007C3.99818 19.4453 4.11339 18.8839 4.35402 18.3532C4.42139 18.2038 4.49806 18.0582 4.58377 17.9174L11.5442 5.98517C12.3015 4.68703 13.6771 3.97371 15.0801 4.00074L15.1069 4.00065H22"
        stroke={backgroundColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M22 36.0007H15.1069L15.08 36.0006C13.6771 36.0276 12.3015 35.3143 11.5442 34.0161L4.58378 22.0839C4.49805 21.9431 4.42137 21.7975 4.35398 21.648"
        stroke={backgroundColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );

  const outlinedRightPath = (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 44 40`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transformOrigin: `${hexagonCenterX}px ${hexagonCenterY}px`,
        marginLeft: `-${width/2 + 0.5}px`
      }}
    >
      <path
        d="M39.646 21.648C39.8866 21.1173 40.0018 20.556 40.0013 20.0007C40.0018 19.4453 39.8866 18.8839 39.646 18.3532C39.5786 18.2038 39.5019 18.0582 39.4162 17.9174L32.4558 5.98517C31.6985 4.68703 30.3229 3.97371 28.9199 4.00074L28.8931 4.00065H22"
        stroke={backgroundColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M22 36.0007H28.8931L28.92 36.0006C30.3229 36.0276 31.6985 35.3143 32.4558 34.0161L39.4162 22.0839C39.5019 21.9431 39.5786 21.7975 39.646 21.648"
        stroke={backgroundColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );

  return (
    <div style={{overflow: 'hidden', flex: '0', display: 'flex', minHeight: `${height + 10}px`, minWidth: 'fit-content'}}>
      <div
        style={{
          display: 'flex',
          flex: '0',
          alignItems: 'center',
          cursor: isExpanded ? 'pointer' : 'initial',
          transition: 'all 0.3s ease',
          transform: `rotate(${rotation}deg) scale(${transformScale})`,
          transformOrigin: `${hexagonCenterX}px ${hexagonCenterY}px`,
          margin: '5px'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (isExpanded) {
            action();
          }
        }}
      >
        {fill ? filledLeftPath : outlinedLeftPath}
        <div
          style={{
            width: isExpanded ? `${contentWidth}px` : '0px',
            height: size - size / 5 + (fill ? 0 : 1),
            backgroundColor: fill ? backgroundColor : "transparent",
            borderTop: fill ? 'none' : `1px solid ${backgroundColor}`,
            borderBottom: fill ? 'none' : `1px solid ${backgroundColor}`,
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: color
          }}
        >
          <div
            style={{
              transition: 'all 0.3s ease',
              opacity: isExpanded ? 1 : 0,
              minWidth: contentWidth,
              zIndex: 2,
              fontWeight: '400'
            }}
          >
            {children || 'Button'}
          </div>
        </div>
        {fill ? filledRightPath : outlinedRightPath}
      </div>
    </div>
  );
};

export default HexagonButton;