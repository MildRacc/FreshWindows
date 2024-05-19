import './App.css';
import React, { useState } from 'react';
import FreshWindow from './FreshWindow';
import websites from './websites';

export default function App() {
  const [sites, setWebsites] = useState([]);

  function getRandomLink(){
    return websites[Math.floor(Math.random() * websites.length)]
  }

  function submitUrl(event){
    event.preventDefault(); // Prevent default form submission behavior

    const urlInput = document.getElementById("urlInput");
    let url = urlInput.value;

    if (url === "") {
      // If the input is empty, select a random link
      url = getRandomLink();
    }

    setWebsites(prevWebsites => [...prevWebsites, url]); // Add the entered URL to the websites list
    urlInput.value = ""; // Clear the input field after submission
  }

  return (
    <div>
      {sites.map((website, index) => (
        <FreshWindow key={index} website={website} />
      ))}
      <div className='interaction'>
        <button onClick={submitUrl}>↵</button>
        <label htmlFor="urlInput"></label>
        <input type='url' id="urlInput" name="urlInput" placeholder="Type URL Here..."/>
      </div>
    </div>
  );
}

