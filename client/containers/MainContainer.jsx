/**
 * ************************************
 *
 * @module  MainContainer
 * @author  
 * @date
 * @description stateful component that renders MapDisplay and ListContainer
 *
 * ************************************
 */

import React, { useState, useEffect } from "react";
import MapDisplay from "../components/MapDisplay.jsx";
import ListContainer from "./ListContainer.jsx";
<<<<<<< HEAD
import Header from "../components/Header.jsx"

//container that combines MapDisplay and ListContainer and passes down all necessary props
const MainContainer = (props) => (
  <div id="main-container">
    <Header />
    <img src="../../assets/trail-mix-logo-small.jpg" className='logo'/><br />
    <MapDisplay 
      id="map-display"
      trailData={props.trailData}
      getTrail={props.getTrail}
      displayTrail={props.displayTrail} 
    /><br />
    <ListContainer 
      trailData={props.trailData} 
      getTrail={props.getTrail}
      setDiffKey={props.setDiffKey}
      diffKey={props.diffKey}
    />
    {/* conditional renders difficulty key overlay */}
    {props.diffKey && (
      <div>
        <img id='diff-key' src='../../assets/diff-key.jpg' />
      </div>
    )}
  </div>
);
=======
import TrailContainer from './TrailContainer.jsx';

//container that combines MapDisplay and ListContainer and passes down all necessary props
const MainContainer = (props) => {
  const [trailData, setTrailData] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [comments, setComments] = useState([]);
  const [diffKey, setDiffKey] = useState(false);

  //fetches data from REI API and sets to state when the page loads
  useEffect(() => {
    fetch('/data')
      .then(res => res.json())
      .then(res => setTrailData(res.trails))
      .catch(err => console.error(err));
  }, []);

  //invoked by on-click function in TrailDisplay, sets selected trail in state
  const getTrail = (id) => {
    for (let i = 0; i < trailData.length; i += 1) {
      if (trailData[i].id === +id) {
        setSelectedTrail(trailData[i]);
        break;
      }
    }
    const options = {
      headers: {
        'Content-Type': 'application/json',
        id,
      },
    };
    fetch('/comments', options)
      .then(res => res.json())
      .then(res => setComments(res))
      .catch(err => console.error(err));
  };
  return (
    <div id="main-container">
      <img src="../../assets/trail-mix-logo-small.jpg" className='logo'/><br />
      <MapDisplay 
        id="map-display"
        trailData={trailData}
        getTrail={getTrail}
        setSelectedTrail={setSelectedTrail}
      /><br />
      <ListContainer 
        trailData={trailData} 
        getTrail={getTrail}
        setDiffKey={setDiffKey}
        diffKey={diffKey}
      />
      {/* conditional renders difficulty key overlay */}
      {diffKey && (
        <div>
          <img id='diff-key' src='../../assets/diff-key.jpg' />
        </div>
      )}
      {selectedTrail
        && <TrailContainer 
          className="modal" 
          trailData={trailData} 
          selectedTrail={selectedTrail}
          setSelectedTrail={setSelectedTrail}
          setComments = {setComments}
          comments={comments}
          getTrail={getTrail}
          username={username}
        />
      }
    </div>
  );
}
>>>>>>> 71752316724f005d28f89ce890f3d25969dd6d89

export default MainContainer;
