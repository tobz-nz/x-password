customElements.define('x-password', class extends HTMLInputElement {
    static get observedAttributes() {
        return ["visible"]
    }

    connectedCallback() {
        if (this.hasAttribute('confirm-target')) {
            const confirmTarget = document.getElementById(this.getAttribute('confirm-target'))

            this.addEventListener('input', () => {
                this.setCustomValidity('')
            })

            this.addEventListener('blur', () => {
                if (!confirmTarget || confirmTarget.value != this.value) {
                    this.setCustomValidity('Passwords do not match')
                }
            })
        }

        this.addEventListener('mousedown', () => {
            if (document.activeElement == this) {
                this.toggleAttribute('visible')
            }
        })
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (property === 'visible') {
            this.setAttribute('type', newValue !== null ? 'text' : 'password')
        }
    }
}, { extends: 'input' });
