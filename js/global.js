import { getAppSpec, formatTime } from './script.js';
const header = document.querySelector('#header');
const footer = document.querySelector('#footer');

function renderHeader() {
    const html = `
        <a href="/index.html"><h1>DopaLocker Web</h1></a>
        <nav class="nav">
            <div class="navMobile">
                <i class="fas fa-bars icon"></i>
            </div>
            <ul class="navList">
                <li class="navItem"><a href="/daily.html">Uso Diário</a></li>
                <li class="navItem"><a href="/weekly.html">Uso Semanal</a></li>
                <li class="navItem"><a href="/config.html">Configurações</a></li>
            </ul>
        </nav>
    `;
    if(header) header.innerHTML = html;
}

function renderFooter() {
    const html = `
        <div class="links">
            <a href="https://github.com/rafaelf-elias" target="_blank" rel="noopener noreferrer"><i class="fab fa-github icon"></i></a>
            <a href="https://instagram.com/rafaelf.elias" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram icon"></i></a>
            <a href="https://linkedin.com/in/rafaelf-elias" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin icon"></i></a>
            <a href="https://www.figma.com/design/F8yFI7MQAcAad6eRxIjFhY/DopaLocker?node-id=0-1&t=6wmGBs9lORxLAAYI-1" target="_blank" rel="noopener noreferrer"><i class="fab fa-figma icon"></i></a>
        </div>
        <p>&copy; 2025 - Uso exclusivo para fins educacionais</p>
    `;
    if(footer) footer.innerHTML = html;
}

export function renderAppList(dayData) {
    const appList = document.querySelector('.appList');
    const html = Object.keys(dayData).map(app => {
        const { name, icon } = getAppSpec(app);
        return `
        <li class="appCard">
            <img class="appIcon" src="img/${icon}icon.png">
            <div class="appInfo">
                <p class="appName">${name}</p>
                <p class="appTime">${formatTime(dayData[app])}</p>
            </div>
        </li>
    `;}).join('');
    if (appList) appList.innerHTML = html;
}

export function renderAppTotalsList(appTotals) {
    const appList = document.querySelector('.appList');
    const sortedApps = Object.entries(appTotals).sort(([, timeA], [, timeB]) => timeB - timeA);
    const html = sortedApps.map(([app, totalTime]) => {
        const { name, icon } = getAppSpec(app);
        return `
        <li class="appCard">
            <img class="appIcon" src="img/${icon}icon.png">
            <div class="appInfo">
                <p class="appName">${name}</p>
                <p class="appTime">${formatTime(totalTime)}</p>
            </div>
        </li>
    `;}).join('');
    if (appList) appList.innerHTML = html;
}

renderHeader();
renderFooter();

class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init() {
        if (this.mobileMenu) {
            this.navList.classList.remove(this.activeClass);
            this.mobileMenu.classList.remove(this.activeClass);

            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".navMobile",
    ".navList",
    ".navList li",
);
mobileNavbar.init();