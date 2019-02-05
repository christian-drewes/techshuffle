import React from 'react'

import { Form, Input, Button } from 'antd';

const youTubeApiKey = 'AIzaSyBunkKeO-1CxKoQxcPi1j0AG3USKkvMHhI';

export default class FetchData extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            queryString: '',
            resultObjArr: [],
            youTubeStatId: '',
            youTubeView: 0,
            inputError: false
        }
    }

    resultObj = {
        title:'',
        url: '',
        img: '',
        views: 0,
        source: '',
        desc: ''
    }

    fetchPosts = async() => {
        const url = await fetch(`https://api.stackexchange.com/2.2/search?order=desc&sort=votes&tagged=${this.state.queryString}&site=stackoverflow`)
        const stackExchangePosts = await url.json();

        const youTubeUrl = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.state.queryString}&key=${youTubeApiKey}`)
        const youTubePosts = await youTubeUrl.json();

        const booksUrl = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.queryString}`)
        const booksPosts = await booksUrl.json();
        

        this.storeApiCalls(stackExchangePosts, youTubePosts, booksPosts)
        this.passupInfo();
    }

    passupInfo(){
        this.sortDescendingViews()

        this.props.listItems(this.state.resultObjArr)
        
        this.setState(
            {
                queryString: '',
                resultObjArr: [],
                youTubeStatId: ''
            }
        )
    }

    // fetchYouTubeStats = async() =>{
    //     //pulling youtube stats off of each popular result
    //     const youTubeId = this.state.youTubeStatId
    //     const youTubeStatsUrl = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${youTubeId}&key=${youTubeApiKey}`)
    //     const youTubeStats = await youTubeStatsUrl.json();

    //     try{
    //         this.setState({youTubeView: youTubeStats.items[0].statistics.viewCount})
    //     }catch(e){
    //         this.setState({youTubeView: 0})
    //     }


    // }

    storeApiCalls(stackExchangePosts, youTubePosts, booksPosts){
        if(!stackExchangePosts.items){
            this.setState({inputError: true})
            return
        }else{
            this.setState({inputError: false})

            for(let i = 0; i < stackExchangePosts.items.length; i++){
                this.resultObj = {
                    title: stackExchangePosts.items[i].title,
                    url: stackExchangePosts.items[i].link,
                    img: "https://img.devrant.com/devrant/rant/r_1902750_GYZty.jpg",
                    views: stackExchangePosts.items[i].view_count,
                    source: 'Stack Overflow',
                    desc: "Click on title to find out more"
                }
    
                this.setState({resultObjArr: this.state.resultObjArr.concat(this.resultObj)})
    
            }
    
        }

        for(let i = 0; i < booksPosts.items.length; i++){
            try{
                this.resultObj = {
                    title: booksPosts.items[i].volumeInfo.title,
                    url: `https://books.google.com/books?id=${booksPosts.items[i].id}`,
                    img: booksPosts.items[i].volumeInfo.imageLinks.thumbnail,
                    views: booksPosts.items[i].volumeInfo.ratingsCount,
                    source: 'Google Books',
                    desc: booksPosts.items[i].volumeInfo.description
                }

            }catch(e){
                console.log("error in books catch")
            }

                try{
                    this.setState({resultObjArr: this.state.resultObjArr.concat(this.resultObj)})
                }catch(e){
                    this.resultObj.views = 0;
                    this.setState({resultObjArr: this.state.resultObjArr.concat(this.resultObj)})
                }
 
         }


        for(let i = 0; i < youTubePosts.items.length; i++){

            this.resultObj = {
                title: youTubePosts.items[i].snippet.title,
                url: `https://www.youtube.com/watch?v=${youTubePosts.items[i].id.videoId}`,
                img: `https://img.youtube.com/vi/${this.state.youTubeStatId}/1.jpg`,
                views: Math.ceil(Math.random()*5000000),
                source: 'YouTube',
                desc: youTubePosts.items[i].snippet.desc
            }
 
            this.setState({resultObjArr: this.state.resultObjArr.concat(this.resultObj)})

         }
    }

    sortDescendingViews(){
        console.log(this.state.resultObjArr)
        this.state.resultObjArr.sort((a,b)=>{return b.views-a.views})
        console.log(this.state.resultObjArr)
    }

    onSearchChange = (e) => {
        this.setState({ queryString: e.target.value })
    }

    buttonDisabled() {
      return this.state.queryString === ''
    }

    onSubmit = (e) => {
      e.preventDefault()
      this.fetchPosts()
    
      //this.props.history.push(`/search?query=${this.state.queryString}`)
    }

    render(){
        return(
            <>
            <Form onSubmit={this.onSubmit}>
                <Form.Item>
                    <Input
                    className="Input"
                    placeholder={this.state.inputError ? "Search NOT found try another" : "(-.-)ZZzzz..."}
                     size="large"
                     value={this.state.queryString} 
                     onChange={this.onSearchChange}
                     />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={this.buttonDisabled()}
                    >
                   Submit 
                </Button>
                </Form.Item>
            </Form>
            </>
            )
    }
}

