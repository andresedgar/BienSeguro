import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, 'CONTACTO', 'IMAGENES');
const targetDir = join(__dirname, 'public', 'images', 'contacto');

async function convertImages() {
  try {
    await mkdir(targetDir, { recursive: true });

    const files = await readdir(sourceDir);
    const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));

    console.log(`Found ${pngFiles.length} PNG files to convert`);

    for (const file of pngFiles) {
      const inputPath = join(sourceDir, file);
      const outputName = file.replace(/\.png$/i, '.webp');
      const outputPath = join(targetDir, outputName);
      const pngOutputPath = join(targetDir, file);

      console.log(`Converting ${file}...`);

      await sharp(inputPath)
        .webp({ quality: 90 })
        .toFile(outputPath);

      await sharp(inputPath)
        .png()
        .toFile(pngOutputPath);

      console.log(`✓ Created ${outputName} and ${file}`);
    }

    console.log('\nAll images converted successfully!');
  } catch (error) {
    console.error('Error converting images:', error);
    process.exit(1);
  }
}

convertImages();
