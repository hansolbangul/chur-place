import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChurMap } from '../pages/ChurMap';

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChurMap />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;