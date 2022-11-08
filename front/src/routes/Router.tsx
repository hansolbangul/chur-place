import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { ChurMap } from '../pages/ChurMap';
import { Mobile } from '../styled';

function Router() {

  return (
    <BrowserRouter>
      <Mobile>
        <Header />
        <Routes>
          <Route path="/nmap" element={<ChurMap />}></Route>
        </Routes>
      </Mobile>
    </BrowserRouter>
  );
}

export default Router;