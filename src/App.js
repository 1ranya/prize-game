import React, { useState } from "react";
import logo from "./logo.png"
const prizes = {
  1: "Chèque Cadeau d'une valeur de 30dt/30€",
  2: "Remise de 50% sur tous les articles",
  3: "80% de réduction sur le deuxième article acheté",
  4: "Un Scrunchie gratuits",
};
const greenColor = "#2a9d8f"
const logoMainColor = "rgb(179 139 41)"
const importantButtonStyle = {
  borderRadius: "5px",
  padding: "15px",
  backgroundColor: logoMainColor,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  fontWeight: "bold",
  fontSize: "1rem",
  color: "white",
  border: "none",
};
const buttonStyle = {
  borderRadius: "5px",
  padding: "15px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  fontWeight: "bold",
  fontSize: "1rem",
  color: logoMainColor,
  border: "0.5px solid",
};

const inputStyle = {
  borderRadius: "5px",
  padding: "5px"
}

const App = () => {
  const [participants, setParticipants] = useState([]);
  const [winners, setWinners] = useState([]);
  const [isResult, setIsResult] = useState(false);

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: "", choice: 1 }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedParticipants = [...participants];
    updatedParticipants[index] = { ...updatedParticipants[index], [name]: value };
    setParticipants(updatedParticipants);
  };

  const groupParticipants = () => {
    const groups = {
      1: [],
      2: [],
      3: [],
      4: [],
    };

    participants.forEach((participant) => {
      groups[participant.choice].push(participant);
    });

    return groups;
  };

  const handleGenerateWinners = () => {
    const groups = groupParticipants();
    const selectedWinners = [];

    const getRandomWinner = (group) => {
      if (group.length > 0) {
        const index = Math.floor(Math.random() * group.length);
        const winner = group.splice(index, 1)[0];
        selectedWinners.push(winner);
        setIsResult(true)
      }
    };

    while (selectedWinners.length < 5) {
      for (let choice = 1; choice <= 4; choice++) {
        getRandomWinner(groups[choice]);
      }
    }

    setWinners(selectedWinners.slice(0, 5));
  };

  return (
    <div
      style={{
        textAlign: "center"
      }}
    > 
    <lord-icon
    src="https://cdn.lordicon.com/kbtmbyzy.json"
    trigger="loop"
    colors="primary:#121331,secondary:#08a88a"
    style={{width:"150px",height:"150px"}}>
    </lord-icon>
    <h1 style={{
      margin:0
      }}>Le 04 Aout 2023</h1>
    <img src={logo} alt="logo" width={200} height={270}></img>
      <h1 style={{
        margin: 0,
        color: logoMainColor,
      }}>Tirage au Sort Bloomier Jewelry</h1>
      <h3
      style={{
        marginTop: 0,
        // fontWeight: "normal",
        letterSpacing: "5px"
      }}
      >5 Heureux Gagnants !</h3> 
      { !isResult && 
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          justifyContent: "center"
        }}>
          <button 
            style={buttonStyle} 
            onClick={handleAddParticipant}
          >Add Participant
          </button>
          <button 
            style={importantButtonStyle} 
            onClick={handleGenerateWinners}
            >Generate Winners
          </button>
        </div>
      }
      <br />
      {!isResult && (participants.map((participant, index) => (
        <div 
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            justifyContent: "center",
            marginBottom: "5px"
          }}
        >
          <input
            style={inputStyle}
            type="text"
            placeholder="Name"
            name="name"
            value={participant.name}
            onChange={(e) => handleInputChange(index, e)}
          />
          <select
            style={inputStyle}
            name="choice"
            value={participant.choice}
            onChange={(e) => handleInputChange(index, e)}
          >
            <option value={1}>Gift of value 30€</option>
            <option value={2}>Discount 80%</option>
            <option value={3}>50% off for the second purchased item</option>
            <option value={4}>Free scrunchie</option>
          </select>
        </div>)
      ))}
      {isResult && <h2
      style={{
        marginBottom: 0,
        letterSpacing: "5px",
        color: greenColor
      }}>Winners:</h2>}
      <div
      style={{
        display: "flex",
        flexDirection: "rows",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {
        isResult && 
        (<lord-icon
            src="https://cdn.lordicon.com/ihyatngg.json"
            trigger="loop"
            colors="primary:#4be1ec,secondary:#cb5eee"
            style={{width:"250px",height:"250px"}}>
        </lord-icon>)
      }
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {winners.map((winner, index) => (
          <span 
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px"
          }}
          key={index}>
            <span
            style={{
              fontWeight: "bold",
              color: greenColor
            }}>
              @{winner.name} - 
            </span>
            <span>
              {prizes[winner.choice]}
            </span>
          </span>
        ))}
      </div>
      </div>
    </div>
  );
};

export default App;
