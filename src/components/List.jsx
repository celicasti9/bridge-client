import React from 'react';  // Simplified as no useState is used here

function List({ children }) {  // Destructuring props for cleaner access
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4">
      <div>
        {children}  
      </div>
    </div>
  );
}

export default List;
