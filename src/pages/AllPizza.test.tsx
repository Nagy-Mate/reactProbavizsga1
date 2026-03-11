import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import AllPizza from './AllPizza';


describe('AllPizza', () => {
    it('tartalmazza a Vite szöveget', () => {
        const html = renderToString(<AllPizza />);
        expect(html).toContain('All pizza');
    });
});