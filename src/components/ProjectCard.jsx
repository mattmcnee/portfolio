import React from 'react';

const ProjectCard = ({ 
  name, 
  company, 
  dates, 
  children 
}) => {
  return (
    <div style={{
      borderRadius: '8px',
      marginBottom: '16px',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 600,
          margin: 0
        }}>{name}</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563' }}>
          <span style={{ fontWeight: 500 }}>{company}</span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '14px',
          color: '#6b7280',
          marginTop: '4px'
        }}>
          <span>{dates}</span>
        </div>
        
        <div style={{ marginTop: '0px', color: '#374151', lineHeight: '1.5' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
