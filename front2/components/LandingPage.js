import React, { useMemo } from 'react';

function LandingPage() {
  const style = useMemo(() => ({ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }));
    return (
        <div style={style}>
          시작 페이지        
        </div>
    );
}

export default LandingPage;
