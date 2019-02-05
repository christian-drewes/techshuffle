import React from 'react';
import {List} from 'antd';

import FetchData from './FetchData';

export default class ListResults extends React.Component{

    state = {
        listItems: [],
        results:[]
    }


    render(){
        return(
            <div style={{width: '50%', marginLeft: '25%'}}>
            <FetchData listItems={(val)=> this.setState({listItems: val})}/>
            <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 3,
            }}
            dataSource={this.state.listItems}
            renderItem={
                val =>(
                    <List.Item
                    key={val.title}
                    extra={<img width={272} alt="logo" src={val.img} />}
                >
                    <List.Item.Meta
                    title={<a target="_blank" href={val.url}>{val.title}</a>}
                    description={val.source}
                    />
                    {val.desc}
                </List.Item>
                )
            }
            />
            </div>
        )
    }

}
