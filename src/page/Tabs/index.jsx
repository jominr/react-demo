import React, {useState} from 'react';
import './index.css';

const ITEMS = [
  {
    value: 'html',
    label: 'HTML',
    panel: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.'
  },
  {
    value: 'css',
    label: 'CSS',
    panel: 'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.'
  },
  {
    value: 'javascript',
    label: 'JavaScript',
    panel: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.'
  }
]

const Index = ({defaultValue = '' , items = ITEMS}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : items[0].value);
  return (
    <div className="tabs">
      <div className="tabs-list">
        {items.map(({label, value: itemValue}) => {
          const isActive = itemValue == value;

          return (
            <button
              key={itemValue}
              className={['tabs-list-item', isActive && 'tabs-list-item--active'].filter(Boolean).join(' ')}
              onClick={()=> setValue(itemValue)}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div>
        {items.map(({panel, value: itemValue})=>(
          <div
            key={itemValue}
            hidden={itemValue !== value}
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;