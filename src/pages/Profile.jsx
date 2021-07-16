import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ButtonsProfile from '../components/ButtonsProfile';
import '../styles/Profile.css';

function Profile() {
  return (
    <>
      <Header title="Perfil" withIconSearch={ false } />
      <ButtonsProfile />
      <Footer />
    </>
  );
}

export default Profile;
