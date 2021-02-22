import React, { Component } from "react";
import DatePicker from "react-datepicker";
import cookie from "js-cookie";
import MealSummary from "../meals/MealSummary";
import Navbar from "../layout/Navbar";
import JumboTron from "../dashboard/Jumbotron";

import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

class Dashboard extends Component {
  state = {
    startDate: new Date(),
    meals: [],
  };

  // function to change state when an event is happened
  handleChange = (date) => {
    this.setState({ startDate: date });
  };
    
  // function to get ameals list
getdata = ()=>{
    const date = this.props.date; // set date passed as props from parent
    // const datestring =
    // date.getDate() +
    // "-" +
    // parseInt(date.getMonth() + 1) +
    // "-" +
    // date.getFullYear(); // convert date object into string
    const token = cookie.get("token"); // set token from cookie
  // API call to get data
    axios
    .get('http://localhost:5000/meals/',{ headers: {
      Authorization: `Basic ${token}`,
    },
  })
    .then((res) => {
        // store meals list in state
        console.log(res)
        this.setState({ meals: res.data.meals });
    })
    .catch((res) => {
        console.log("pleasecatch")      
    })
}
  // function to execute when component is mounted
  componentDidMount() {
 
    this.getdata();
     // fetch data function
  }

  // render the jsx with proper data
  render() {
      const data = this.state.meals;
      
    // calculate sum of calories from the meal list
    var sum = 0;
    data.forEach(function (obj) {
      sum += obj.calories;
    });
    console.log(sum);
    
      if (data.length > 0) {
        return (
        <div>
          <Navbar />
          <div className="meallist">   
            <div className='project-list section'>
            <JumboTron currentSum={sum} />
              <div className='card-columns'>
                {data &&
                  data.map((meal) => {
                    return (
                      <div key={meal._id}>
                        <MealSummary meal={meal}  getdata={this.getdata} />
                      </div>
                    );
                  })}
                      </div>
              </div>
            </div>
        </div>
        );
      }else {
        return <div>
        <Navbar />
          
          <div>
            Add Some Meals!!</div>
        </div>;
      }
    
  }
}

export default Dashboard;
