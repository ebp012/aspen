var aspen = {
  print: function (text) {
    aspenConsole.innerText += "\n" + text + "\n";
  },
  note: function (text) {
    aspenConsole.innerText += text;
  },
  warn: function (text) {
    aspenConsole.innerHTML += "<br/><p style='color: gold;'>" + text + "</p><br/>;
  },
  clear: function (text) {
    aspenConsole.innerText = "";
  }
}
