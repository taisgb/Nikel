const myModal = new bootstrap.Modal("#transferencias-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transferencias: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("button-trans").addEventListener("click", function(){
    window.location.href = "transferencias.html";
});

// ADICIONAR LANÇAMENTO
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

    saveData(data);
    e.target.reset();
    myModal.hide();

    getCashIn();
    getCashOut();
    getTotal();
    alert("Registro adicionado com sucesso!");
});

// CHECAGEM DE LOGIN
checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

// ENTRADAS
function getCashIn() {
    const transferencias = data.transferencias;
    const cashIn = transferencias.filter((item) => item.type === "1");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = cashIn.length > 5 ? 5 : cashIn.length;

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
                <div class="row mb-4">
                  <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                      <div class="row">
                        <div class="col-12-mb-8">
                          <p>${cashIn[index].description}</p>
                        </div>
                        <div class="col-12-md-3 d-flex justify-content-end">
                          ${cashIn[index].date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

// SAÍDAS
function getCashOut() {
    const transferencias = data.transferencias;
    const cashOut = transferencias.filter((item) => item.type === "2");

    if (cashOut.length) {
        let cashOutHtml = ``;
        let limit = cashOut.length > 5 ? 5 : cashOut.length;

        for (let index = 0; index < limit; index++) {
            cashOutHtml += `
                <div class="row mb-4">
                  <div class="col-12">
                    <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                      <div class="row">
                        <div class="col-12-mb-8">
                          <p>${cashOut[index].description}</p>
                        </div>
                        <div class="col-12-md-3 d-flex justify-content-end">
                          ${cashOut[index].date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
        }

        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    }
}

// TOTAL
function getTotal() {
    const transferencias = data.transferencias;
    let total = 0;

    transferencias.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

// SALVAR DADOS
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
