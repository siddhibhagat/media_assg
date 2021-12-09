const covid_data = {};

async function main() {
  // fill the html select with state option
  {
    const us_state = document.getElementById("us_state");
    const response = await fetch("./data/states.json");
    const data = await response.json();
    // fill the data
    Object.entries(data).forEach(([code, name]) => {
      const optionElm = document.createElement("option");
      optionElm.value = code;
      optionElm.text = name;

      us_state.insertAdjacentElement("beforeend", optionElm);
    });
  }

  {
    const response = await fetch("/covid-data");
    const data = await response.json();

    data.US_MAP_DATA.forEach((d) => {
      covid_data[d.abbr] = {
        total_cases: d.tot_cases,
        recovered_cases: d.incidence,
        deaths_cases: d.tot_death,
      };
    });
  }

  // listener
  const state = document.getElementById("us_state").value;
  const covid = getCovidDataForSelectState(state);

  Object.entries(covid).forEach(([type, number]) => {
    document.getElementById(type).innerText = new Intl.NumberFormat().format(
      number
    );
  });

  document.getElementById("us_state").addEventListener("change", (ev) => {
    const state = ev.target.value;
    const covid = getCovidDataForSelectState(state);

    Object.entries(covid).forEach(([type, number]) => {
      document.getElementById(type).innerText = new Intl.NumberFormat().format(
        number
      );
    });
  });
}

function getCovidDataForSelectState(state) {
  return covid_data[state];
}

main();
