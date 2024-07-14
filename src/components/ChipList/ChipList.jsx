import React from 'react';

const Chip = ({text, maxTextLength }) => {
  const truncatedText = maxTextLength > 0 && text.length > maxTextLength ? `${text.substring(0, maxTextLength)}...` : text;
  return (
    <span style={{ border: "1px solid gray", borderRadius: '4px', padding: '0 4px' }}>
      {truncatedText}
    </span>
  )

}

const ChipList = ({chips, maxChipsDisplayed, maxTextLength}) => {
  if (!chips || chips.length ==[]) return;
  if (maxChipsDisplayed && maxChipsDisplayed > 0) {

  }
  let more = 0, filterList = [...chips];
  if (maxChipsDisplayed && maxChipsDisplayed > 0) {
    more = chips.length - maxChipsDisplayed;
    filterList = chips.slice(0, maxChipsDisplayed);
  }
  return (
    <div style={{ display: "flex", gap: "8px", margin: "4px 0 12px"}}>
      <div style={{ display: "flex", gap: "8px"}}>
        {filterList.map((item, index) => (
          <Chip key={index} text={item.label} maxTextLength={maxTextLength}/>
        ))}
      </div>
      {more > 0 && <aside style={{backgroundColor: 'white'}}>{more} more items. </aside>}
    </div>
  );
};

export default ChipList;