import React, { Component } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UpdateMeal from "../meals/UpdateMeal";

class MealSummary extends Component {
    state = {
        redirect: false,
        meal: this.props.meal,
        show: false,
    };

    // funtion to hide modal
    hideModal = () => {
        this.setState({ redirect: true });
    };

    //functon to delete particular meal
    handleDelete = () => {
        var date = this.props.meal.date; // set date from props from parent
        var token = cookie.get("token"); // set token from cookie
        var payload = this.props.meal._id; // set meal id from props from parent
        
        // API call to delete particular meal
        axios
            .delete('http://localhost:5000/meals/' + payload, {headers: {
                Authorization: `Basic ${token}`,
              },})
            .then((res) => {
                // if successful call getdata function from parent
                this.props.getdata();
            });
    };

    // render jsx
    render() {
        const meal = this.props.meal;
        console.log(meal)
        // redirect to "/" if true
        const redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div>
                <div className='modal' id={`myModal${meal._id}`}>
                    <div className='modal-dialog modal-xl'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h4 className='modal-title'>Update Meal</h4>
                                <button
                                    type='button'
                                    className='close'
                                    data-dismiss='modal'
                                    onClick={this.hideModal}
                                >
                                    &times;
                </button>
                            </div>

                            <div className='modal-body'>
                                <UpdateMeal children={meal} refresh={this.hideModal} />

                            </div>
                        </div>
                    </div>
                </div>

                <div className='card bg-light'>
                    <div className='card-header'>
                        <h3>{meal.mealname}</h3>
                    </div>
                    <div className='card-body'>
                        <span className='black-text right'>
                            <h5>Calories: {meal.calories}</h5>
                        </span>
                        <h6>{meal.mealtype}</h6>
                        <p>{meal.description}</p>
                    </div>
                    <div className='card-footer'>
                        <button
                            type='button'
                            className='btn btn-link'
                            data-toggle='modal'
                            data-target={`#myModal${meal._id}`}
                            style={{ paddingLeft: "20%", paddingRight: "20%" }}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='25'
                                height='25'
                                viewBox='0 0 24 24'
                            >
                                <path d='M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z' />
                            </svg>
                        </button>
                        <button
                            className='btn btn-link'
                            onClick={this.handleDelete}
                            width='25'
                            height='25'
                            style={{ paddingLeft: "20%", paddingRight: "20%" }}
                        >
                        <i class="fa fa-trash" aria-hidden="false"></i>
                            
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default MealSummary;