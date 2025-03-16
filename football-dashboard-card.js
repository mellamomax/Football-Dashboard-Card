class FootballDashboardCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.listenersAdded = false;
  }

  setConfig(config) {
    this.config = config;
    this.render();
  }
  
  set hass(hass) {
    this._hass = hass;
    if (!this.config) return;
    this.render();
  }

  render() {
    if (!this.config || !this._hass) {
      this.shadowRoot.innerHTML = `<hui-warning>Missing configuration or hass object</hui-warning>`;
      return;
    }

    // Grab entity state if needed
    const stateObj = this._hass.states[this.config.entity];
    const title = this.config.title || 'Football Dashboard';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: sans-serif;
        }
        ha-card {
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0,0,0,0.15));
          margin: 16px;
          padding: 16px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .header-left {
          display: flex;
          align-items: center;
        }
        .team-logo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 8px;
        }
        .season {
          font-size: 14px;
          color: #666;
        }
        .header-center {
          flex: 1;
          text-align: center;
        }
        .team-name {
          font-size: 24px;
          font-weight: bold;
        }
        .header-right {
          /* Manager photo container */
        }
        .manager-photo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }
        .content {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 16px;
        }
        .column h3 {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: bold;
        }
        .list-item {
          padding: 4px 0;
          border-bottom: 1px solid #ddd;
        }
        .center-content {
          background-color: #f9f9f9;
          padding: 8px;
          border-radius: 4px;
        }
        .match-header {
          font-weight: bold;
          margin-bottom: 4px;
        }
        .news-item {
          margin-bottom: 8px;
        }
      </style>
      <ha-card>
        <!-- Updated Header -->
        <div class="header">
          <div class="header-left">
            <img class="team-logo" src="${this.config.teamLogo || 'https://via.placeholder.com/48'}" alt="Team Logo">
            <div class="season">${this.config.season || 'Season 2024/25'}</div>
          </div>
          <div class="header-center">
            <div class="team-name">${this.config.teamName || 'Barcelona'}</div>
          </div>
          <div class="header-right">
            <img class="manager-photo" src="${this.config.managerPhoto || 'https://via.placeholder.com/48'}" alt="Manager Photo">
          </div>
        </div>

        <!-- Content area remains unchanged -->
        <div class="content">
          <!-- Left Column: Matches -->
          <div class="column">
            <h3>Matches</h3>
            <div class="list-item">Match 1</div>
            <div class="list-item">Match 2</div>
            <div class="list-item">Match 3</div>
            <div class="list-item">Match 4</div>
          </div>
          <!-- Center Column: Upcoming, Line Up, News -->
          <div class="column center-content">
            <h3>Upcoming</h3>
            <div class="match-header">Atlético vs Barcelona</div>
            <div>Today at 18:30</div>
            <div>Kickoff in 3 hours</div>
            <br />
            <div class="match-header">LINE UP</div>
            <div class="list-item">Player 1</div>
            <div class="list-item">Player 2</div>
            <div class="list-item">Player 3</div>
            <br />
            <div class="match-header">NEWS</div>
            <div class="news-item">
              <strong>Title</strong><br>
              Description
            </div>
            <div class="news-item">
              <strong>Another Title</strong><br>
              Another Description
            </div>
          </div>
          <!-- Right Column: Table -->
          <div class="column">
            <h3>Table</h3>
            <div class="list-item">Entry 1</div>
            <div class="list-item">Entry 2</div>
            <div class="list-item">Entry 3</div>
            <div class="list-item">Entry 4</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 3;
  }

  static getStubConfig() {
    return {
      entity: '',
      teamName: '',
      teamLogo: '',
      season: '',
      managerPhoto: '',
      league: '',
      title: '',
    };
  }
}

customElements.define('football-dashboard-card', FootballDashboardCard);

// Descriptor for the Lovelace card picker.
const FootballDashboardCardDescriptor = {
  type: 'football-dashboard-card',
  name: 'Football Dashboard Card',
  description: 'A custom card to show football dashboard',
  preview: false,
  documentationURL: 'https://justpaste.it/38sr8',
};

window.customCards = window.customCards || [];
window.customCards.push(FootballDashboardCardDescriptor);
