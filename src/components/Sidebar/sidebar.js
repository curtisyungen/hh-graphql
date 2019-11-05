import React, { Component } from "react";
import "./sidebar.css";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorMenu: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            colorMenu: this.props.colorMenu,
        });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState({
                colorMenu: this.props.colorMenu,
            });
        }
    }

    render() {
        return (
            <div className="sidebar">
                <button 
                    className="btn btn-light allBtn"
                    onClick={this.props.getAllColors}
                >
                    All Colors
                </button>
                <button 
                    className="btn btn-light randomBtn"
                    onClick={this.props.getRandomColor}
                >
                    Random Color
                </button>

                <div className="colorMenu">
                    {this.state.colorMenu && this.state.colorMenu.length > 0 ? (
                        this.state.colorMenu.map(color => (
                            <div 
                                key={color}
                                className="menuItem"
                                onClick={this.props.getColor.bind(null, color)}
                            >
                                {color}
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        )
    }
}

export default Sidebar;
