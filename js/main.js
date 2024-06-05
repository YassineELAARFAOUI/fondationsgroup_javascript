import { ABI,smartContractAddr } from "../js/config.js";
let web3,web32;
let yourAddress;
let contract;
///donate styline in java script

let adressFoundationUnitaireInput = document.getElementById("adressFoundationUnitaireInput"); 
let amountInput = document.getElementById("amountInput")
//////////////////////////////////
const init = async ()=>{
    connectMetaMaskBtn.addEventListener("click",async ()=>{
        try {
            await window.ethereum.request({method:"eth_requestAccounts"});
            yourAddress =  await window.ethereum.request({method:"eth_accounts"});
            yourAddressElm.innerText =yourAddress[0];
            // on essaye de recuperer le solde de mon cote
            web3 = new Web3(window.ethereum);
            web32 = new Web3(window.ethereum);
             contract = new web3.eth.Contract(ABI,smartContractAddr);
            let myAdressSolde = await web3.eth.getBalance(yourAddress[0]);
            myAdressSoldeELM.innerText =  parseFloat(myAdressSolde)/10**18 +" ETH";
            //recuperation des attribus de fondationsManagement
             //ratioFondationsManagement
             ratioFondationsManagementElm.innerText = await contract.methods.ratio().call(); 
             ownerFondationsManagementElm.innerText = await contract.methods.owner().call(); 
             balanceFondationsManagementElm.innerText = parseFloat(await web32.eth.getBalance(smartContractAddr))/10**18 +" ETH";
             //affichage des  uinitaire dans le samart contract global
             let mytbody = document.getElementById("mytbody");
             let nmbreDesFondations = await contract.methods.nbr_Fondations().call();
             for(let i = 0; i < nmbreDesFondations;i++){
                let adressFondation = await contract.methods.fondations(i).call();
                let  infoFondation = await contract.methods.afficherInfoFondtionUnitaire(adressFondation).call();
                let newth1 = document.createElement("th");
                let newth2 = document.createElement("th");
                let newth3 = document.createElement("th");
                let newth4 = document.createElement("th");
                newth1.textContent = adressFondation;
                newth2.textContent = parseFloat(infoFondation[2])/10**18 +" ETH";
                newth3.textContent =  parseFloat(infoFondation[3])/10**18 +" ETH";
                newth4.textContent = infoFondation[4];
                mytbody.appendChild(newth1);
                mytbody.appendChild(newth2);
                mytbody.appendChild(newth3);
                mytbody.appendChild(newth4);
              }
               
              
              donateBtn.addEventListener("click", async ()=>{
               let  adressSmartContractUniatire =adressFoundationUnitaireInput.value;
                try {
                    let result= await contract.methods.donate(adressSmartContractUniatire).send({
                         from : yourAddress[0],
                         to:adressSmartContractUniatire ,
                         value: amountInput.value
                        
                     })  
                     console.log(result);
                     alert("donate success"); 
                 } catch (e) {
                    console.log(e); 
                 }
              });
              //redeem function
              redeemBtn.addEventListener("click", async ()=>{
                let  adressSmartContractUniatirereedem =adressSmartContractUniatirereedemInput.value;
                 try {
                     let result= await contract.methods.donate(adressSmartContractUniatirereedem).send({
                          from : yourAddress[0],
                          to:adressSmartContractUniatirereedem 
                         
                      })  
                      console.log(result);
                      alert("reedem success"); 
                  } catch (e) {
                     console.log(e); 
                  }
               });
        } catch (e) {
            console.log(e);
            
        }
    });
}
init();