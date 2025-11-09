import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="not-found-container">
            <div className="book">
                <div className="page page1">
                    <h1>404</h1>
                    <p>Oops! The page you're looking for doesn't exist.</p>
                </div>
                <div className="page page2">
                    <p>It seems you've wandered off the path.</p>
                    <p>Let's get you back home!</p>
                    <a href="/">Go Home</a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;