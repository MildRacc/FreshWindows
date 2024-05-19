import React, {useRef} from 'react';
import websites from './websites';


export default function FreshWindow(props){
    
    const hexID = randomHex(6)
    let zIndexArr = []
    let isDragging = false
    let offsetX, offsetY
    let website
    let allWebsites

    const windowID = `window${hexID}`
    const topBarID = `topBar${hexID}`
    const closeBtnID = `closeBtn${hexID}`

    const windowRef = useRef(windowID)
    const topBarRef = useRef(topBarID)

    if(props.website){
        website = props.website
    }else{
        allWebsites = websites
        website = allWebsites[Math.floor(Math.random() * allWebsites.length)]
    }
    
    const handleMouseMove = (e) => {
        if(isDragging){ // Change position
            windowRef.current.style.left = `${e.clientX - offsetX}px`
            windowRef.current.style.top = `${e.clientY - offsetY}px`
        }
    }

    const handleMouseDown = (e) => {
        isDragging = true

        let top, left

        // Remove px suffix
        if(typeof windowRef.current.style.left == "string" || typeof windowRef.current.style.top == "string"){
            left = `${windowRef.current.style.left}`.slice(0, windowRef.current.style.left.length - 2)
            top = `${windowRef.current.style.top}`.slice(0, windowRef.current.style.top.length - 2)

            offsetX = e.clientX - left
            offsetY = e.clientY - top
        }else{
            offsetX = e.clientX - windowRef.current.style.left
            offsetY = e.clientY - windowRef.current.style.top
        }

        bringToTop(windowID, zIndexArr)

        // Handle mouse movement
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseUp = (e) => {
        isDragging = false

        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)

        console.log(allWebsites)
    }

    


    return (
        <div className="window" id={windowID} ref={windowRef}>
            <div className="topBar" id={topBarID} ref={topBarRef} onMouseDown={handleMouseDown}>
                <button className="closeBtn" id={closeBtnID} onClick={() => handleClose(windowRef)}>
                    <p>⨉</p>
                </button>
            </div>
            <div className="windowContent">
                <iframe src={website}></iframe>
            </div>
        </div>
    );
}


function handleClose(elementRef){
    const element = elementRef.current
        if(element){
        element.remove()
    }

}



function bringToTop(id, arr) {
    if (!arr || arr.length === 0) {
        arr = Array.from(document.querySelectorAll(".window"));
    }
    
    let selection = null;

    // Find the selected element by its ID
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id.toString().trim() === id.trim()) {
            selection = arr[i];
            break;
        }
    }

    if (selection) {
        const index = arr.indexOf(selection);

        if (index !== -1) {
            // Remove the selected element from its current position and append it to the end
            arr.splice(index, 1);
            arr.push(selection);
        }

        // Update the z-index values of all elements
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.zIndex = (i + 1).toString();
        }
    } else {
        console.log("Element with ID " + id + " not found.");
    }
}



function randomHex(length){
    let result = ''
      const chars = "0123456789ABCDEF"
          
      for(let i = 0; i < length; i++){
          result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
          
    return result
  }

function fetchJsonFile() {
return fetch('./websites.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
        throw error;
    });
}