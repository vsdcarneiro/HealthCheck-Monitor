function setCellContent(array, row) {
  for (let index = 0; index < array.length; index++) {
    const status = array[index].value;
    let imagePath;
    let imageAlt;
    let imageTitle;

    if (status === 200) {
      imagePath = "./static/img/healthy.png";
      imageAlt = "healthy";
      imageTitle = "Healthy";
    } else if (status === 404) {
      imagePath = "./static/img/configuration.png";
      imageAlt = "configuration";
      imageTitle = "In configuration";
    } else {
      imagePath = "./static/img/degraded.png";
      imageAlt = "degraded";
      imageTitle = "Degraded";
    }

    const cell = document.createElement("td");
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = imageAlt;
    img.title = imageTitle;
    img.width = 26;
    img.style.padding = "5px";

    cell.appendChild(img);
    row.appendChild(cell);
  }
}

(async () => {
  // desenvolvimento
  const appADes = fetch("https://httpstat.us/200").then((res) => res.status);
  const appBDes = fetch("https://httpstat.us/200").then((res) => res.status);
  const appCDes = fetch("https://httpstat.us/500").then((res) => res.status);

  // homologação
  const appAHml = fetch("https://httpstat.us/200").then((res) => res.status);
  const appBHml = fetch("https://httpstat.us/503").then((res) => res.status);
  const appCHml = fetch("https://httpstat.us/404").then((res) => res.status);

  // produção
  const appAPrd = fetch("https://httpstat.us/200").then((res) => res.status);
  const appBPrd = fetch("https://httpstat.us/404").then((res) => res.status);
  const appCPrd = fetch("https://httpstat.us/404").then((res) => res.status);

  const allStatusCode = await Promise.allSettled([
    appADes,
    appBDes,
    appCDes,
    appAHml,
    appBHml,
    appCHml,
    appAPrd,
    appBPrd,
    appCPrd,
  ]);

  const statusAppsDes = allStatusCode.slice(0, 3);
  const statusAppsHml = allStatusCode.slice(3, 6);
  const statusAppsPrd = allStatusCode.slice(6, 9);

  const tableRow1 = document.getElementById("row-1");
  const tableRow2 = document.getElementById("row-2");
  const tableRow3 = document.getElementById("row-3");

  setCellContent(statusAppsDes, tableRow1);
  setCellContent(statusAppsHml, tableRow2);
  setCellContent(statusAppsPrd, tableRow3);

  document.getElementById("loading-apps").remove();
})();
