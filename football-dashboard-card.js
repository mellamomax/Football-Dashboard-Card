import { LitElement, html, css } from 'lit';

/** MAIN CARD CLASS */
class FootballDashboardCard extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object },
    };
  }

  /** Called when the card is added in the editor */
  static getConfigElement() {
    return document.createElement('football-dashboard-card-editor');
  }

  /** Defaults for when you add the card the first time */
  static getStubConfig() {
    return {
      entity: 'sensor.football_data',
      title: 'Football Dashboard',
    };
  }

  /** Called when the user saves the config in the editor */
  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }

  /**
   * This is called whenever Home Assistant state changes.
   */
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
  static get styles() {
    return css`
      :host {
        display: block;
      }
      ha-card {
        border-radius: var(--ha-card-border-radius, 4px);
        box-shadow: var(--ha-card-box-shadow);
      }
    `;
  }
}
customElements.define('football-dashboard-card', FootballDashboardCard);

/** CONFIG EDITOR CLASS */
class FootballDashboardCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  setConfig(config) {
    this.config = { ...config };
  }

  get _entity() {
    return this.config.entity || '';
  }

  get _title() {
    return this.config.title || '';
  }

  render() {
    if (!this.hass) {
      return html`<p>Loading Home Assistant data...</p>`;
    }

    return html`
      <div class="card-config">
        <paper-input
          label="Entity"
          .value=${this._entity}
          .configValue=${'entity'}
          @value-changed=${this._valueChanged}
        ></paper-input>

        <paper-input
          label="Card Title"
          .value=${this._title}
          .configValue=${'title'}
          @value-changed=${this._valueChanged}
        ></paper-input>
      </div>
    `;
  }

  /** Update config whenever inputs change */
  _valueChanged(e) {
    if (!this.config || !this.hass) return;
    const target = e.target;
    this.config = { ...this.config, [target.configValue]: target.value };
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      })
    );
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
      }
      paper-input {
        margin-bottom: 16px;
      }
    `;
  }
}
customElements.define('football-dashboard-card-editor', FootballDashboardCardEditor);

/** DESCRIPTOR for the Lovelace card picker */
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'football-dashboard-card',
  name: 'Football Dashboard Card',
  description: 'A custom card to display football data in real time.',
  preview: false,
});
