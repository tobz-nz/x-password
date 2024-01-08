# &lt;x-password&gt;

A password input naticely enhansed via a Custom Element (Web Component).

It adds the ability to toggle visibility and validation to confirm it matches the value of another field

## Demo

> [Check it live](http://tobz-nz.github.io/x-password/demo.html).

## Usage

```html
<script src="" type="module"></script>

<form onsubmit="return false">
    <label for="password">Password</label>
    <input type="password" name="password" id="password">

    <br>

    <label for="password_confirm">Confirm Password</label>
    <input type="password" name="password_confirm" id="password_confirm" is="x-password" confirm-target="password">

    <br>  
  
    <button>Go</button>
</form>
```

## Options

Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`visible`  | *string*                  | null                | set the value to visible (plain text)
`confirm-target`  | *string*           | null                | the ID of another field to match

## History

* v0.2 Jan 9, 2024
	* re-release as fully native web-component
* v0.1 Feb 5, 2014
	* initial release

## License

[MIT License](http://opensource.org/licenses/MIT)
