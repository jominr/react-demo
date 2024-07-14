import React, {useState} from 'react';
import "./Accordion.css";

const text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;

const ITEMS = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>
  },
]

const Accordion = ({items = ITEMS, defaultActiveKey = '1'}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const activeHandle = (key) => {
    if (activeKey == key) {
      setActiveKey('-1');
    } else {
      setActiveKey(key);
    }
  }
  return (
    <div>
      <strong>Accordion</strong>
      {
        items.map(item => (
          <div key={item.key} >
            <div
              onClick={ () => activeHandle(item.key) }
              className="accordion-header"
              aria-expanded={activeKey == item.key}
              aria-disabled="false"
            >
              {item.label}
            </div>
            <div className={activeKey == item.key ? "accordion-content accordion-content--active" : "accordion-content accordion-content--hidden"}>
              {item.children}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Accordion;