/**
 * Documentation validation tests for figma-mcp-app/tests/README.test.js
 *
 * Test framework note:
 * - This test file is written to be compatible with both Vitest and Jest.
 * - It uses only the common BDD-style globals: describe, it/test, expect.
 * - If the repo uses Vitest, run with: npx vitest
 * - If the repo uses Jest, run with: npx jest
 */
const fs = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'README.test.js');

function readDoc() {
  const buf = fs.readFileSync(DOC_PATH);
  return buf.toString('utf8');
}

describe('README documentation structure', () => {
  let content;
  beforeAll(() => {
    content = readDoc();
  });

  it('has the main title heading', () => {
    expect(content).toMatch(/^# React \+ TypeScript \+ Vite\s*$/m);
  });

  it('describes the template and HMR/ESLint context', () => {
    expect(content).toMatch(/minimal setup to get React working in Vite with HMR/i);
    expect(content).toMatch(/ESLint rules/i);
  });

  it('includes the two official plugin links with correct text and URLs', () => {
    // @vitejs/plugin-react (Babel)
    expect(content).toMatch(/\[@vitejs\/plugin-react\]\(https:\/\/github\.com\/vitejs\/vite-plugin-react\/blob\/main\/packages\/plugin-react\)/);
    expect(content).toMatch(/uses \[Babel\]\(https:\/\/babel\.js\.io\/\) for Fast Refresh/);
    // @vitejs/plugin-react-swc (SWC)
    expect(content).toMatch(/\[@vitejs\/plugin-react-swc\]\(https:\/\/github\.com\/vitejs\/vite-plugin-react-swc\)/);
    expect(content).toMatch(/uses \[SWC\]\(https:\/\/swc\.rs\/\) for Fast Refresh/);
  });

  it('contains ESLint type-aware configuration block using tseslint.config', () => {
    // Verify code fence and key lines
    expect(content).toMatch(/```js\s*$/m);
    expect(content).toMatch(/export default tseslint\.config\(/);
    expect(content).toMatch(/globalIgnores\(\['dist'\]\)/);
    expect(content).toMatch(/files:\s*\['\*\*\/\*\.\{ts,tsx\}'\]/);
    expect(content).toMatch(/\.\.\.tseslint\.configs\.recommendedTypeChecked/);
    expect(content).toMatch(/\.\.\.tseslint\.configs\.strictTypeChecked/);
    expect(content).toMatch(/\.\.\.tseslint\.configs\.stylisticTypeChecked/);
    expect(content).toMatch(/project:\s*\['\.\/tsconfig\.node\.json', '\.\/tsconfig\.app\.json'\]/);
    expect(content).toMatch(/tsconfigRootDir:\s*import\.meta\.dirname/);
    expect(content).toMatch(/```/); // closing fence exists somewhere
  });

  it('contains React and React DOM eslint plugin guidance block', () => {
    expect(content).toMatch(/You can also install \[eslint-plugin-react-x\].*\[eslint-plugin-react-dom\]/s);
    expect(content).toMatch(/import reactX from 'eslint-plugin-react-x'/);
    expect(content).toMatch(/import reactDom from 'eslint-plugin-react-dom'/);
    expect(content).toMatch(/reactX\.configs\['recommended-typescript'\]/);
    expect(content).toMatch(/reactDom\.configs\.recommended/);
  });

  it('documents the monorepo overview with expected paths', () => {
    expect(content).toMatch(/^## Monorepo overview \(added\)\s*$/m);
    expect(content).toMatch(/This repository is part of a larger monorepo structure/i);
    expect(content).toMatch(/- Apps live under `figma-mcp-app\/apps\/\*` \(Assistant, Incidents, Dashboards, Playbooks\)/);
    expect(content).toMatch(/- Shared code under `figma-mcp-app\/shared\/\*`/);
    expect(content).toMatch(/- Backend service under `backend\/` \(NestJS with `\/apply` prefix\)/);
  });
});

describe('README link and markdown hygiene', () => {
  let content;
  beforeAll(() => {
    content = readDoc();
  });

  it('has no empty Markdown links like []() or () without text', () => {
    // Basic check to catch obviously empty links
    expect(content).not.toMatch(/\[\s*\]\(\s*\)/);
  });

  it('ensures all GitHub links use https', () => {
    const ghLinks = content.match(/\[.*?\]\((https?:\/\/github\.com\/[^\s)]+)\)/g) || [];
    // Every github.com link should start with https
    for (const link of ghLinks) {
      expect(link).toMatch(/\]\(https:\/\//);
    }
  });

  it('all fenced code blocks are properly closed', () => {
    const fences = (content.match(/```/g) || []).length;
    // Fences should be even (open/close pairs)
    expect(fences % 2).toBe(0);
  });

  it('uses javascript fence language for JS examples', () => {
    // At least one JS fence
    expect(content).toMatch(/```js\s/);
  });
});