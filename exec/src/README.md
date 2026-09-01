# Coletivo Educação — estrutura React para slides

Estrutura pensada para entrar em um projeto React + Vite já existente.

## Arquivos

```text
src/
├─ App.jsx
└─ slides/
   ├─ SlideDeck.jsx
   ├─ slideData.js
   ├─ slides.css
   └─ components/
      └─ SlideFrame.jsx
```

## Como usar

1. Copie a pasta `slides` para `src/`.
2. Use o `App.jsx` de exemplo ou renderize `<SlideDeck />` em uma rota própria.
3. Não há dependências externas.
4. Navegação:
   - seta direita / PageDown / espaço: próximo slide;
   - seta esquerda / PageUp: slide anterior;
   - Home: primeiro slide;
   - End: último slide.

## Onde editar conteúdo

Todo o conteúdo está em:

`src/slides/slideData.js`

A ideia é manter texto e sequência separados do componente visual.

Cada slide usa um `type`, por exemplo:

- `cover`
- `section`
- `activity`
- `scenario`
- `reveal`
- `resource`
- `final`

Você pode enriquecer o UI criando renderizações específicas para cada `type`, mantendo o conteúdo intacto.

## Onde editar o visual

`src/slides/slides.css`

O CSS já possui:
- formato 16:9;
- cores diferentes por sprint;
- responsividade básica;
- barra de progresso;
- suporte simples a impressão;
- componentes de objetivo, entregáveis, callout e placeholder.

## Próximos refinamentos sugeridos

- cronômetro real por atividade;
- QR Code real;
- animações suaves entre slides;
- imagens/ícones por sprint;
- modo apresentador com notas;
- fullscreen;
- navegação por miniaturas;
- integração com o sistema React maior do Coletivo.
