class FootballDashboardCard extends LitElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.listenersAdded = false;
  }

  setConfig(config) {
    if (!window.customElements.get('hui-generic-entity-row')) {
      throw new Error('Resource is not loaded: hui-generic-entity-row');
    }

    this.config = config;
    // Only render once
    if (!this.shadowRoot.innerHTML) {
      this.render();
    }
  }
  
  set hass(hass) {
    this._hass = hass;
    if (!this.config) return;

    // Example: grab entity state for later use
    // const stateObj = hass.states[this.config.entity];
    // if (stateObj) {
    //   this._someData = stateObj.state;
    // }
  }

  /** Main render function for the card’s content */
  render() {
    if (!this.config || !this._hass) {
      return html`<hui-warning>Missing configuration or hass object</hui-warning>`;
    }

    // Grab the entity data
    const stateObj = this._hass.states[this.config.entity];
    const title = this.config.title || 'Football Dashboard';

    // Render a simple layout
    return html`
      <ha-card>
        <h1 style="margin: 16px;">${title}</h1>
        <div style="padding: 0 16px 16px;">
          ${stateObj
            ? html`<p>Current state: <strong>${stateObj.state}</strong></p>`
            : html`<p>Entity not found: ${this.config.entity}</p>`}
        </div>
      </ha-card>
    `;
  }

  /** Tells Home Assistant how many “units” tall the card is (optional) */
  getCardSize() {
    return 3;
  }

  /** Custom CSS for the card */
  static getStubConfig() {
    return {
      entity: '',
      teamName: '',
      league: '',
    };
  }
}
customElements.define('football-dashboard-card', FootballDashboardCard);


// Code to show the card in HA card-picker
const FootballDashboardCardDescriptor = {
    type: 'football-dashboard-card', // Must match the type you use in your YAML configuration
    name: 'Football Dashboard Card', // Friendly name for the card picker
    description: 'A custom card to show football dashboard', // Short description
    preview: false, // Optional: Set to true to show a preview in the picker
    documentationURL: 'https://justpaste.it/38sr8', // Optional: Link to your documentation (replace with your actual documentation link if available)
};

// Ensure window.customCards is initialized
window.customCards = window.customCards || [];

// Add your card to the customCards array
window.customCards.push(FootballDashboardCardDescriptor);