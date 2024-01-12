// https://dev.to/stuffbreaker/custom-forms-with-web-components-and-elementinternals-4jaj

customElements.define('x-password', class extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return ['visible']
    }

    $input = null
    _visible = false

    constructor() {
        super()

        this._internals = this.attachInternals()
        this._internals.role = "textbox"
        this.tabindex = 0
        this._visible = this.hasAttribute('visible')
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({
            mode: 'open',
            delegatesFocus: true
        })
        shadowRoot.innerHTML = `
            <input type="password" role="none" />
            <slot name="icon">
                <svg width="0.9em" height="0.9em" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="var(--icon-color, currentColor)">
                    <path id="visible"${!this._visible ? ' hidden' :''} d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10 6.979 0 13.027-4.064 16-10-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303-2.799 0-5.527-0.796-7.889-2.303-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228zM16 12.813c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
                    <path id="hidden"${this._visible ? ' hidden' :''} d="M26.229 9.263c2.426 1.72 4.418 4.034 5.771 6.737-2.973 5.936-9.021 10-16 10-1.955 0-3.837-0.319-5.599-0.909l2.436-2.436c1.033 0.228 2.093 0.345 3.163 0.345 2.799 0 5.527-0.796 7.889-2.303 1.88-1.199 3.473-2.805 4.67-4.697-1.158-1.83-2.688-3.392-4.489-4.578l2.159-2.159zM16 21.813c-0.71 0-1.399-0.093-2.054-0.267l9.787-9.787c0.174 0.655 0.267 1.344 0.267 2.054 0 4.418-3.582 8-8 8zM30 0h-1.679l-6.863 6.863c-1.721-0.56-3.555-0.863-5.458-0.863-6.979 0-13.028 4.064-16 10 1.333 2.662 3.285 4.947 5.662 6.658l-5.662 5.662v1.679h1.679l28.321-28.321v-1.679zM13 9.813c1.501 0 2.745 1.103 2.965 2.543l-3.423 3.423c-1.44-0.22-2.543-1.464-2.543-2.965 0-1.657 1.343-3 3-3zM3.441 16c1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 1.829 0.614 3.514 1.647 4.861l-1.83 1.83c-1.752-1.176-3.242-2.712-4.376-4.503z" />
                </svg>
            </slot>
        `

        const sheet = new CSSStyleSheet()
        sheet.replaceSync(`
            :host {
                position: relative;
                display: inline flex;
                align-items: center;
            }
            slot > * {
                position: absolute;
                right: 0.25em;
            }
            [hidden] {display: none}
        `)
        shadowRoot.adoptedStyleSheets.push(sheet)

        this.$input = shadowRoot.querySelector('input')
        this.$input.setAttribute('type', this._visible ? 'text' : 'password');

        ['disabled', 'required', 'readonly', 'autofocus'].forEach(attr => {
            this.$input.toggleAttribute(attr, this.hasAttribute(attr))
        });

        ['value', 'placeholder', 'pattern', 'autocomplete', 'min', 'max'].forEach(attr => {
            if (this.hasAttribute(attr)) {
                this.$input.setAttribute(attr, this.getAttribute(attr) || '')
            }
        })

        this._internals.setFormValue(this.getAttribute('value'))
        this._internals.setValidity(
            this.$input.validity,
            this.$input.validationMessage,
            this.$input
        )

        this.$input.addEventListener("input", () => this.handleInput())

        if (!this.getAttribute('type')) {
            this.setAttribute('type', 'password')
        }

        if (this.hasAttribute('confirm-target')) {
            const confirmTarget = document.getElementById(this.getAttribute('confirm-target'))

            this.$input.addEventListener('blur', () => {
                this.handleInput()

                if (!confirmTarget || confirmTarget.value != this.$input.value) {
                    this._internals.setValidity(
                        {customError: true},
                        'Passwords do not match',
                        this.$input
                    )
                }
            })

            // set initial validity message
            this.dispatchEvent(new Event('blur'))
        }

        shadowRoot.querySelector('svg').addEventListener('click', event => {
            this.toggleAttribute('visible')
        })
    }

    attributeChangedCallback(property, oldValue, newValue) {
        switch (property) {
            case 'visible':
                let visible = newValue !== null
                if (this.$input) {
                    this.$input.setAttribute('type', visible ? 'text' : 'password')
                    this.shadowRoot?.querySelector('#visible').toggleAttribute('hidden', !visible)
                    this.shadowRoot?.querySelector('#hidden').toggleAttribute('hidden', visible)
                }
                break
            case 'disabled':
                this.$input.disabled = newValue
                break
            case 'required':
                this.$input.required = newValue
                break
            case 'readonly':
                this.$input.readonly = newValue
                break
            case 'value':
                this.$input.value = newValue
                break
            case 'placeholder':
                this.$input.placeholder = newValue
                break
        }
    }

    handleInput() {
        this._internals.setValidity(
            this.$input.validity,
            this.$input.validationMessage,
            this.$input
        )
        this._internals.setFormValue(this.getAttribute('value'))
    }

    checkValidity() {
        return this._internals.checkValidity()
    }

    reportValidity() {
        return this._internals.reportValidity()
    }

    get validity() {
        return this._internals.validity
    }

    get validationMessage() {
        return this._internals.validationMessage
    }
})
