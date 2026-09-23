import { createElement } from '@lwc/engine-dom';
import PatientSummaryCard from 'c/patientSummaryCard';

describe('c-patient-summary-card', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders without throwing', () => {
        const element = createElement('c-patient-summary-card', {
            is: PatientSummaryCard
        });

        element.recordId = 'a00XXXXXXXXXXXX';
        document.body.appendChild(element);

        expect(element).not.toBeNull();
        expect(element.shadowRoot).not.toBeNull();
    });
});