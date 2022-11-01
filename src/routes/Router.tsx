import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChurMap } from '../pages/ChurMap';
import { Mobile } from '../styled';

function Router() {

  return (
    <BrowserRouter>
      <Mobile>
        <Routes>
          <Route path="/" element={<ChurMap />}></Route>
        </Routes>
      </Mobile>
    </BrowserRouter>
  );
}

export default Router;