import React, { Component, useEffect, useState } from 'react';
import { variables } from '../../Variables';

const Categories = () =>  {
    const [categories, setcategories] = useState([]); 

    const getCategories = () => {
        fetch(variables.API_URL + 'category')
          .then(response => response.json())
          .then(data => setcategories(data))
          // .then(data => console.log(data, "cats"))
      }

    useEffect(() => {
        getCategories()
    }, [])

    return (
      // console.log("returnCat", categories)
      <></>
    )
}
export default Categories