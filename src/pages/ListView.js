import React, { Component } from "react";
import ColorList from "../components/ColorList/colorList";
import "./ListView.css";

class ListView extends Component {
    render() {
        return (
            <div className="listView">
                <ColorList />
            </div>
        )
    }
}

export default ListView;
