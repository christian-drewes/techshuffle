import React from 'react'

import ListResults from '../search/listResults';

export default class Home extends React.Component{
    render(){
        return(

            <div>
                <div className="home">
                  <span className="T">T</span>
                  <span className="E">e</span>
                  <span className="C">c</span>
                  <span className="H">h</span>

                  <span className="S">S</span>
                  <span className="Hl">h</span>
                  <span className="U">u</span>
                  <span className="F">f</span>
                  <span className="Fl">f</span>
                  <span className="L">l</span>
                  <span className="El">e</span>

                </div>
                <ListResults />
            </div>
            )
    }
}