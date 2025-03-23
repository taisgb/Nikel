const myModal = new bootstrap.Modal("#transferencias-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transferencias: []
};

document.getElementById("button-logout").addEventListener("click", logout);

//L0GGOUT
checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {    
        window.location.href = "index.html"
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }
}

getTransferencias();

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html"
    
}

//ADICIONAR LANÇAMENTO
document.getElementById("transferencias-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;
   
    data.transferencias.unshift({
        value: value, 
        type: type, 
        description: description, 
        date: date
    });
    
    saveData (data);
    e.target.reset();
    myModal.hide();

    getTransferencias();

    alert("Registro adicionado com sucesso!");

});

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data)); 
} 

//ADD INFORMAÇÕES DAS TRANSAÇÕES NA PÁGINA

function getTransferencias() {
    const transferencias = data.transferencias;
    let transferenciasHtml = ``;

    if(transferencias.length) {
        transferencias.forEach((item) => {
            let type = "Entrada";
            if (item.type === "2"){
                type = "Saída";
            }

            const dataFormatada = formatarDataBrasileira(item.date);

            transferenciasHtml += `
                <tr>
                    <th scope="row">${dataFormatada}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                  </tr>
            `
        })
    }
    document.getElementById("transferencias-list").innerHTML = transferenciasHtml;
}

//Função para data BR
function formatarDataBrasileira(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}
