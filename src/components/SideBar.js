import React from 'react';
import Form from './Form';

class SideBarComponent extends React.Component {
    state = {
        menu: [{ id: 1, name: 'Vivair' }, { id: 2, name: 'Avianca' }],
        company: 'Vivair'
    };
    activateLasers=(item) =>{
        // console.log(name);
        // this.state.company = name;
        this.setState({
            company:item
        })
    }
    
    render() {
        return (
            <div>
                <nav className="navbar">
                    <span className="navbar-toggle" id="js-navbar-toggle">
                        <i className="fas fa-bars"></i>
                    </span>
                    <a href="#" className="logo">Logo</a>
                    <ul className="main-nav" id="js-menu">
                        {
                            this.state.menu.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <a className="nav-links" onClick={()=>this.activateLasers(item.name)}>{item.name}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <Form company={this.state.company} />
            </div>
        )
    }
}
export default SideBarComponent