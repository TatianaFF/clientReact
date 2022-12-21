import React, { Component, useEffect, useState } from 'react';
import { variables } from '../../Variables';

const Phones = () =>  {
    const [phones, setPhones] = useState([]); 

    // const refreshListPhones = () => {
    //     fetch(variables.API_URL + 'phone')
    //         .then(response => response.json())
    //         .then(data => setPhones(data))
    // }

    useEffect(() => {
        fetch(variables.API_URL + 'phone')
            .then(response => response.json())
            .then(data => setPhones(data))
    }, [])

    return (
        console.log("return", phones)
    )
}
export default Phones