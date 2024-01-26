import React from 'react';
// Defining a functional component named Alert, which takes 'props' as its argument
// Defining a helper function 'capitalize' that capitalizes the first letter of a word
function Alert(props) {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{ height: '50px' }}>
            {/* Checking if 'props.alert' exists, and if true, rendering an alert div */}
            {props.alert && (
                // Using "alert-primary" class for a blue alert
                <div className={`alert alert-primary alert-dismissible fade show`} role="alert">
                    {/* Displaying the capitalized alert type and the alert message */}
                    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
                </div>
            )}
        </div>
    )
}

export default Alert;
