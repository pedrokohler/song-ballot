import "./components/activity-selector";
import "./components/select-user";
import "./components/vote-form";
import "./components/send-song-form";
import "./components/calculate-results";

const app = document.querySelector('#root')
app.innerHTML = `
    <phk-activity-selector></phk-activity-selector>
    <phk-calculate-results></phk-calculate-results>
`