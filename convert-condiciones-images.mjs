import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const sourceDir = 'CONDICIONES DE POLIZAS/IMAGENES';
const targetDir = 'public/images/condiciones-polizas';

const images = [
  'FOTO-PORTADA.png',
  'FOTO-PORTADA--CONDICIONES-DE-POLIZAS.png',
  'FOTO-CONDICIONES-CLARAS.png',
  'FOTO-DATOS-Y-RESPONSABILIDADES.png',
  'FOTO-COBERTURAS-Y-EXCLUSIONES.png',
  'FOTO-SUMA-ASEGURADA-Y-PAGOS.png',
  'FOTO-DURACION-Y-VIGENCIA.png',
  'FOTO-RECLAMOS-Y-RESOLUCION-DE-DISPUTAS.png',
  'FOTO-INFORME-MEDICO.png',
  'FOTO-MEDICAL-BRIEF.png',
  'FOTO-DECLARACION-DE-BIENES.png'
];

async function convertImages() {
  await mkdir(targetDir, { recursive: true });

  for (const image of images) {
    const sourcePath = join(sourceDir, image);
    const targetPath = join(targetDir, image.toLowerCase().replace(/ /g, '-'));

    console.log(`Converting ${image}...`);

    await sharp(sourcePath)
      .webp({ quality: 85 })
      .toFile(targetPath.replace('.png', '.webp'));

    console.log(`✓ Converted ${image}`);
  }

  console.log('\n✓ All images converted successfully!');
}

convertImages().catch(console.error);
