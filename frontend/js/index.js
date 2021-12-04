async function main() {
  console.log("111");
  // fill the html select with state option
  {
    try {
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
    } catch (error) {
      console.log("hi", error);
    }
  }
  {
    const response = await fetch("/covid-data");
    console.log(await response.json());
  }
}

main();
