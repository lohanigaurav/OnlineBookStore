import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        {/* <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div> */}
        <br></br><br></br><br></br><br></br>
        <div className={className}>{children}</div>
        <footer class="footer-container container-fluid p-5 bg-light mt-4">
            <p className="text-right">Copy Right @ New Chapter Inc.</p>
        </footer>
    </div>
);

export default Layout;
