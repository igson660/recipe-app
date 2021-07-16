import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExplorerScreen extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    const { name } = target;
    const { history } = this.props;
    history.push(`/explorar/${name}`);
  }

  render() {
    return (
      <>
        <Header title="Explorar" withIconSearch={ false } />
        <div className="explore-screen" id="recipeDone">
          <button
            className="explore-screen-button tagFilter"
            type="button"
            name="comidas"
            data-testid="explore-food"
            onClick={ this.handleClick }
          >
            Explorar Comidas
          </button>
          <button
            className="explore-screen-button tagFilter"
            type="button"
            name="bebidas"
            data-testid="explore-drinks"
            onClick={ this.handleClick }
          >
            Explorar Bebidas
          </button>
        </div>
        <Footer />
      </>
    );
  }
}

ExplorerScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExplorerScreen;
