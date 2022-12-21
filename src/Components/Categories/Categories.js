import React, { Component, useEffect, useState } from 'react';
import { variables } from '../../Variables';

const Categories = () =>  {
    const [categories, setcategories] = useState([]); 

    // const refreshListPhones = () => {
    //     fetch(variables.API_URL + 'phone')
    //         .then(response => response.json())
    //         .then(data => setPhones(data))
    // }

    useEffect(() => {
        fetch(variables.API_URL + 'category')
            .then(response => response.json())
            .then(data => setcategories(data))
    }, [])

    return (
        console.log("return", categories)
    )
}
export default Categories