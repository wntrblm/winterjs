function _e(x) {
    if (typeof x === "string") {
        return document.getElementById(x);
    }
    return x;
}

export class ValueDisplay {
    constructor(elem, formatter, display_elem) {
        this.elem = _e(elem);

        if (formatter === undefined) {
            formatter = (input) => input.value;
        }
        if (display_elem === undefined) {
            display_elem = _e(`${this.elem.name}_value_display`);
        }
        if (typeof display_elem === "string") {
            display_elem = _e(display_elem);
        }

        const update = () => {
            display_elem.innerText = formatter(this.elem);
        };

        this.elem.addEventListener("input", update);

        // Call it once to update it from the default value.
        update();
    }
}

export class InputBinding {
    constructor(elem, data, key = undefined) {
        this.elem = _e(elem);

        this.data = data;

        if (key === undefined) {
            key = this.elem.name;
        }

        this.key = key;

        this.bind();
    }

    bind() {
        this.elem.addEventListener("change", () => {
            this.update_data();
        });

        this.elem.addEventListener("data_update", () => {
            this.update_value();
        });

        this.update_value();
    }

    value_to_data(value) {
        return value;
    }

    data_to_value(value) {
        return value;
    }

    update_value() {
        this.elem.value = this.data_to_value(this.data[this.key]);
    }

    update_data() {
        this.data[this.key] = this.value_to_data(this.elem.value);
        console.log(this.data);
    }
}

export class MixMaxInputBinding {
    update_data() {
        const min = parseFloat(this.elem.min);
        const max = parseFloat(this.elem.max);

        if (!isNaN(min) && !isNaN(max)) {
            const value = this.elem.valueAsNumber;
            if (value < min) {
                this.elem.value = min;
            }
            if (value > max) {
                this.elem.value = max;
            }
        }

        this.data[this.key] = this.value_to_data(this.elem.value);
        console.log(this.data);
    }
}

export class IntInputBinding extends MixMaxInputBinding {
    value_to_data(value) {
        return parseInt(value);
    }
}

export class FloatInputBinding extends MixMaxInputBinding {
    constructor(elem, data, key, precision = 2) {
        super(elem, data, key);
        this.precision = precision;
    }

    value_to_data(value) {
        return parseFloat(value);
    }

    data_to_value(value) {
        return value.toFixed(this.precision);
    }
}

export class CheckboxInputBinding extends InputBinding {
    update_value() {
        this.elem.checked = this.data[this.key] ? true : false;
    }

    update_data() {
        this.data[this.key] = this.elem.checked;
        console.log(this.data);
    }
}

export function bind(form, data) {
    for (const elem of form.querySelectorAll("input[data-binding-type=int]")) {
        new IntInputBinding(elem, data);
    }

    for (const elem of form.querySelectorAll(
        "input[data-binding-type=float]"
    )) {
        new FloatInputBinding(
            elem,
            data,
            undefined,
            elem.dataset.bindingPrecision
        );
    }

    for (const elem of form.querySelectorAll(
        "input[data-binding-type=checkbox]"
    )) {
        new CheckboxInputBinding(elem, data);
    }
}

export function update_values(form) {
    for (const elem of form.querySelectorAll("[data-binding-type]")) {
        elem.dispatchEvent(new CustomEvent("data_update"));
    }
}

export function bind_value_displays(form) {
    for (const elem of form.querySelectorAll("[data-value-display]")) {
        switch (elem.dataset.valueDisplay) {
            case "":
                new ValueDisplay(elem);
                break;
            case "percent":
                new ValueDisplay(elem, (input) =>
                    Math.round(input.value * 100)
                );
                break;
            case "float":
                new ValueDisplay(elem, (input) =>
                    input.valueAsNumber.toFixed(
                        elem.dataset.valueDisplayPrecision
                    )
                );
                break;
            default:
                new ValueDisplay(
                    elem,
                    new Function(
                        "input",
                        `"use strict"; return ${elem.dataset.valueDisplay}`
                    )
                );
                break;
        }
    }
}
