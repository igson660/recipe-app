import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorer() {
  return (
    <>
      <Header title="Explorar" withIconSearch={ false } />
      <Footer />
    </>
  );
}

export default Explorer;
