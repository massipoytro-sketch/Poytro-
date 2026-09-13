import React from 'react';

export function PageShell({eyebrow,title,description,action,children}){
  return <div className="page">
    <div className="page-title">
      <div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
      {action}
    </div>
    {children}
  </div>;
}

export function FilterBar({items=['All','Highest reward','Quick','New']}){
  return <div className="filter-bar">{items.map((item,i)=><button className={'filter '+(i===0?'active':'')} key={item}>{item}</button>)}</div>;
}
