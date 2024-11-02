import { html, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { BaseElement } from './base-element.js';

@customElement('app-dropdown')
export class DropdownComponent extends BaseElement {
  @property({ type: Array })
  options: string[] = [];

  @property({ type: String })
  selected = '';

  handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selected = target.value;
    this.dispatchEvent(new CustomEvent('dropdown-change', {
      detail: { value: this.selected },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
        <h1>${this.options}</h1>
      <select @change="${this.handleChange}" class="p-2 text-lg border border-gray-300 rounded-md">
        ${this.options.map(
          option => html`<option value="${option}" ?selected="${this.selected === option}">${option}</option>`
        )}
      </select>
    `;
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
  }
}
