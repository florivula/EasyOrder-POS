import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const OrdersList = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', background: '#f0f0f0', padding: '20px' }}>
      <table style={{ color: '#333', width: '80%', maxWidth: '1200px', background: 'white', borderCollapse: 'collapse', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#333', color: 'white' }}>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Products</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Total</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Manage</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
