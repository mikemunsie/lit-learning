import { LitElement, html, css } from "lit";
import { customElement, query, property, state } from "lit/decorators.js";
import globalStyles from "./style/global-styles";

@customElement("my-element")
export class MyElement extends LitElement {    
  @property() name = "World";
  @state() count = 0;
  @state() inputEnabled = true;
  @query(".nameInput") input!: HTMLInputElement;

  get buttonClickedText() {
    return `Button clicked ${this.count} times`;
  }

  static styles = [
    globalStyles,
    css`
      button {
        all: unset;
        background: green;
      }
    `
  ];

  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <button @click=${this.onClick}>
        ${this.buttonClickedText}
      </button>
      <input 
        class="nameInput"
        ?disabled=${!this.inputEnabled}
        @input=${this.handleUpdateName}
        .value=${this.name}
      />
      <br/>
      ${this.inputEnabled}
      <input 
        id="checkbox" 
        @change=${this.toggleInputEnabled} 
        type="checkbox" 
        .checked=${this.inputEnabled}
      /> 
      <label for="checkbox">Text Input Enabled</label>
      <slot></slot>
    `;
  }

  handleUpdateName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
  }

  toggleInputEnabled(event: Event) {
    this.inputEnabled = !this.inputEnabled;    
  }

  onClick() {
    this.count++;
  }
}