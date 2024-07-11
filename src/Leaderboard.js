import React, { useState, useEffect } from "react";
import "./WordPuzzleGame.css"; // Import CSS file for styling
import PuzzleService from './services/puzzle';
import "bootstrap/dist/css/bootstrap.min.css";

const Leaderboard = () => {

    const [leaderboard, setLeaderboard] = useState([]);
    // Initialize Trie when component mounts
    useEffect(() => {

        const request = () =>
            //ProductsTemperatureDefinitions.forEach((product) => {
            PuzzleService.getLeaderboard()
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
                <tr>
                    <td>Name</td>
                    <td>Score</td>
                </tr>


                {leaderboard.map(lead => {
                    <tr>
                        <td>Name: {lead.user}</td>
                        <td>Score: {lead.score}</td>
                        <td>Time taken: {lead.timeFinished}</td>
                    </tr>
                })}
            </table>
        </div>
    );
};

export default Leaderboard;
