import React from 'react'

import FetchData from '../search/FetchData';


export default class Search extends React.Component{
    render(){
        return(

            <div>
                <p>
                  Search
                  <FetchData />
                </p>
            </div>
            )
    }
}