const Jimp = require('jimp');
async function applyWatermark(sourceImage, watermarkImage, position = 'bottom-right') { 
	// Load images with Jimp 
	const source = await Jimp.read(sourceImage); 
	const watermark = await Jimp.read(watermarkImage); 
	// Calculate the position of the watermark 
	let x, y; 
	switch (position) { 
		case 'top-left': 
			x = 10; 
			y = 10; 
			break; 
		case 'top-right':
			 x = source.bitmap.width - watermark.bitmap.width - 10;
			 y = 10; 
			break; 
		case 'bottom-left':
			x = 10; 
			y = source.bitmap.height - watermark.bitmap.height - 10; 
			break; 
		case 'center': 
			x = (source.bitmap.width - watermark.bitmap.width) / 2; 
			y = (source.bitmap.height - watermark.bitmap.height) / 2; 
			break; 
		default: // 'bottom-right' 
			x = source.bitmap.width - watermark.bitmap.width - 10; 
			y = source.bitmap.height - watermark.bitmap.height - 10; 
			break; 
	} 
	// Apply watermark with Jimp 
	source.composite(watermark, x, y, { 
		mode: Jimp.BLEND_SOURCE_OVER, 
		opacityDest: 1, 
		opacitySource: 0.5, 
	}); 
	// Save the resulting image 
	await source.writeAsync('output.jpg'); 
}


/*
    Author: Meenakshi
    Dated: 2023-03-21
    Script Name: Water Mark Utility
    Script Description: This method takes json object where keys are text, position and image.
                        This method will save the image after applying watermark
    Script Dependencies: jimp-watermark
*/
const jimp = require("jimp-watermark");
const chai = require('chai');
const mocha = require('mocha');

const waterMark = async (data) => {
  let options = {
    text: data.text,
    textSize: 5,
    ratio: 0.8,
    opacity: 0.2,
    dstPath: "./watermark.jpg",
  };

  jimp.addTextWatermark(data.image, options);
};

module.exports = waterMark;

// const Jimp = require("jimp");

// // Load the image
// Jimp.read("images.jpg", (err, image) => {
//   if (err) throw err;

//   // Load the font
//   Jimp.loadFont(Jimp.FONT_SANS_14_BLACK).then((font) => {
//     // Add the watermark text to the image
//     image.print(font, 50, 50, "Watermark");

//     // Save the watermarked image
//     image.write("watermarked_image.jpg");
//   });
// });


