# &lt;x-password&gt;

A password input type with a button to toggle password visibility.

> Maintained by [Toby Evans](https://github.com/tobz-nz/x-password).

## Demo

> [Check it live](http://tobz-nz.github.io/x-password/demo.html).

## Usage

1. Import Web Components' polyfill:

	```html
	<script src="//cdnjs.cloudflare.com/ajax/libs/polymer/0.0.20130711/polymer.min.js"></script>
	```

2. Import Custom Element:

	```html
	<link rel="import" href="src/x-password.html">
	```

3. Start using it!

	```html
	<x-password></x-password>
	```

## Options

Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`name`  | *string*                | null            | set the name of the field
`value`  | *string*                | null            | set the value of the field
`show`  | *boolean*             | false            | set the password as visible


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

* v0.1 Feb 5, 2014
	* initial release

## License

[MIT License](http://opensource.org/licenses/MIT)
