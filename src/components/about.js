import React, { Component } from 'react';

export class About extends Component {
    
    
    render(){
        return(
            <div className="row">
                <div className="col">
                    <h3><b>About</b></h3>
                    <p>
                        This web application is only using for my study about Headless CMS. You may want to know more about this project on my <a rel="noreferrer noopen" target="_bank" href="https://github.com/nguyenkhois/cms-flowershop">GitHub</a> page.
                    </p>
                    <p>Using for development and deployment:</p>
                    <ul>
                        <li>React, Redux, React-Router</li>
                        <li>Strapi</li>
                        <li>Docker</li>
                        <li>Amazon Web Services (AWS)</li>
                        <li>And many more...</li>
                    </ul>

                    <p>
                        Resources for images and product information:
                    </p>
                    <ul>
                        <li><a rel="noreferrer noopen" target="_bank" href="https://www.blomsterlandet.se/">Blomsterlandet.se</a></li>
                        <li><a rel="noreferrer noopen" target="_bank" href="http://www.pamsartisticflorist.co.uk/">Pamsartisticflorist.co.uk</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}