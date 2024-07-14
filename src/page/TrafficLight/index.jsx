import React, {useState, useEffect} from 'react';
import classes from "./index.module.css"

const config = {
  'red': {
    next: 'green',
    duration: 4000,
    background: 'red',
  },
  'yellow': {
    next: 'red',
    duration: 500,
    background: 'yellow',
  },
  'green': {
    next: 'yellow',
    duration: 3000,
    background: 'green',
  }
}

const Index = () => {
  return (
    <div className={classes.wrapper}>
      <TrafficLight config={config} layout="vertical" />
      <TrafficLight config={config} />
      
    </div>
  );
};

const TrafficLight = ({config, layout="horizontal", initialColor="green"}) => {
  const [currentColor, setCurrentColor] = useState(initialColor);
  useEffect(()=> {
    const timer = setTimeout(()=> {
      setCurrentColor(config[currentColor].next)
    }, config[currentColor].duration)
    return ()=> {
      clearTimeout(timer);
    }
  }, [currentColor])
  return (
    <div
      // 屏幕阅读器会自动向用户播报内容更新的区域，这里信号灯会更新，所以会用到
      // 如果aria-live:off, 关闭实施区域，不会播报；如果aria-live:polite, 礼貌模式，会在用户完成操作后播报；如果aria-live: assertive, 强制模式，会打断用户的操作来播报。
      aria-live="polite"
      aria-label={`Current light: ${currentColor}`}
      className={[classes.trafficLightContainer, layout === 'vertical' && classes.trafficLightContainerVertical].filter(Boolean).join(' ')}>
      {
        Object.keys(config).map((color) => (
          <Light
            key={color}
            backgroundColor={color == currentColor ? config[color].background : undefined}
          />
        ))
      }
    </div>
  )
}

const Light = ({backgroundColor}) => {
  return (
    <div
      aria-hidden={true}
      className={classes.trafficLight}
      style={{ backgroundColor }}></div>
  )
}

export default Index;