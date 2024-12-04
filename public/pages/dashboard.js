import React from 'react';
import ReactDOM from 'react-dom';
import * as Data from '/public/data/data_manager';
import {MessageContainer} from './messages'
import {navigate, showNotif} from '/public/app'

class DashB extends React.Component {
	constructor(props) {
        super(props);
        // Initialize state to store fetched data
        this.state = {
            messages: []// Holds the fetched data
        };
    }
    // Fetch data after component mounts
    componentDidMount() {
        // Call async function and update state
        Data.readCollection("maindata").then((data) => {
            this.setState({ messages: data})//.filter(msg=>msg.data.private==true) });
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    render() {
    	let count = 0
        return (
          <div className="container p-1">
             <div id="home-page" className=" p-5 m-0 text-dark bg-light text-center rounded">
              <h1 className="fw-light display-4">{this.props.title}<span className="bi-database-fill-lock"></span></h1>
               <p className="text-secondary fw-light">{this.props.text}</p>
                </div>
           {this.state.messages.map((item) => {
           const Msgdate = new Date(item.data.date.seconds*1000)
           const time = Msgdate.getHours()+':'+Msgdate.getMinutes()
           const format = `${Msgdate.toDateString()} | ${time}`
          count++
           return (
<MessageContainer key={count} del={true} id={item.id} sender={item.data.sender} message={item.data.message} private={item.data.private} date={item.data.date}/>
               )
               })}
            </div>
        );
    }
}

export default function DashBoard (){
	return (<DashB title="All messages " text="All messages will appear here with delete button" />)
}