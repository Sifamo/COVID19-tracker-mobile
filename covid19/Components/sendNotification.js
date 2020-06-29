import React from "react";
import {Permissions,Notifications } from "expo";
import * as firebase from "firebase";



export default class SendNotification  extends Component {
	constructor(props) {
		super(props);
		
    }
    componentDidMount(){
        this.PushNotification();
    }

    PushNotification = async()=>{
        //check for permission 
        const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = status;
        alert("hello");
        //if no existing permission ,ask user for permission 
        if(status!=="garented"){
            const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
            alert("hello");
        }
        if(status!=="garented"){
            return;
        }
        let token = await Notifications.getExpoPushTokenAsync() 
        console.log(token);
    }
 


}