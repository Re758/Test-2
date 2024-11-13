// UserForm.js
import React, { useState } from "react";

const UserForm = () => {
    const [name, setName] = useState("");

// The handleUserSubmit function
    const handleUserSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission default action
        const data = { name }; // Create data object (add additional properties as needed)

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result); // Handle result

            // Optionally, you can reset the input after submission
            setName("");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleUserSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;