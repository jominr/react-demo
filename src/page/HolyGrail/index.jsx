import React from 'react';
import "./index.css";

const Index = () => {
  return (
    <div className="container">
      <header>Header</header>
      <div className='column-content'>
        <nav>Navigation</nav>
        <main>Main</main>
        <aside>Sidebar</aside>
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default Index;