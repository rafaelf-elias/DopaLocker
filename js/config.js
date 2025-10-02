import { appSpecifications, getAppSpec } from './script.js';
const appSelect = document.querySelector('#appSelect');

function renderSelectOptions() {
    const html = Object.keys(appSpecifications).map(app => {
        const { name } = getAppSpec(app);
        return `
            <option value="${app}">${name}</option>
        `
    }).join('');
    if(appSelect) appSelect.innerHTML = html;
}
renderSelectOptions();