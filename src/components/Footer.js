import React from 'react';

const style = {
    // backgroundColor: "#000000",
    textAlign: "center",
    padding: "20px",
    // position: "",
    left: "0",
    bottom: "0",
    height: "10em",
    width: "100%",
};

const phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }

function Footer({ children }) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                { children }
            </div>
        </div>
    )
}

export default Footer;