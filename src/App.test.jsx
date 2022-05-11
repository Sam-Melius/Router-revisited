import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<App />', () => {
    it('renders a list and navigates to a character detail page', async () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        screen.getByText(/loading/i);
        const character = await screen.findByText('Morty Smith');
        userEvent.click(character);
        const mortyPic = await screen.findByAltText('Picture of Morty Smith');
        expect(mortyPic).toBeInTheDocument();
    })

    it('uses initial entries to pull up a details page of a character', async () => {
        render(
            <MemoryRouter initialEntries={['/characters/2']}>
                <App />
            </MemoryRouter>
        );

        const mortyPic = await screen.findByAltText('Picture of Morty Smith');
        expect(mortyPic).toBeInTheDocument();
        
    });
})
