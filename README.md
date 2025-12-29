# Gerador de Painéis Perfurados Halftone

Sistema completo para gerar painéis perfurados estilo halftone a partir de imagens, usando OpenSCAD para gerar STL watertight e pronto para impressão 3D.

## 📋 Fluxo de Trabalho

```
Imagem → Frontend (HTML+JS) → JSON → OpenSCAD → STL
```

## 🚀 Como Usar

### 1. Frontend (Processamento da Imagem)

1. Abra `index.html` no navegador
2. Faça upload de uma imagem (PNG/JPG)
3. Ajuste os parâmetros:
   - **Dimensões da Placa**: largura, altura, espessura, margem
   - **Grid**: distância entre furos (gridPitch)
   - **Furos**: raio mínimo e máximo
   - **Imagem**: gamma, contraste, inverter
4. Visualize o preview 2D no canvas
5. Clique em **"Exportar JSON"**
6. Baixe o arquivo JSON ou o arquivo OpenSCAD (.scad) diretamente

### 2. Geração do STL com OpenSCAD

#### Opção A: Usar arquivo .scad gerado (Recomendado)

1. Use o botão **"Baixar OpenSCAD (.scad)"** no frontend
2. Execute no terminal:
   ```bash
   openscad panel.scad -o panel.stl
   ```

#### Opção B: Gerar manualmente

1. Baixe o JSON do frontend
2. Copie os valores para `panel.scad`:
   - Parâmetros da placa (width, height, thickness, etc.)
   - Array de furos (holes)
3. Execute:
   ```bash
   openscad panel.scad -o panel.stl
   ```

#### Opção C: Usar script de conversão

1. Baixe o JSON do frontend
2. Execute o script de conversão:
   ```bash
   node convert_json_to_scad.js halftone_panel.json > data.scad
   ```
3. No `panel.scad`, descomente: `include <data.scad>`
4. Execute:
   ```bash
   openscad panel.scad -o panel.stl
   ```

## 📐 Formato do JSON

O JSON exportado contém:

```json
{
  "width": 54,
  "height": 27,
  "thickness": 1.6,
  "gridPitch": 2.4,
  "margin": 0.5,
  "segments": 32,
  "holes": [
    { "x": 2.4, "y": 2.4, "radius": 0.6 },
    { "x": 4.8, "y": 2.4, "radius": 0.5 },
    ...
  ]
}
```

## 🔧 Parâmetros Importantes

### Frontend

- **Largura/Altura**: Dimensões finais da placa em mm
- **Espessura**: Espessura da placa (recomendado: 1.6-3.0mm)
- **Grid Pitch**: Distância entre centros dos furos (recomendado: 2.0-3.0mm)
- **Raio Mín/Máx**: Variação dos furos baseada na imagem
- **Segmentos**: Suavidade dos círculos (mais = mais suave, mais lento)

### OpenSCAD

- **$fn**: Controla a suavidade dos círculos (definido por `segments` do JSON)
- Os furos atravessam totalmente a espessura usando `difference()`

## ✅ Características Técnicas

- ✅ **Geometria Robusta**: Usa operações booleanas nativas do OpenSCAD
- ✅ **STL Watertight**: Gera malhas fechadas e válidas
- ✅ **Precisão**: Valores em milímetros com 3 casas decimais
- ✅ **Grid Regular**: Espaçamento fixo entre centros dos furos
- ✅ **Variação Apenas no Raio**: Mantém grid uniforme, varia apenas diâmetro

## 📦 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- OpenSCAD instalado ([download](https://openscad.org/downloads.html))
- Node.js (opcional, apenas para script de conversão)

## 🎯 Exemplo de Uso Completo

```bash
# 1. Abra index.html no navegador
# 2. Faça upload de imagem e ajuste parâmetros
# 3. Exporte o arquivo .scad
# 4. Gere o STL:
openscad panel.scad -o panel.stl

# 5. Abra o STL no seu slicer favorito e imprima!
```

## 🔍 Troubleshooting

### OpenSCAD não encontra o arquivo
- Certifique-se de que o arquivo `.scad` está no mesmo diretório
- Use caminho absoluto se necessário

### STL com furos não vazados
- Verifique se os cylinders têm altura suficiente (`thickness + 0.2`)
- Certifique-se de que o `difference()` está correto

### Furos muito grandes se encostando
- Reduza o `radiusMax` no frontend
- Aumente o `gridPitch` para mais espaçamento

### Renderização lenta no OpenSCAD
- Reduza o número de `segments` (32 é um bom equilíbrio)
- Use `$fn` menor para preview, maior para export final

## 📝 Notas

- O frontend **NÃO** gera STL diretamente - apenas JSON
- O OpenSCAD é responsável pela geração geométrica robusta
- Os furos são criados usando `difference()` + `cylinder()` para garantir watertight
- O grid é sempre regular - apenas o raio dos furos varia

