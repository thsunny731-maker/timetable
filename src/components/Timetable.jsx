import React from 'react';

const Timetable = ({ timetable, currentTime }) => {
  const currentH = currentTime.getHours();
  const currentM = currentTime.getMinutes();
  const currentTotalM = currentH * 60 + currentM;

  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      <h2 className="chalk-text" style={{ marginBottom: '20px', color: 'var(--chalk-yellow)' }}>오늘의 일정</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {timetable.map(period => {
          const [startH, startM] = period.startTime.split(':').map(Number);
          const [endH, endM] = period.endTime.split(':').map(Number);
          const startTotalM = startH * 60 + startM;
          const endTotalM = endH * 60 + endM;
          
          const isCurrent = currentTotalM >= startTotalM && currentTotalM < endTotalM;

          return (
            <div 
              key={period.id} 
              className={`chalk-text ${isCurrent ? 'current-period' : ''}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <span style={{ fontSize: '1.2rem', color: period.isRecess ? 'var(--chalk-pink)' : 'inherit' }}>
                {period.name}
              </span>
              <span style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                {period.startTime} ~ {period.endTime}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timetable;
