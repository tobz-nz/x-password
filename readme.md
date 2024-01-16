A password input natively enhanced via a Custom Element (Web Component).

It adds the ability to toggle visibility and validation to confirm it matches the value of another field

## Demo

> [Check it live](http://tobz-nz.github.io/x-password/demo.html).

## Usage

```html
<script src="https://tobz-nz.github.io/x-password/x-password.js" type="module"></script>

<form onsubmit="return false">
    <label for="password">Password</label>
    <input type="password" name="password" id="password">

    <br>

    <label for="password_confirm">Confirm Password</label>
    <input is="x-password" name="password_confirm" id="password_confirm" confirm-target="password">
    <button type="button" onclick="document.getElementById('password_confirm').toggleAttribute('visible')">Toggle Visibility</button>

    <br>  
  
    <button>Go</button>
</form>
```

## Options

Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`visible`  | -                         | null                | Set the value to visible (plain text)
`confirm-target`  | *string*           | null                | The ID of another field to match

## History

* v0.2 Jan 9, 2024
	* re-release as fully native web-component
* v0.1 Feb 5, 2014
	* initial release

## License

[MIT License](http://opensource.org/licenses/MIT)
