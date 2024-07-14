import React, {useState, useEffect} from 'react';
import "./Progress.css";

const Progress = ({percent}) => {
  const [width, setWidth] = useState(percent);
  useEffect(()=> {
    const timer = setTimeout(()=> {
      setWidth( (width + 10) % 110)
    return () => {
      clearTimeout(timer)
    }
    }, 5000)
  }, [width])
  return (
    <div style={{marginBottom: "16px"}}>
      <strong>Progress</strong>
      <div className='progress-outer'>
        <div className="progress-inner">
          <div className="progress-bg-outer" style={{width: `${width}%`}}></div>
        </div>
        <span className='progress-text-end'>{width}%</span>
      </div>

    </div>
  );
};

export default Progress;