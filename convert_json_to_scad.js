#!/usr/bin/env node
/**
 * Script auxiliar para converter JSON exportado em variáveis OpenSCAD
 * 
 * Uso:
 *   node convert_json_to_scad.js panel.json > data.scad
 * 
 * Depois, no panel.scad, descomente: include <data.scad>
 */

const fs = require('fs');

if (process.argv.length < 3) {
    console.error('Uso: node convert_json_to_scad.js <arquivo.json>');
    process.exit(1);
}

const jsonFile = process.argv[2];
const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

// Gerar variáveis SCAD
console.log('// Arquivo gerado automaticamente a partir de', jsonFile);
console.log('// Não edite manualmente - regenere a partir do JSON\n');

console.log('// Parâmetros da placa');
console.log(`width = ${jsonData.width};`);
console.log(`height = ${jsonData.height};`);
console.log(`thickness = ${jsonData.thickness};`);
console.log(`gridPitch = ${jsonData.gridPitch};`);
console.log(`margin = ${jsonData.margin};`);
console.log(`segments = ${jsonData.segments};\n`);

console.log('// Dados dos furos');
console.log('holes = [');
for (let i = 0; i < jsonData.holes.length; i++) {
    const hole = jsonData.holes[i];
    const comma = i < jsonData.holes.length - 1 ? ',' : '';
    console.log(`    [${hole.x}, ${hole.y}, ${hole.radius}]${comma}`);
}
console.log('];');

