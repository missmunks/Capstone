import React from 'react';

const style = {
    // backgroundColor: "#000000",
    // borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    left: "0",
    top: "0",
    height: "15em",
    width: "100%",
};

const phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }

function Header({ children }) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                { children }
            </div>
        </div>
    )
}

export default Header;