import React, { useState } from 'react';

// Functional component named TextForm, taking 'props' as an argument
export default function TextForm(props) {
  // Initializing state using the 'useState' hook with a default value
  const [text, setText] = useState('');

  // Event handler for the "Convert to Upper Case" button click
  const handleUpClick = () => {
    // Logging a message indicating that the button was clicked, along with the current text state
    console.log("Uppercase was Clicked: " + text);
    // Creating a new string with the text in uppercase
    let newText = text.toUpperCase();
    // Updating the state with the newly created uppercase text
    setText(newText); // Update the state with the uppercase text
    props.showAlert("Converted to uppercase!", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
  };

  const handleClearClick = () => {
    let newText = '';
    setText(newText);
    props.showAlert("Text Cleared!", "success");
  }

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    props.showAlert("Text to speech enabled", "success");
  }

  const replaceCaseFunc = () => {
    let existingText = prompt("Enter which word to replace: ");
    let replacedText = prompt("Enter New Text");
    setText(text.replaceAll(existingText, replacedText))
  }

  const copyContent = async () => {
    let text = document.getElementById('myBox').value;
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed!", "success");
  }

  // Event handler for changes in the textarea
  const handleOnChange = (event) => {
    // Logging a message indicating that a change event occurred
    console.log("On Change");
    // Updating the state with the current value of the textarea
    setText(event.target.value);
  };

  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        {/* Displaying the heading passed as a prop */}
        <h1 className='mb-4'>{props.heading}</h1>
        {/* Textarea for user input with event handlers and styling */}
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text} // Setting the value of the textarea to the current text state
            onChange={handleOnChange} // Assigning the handleOnChange function to the onChange event
            style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        {/* Button to convert text to uppercase with event handler */}
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={speak}>Speak</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={replaceCaseFunc}>Replace</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={copyContent}>Copy</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
      </div>
      <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h2>Your text summary</h2>
        <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  )
}
