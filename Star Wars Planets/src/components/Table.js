import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const {
    inLoad, planetList, planetsListInFilter, planetsFilterInState,
  } = useContext(Context);

  return (
    <div>

      { inLoad
        ? (<h1>In Load...</h1>)
        : (
          <table>
            <thead>
              <tr>
                <th>Name</th>

                <th>Rotation Period</th>

                <th>Orbital Period</th>

                <th>Diameter</th>

                <th>Climate</th>

                <th>Gravity</th>

                <th>Terrain</th>

                <th>Surface Water</th>

                <th>Population</th>

                <th>Films</th>

                <th>Created</th>

                <th>Edited</th>

                <th>URL</th>
              </tr>
            </thead>
            {
              (planetsListInFilter ? planetList : planetsFilterInState)
                ?.map((param1, param2) => (
                  <tbody key={ param2 }>
                    <tr>
                      <td>{ param1.name }</td>

                      <td>{ param1.rotation_period }</td>

                      <td>{ param1.orbital_period }</td>

                      <td>{ param1.diameter }</td>

                      <td>{ param1.climate }</td>

                      <td>{ param1.gravity }</td>

                      <td>{ param1.terrain }</td>

                      <td>{ param1.surface_water }</td>

                      <td>{ param1.population }</td>

                      <td>{ param1.films }</td>

                      <td>{ param1.created }</td>

                      <td>{ param1.edited }</td>

                      <td>{ param1.url }</td>
                    </tr>
                  </tbody>
                ))
            }
          </table>
        )}
    </div>
  );
}

export default Table;
