const populate = async (value, currency) => {
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_MAZczJLO8hWyJYiqSySHZAyaKNHtB0FFVrmEqiJ2&base_currency=${currency}`;

    try {
        const response = await fetch(url);
        const rJson = await response.json();

        document.querySelector(".output").style.display = "block";
        console.log(rJson);

        let myStr = "";
        for (const key of Object.keys(rJson.data)) {
            myStr += `
                <tr>
                    <td>${key}</td>
                    <td>${rJson.data[key].code}</td>
                    <td>${Math.round(rJson.data[key].value * value)}</td>
                </tr>
            `;
        }

        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = myStr;
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
    }
};

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Button is clicked");

    const value = parseInt(document.querySelector("input[name='quantity']").value, 10);
    const currency = document.querySelector("select[name='currency']").value;

    populate(value, currency);
});

