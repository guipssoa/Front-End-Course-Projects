import React from 'react';
import Title from './Title';
import PlanetCard from './PlanetCard';
import planets from '../data/planets';

class SolarSystem extends React.Component {
  render() {
    return (
      <div data-testid="solar-system">
        <Title headline="Planetas" />
        {planets.map(({ name, image }, planet) => (<PlanetCard
          key={ planet }
          planetName={ name }
          planetImage={ image }
        />
        ))}
      </div>
    );
  }
}

export default SolarSystem;
