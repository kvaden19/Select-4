import React from "react";
import Swal from "sweetalert2";

const Winner = () => {

return (
    <div>
      <h1 style={{
        display: "flex",
        justifyContent: "Center",
        alignItems: "Right",
        marginTop: "30vh",
        height: "30vh",
      }}>You Have Won</h1>

      <p>You Have a Winning Ticket,  please go to your nearest participating, Western Union to Cash Out!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          There are none yet but hey!!!! you won
      </p>
    </div>
  );
};

Swal.fire({
    title: "Congratulations",
    text: "You Won 1,000.00 Dollars",
    imageUrl:
      "https://media.istockphoto.com/vectors/winner-retro-banner-vector-id1192939892?k=6&m=1192939892&s=612x612&w=0&h=VGcFn5IqcQBD337faACLfIMe3GMD25hptoR9uqddQ6M=",
    imageWidth: 800,
    imageHeight: 400,
    imageAlt: "Jackpot",
  });

export default Winner;