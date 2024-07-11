import React, { useState, useEffect } from "react";
import "./WordPuzzleGame.css"; // Import CSS file for styling
import PuzzleService from './services/puzzle';
import "bootstrap/dist/css/bootstrap.min.css";

const Leaderboard = ({user}) => {

    const [leaderboard, setLeaderboard] = useState([]);
    // Initialize Trie when component mounts
    useEffect(() => {
        
        const request = () =>
            
            PuzzleService.getLeaderboard(user)
                .then((response) => {
                    setLeaderboard((prevItems) => ([
                        ...prevItems,
                        ...response,
                    ]))
                });
        request();
    }, []);

    return (
        <div className="container">
            <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Score</td>
                    <td>Time Taken</td>
                </tr>
            </thead>
            <tbody>
                {leaderboard && leaderboard.map((lead, key) => {
                    return (
                        <tr key={key}>
                            <td>{lead.user}</td>
                            <td>{lead.score}</td>
                            <td>{lead.timeFinished}</td>
                    </tr>
                    )
                    
                })}
                </tbody>
            </table>
            
        </div>
    );
};

export default Leaderboard;
