import React, { useEffect } from "react";
import { ethers } from "ethers";
import contractAbi from "../artifacts/DroneContract_metadata.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const FEE_SIZE = 3;

const onSubmit = async (droneId: any, price: any) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider;

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = provider.getSigner();
  await signer;

  /*axios.post("http://localhost:8001/drones/buydrone", {
    droneId: "0x08",
    price: "0x05f5e100",
    signer: signer,
  });*/
  const contract = new ethers.Contract(
    "0x4df6630607718412d4bFa851949e7A60fD877544",
    contractAbi.output.abi,
    signer
  );
  console.log("we got a contract", contract);

  contract.connect(signer); //.attach('0x8c8e240C723F5F850c6fdfD04a1B08598DaF6B53')
  console.log("signer:", await signer.getAddress());

  const ethdeposit = price;

  // var token=
  const val = await contract.buyDrone(droneId, {
    value: ethdeposit,
  });
  //const path = encodePath([token,val],[3000]);
  //const tx = await contract.connect(signer).deposit(ethdeposit, token, val, {value: ethdeposit});
  console.log("tx:", val);

  console.log(val);
  alert("Drone purchased successfully");
};

const BuyDronePage: React.FC = () => {
  const [droneId, setDroneId] = React.useState("");
  const [dronePrice, setDronePrice] = React.useState("");

  return (
    <>
      <div style={{ width: "100%", textAlign: "center", padding: "20px" }}>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Drone Id"
          style={{ padding: "5px" }}
          id="droneToken"
          name="droneToken"
          onChange={(e) => {
            setDroneId(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Drone price"
          style={{ padding: "5px" }}
          id="dronePrice"
          name="dronePrice"
          onChange={(e) => {
            setDronePrice(e.target.value);
          }}
        />
        <br />
        <br />
        <button
          onClick={() => {
            onSubmit(droneId, dronePrice);
          }}
          style={{ backgroundColor: "green", color: "white", padding: "20px" }}
        >
          Buy Drone
        </button>
      </div>
    </>
  );
};

export default BuyDronePage;
