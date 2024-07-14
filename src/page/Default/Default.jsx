import React from 'react';
import Accordion from '../../components/Accordion/Accordion';
import Progress from '../../components/Progress/Progress';
import ChipList from '../../components/ChipList/ChipList';

const Default = () => {
  const chips = [
    { label: "123456"},
    { label: "1234567"},
    { label: "1234"},
    { label: "12345678"},
    { label: "1234"},
    { label: "123456789"},
  ];
  return (
    <div>
      <h5>是默认页面，无需权限，任何人都能访问。</h5>
      <Accordion />
      <Progress percent={40}/>
      1, three parameters exits. 
      <ChipList chips={chips} maxChipsDisplayed={3} maxTextLength={6}/>
      2, no parameter
      <ChipList/> <br></br>
      3, maxChipsDisplayed less than 0
      <ChipList chips={chips} maxChipsDisplayed={-1} maxTextLength={5}/>
      4 maxTextLength less than 0
      <ChipList chips={chips} maxChipsDisplayed={3} maxTextLength={-1}/>
      5 maxChipsDisplayed and maxTextLength don't exit
      <ChipList chips={chips}/>
    </div>
  );
};

export default Default;