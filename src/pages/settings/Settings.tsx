import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoutingSettings from './RoutingSettings';
import BinSettings from './BinSettings';

function Settings() {
  return (
    <Routes>
      <Route path="routing" element={<RoutingSettings />} />
      <Route path="bin" element={<BinSettings />} />
    </Routes>
  );
}

export default Settings;