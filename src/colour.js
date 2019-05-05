"use strict";

const utilities = require("extra-utilities");
const extendedMath = require("extended-math");
const ByteBuffer = require("bytebuffer");

class Colour {
	constructor(r, g, b, a) {
		let _properties = { };

		if(Array.isArray(r)) {
			const data = r;
			r = data[0];
			g = data[1];
			b = data[2];
			a = data[3];
		}
		else if(utilities.isObject(r)) {
			const data = r;
			r = data.r;
			g = data.g;
			b = data.b;
			a = data.a;
		}

		Object.defineProperty(this, "r", {
			enumerable: true,
			get() {
				return _properties.r;
			},
			set(r) {
				_properties.r = extendedMath.clamp(utilities.parseInteger(r), 0, 255);

				if(isNaN(_properties.r)) {
					_properties.r = 0;
				}
			}
		});

		Object.defineProperty(this, "g", {
			enumerable: true,
			get() {
				return _properties.g;
			},
			set(g) {
				_properties.g = extendedMath.clamp(utilities.parseInteger(g), 0, 255);

				if(isNaN(_properties.g)) {
					_properties.g = 0;
				}
			}
		});

		Object.defineProperty(this, "b", {
			enumerable: true,
			get() {
				return _properties.b;
			},
			set(b) {
				_properties.b = extendedMath.clamp(utilities.parseInteger(b), 0, 255);

				if(isNaN(_properties.b)) {
					_properties.b = 0;
				}
			}
		});

		Object.defineProperty(this, "a", {
			enumerable: true,
			get() {
				return _properties.a;
			},
			set(a) {
				_properties.a = extendedMath.clamp(utilities.parseInteger(a), 0, 255);

				if(isNaN(_properties.a)) {
					_properties.a = 255;
				}
			}
		});

		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	toArray(includeAlpha) {
		let data = [this.r, this.g, this.b];

		if(utilities.parseBoolean(includeAlpha, true)) {
			data.push(this.a);
		}

		return data;
	}

	pack(includeAlpha) {
		includeAlpha = utilities.parseBoolean(includeAlpha, true);

		let packedValue = 0;

		if(includeAlpha) {
			packedValue +=                     this.a & 0xFF;
			packedValue += utilities.leftShift(this.b & 0xFF, 8);
			packedValue += utilities.leftShift(this.g & 0xFF, 16);
			packedValue += utilities.leftShift(this.r & 0xFF, 24);
		}
		else {
			packedValue +=                     this.b & 0xFF;
			packedValue += utilities.leftShift(this.g & 0xFF, 8);
			packedValue += utilities.leftShift(this.r & 0xFF, 16);
		}

		return packedValue;
	}

	static unpack(packedValue) {
		packedValue = utilities.parseInteger(packedValue);

		if(!Number.isInteger(packedValue)) {
			return null;
		}

		let colour = new Colour();

		if(packedValue < 0 || packedValue > 0xFFFFFFFF) {
			return null;
		}

		if(packedValue > 0xFFFFFF) {
			colour.r = utilities.rightShift((packedValue & 0xFF000000), 24) & 0xFF;
			colour.g = utilities.rightShift((packedValue &   0xFF0000), 16) & 0xFF;
			colour.b = utilities.rightShift((packedValue &     0xFF00),  8) & 0xFF;
			colour.a =                       packedValue &       0xFF;
		}
		else if(packedValue > 0xFFFF) {
			colour.r = utilities.rightShift((packedValue & 0xFF0000), 16) & 0xFF;
			colour.g = utilities.rightShift((packedValue &   0xFF00),  8) & 0xFF;
			colour.b =                       packedValue &     0xFF;
			colour.a = 255;
		}
		else if(packedValue > 0xFF) {
			colour.r = utilities.rightShift((packedValue & 0xFF00), 8) & 0xFF;
			colour.g =                       packedValue &   0xFF;
			colour.b = 0;
			colour.a = 255;
		}
		else {
			colour.r = packedValue & 0xFF;
			colour.g = 0;
			colour.b = 0;
			colour.a = 255;
		}

		return colour;
	}

	static deserialize(buffer) {
		if(ByteBuffer.isByteBuffer(buffer)) {
			buffer = buffer.toBuffer();
		}

		if(!Buffer.isBuffer(buffer)) {
			return null;
		}

		let colour = new Colour();

		if(buffer.length >= 1) {
			colour.r = buffer.readUInt8(0);

			if(buffer.length >= 2) {
				colour.g = buffer.readUInt8(1);

				if(buffer.length >= 3) {
					colour.b = buffer.readUInt8(2);

					if(buffer.length >= 4) {
						colour.a = buffer.readUInt8(3);
					}
				}
			}
		}

		return colour;
	}

	serialize(includeAlpha) {
		includeAlpha = utilities.parseBoolean(includeAlpha, true);

		let paletteByteBuffer = new ByteBuffer(includeAlpha ? 4 : 3);
		paletteByteBuffer.order(true);

		paletteByteBuffer.writeUint8(this.r);
		paletteByteBuffer.writeUint8(this.g);
		paletteByteBuffer.writeUint8(this.b);

		if(includeAlpha) {
			paletteByteBuffer.writeUint8(this.a);
		}

		paletteByteBuffer.flip();

		return paletteByteBuffer.toBuffer();
	}

	equals(value, compareAlpha) {
		compareAlpha = utilities.parseBoolean(compareAlpha, true);

		if(this.r !== value.r ||
		   this.g !== value.g ||
		   this.b !== value.b) {
			return false;
		}

		if(!compareAlpha) {
			return true;
		}

		return this.a === value.a;
	}

	toString(includeAlpha) {
		return this.r + ", " + this.g + ", "+ this.b + (utilities.parseBoolean(includeAlpha, true) ? (", " + this.a) : "");
	}

	static isColour(colour) {
		return colour instanceof Colour;
	}
}

const colours = {
	AliceBlue:            new Colour(240, 248, 255, 255),
	AntiqueWhite:         new Colour(250, 235, 215, 255),
	Aqua:                 new Colour(  0, 255, 255, 255),
	Aquamarine:           new Colour(127, 255, 212, 255),
	Azure:                new Colour(240, 255, 255, 255),
	Beige:                new Colour(245, 245, 220, 255),
	Bisque:               new Colour(255, 228, 196, 255),
	Black:                new Colour(  0,   0,   0, 255),
	BlanchedAlmond:       new Colour(255, 235, 205, 255),
	Blue:                 new Colour(  0,   0, 255, 255),
	BlueViolet:           new Colour(138,  43, 226, 255),
	Brown:                new Colour(165,  42,  42, 255),
	BurlyWood:            new Colour(222, 184, 135, 255),
	CadetBlue:            new Colour( 95, 158, 160, 255),
	Chartreuse:           new Colour(127, 255,   0, 255),
	Chocolate:            new Colour(210, 105,  30, 255),
	Coral:                new Colour(255, 127,  80, 255),
	CornflowerBlue:       new Colour(100, 149, 237, 255),
	Cornsilk:             new Colour(255, 248, 220, 255),
	Crimson:              new Colour(220,  20,  60, 255),
	Cyan:                 new Colour(  0, 255, 255, 255),
	DarkBlue:             new Colour(  0,   0, 139, 255),
	DarkBrown:            new Colour(101,  67,  33, 255),
	DarkCyan:             new Colour(  0, 139, 139, 255),
	DarkGoldenrod:        new Colour(184, 134,  11, 255),
	DarkGray:             new Colour(169, 169, 169, 255),
	DarkGreen:            new Colour(  0, 100,   0, 255),
	DarkKhaki:            new Colour(189, 183, 107, 255),
	DarkMagenta:          new Colour(139,   0, 139, 255),
	DarkOliveGreen:       new Colour( 85, 107,  47, 255),
	DarkOrange:           new Colour(255, 140,   0, 255),
	DarkOrchid:           new Colour(153,  50, 204, 255),
	DarkRed:              new Colour(139,   0,   0, 255),
	DarkSalmon:           new Colour(233, 150, 122, 255),
	DarkSeaGreen:         new Colour(143, 188, 139, 255),
	DarkSlateBlue:        new Colour( 72,  61, 139, 255),
	DarkSlateGray:        new Colour( 47,  79,  79, 255),
	DarkTurquoise:        new Colour(  0, 206, 209, 255),
	DarkViolet:           new Colour(148,   0, 211, 255),
	DeepPink:             new Colour(255,  20, 147, 255),
	DeepSkyBlue:          new Colour(  0, 191, 255, 255),
	DimGray:              new Colour(105, 105, 105, 255),
	DodgerBlue:           new Colour( 30, 144, 255, 255),
	Firebrick:            new Colour(178,  34,  34, 255),
	FloralWhite:          new Colour(255, 250, 240, 255),
	ForestGreen:          new Colour( 34, 139,  34, 255),
	Fuchsia:              new Colour(255,   0, 255, 255),
	Gainsboro:            new Colour(220, 220, 220, 255),
	GhostWhite:           new Colour(248, 248, 255, 255),
	Gold:                 new Colour(255, 215,   0, 255),
	Goldenrod:            new Colour(218, 165,  32, 255),
	Gray:                 new Colour(128, 128, 128, 255),
	Green:                new Colour(  0, 128,   0, 255),
	GreenYellow:          new Colour(173, 255,  47, 255),
	Honeydew:             new Colour(240, 255, 240, 255),
	HotPink:              new Colour(255, 105, 180, 255),
	IndianRed:            new Colour(205,  92,  92, 255),
	Indigo:               new Colour( 75,   0, 130, 255),
	Ivory:                new Colour(255, 255, 240, 255),
	Khaki:                new Colour(240, 230, 140, 255),
	Lavender:             new Colour(230, 230, 250, 255),
	LavenderBlush:        new Colour(255, 240, 245, 255),
	LawnGreen:            new Colour(124, 252,   0, 255),
	LemonChiffon:         new Colour(255, 250, 205, 255),
	LightBlue:            new Colour(173, 216, 230, 255),
	LightBrown:           new Colour(152, 118,  84, 255),
	LightCoral:           new Colour(240, 128, 128, 255),
	LightCyan:            new Colour(224, 255, 255, 255),
	LightGoldenrodYellow: new Colour(250, 250, 210, 255),
	LightGray:            new Colour(211, 211, 211, 255),
	LightGreen:           new Colour(144, 238, 144, 255),
	LightPink:            new Colour(255, 182, 193, 255),
	LightRed:             new Colour(255, 102, 102, 255),
	LightSalmon:          new Colour(255, 160, 122, 255),
	LightSeaGreen:        new Colour( 32, 178, 170, 255),
	LightSkyBlue:         new Colour(135, 206, 250, 255),
	LightSlateGray:       new Colour(119, 136, 153, 255),
	LightSteelBlue:       new Colour(176, 196, 222, 255),
	LightYellow:          new Colour(255, 255, 224, 255),
	Lime:                 new Colour(  0, 255,   0, 255),
	LimeGreen:            new Colour( 50, 205,  50, 255),
	Linen:                new Colour(250, 240, 230, 255),
	Magenta:              new Colour(255,   0, 255, 255),
	Maroon:               new Colour(128,   0,   0, 255),
	MediumAquamarine:     new Colour(102, 205, 170, 255),
	MediumBlue:           new Colour(  0,   0, 205, 255),
	MediumOrchid:         new Colour(186,  85, 211, 255),
	MediumPurple:         new Colour(147, 112, 219, 255),
	MediumSeaGreen:       new Colour( 60, 179, 113, 255),
	MediumSlateBlue:      new Colour(123, 104, 238, 255),
	MediumSpringGreen:    new Colour(  0, 250, 154, 255),
	MediumTurquoise:      new Colour( 72, 209, 204, 255),
	MediumVioletRed:      new Colour(199,  21, 133, 255),
	MidnightBlue:         new Colour( 25,  25, 112, 255),
	MintCream:            new Colour(245, 255, 250, 255),
	MistyRose:            new Colour(255, 228, 225, 255),
	Moccasin:             new Colour(255, 228, 181, 255),
	NavajoWhite:          new Colour(255, 222, 173, 255),
	Navy:                 new Colour(  0,   0, 128, 255),
	OldLace:              new Colour(253, 245, 230, 255),
	Olive:                new Colour(128, 128,   0, 255),
	OliveDrab:            new Colour(107, 142,  35, 255),
	Orange:               new Colour(255, 165,   0, 255),
	OrangeRed:            new Colour(255,  69,   0, 255),
	Orchid:               new Colour(218, 112, 214, 255),
	PaleGoldenrod:        new Colour(238, 232, 170, 255),
	PaleGreen:            new Colour(152, 251, 152, 255),
	PaleTurquoise:        new Colour(175, 238, 238, 255),
	PaleVioletRed:        new Colour(219, 112, 147, 255),
	PapayaWhip:           new Colour(255, 239, 213, 255),
	PeachPuff:            new Colour(255, 218, 185, 255),
	Peru:                 new Colour(205, 133,  63, 255),
	Pink:                 new Colour(255, 192, 203, 255),
	Plum:                 new Colour(221, 160, 221, 255),
	PowderBlue:           new Colour(176, 224, 230, 255),
	Purple:               new Colour(128,   0, 128, 255),
	Red:                  new Colour(255,   0,   0, 255),
	RosyBrown:            new Colour(188, 143, 143, 255),
	RoyalBlue:            new Colour( 65, 105, 225, 255),
	SaddleBrown:          new Colour(139,  69,  19, 255),
	Salmon:               new Colour(250, 128, 114, 255),
	SandyBrown:           new Colour(244, 164,  96, 255),
	SeaGreen:             new Colour( 46, 139,  87, 255),
	SeaShell:             new Colour(255, 245, 238, 255),
	Sienna:               new Colour(160,  82,  45, 255),
	Silver:               new Colour(192, 192, 192, 255),
	SkyBlue:              new Colour(135, 206, 235, 255),
	SlateBlue:            new Colour(106,  90, 205, 255),
	SlateGray:            new Colour(112, 128, 144, 255),
	Snow:                 new Colour(255, 250, 250, 255),
	SpringGreen:          new Colour(  0, 255, 127, 255),
	SteelBlue:            new Colour( 70, 130, 180, 255),
	Tan:                  new Colour(210, 180, 140, 255),
	Teal:                 new Colour(  0, 128, 128, 255),
	Thistle:              new Colour(216, 191, 216, 255),
	Tomato:               new Colour(255,  99,  71, 255),
	Transparent:          new Colour(  0,   0,   0,   0),
	Turquoise:            new Colour( 64, 224, 208, 255),
	Violet:               new Colour(238, 130, 238, 255),
	Wheat:                new Colour(245, 222, 179, 255),
	White:                new Colour(255, 255, 255, 255),
	WhiteSmoke:           new Colour(245, 245, 245, 255),
	Yellow:               new Colour(255, 255,   0, 255),
	YellowGreen:          new Colour(154, 205,  50, 255)
};

Object.defineProperty(Colour, "Names", {
	value: Object.keys(colours),
	enumerable: true
});

for(let i = 0; i < Colour.Names.length; i++) {
	Object.defineProperty(Colour, Colour.Names[i], {
		value: colours[Colour.Names[i]],
		enumerable: true
	});
}

module.exports = Colour;
