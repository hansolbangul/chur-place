import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { ChurMap } from '../pages/ChurMap';
import { Mobile } from '../styled';

function Router() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [useInfo, setUseInfo] = useState<boolean>(false)

  return (
    <BrowserRouter>
      <Mobile>
        <Header setMenu={setMenuOpen} info={useInfo} setInfo={setUseInfo} />
        <Routes>
          <Route path="/nmap" element={<ChurMap />}></Route>
        </Routes>
      </Mobile>
    </BrowserRouter>
  );
}

export default Router;