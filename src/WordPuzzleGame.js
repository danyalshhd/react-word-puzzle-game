import React, { useState, useEffect } from "react";
import Trie from "./Trie";
import "./WordPuzzleGame.css"; // Import CSS file for styling

const WordPuzzleGame = () => {
  const [input, setInput] = useState("");
  const [isValidWord, setIsValidWord] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [revealedLetters, setRevealedLetters] = useState(Array(26).fill(false)); // Array to store revealed state for each letter
  const [trie, setTrie] = useState(new Trie()); // Initialize Trie state
  const [words, setWords] = useState([
    "react",
    "javascript",
    "computer",
    "science",
  ]);

  // Initialize Trie when component mounts
  useEffect(() => {
    initializeTrie();
  }, []);

  // Function to initialize Trie with sample words
  const initializeTrie = () => {
    const newTrie = new Trie();
    words.forEach((word) => newTrie.insert(word));
    setTrie(newTrie);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFound = trie.search(input.toLowerCase());
    if (isFound) {
      // reveal word
      setIsValidWord(true);
      setFoundWords((prev) => [...prev, input]);
      setInput("");
    } else {
      setIsValidWord(false);
    }
  };

  const revealLetter = (letter) => {
    const index = letter.charCodeAt(0) - "a".charCodeAt(0);
    setRevealedLetters((prev) => {
      const newRevealedLetters = [...prev];
      newRevealedLetters[index] = true;
      return newRevealedLetters;
    });
  };

  const renderGrid = () => {
    return (
      <div className="grid">
        {words.map((word, index) => (
          <div key={index} className="grid-word">
            {word.split("").map((letter, idx) => (
              <div
                key={idx}
                className={`grid-item ${
                  foundWords.includes(word) ||
                  revealedLetters[letter.charCodeAt(0) - "a".charCodeAt(0)]
                    ? "revealed"
                    : ""
                }`}
                onClick={() => revealLetter(letter)}
              >
                {foundWords.includes(word) ||
                revealedLetters[letter.charCodeAt(0) - "a".charCodeAt(0)]
                  ? letter
                  : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">Word Puzzle Game</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button">
          Check
        </button>
      </form>
      {isValidWord && <p className="message">Valid word!</p>}
      {!isValidWord && input && <p className="message">Not a valid word.</p>}
      {renderGrid()}
    </div>
  );
};

export default WordPuzzleGame;
