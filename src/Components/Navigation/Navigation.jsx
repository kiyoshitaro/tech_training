import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx"
export default class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: [
                { name: 'About' },
                { name: 'Services' },
                { name: 'Products' },
                { name: 'List' },
                { name: 'Support' },
            ]
        }
    }
    render() {
        return (
            <div className="nav">
                <div className="nav-logo">
                    <img src={Image.logo} alt='logo' />
                </div>
                <div className="nav-items">
                    {
                        this.state.nav.map((item, index) => {
                            return (
                                <div key={index} class="nav-item">{item.name}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}