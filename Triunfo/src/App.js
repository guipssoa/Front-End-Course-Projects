import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    saveCards: [],
    hasTrunfo: false,
  };

  cardValidation = () => {
    const { cardTrunfo } = this.state;
    if (cardTrunfo) {
      this.setState({ hasTrunfo: true, cardTrunfo: false });
    }
  };

  haveInfo = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const maxAttribute = 90;
    const countAttribute = 210;
    const info = cardName.length === 0 || cardDescription.length === 0
    || cardImage.length === 0 || cardRare.length === 0;
    const sumAttribute = ((Number(cardAttr1) + Number(cardAttr2)
    + Number(cardAttr3)) > countAttribute);

    const disableMaxAttr = cardAttr1 > maxAttribute
    || cardAttr2 > maxAttribute
    || cardAttr3 > maxAttribute;
    const disableMinAttr = cardAttr1 < 0
    || cardAttr2 < 0
    || cardAttr3 < 0;
    const disabledTotal = info || sumAttribute || disableMaxAttr || disableMinAttr;
    this.setState({
      isSaveButtonDisabled: disabledTotal,
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(({
      [name]: value,
    }), () => {
      this.haveInfo();
    });
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      cardName, cardDescription, cardImage,
      cardRare, cardAttr1, cardAttr2,
      cardAttr3 } = this.state;

    const arrayCards = {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    };
    this.setState((element) => ({
      saveCards: [...element.saveCards, arrayCards],
      cardName: '',
      cardImage: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
    }), (this.cardValidation));
  };

  render() {
    const {
      cardName, cardDescription,
      cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo,
      isSaveButtonDisabled, hasTrunfo, saveCards,
    } = this.state;
    return (
      <div>
        <Form
          onInputChange={ this.onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }

        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        { saveCards.map((cards) => (
          <Card
            key={ cards.cardName }
            cardName={ cards.cardName }
            cardDescription={ cards.cardDescription }
            cardAttr1={ cards.cardAttr1 }
            cardAttr2={ cards.cardAttr2 }
            cardAttr3={ cards.cardAttr3 }
            cardImage={ cards.cardImage }
            cardRare={ cards.cardRare }
            cardTrunfo={ cards.cardTrunfo }
          />
        ))}
      </div>
    );
  }
}

export default App;
