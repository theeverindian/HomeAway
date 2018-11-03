import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

class OwnerDashboard extends Component {

    constructor(props) {
        super(props);
        console.log("Inside OwnerDashboard");
        this.state = {
            ownername: sessionStorage.getItem('ownername'),
            propertyData: "",
            isEmpty: true
        }
    }


    async componentDidMount() {
        const data = {
            ownername: this.state.ownername
        }
        await axios.post('http://localhost:3002/ownerDashboard/', data)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        propertyData: response.data,
                        isEmpty: false
                    })
                }
                console.log(response);
            });
    }

    render() {

        var details = "";
        var pageLayout = "";

        if (!this.state.isEmpty) {
            details = this.state.propertyData.map((property, index) => {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{property.headline}</td>
                        <td>{property.city}</td>
                        <td>{property.startdate.substring(0, 10)}</td>
                        <td>{property.enddate.substring(0, 10)}</td>
                        <td>{property.rent}</td>
                        <td><button class="btn btn btn-danger">DELETE</button></td>
                    </tr>
                )
            })
        } else {
            return (<div>No Properties Listed</div>)
        }

        if (cookie.load('OwnerCookie')) {
            pageLayout = (
                <div class="bookPropertyContainer">
                    <div class="container-fluid shadowBg">
                        <center><h2 class="">Owner Dashboard</h2></center>
                        <table class="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Property Name</th>
                                    <th>City</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Rent</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            this.props.history.push('/OwnerLogin');
        }


        return (

            <div>{pageLayout}</div>
        )

    }
}
export default OwnerDashboard;