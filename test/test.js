"use strict";

const utilities = require("extra-utilities");
const Colour = require("../src/colour.js");
const chai = require("chai");
const expect = chai.expect;

describe("Colour", function() {
	it("should be a function", function() {
		expect(Colour).to.be.a("function");
	});

	it("should be instantiable with no arguments", function() {
		const defaultColour = new Colour();

		expect(defaultColour).to.be.an("object");
		expect(defaultColour).to.be.an.instanceof(Colour);
		expect(defaultColour.r).to.equal(0);
		expect(defaultColour.g).to.equal(0);
		expect(defaultColour.b).to.equal(0);
		expect(defaultColour.a).to.equal(255);
	});

	it("should be instantiable with a variable number of integer arguments", function() {
		const colourA = new Colour(128);
		const colourB = new Colour(255, 96);
		const colourC = new Colour(32, 48, 64);
		const colourD = new Colour(250, 69, 12, 42);

		expect(colourA).to.be.an.instanceof(Colour);
		expect(colourA.r).to.equal(128);
		expect(colourA.g).to.equal(0);
		expect(colourA.b).to.equal(0);
		expect(colourA.a).to.equal(255);

		expect(colourB).to.be.an.instanceof(Colour);
		expect(colourB.r).to.equal(255);
		expect(colourB.g).to.equal(96);
		expect(colourB.b).to.equal(0);
		expect(colourB.a).to.equal(255);

		expect(colourC).to.be.an.instanceof(Colour);
		expect(colourC.r).to.equal(32);
		expect(colourC.g).to.equal(48);
		expect(colourC.b).to.equal(64);
		expect(colourC.a).to.equal(255);

		expect(colourD).to.be.an.instanceof(Colour);
		expect(colourD.r).to.equal(250);
		expect(colourD.g).to.equal(69);
		expect(colourD.b).to.equal(12);
		expect(colourD.a).to.equal(42);
	});

	it("should be instantiable from a variable length integer array", function() {
		const colourA = new Colour([36]);
		const colourB = new Colour([192, 24]);
		const colourC = new Colour([88, 44, 22]);
		const colourD = new Colour([12, 34, 56, 78]);

		expect(colourA).to.be.an.instanceof(Colour);
		expect(colourA.r).to.equal(36);
		expect(colourA.g).to.equal(0);
		expect(colourA.b).to.equal(0);
		expect(colourA.a).to.equal(255);

		expect(colourB).to.be.an.instanceof(Colour);
		expect(colourB.r).to.equal(192);
		expect(colourB.g).to.equal(24);
		expect(colourB.b).to.equal(0);
		expect(colourB.a).to.equal(255);

		expect(colourC).to.be.an.instanceof(Colour);
		expect(colourC.r).to.equal(88);
		expect(colourC.g).to.equal(44);
		expect(colourC.b).to.equal(22);
		expect(colourC.a).to.equal(255);

		expect(colourD).to.be.an.instanceof(Colour);
		expect(colourD.r).to.equal(12);
		expect(colourD.g).to.equal(34);
		expect(colourD.b).to.equal(56);
		expect(colourD.a).to.equal(78);
	});

	it("should be instantiable from an object with shared properties", function() {
		const colourA = new Colour({ r: 38 });
		const colourB = new Colour({ g: 80 });
		const colourC = new Colour({ b: 177 });
		const colourD = new Colour({ a: 240 });
		const colourE = new Colour({ a: 128, r: 94, b: 27 });
		const colourF = new Colour({ g: 99, r: 199, a: 200, b: 201 });

		expect(colourA).to.be.an.instanceof(Colour);
		expect(colourA.r).to.equal(38);
		expect(colourA.g).to.equal(0);
		expect(colourA.b).to.equal(0);
		expect(colourA.a).to.equal(255);

		expect(colourB).to.be.an.instanceof(Colour);
		expect(colourB.r).to.equal(0);
		expect(colourB.g).to.equal(80);
		expect(colourB.b).to.equal(0);
		expect(colourB.a).to.equal(255);

		expect(colourC).to.be.an.instanceof(Colour);
		expect(colourC.r).to.equal(0);
		expect(colourC.g).to.equal(0);
		expect(colourC.b).to.equal(177);
		expect(colourC.a).to.equal(255);

		expect(colourD).to.be.an.instanceof(Colour);
		expect(colourD.r).to.equal(0);
		expect(colourD.g).to.equal(0);
		expect(colourD.b).to.equal(0);
		expect(colourD.a).to.equal(240);

		expect(colourE).to.be.an.instanceof(Colour);
		expect(colourE.r).to.equal(94);
		expect(colourE.g).to.equal(0);
		expect(colourE.b).to.equal(27);
		expect(colourE.a).to.equal(128);

		expect(colourF).to.be.an.instanceof(Colour);
		expect(colourF.r).to.equal(199);
		expect(colourF.g).to.equal(99);
		expect(colourF.b).to.equal(201);
		expect(colourF.a).to.equal(200);
	});

	it("should clamp colour properties between 0 and 255", function() {
		const colour = new Colour(-Infinity, 360, Infinity, -9);

		expect(colour).to.be.an.instanceof(Colour);
		expect(colour.r).to.equal(0);
		expect(colour.g).to.equal(255);
		expect(colour.b).to.equal(0);
		expect(colour.a).to.equal(0);

		const newColour = new Colour();

		newColour.r = 256;
		expect(newColour.r).to.equal(255);

		newColour.g = -1;
		expect(newColour.g).to.equal(0);

		newColour.b = -0.007;
		expect(newColour.b).to.equal(0);

		newColour.a = 360.141592654;
		expect(newColour.a).to.equal(255);
	});

	it("should convert floating point colour properties to integers", function() {
		const colour = new Colour(3.141592654, 2.718281828459, 1.337, 6.9);

		expect(colour).to.be.an.instanceof(Colour);
		expect(colour.r).to.equal(3);
		expect(colour.g).to.equal(2);
		expect(colour.b).to.equal(1);
		expect(colour.a).to.equal(6);

		const newColour = new Colour();

		newColour.r = 8.008;
		expect(newColour.r).to.equal(8);

		newColour.g = 0.006;
		expect(newColour.g).to.equal(0);

		newColour.b = 7.331;
		expect(newColour.b).to.equal(7);

		newColour.a = 4.2069;
		expect(newColour.a).to.equal(4);
	});

	describe("colours", function() {
		const colours = {
			AliceBlue:            [240, 248, 255, 255],
			AntiqueWhite:         [250, 235, 215, 255],
			Aqua:                 [  0, 255, 255, 255],
			Aquamarine:           [127, 255, 212, 255],
			Azure:                [240, 255, 255, 255],
			Beige:                [245, 245, 220, 255],
			Bisque:               [255, 228, 196, 255],
			Black:                [  0,   0,   0, 255],
			BlanchedAlmond:       [255, 235, 205, 255],
			Blue:                 [  0,   0, 255, 255],
			BlueViolet:           [138,  43, 226, 255],
			Brown:                [165,  42,  42, 255],
			BurlyWood:            [222, 184, 135, 255],
			CadetBlue:            [ 95, 158, 160, 255],
			Chartreuse:           [127, 255,   0, 255],
			Chocolate:            [210, 105,  30, 255],
			Coral:                [255, 127,  80, 255],
			CornflowerBlue:       [100, 149, 237, 255],
			Cornsilk:             [255, 248, 220, 255],
			Crimson:              [220,  20,  60, 255],
			Cyan:                 [  0, 255, 255, 255],
			DarkBlue:             [  0,   0, 139, 255],
			DarkBrown:            [101,  67,  33, 255],
			DarkCyan:             [  0, 139, 139, 255],
			DarkGoldenrod:        [184, 134,  11, 255],
			DarkGray:             [169, 169, 169, 255],
			DarkGreen:            [  0, 100,   0, 255],
			DarkKhaki:            [189, 183, 107, 255],
			DarkMagenta:          [139,   0, 139, 255],
			DarkOliveGreen:       [ 85, 107,  47, 255],
			DarkOrange:           [255, 140,   0, 255],
			DarkOrchid:           [153,  50, 204, 255],
			DarkRed:              [139,   0,   0, 255],
			DarkSalmon:           [233, 150, 122, 255],
			DarkSeaGreen:         [143, 188, 139, 255],
			DarkSlateBlue:        [ 72,  61, 139, 255],
			DarkSlateGray:        [ 47,  79,  79, 255],
			DarkTurquoise:        [  0, 206, 209, 255],
			DarkViolet:           [148,   0, 211, 255],
			DeepPink:             [255,  20, 147, 255],
			DeepSkyBlue:          [  0, 191, 255, 255],
			DimGray:              [105, 105, 105, 255],
			DodgerBlue:           [ 30, 144, 255, 255],
			Firebrick:            [178,  34,  34, 255],
			FloralWhite:          [255, 250, 240, 255],
			ForestGreen:          [ 34, 139,  34, 255],
			Fuchsia:              [255,   0, 255, 255],
			Gainsboro:            [220, 220, 220, 255],
			GhostWhite:           [248, 248, 255, 255],
			Gold:                 [255, 215,   0, 255],
			Goldenrod:            [218, 165,  32, 255],
			Gray:                 [128, 128, 128, 255],
			Green:                [  0, 128,   0, 255],
			GreenYellow:          [173, 255,  47, 255],
			Honeydew:             [240, 255, 240, 255],
			HotPink:              [255, 105, 180, 255],
			IndianRed:            [205,  92,  92, 255],
			Indigo:               [ 75,   0, 130, 255],
			Ivory:                [255, 255, 240, 255],
			Khaki:                [240, 230, 140, 255],
			Lavender:             [230, 230, 250, 255],
			LavenderBlush:        [255, 240, 245, 255],
			LawnGreen:            [124, 252,   0, 255],
			LemonChiffon:         [255, 250, 205, 255],
			LightBlue:            [173, 216, 230, 255],
			LightBrown:           [152, 118,  84, 255],
			LightCoral:           [240, 128, 128, 255],
			LightCyan:            [224, 255, 255, 255],
			LightGoldenrodYellow: [250, 250, 210, 255],
			LightGray:            [211, 211, 211, 255],
			LightGreen:           [144, 238, 144, 255],
			LightPink:            [255, 182, 193, 255],
			LightRed:             [255, 102, 102, 255],
			LightSalmon:          [255, 160, 122, 255],
			LightSeaGreen:        [ 32, 178, 170, 255],
			LightSkyBlue:         [135, 206, 250, 255],
			LightSlateGray:       [119, 136, 153, 255],
			LightSteelBlue:       [176, 196, 222, 255],
			LightYellow:          [255, 255, 224, 255],
			Lime:                 [  0, 255,   0, 255],
			LimeGreen:            [ 50, 205,  50, 255],
			Linen:                [250, 240, 230, 255],
			Magenta:              [255,   0, 255, 255],
			Maroon:               [128,   0,   0, 255],
			MediumAquamarine:     [102, 205, 170, 255],
			MediumBlue:           [  0,   0, 205, 255],
			MediumOrchid:         [186,  85, 211, 255],
			MediumPurple:         [147, 112, 219, 255],
			MediumSeaGreen:       [ 60, 179, 113, 255],
			MediumSlateBlue:      [123, 104, 238, 255],
			MediumSpringGreen:    [  0, 250, 154, 255],
			MediumTurquoise:      [ 72, 209, 204, 255],
			MediumVioletRed:      [199,  21, 133, 255],
			MidnightBlue:         [ 25,  25, 112, 255],
			MintCream:            [245, 255, 250, 255],
			MistyRose:            [255, 228, 225, 255],
			Moccasin:             [255, 228, 181, 255],
			NavajoWhite:          [255, 222, 173, 255],
			Navy:                 [  0,   0, 128, 255],
			OldLace:              [253, 245, 230, 255],
			Olive:                [128, 128,   0, 255],
			OliveDrab:            [107, 142,  35, 255],
			Orange:               [255, 165,   0, 255],
			OrangeRed:            [255,  69,   0, 255],
			Orchid:               [218, 112, 214, 255],
			PaleGoldenrod:        [238, 232, 170, 255],
			PaleGreen:            [152, 251, 152, 255],
			PaleTurquoise:        [175, 238, 238, 255],
			PaleVioletRed:        [219, 112, 147, 255],
			PapayaWhip:           [255, 239, 213, 255],
			PeachPuff:            [255, 218, 185, 255],
			Peru:                 [205, 133,  63, 255],
			Pink:                 [255, 192, 203, 255],
			Plum:                 [221, 160, 221, 255],
			PowderBlue:           [176, 224, 230, 255],
			Purple:               [128,   0, 128, 255],
			Red:                  [255,   0,   0, 255],
			RosyBrown:            [188, 143, 143, 255],
			RoyalBlue:            [ 65, 105, 225, 255],
			SaddleBrown:          [139,  69,  19, 255],
			Salmon:               [250, 128, 114, 255],
			SandyBrown:           [244, 164,  96, 255],
			SeaGreen:             [ 46, 139,  87, 255],
			SeaShell:             [255, 245, 238, 255],
			Sienna:               [160,  82,  45, 255],
			Silver:               [192, 192, 192, 255],
			SkyBlue:              [135, 206, 235, 255],
			SlateBlue:            [106,  90, 205, 255],
			SlateGray:            [112, 128, 144, 255],
			Snow:                 [255, 250, 250, 255],
			SpringGreen:          [  0, 255, 127, 255],
			SteelBlue:            [ 70, 130, 180, 255],
			Tan:                  [210, 180, 140, 255],
			Teal:                 [  0, 128, 128, 255],
			Thistle:              [216, 191, 216, 255],
			Tomato:               [255,  99,  71, 255],
			Transparent:          [  0,   0,   0,   0],
			Turquoise:            [ 64, 224, 208, 255],
			Violet:               [238, 130, 238, 255],
			Wheat:                [245, 222, 179, 255],
			White:                [255, 255, 255, 255],
			WhiteSmoke:           [245, 245, 245, 255],
			Yellow:               [255, 255,   0, 255],
			YellowGreen:          [154, 205,  50, 255]
		};

		const colourKeys = Object.keys(colours);

		for(let i = 0; i < colourKeys.length; i++) {
			const colourKey = colourKeys[i];

			it("should contain a pre-defined colour named " + colourKey + " with RGBA values: " + colours[colourKey].join(", "), function() {
				expect(Colour[colourKey]).to.be.an("object");
				expect(Colour[colourKey]).to.be.an.instanceof(Colour);
				expect(Colour[colourKey].r).to.equal(colours[colourKey][0]);
				expect(Colour[colourKey].g).to.equal(colours[colourKey][1]);
				expect(Colour[colourKey].b).to.equal(colours[colourKey][2]);
				expect(Colour[colourKey].a).to.equal(colours[colourKey][3]);
			});
		}

		it("should have a names property with a list of all colour names", function() {
			expect(Colour.Names).to.be.an.instanceof(Array);

			for(let i = 0; i < colourKeys.length; i++) {
				expect(Colour.Names.length).to.equal(colourKeys.length);

				let hasColourName = false;

				for(let j = 0; j < Colour.Names.length; j++) {
					if(colourKeys[i] === Colour.Names[j]) {
						hasColourName = true;
						break;
					}
				}

				expect(hasColourName).to.equal(true);
			}
		});
	});

	describe("toArray", function() {
		it("should convert a colour object to an array", function() {
			const colour = new Colour(86, 75, 30, 9);

			expect(colour.toArray()).to.deep.equal([86, 75, 30, 9]);
		});

		it("should convert a colour object to an array with alpha when specified", function() {
			const colour = new Colour(6, 9, 4, 20);

			expect(colour.toArray(true)).to.deep.equal([6, 9, 4, 20]);
		});

		it("should convert a colour object to an array without alpha when specified", function() {
			const colour = new Colour(99, 199, 250, 33);

			expect(colour.toArray(false)).to.deep.equal([99, 199, 250]);
		});
	});

	describe("pack", function() {
		it("should pack a colour object into a 32 bit number", function() {
			const colour = new Colour(12, 34, 56, 78);

			expect(colour.pack()).to.equal(203569230);
		});

		it("should pack a colour object into a 32 bit number with alpha when specified", function() {
			const colour = new Colour(11, 8, 0, 12);

			expect(colour.pack(true)).to.equal(185073676);
		});

		it("should pack a colour object into a 32 bit number without alpha when specified", function() {
			const colour = new Colour(19, 99, 200, 8);

			expect(colour.pack(false)).to.equal(1270728);
		});
	});

	describe("unpack", function() {
		it("should return null for numbers that are not integers", function() {
			expect(Colour.unpack("door.stuck")).to.equal(null);
		});

		it("should return null for negative numbers", function() {
			expect(Colour.unpack(-1)).to.equal(null);
		});

		it("should return null for numbers that are too large", function() {
			expect(Colour.unpack(0xFFFFFFFF + 1)).to.equal(null);
		});

		it("should unpack a colour object from a 32 bit number", function() {
			expect(Colour.unpack(2745620827)).to.deep.equal(new Colour(163, 166, 217, 91));
		});

		it("should unpack a colour object from a 24 bit number", function() {
			expect(Colour.unpack(9031253)).to.deep.equal(new Colour(137, 206, 85, 255));
		});

		it("should unpack a colour object from a 16 bit number", function() {
			expect(Colour.unpack(38225)).to.deep.equal(new Colour(149, 81, 0, 255));
		});

		it("should unpack a colour object from an 8 bit number", function() {
			expect(Colour.unpack(182)).to.deep.equal(new Colour(182, 0, 0, 255));
		});
	});

	describe("deserialize", function() {
		it("should return null for non-buffer values", function() {
			expect(Colour.deserialize(NaN)).to.equal(null);
		});

		it("should deserialize colour objects from valid buffers", function() {
			expect(Colour.deserialize(Buffer.from("NICE"))).to.deep.equal(new Colour(78, 73, 67, 69));
		});

		it("should deserialize colour objects from buffers with different lengths", function() {
			expect(Colour.deserialize(Buffer.from(""))).to.deep.equal(new Colour(0, 0, 0, 255));
			expect(Colour.deserialize(Buffer.from("x"))).to.deep.equal(new Colour(120, 0, 0, 255));
			expect(Colour.deserialize(Buffer.from("NO"))).to.deep.equal(new Colour(78, 79, 0, 255));
			expect(Colour.deserialize(Buffer.from("PE."))).to.deep.equal(new Colour(80, 69, 46, 255));
			expect(Colour.deserialize(Buffer.from("AVI_"))).to.deep.equal(new Colour(65, 86, 73, 95));
		});
	});

	describe("serialize", function() {
		it("should correctly serialize a colour with default values", function() {
			expect(new Colour().serialize()).to.deep.equal(Buffer.from("000000FF", "hex"));
		});

		it("should correctly serialize a colour with non-default values", function() {
			expect(new Colour(200, 1, 19, 97).serialize()).to.deep.equal(Buffer.from("C8011361", "hex"));
		});

		it("should correctly serialize a colour including alpha when specified", function() {
			expect(new Colour(11, 22, 33, 44).serialize(true)).to.deep.equal(Buffer.from("0B16212C", "hex"));
		});

		it("should correctly serialize a colour excluding alpha when specified", function() {
			expect(new Colour(55, 66, 77, 88).serialize(false)).to.deep.equal(Buffer.from("37424D", "hex"));
		});
	});

	describe("equals", function() {
		it("should return true for two default colours", function() {
			expect(new Colour().equals(new Colour())).to.equal(true);
		});

		it("should return true for two matching colours with non-default values", function() {
			expect(new Colour(52, 92, 76, 231).equals(new Colour(52, 92, 76, 231))).to.equal(true);
		});

		it("should return true for two matching colours, including alpha when specified", function() {
			expect(new Colour(71, 52, 61, 32).equals(new Colour(71, 52, 61, 32), true)).to.equal(true);
		});

		it("should return true for two matching colours, ignoring alpha when specified", function() {
			expect(new Colour(89, 189, 92, 217).equals(new Colour(89, 189, 92, 217), false)).to.equal(true);
			expect(new Colour(21, 98, 192, 18).equals(new Colour(21, 98, 192, 19), false)).to.equal(true);
		});

		it("should return false for two non-matching colours", function() {
			expect(new Colour(12, 43, 81, 60).equals(new Colour(44, 182, 69, 42))).to.equal(false);
			expect(new Colour(12, 43, 81, 60).equals(new Colour(3, 1, 45, 88), true)).to.equal(false);
			expect(new Colour(11, 45, 61, 9).equals(new Colour(99, 120, 43, 62), false)).to.equal(false);
		});
	});

	describe("toString", function() {
		it("should correctly generate a string representation of a default colour", function() {
			expect(new Colour().toString()).to.equal("0, 0, 0, 255");
		});

		it("should correctly generate a string representation of a colour with non-default values", function() {
			expect(new Colour(32, 64, 128, 96).toString()).to.equal("32, 64, 128, 96");
		});

		it("should correctly generate a string representation of a colour with alpha when specified", function() {
			expect(new Colour(2, 0, 0, 8).toString(true)).to.equal("2, 0, 0, 8");
		});

		it("should correctly generate a string representation of a colour without alpha when specified", function() {
			expect(new Colour(1, 3, 3, 7).toString(false)).to.equal("1, 3, 3");
		});
	});

	describe("isColour", function() {
		it("should return false for non-colour objects", function() {
			expect(Colour.isColour(null)).to.equal(false);
			expect(Colour.isColour({ r: 4, g: 2, b: 0, a: 0 })).to.equal(false);
		});

		it("should return true for default colours", function() {
			expect(Colour.isColour(new Colour())).to.equal(true);
		});

		it("should return true for default colours", function() {
			expect(Colour.isColour(new Colour())).to.equal(true);
		});
	});
});
